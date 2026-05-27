import tinycolor from "tinycolor2"

export const ColorPickerSymbol = Symbol("ColorPicker")

export interface ColorPickerContextValue {
	hue: Ref<number>
	saturation: Ref<number>
	lightness: Ref<number>
	alpha: Ref<number>
	mode: Ref<string>
	color: ComputedRef<tinycolor.Instance>
	setHue: (h: number) => void
	setSaturation: (s: number) => void
	setLightness: (l: number) => void
	setAlpha: (a: number) => void
	setMode: (m: string) => void
}

export function provideColorPicker(initial?: string) {
	// TinyColor handles invalid input safely
	const hsl = tinycolor(initial || "#ffffff").toHsl()

	const hue = ref(Math.round(hsl.h)) // 0 - 360
	const saturation = ref(Math.round(hsl.s * 100)) // 0 - 100
	const lightness = ref(Math.round(hsl.l * 100)) // 0 - 100
	const alpha = ref(Math.round(hsl.a * 100)) // 0 - 100
	const mode = ref("hex")

	const setHue = (h: number) => (hue.value = h)
	const setSaturation = (s: number) => (saturation.value = s)
	const setLightness = (l: number) => (lightness.value = l)
	const setAlpha = (a: number) => (alpha.value = a)
	const setMode = (m: string) => (mode.value = m)

	const color = computed(() => {
		return tinycolor({
			h: hue.value,
			s: saturation.value,
			l: lightness.value,
			a: alpha.value / 100,
		})
	})

	provide(ColorPickerSymbol, {
		color,
		hue,
		saturation,
		lightness,
		alpha,
		mode,
		setHue,
		setSaturation,
		setLightness,
		setAlpha,
		setMode,
	})

	return { hue, saturation, lightness, alpha, mode, setHue, setSaturation, setLightness, setAlpha, setMode }
}

export function useColorPicker(): ColorPickerContextValue {
	const context = inject<ColorPickerContextValue>(ColorPickerSymbol)
	if (!context)
		throw new Error("useColorPicker must be used within ColorPicker")
	return context
}
