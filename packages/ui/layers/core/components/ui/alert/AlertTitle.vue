<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
	() => props.class,
)
</script>

<template>
	<div
		data-slot="alert-title"
		:class="className">
		<slot />
	</div>
</template>
