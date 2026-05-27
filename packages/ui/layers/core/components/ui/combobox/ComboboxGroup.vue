<script setup lang="ts">
import type { ComboboxGroupProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ComboboxGroup, ComboboxLabel } from "reka-ui"

const { class: rawClass, ...props } = defineProps<ComboboxGroupProps & {
	class?: HTMLAttributes["class"]
	heading?: string
}>()

const className = useClass(
	"overflow-hidden p-1 text-foreground",
	() => rawClass,
)
</script>

<template>
	<ComboboxGroup
		data-slot="combobox-group"
		v-bind="props"
		:class="className">
		<ComboboxLabel
			v-if="heading"
			class="text-xs text-muted-foreground font-medium px-2 py-1.5">
			{{ heading }}
		</ComboboxLabel>

		<slot />
	</ComboboxGroup>
</template>
