<script lang="ts" setup>
import type { StepperIndicatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { StepperIndicator, useForwardProps } from "reka-ui"

const { class: className, ...props } = defineProps<StepperIndicatorProps & { class?: HTMLAttributes["class"] }>()
const forwarded = useForwardProps(() => props)

const classString = useClass(
	"inline-flex items-center justify-center rounded-full text-muted-foreground/50 size-8",
	// Disabled
	"group-data-[disabled]:text-muted-foreground group-data-[disabled]:opacity-50",
	// Active
	"group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground",
	// Completed
	"group-data-[state=completed]:bg-accent group-data-[state=completed]:text-accent-foreground",
	() => className,
)
</script>

<template>
	<StepperIndicator
		data-slot="stepper-indicator"
		v-bind="forwarded"
		:class="classString">
		<slot />
	</StepperIndicator>
</template>
