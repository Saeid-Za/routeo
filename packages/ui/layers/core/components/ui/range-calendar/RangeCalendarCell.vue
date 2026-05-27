<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { RangeCalendarCell, type RangeCalendarCellProps, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<RangeCalendarCellProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:bg-accent first:[&:has([data-selected])]:rounded-l-md last:[&:has([data-selected])]:rounded-r-md [&:has([data-selected][data-outside-view])]:bg-accent/50 [&:has([data-selected][data-selection-end])]:rounded-r-md [&:has([data-selected][data-selection-start])]:rounded-l-md",
	() => rawClass,
)
</script>

<template>
	<RangeCalendarCell
		:class="className"
		v-bind="forwardedProps">
		<slot />
	</RangeCalendarCell>
</template>
