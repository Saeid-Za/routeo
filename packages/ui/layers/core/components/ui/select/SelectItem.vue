<script setup lang="ts">
import type { SelectItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	SelectItem,
	SelectItemIndicator,
	SelectItemText,
	useForwardProps,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<SelectItemProps & { class?: HTMLAttributes["class"] }>()

const forwardedProps = useForwardProps(() => props)

const className = useClass(
	"focus:bg-accent focus:text-accent-foreground relative flex w-full",
	"cursor-default items-center gap-2 rounded-sm py-1.5 pe-8 ps-2",
	"text-sm outline-none select-none data-[disabled]:pointer-events-none",
	"data-[disabled]:opacity-50 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
	() => rawClass,
)
</script>

<template>
	<SelectItem
		v-bind="forwardedProps"
		data-slot="select-item"
		:class="className">
		<span class="flex size-3.5 items-center end-2 justify-center absolute">
			<SelectItemIndicator>
				<Icon
					name="i-heroicons:check-16-solid"
					class="size-4" />
			</SelectItemIndicator>
		</span>

		<SelectItemText>
			<slot />
		</SelectItemText>
	</SelectItem>
</template>
