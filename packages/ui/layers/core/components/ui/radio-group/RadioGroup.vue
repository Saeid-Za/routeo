<script setup lang="ts">
import type { RadioGroupRootEmits, RadioGroupRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { RadioGroupRoot, useForwardPropsEmits } from "reka-ui"

const { class: rawClass, ...props } = defineProps<RadioGroupRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<RadioGroupRootEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"grid gap-3",
	() => rawClass,
)
</script>

<template>
	<RadioGroupRoot
		data-slot="radio-group"
		:class="className"
		v-bind="forwarded">
		<slot />
	</RadioGroupRoot>
</template>
