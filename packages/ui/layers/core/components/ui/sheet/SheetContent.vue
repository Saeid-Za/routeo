<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	DialogClose,
	DialogContent,
	DialogOverlay,
	DialogPortal,
	useForwardPropsEmits,
} from "reka-ui"

type SheetContentProps = {
	class?: HTMLAttributes["class"]
	side?: "top" | "right" | "bottom" | "left"
	showClose?: boolean
} & DialogContentProps

defineOptions({
	inheritAttrs: false,
})

const { class: rawClass, side, ...props } = defineProps<SheetContentProps>()

const emits = defineEmits<DialogContentEmits>()

const attrs = useAttrs()

const forwarded = useForwardPropsEmits(() => props, emits)

const bindedProps = computed(() => ({ ...forwarded.value, ...attrs }))

const className = useClass(
	"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex",
	"flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
	() => side === "right"
		? "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm"
		: "",
	() => side === "left"
		? "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm"
		: "",
	() => side === "top"
		? "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b"
		: "",
	() => side === "bottom"
		? "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t"
		: "",
	() => rawClass,
)
</script>

<template>
	<DialogPortal>
		<DialogOverlay
			data-slot="sheet-overlay"
			class="bg-background/80 inset-0 fixed z-50 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />

		<DialogContent
			data-slot="sheet-content"
			:class="className"
			v-bind="bindedProps">
			<slot />

			<DialogClose
				v-if="showClose"
				class="rounded opacity-70 ring-offset-background transition-opacity end-4 top-4 absolute focus:outline-none data-[state=open]:bg-secondary hover:opacity-100 disabled:pointer-events-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
				<Icon
					name="i-heroicons:x-mark-16-solid"
					class="size-4" />

				<span class="sr-only">Close</span>
			</DialogClose>
		</DialogContent>
	</DialogPortal>
</template>
