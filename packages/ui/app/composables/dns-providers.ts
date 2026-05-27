import type { DnsProviderLatency } from "~/types"
import { dnsProviders } from "~/utils/constants"

export function useDnsProviders() {
	const notify = useNotification()
	const customDns = useCustomDns()
	const dnsData = ref<DnsProviderLatency[]>([])
	const customDnsFormResetKey = shallowRef(0)

	watch(
		customDns.entries,
		() => {
			dnsData.value = buildDnsDataList()
		},
		{ deep: true },
	)

	function buildDnsDataList(): DnsProviderLatency[] {
		const prev = new Map<string, Pick<DnsProviderLatency, "latency" | "loading">>()
		for (const row of dnsData.value) {
			const key = row.customId ?? row.name
			prev.set(key, { latency: row.latency, loading: row.loading })
		}

		const custom = customDns.toProviders().map((p) => {
			const kept = prev.get(p.customId)
			return {
				...p,
				latency: kept?.latency ?? null,
				loading: kept?.loading ?? false,
				customId: p.customId,
			}
		})

		const builtIn = dnsProviders.map((dns) => {
			const kept = prev.get(dns.name)
			return {
				...dns,
				latency: kept?.latency ?? null,
				loading: kept?.loading ?? false,
			}
		})

		return [...custom, ...builtIn]
	}

	function initProviders() {
		dnsData.value = buildDnsDataList()
	}

	function onAddCustomDns(payload: { raw: string, name?: string }) {
		const result = customDns.addFromInput(payload.raw, payload.name)
		if (!result.ok) {
			notify.errorText({
				title: "Could not add DNS",
				description: result.error,
				duration: 3500,
			})
			return
		}
		dnsData.value = buildDnsDataList()
		customDnsFormResetKey.value++
		notify.successText({
			title: "Custom DNS saved",
			description: "It appears in your list and is stored on this device.",
			duration: 2200,
		})
	}

	function onRemoveCustomDns(id: string) {
		customDns.remove(id)
		dnsData.value = buildDnsDataList()
		notify.successText({
			title: "Removed",
			description: "Custom DNS preset removed from this device.",
			duration: 1800,
		})
	}

	function exportAvailable() {
		const exportName = dnsData.value.filter(item => item.latency !== null)
			.map(item => item.ips.at(0))
			.join(" ")

		useDataExporter(exportName, "ips")
	}

	return {
		dnsData,
		customDnsFormResetKey,
		initProviders,
		onAddCustomDns,
		onRemoveCustomDns,
		exportAvailable,
	}
}
