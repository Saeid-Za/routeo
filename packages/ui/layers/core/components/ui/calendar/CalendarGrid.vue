<script lang="ts" setup>
import type { CalendarGridProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { CalendarGrid, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<CalendarGridProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"w-full border-collapse space-y-1",
	() => rawClass,
)
</script>

<template>
	<CalendarGrid
		:class="className"
		v-bind="forwardedProps">
		<slot />
	</CalendarGrid>
</template>
