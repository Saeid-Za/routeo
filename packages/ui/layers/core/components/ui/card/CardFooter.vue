<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"flex items-center px-6",
	() => props.class,
)
</script>

<template>
	<div
		data-slot="card-footer"
		:class="className">
		<slot />
	</div>
</template>
