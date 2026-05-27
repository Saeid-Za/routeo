import type { DnsProvider, NetworkInterface } from "~/types"
import { tauriErrorMessage } from "~/utils/tauri-error"

export function useDnsActions(options: {
	activeInterface: ComputedRef<NetworkInterface | undefined>
	getDns: () => Promise<void>
}) {
	const api = useTauri()
	const notify = useNotification()

	const dnsChangeLoading = shallowRef(false)
	const flushDnsLoading = shallowRef(false)
	const resetDnsLoading = shallowRef(false)

	async function setDns(dns: DnsProvider) {
		const interfaceName = options.activeInterface.value?.name
		if (!interfaceName || dnsChangeLoading.value)
			return

		dnsChangeLoading.value = true
		try {
			await api.setDns(interfaceName, dns.ips)
			await options.getDns()
			notify.successText({
				title: "DNS Changed",
				description: `DNS has been changed to ${dns.name}.`,
				duration: 2000,
			})
		}
		catch (error) {
			console.warn(error)
			notify.errorText({
				title: "Could not change DNS",
				description: tauriErrorMessage(error),
				duration: 3500,
			})
		}
		dnsChangeLoading.value = false
	}

	async function resetDnsToDefault() {
		const interfaceName = options.activeInterface.value?.name
		if (!interfaceName || resetDnsLoading.value)
			return

		resetDnsLoading.value = true
		try {
			await api.resetDnsToDefault(interfaceName)
			await options.getDns()
			notify.successText({
				title: "DNS reset",
				description: "DNS has been restored to the system default.",
				duration: 2000,
			})
		}
		catch (error) {
			console.warn(error)
			notify.errorText({
				title: "Could not reset DNS",
				description: tauriErrorMessage(error),
				duration: 3500,
			})
		}
		resetDnsLoading.value = false
	}

	async function flushDns() {
		flushDnsLoading.value = true
		try {
			await api.flushDns()
			notify.successText({
				title: "DNS Flushed",
				description: "DNS cache has been flushed successfully.",
				position: "bottom-center",
				duration: 2000,
			})
		}
		catch (error) {
			console.warn(error)
			notify.errorText({
				title: "Could not flush DNS",
				description: tauriErrorMessage(error),
				duration: 3500,
			})
		}
		flushDnsLoading.value = false
	}

	return {
		dnsChangeLoading,
		flushDnsLoading,
		resetDnsLoading,
		setDns,
		resetDnsToDefault,
		flushDns,
	}
}
