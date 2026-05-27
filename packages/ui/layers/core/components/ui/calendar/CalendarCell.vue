<script lang="ts" setup>
import type { CalendarCellProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { CalendarCell, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<CalendarCellProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-accent [&:has([data-selected][data-outside-view])]:bg-accent/50",
	() => rawClass,
)
</script>

<template>
	<CalendarCell
		:class="className"
		v-bind="forwardedProps">
		<slot />
	</CalendarCell>
</template>
