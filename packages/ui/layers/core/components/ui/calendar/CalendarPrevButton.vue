<script lang="ts" setup>
import type { CalendarPrevProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { CalendarPrev, useForwardProps } from "reka-ui"
import { buttonVariants } from "../button"

const { class: rawClass, ...props } = defineProps<CalendarPrevProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	buttonVariants({ variant: "outline" }),
	"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
	() => rawClass,
)
</script>

<template>
	<CalendarPrev
		:class="className"
		v-bind="forwardedProps">
		<slot>
			<Icon
				name="i-heroicons:chevron-right-16-solid"
				class="size-4" />
		</slot>
	</CalendarPrev>
</template>
