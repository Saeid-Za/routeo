<script lang="ts" setup>
import type { StepperTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { StepperTitle, useForwardProps } from "reka-ui"

const { class: className, ...props } = defineProps<StepperTitleProps & { class?: HTMLAttributes["class"] }>()
const forwarded = useForwardProps(() => props)

const computedClass = useClass(
	"text-md font-semibold whitespace-nowrap",
	() => className,
)
</script>

<template>
	<StepperTitle
		data-slot="stepper-title"
		v-bind="forwarded"
		:class="computedClass">
		<slot />
	</StepperTitle>
</template>
