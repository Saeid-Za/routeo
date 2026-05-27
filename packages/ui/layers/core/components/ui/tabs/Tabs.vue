<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { TabsRoot, useForwardPropsEmits } from "reka-ui"

const { class: rawClass, ...props } = defineProps<TabsRootProps & { class?: HTMLAttributes["class"] }>()

const emits = defineEmits<TabsRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const className = useClass(
	"flex flex-col gap-2",
	() => rawClass,
)
</script>

<template>
	<TabsRoot
		:class="className"
		data-slot="tabs"
		v-bind="forwarded">
		<slot />
	</TabsRoot>
</template>
