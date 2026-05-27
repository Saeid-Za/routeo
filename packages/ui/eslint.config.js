import antfu from "@antfu/eslint-config"
import { FlatCompat } from "@eslint/eslintrc"
import { createConfigForNuxt } from "@nuxt/eslint-config/flat"
import oxlint from "eslint-plugin-oxlint"

const ignores = [
	"**/android/**",
	"**/public/**",
	"**/swagger/**",
]

const compat = new FlatCompat()
const otherFlattenedPlugins = compat.config({
	ignorePatterns: ignores,
	extends: [
		"plugin:tailwindcss/recommended",
	],
	rules: {
		"tailwindcss/no-custom-classname": "off",
		"tailwindcss/migration-from-tailwind-2": "off",
		"tailwindcss/classnames-order": "off",
		"no-unused-vars": "off",
	},
})

const nuxtFlatConfig = createConfigForNuxt({
	features: { standalone: false },
})

const baseConfig = {
	unocss: true,
	ignores,
	stylistic: {
		indent: "tab",
		quotes: "double",
	},
	rules: {
		"vue/max-attributes-per-line": ["warn", {
			singleline: { max: 1 },
			multiline: { max: 1 },
		}],
		"vue/html-closing-bracket-newline": ["error", {
			singleline: "never",
			multiline: "never",
		}],
		"vue/padding-line-between-tags": ["warn", [
			{ blankLine: "always", prev: "*", next: "*" },
		]],
	},
}

const antfuConfig = antfu(
	baseConfig,
	nuxtFlatConfig,
	otherFlattenedPlugins,
	...oxlint.configs["flat/all"],
)

export default antfuConfig
