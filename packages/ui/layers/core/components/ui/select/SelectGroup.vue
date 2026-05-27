<script setup lang="ts">
import type { SelectGroupProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { SelectGroup } from "reka-ui"

const { class: rawClass, ...props } = defineProps<SelectGroupProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"w-full",
	() => rawClass,
)
</script>

<template>
	<SelectGroup
		data-slot="select-group"
		:class="className"
		v-bind="props">
		<slot />
	</SelectGroup>
</template>
