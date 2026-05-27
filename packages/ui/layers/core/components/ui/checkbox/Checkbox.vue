<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui"

const { class: rawClass, ...props } = defineProps<CheckboxRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<CheckboxRootEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"peer border-input data-[state=checked]:bg-primary",
	"data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary",
	"focus-visible:border-ring focus-visible:ring-ring/50",
	"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
	"aria-invalid:border-destructive size-4 shrink-0",
	"rounded-[4px] border shadow transition-shadow outline-none",
	"focus-visible:ring disabled:cursor-not-allowed disabled:opacity-50",
	() => rawClass,
)
</script>

<template>
	<CheckboxRoot
		data-slot="checkbox"
		v-bind="forwarded"
		:class="className">
		<CheckboxIndicator
			data-slot="checkbox-indicator"
			class="text-current flex transition-none items-center justify-center">
			<slot>
				<Icon
					name="i-heroicons:check-16-solid"
					class="size-4" />
			</slot>
		</CheckboxIndicator>
	</CheckboxRoot>
</template>
