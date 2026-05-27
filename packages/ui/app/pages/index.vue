<script setup lang="ts">
import { useOnline } from "@vueuse/core"

const isOnline = useOnline()
const netStream = useNetworkStream()

const {
	dnsData,
	customDnsFormResetKey,
	initProviders,
	onAddCustomDns,
	onRemoveCustomDns,
	exportAvailable,
} = useDnsProviders()

const {
	systemActiveDnsIpList,
	interfaces,
	getDnsLoading,
	activeInterface,
	activeDns,
	activeDnsSelectionKey,
	getDns,
	getInterfaces,
	refreshTopPanel,
} = useDnsInterfaceState(dnsData)

const {
	progress,
	getLatency,
} = useDnsLatency(dnsData)

const {
	dnsChangeLoading,
	flushDnsLoading,
	resetDnsLoading,
	setDns,
	resetDnsToDefault,
	flushDns,
} = useDnsActions({ activeInterface, getDns })

watch(isOnline, () => {
	refreshTopPanel()
})

init()

async function init() {
	initProviders()
	await Promise.all([
		netStream.start(),
		getInterfaces(),
		getDns(),
		getLatency(),
	])
}
</script>

<template>
	<div class="px-2 flex flex-col gap-4 relative">
		<DevOnly>
			<FpsDebug
				class="start-1 bottom-1 z-10" />
		</DevOnly>

		<DnsInfoSection
			:download-speed="netStream.download.value"
			:upload-speed="netStream.upload.value"
			:active-dns-ip-list="systemActiveDnsIpList"
			:active-interface="activeInterface"
			:active-dns="activeDns"
			:refresh-loading="dnsChangeLoading || getDnsLoading"
			:interfaces="interfaces"
			:flush-dns-loading="flushDnsLoading"
			:reset-dns-loading="resetDnsLoading"
			@refresh="refreshTopPanel"
			@reset-dns="resetDnsToDefault"
			@flush-dns="flushDns" />

		<DnsLatencySection
			:custom-dns-form-reset-key="customDnsFormResetKey"
			:progress="progress"
			:active-dns-selection-key="activeDnsSelectionKey"
			:data="dnsData"
			:loading="dnsChangeLoading"
			@export="exportAvailable"
			@set-dns="setDns"
			@add-custom-dns="onAddCustomDns"
			@remove-custom-dns="onRemoveCustomDns"
			@reload="getLatency" />
	</div>
</template>
