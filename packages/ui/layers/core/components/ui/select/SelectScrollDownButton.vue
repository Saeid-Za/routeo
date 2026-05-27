<script setup lang="ts">
import type { SelectScrollDownButtonProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { SelectScrollDownButton, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<SelectScrollDownButtonProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"flex cursor-default items-center justify-center py-1",
	() => rawClass,
)
</script>

<template>
	<SelectScrollDownButton
		data-slot="select-scroll-down-button"
		v-bind="forwardedProps"
		:class="className">
		<slot>
			<Icon name="i-heroicons:chevron-down-16-solid" />
		</slot>
	</SelectScrollDownButton>
</template>
