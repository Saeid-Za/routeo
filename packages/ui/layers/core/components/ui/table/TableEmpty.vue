<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import TableCell from "./TableCell.vue"
import TableRow from "./TableRow.vue"

const {
	class: rawClass,
	colspan = 1,
	...props
} = defineProps<{
	class?: HTMLAttributes["class"]
	colspan?: number
}>()

const className = useClass(
	"p-4 whitespace-nowrap align-middle text-sm text-foreground",
	() => rawClass,
)
</script>

<template>
	<TableRow>
		<TableCell
			:colspan
			:class="className"
			v-bind="props">
			<div class="py-10 flex items-center justify-center">
				<slot />
			</div>
		</TableCell>
	</TableRow>
</template>
