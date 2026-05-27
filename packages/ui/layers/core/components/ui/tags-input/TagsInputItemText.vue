<script setup lang="ts">
import type { TagsInputItemTextProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { TagsInputItemText, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<TagsInputItemTextProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"py-0.5 px-2 text-sm rounded bg-transparent",
	() => rawClass,
)
</script>

<template>
	<TagsInputItemText
		v-bind="forwardedProps"
		:class="className" />
</template>
