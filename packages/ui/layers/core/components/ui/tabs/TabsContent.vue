<script setup lang="ts">
import type { TabsContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { TabsContent } from "reka-ui"

const { class: rawClass, ...props } = defineProps<TabsContentProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"flex-1 outline-none",
	() => rawClass,
)
</script>

<template>
	<TabsContent
		data-slot="tabs-content"
		:class="className"
		v-bind="props">
		<slot />
	</TabsContent>
</template>
