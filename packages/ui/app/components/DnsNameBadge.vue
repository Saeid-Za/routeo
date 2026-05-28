<script setup lang="ts">
const { dnsName } = defineProps<{
	dnsName?: string
}>()

const dnsPlaceholder = computed(() => {
	return dnsName ? dnsName : "System Default"
})
</script>

<template>
	<div
		class="text-xs px-1.5 py-0.5 border rounded-full inline-flex gap-1 items-center">
		<div class="text-muted-foreground">
			Active DNS
		</div>

		<div>
			{{ dnsPlaceholder }}
		</div>
	</div>
</template>
