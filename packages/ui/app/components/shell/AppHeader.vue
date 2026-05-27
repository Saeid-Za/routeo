<script lang="ts" setup>
import { getCurrentWindow } from "@tauri-apps/api/window"

const appWindow = getCurrentWindow()

function minimize() {
	appWindow.minimize()
}

async function toggleMaximize() {
	const isMaximized = await appWindow.isMaximized()
	if (isMaximized) {
		await appWindow.unmaximize()
	}
	else {
		await appWindow.maximize()
	}
}

function close() {
	appWindow.close()
}
</script>

<template>
	<div
		data-tauri-drag-region
		class="pe-2 border-b bg-background flex h-[36px] cursor-grab shadow-lg items-center inset-x-0 top-0 justify-between fixed z-2">
		<div class="text-2xl font-pixel flex gap-1 pointer-events-none select-none">
			<img
				src="/images/small-logo.png"
				class="size-32px">
			Routeo
		</div>

		<div class="text-muted-foreground flex gap-0.5 items-center">
			<button
				class="p-1 rounded-full flex cursor-pointer transition items-center justify-center hover:bg-card"
				@click="minimize">
				<Icon name="i-ic:outline-minimize" />
			</button>

			<button
				class="p-1 rounded-full flex cursor-pointer transition items-center justify-center hover:bg-card"
				@click="toggleMaximize">
				<Icon name="i-material-symbols-light:select-window-2-outline" />
			</button>

			<button
				class="p-1 rounded-full flex cursor-pointer transition items-center justify-center hover:text-destructive hover:bg-card"
				@click="close">
				<Icon name="i-pixelarticons:close" />
			</button>
		</div>
	</div>
</template>
