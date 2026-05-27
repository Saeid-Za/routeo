<script setup lang="ts">
import type { ContextMenuLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { ContextMenuLabel } from "reka-ui"

const { class: rawClass, ...props } = defineProps<ContextMenuLabelProps & { class?: HTMLAttributes["class"], inset?: boolean }>()

const className = useClass(
	"px-2 py-1.5 text-sm font-medium text-foreground data-[inset]:ps-8",
	() => rawClass,
)
</script>

<template>
	<ContextMenuLabel
		data-slot="context-menu-label"
		v-bind="props"
		:data-inset="inset ? '' : undefined"
		:class="className">
		<slot />
	</ContextMenuLabel>
</template>
