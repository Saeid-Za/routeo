<script lang="ts" setup>
import type { DialogOverlayProps } from "reka-ui"
import type { HtmlHTMLAttributes } from "vue"
import { useClass } from "#imports"
import { DrawerOverlay } from "vaul-vue"

const { class: rawClass, ...props } = defineProps<DialogOverlayProps & { class?: HtmlHTMLAttributes["class"] }>()

const className = useClass(
	"fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
	"data-[state=open]:animate-in data-[state=closed]:animate-out",
	"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
	() => rawClass,
)
</script>

<template>
	<DrawerOverlay
		data-slot="drawer-overlay"
		v-bind="props"
		:class="className" />
</template>
