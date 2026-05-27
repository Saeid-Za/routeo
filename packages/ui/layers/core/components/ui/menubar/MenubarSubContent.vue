<script setup lang="ts">
import type { MenubarSubContentEmits, MenubarSubContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	MenubarPortal,
	MenubarSubContent,

	useForwardPropsEmits,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<MenubarSubContentProps & { class?: HTMLAttributes["class"] }>()

const emits = defineEmits<MenubarSubContentEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"bg-popover text-popover-foreground data-[state=open]:animate-in",
	"data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
	"data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95",
	"data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2",
	"data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
	"data-[side=top]:slide-in-from-bottom-2 z-50",
	"min-w-[8rem] origin-[--reka-menubar-content-transform-origin]",
	"overflow-hidden rounded-md border border-border p-1 shadow-lg",
	() => rawClass,
)
</script>

<template>
	<MenubarPortal>
		<MenubarSubContent
			data-slot="menubar-sub-content"
			v-bind="forwarded"
			:class="className">
			<slot />
		</MenubarSubContent>
	</MenubarPortal>
</template>
