<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { BadgeVariants } from "."
import { useClass } from "#imports"
import { Primitive } from "reka-ui"
import { badgeVariants } from "."

const { class: rawClass, ...props } = defineProps<{
	variant?: BadgeVariants["variant"]
	class?: HTMLAttributes["class"]
}>()

const badgeVarientClass = computed(() => badgeVariants({ variant: props.variant }))

const className = useClass(
	badgeVarientClass,
	() => rawClass,
)
</script>

<template>
	<Primitive
		data-slot="badge"
		v-bind="props"
		:class="className">
		<slot />
	</Primitive>
</template>
