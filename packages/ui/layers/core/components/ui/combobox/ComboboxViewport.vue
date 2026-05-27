<script setup lang="ts">
import type { ComboboxViewportProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ComboboxViewport, useForwardProps } from "reka-ui"

const {	class: rawClass, ...props } = defineProps<ComboboxViewportProps & { class?: HTMLAttributes["class"] }>()

const forwarded = useForwardProps(() => props)

const className = useClass(
	"max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
	() => rawClass,
)
</script>

<template>
	<ComboboxViewport
		data-slot="combobox-viewport"
		v-bind="forwarded"
		:class="className">
		<slot />
	</ComboboxViewport>
</template>
