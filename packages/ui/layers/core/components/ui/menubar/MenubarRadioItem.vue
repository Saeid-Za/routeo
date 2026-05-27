<script setup lang="ts">
import type { MenubarRadioItemEmits, MenubarRadioItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	MenubarItemIndicator,
	MenubarRadioItem,
	useForwardPropsEmits,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<MenubarRadioItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<MenubarRadioItemEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"relative flex cursor-default select-none items-center",
	"rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none",
	"focus:bg-accent focus:text-accent-foreground",
	"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
	() => rawClass,
)
</script>

<template>
	<MenubarRadioItem
		data-slot="menubar-radio-item"
		v-bind="forwarded"
		:class="className">
		<span class="flex size-3.5 pointer-events-none items-center start-2 justify-center absolute">
			<MenubarItemIndicator>
				<Icon
					name="i-radix-icons:dot-filled"
					class="size-2 fill-current" />
			</MenubarItemIndicator>
		</span>

		<slot />
	</MenubarRadioItem>
</template>
