<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"@container/card-header grid auto-rows-min grid-rows-[auto_auto]",
	"items-start gap-1.5 px-6",
	"has-data-[slot=card-action]:grid-cols-[1fr_auto]",
	() => props.class,
)
</script>

<template>
	<div
		data-slot="card-header"
		:class="className">
		<slot />
	</div>
</template>
