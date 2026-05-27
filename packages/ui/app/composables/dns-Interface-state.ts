import type { DnsProviderLatency, NetworkInterface } from "~/types"
import { tauriErrorMessage } from "~/utils/tauri-error"

export function useDnsInterfaceState(dnsData: Ref<DnsProviderLatency[]>) {
	const api = useTauri()
	const notify = useNotification()

	const systemActiveDnsIpList = shallowRef<string[]>([])
	const interfaces = shallowRef<NetworkInterface[]>([])
	const getDnsLoading = shallowRef(false)
	const getInterfaceLoading = shallowRef(false)

	const activeInterface = computed(() => interfaces.value.find(item => item.isDefault))

	const activeDns = computed(() => {
		return dnsData.value.find(dns =>
			dns.ips.some(ip => systemActiveDnsIpList.value.includes(ip)),
		)
	})

	const activeDnsSelectionKey = computed(() => {
		const d = activeDns.value
		if (!d)
			return undefined
		return d.customId ?? d.name
	})

	async function getDns() {
		getDnsLoading.value = true
		try {
			const allDnsRecords = await api.getDns()
			systemActiveDnsIpList.value = allDnsRecords.find(
				item => item.interfaceAlias === activeInterface.value?.name,
			)?.serverAddresses ?? []
		}
		catch (error) {
			console.warn(error)
			notify.errorText({
				title: "Could not read DNS",
				description: tauriErrorMessage(error),
				duration: 3500,
			})
		}
		getDnsLoading.value = false
	}

	async function getInterfaces() {
		getInterfaceLoading.value = true
		try {
			interfaces.value = await api.getInterfaces()
		}
		catch (error) {
			console.warn(error)
			notify.errorText({
				title: "Could not list interfaces",
				description: tauriErrorMessage(error),
				duration: 3500,
			})
		}
		getInterfaceLoading.value = false
	}

	async function refreshTopPanel() {
		await Promise.all([
			getInterfaces(),
			getDns(),
		])
	}

	return {
		systemActiveDnsIpList,
		interfaces,
		getDnsLoading,
		getInterfaceLoading,
		activeInterface,
		activeDns,
		activeDnsSelectionKey,
		getDns,
		getInterfaces,
		refreshTopPanel,
	}
}
