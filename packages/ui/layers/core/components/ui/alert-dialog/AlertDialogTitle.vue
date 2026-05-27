<script setup lang="ts">
import type { AlertDialogTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { AlertDialogTitle } from "reka-ui"

const { class: rawClass, ...props } = defineProps<AlertDialogTitleProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"text-lg font-semibold",
	() => rawClass,
)
</script>

<template>
	<AlertDialogTitle
		data-slot="alert-dialog-title"
		v-bind="props"
		:class="className">
		<slot />
	</AlertDialogTitle>
</template>
