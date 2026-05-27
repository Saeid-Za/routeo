<script setup lang="ts">
import type { MenubarItemEmits, MenubarItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	MenubarItem,
	useForwardPropsEmits,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<MenubarItemProps & { class?: HTMLAttributes["class"], inset?: boolean }>()

const emits = defineEmits<MenubarItemEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
	"focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
	"data-[inset]:ps-8",
	() => rawClass,
)
</script>

<template>
	<MenubarItem
		:data-inset="inset ? '' : undefined"
		v-bind="forwarded"
		:class="className">
		<slot />
	</MenubarItem>
</template>
