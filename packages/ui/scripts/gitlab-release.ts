import { readdir, rename } from "fs/promises"
import { basename } from "path"
import process from "process"
import consola from "consola"
import { version as pkgVersion } from "../package.json"

// Allowed archive types
const ALLOWED_EXTS = [".tar", ".tar.gz", ".zip", ".rar"]

// Env vars
const gitlabToken = process.env.GITLAB_TOKEN
const projectId = process.env.GITLAB_PROJECT_ID
const apiUrl = process.env.GITLAB_API_URL
const packageName = "node-modules"

if (!gitlabToken || !projectId || !apiUrl) {
	consola.error("❌ Missing GITLAB_TOKEN, GITLAB_PROJECT_ID, or GITLAB_API_URL.")
	process.exit(1)
}

async function resolvePlatform(): Promise<string> {
	const platform = await consola.prompt("Choose platform for the archive name:", {
		type: "select",
		options: [
			{ label: "Linux", value: "linux" },
			{ label: "Windows", value: "windows" },
		],
	})

	return platform
}

async function findAndRenameArchive(): Promise<string | null> {
	const files = await readdir(".")
	const archive = files.find(file => ALLOWED_EXTS.some(ext => file.endsWith(ext)))

	if (!archive) {
		consola.warn("No archive file found. Please create one (tar, tar.gz, zip, rar).")
		process.exit()
	}

	const ext = ALLOWED_EXTS.find(ext => archive.endsWith(ext))!
	const platformSuffix = await resolvePlatform()
	const newName = `node_modules-${platformSuffix}${ext}`

	await rename(archive, newName)
	consola.success(`📦 Renamed ${archive} → ${newName}`)
	return newName
}

async function deleteExistingPackageVersion(): Promise<void> {
	const listUrl = `${apiUrl}/projects/${encodeURIComponent(
		projectId!,
	)}/packages?package_name=${packageName}&package_type=generic`

	const listRes = await fetch(listUrl, {
		headers: { "PRIVATE-TOKEN": gitlabToken! },
	})

	if (!listRes.ok) {
		consola.error(`❌ Failed to fetch packages: ${listRes.status}`)
		return
	}

	const packages = await listRes.json()
	const existing = packages.find((pkg: any) => pkg.version === pkgVersion)

	if (!existing) {
		consola.info("✅ No existing package version found.")
		return
	}

	const deleteUrl = `${apiUrl}/projects/${encodeURIComponent(projectId!)}/packages/${existing.id}`
	const delRes = await fetch(deleteUrl, {
		method: "DELETE",
		headers: { "PRIVATE-TOKEN": gitlabToken! },
	})

	if (delRes.ok) {
		consola.success(`🗑️ Deleted existing package version ${pkgVersion}`)
	}
	else {
		const error = await delRes.text()
		consola.error(`❌ Failed to delete existing package: ${delRes.status}`)
		consola.error(error)
	}
}

async function uploadToGitLab(filePath: string): Promise<void> {
	const fileName = basename(filePath)
	const file = Bun.file(filePath)
	const uploadUrl = `${apiUrl}/projects/${encodeURIComponent(
		projectId!,
	)}/packages/generic/${packageName}/${pkgVersion}/${fileName}`

	const response = await fetch(uploadUrl, {
		method: "PUT",
		headers: {
			"PRIVATE-TOKEN": gitlabToken!,
			"Content-Type": "application/zip",
		},
		body: file,
	})

	if (!response.ok) {
		const errorText = await response.text()
		consola.error(`❌ Upload failed: ${response.status} ${response.statusText}`)
		consola.error(errorText)
	}
	else {
		consola.success(`✅ Uploaded to GitLab: ${response.statusText}`)
	}
}

async function main() {
	try {
		await deleteExistingPackageVersion()

		const archive = await findAndRenameArchive()
		if (archive) {
			await uploadToGitLab(archive)
		}
	}
	catch (err) {
		consola.fatal("Process failed:", err)
	}
}

main()
