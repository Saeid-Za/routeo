<script lang="ts" setup>
import { VList } from "virtua/vue"

const { logs, clear } = useLogStream()

const levelStyles: Record<string, string> = {
	TRACE: "bg-muted/80 text-muted-foreground",
	DEBUG: "bg-blue-500/12 text-blue-400",
	INFO: "bg-emerald-500/12 text-emerald-400",
	WARN: "bg-amber-500/12 text-amber-400",
	ERROR: "bg-destructive/12 text-destructive",
}

function formatMessage(message: string) {
	const trimmed = message.trim()
	if (trimmed.startsWith("\"") && trimmed.endsWith("\"")) {
		return trimmed.slice(1, -1)
	}
	return trimmed
}

function levelLabel(level: string) {
	return level.slice(0, 4)
}
</script>

<template>
	<div class="flex grow flex-col w-full">
		<div
			class="px-3 py-2 border-b border-border/50 bg-background/90 flex shrink-0 items-center top-0 justify-between sticky z-1 backdrop-blur-sm">
			<div class="flex gap-2 items-center">
				<span class="text-xs text-foreground tracking-wide font-medium">
					System Logs
				</span>

				<span
					class="text-[10px] text-muted-foreground font-mono px-1.5 py-px border border-border/60 rounded-full bg-muted/50 tabular-nums">
					{{ logs.length }}
				</span>
			</div>

			<button
				v-if="logs.length"
				type="button"
				class="text-[11px] text-muted-foreground px-2 py-0.5 rounded-md transition hover:text-foreground hover:bg-accent"
				@click="clear">
				Clear
			</button>
		</div>

		<div
			v-if="!logs.length"
			class="text-sm text-muted-foreground px-4 py-12 flex flex-col gap-2 items-center justify-center">
			<Icon
				name="i-pixel:cog"
				class="text-2xl opacity-30" />

			<span>Waiting for logs…</span>
		</div>

		<div
			v-else
			class="flex grow divide-border/30 divide-y">
			<VList
				:data="logs"
				class="w-full">
				<template #default="{ item }">
					<div
						class="text-[11px] px-3 py-1.5 flex gap-2.5 transition-colors items-start hover:bg-accent/30">
						<span
							class="text-[9px] tracking-wider font-semibold py-0.5 text-center rounded shrink-0 w-10 uppercase"
							:class="levelStyles[item.level] ?? 'bg-muted text-foreground'">
							{{ levelLabel(item.level) }}
						</span>

						<span class="text-foreground/85 leading-4 font-mono min-w-0 break-all">
							{{ formatMessage(item.message) }}
						</span>
					</div>
				</template>
			</VList>
		</div>
	</div>
</template>
