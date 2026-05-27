<script setup lang="ts" generic="T extends {value: any, label: string}">
import type { ListboxRootEmits, ListboxRootProps } from "reka-ui"
import { ListboxRoot, useForwardPropsEmits } from "reka-ui"
import { type HTMLAttributes } from "vue"

const {
	class: rawClass,
	...props
} = defineProps<ListboxRootProps & { class?: HTMLAttributes["class"], options?: T[] }>()

const emits = defineEmits<ListboxRootEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"bg-popover text-popover-foreground flex size-full",
	"flex-col overflow-hidden rounded-md",
	() => rawClass,
)
</script>

<template>
	<ListboxRoot
		data-slot="command"
		v-bind="forwarded"
		:class="className">
		<slot />
	</ListBoxRoot>
</template>
