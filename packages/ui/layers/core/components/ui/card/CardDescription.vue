<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"text-muted-foreground text-sm",
	() => props.class,
)
</script>

<template>
	<p
		data-slot="card-description"
		:class="className">
		<slot />
	</p>
</template>
