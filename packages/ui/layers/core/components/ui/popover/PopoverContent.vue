<script setup lang="ts">
import type { PopoverContentEmits, PopoverContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	PopoverContent,

	PopoverPortal,
	useForwardPropsEmits,
} from "reka-ui"

defineOptions({
	inheritAttrs: false,
})

const {
	class: rawClass,
	align = "center",
	sideOffset = 4,
	...props
} = defineProps<PopoverContentProps & { class?: HTMLAttributes["class"] }>()

const emits = defineEmits<PopoverContentEmits>()

const attrs = useAttrs()

const forwarded = useForwardPropsEmits(() => props, emits)

const bindProps = computed(() => ({ ...forwarded.value, ...attrs }))

const className = useClass(
	"bg-popover text-popover-foreground data-[state=open]:animate-in",
	"data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
	"data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95",
	"data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2",
	"data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
	"data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border border-border p-4",
	"shadow-md origin-[--reka-popover-content-transform-origin] outline-none",
	() => rawClass,
)
</script>

<template>
	<PopoverPortal>
		<PopoverContent
			data-slot="popover-content"
			:align
			:side-offset
			v-bind="bindProps"
			:class="className">
			<slot />
		</PopoverContent>
	</PopoverPortal>
</template>
