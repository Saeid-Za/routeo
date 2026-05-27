<script setup lang="ts">
import type { SelectLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { SelectLabel } from "reka-ui"

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"px-2 py-1.5 text-sm font-medium",
	() => props.class,
)
</script>

<template>
	<SelectLabel
		data-slot="select-label"
		:class="className">
		<slot />
	</SelectLabel>
</template>
