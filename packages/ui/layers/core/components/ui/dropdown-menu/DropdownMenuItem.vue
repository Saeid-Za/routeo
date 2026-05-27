<script setup lang="ts">
import type { DropdownMenuItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { DropdownMenuItem, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<DropdownMenuItemProps & { class?: HTMLAttributes["class"], inset?: boolean }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"focus:bg-accent focus:text-accent-foreground",
	"data-[variant=destructive]:text-destructive-foreground",
	"data-[variant=destructive]:focus:bg-destructive/10",
	"dark:data-[variant=destructive]:focus:bg-destructive/40",
	"data-[variant=destructive]:focus:text-destructive-foreground",
	"data-[variant=destructive]:*:[svg]:!text-destructive-foreground",
	"relative flex cursor-default items-center gap-2 rounded-sm",
	"px-2 py-1.5 text-sm outline-none select-none",
	"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
	"data-[inset]:ps-8 [&_svg]:pointer-events-none",
	"[&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground",
	() => rawClass,
)
</script>

<template>
	<DropdownMenuItem
		data-slot="dropdown-menu-item"
		:data-inset="inset ? '' : undefined"
		v-bind="forwardedProps"
		:class="className">
		<slot />
	</DropdownMenuItem>
</template>
