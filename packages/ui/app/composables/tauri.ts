import type { DnsRecord, LogItem, NetworkInterface } from "~/types"
import { useQuery } from "@pinia/colada"
import { invoke } from "@tauri-apps/api/core"
import { listen } from "@tauri-apps/api/event"

export function useTauri() {
	const networkInterfaces = useQuery({
		key: ["list_network_interfaces"],
		initialData: () => [],
		query: async () => {
			return await invoke<NetworkInterface[]>("list_network_interfaces")
		},
	})

	async function getInterfaces() {
		return await invoke<NetworkInterface[]>("list_network_interfaces")
	}

	async function getDnsLatency(dnsIp: string, timeoutInMs?: number) {
		return await invoke<number>("test_dns_latency", { dnsIp, timeoutInMs })
	}

	async function setDns(iface: string, dnsServers: string[]) {
		return await invoke<void>("set_and_apply_dns", { iface, dnsServers })
	}

	async function resetDnsToDefault(iface: string) {
		return await invoke<void>("reset_dns_to_default", { iface })
	}

	async function getDns() {
		return await invoke<DnsRecord[]>("get_active_dns")
	}

	async function flushDns() {
		return await invoke<string>("flush_dns")
	}

	async function startNetworkStream() {
		return await invoke<void>("start_network_stream")
	}

	async function stopNetworkStream() {
		return await invoke<void>("stop_network_stream")
	}

	async function connectWarp() {
		return await invoke<boolean>("connect_api")
	}

	async function disconnectWarp() {
		return await invoke<boolean>("disconnect_api")
	}

	async function isWarpConnected() {
		return await invoke<boolean>("is_connected_api")
	}

	async function registerWarpAccount() {
		return await invoke<boolean>("register_account_api")
	}

	async function deleteWarpAccount() {
		return await invoke<boolean>("delete_account_api")
	}

	return {
		networkInterfaces,
		getInterfaces,
		getDnsLatency,
		setDns,
		resetDnsToDefault,
		getDns,
		flushDns,
		startNetworkStream,
		stopNetworkStream,
		connectWarp,
		disconnectWarp,
		isWarpConnected,
		registerWarpAccount,
		deleteWarpAccount,
	}
}

export const useLogStream = defineComposable("log-stream", () => {
	let unlisten: (() => void) | null = null
	let starting: Promise<void> | null = null
	let active = false
	const logs = ref<LogItem[]>([])

	async function start() {
		if (active) {
			return
		}
		if (starting) {
			return starting
		}

		starting = (async () => {
			unlisten = await listen<LogItem>("app-log", (event) => {
				logs.value.unshift(event.payload)
			})
			await invoke("start_log_stream")
			active = true
		})().catch((error) => {
			active = false
			if (unlisten) {
				unlisten()
				unlisten = null
			}
			console.error("Failed to start log stream:", error)
			throw error
		})

		try {
			await starting
		}
		finally {
			starting = null
		}
	}

	async function stop() {
		await invoke("stop_log_stream")
		if (unlisten) {
			unlisten()
			unlisten = null
		}
		active = false
	}

	function clear() {
		logs.value = []
	}

	return { start, stop, clear, logs }
})

export type { DnsRecord, LogItem, NetworkInterface } from "~/types"
