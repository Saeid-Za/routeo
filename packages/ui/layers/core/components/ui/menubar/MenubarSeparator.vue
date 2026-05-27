<script setup lang="ts">
import type { MenubarSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { MenubarSeparator, useForwardProps } from "reka-ui"

const { class: rawClass, ...props } = defineProps<MenubarSeparatorProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"-mx-1 my-1 h-px bg-muted",
	() => rawClass,
)
</script>

<template>
	<MenubarSeparator
		data-slot="menubar-separator"
		:class="className"
		v-bind="forwardedProps" />
</template>
