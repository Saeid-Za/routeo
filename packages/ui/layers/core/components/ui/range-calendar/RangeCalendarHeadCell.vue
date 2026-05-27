<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { RangeCalendarHeadCell, type RangeCalendarHeadCellProps, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<RangeCalendarHeadCellProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground",
	() => rawClass,
)
</script>

<template>
	<RangeCalendarHeadCell
		:class="className"
		v-bind="forwardedProps">
		<slot />
	</RangeCalendarHeadCell>
</template>
