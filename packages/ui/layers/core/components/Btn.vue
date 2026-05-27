<script setup lang="ts">
import type { HtmlHTMLAttributes } from "vue"

const {
	class: classProp = "",
	color = "primary",
	rounded,
	loading,
	flat,
	icon,
	outline,
	innerClass = "",
} = defineProps<{
	loading?: boolean
	class?: HtmlHTMLAttributes["class"]
	innerClass?: HtmlHTMLAttributes["class"]
	icon?: boolean
	outline?: boolean
	flat?: boolean
	color?: string
	rounded?: boolean
}>()

const classString = useClass(
	"line-clamp-1 overflow-unset cursor-pointer disabled:pointer-events-none disabled:opacity-50 relative items-center rounded-md bg-transparent px-4 py-2 text-sm transition",
	() => !outline ? `bg-${color} text-${color}-foreground hover:bg-${color}/75` : `bg-transparent border border-${color} text-${color} hover:bg-${color}/25`,
	() => rounded ? "rounded-[100px]" : "px-4 py-2 text-center",
	() => flat ? `bg-transparent border-none text-${color} hover:bg-${color}/25` : "",
	() => icon ? `p-2` : "",
	() => classProp,
)

const innerClassString = useClass(
	"flex items-center w-full justify-center",
	() => innerClass,
)
</script>

<template>
	<button
		v-wave
		:class="classString">
		<FadeTransition>
			<div
				v-if="!loading"
				:class="innerClassString">
				<slot />
			</div>

			<div
				v-else
				class="h-5 relative">
				<slot name="loading">
					<Icon
						name="i-svg-spinners:6-dots-scale-middle"
						class="size-7 translate-x--1/2 translate-y--1/2 left-1/2 top-1/2 absolute" />
				</slot>
			</div>
		</FadeTransition>
	</button>
</template>
