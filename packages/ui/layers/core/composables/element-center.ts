import type { MaybeComputedElementRef } from "@vueuse/core"
import { useElementBounding } from "@vueuse/core"

export function useElementCenter(elRef: MaybeComputedElementRef) {
	const { x, y, width, height } = useElementBounding(elRef, { windowResize: false, windowScroll: false, updateTiming: "next-frame" })

	const centerX = computed(() => x.value + width.value / 2)
	const centerY = computed(() => y.value + height.value / 2)

	return {
		x: centerX,
		y: centerY,
	}
}
