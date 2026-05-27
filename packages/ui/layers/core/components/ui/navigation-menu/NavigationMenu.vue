<script setup lang="ts">
import type { NavigationMenuRootEmits, NavigationMenuRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	NavigationMenuRoot,
	useForwardPropsEmits,
} from "reka-ui"
import NavigationMenuViewport from "./NavigationMenuViewport.vue"

const { class: rawClass, viewport = true, ...props } = defineProps<NavigationMenuRootProps & {
	class?: HTMLAttributes["class"]
	viewport?: boolean
}>()

const emits = defineEmits<NavigationMenuRootEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
	() => rawClass,
)
</script>

<template>
	<NavigationMenuRoot
		v-bind="forwarded"
		data-slot="navigation-menu"
		:data-viewport="viewport"
		:class="className">
		<slot />

		<NavigationMenuViewport v-if="viewport" />
	</NavigationMenuRoot>
</template>
