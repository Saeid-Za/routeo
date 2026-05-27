<script setup lang="ts">
import type { SelectScrollUpButtonProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { SelectScrollUpButton, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<SelectScrollUpButtonProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"flex cursor-default items-center justify-center py-1",
	() => rawClass,
)
</script>

<template>
	<SelectScrollUpButton
		data-slot="select-scroll-up-button"
		v-bind="forwardedProps"
		:class="className">
		<slot>
			<Icon name="i-heroicons:chevron-up-16-solid" />
		</slot>
	</SelectScrollUpButton>
</template>
