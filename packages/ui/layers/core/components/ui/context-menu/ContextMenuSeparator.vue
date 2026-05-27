<script setup lang="ts">
import type { ContextMenuSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	ContextMenuSeparator,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<ContextMenuSeparatorProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"-mx-1 my-1 h-px bg-border",
	() => rawClass,
)
</script>

<template>
	<ContextMenuSeparator
		data-slot="context-menu-separator"
		v-bind="props"
		:class="className" />
</template>
