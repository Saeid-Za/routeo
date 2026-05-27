<script setup lang="ts">
import type { TagsInputItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { TagsInputItem, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<TagsInputItemProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"flex h-5 items-center rounded-md bg-secondary data-[state=active]:ring-ring data-[state=active]:ring-2 data-[state=active]:ring-offset-2 ring-offset-background",
	() => rawClass,
)
</script>

<template>
	<TagsInputItem
		v-bind="forwardedProps"
		:class="className">
		<slot />
	</TagsInputItem>
</template>
