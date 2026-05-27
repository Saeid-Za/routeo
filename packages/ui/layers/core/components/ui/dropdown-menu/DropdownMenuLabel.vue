<script setup lang="ts">
import type { DropdownMenuLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { DropdownMenuLabel, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<DropdownMenuLabelProps & { class?: HTMLAttributes["class"], inset?: boolean }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"px-2 py-1.5 text-sm font-semibold data-[inset]:ps-8",
	() => rawClass,
)
</script>

<template>
	<DropdownMenuLabel
		data-slot="dropdown-menu-label"
		v-bind="forwardedProps"
		:data-inset="inset ? '' : undefined"
		:class="className">
		<slot />
	</DropdownMenuLabel>
</template>
