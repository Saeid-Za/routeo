<script setup lang="ts">
import type { PaginationPrevProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { PaginationPrev } from "reka-ui"
import { buttonVariants, type ButtonVariants } from "../button"

const {
	class: rawClass,
	size = "default",
	...props
} = defineProps<PaginationPrevProps & { class?: HTMLAttributes["class"], size?: ButtonVariants["size"] }>()

const className = useClass(
	"gap-1 px-2.5 sm:pe-2.5",
	() => buttonVariants({ variant: "ghost", size }),
	() => rawClass,
)
</script>

<template>
	<PaginationPrev
		data-slot="pagination-prev"
		:class="className"
		v-bind="props">
		<slot>
			<Icon name="i-heroicons:chevron-double-right-16-solid" />

			<span class="hidden sm:block">Previous</span>
		</slot>
	</PaginationPrev>
</template>
