import type { CustomDnsStored, DnsProvider } from "~/types"
import { createSharedComposable, useLocalStorage } from "@vueuse/core"
import { CUSTOM_DNS_STORAGE_KEY } from "~/utils/constants"
import { isValidDnsIp, splitIpInput } from "~/utils/dns-ip"

export const useCustomDns = createSharedComposable(() => {
	const entries = useLocalStorage<CustomDnsStored[]>(CUSTOM_DNS_STORAGE_KEY, () => [], {
		mergeDefaults: true,
	})

	function storedToProvider(entry: CustomDnsStored): DnsProvider & { customId: string } {
		return {
			name: entry.name?.trim() || `Custom (${entry.ips[0]})`,
			icon: "i-mdi:dns",
			ips: entry.ips,
			tags: [{ name: "Custom", icon: "i-mdi:bookmark-outline" }],
			customId: entry.id,
		}
	}

	function addFromInput(raw: string, label?: string): { ok: true } | { ok: false, error: string } {
		const tokens = splitIpInput(raw)
		if (tokens.length === 0)
			return { ok: false, error: "Enter at least one IP address." }

		const ips: string[] = []
		for (const t of tokens) {
			if (!isValidDnsIp(t))
				return { ok: false, error: `Invalid IP: ${t}` }
			if (!ips.includes(t))
				ips.push(t)
		}

		const sig = ipsSignature(ips)
		for (const e of entries.value) {
			if (ipsSignature(e.ips) === sig)
				return { ok: false, error: "That DNS set is already saved." }
		}

		const id = globalThis.crypto?.randomUUID?.() ?? `custom-${Date.now()}-${Math.random().toString(16).slice(2)}`
		const trimmedLabel = label?.trim()
		entries.value = [...entries.value, { id, ips, name: trimmedLabel || undefined }]
		return { ok: true }
	}

	function remove(id: string) {
		entries.value = entries.value.filter(e => e.id !== id)
	}

	function toProviders(): Array<DnsProvider & { customId: string }> {
		return entries.value.map(storedToProvider)
	}

	return { entries, addFromInput, remove, toProviders }
})

function ipsSignature(ips: string[]): string {
	return [...ips].sort().join("|")
}
