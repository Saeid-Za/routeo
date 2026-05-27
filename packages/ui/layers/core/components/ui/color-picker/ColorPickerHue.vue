<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui"
import { useColorPicker } from "."

const { hue } = useColorPicker()
</script>

<template>
	<SliderRoot
		:model-value="[hue]"
		:max="360"
		:step="1"
		class="flex h-4 w-full relative touch-none"
		@update:model-value="hue = $event![0]!">
		<SliderTrack
			data-slot="slider-track"
			class="my-0.5 border rounded-full bg-[linear-gradient(270deg,#FF0000,#FFFF00,#00FF00,#00FFFF,#0000FF,#FF00FF,#FF0000)] grow h-3 w-full relative">
			<SliderRange
				class="rounded-full bg-transparent h-full absolute" />
		</SliderTrack>

		<SliderThumb class="border rounded-full bg-background shrink-0 size-4 block ring-ring/50 shadow-sm transition-[color,box-shadow] focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-4 hover:ring-4" />
	</SliderRoot>
</template>
