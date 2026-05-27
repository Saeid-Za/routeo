<script setup lang="ts">
import type { ScrollAreaScrollbarProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { ScrollAreaScrollbar, ScrollAreaThumb } from "reka-ui"
import { computed } from "vue"

const { class: rawClass, orientation = "vertical", ...props } = defineProps<ScrollAreaScrollbarProps & { class?: HTMLAttributes["class"] }>()

const orientationClass = computed(() => orientation === "vertical" ? "h-full w-2.5 border-l border-l-transparent" : "h-2.5 flex-col border-t border-t-transparent")

const className = useClass(
	"flex touch-none p-px transition-colors select-none",
	orientationClass,
	() => rawClass,
)
</script>

<template>
	<ScrollAreaScrollbar
		data-slot="scroll-area-scrollbar"
		:orientation
		v-bind="props"
		:class="className">
		<ScrollAreaThumb
			data-slot="scroll-area-thumb"
			class="rounded-full bg-border flex-1 relative" />
	</ScrollAreaScrollbar>
</template>
