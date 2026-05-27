<script setup lang="ts">
import type { ComboboxAnchorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ComboboxAnchor, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<ComboboxAnchorProps & { class?: HTMLAttributes["class"] }>()

const forwarded = useForwardProps(props)

const className = useClass(
	"w-[200px]",
	() => rawClass,
)
</script>

<template>
	<ComboboxAnchor
		data-slot="combobox-anchor"
		v-bind="forwarded"
		:class="className">
		<slot />
	</ComboboxAnchor>
</template>
