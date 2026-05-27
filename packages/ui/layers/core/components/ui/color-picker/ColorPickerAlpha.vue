<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui"
import { useColorPicker } from "."

const { alpha, hue, saturation, lightness } = useColorPicker()

const style = computed(() => ({
	background: `linear-gradient(to right, hsla(${hue.value}, ${saturation.value}%, ${lightness.value}%, 0), hsla(${hue.value}, ${saturation.value}%, ${lightness.value}%, 1))`,
}))
</script>

<template>
	<div class="relative">
		<SliderRoot
			:model-value="[100 - alpha]"
			:max="100"
			:step="1"
			class="rounded-full flex h-4 w-full relative touch-none"
			@update:model-value="alpha = 100 - $event?.[0]!">
			<SliderTrack
				:style="style"
				data-slot="slider-track"
				class="my-0.5 border rounded-full grow h-3 w-full relative">
				<SliderRange
					class="rounded-full bg-transparent h-full absolute" />
			</SliderTrack>

			<SliderThumb class="border rounded-full bg-background shrink-0 size-4 block ring-ring/50 shadow-sm transition-[color,box-shadow] focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-4 hover:ring-4" />
		</SliderRoot>
	</div>
</template>
