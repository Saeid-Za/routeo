<script lang="ts" setup>
import type { StepperDescriptionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { StepperDescription, useForwardProps } from "reka-ui"

const { class: className, ...props } = defineProps<StepperDescriptionProps & { class?: HTMLAttributes["class"] }>()
const forwarded = useForwardProps(() => props)

const computedClass = useClass(
	"text-xs text-muted-foreground",
	() => className,
)
</script>

<template>
	<StepperDescription
		v-slot="slotProps"
		data-slot="stepper-description"
		v-bind="forwarded"
		:class="computedClass">
		<slot v-bind="slotProps" />
	</StepperDescription>
</template>
