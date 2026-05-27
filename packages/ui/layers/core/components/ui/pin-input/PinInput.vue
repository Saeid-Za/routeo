<script setup lang="ts">
import type { PinInputRootEmits, PinInputRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { PinInputRoot, useForwardPropsEmits } from "reka-ui"

const {
	modelValue = [],
	class: rawClass,
	...props
} = defineProps<PinInputRootProps<"text" | "number"> & { class?: HTMLAttributes["class"] }>()

const emits = defineEmits<PinInputRootEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"flex items-center gap-2 has-disabled:opacity-50 disabled:cursor-not-allowed",
	() => rawClass,
)
</script>

<template>
	<PinInputRoot
		data-slot="pin-input"
		:model-value="modelValue"
		v-bind="forwarded"
		:class="className">
		<slot />
	</PinInputRoot>
</template>
