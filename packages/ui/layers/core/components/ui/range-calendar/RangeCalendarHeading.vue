<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { RangeCalendarHeading, type RangeCalendarHeadingProps, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<RangeCalendarHeadingProps & { class?: HTMLAttributes["class"] }>()

defineSlots<{
	default: (props: { headingValue: string }) => any
}>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"text-sm font-medium",
	() => rawClass,
)
</script>

<template>
	<RangeCalendarHeading
		v-slot="{ headingValue }"
		:class="className"
		v-bind="forwardedProps">
		<slot :heading-value>
			{{ headingValue }}
		</slot>
	</RangeCalendarHeading>
</template>
