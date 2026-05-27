<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"text-muted-foreground h-10 px-2 text-start align-middle",
	"font-medium whitespace-nowrap [&:has([role=checkbox])]:pe-0",
	"[&>[role=checkbox]]:translate-y-[2px]",
	() => props.class,
)
</script>

<template>
	<th
		data-slot="table-head"
		:class="className">
		<slot />
	</th>
</template>
