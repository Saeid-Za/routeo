<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border py-6 shadow-sm",
	() => props.class,
)
</script>

<template>
	<div
		data-slot="card"
		:class="className">
		<slot />
	</div>
</template>
