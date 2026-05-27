<script setup lang="ts">
import { useColorPicker } from "."

const { color, mode } = useColorPicker()

const formatted = computed(() => {
	if (mode.value === "hex")
		return color.value.toHex8String()

	if (mode.value === "rgb")
		return color.value.toRgbString()

	if (mode.value === "hsl")
		return color.value.toHslString()

	return "-"
})
</script>

<template>
	<div class="font-mono mx-auto px-2 py-1 border bg-accent">
		{{ formatted }}
	</div>
</template>
