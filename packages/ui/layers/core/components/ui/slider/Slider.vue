<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from "reka-ui"

const { class: rawClass, ...props } = defineProps<SliderRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<SliderRootEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"relative flex w-full touch-none items-center select-none",
	"data-[disabled]:opacity-50 data-[orientation=vertical]:h-full",
	"data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto",
	"data-[orientation=vertical]:flex-col",
	() => rawClass,
)
</script>

<template>
	<SliderRoot
		data-slot="slider"
		:class="className"
		v-bind="forwarded">
		<SliderTrack
			data-slot="slider-track"
			class="rounded-full bg-muted grow relative overflow-hidden data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5">
			<SliderRange
				data-slot="slider-range"
				class="bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
		</SliderTrack>

		<SliderThumb
			v-for="(_, key) in modelValue"
			:key="key"
			data-slot="slider-thumb"
			class="border border-primary rounded-full bg-background shrink-0 size-4 block ring-ring/50 shadow-sm transition-[color,box-shadow] focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-4 hover:ring-4" />
	</SliderRoot>
</template>
