<script setup lang="ts">
import type { PinInputInputProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { PinInputInput, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<PinInputInputProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"border-input focus:border-ring focus:ring-ring/50 focus:aria-invalid:ring-destructive/20",
	"dark:bg-input/30 dark:focus:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	"focus:aria-invalid:border-destructive relative flex size-9",
	"items-center justify-center border-y border-e text-sm shadow transition-all",
	"outline-none text-center first:rounded-s-md first:border-s last:rounded-e-md",
	"focus:z-10 focus:ring",
	() => rawClass,
)
</script>

<template>
	<PinInputInput
		data-slot="pin-input-slot"
		v-bind="forwardedProps"
		:class="className" />
</template>
