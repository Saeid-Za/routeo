<script setup lang="ts">
import type { SelectTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { SelectIcon, SelectTrigger, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<SelectTriggerProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50",
	"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	"dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between",
	"gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow",
	"transition-[color,box-shadow] outline-none focus-visible:ring",
	"disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9",
	"data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1",
	"*:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center",
	"*:data-[slot=select-value]:gap-2",
	() => rawClass,
)
</script>

<template>
	<SelectTrigger
		data-slot="select-trigger"
		v-bind="forwardedProps"
		:class="className">
		<slot />

		<SelectIcon as-child>
			<Icon
				name="i-heroicons:chevron-up-down-16-solid"
				class="opacity-50 size-4" />
		</SelectIcon>
	</SelectTrigger>
</template>
