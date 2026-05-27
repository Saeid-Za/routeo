<script setup lang="ts">
import type { ProgressRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	ProgressIndicator,
	ProgressRoot,

} from "reka-ui"
import { computed } from "vue"

const {
	class: rawClass,
	modelValue = 0,
	...props
} = defineProps<ProgressRootProps & { class?: HTMLAttributes["class"] }>()

const computedStyle = computed(() => {
	return `transform: translateX(-${100 - (modelValue ?? 0)}%);`
})

const className = useClass(
	"relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
	() => rawClass,
)
</script>

<template>
	<ProgressRoot
		v-bind="props"
		:class="className">
		<ProgressIndicator
			data-slot="progress-indicator"
			class="bg-primary flex-1 size-full transition-all"
			:style="computedStyle" />
	</ProgressRoot>
</template>
