import type { CSSProperties } from "vue"
import defu from "defu"
import { toast } from "vue-sonner"

export const useNotification = defineComposable("notification", () => {
	const { t } = useLanguage()

	function errorText(input?: ToastInput) {
		const customInput = defu(input, {
			title: t("notify.error.caption"),
			description: t("notify.error.message"),
			closeButton: true,
			class: "font-default",
		} satisfies ToastInput)

		toast.error(customInput.title, customInput)
	}

	function successText(input?: ToastInput) {
		const customInput = defu(input, {
			title: t("notify.success.caption"),
			description: t("notify.success.message"),
			class: "font-default",
		})

		toast.success(customInput.title, customInput)
	}

	function warnText(input?: ToastInput) {
		const customInput = defu(input, {
			title: t("warning"),
			class: "font-default",
		})

		toast.warning(customInput.title, customInput)
	}

	function errorResponse(response: unknown) {
		const serverResponse = response as Response

		let messageToLog = ""

		if ("error" in serverResponse) {
			const errorObject = serverResponse.error as ServerError
			const errorId = createErrorId(errorObject)
			const translation = t(errorId)

			if (translation === errorId) {
				console.warn(`${errorId} is not translated`)
				messageToLog = errorObject.errorCode
			}
			else {
				messageToLog = translation
			}
		}
		else if (import.meta.env.DEV) {
			if (response instanceof Error)
				messageToLog = response.name + response.message
		}
		else {
			messageToLog = t("api.connectionError")
		}

		errorText({ description: messageToLog })
	}

	function createErrorId(error: ServerError) {
		const errorId = `server.${error.module}.${error.errorCode}`
		return errorId
	}

	return {
		successText,
		warnText,
		errorText,
		errorResponse,
	}
})

type ServerError = {
	module: string
	errorCode: string
}

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"

type ToastInput = {
	title?: string
	id?: number | string
	invert?: boolean
	closeButton?: boolean
	dismissible?: boolean
	description?: string
	duration?: number
	important?: boolean
	action?: {
		label: string
		onClick: (event: MouseEvent) => void
	}
	cancel?: {
		label: string
		onClick?: () => void
	}
	onDismiss?: () => void
	onAutoClose?: () => void
	cancelButtonStyle?: CSSProperties
	actionButtonStyle?: CSSProperties
	style?: CSSProperties
	unstyled?: boolean
	class?: string
	descriptionClass?: string
	position?: Position
}
