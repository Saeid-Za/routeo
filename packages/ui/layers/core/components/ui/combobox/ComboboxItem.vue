<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ComboboxItem, useForwardPropsEmits } from "reka-ui"

const { class: rawClass, ...props } = defineProps<ComboboxItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<ComboboxItemEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
	"[&_svg:not([class*='text-'])]:text-muted-foreground relative",
	"flex cursor-default items-center gap-2 rounded-sm",
	"px-2 py-1.5 text-sm outline-none select-none",
	"data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
	"[&_svg]:pointer-events-none [&_svg]:shrink-0",
	() => rawClass,
)
</script>

<template>
	<ComboboxItem
		data-slot="combobox-item"
		v-bind="forwarded"
		:class="className">
		<slot />
	</ComboboxItem>
</template>
