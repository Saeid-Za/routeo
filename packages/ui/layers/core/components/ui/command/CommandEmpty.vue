<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { Primitive, type PrimitiveProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"py-6 text-center text-sm",
	() => rawClass,
)
</script>

<template>
	<Primitive
		data-slot="command-empty"
		v-bind="props"
		:class="className">
		<slot />
	</Primitive>
</template>
