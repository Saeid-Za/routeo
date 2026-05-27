<script setup lang="ts">
import type { SeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { Separator } from "reka-ui"

const { class: rawClass, ...props } = defineProps<SeparatorProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"bg-border -mx-1 h-px",
	() => rawClass,
)
</script>

<template>
	<Separator
		data-slot="command-separator"
		v-bind="props"
		:class="className">
		<slot />
	</Separator>
</template>
