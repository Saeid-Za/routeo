<script setup lang="ts">
import type { ComboboxEmptyProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ComboboxEmpty } from "reka-ui"

const { class: rawClass, ...props } = defineProps<ComboboxEmptyProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"py-6 text-center text-sm",
	() => rawClass,
)
</script>

<template>
	<ComboboxEmpty
		data-slot="combobox-empty"
		v-bind="props"
		:class="className">
		<slot />
	</ComboboxEmpty>
</template>
