<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
	() => props.class,
)
</script>

<template>
	<tr
		data-slot="table-row"
		:class="className">
		<slot />
	</tr>
</template>
