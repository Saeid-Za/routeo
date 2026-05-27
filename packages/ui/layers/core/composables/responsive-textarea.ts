import { useTextareaAutosize } from "@vueuse/core"

export function useResponsiveTextarea(model: MaybeRefOrGetter<string>) {
	const { textarea, input, triggerResize } = useTextareaAutosize({ watch: () => toValue(model) })

	const textareaClass = computed(() => {
		const isEnglish = !!toValue(model)?.trim().match(/\w/)

		if (isEnglish)
			return "plaintext text-start"
		return "plaintext text-right"
	})

	return {
		textarea,
		textareaClass,
		input,
		triggerResize,
	}
}
