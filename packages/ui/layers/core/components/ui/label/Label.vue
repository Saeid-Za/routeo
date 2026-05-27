<script setup lang="ts">
import type { LabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { Label } from "reka-ui"

const { class: rawClass, ...props } = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"flex items-center gap-2 text-sm leading-none font-medium",
	"select-none group-data-[disabled=true]:pointer-events-none",
	"group-data-[disabled=true]:opacity-50",
	"peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
	() => rawClass,
)
</script>

<template>
	<Label
		data-slot="label"
		v-bind="props"
		:class="className">
		<slot />
	</Label>
</template>
