import type { MaskitoPreprocessor } from "@maskito/core"
import { CalendarDateTime, type CalendarIdentifier, createCalendar, type DateValue, getLocalTimeZone, toCalendar } from "@internationalized/date"
import { digitsFaToEn } from "@persian-tools/persian-tools"
import { err, ok, Result, ResultAsync } from "neverthrow"
import { parse, stringify } from "picoquery"

/**
 * Wrap a synchronous function in a Result, never throws
 * @template T - return type
 * @template E - error type
 */
export function safeTry<T, E = unknown>(fn: () => T): Result<T, E> {
	try {
		return ok(fn())
	}
	catch (error) {
		return err(error as E)
	}
}

/**
 * Wrap an asynchronous function in a ResultAsync, never throws
 * @template T - return type
 * @template E - error type
 */
export function safeAsyncTry<T, E = unknown>(fn: () => Promise<T>): ResultAsync<T, E> {
	return ResultAsync.fromPromise(fn(), error => error as E)
}

export function assertNever(x: never): never {
	throw new Error(`Unexpected value: ${JSON.stringify(x)}`)
}

export function toQuery(input: Record<string, any>) {
	return stringify(input)
}

export function fromQuery(input: string) {
	return parse(input, { valueDeserializer: decoder })
}

export const toEnglishProcessor: MaskitoPreprocessor = ({ elementState, data }) => {
	const { value, selection } = elementState

	return {
		elementState: {
			selection,
			value: digitsFaToEn(value),
		},
		data: digitsFaToEn(data),
	}
}

function decoder(str: string) {
	// Handle boolean values
	if (str === "true")
		return true
	if (str === "false")
		return false

	// Handle empty string
	if (str === "")
		return null

	// Handle numbers
	if (!Number.isNaN(Number(str)) && str.trim() !== "") {
		return Number(str)
	}

	// Default case: return the string as is
	return str
}

export function fromJsDate(date: Date, targetCalendar: CalendarIdentifier) {
	const cal = createCalendar(targetCalendar)

	const calendarDate = new CalendarDateTime(
		createCalendar("gregory"),
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds(),
	)

	return toCalendar(calendarDate, cal)
}

export function toJsDate(date: DateValue) {
	return date.toDate(getLocalTimeZone())
}

export function deepEqual(itemA: any, itemB: any): boolean {
	if (itemA === itemB)
		return true

	if (itemA && itemB && typeof itemA === "object" && typeof itemB === "object") {
		if (itemA.constructor !== itemB.constructor)
			return false

		let length: number
		let index: number | [any, any]

		if (Array.isArray(itemA)) {
			length = itemA.length
			if (length !== itemB.length)
				return false
			for (index = length; index-- !== 0;) {
				if (!deepEqual(itemA[index], itemB[index]))
					return false
			}
			return true
		}

		if (itemA instanceof Map && itemB instanceof Map) {
			if (itemA.size !== itemB.size)
				return false
			for (const [key] of itemA.entries()) {
				if (!itemB.has(key))
					return false
			}
			for (const [key, value] of itemA.entries()) {
				if (!deepEqual(value, itemB.get(key)))
					return false
			}
			return true
		}

		if (itemA instanceof Set && itemB instanceof Set) {
			if (itemA.size !== itemB.size)
				return false
			for (const key of itemA.keys()) {
				if (!itemB.has(key))
					return false
			}
			return true
		}

		if (itemA.constructor === RegExp) {
			return itemA.source === itemB.source && itemA.flags === itemB.flags
		}

		if (itemA.valueOf !== Object.prototype.valueOf) {
			return itemA.valueOf() === itemB.valueOf()
		}

		if (itemA.toString !== Object.prototype.toString) {
			return itemA.toString() === itemB.toString()
		}

		const keys = Object.keys(itemA)
		length = keys.length

		if (length !== Object.keys(itemB).length)
			return false

		for (index = length; index-- !== 0;) {
			if (!Object.prototype.hasOwnProperty.call(itemB, keys[index]!))
				return false
		}

		for (index = length; index-- !== 0;) {
			const key = keys[index]!
			if (!deepEqual(itemA[key], itemB[key]))
				return false
		}

		return true
	}

	// true if both NaN, false otherwise

	return itemA !== itemA && itemB !== itemB
}

export function formatDateString(date: DateValue, format: string) {
	const map: Record<string, string> = {
		YYYY: date.year.toString().padStart(4, "0"),
		MM: date.month.toString().padStart(2, "0"),
		M: date.month.toString(),
		DD: date.day.toString().padStart(2, "0"),
		D: date.day.toString(),
		HH: "hour" in date ? date.hour.toString().padStart(2, "0") : "00",
		mm: "minute" in date ? date.minute.toString().padStart(2, "0") : "00",
		ss: "second" in date ? date.second.toString().padStart(2, "0") : "00",
	}

	return format.replace(/YYYY|MM|M|DD|D|HH|mm|ss/g, token => map[token]!)
}

export function humanizeBytes(bytes: number, decimals = 2): string {
	if (bytes < 1024)
		return "0 B" // no fractional bytes

	if (!Number.isFinite(bytes) || Number.isNaN(bytes))
		return String(bytes)

	const k = 1024
	const dm = Math.max(0, decimals)
	const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
	const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1)
	const value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))

	return `${value} ${sizes[i]}`
}
