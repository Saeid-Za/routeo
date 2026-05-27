<script setup lang="ts">
import type { AccordionItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { AccordionItem, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<AccordionItemProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"border-b last:border-b-0 border-border",
	() => rawClass,
)

const forwardedProps = useForwardProps(() => props)
</script>

<template>
	<AccordionItem
		data-slot="accordion-item"
		v-bind="forwardedProps"
		:class="className">
		<slot />
	</AccordionItem>
</template>
