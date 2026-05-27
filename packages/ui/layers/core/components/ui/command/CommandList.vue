<script setup lang="ts">
import type { ListboxContentProps } from "reka-ui"
import { useClass } from "#imports"
import { ListboxContent, useForwardProps } from "reka-ui"
import { type HTMLAttributes } from "vue"

const {
	class: rawClass,
	...props
} = defineProps<ListboxContentProps & { class?: HTMLAttributes["class"] }>()

const forwarded = useForwardProps(() => props)

const className = useClass(
	"max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
	() => rawClass,
)
</script>

<template>
	<ListboxContent
		data-slot="command-list"
		v-bind="forwarded"
		:class="className">
		<slot />
	</ListboxContent>
</template>
