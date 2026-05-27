<script lang="ts" setup>
import { useIntervalFn } from "@vueuse/core"
import { onMounted, shallowRef } from "vue"

const tauri = useTauri()

const isActive = shallowRef(false)
const loading = shallowRef(false)
let userTriggered = false
let desiredState = false

// Polling function
async function refreshStatus() {
	const status = await tauri.isWarpConnected()
	isActive.value = status

	// If the user requested a change, check if it's done
	if (userTriggered && status === desiredState) {
		loading.value = false
		userTriggered = false
	}
}

onMounted(() => {
	useIntervalFn(refreshStatus, 1000, { immediateCallback: true })
})

// Only mark loading when the user triggers a change
async function onUpdate(isOn: boolean) {
	loading.value = true
	userTriggered = true
	desiredState = isOn

	if (isOn) {
		await tauri.connectWarp()
	}
	else {
		await tauri.disconnectWarp()
	}
}
</script>

<template>
	<div class="flex grow flex-col items-center justify-center">
		<TheSwitch
			:loading="loading"
			:model-value="isActive"
			@update:model-value="onUpdate" />
	</div>
</template>
