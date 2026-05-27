<script lang="ts" setup>
import type { StepperItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { StepperItem, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<StepperItemProps & { class?: HTMLAttributes["class"] }>()

const forwarded = useForwardProps(() => props)

const className = useClass(
	"flex items-center gap-2 group data-[disabled]:pointer-events-none",
	() => rawClass,
)
</script>

<template>
	<StepperItem
		data-slot="stepper-item"
		v-bind="forwarded"
		:class="className">
		<slot />
	</StepperItem>
</template>
