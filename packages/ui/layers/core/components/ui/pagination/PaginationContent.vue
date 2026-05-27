<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { PaginationList, type PaginationListProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<PaginationListProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"flex flex-row items-center gap-1",
	() => rawClass,
)
</script>

<template>
	<PaginationList
		v-slot="slotProps"
		data-slot="pagination-content"
		v-bind="props"
		:class="className">
		<slot v-bind="slotProps" />
	</PaginationList>
</template>
