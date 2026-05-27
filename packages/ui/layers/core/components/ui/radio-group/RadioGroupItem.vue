<script setup lang="ts">
import type { RadioGroupItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	RadioGroupIndicator,
	RadioGroupItem,
	useForwardProps,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<RadioGroupItemProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"peer shrink-0 aspect-square size-4 rounded-full border border-input",
	"text-primary shadow outline-none focus-visible:ring",
	"focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
	"focus-visible:border-ring focus-visible:ring-ring/50",
	"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	"dark:bg-input/30 transition-[color,box-shadow]",
	"disabled:cursor-not-allowed disabled:opacity-50",
	() => rawClass,
)
</script>

<template>
	<RadioGroupItem
		data-slot="radio-group-item"
		v-bind="forwardedProps"
		:class="className">
		<RadioGroupIndicator
			data-slot="radio-group-indicator"
			class="flex items-center justify-center relative">
			<Icon
				name="i-heroicons:check-16-solid"
				class="size-2 start-1/2 top-1/2 absolute fill-primary -translate-x-1/2 -translate-y-1/2" />
		</RadioGroupIndicator>
	</RadioGroupItem>
</template>
