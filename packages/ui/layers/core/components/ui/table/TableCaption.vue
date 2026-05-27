<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"text-muted-foreground mt-4 text-sm",
	() => props.class,
)
</script>

<template>
	<caption
		:class="className"
		data-slot="table-caption">
		<slot />
	</caption>
</template>
