import { hyphenate } from "@vueuse/core"
import { camelize, toHandlerKey } from "vue"

export function useHasEmit(eventName: string) {
	const instance = getCurrentInstance()

	return computed(() => {
		const events = instance?.vnode.props
		const isModelListener = eventName.startsWith("update:")

		let handler
			= events?.[toHandlerKey(eventName)]
			// also try camelCase eventName handler (#2249)
				|| events?.[toHandlerKey(camelize(eventName))]

		if (!handler && isModelListener)
			handler = events?.[toHandlerKey(hyphenate(eventName))]

		return !!handler
	})
}
