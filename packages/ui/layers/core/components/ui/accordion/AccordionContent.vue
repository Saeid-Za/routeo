<script setup lang="ts">
import type { AccordionContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { AccordionContent } from "reka-ui"

const { class: rawClass, ...props } = defineProps<AccordionContentProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"pt-0 pb-4",
	() => rawClass,
)
</script>

<template>
	<AccordionContent
		v-bind="props"
		data-slot="accordion-content"
		class="text-sm overflow-hidden data-[state=open]:accordion-down data-[state=closed]:accordion-up">
		<div :class="className">
			<slot />
		</div>
	</AccordionContent>
</template>
