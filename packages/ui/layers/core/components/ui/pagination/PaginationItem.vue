<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { PaginationListItem, type PaginationListItemProps } from "reka-ui"
import { buttonVariants, type ButtonVariants } from "../button"

const { size = "icon", isActive, ...props } = defineProps<PaginationListItemProps & {
	size?: ButtonVariants["size"]
	class?: HTMLAttributes["class"]
	isActive?: boolean
}>()

const className = useClass(
	"gap-1 px-2.5 sm:pe-2.5",
	() => buttonVariants({
		variant: isActive ? "outline" : "ghost",
		size,
	}),
)
</script>

<template>
	<PaginationListItem
		data-slot="pagination-item"
		v-bind="props"
		:class="className">
		<slot />
	</PaginationListItem>
</template>
