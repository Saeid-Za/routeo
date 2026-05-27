import type { Component, Nuxt, NuxtApp } from "nuxt/schema"
import { mkdir, writeFile } from "node:fs/promises"
import path, { dirname, join, resolve } from "node:path"
import { defineNuxtModule } from "@nuxt/kit"
import { relative } from "pathe"
import { debounceTime, mergeMap, Subject } from "rxjs"

export default defineNuxtModule({
	meta: {
		name: "typia",
		configKey: "typia",
	},
	defaults: {
		importName: "props",
	},
	async setup(options, nuxt) {
		const fileName = "typia.d.ts"
		const filePath = resolve(nuxt.options.buildDir, "types", fileName)
		const relativeToBuildDir = relative(nuxt.options.buildDir, filePath)

		const task$ = new Subject<void>()
		let isInitialized = false
		let nuxtAppRef: NuxtApp | null = null

		task$.pipe(
			debounceTime(150),
			mergeMap(async () => {
				await writeTypeTemplate(nuxt, nuxtAppRef!, filePath)
			}, 1),
		).subscribe()

		nuxt.hook("prepare:types", (config) => {
			config.tsConfig.compilerOptions ??= {}
			config.tsConfig.compilerOptions.paths ??= {}
			config.tsConfig.compilerOptions.paths[`#${options.importName}`] = [`./${relativeToBuildDir}`]
		})

		nuxt.hook("app:templatesGenerated", async (app) => {
			nuxtAppRef = app

			if (!isInitialized) {
				isInitialized = true
				task$.next()
			}
		})

		nuxt.hook("builder:watch", async (event, path) => {
			if (!path.endsWith(".vue"))
				return

			if (event !== "add" && event !== "unlink") {
				return
			}

			const componentSrcDirs = nuxt.options._layers.map(item => join(item.config.srcDir, "components")).flat()

			if (!isComponentWatched(path, componentSrcDirs))
				return

			task$.next()
		})
	},
})

async function writeTypeTemplate(nuxt: Nuxt, app: NuxtApp, filePath: string) {
	const filteredComponents = getFilteredComponentsByPath(nuxt, app)
	const content = generateTemplate(filePath, filteredComponents)
	await mkdir(dirname(filePath), { recursive: true })
	await writeFile(filePath, content)
}

function generateTemplate(tsFilePath: string, filteredComponents: Component[]) {
	let exportMap: string = ""
	for (const { pascalName, filePath } of filteredComponents) {
		const relativePath = relative(dirname(tsFilePath), filePath)
		exportMap += `export type ${pascalName}Props = Props<typeof import("${relativePath}")["default"]>\n`
	}

	return `import type { Mutable } from "@vueuse/core"
import type { AllowedComponentProps, ComponentCustomProps, VNodeProps } from "vue"
import type { ComponentProps } from "vue-component-type-helpers"

type Props<T> = Mutable<Omit<ComponentProps<T>, keyof VNodeProps | keyof AllowedComponentProps | keyof ComponentCustomProps>>

${exportMap}
`
}

function getFilteredComponentsByPath(nuxt: Nuxt, app: NuxtApp) {
	const componentSrcDirs = nuxt.options._layers.map(item => unixifyPath(join(item.config.srcDir, "components"))).flat()
	const imports = app.components
		.filter(component => isComponentWatched(component.filePath, componentSrcDirs))

	return imports
}

function isComponentWatched(componntPath: string, componentSrcDirs: string[]) {
	return componentSrcDirs.some(srcDir => componntPath.startsWith(srcDir))
}

function unixifyPath(windowsPath: string) {
	return windowsPath.split(path.sep).join("/")
}
