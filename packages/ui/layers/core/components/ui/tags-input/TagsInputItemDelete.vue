<script setup lang="ts">
import type { TagsInputItemDeleteProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { TagsInputItemDelete, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<TagsInputItemDeleteProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"flex rounded bg-transparent me-1",
	() => rawClass,
)
</script>

<template>
	<TagsInputItemDelete
		v-bind="forwardedProps"
		:class="className">
		<slot>
			<Icon
				name="i-heroicons:x-mark-16-solid"
				class="size-4" />
		</slot>
	</TagsInputItemDelete>
</template>
