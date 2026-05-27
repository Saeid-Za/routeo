<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"text-muted-foreground ml-auto text-xs tracking-widest",
	() => props.class,
)
</script>

<template>
	<span
		data-slot="menubar-shortcut"
		:class="className">
		<slot />
	</span>
</template>
