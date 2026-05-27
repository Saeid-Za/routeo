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

const { class: rawClass, ...props } = defineProps<DialogContentProps & { class?: HTMLAttributes["class"], hideClose?: boolean }>()
const emits = defineEmits<DialogContentEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out",
	"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
	"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
	"fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)]",
	"translate-x-[-50%] translate-y-[-50%] gap-4",
	"rounded-lg border border-border p-6 shadow-lg duration-200 sm:max-w-lg",
	() => rawClass,
)
</script>

<template>
	<DialogPortal>
		<DialogOverlay
			data-slot="dialog-overlay"
			class="bg-background/80 inset-0 fixed z-50 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />

		<DialogContent
			data-slot="dialog-content"
			v-bind="forwarded"
			:class="className">
			<slot />

			<DialogClose
				v-if="!hideClose"
				class="rounded-sm bg-transparent opacity-70 flex transition-opacity items-center end-4 top-4 absolute focus:outline-none hover:opacity-100 disabled:pointer-events-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
				<Icon
					name="i-mdi:close-circle-outline" />

				<span class="sr-only">Close</span>
			</DialogClose>
		</DialogContent>
	</DialogPortal>
</template>
