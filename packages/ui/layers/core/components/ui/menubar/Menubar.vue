<script setup lang="ts">
import type { MenubarRootEmits, MenubarRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	MenubarRoot,

	useForwardPropsEmits,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<MenubarRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<MenubarRootEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"bg-background flex h-9 items-center gap-1",
	"rounded-md border border-border p-1 shadow",
	() => rawClass,
)
</script>

<template>
	<MenubarRoot
		data-slot="menubar"
		v-bind="forwarded"
		:class="className">
		<slot />
	</MenubarRoot>
</template>
