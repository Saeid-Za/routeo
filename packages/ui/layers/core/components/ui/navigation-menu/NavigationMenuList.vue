<script setup lang="ts">
import type { NavigationMenuListProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { NavigationMenuList, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<NavigationMenuListProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"group flex flex-1 list-none items-center justify-center gap-1",
	() => rawClass,
)
</script>

<template>
	<NavigationMenuList
		data-slot="navigation-menu-list"
		v-bind="forwardedProps"
		:class="className">
		<slot />
	</NavigationMenuList>
</template>
