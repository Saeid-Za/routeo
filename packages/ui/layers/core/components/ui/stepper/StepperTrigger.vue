<script lang="ts" setup>
import type { StepperTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { StepperTrigger, useForwardProps } from "reka-ui"

const { class: className, ...props } = defineProps<StepperTriggerProps & { class?: HTMLAttributes["class"] }>()

const forwarded = useForwardProps(() => props)

const computedClass = useClass(
	"p-1 flex flex-col items-center text-center gap-1 rounded-md",
	() => className,
)
</script>

<template>
	<StepperTrigger
		data-slot="stepper-trigger"
		v-bind="forwarded"
		:class="computedClass">
		<slot />
	</StepperTrigger>
</template>
