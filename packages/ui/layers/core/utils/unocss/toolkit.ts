import type { Preset } from "unocss"
import type { PresetMiniOptions, Theme } from "unocss/preset-mini"

export type PresetShadcnOptions = Record<string, never> & PresetMiniOptions

function generateSafeList() {
	const colors = ["primary", "accent", "secondary", "positive", "warning", "destructive", "black", "white"]
	const varients = ["text", "bg", "border"]

	const result: string[] = []
	for (const color of colors) {
		for (const varient of varients) {
			result.push(`${varient}-${color}`)
			result.push(`${varient}-${color}-foreground`)
			result.push(`hover:${varient}-${color}/75`)
			result.push(`hover:${varient}-${color}/50`)
			result.push(`hover:${varient}-${color}/25`)
			result.push(`hover:${varient}-${color}-foreground/75`)
			result.push(`hover:${varient}-${color}-foreground/50`)
			result.push(`hover:${varient}-${color}-foreground/25`)
		}
	}

	return result
}

export function presetToolkit(): Preset<Theme> {
	return {
		name: "unocss-toolkit",
		rules: [
			["d-ltr", { direction: "ltr" }],
			["d-rtl", { direction: "rtl" }],
			["plaintext", { "unicode-bidi": "plaintext" }],
			[
				/grid-fill-(\d+)px/,
				([, d]) => ({
					"grid-template-columns": `repeat(auto-fill, minmax(${d}px, 1fr))`,
				}),
			],
			[
				/grid-fit-(\d+)px/,
				([, d]) => ({
					"grid-template-columns": `repeat(auto-fit, minmax(min(${d}px, 100%), 1fr))`,
				}),
			],
		],

		shortcuts: [
			{ english: "d-ltr rtl:placeholder:text-right text-start" },
			{ touchable: "overflow-unset! before:absolute before:top-[-15px] before:right-[-15px] before:left-[-15px] before:bottom-[-15px] before:z-1 before:content-['']" },
		],
		safelist: [
			"font-default",
			...generateSafeList(),
		],
	}
}
