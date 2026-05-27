<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { RangeCalendarNext, type RangeCalendarNextProps, useForwardProps } from "reka-ui"
import { buttonVariants } from "../button"

const { class: rawClass, ...props } = defineProps<RangeCalendarNextProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	// Should be ghost
	buttonVariants({ variant: "ghost" }),
	"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
	() => rawClass,
)

const forwardedProps = useForwardProps(() => props)
</script>

<template>
	<RangeCalendarNext
		:class="className"
		v-bind="forwardedProps">
		<slot>
			<Icon
				name="i-lucide:chevron-left"
				class="size-4 rtl:rotate-180" />
		</slot>
	</RangeCalendarNext>
</template>
