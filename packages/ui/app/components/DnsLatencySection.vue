<script setup lang="ts">
import type { DnsProviderLatency } from "~/types"
import { computed, ref, watch } from "vue"

const props = withDefaults(defineProps<{
	loading: boolean
	activeDnsSelectionKey?: string
	progress: number
	data: DnsProviderLatency[]
	/** Increment to clear the "add custom DNS" fields after a successful save. */
	customDnsFormResetKey?: number
}>(), {
	customDnsFormResetKey: 0,
})

const emit = defineEmits<{
	reload: []
	setDns: [item: DnsProviderLatency]
	addCustomDns: [payload: { raw: string, name?: string }]
	removeCustomDns: [id: string]
}>()

const customIpsRaw = ref("")
const customName = ref("")
const searchQuery = ref("")

watch(
	() => props.customDnsFormResetKey,
	() => {
		customIpsRaw.value = ""
		customName.value = ""
	},
)

function submitCustomDns() {
	emit("addCustomDns", {
		raw: customIpsRaw.value,
		name: customName.value.trim() || undefined,
	})
}

function dnsSelectionKey(dns: DnsProviderLatency) {
	return dns.customId ?? dns.name
}

function isActiveDns(dns: DnsProviderLatency) {
	return props.activeDnsSelectionKey !== undefined
		&& props.activeDnsSelectionKey === dnsSelectionKey(dns)
}

// Active DNS first, then sort remaining by latency (nulls last; stable when unknown)
const sortedDns = computed(() => {
	const copy = props.data.map((item, index) => ({ item, index }))
	copy.sort((a, b) => {
		const aActive = isActiveDns(a.item)
		const bActive = isActiveDns(b.item)
		if (aActive !== bActive)
			return aActive ? -1 : 1

		const al = a.item.latency
		const bl = b.item.latency
		if (al !== null && bl !== null)
			return al - bl
		if (al === null && bl !== null)
			return 1
		if (al !== null && bl === null)
			return -1
		return a.index - b.index
	})
	return copy.map(x => x.item)
})

function matchesDnsSearch(dns: DnsProviderLatency, query: string) {
	const q = query.trim().toLowerCase()
	if (!q)
		return true
	if (dns.name.toLowerCase().includes(q))
		return true
	return dns.ips.some(ip => ip.toLowerCase().includes(q))
}

const filteredDns = computed(() => {
	return sortedDns.value.filter(dns => matchesDnsSearch(dns, searchQuery.value))
})

const progressFormatted = computed(() => (props.progress * 100).toFixed(2))
</script>

<template>
	<div class="border rounded bg-card flex flex-col gap-2">
		<SectionHeader>
			DNS Latency

			<span>
				({{ progressFormatted }} %)
			</span>

			<template #end>
				<div class="flex gap-1">
					<button
						class="p-1 rounded-full flex cursor-pointer transition items-center justify-center hover:bg-background"
						@click="emit('reload')">
						<Icon name="i-pixelarticons:reload" />
					</button>
				</div>
			</template>
		</SectionHeader>

		<div class="px-2 flex flex-row gap-2 items-center">
			<input v-model="customIpsRaw" type="text" autocomplete="off" placeholder="1.1.1.1, 8.8.8.8"
				class="text-sm text-foreground px-2 py-1.5 border border-border rounded-md bg-background flex-1 max-w-xs min-w-0 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
				@keydown.enter.prevent="submitCustomDns">

			<input v-model="customName" type="text" autocomplete="off" placeholder="Name (Opt)"
				class="text-sm text-foreground px-2 py-1.5 border border-border rounded-md bg-background shrink-0 min-w-100px w-28 placeholder:text-muted-foreground focus:outline-none sm:w-36 focus:ring-2 focus:ring-primary/40"
				@keydown.enter.prevent="submitCustomDns">

			<button type="button"
				class="p-1.5 border border-border rounded-md bg-muted flex shrink-0 cursor-pointer transition items-center justify-center hover:border-primary/40 hover:bg-primary/15"
				aria-label="Add custom DNS" @click="submitCustomDns">
				<Icon name="i-mdi:plus" class="size-5" />
			</button>
		</div>

		<div class="px-2">
			<input v-model="searchQuery" type="search" autocomplete="off" placeholder="Search by name or IP"
				class="text-sm text-foreground px-2 py-1.5 border border-border rounded-md bg-background min-w-0 w-full placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40">
		</div>

		<div class="mb-2 px-2 gap-2 grid grid-fill-250px">
			<p v-if="filteredDns.length === 0" class="text-sm text-muted-foreground py-4 text-center">
				No DNS servers match your search.
			</p>

			<DnsCard v-for="dns in filteredDns" :key="dnsSelectionKey(dns)" class="w-full" :dns
				:is-selected="isActiveDns(dns)" :removable="Boolean(dns.customId)" @set-dns="emit('setDns', dns)"
				@remove="emit('removeCustomDns', dns.customId!)" />
		</div>
	</div>
</template>

<style lang="css" scoped>
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
	position: absolute;
}
</style>
