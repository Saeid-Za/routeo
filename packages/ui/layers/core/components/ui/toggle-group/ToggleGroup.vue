<script setup lang="ts">
import type { VariantProps } from "class-variance-authority"
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { toggleVariants } from "../toggle"
import { useClass } from "#imports"
import { ToggleGroupRoot, useForwardPropsEmits } from "reka-ui"
import { provide } from "vue"

type ToggleGroupVariants = VariantProps<typeof toggleVariants>

const { class: rawClass, ...props } = defineProps<ToggleGroupRootProps & {
	class?: HTMLAttributes["class"]
	variant?: ToggleGroupVariants["variant"]
	size?: ToggleGroupVariants["size"]
}>()

const emits = defineEmits<ToggleGroupRootEmits>()

provide("toggleGroup", {
	variant: props.variant,
	size: props.size,
})

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow",
	() => rawClass,
)
</script>

<template>
	<ToggleGroupRoot
		data-slot="toggle-group"
		v-bind="forwarded"
		:class="className">
		<slot />
	</ToggleGroupRoot>
</template>
