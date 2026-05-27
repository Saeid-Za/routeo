<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { Primitive, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"flex items-center",
	() => rawClass,
)
</script>

<template>
	<Primitive
		data-slot="pin-input-group"
		v-bind="forwardedProps"
		:class="className">
		<slot />
	</primitive>
</template>
