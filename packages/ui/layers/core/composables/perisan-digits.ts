import { DateFormatter } from "@internationalized/date"
import { digitsEnToFa } from "@persian-tools/persian-tools"

export function usePersianDigits<T extends number | string>(input: MaybeRefOrGetter<T>) {
	return computed(() => {
		const value = toValue(input)
		if (value)
			return digitsEnToFa(value)
		return ""
	})
}

export function useFormattedPersianDigits<T extends number | string>(input: MaybeRefOrGetter<T>) {
	return computed(() => {
		const value = toValue(input)
		if (value)
			return digitsEnToFa(formatNumber(value))
		return ""
	})
}

export function useFormattedDigits<T extends number | string>(input: MaybeRefOrGetter<T>) {
	return computed(() => {
		const value = toValue(input)
		if (value)
			return formatNumber(value)
		return ""
	})
}

export function useFormattedDate(input: MaybeRefOrGetter<Date | string | undefined | null>) {
	const formatter = new DateFormatter("en-CA", {
		hour12: false,
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	})

	return computed(() => {
		let value = toValue(input)

		if (!value)
			return
		if (typeof value === "string") {
			value = new Date(value)
		}

		return formatter.format(value)
	})
}

export function formatNumber(num: string | number) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
