<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
	() => props.class,
)
</script>

<template>
	<ol
		data-slot="breadcrumb-list"
		:class="className">
		<slot />
	</ol>
</template>
