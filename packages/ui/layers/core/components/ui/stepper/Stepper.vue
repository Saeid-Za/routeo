<script lang="ts" setup>
import type { StepperRootEmits, StepperRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { StepperRoot, useForwardPropsEmits } from "reka-ui"

const { class: className, ...props } = defineProps<StepperRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<StepperRootEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const computedClass = useClass(
	"flex gap-2",
	() => className,
)
</script>

<template>
	<StepperRoot
		v-slot="slotProps"
		data-slot="stepper"
		:class="computedClass"
		v-bind="forwarded">
		<slot v-bind="slotProps" />
	</StepperRoot>
</template>
