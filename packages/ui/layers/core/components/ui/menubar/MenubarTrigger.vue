<script setup lang="ts">
import type { MenubarTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { MenubarTrigger, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<MenubarTriggerProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"focus:bg-accent focus:text-accent-foreground",
	"data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
	"flex items-center rounded-sm px-2 py-1",
	"text-sm font-medium outline-none select-none",
	() => rawClass,
)
</script>

<template>
	<MenubarTrigger
		data-slot="menubar-trigger"
		v-bind="forwardedProps"
		:class="className">
		<slot />
	</MenubarTrigger>
</template>
