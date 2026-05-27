<script setup lang="ts">
import type { ComboboxTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ComboboxTrigger, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<ComboboxTriggerProps & { class?: HTMLAttributes["class"] }>()

const forwarded = useForwardProps(() => props)

const className = useClass(
	"",
	() => rawClass,
)
</script>

<template>
	<ComboboxTrigger
		data-slot="combobox-trigger"
		v-bind="forwarded"
		:class="className"
		tabindex="0">
		<slot />
	</ComboboxTrigger>
</template>
