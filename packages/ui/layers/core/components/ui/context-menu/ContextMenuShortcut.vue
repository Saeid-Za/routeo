<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"ms-auto text-xs tracking-widest text-muted-foreground",
	() => props.class,
)
</script>

<template>
	<span
		data-slot="context-menu-shortcut"
		:class="className">
		<slot />
	</span>
</template>
