<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { RangeCalendarGrid, type RangeCalendarGridProps, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<RangeCalendarGridProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"w-full border-collapse space-y-1",
	() => rawClass,
)
</script>

<template>
	<RangeCalendarGrid
		:class="className"
		v-bind="forwardedProps">
		<slot />
	</RangeCalendarGrid>
</template>
