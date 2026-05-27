<script lang="ts" setup>
import type { DnsProviderLatency } from "~/types"

const { dns, isSelected, removable } = defineProps<{
	dns: DnsProviderLatency
	isSelected: boolean
	/** When true, show a remove control (for user-saved presets). */
	removable?: boolean
}>()

const emit = defineEmits<{
	setDns: []
	remove: []
}>()

function onCardActivate() {
	if (dns.loading)
		return
	emit("setDns")
}

const color = computed(() => {
	let color = "text-muted-foreground"
	if (dns.latency !== null) {
		if (dns.latency < 75)
			color = "text-green-500"
		else if (dns.latency < 150)
			color = "text-yellow-400"
		else if (dns.latency < 300)
			color = "text-orange-500"
		else
			color = "text-red-400"
	}
	return color
})
</script>

<template>
	<div
		role="button"
		:tabindex="dns.loading ? -1 : 0"
		:aria-disabled="dns.loading"
		:class="[
			isSelected
				? 'border-primary bg-primary/10 ring-2 ring-primary/30 shadow-sm'
				: 'border-border/50 bg-accent',
			dns.loading ? 'cursor-progress opacity-80' : 'cursor-pointer',
		]"
		class="p-2 text-start outline-none border-2 rounded flex flex-col gap-2 w-full transition hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/50"
		@click="onCardActivate"
		@keydown.enter.prevent="onCardActivate"
		@keydown.space.prevent="onCardActivate">
		<div class="flex gap-2 w-full items-start justify-between">
			<div class="flex flex-1 gap-2 min-w-0 items-center">
				<IconImg
					v-if="dns.icon"
					:src="dns.icon"
					class="shrink-0 size-6" />

				<span
					:class="isSelected ? 'font-semibold text-foreground' : ''"
					class="truncate">
					{{ dns.name }}
				</span>

				<span
					v-if="isSelected"
					class="text-xs text-primary-foreground font-semibold px-1.5 py-0.5 rounded-full bg-primary shrink-0">
					Active
				</span>
			</div>

			<div class="flex shrink-0 gap-1 items-center">
				<button
					v-if="removable"
					type="button"
					class="text-muted-foreground p-1 rounded-md flex cursor-pointer transition items-center justify-center hover:text-destructive hover:bg-destructive/15"
					aria-label="Delete custom DNS"
					@click.stop="emit('remove')">
					<Icon
						name="i-mdi:delete-outline"
						class="size-5" />
				</button>

				<div
					:class="color"
					class="text-xs px-1 rounded bg-muted tabular-nums">
					{{ dns.latency !== null ? `${dns.latency}ms` : "Timeout" }}
				</div>
			</div>
		</div>

		<!-- Tags -->
		<div
			v-if="dns.tags && dns.tags.length"
			class="flex flex-wrap gap-2">
			<span
				v-for="tag in dns.tags"
				:key="tag.name"
				class="text-xs text-muted-foreground px-1 py-0.5 rounded bg-muted flex gap-2 items-center"
				@click.stop>
				<IconImg
					v-if="tag.icon"
					:src="tag.icon"
					class="size-4" />

				<span>{{ tag.name }}</span>
			</span>
		</div>

		<div
			class="flex flex-wrap gap-2">
			<div
				v-for="ip in dns.ips"
				:key="ip"
				class="text-xs text-muted-foreground px-1 rounded bg-muted">
				{{ ip }}
			</div>
		</div>
	</div>
</template>
