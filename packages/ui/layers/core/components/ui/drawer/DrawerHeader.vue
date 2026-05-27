<script lang="ts" setup>
import type { HtmlHTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HtmlHTMLAttributes["class"]
}>()

const className = useClass(
	"flex flex-col gap-1.5 p-4",
	() => props.class,
)
</script>

<template>
	<div
		data-slot="drawer-header"
		:class="className">
		<slot />
	</div>
</template>
