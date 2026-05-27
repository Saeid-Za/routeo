<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { RangeCalendarHeader, type RangeCalendarHeaderProps, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<RangeCalendarHeaderProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"relative flex w-full items-center justify-between pt-1",
	() => rawClass,
)

const forwardedProps = useForwardProps(() => props)
</script>

<template>
	<RangeCalendarHeader
		:class="className"
		v-bind="forwardedProps">
		<slot />
	</RangeCalendarHeader>
</template>
