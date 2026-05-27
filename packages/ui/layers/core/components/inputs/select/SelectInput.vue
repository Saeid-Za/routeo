<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { Option } from "~/types"
import { useClass } from "#imports"
import { VList } from "virtua/vue"

defineOptions({
	inheritAttrs: false,
})

const {
	options = [],
	inputClass = "",
	maxItemsToShow = 20,
	itemHeight = 40,
	iconClass = "",
	...props
} = defineProps<{
	maxItemsToShow?: number
	itemHeight?: number
	options?: Option[]
	multiple?: boolean
	clearable?: boolean
	placeholder?: string
	disabled?: boolean
	loading?: boolean
	default?: string
	inputClass?: HTMLAttributes["class"]
	iconClass?: HTMLAttributes["class"]
}>()

const modelValue = defineModel<any | any[]>({ required: false })

const { onSelect, open, query, filtered } = useSelect(modelValue, {
	clearable: () => props.clearable,
	disabled: () => props.disabled,
	multiple: () => props.multiple,
	options: () => options,
})
const { t, dir } = useLanguage()

const btnClass = useClass(
	"h-10 w-full flex border border-input bg-transparent rounded-md px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed file:border-0 file:bg-transparent file:text-sm placeholder:text-muted-foreground file:font-medium disabled:opacity-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ring",
	() => inputClass,
)

const style = computed(() => {
	const sizeInPx = Math.min(filtered.value.length, maxItemsToShow) * itemHeight
	return {
		height: sizeInPx + "px",
	}
})
</script>

<template>
	<UPopover v-model:open="open">
		<UPopoverTrigger as-child>
			<button
				:class="btnClass"
				:aria-expanded="open"
				:disabled="disabled">
				<div class="flex size-full items-center justify-between">
					<div class="flex gap-1 items-center">
						<div>
							<slot name="prepend" />
						</div>

						<SelectInputHint
							:model-value="modelValue"
							:options="options"
							:placeholder="placeholder"
							:multiple="multiple" />
					</div>

					<Icon
						:class="iconClass"
						name="i-mdi:chevron-down" />
				</div>
			</button>
		</UPopoverTrigger>

		<UPopoverContent class="p-0 min-w-[200px]">
			<UCommand
				:model-value="query"
				:options
				:multiple
				:dir="dir">
				<UCommandInput
					v-model="query"
					:placeholder="placeholder" />

				<UCommandEmpty v-if="filtered.length === 0">
					{{ t("select.noDataMessage") }}
				</UCommandEmpty>

				<UCommandList
					v-else
					:style
					:dir="dir">
					<VList
						v-slot="{ item }"
						:data="filtered">
						<UCommandItem
							:value="item.value"
							@select="onSelect">
							<SelectInputIndicator
								:model-value="modelValue"
								:self-value="item.value"
								:multiple="multiple" />
							{{ item.label }}
						</UCommandItem>
					</VList>
				</UCommandList>
			</UCommand>
		</UPopoverContent>
	</UPopover>
</template>
