<script setup lang="ts">
import type { DialogDescriptionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { DialogDescription } from "reka-ui"

const { class: rawClass, ...props } = defineProps<DialogDescriptionProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"text-sm text-muted-foreground",
	() => rawClass,
)
</script>

<template>
	<DialogDescription
		data-slot="sheet-description"
		:class="className"
		v-bind="props">
		<slot />
	</DialogDescription>
</template>
