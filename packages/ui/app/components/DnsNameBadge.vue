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
		class="text-sm px-2 border rounded-full inline-flex gap-2 items-center">
		<div class="text-muted-foreground">
			Active DNS
		</div>

		<div>
			{{ dnsPlaceholder }}
		</div>
	</div>
</template>
