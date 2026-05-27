<script setup lang="ts">
import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	DropdownMenuCheckboxItem,
	DropdownMenuItemIndicator,
	useForwardPropsEmits,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<DropdownMenuCheckboxItemProps & { class?: HTMLAttributes["class"] }>()

const emits = defineEmits<DropdownMenuCheckboxItemEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"focus:bg-accent focus:text-accent-foreground relative",
	"flex cursor-default items-center gap-2 rounded-sm py-1.5",
	"pe-2 ps-8 text-sm outline-none select-none",
	"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
	"[&_svg]:pointer-events-none [&_svg]:shrink-0",
	() => rawClass,
)
</script>

<template>
	<DropdownMenuCheckboxItem
		data-slot="dropdown-menu-checkbox-item"
		v-bind="forwarded"
		:class="className">
		<span class="flex size-3.5 pointer-events-none items-center start-2 justify-center absolute">
			<DropdownMenuItemIndicator>
				<Icon
					name="i-heroicons:check-16-solid"
					class="size-4" />
			</DropdownMenuItemIndicator>
		</span>

		<slot />
	</DropdownMenuCheckboxItem>
</template>
