import type { Mutable } from "@vueuse/core"
import type { AllowedComponentProps, VNodeProps } from "vue"
import type { ComponentProps } from "vue-component-type-helpers"

export type DnsTag = {
	name: string
	icon: string
}

export type DnsProvider = {
	name: string
	icon: string
	ips: string[]
	tags?: DnsTag[]
}

/** Persisted shape for user-added DNS presets (localStorage). */
export type CustomDnsStored = {
	id: string
	ips: string[]
	/** Optional label; otherwise a default name is derived from the first IP. */
	name?: string
}

export type DnsProviderLatency = DnsProvider & {
	latency: number | null
	loading: boolean
	/** When set, this row is a saved custom preset and may be removed from storage. */
	customId?: string
}

export type NetworkInterface = {
	name: string
	codeName: string
	ips: string[]
	isDefault: boolean
}

export type DnsRecord = {
	interfaceAlias: string
	serverAddresses: string[]
}

export type LogItem = {
	level: string
	message: string
}

export type Option = {
	label: string
	value: any
}

type Pretty<T> = {
	[K in keyof T]: T[K]
} & {}

export type Props<T extends Component> = Pretty<Mutable<Omit<ComponentProps<T>, keyof VNodeProps | keyof AllowedComponentProps>>>
