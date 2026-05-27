<script setup lang="ts">
import type { DropdownMenuSubContentEmits, DropdownMenuSubContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	DropdownMenuSubContent,
	useForwardPropsEmits,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<DropdownMenuSubContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<DropdownMenuSubContentEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"bg-popover text-popover-foreground data-[state=open]:animate-in",
	"data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
	"data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95",
	"data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2",
	"data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
	"data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem]",
	"overflow-hidden rounded-md border border-border p-1 shadow-lg",
	"origin-[--reka-dropdown-menu-content-transform-origin]",
	() => rawClass,
)
</script>

<template>
	<DropdownMenuSubContent
		data-slot="dropdown-menu-sub-content"
		v-bind="forwarded"
		:class="className">
		<slot />
	</DropdownMenuSubContent>
</template>
