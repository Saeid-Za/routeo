<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "."
import { useClass } from "#imports"
import { Primitive } from "reka-ui"
import { buttonVariants } from "."

type Props = {
	variant?: ButtonVariants["variant"]
	size?: ButtonVariants["size"]
	class?: HTMLAttributes["class"]
} & PrimitiveProps

const { as = "button", ...props } = defineProps<Props>()

const varentClass = computed(() => buttonVariants({ variant: props.variant, size: props.size }))

const className = useClass(
	varentClass,
	() => props.class,
)
</script>

<template>
	<Primitive
		data-slot="button"
		:as="as"
		:as-child="asChild"
		:class="className">
		<slot />
	</Primitive>
</template>
