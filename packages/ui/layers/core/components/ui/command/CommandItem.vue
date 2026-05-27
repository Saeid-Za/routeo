<script setup lang="ts">
import type { ListboxItemEmits, ListboxItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { ListboxItem, useForwardPropsEmits } from "reka-ui"

const { class: rawClass, ...props } = defineProps<ListboxItemProps & { class?: HTMLAttributes["class"] }>()

const emits = defineEmits<ListboxItemEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
	"[&_svg:not([class*='text-'])]:text-muted-foreground",
	"relative flex cursor-default items-center gap-2",
	// Padding Should be minimal
	"rounded-sm px-2 py-1 text-sm outline-none select-none",
	"data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
	"[&_svg]:pointer-events-none [&_svg]:shrink-0",
	() => rawClass,
)
</script>

<template>
	<ListboxItem
		v-bind="forwarded"
		data-slot="command-item"
		:class="className">
		<slot />
	</ListboxItem>
</template>
