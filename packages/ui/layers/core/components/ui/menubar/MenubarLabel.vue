<script setup lang="ts">
import type { MenubarLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { MenubarLabel } from "reka-ui"

const props = defineProps<MenubarLabelProps & { class?: HTMLAttributes["class"], inset?: boolean }>()

const className = useClass(
	"px-2 py-1.5 text-sm font-medium data-[inset]:ps-8",
	() => props.class,
)
</script>

<template>
	<MenubarLabel
		:data-inset="inset ? '' : undefined"
		:class="className">
		<slot />
	</MenubarLabel>
</template>
