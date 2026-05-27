<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"text-muted-foreground col-start-2 grid justify-items-start",
	"gap-1 text-sm [&_p]:leading-relaxed",
	() => props.class,
)
</script>

<template>
	<div
		:class="className"
		data-slot="alert-description">
		<slot />
	</div>
</template>
