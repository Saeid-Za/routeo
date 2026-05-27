<script setup lang="ts">
import type { AlertDialogCancelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { AlertDialogCancel } from "reka-ui"
import { buttonVariants } from "../button"

const { class: rawClass, ...props } = defineProps<AlertDialogCancelProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	buttonVariants({ variant: "outline" }),
	"mt-2 sm:mt-0",
	() => rawClass,
)
</script>

<template>
	<AlertDialogCancel
		v-bind="props"
		:class="className">
		<slot />
	</AlertDialogCancel>
</template>
