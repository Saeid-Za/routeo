<script setup lang="ts">
import type { AlertDialogActionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { AlertDialogAction } from "reka-ui"
import { buttonVariants } from "../button"

const { class: rawClass, ...props } = defineProps<AlertDialogActionProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	buttonVariants(),
	() => rawClass,
)
</script>

<template>
	<AlertDialogAction
		v-bind="props"
		:class="className">
		<slot />
	</AlertDialogAction>
</template>
