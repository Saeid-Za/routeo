<script setup lang="ts">
import type { AlertDialogContentEmits, AlertDialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	AlertDialogContent,
	AlertDialogOverlay,
	AlertDialogPortal,
	useForwardPropsEmits,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<AlertDialogContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<AlertDialogContentEmits>()

const className = useClass(
	"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out",
	"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
	"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
	"fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)]",
	"translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-border p-6",
	"shadow-lg duration-200 sm:max-w-lg",
	() => rawClass,
)

const forwarded = useForwardPropsEmits(() => props, emits)
</script>

<template>
	<AlertDialogPortal>
		<AlertDialogOverlay
			data-slot="alert-dialog-overlay"
			class="bg-background/80 inset-0 fixed z-50 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />

		<AlertDialogContent
			data-slot="alert-dialog-content"
			v-bind="forwarded"
			:class="className">
			<slot />
		</AlertDialogContent>
	</AlertDialogPortal>
</template>
