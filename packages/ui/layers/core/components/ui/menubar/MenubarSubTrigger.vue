<script setup lang="ts">
import type { MenubarSubTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { MenubarSubTrigger, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<MenubarSubTriggerProps & { class?: HTMLAttributes["class"], inset?: boolean }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent",
	"data-[state=open]:text-accent-foreground flex cursor-default items-center",
	"rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:ps-8",
	() => rawClass,
)
</script>

<template>
	<MenubarSubTrigger
		data-slot="menubar-sub-trigger"
		:data-inset="inset ? '' : undefined"
		v-bind="forwardedProps"
		:class="className">
		<slot />

		<Icon
			name="i-heroicons:chevron-left-16-solid"
			class="ms-auto size-4" />
	</MenubarSubTrigger>
</template>
