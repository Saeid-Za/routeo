<script setup lang="ts">
import type { SeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { Separator } from "reka-ui"

const { class: rawClass, decorative = true, ...props } = defineProps<
  SeparatorProps & { class?: HTMLAttributes["class"], label?: string }
>()

const rootClass = useClass(
	"bg-border shrink-0 data-[orientation=horizontal]:h-px",
	"data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
	"data-[orientation=vertical]:w-px",
	() => rawClass,
)
</script>

<template>
	<Separator
		:decorative
		data-slot="separator-root"
		v-bind="props"
		:class="rootClass" />
</template>
