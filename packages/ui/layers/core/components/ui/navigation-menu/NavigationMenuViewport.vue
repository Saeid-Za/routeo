<script setup lang="ts">
import type { NavigationMenuViewportProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	NavigationMenuViewport,
	useForwardProps,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<NavigationMenuViewportProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"origin-top-center relative mt-1.5 h-[--reka-navigation-menu-viewport-height] w-full",
	"overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow",
	"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95",
	"data-[state=open]:zoom-in-90 md:w-[--reka-navigation-menu-viewport-width]",
	() => rawClass,
)
</script>

<template>
	<div class="flex start-0 top-full justify-center absolute z-50 isolate">
		<NavigationMenuViewport
			data-slot="navigation-menu-viewport"
			v-bind="forwardedProps"
			:class="className" />
	</div>
</template>
