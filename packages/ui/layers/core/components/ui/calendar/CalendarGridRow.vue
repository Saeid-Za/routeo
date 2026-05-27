<script lang="ts" setup>
import type { CalendarGridRowProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { CalendarGridRow, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<CalendarGridRowProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"flex",
	() => rawClass,
)
</script>

<template>
	<CalendarGridRow
		:class="className"
		v-bind="forwardedProps">
		<slot />
	</CalendarGridRow>
</template>
