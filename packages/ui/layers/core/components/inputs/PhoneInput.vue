<script lang="ts">
import type { MaskitoOptions } from "@maskito/core"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const onlyDigitsInput: MaskitoOptions = {
	mask: /^\d+$/,
	preprocessors: [toEnglishProcessor],
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

const modelValue = defineModel<string | number>({ required: false, default: "" })

const className = useClass(
	"flex items-center rounded-lg border border-input bg-transparent ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
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

		<input
			v-bind="$attrs"
			v-model="modelValue"
			v-maskito="onlyDigitsInput"
			type="tel"
			:placeholder="placeholder"
			class="text-sm px-3 py-2 outline-none rounded-lg border-none bg-transparent h-8 w-full d-ltr placeholder:text-muted-foreground/60 placeholder:text-end focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">

		<div
			v-if="slots.append"
			class="p-2">
			<slot
				name="append" />
		</div>
	</div>
</template>
