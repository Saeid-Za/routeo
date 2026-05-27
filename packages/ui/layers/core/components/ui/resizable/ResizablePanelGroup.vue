<script setup lang="ts">
import type { SplitterGroupEmits, SplitterGroupProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { SplitterGroup, useForwardPropsEmits } from "reka-ui"

const { class: rawClass, ...props } = defineProps<SplitterGroupProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<SplitterGroupEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"flex size-full data-[orientation=vertical]:flex-col",
	() => rawClass,
)
</script>

<template>
	<SplitterGroup
		data-slot="resizable-panel-group"
		v-bind="forwarded"
		:class="className">
		<slot />
	</SplitterGroup>
</template>
