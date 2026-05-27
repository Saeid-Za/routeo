<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ComboboxInput, type ComboboxInputEmits, type ComboboxInputProps, useForwardPropsEmits } from "reka-ui"

defineOptions({
	inheritAttrs: false,
})

const { class: rawClass, ...props } = defineProps<ComboboxInputProps & {
	class?: HTMLAttributes["class"]
}>()

const emits = defineEmits<ComboboxInputEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"placeholder:text-muted-foreground flex h-10 w-full",
	"rounded-md bg-transparent py-3 text-sm outline-none",
	"disabled:cursor-not-allowed disabled:opacity-50",
	() => rawClass,
)

const attrs = useAttrs()

const bindProps = computed(() => ({ ...forwarded.value, ...attrs }))
</script>

<template>
	<div
		data-slot="command-input-wrapper"
		class="px-3 border-b border-border flex gap-2 h-9 items-center">
		<Icon
			name="i-ph:magnifying-glass-bold"
			class="opacity-50 shrink-0 size-4" />

		<ComboboxInput
			data-slot="command-input"
			:class="className"
			v-bind="bindProps">
			<slot />
		</ComboboxInput>
	</div>
</template>
