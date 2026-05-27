<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

type SkeletonProps = {
	class?: HTMLAttributes["class"]
}

const props = defineProps<SkeletonProps>()

const className = useClass(
	"animate-pulse rounded-md bg-foreground/10",
	() => props.class,
)
</script>

<template>
	<div
		data-slot="skeleton"
		:class="className" />
</template>
