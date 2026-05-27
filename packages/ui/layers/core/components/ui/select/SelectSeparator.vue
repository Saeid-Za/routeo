<script setup lang="ts">
import type { SelectSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { SelectSeparator } from "reka-ui"

const { class: rawClass, ...props } = defineProps<SelectSeparatorProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"bg-border pointer-events-none -mx-1 my-1 h-px",
	() => rawClass,
)
</script>

<template>
	<SelectSeparator
		data-slot="select-separator"
		v-bind="props"
		:class="className" />
</template>
