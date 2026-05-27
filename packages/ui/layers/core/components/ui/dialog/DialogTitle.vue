<script setup lang="ts">
import type { DialogTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { DialogTitle, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<DialogTitleProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"text-lg font-semibold leading-none tracking-tight",
	() => rawClass,
)
</script>

<template>
	<DialogTitle
		data-slot="dialog-title"
		v-bind="forwardedProps"
		:class="className">
		<slot />
	</DialogTitle>
</template>
