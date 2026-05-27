<script lang="ts">
import type { MaskitoOptions } from "@maskito/core"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const maskitoOptions: MaskitoOptions = {
	preprocessors: [toEnglishProcessor],
	mask: /(.*?)/,
}
</script>

<script setup lang="ts">
defineOptions({
	inheritAttrs: false,
})

const props = defineProps<{
	placeholder?: string
	class?: HTMLAttributes["class"]
}>()

const slots = defineSlots<{
	prepend: []
	append: []
}>()

const modelValue = defineModel<string>({ required: false })

const className = useClass(
	"flex items-center rounded-md border border-input bg-transparent ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
	() => props.class,
)
</script>

<template>
	<div
		:class="className">
		<div
			v-if="slots.prepend"
			class="p-2">
			<slot
				name="prepend" />
		</div>

		<textarea
			v-bind="$attrs"
			v-model="modelValue"
			v-maskito="maskitoOptions"
			:placeholder="placeholder"
			class="text-sm px-3 py-2 outline-none bg-transparent h-10 min-h-[80px] w-full placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed" />

		<div
			v-if="slots.append"
			class="p-2">
			<slot
				name="append" />
		</div>
	</div>
</template>
