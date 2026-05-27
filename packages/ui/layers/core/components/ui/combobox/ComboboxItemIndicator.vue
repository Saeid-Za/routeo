<script setup lang="ts">
import type { ComboboxItemIndicatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ComboboxItemIndicator, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<ComboboxItemIndicatorProps & { class?: HTMLAttributes["class"] }>()

const forwarded = useForwardProps(() => props)

const className = useClass(
	"ms-auto",
	() => rawClass,
)
</script>

<template>
	<ComboboxItemIndicator
		data-slot="combobox-item-indicator"
		v-bind="forwarded"
		:class="className">
		<slot />
	</ComboboxItemIndicator>
</template>
