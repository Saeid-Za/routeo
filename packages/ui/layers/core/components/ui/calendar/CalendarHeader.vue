<script lang="ts" setup>
import type { CalendarHeaderProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { CalendarHeader, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<CalendarHeaderProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"relative flex w-full items-center justify-between pt-1",
	() => rawClass,
)
</script>

<template>
	<CalendarHeader
		:class="className"
		v-bind="forwardedProps">
		<slot />
	</CalendarHeader>
</template>
