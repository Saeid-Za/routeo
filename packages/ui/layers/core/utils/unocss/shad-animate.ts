import type { Preset } from "unocss"
import type { PresetMiniOptions, Theme } from "unocss/preset-mini"

export type PresetShadcnOptions = Record<string, never> & PresetMiniOptions

const animationCSS = `
@keyframes collapsible-down { from { height: 0 } to { height: var(--reka-collapsible-content-height) } }
@keyframes collapsible-up { from { height: var(--reka-collapsible-content-height) } to { height: 0 } }

@keyframes accordion-down { from { height: 0 } to { height: var(--reka-accordion-content-height)} }
@keyframes accordion-up { from { height: var(--reka-accordion-content-height)} to { height: 0 } }
`

export function presetShadAnimation(): Preset<Theme> {
	return {
		name: "unocss-shad-animate",
		preflights: [
			{
				getCSS: () => animationCSS,
			},
		],
		rules: [
			[
				"collapsible-down",
				{
					animation: "collapsible-down 0.2s ease-in-out",
				},
			],
			[
				"collapsible-up",
				{
					animation: "collapsible-up 0.2s ease-in-out",
				},
			],
			[
				"accordion-down",
				{
					animation: "accordion-down 0.2s ease-out",
				},
			],
			[
				"accordion-up",
				{
					animation: "accordion-up 0.2s ease-out",
				},
			],
		],
	}
}
