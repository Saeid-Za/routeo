<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"[&_tr:last-child]:border-0",
	() => props.class,
)
</script>

<template>
	<tbody
		data-slot="table-body"
		:class="className">
		<slot />
	</tbody>
</template>
