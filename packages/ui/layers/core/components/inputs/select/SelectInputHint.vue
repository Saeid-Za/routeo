<script lang="ts" setup>
import type { Option } from "~/types"

const { options = [], ...props } = defineProps<{
	modelValue?: any | any[]
	multiple?: boolean
	placeholder?: string
	options?: Option[]
}>()

const { t } = useLanguage()

const hasValue = computed(() => props.multiple ? !!props.modelValue && props.modelValue?.length !== 0 : !!props.modelValue)
const labelOfValue = computed(() => {
	const labelItem = options.find(item => item.value === props.modelValue)
	return labelItem?.label
})

const joinedLabelOfOptions = computed(() => {
	const selectedValues = props.modelValue as any[]
	const mappedLabels = options
		.filter(item => selectedValues.includes(item.value))
		.map(item => item.label)
		.join(", ")
	return mappedLabels
})
</script>

<template>
	<div class="flex items-center relative">
		<div v-if="hasValue">
			<div
				v-if="!multiple"
				class="line-clamp-1">
				{{ labelOfValue }}
			</div>

			<div
				v-else
				class="line-clamp-1">
				<template v-if="modelValue.length <= 3">
					{{ joinedLabelOfOptions }}
				</template>

				<template v-else>
					{{ modelValue.length }} {{ t("select.selectedLabel") }}
				</template>
			</div>
		</div>

		<div
			v-else
			class="text-foreground/50 line-clamp-1">
			{{ placeholder }}
		</div>
	</div>
</template>
