import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { version } from "./package.json"

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,

	css: ["~/css/app.css"],

	nitro: {
		preset: "static",
	},

	runtimeConfig: {
		public: {
			version,
			server: {
				address: "",
			},
		},
	},

	components: [
		{ path: "~/components", pathPrefix: false },
	],

	app: {
		pageTransition: { name: "zoom-fade", mode: "out-in" },
		layoutTransition: { name: "zoom-fade", mode: "out-in" },
	},

	modules: [
		"@nuxt/scripts",
		"@nuxtjs/i18n",
		"v-wave/nuxt",
	],

	colorMode: {
		preference: "dark",
		fallback: "dark",
	},

	i18n: {
		strategy: "no_prefix",
		defaultLocale: "en",
		detectBrowserLanguage: false,
		vueI18n: join(currentDir, "i18n", "i18n.config.ts"),
		locales: [
			{
				code: "fa",
				file: "fa.json",
				name: "Persian",
			},
			{
				code: "en",
				file: "en.json",
				name: "English",
			},
		],
	},

	vite: {
		server: {
			strictPort: true,
		},
		optimizeDeps: {
			include: [
				"@internationalized/date",
				"@maskito/vue",
				"@persian-tools/persian-tools",
				"@tauri-apps/api/core",
				"@tauri-apps/api/event",
				"@tauri-apps/api/window",
				"@vue/devtools-core",
				"@vue/devtools-kit",
				"@vueuse/core",
				"clsx",
				"neverthrow",
				"picoquery",
				"reka-ui",
				"tailwind-merge",
			],
		},
	},
})
