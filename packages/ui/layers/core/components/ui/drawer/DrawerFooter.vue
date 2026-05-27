<script lang="ts" setup>
import type { HtmlHTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HtmlHTMLAttributes["class"]
}>()

const className = useClass(
	"mt-auto flex flex-col gap-2 p-4",
	() => props.class,
)
</script>

<template>
	<div
		:class="className"
		data-slot="drawer-footer">
		<slot />
	</div>
</template>
