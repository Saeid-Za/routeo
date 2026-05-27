<script lang="ts" setup>
const { downloadSpeed, uploadSpeed } = defineProps<{
	downloadSpeed: number
	uploadSpeed: number
}>()

// props are bytes per second — convert to human readable (e.g. "1.50 KB/s")
const humanDownloadSpeed = computed(() => `${humanizeBytes(downloadSpeed)}/s`)
const humanUploadSpeed = computed(() => `${humanizeBytes(uploadSpeed)}/s`)
</script>

<template>
	<div class="flex gap-1">
		<div class="text-sm px-2 border rounded-full inline-flex gap-2 items-center">
			<div class="text-muted-foreground">
				Down
			</div>

			{{ humanDownloadSpeed }}
		</div>

		<div class="text-sm px-2 border rounded-full inline-flex gap-2 items-center">
			<div class="text-muted-foreground">
				Up
			</div>

			{{ humanUploadSpeed }}
		</div>
	</div>
</template>
