<script setup lang="ts">
import type { ListboxFilterProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { ListboxFilter, useForwardProps } from "reka-ui"

defineOptions({
	inheritAttrs: false,
})

const { class: rawClass, ...props } = defineProps<ListboxFilterProps & {
	class?: HTMLAttributes["class"]
}>()

const query = defineModel<string>({ required: true })

const forwardedProps = useForwardProps(() => props)

const attrs = useAttrs()

const bindProps = computed(() => ({ ...forwardedProps.value, ...attrs }))

const className = useClass(
	"placeholder:text-muted-foreground flex h-12 w-full rounded-md",
	"bg-transparent py-3 text-sm outline-none",
	"disabled:cursor-not-allowed disabled:opacity-50",
	() => rawClass,
)
</script>

<template>
	<div
		data-slot="command-input-wrapper"
		class="order-b px-3 border-border flex gap-2 h-12 items-center">
		<Icon
			name="i-ph:magnifying-glass-bold"
			class="opacity-50 shrink-0 size-4" />

		<ListboxFilter
			v-bind="bindProps"
			v-model="query"
			data-slot="command-input"
			auto-focus
			:class="className" />
	</div>
</template>
