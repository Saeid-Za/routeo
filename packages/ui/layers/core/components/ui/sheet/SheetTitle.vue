<script setup lang="ts">
import type { DialogTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { DialogTitle } from "reka-ui"

const { class: rawClass, ...props } = defineProps<DialogTitleProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"text-foreground font-semibold",
	() => rawClass,
)
</script>

<template>
	<DialogTitle
		data-slot="sheet-title"
		:class="className"
		v-bind="props">
		<slot />
	</DialogTitle>
</template>
