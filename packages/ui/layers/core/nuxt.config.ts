import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
	$meta: { name: "core" },

	css: [
		join(currentDir, "./css/reset.css"),
		"uno.css",
		join(currentDir, "./css/custom.css"),
	],

	vue: {
		propsDestructure: true,
	},

	modules: [
		"@nuxt/devtools",
		"@pinia/nuxt",
		"@pinia/colada-nuxt",
		"@unocss/nuxt",
		"@nuxtjs/color-mode",
		"vue-sonner/nuxt",
	],

	components: [
		{ path: join(currentDir, "./components/ui"), extensions: [".vue"], prefix: "U", pathPrefix: false },
		{ path: join(currentDir, "./components"), pathPrefix: false },
	],

	shadcn: {
		prefix: "U",
	},

	experimental: {
		buildCache: true,
		typedPages: true,
		inlineRouteRules: true,
		typescriptPlugin: false,
	},

	devtools: {
		vueDevTools: true,
	},

	colorMode: {
		classSuffix: "",
		storage: "cookie",
	},

	unocss: {
		autoImport: false,
	},

	build: {
		transpile: ["rxjs", "sharp"],
	},

	compatibilityDate: "2024-07-06",
})
