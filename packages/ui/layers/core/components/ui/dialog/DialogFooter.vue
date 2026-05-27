<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const className = useClass(
	"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
	() => props.class,
)
</script>

<template>
	<div
		:class="className"
		data-slot="dialog-footer">
		<slot />
	</div>
</template>
