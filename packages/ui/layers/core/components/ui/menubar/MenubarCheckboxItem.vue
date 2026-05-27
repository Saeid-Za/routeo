<script setup lang="ts">
import type { MenubarCheckboxItemEmits, MenubarCheckboxItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	MenubarCheckboxItem,

	MenubarItemIndicator,
	useForwardPropsEmits,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<MenubarCheckboxItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<MenubarCheckboxItemEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"focus:bg-accent focus:text-accent-foreground relative",
	"flex cursor-default items-center gap-2 rounded",
	"py-1.5 pr-2 pl-8 text-sm outline-none select-none",
	"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
	"[&_svg]:pointer-events-none [&_svg]:shrink-0",
	() => rawClass,
)
</script>

<template>
	<MenubarCheckboxItem
		data-slot="menubar-checkbox-item"
		v-bind="forwarded"
		:class="className">
		<span class="flex size-3.5 pointer-events-none items-center start-2 justify-center absolute">
			<MenubarItemIndicator>
				<Icon
					name="i-heroicons:check-16-solid"
					class="size-4" />
			</MenubarItemIndicator>
		</span>

		<slot />
	</MenubarCheckboxItem>
</template>
