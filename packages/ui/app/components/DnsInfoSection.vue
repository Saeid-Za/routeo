<script lang="ts" setup>
import type { DnsProviderLatency } from "~/types"

defineProps<{
	flushDnsLoading: boolean
	resetDnsLoading: boolean
	refreshLoading: boolean
	downloadSpeed: number
	uploadSpeed: number

	activeDns?: DnsProviderLatency
	activeInterface?: NetworkInterface
	interfaces: NetworkInterface[]
	activeDnsIpList: string[]
}>()

const emit = defineEmits<{
	flushDns: []
	resetDns: []
	refresh: []
}>()
</script>

<template>
	<div class="border rounded bg-card flex flex-col gap-2">
		<CurrentInterface
			:name="activeInterface?.name" />

		<div class="px-2 flex flex-wrap gap-2">
			<DnsNameBadge :dns-name="activeDns?.name" />

			<CurrentInterfaceBadge :name="activeInterface?.name" />

			<IpBadge :ip-list="activeInterface?.ips" />

			<DnsListBadge :dns-list="activeDnsIpList" />
		</div>

		<div class="p-2 flex flex-wrap gap-2 items-center justify-between">
			<SpeedInfoBadge
				:download-speed
				:upload-speed />

			<div class="flex gap-1 items-center">
				<UTooltip>
					<UTooltipTrigger as-child>
						<Btn
							:loading="resetDnsLoading"
							content-class="text-muted-foreground p-1.5 border rounded-full flex shrink-0 cursor-pointer transition items-center justify-center hover:text-foreground hover:bg-accent"
							@click="emit('resetDns')">
							<Icon
								name="i-mdi:restore"
								class="size-4" />
						</Btn>
					</UTooltipTrigger>

					<UTooltipContent side="top">
						Reset DNS to system default
					</UTooltipContent>
				</UTooltip>

				<UTooltip>
					<UTooltipTrigger as-child>
						<Btn
							:loading="flushDnsLoading"
							content-class="text-muted-foreground p-1.5 border rounded-full flex shrink-0 cursor-pointer transition items-center justify-center hover:text-foreground hover:bg-accent"
							@click="emit('flushDns')">
							<Icon
								name="i-mdi:delete-sweep"
								class="size-4" />
						</Btn>
					</UTooltipTrigger>

					<UTooltipContent side="top">
						Flush DNS cache
					</UTooltipContent>
				</UTooltip>

				<UTooltip>
					<UTooltipTrigger as-child>
						<Btn
							:loading="refreshLoading"
							content-class="text-muted-foreground p-1.5 border rounded-full flex shrink-0 cursor-pointer transition items-center justify-center hover:text-foreground hover:bg-accent"
							@click="emit('refresh')">
							<Icon
								name="i-pixelarticons:reload"
								class="size-4" />
						</Btn>
					</UTooltipTrigger>

					<UTooltipContent side="top">
						Refresh network info
					</UTooltipContent>
				</UTooltip>
			</div>
		</div>
	</div>
</template>
