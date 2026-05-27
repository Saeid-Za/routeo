import type { DnsProviderLatency } from "~/types"
import { from, lastValueFrom, mergeMap } from "rxjs"
import { tauriErrorMessage } from "~/utils/tauri-error"

export function useDnsLatency(dnsData: Ref<DnsProviderLatency[]>) {
	const api = useTauri()
	const notify = useNotification()

	const progress = shallowRef(0)
	const getLatencyLoading = shallowRef(false)

	async function getLatency() {
		getLatencyLoading.value = true
		try {
			// Intentionally get one-by-one to avoid network congestion
			// so that the latency results are more accurate
			progress.value = 0
			let completedCount = 0
			const allCount = dnsData.value.length
			await lastValueFrom(
				from(dnsData.value)
					.pipe(
						mergeMap(async (item) => {
							item.loading = true
							item.latency = await api.getDnsLatency(item.ips.at(0)!, 5000)
							item.loading = false
							completedCount++
							progress.value = completedCount / allCount
						}, 10),
					),
			)
		}
		catch (error) {
			console.warn(error)
			notify.errorText({
				title: "Latency test failed",
				description: tauriErrorMessage(error),
				duration: 3500,
			})
		}
		getLatencyLoading.value = false
	}

	return {
		progress,
		getLatencyLoading,
		getLatency,
	}
}
