import { listen } from "@tauri-apps/api/event"
import { tauriErrorMessage } from "~/utils/tauri-error"

export function useNetworkStream() {
	const api = useTauri()
	const notify = useNotification()

	const download = shallowRef(0)
	const upload = shallowRef(0)

	let unlisten: (() => void) | null = null

	async function start() {
		try {
			await api.startNetworkStream()
			unlisten = await listen("network-stats", (event) => {
				const { download: d, upload: u } = event.payload as { upload: number, download: number }
				download.value = d
				upload.value = u
			})
		}
		catch (error) {
			console.warn(error)
			notify.errorText({
				title: "Network stats unavailable",
				description: tauriErrorMessage(error),
				duration: 3500,
			})
		}
	}

	async function stop() {
		try {
			await api.stopNetworkStream()
		}
		catch (error) {
			console.warn(error)
		}
		if (unlisten) {
			unlisten()
			unlisten = null
		}
	}

	onScopeDispose(stop)

	return { download, upload, start, stop }
}
