/** Only relative imports work in this file. */
import type { Theme } from "unocss/preset-wind4"

import {
	defineConfig,
	mergeDeep,
	presetIcons,
	presetTypography,
	presetWind4,
	transformerDirectives,
} from "unocss"

import { presetAnimations } from "unocss-preset-animations"
import { presetShadAnimation } from "./layers/core/utils/unocss/shad-animate"
import { presetToolkit } from "./layers/core/utils/unocss/toolkit"

export default defineConfig({
	content: {
		pipeline: {
			include: [
				/\.(vue|mdx?|html)($|\?)/,
				"components/**/*.ts",
				"composables/**/*.ts",
				"utils/**/*.ts",
				"plugins/**/*.ts",
				/** This has no practical usage but to force uno linter in files */
				"./app/plugins/**/*.ts",
				"./app/utils/**/*.ts",
				"./app/components/**/*.ts",
				"./app/composables/**/*.ts",
				"./layers/**/*.ts",
			],
		},
	},
	presets: [
		presetIcons({ warn: true }),
		presetWind4({
			preflights: { reset: false, theme: true },
		}),
		presetTypography(),
		presetAnimations({ duration: 150 }),
		presetShadAnimation(),
		presetToolkit(),
	],
	transformers: [
		transformerDirectives(),
	],
	extendTheme: (theme) => {
		return mergeDeep<Theme>(theme as Theme, {
			containers: {
				maxWidth: {
					xl: "1400px",
				},
			},
			colors: {
				border: "var(--border)",
				input: "var(--input)",
				ring: "var(--ring)",
				background: "var(--background)",
				foreground: "var(--foreground)",
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)",
				},
				secondary: {
					DEFAULT: "var(--secondary)",
					foreground: "var(--secondary-foreground)",
				},
				destructive: {
					DEFAULT: "var(--destructive)",
					foreground: "var(--destructive-foreground)",
				},
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)",
				},
				accent: {
					DEFAULT: "var(--accent)",
					foreground: "var(--accent-foreground)",
				},
				popover: {
					DEFAULT: "var(--popover)",
					foreground: "var(--popover-foreground)",
				},
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)",
				},
			},
			// Ensure variable controlled radius
			radius: {
				xl: "calc(var(--radius) + 4px)",
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				xs: "calc(var(--radius) - 6px)",
			},
			font: {
				default: `"yekan", "Winky Sans", sans-serif`,
				persian: "yekan",
				english: `"Winky Sans", sans-serif`,
				mono: `"JetBrains Mono"`,
				pixel: "vt323",
			},
		})
	},
	safelist: [
		"font-default",
		"font-persian",
		"font-english",
		"font-mono",
	],
})
