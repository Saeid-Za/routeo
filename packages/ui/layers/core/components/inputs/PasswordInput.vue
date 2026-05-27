<script lang="ts">
import type { MaskitoOptions } from "@maskito/core"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { useMousePressed } from "@vueuse/core"

const transformer: MaskitoOptions = {
	mask: /(.*?)/,
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

const modelValue = defineModel<string | number>({ required: false })

const internalType = defineModel<"text" | "password">("type", { default: "password" })

const iconElement = useTemplateRef("iconElement")
const { pressed } = useMousePressed({ target: iconElement })

const className = useClass(
	"flex items-center rounded-md border border-input bg-transparent ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
	() => props.class,
)

watchEffect(() => {
	if (pressed.value) {
		internalType.value = "text"
	}
	else {
		internalType.value = "password"
	}
})
</script>

<template>
	<div
		:class="className">
		<div
			v-if="slots.prepend"
			class="ps-2 flex items-center">
			<slot
				name="prepend" />
		</div>

		<input
			v-bind="$attrs"
			v-model="modelValue"
			v-maskito="transformer"
			:placeholder="placeholder"
			class="text-sm px-3 py-2 outline-none bg-transparent h-10 w-full placeholder:text-muted-foreground focus:outline-none disabled:!opacity-50 disabled:!cursor-not-allowed"
			:type="internalType">

		<Icon
			ref="iconElement"
			class="me-2"
			:name="internalType === 'password' ? 'i-heroicons:eye' : 'i-heroicons:eye-slash'" />

		<div
			v-if="slots.append"
			class="p-2">
			<slot
				name="append" />
		</div>
	</div>
</template>
