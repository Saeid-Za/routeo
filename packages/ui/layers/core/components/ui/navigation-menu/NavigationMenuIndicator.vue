<script setup lang="ts">
import type { NavigationMenuIndicatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { NavigationMenuIndicator, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<NavigationMenuIndicatorProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"data-[state=visible]:animate-in data-[state=hidden]:animate-out",
	"data-[state=hidden]:fade-out data-[state=visible]:fade-in",
	"top-full z-[1] flex h-1.5",
	"items-end justify-center overflow-hidden",
	() => rawClass,
)
</script>

<template>
	<NavigationMenuIndicator
		data-slot="navigation-menu-indicator"
		v-bind="forwardedProps"
		:class="className">
		<div class="rounded-tl-sm bg-border size-2 shadow-md rotate-45 top-[60%] relative" />
	</NavigationMenuIndicator>
</template>
