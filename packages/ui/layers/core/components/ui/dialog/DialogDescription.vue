<script setup lang="ts">
import type { DialogDescriptionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { DialogDescription, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<DialogDescriptionProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"text-sm text-muted-foreground",
	() => rawClass,
)
</script>

<template>
	<DialogDescription
		data-slot="dialog-description"
		v-bind="forwardedProps"
		:class="className">
		<slot />
	</DialogDescription>
</template>
