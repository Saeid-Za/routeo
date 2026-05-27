<script setup lang="ts">
import type { SelectContentEmits, SelectContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	SelectContent,

	SelectPortal,
	SelectViewport,
	useForwardPropsEmits,
} from "reka-ui"
import { computed } from "vue"
import SelectScrollDownButton from "./SelectScrollDownButton.vue"
import SelectScrollUpButton from "./SelectScrollUpButton.vue"

defineOptions({
	inheritAttrs: false,
})

const {
	class: rawClass,
	position = "popper",
	...props
} = defineProps<SelectContentProps & { class?: HTMLAttributes["class"] }>()

const emits = defineEmits<SelectContentEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const attrs = useAttrs()

const bindProps = computed(() => ({ ...forwarded.value, ...attrs }))

const positionClass = computed(() => position === "popper" ? "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1" : "")

const className = useClass(
	"relative z-50 max-h-[--reka-select-content-available-height] min-w-32 rounded-md border border-border",
	"bg-popover overflow-y-auto text-popover-foreground shadow-md data-[state=open]:animate-in overflow-x-hidden",
	"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
	"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2",
	"data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
	"data-[side=top]:slide-in-from-bottom-2",
	positionClass,
	() => rawClass,
)

const viewPortPositionClass = computed(() => position === "popper" ? "h-[--reka-select-trigger-height] w-full min-w-[--reka-select-trigger-width] scroll-my-1" : "")
const viewPortClass = useClass(
	"p-1",
	viewPortPositionClass,
)
</script>

<template>
	<SelectPortal>
		<SelectContent
			data-slot="select-content"
			:position
			v-bind="bindProps"
			:class="className">
			<SelectScrollUpButton />

			<SelectViewport :class="viewPortClass">
				<slot />
			</SelectViewport>

			<SelectScrollDownButton />
		</SelectContent>
	</SelectPortal>
</template>
