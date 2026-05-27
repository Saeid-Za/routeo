<script setup lang="ts">
import type { HTMLAttributes } from "vue"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
	() => props.class,
)
</script>

<template>
	<div
		data-slot="card-action"
		:class="className">
		<slot />
	</div>
</template>
