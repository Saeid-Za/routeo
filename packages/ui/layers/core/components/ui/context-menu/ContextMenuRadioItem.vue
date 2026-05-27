<script setup lang="ts">
import type { ContextMenuRadioItemEmits, ContextMenuRadioItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	ContextMenuItemIndicator,
	ContextMenuRadioItem,

	useForwardPropsEmits,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<ContextMenuRadioItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<ContextMenuRadioItemEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"focus:bg-accent focus:text-accent-foreground relative flex",
	"cursor-default items-center gap-2 rounded-sm py-1.5 pe-2 ps-8",
	"text-sm outline-none select-none data-[disabled]:pointer-events-none",
	"data-[disabled]:opacity-50 [&_svg]:pointer-events-none",
	"[&_svg]:shrink-0",
	() => rawClass,
)
</script>

<template>
	<ContextMenuRadioItem
		data-slot="context-menu-radio-item"
		v-bind="forwarded"
		:class="className">
		<span class="flex size-3.5 pointer-events-none items-center start-2 justify-center absolute">
			<ContextMenuItemIndicator>
				<Icon
					name="i-radix-icons:dot-filled"
					class="size-4 fill-current" />
			</ContextMenuItemIndicator>
		</span>

		<slot />
	</ContextMenuRadioItem>
</template>
