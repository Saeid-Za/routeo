<script setup lang="ts">
import type { ContextMenuItemEmits, ContextMenuItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	ContextMenuItem,
	useForwardPropsEmits,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<ContextMenuItemProps & { class?: HTMLAttributes["class"], inset?: boolean }>()
const emits = defineEmits<ContextMenuItemEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"focus:bg-accent focus:text-accent-foreground",
	"data-[variant=destructive]:text-destructive-foreground",
	"data-[variant=destructive]:focus:bg-destructive/10",
	"dark:data-[variant=destructive]:focus:bg-destructive/40",
	"data-[variant=destructive]:focus:text-destructive-foreground",
	"data-[variant=destructive]:*:[svg]:!text-destructive-foreground",
	"relative flex rounded-sm px-2 py-1.5 text-sm",
	"cursor-default items-center gap-2 outline-none select-none",
	" data-[disabled]:pointer-events-none",
	"data-[disabled]:opacity-50 data-[inset]:ps-8 [&_svg]:pointer-events-none",
	"[&_svg]:shrink-0",
	"[&_svg:not([class*='text-'])]:text-muted-foreground",
	() => rawClass,
)
</script>

<template>
	<ContextMenuItem
		data-slot="context-menu-item"
		v-bind="forwarded"
		:data-inset="inset ? '' : undefined"
		:class="className">
		<slot />
	</ContextMenuItem>
</template>
