<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	name: string
	class?: HTMLAttributes["class"]
}>()

const classString = useClass(
	"inline-block size-5",
	() => props.class,
	() => props.name,
)
</script>

<template>
	<div :class="classString" />
</template>
