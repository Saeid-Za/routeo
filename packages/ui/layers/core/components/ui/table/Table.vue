<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"border-separate border-collapse border-spacing-0 whitespace-nowrap w-full caption-bottom",
	() => props.class,
)
</script>

<template>
	<div
		data-slot="table-container"
		class="w-full relative overflow-auto">
		<table :class="className">
			<slot />
		</table>
	</div>
</template>
