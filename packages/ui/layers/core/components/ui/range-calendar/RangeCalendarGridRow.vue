<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { RangeCalendarGridRow, type RangeCalendarGridRowProps, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<RangeCalendarGridRowProps & { class?: HTMLAttributes["class"] }>()

const forwarded = useForwardProps(() => props)

const className = useClass(
	"flex mt-2 w-full",
	() => rawClass,
)
</script>

<template>
	<RangeCalendarGridRow
		:class="className"
		v-bind="forwarded">
		<slot />
	</RangeCalendarGridRow>
</template>
