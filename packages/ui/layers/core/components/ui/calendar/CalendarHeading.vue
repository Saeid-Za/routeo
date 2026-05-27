<script lang="ts" setup>
import type { CalendarHeadingProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { CalendarHeading, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<CalendarHeadingProps & { class?: HTMLAttributes["class"] }>()

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
	<CalendarHeading
		v-slot="{ headingValue }"
		:class="className"
		v-bind="forwardedProps">
		<slot :heading-value>
			{{ headingValue }}
		</slot>
	</CalendarHeading>
</template>
