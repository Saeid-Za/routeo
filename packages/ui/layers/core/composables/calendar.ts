import type { DateValue } from "reka-ui"
import type { ModelRef } from "vue"
import { watchImmediate } from "@vueuse/core"

export function useCalendar(model: ModelRef<Date | undefined | null>) {
	const localDate = shallowRef<DateValue>()
	const localTime = shallowRef<Date>()

	function onLocalDateUpdate(value?: DateValue) {
		localDate.value = value
		model.value = mergeDate(value ? toJsDate(value) : undefined, localTime.value)
	}

	function onLocalTimeUpdate(value?: Date) {
		localTime.value = value
		model.value = mergeDate(localDate.value ? toJsDate(localDate.value) : undefined, value)
	}

	watchImmediate(model, () => {
		if (model.value) {
			localDate.value = fromJsDate(model.value, "persian")
			localTime.value = model.value
		}
		else {
			localDate.value = undefined
			localTime.value = undefined
		}
	})

	return {
		onLocalDateUpdate,
		onLocalTimeUpdate,
		localDate,
		localTime,
	}
}

function mergeDate(date: Date = new Date(), time: Date = new Date()) {
	const year = date.getFullYear()
	const month = date.getMonth()
	const day = date.getDate()

	const hours = time.getHours()
	const minutes = time.getMinutes()

	return new Date(year, month, day, hours, minutes)
}
