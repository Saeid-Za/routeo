<script setup lang="ts">
import type { ToggleEmits, ToggleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ToggleVariants } from "."
import { useClass } from "#imports"
import { Toggle, useForwardPropsEmits } from "reka-ui"
import { computed } from "vue"
import { toggleVariants } from "."

const {
	class: rawClass,
	variant = "default",
	size = "default",
	disabled = false,
	...props
} = defineProps<ToggleProps & {
	class?: HTMLAttributes["class"]
	variant?: ToggleVariants["variant"]
	size?: ToggleVariants["size"]
}>()

const emits = defineEmits<ToggleEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const toggleClass = computed(() => toggleVariants({ variant, size }))

const className = useClass(
	toggleClass,
	() => rawClass,
)
</script>

<template>
	<Toggle
		data-slot="toggle"
		:disabled="disabled"
		v-bind="forwarded"
		:class="className">
		<slot />
	</Toggle>
</template>
