<script setup lang="ts">
import type { ComboboxSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ComboboxSeparator } from "reka-ui"

const {	class: rawClass, ...props } = defineProps<ComboboxSeparatorProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"bg-border -mx-1 h-px",
	() => rawClass,
)
</script>

<template>
	<ComboboxSeparator
		data-slot="combobox-separator"
		v-bind="props"
		:class="className">
		<slot />
	</ComboboxSeparator>
</template>
