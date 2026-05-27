<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from "reka-ui"
import { useForwardPropsEmits } from "reka-ui"
import Dialog from "../dialog/Dialog.vue"
import DialogContent from "../dialog/DialogContent.vue"
import DialogDescription from "../dialog/DialogDescription.vue"
import DialogHeader from "../dialog/DialogHeader.vue"
import DialogTitle from "../dialog/DialogTitle.vue"
import Command from "./Command.vue"

const {
	title = "Command Palette",
	description = "Search for a command to run...",
	...props
} = defineProps<DialogRootProps & {
	title?: string
	description?: string
}>()

const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
	<Dialog v-bind="forwarded">
		<DialogContent class="p-0 overflow-hidden">
			<DialogHeader class="sr-only">
				<DialogTitle>{{ title }}</DialogTitle>

				<DialogDescription>{{ description }}</DialogDescription>
			</DialogHeader>

			<Command>
				<slot />
			</Command>
		</DialogContent>
	</Dialog>
</template>
