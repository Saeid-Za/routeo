<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"inline-flex items-center gap-1.5",
	() => props.class,
)
</script>

<template>
	<li
		data-slot="breadcrumb-item"
		:class="className">
		<slot />
	</li>
</template>
