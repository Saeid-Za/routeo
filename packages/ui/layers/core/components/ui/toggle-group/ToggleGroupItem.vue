<script setup lang="ts">
import type { VariantProps } from "class-variance-authority"
import type { ToggleGroupItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { ToggleGroupItem, useForwardProps } from "reka-ui"
import { computed, inject } from "vue"
import { toggleVariants } from "../toggle"

type ToggleGroupVariants = VariantProps<typeof toggleVariants>

const { class: rawClass, size, variant, ...props } = defineProps<ToggleGroupItemProps & {
	class?: HTMLAttributes["class"]
	variant?: ToggleGroupVariants["variant"]
	size?: ToggleGroupVariants["size"]
}>()

const context = inject<ToggleGroupVariants>("toggleGroup")

const forwardedProps = useForwardProps(() => props)

const toggleClass = computed(() => toggleVariants({
	variant: context?.variant || variant,
	size: context?.size || size,
}))

const className = useClass(
	toggleClass,
	"min-w-0 flex-1 shrink-0 rounded-none shadow-none",
	"first:rounded-s-md last:rounded-e-md",
	"focus:z-10 focus-visible:z-10",
	"data-[variant=outline]:border-s-0 data-[variant=outline]:first:border-s",
	() => rawClass,
)
</script>

<template>
	<ToggleGroupItem
		data-slot="toggle-group-item"
		v-bind="forwardedProps"
		:data-variant="context?.variant || variant"
		:data-size="context?.size || size"
		:class="className">
		<slot />
	</ToggleGroupItem>
</template>
