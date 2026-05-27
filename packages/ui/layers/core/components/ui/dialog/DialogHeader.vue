<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"flex flex-col gap-2 text-center sm:text-start",
	() => props.class,
)
</script>

<template>
	<div
		data-slot="dialog-header"
		:class="className">
		<slot />
	</div>
</template>
