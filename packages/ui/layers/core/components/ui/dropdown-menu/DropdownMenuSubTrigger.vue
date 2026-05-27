<script setup lang="ts">
import type { DropdownMenuSubTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	DropdownMenuSubTrigger,
	useForwardProps,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<DropdownMenuSubTriggerProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"flex cursor-default select-none items-center rounded-sm",
	"px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
	() => rawClass,
)
</script>

<template>
	<DropdownMenuSubTrigger
		data-slot="dropdown-menu-sub-trigger"
		v-bind="forwardedProps"
		:class="className">
		<slot />

		<Icon
			name="i-heroicons:chevron-left-16-solid"
			class="ms-auto size-4" />
	</DropdownMenuSubTrigger>
</template>
