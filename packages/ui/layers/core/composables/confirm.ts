import { ConfirmationDialog } from "#components"
import { useDialog } from "./dialog"

type ConfirmInput = {
	title?: string
	description?: string
}

export function useConfirm() {
	const { t } = useLanguage()

	const dialog = useDialog(ConfirmationDialog)

	function open(input?: ConfirmInput, autoClose = true) {
		const title = input?.title ?? t("confirm.title")
		const description = input?.description ?? t("confirm.message")

		return dialog.open({
			title,
			description,
		})
			.onOk(() => {
				if (autoClose)
					dialog.close()
			})
			.onCancel(() => {
				if (autoClose)
					dialog.close()
			})
	}

	return {
		open,
	}
}
