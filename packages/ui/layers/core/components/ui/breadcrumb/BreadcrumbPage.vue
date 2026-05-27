<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"text-foreground font-normal",
	() => props.class,
)
</script>

<template>
	<span
		data-slot="breadcrumb-page"
		role="link"
		aria-disabled="true"
		aria-current="page"
		:class="className">
		<slot />
	</span>
</template>
