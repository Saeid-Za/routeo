<script setup lang="ts">
import type { AlertDialogDescriptionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { AlertDialogDescription } from "reka-ui"

const { class: rawClass, ...props } = defineProps<AlertDialogDescriptionProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"text-sm text-muted-foreground",
	() => rawClass,
)
</script>

<template>
	<AlertDialogDescription
		data-slot="alert-dialog-description"
		v-bind="props"
		:class="className">
		<slot />
	</AlertDialogDescription>
</template>
