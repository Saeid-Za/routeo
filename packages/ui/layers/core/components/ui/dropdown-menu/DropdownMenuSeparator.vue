<script setup lang="ts">
import type { DropdownMenuSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	DropdownMenuSeparator,

} from "reka-ui"

const { class: rawClass, ...props } = defineProps<DropdownMenuSeparatorProps & {
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"-mx-1 my-1 h-px bg-muted",
	() => rawClass,
)
</script>

<template>
	<DropdownMenuSeparator
		data-slot="dropdown-menu-separator"
		v-bind="props"
		:class="className" />
</template>
