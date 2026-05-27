<script setup lang="ts">
import type { TooltipContentEmits, TooltipContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { TooltipContent, TooltipPortal, useForwardPropsEmits } from "reka-ui"

defineOptions({
	inheritAttrs: false,
})

const {
	class: rawClass,
	sideOffset = 4,
	...props
} = defineProps<TooltipContentProps & { class?: HTMLAttributes["class"] }>()

const emits = defineEmits<TooltipContentEmits>()

const attrs = useAttrs()

const forwarded = useForwardPropsEmits(() => props, emits)

const bindProps = computed(() => ({ ...forwarded.value, ...attrs }))

const className = useClass(
	// Bg Should not be primary
	"bg-card text-card-foreground animate-in fade-in-0 zoom-in-95",
	"data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
	"data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2",
	"data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
	"data-[side=top]:slide-in-from-bottom-2 z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance",
	() => rawClass,
)
</script>

<template>
	<TooltipPortal>
		<TooltipContent
			data-slot="tooltip-content"
			:side-offset="sideOffset"
			v-bind="bindProps"
			:class="className">
			<slot />
		</TooltipContent>
	</TooltipPortal>
</template>
