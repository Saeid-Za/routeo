<script lang="ts" setup>
import type { CalendarHeadCellProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { CalendarHeadCell, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<CalendarHeadCellProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground",
	() => rawClass,
)
</script>

<template>
	<CalendarHeadCell
		:class="className"
		v-bind="forwardedProps">
		<slot />
	</CalendarHeadCell>
</template>
