<script setup lang="ts">
import type { NavigationMenuLinkEmits, NavigationMenuLinkProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import {
	NavigationMenuLink,
	useForwardPropsEmits,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<NavigationMenuLinkProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<NavigationMenuLinkEmits>()

const className = useClass(
	"data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent",
	"data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground",
	"hover:bg-accent hover:text-accent-foreground focus:bg-accent",
	"focus:text-accent-foreground ring-ring/10 dark:ring-ring/20",
	"dark:outline-ring/40 outline-ring/50",
	"[&_svg:not([class*='text-'])]:text-muted-foreground",
	"flex flex-col gap-1 rounded-sm p-2 text-sm",
	"transition-[color,box-shadow] focus-visible:ring-4",
	"focus-visible:outline-1",
	() => rawClass,
)

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
	<NavigationMenuLink
		v-bind="forwarded"
		:class="className"
		data-slot="navigation-menu-link">
		<slot />
	</NavigationMenuLink>
</template>
