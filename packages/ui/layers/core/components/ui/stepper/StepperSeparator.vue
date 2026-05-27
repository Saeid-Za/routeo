<script lang="ts" setup>
import type { StepperSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { StepperSeparator, useForwardProps } from "reka-ui"

const { class: className, ...props } = defineProps<StepperSeparatorProps & { class?: HTMLAttributes["class"] }>()
const forwarded = useForwardProps(() => props)

const classString = useClass(
	"bg-muted",
	// Disabled
	"group-data-[disabled]:bg-muted group-data-[disabled]:opacity-50",
	// Completed
	"group-data-[state=completed]:bg-accent-foreground",
	() => className,
)
</script>

<template>
	<StepperSeparator
		v-bind="forwarded"
		:class="classString" />
</template>
