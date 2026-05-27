<script setup lang="ts">
import type { PaginationEllipsisProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { PaginationEllipsis } from "reka-ui"

const { class: rawClass, ...props } = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"flex items-center mx-auto justify-center",
	() => rawClass,
)
</script>

<template>
	<PaginationEllipsis
		v-slot="slotProps"
		v-bind="props"
		data-slot="pagination"
		:class="className">
		<slot v-bind="slotProps">
			<Icon
				name="i-heroicons:ellipsis-horizontal-16-solid"
				class="rtl:rotate-180" />
		</slot>
	</PaginationEllipsis>
</template>
