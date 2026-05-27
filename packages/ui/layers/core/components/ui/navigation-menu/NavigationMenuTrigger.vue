<script setup lang="ts">
import type { NavigationMenuTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	NavigationMenuTrigger,
	useForwardProps,
} from "reka-ui"
import { navigationMenuTriggerStyle } from "."

const { class: rawClass, ...props } = defineProps<NavigationMenuTriggerProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	navigationMenuTriggerStyle(),
	"group",
	() => rawClass,
)
</script>

<template>
	<NavigationMenuTrigger
		data-slot="navigation-menu-trigger"
		v-bind="forwardedProps"
		:class="className">
		<slot />

		<Icon
			name="i-heroicons:chevron-down-16-solid"
			class="ms-1 size-3 transition duration-300 top-px relative group-data-[state=open]:rotate-180"
			aria-hidden="true" />
	</NavigationMenuTrigger>
</template>
