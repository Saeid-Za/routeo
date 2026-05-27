<script lang="ts">
import type { MaskitoOptions } from "@maskito/core"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const onlyDigitsInput: MaskitoOptions = {
	mask: /^\d+(\.\d+)?$/,
	preprocessors: [toEnglishProcessor],
}

const digitsWithSignInput: MaskitoOptions = {
	mask: /^-?\d*(?:\.\d*)?$/,
	preprocessors: [toEnglishProcessor],
}
</script>

<script setup lang="ts">
defineOptions({
	inheritAttrs: false,
})

const { class: className = "" } = defineProps<{
	placeholder?: string
	allowSign?: boolean
	class?: HTMLAttributes["class"]
}>()

const slots = defineSlots<{
	prepend: []
	append: []
}>()

const modelValue = defineModel<string | number>({ required: false, default: "" })

const rootClass = useClass(
	"flex items-center english rounded-md border border-input bg-transparent ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
	() => className,
)
</script>

<template>
	<div
		:class="rootClass">
		<div
			v-if="slots.prepend"
			class="ps-2 flex items-center">
			<slot
				name="prepend" />
		</div>

		<input
			v-bind="$attrs"
			v-model="modelValue"
			v-maskito="allowSign ? digitsWithSignInput : onlyDigitsInput"
			:placeholder="placeholder"
			type="tel"
			class="text-sm px-3 py-2 outline-none bg-transparent h-10 w-full d-ltr placeholder:text-muted-foreground/60 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">

		<div
			v-if="slots.append"
			class="pe-2 flex items-center">
			<slot
				name="append" />
		</div>
	</div>
</template>
