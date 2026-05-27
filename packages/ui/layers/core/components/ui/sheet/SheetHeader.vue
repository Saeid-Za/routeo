<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const className = useClass(
	"flex flex-col gap-1.5 p-4",
	() => props.class,
)
</script>

<template>
	<div
		data-slot="sheet-header"
		:class="className">
		<slot />
	</div>
</template>
