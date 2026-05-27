<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"[&_tr]:border-b",
	() => props.class,
)
</script>

<template>
	<thead
		data-slot="table-header"
		:class="className">
		<slot />
	</thead>
</template>
