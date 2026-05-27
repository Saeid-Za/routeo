<script setup lang="ts">
import type { HtmlHTMLAttributes } from "vue"

const {
	class: classString = "",
	contentClass,
	loading,
} = defineProps<{
	loading?: boolean
	contentClass?: HtmlHTMLAttributes["class"]
	class?: HtmlHTMLAttributes["class"]
}>()

const contentClassString = useClass(
	"transition-opacity duration-200",
	() => loading ? "opacity-0" : "opacity-100",
	() => contentClass,
)
</script>

<template>
	<button
		v-wave
		class="relative disabled:cursor-progress"
		:disabled="loading"
		:class="classString">
		<!-- Normal content -->
		<span
			:class="contentClassString">
			<slot />
		</span>

		<!-- Spinner overlay -->
		<span
			v-if="loading"
			class="flex items-center inset-0 justify-center absolute">
			<slot name="loading">
				<Icon
					name="i-heroicons-arrow-path-20-solid"
					class="animate-spin" />
			</slot>
		</span>
	</button>
</template>
