<script setup lang="ts">
import type { TagsInputRootEmits, TagsInputRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { TagsInputRoot, useForwardPropsEmits } from "reka-ui"

const { class: rawClass, ...props } = defineProps<TagsInputRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<TagsInputRootEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"flex flex-wrap gap-2 items-center rounded-md border border-input bg-background px-3 py-1.5 text-sm",
	() => rawClass,
)
</script>

<template>
	<TagsInputRoot
		v-bind="forwarded"
		:class="className">
		<slot />
	</TagsInputRoot>
</template>
