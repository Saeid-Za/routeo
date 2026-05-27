<script setup lang="ts">
import type { AccordionTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	AccordionHeader,
	AccordionTrigger,

} from "reka-ui"

const { class: rawClass, ...props } = defineProps<AccordionTriggerProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1",
	"items-start justify-between gap-4 rounded-md py-4 text-start",
	"text-sm font-medium transition-all outline-none hover:underline",
	"focus-visible:ring disabled:pointer-events-none disabled:opacity-50",
	() => rawClass,
)
</script>

<template>
	<AccordionHeader class="flex">
		<AccordionTrigger
			data-slot="accordion-trigger"
			v-bind="props"
			:class="className">
			<slot />

			<slot name="icon">
				<Icon
					name="i-heroicons:chevron-down-16-solid"
					class="text-muted-foreground shrink-0 size-4 pointer-events-none translate-y-0.5 transition-transform duration-200" />
			</slot>
		</AccordionTrigger>
	</AccordionHeader>
</template>
