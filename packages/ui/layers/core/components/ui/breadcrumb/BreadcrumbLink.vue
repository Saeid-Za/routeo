<script lang="ts" setup>
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { Primitive } from "reka-ui"

const { as = "a", ...props } = defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"hover:text-foreground transition-colors",
	() => props.class,
)
</script>

<template>
	<Primitive
		data-slot="breadcrumb-link"
		:as="as"
		:as-child="asChild"
		:class="className">
		<slot />
	</Primitive>
</template>
