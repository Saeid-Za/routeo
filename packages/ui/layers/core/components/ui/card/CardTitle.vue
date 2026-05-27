<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"leading-none font-semibold",
	() => props.class,
)
</script>

<template>
	<h3
		data-slot="card-title"
		:class="className">
		<slot />
	</h3>
</template>
