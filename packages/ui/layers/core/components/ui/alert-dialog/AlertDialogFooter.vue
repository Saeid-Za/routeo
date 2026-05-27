<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
	() => props.class,
)
</script>

<template>
	<div
		data-slot="alert-dialog-footer"
		:class="className">
		<slot />
	</div>
</template>
