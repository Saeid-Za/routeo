<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { AlertVariants } from "."
import { useClass } from "#imports"
import { alertVariants } from "."

const props = defineProps<{
	class?: HTMLAttributes["class"]
	variant?: AlertVariants["variant"]
}>()

const varentClass = computed(() => alertVariants({ variant: props.variant }))

const className = useClass(
	varentClass,
	() => props.class,
)
</script>

<template>
	<div
		data-slot="alert"
		:class="className"
		role="alert">
		<slot />
	</div>
</template>
