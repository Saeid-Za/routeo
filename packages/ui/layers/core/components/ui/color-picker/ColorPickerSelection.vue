<script setup lang="ts">
import { computed, ref } from "vue"
import { useColorPicker } from "."

const containerRef = ref<HTMLElement>()
const isDragging = ref(false)
const positionX = ref(0)
const positionY = ref(0)
const { hue, setSaturation, setLightness } = useColorPicker()

const backgroundGradient = computed(() =>
	`linear-gradient(0deg, rgba(0,0,0,1), rgba(0,0,0,0)), 
   linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0)), 
   hsl(${hue.value},100%,50%)`,
)

function handlePointerMove(event: PointerEvent) {
	if (!isDragging.value || !containerRef.value)
		return
	const rect = containerRef.value.getBoundingClientRect()
	const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
	const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
	positionX.value = x
	positionY.value = y
	setSaturation(x * 100)
	const topLightness = x < 0.01 ? 100 : 50 + 50 * (1 - x)
	setLightness(topLightness * (1 - y))
}

function handlePointerDown(e: PointerEvent) {
	isDragging.value = true
	handlePointerMove(e)
	window.addEventListener("pointermove", handlePointerMove)
	window.addEventListener("pointerup", handlePointerUp)
}

function handlePointerUp() {
	isDragging.value = false
	window.removeEventListener("pointermove", handlePointerMove)
	window.removeEventListener("pointerup", handlePointerUp)
}
</script>

<template>
	<div
		ref="containerRef"
		class="rounded size-full cursor-crosshair relative"
		:style="{ background: backgroundGradient }"
		@pointerdown="handlePointerDown">
		<div
			class="border-2 rounded-full size-4 pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
			:style="{ left: `${positionX * 100}%`, top: `${positionY * 100}%`, boxShadow: '0 0 0 1px rgba(0,0,0,0.5)' }" />
	</div>
</template>
