import type { Option } from "~/types"
import { go } from "fuzzysort"
import { computed, toValue } from "vue"

type SelectConfig = {
	clearable: MaybeRefOrGetter<boolean>
	disabled: MaybeRefOrGetter<boolean>
	multiple: MaybeRefOrGetter<boolean>
	options: MaybeRefOrGetter<Option[]>
	autoClose?: boolean
}

export function useSelect<T>(modelValue: Ref<(T | null) | T[]>, config: SelectConfig) {
	const open = shallowRef(false)
	const query = shallowRef<string>("")

	const values = computed(() => {
		const selectedValues: any[] = []
		if (Array.isArray(modelValue.value))
			selectedValues.push(...modelValue.value)
		else if (modelValue.value != undefined)
			selectedValues.push(modelValue.value)
		return selectedValues
	})

	const filtered = computed(() => {
		const options = toValue(config.options) ?? []
		let items: Option[]

		if (query.value) {
		// Fuzzy search
			items = go(query.value, options, { key: "label" }).map(item => item.obj)
		}
		else {
		// No query → use all
			items = [...options]
		}

		// Always sort selected items first
		items.sort((a, b) => {
			const aSelected = values.value.includes(a.value)
			const bSelected = values.value.includes(b.value)

			if (aSelected && !bSelected)
				return -1
			if (!aSelected && bSelected)
				return 1
			return 0
		})

		return items
	})

	config.autoClose = config.autoClose ?? true

	function onSelect(ev: any) {
		if (toValue(config.multiple))
			onMultiSelect(ev)
		else
			onSingleSelect(ev)

		query.value = ""

		if (config.autoClose)
			open.value = false
	}

	function onSingleSelect(ev: any) {
		const valueItem = ev.detail.value

		if (toValue(config.clearable) && modelValue.value === valueItem)
			modelValue.value = null

		else
			modelValue.value = valueItem
	}

	function onMultiSelect(ev: any) {
		const itemValue = ev.detail.value
		const newValue = Array.isArray(modelValue.value) ? modelValue.value : []
		const currentValue: any[] = [...newValue]
		const indexOfValue = currentValue.indexOf(itemValue)
		const isAlreadyAdded = indexOfValue !== -1

		if (isAlreadyAdded) {
			currentValue.splice(indexOfValue, 1)
		}

		else {
			currentValue.push(itemValue)
		}

		modelValue.value = currentValue
	}

	return {
		onSelect,
		filtered,
		open,
		query,
	}
}
