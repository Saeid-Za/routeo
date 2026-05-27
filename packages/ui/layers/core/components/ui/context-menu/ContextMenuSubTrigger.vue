<script setup lang="ts">
import type { ContextMenuSubTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	ContextMenuSubTrigger,

	useForwardProps,
} from "reka-ui"
import { computed } from "vue"

const { class: rawClass, ...props } = defineProps<ContextMenuSubTriggerProps & { class?: HTMLAttributes["class"], inset?: boolean }>()

const forwardedProps = useForwardProps(() => props)
const insetClass = computed(() => props.inset ? "ps-8" : "")

const className = useClass(
	"focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent",
	"data-[state=open]:text-accent-foreground flex cursor-default",
	"items-center rounded-sm px-2 py-1.5 text-sm outline-none",
	"select-none data-[inset]:pl-8 [&_svg]:pointer-events-none",
	"[&_svg]:shrink-0",
	insetClass,
	() => rawClass,
)
</script>

<template>
	<ContextMenuSubTrigger
		data-slot="context-menu-sub-trigger"
		v-bind="forwardedProps"
		:class="className">
		<slot />

		<Icon
			name="i-heroicons:chevron-left-16-solid"
			class="ms-auto size-4" />
	</ContextMenuSubTrigger>
</template>
