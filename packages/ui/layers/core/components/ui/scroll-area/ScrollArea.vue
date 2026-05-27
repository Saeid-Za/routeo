<script setup lang="ts">
import type { ScrollAreaRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	ScrollAreaCorner,
	ScrollAreaRoot,
	ScrollAreaViewport,
} from "reka-ui"
import ScrollBar from "./ScrollBar.vue"

const { class: rawClass, ...props } = defineProps<ScrollAreaRootProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"relative",
	() => rawClass,
)
</script>

<template>
	<ScrollAreaRoot
		data-slot="scroll-area"
		v-bind="props"
		:class="className">
		<ScrollAreaViewport
			data-slot="scroll-area-viewport"
			class="outline-none rounded-[inherit] size-full transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring focus-visible:ring-ring/50">
			<slot />
		</ScrollAreaViewport>

		<ScrollBar />

		<ScrollAreaCorner />
	</ScrollAreaRoot>
</template>
