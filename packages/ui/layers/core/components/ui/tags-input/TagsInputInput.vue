<script setup lang="ts">
import type { TagsInputInputProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { TagsInputInput, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<TagsInputInputProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"text-sm min-h-5 focus:outline-none flex-1 bg-transparent px-1",
	() => rawClass,
)
</script>

<template>
	<TagsInputInput
		v-bind="forwardedProps"
		:class="className" />
</template>
