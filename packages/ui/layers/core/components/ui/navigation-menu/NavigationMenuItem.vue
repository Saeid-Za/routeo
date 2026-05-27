<script setup lang="ts">
import type { NavigationMenuItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { NavigationMenuItem } from "reka-ui"

const { class: rawClass, ...props } = defineProps<NavigationMenuItemProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"relative",
	() => rawClass,
)
</script>

<template>
	<NavigationMenuItem
		v-bind="props"
		:class="className"
		data-slot="navigation-menu-item">
		<slot />
	</NavigationMenuItem>
</template>
