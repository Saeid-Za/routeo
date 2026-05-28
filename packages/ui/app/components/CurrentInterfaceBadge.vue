<script setup lang="ts">
const { name } = defineProps<{
	name?: string
}>()

const displayName = computed(() => {
	return name ?? "-"
})
</script>

<template>
	<div
		class="text-xs px-1.5 py-0.5 border rounded-full inline-flex gap-1 items-center">
		<div class="text-muted-foreground">
			Internet Interface
		</div>

		<div>
			{{ displayName }}
		</div>
	</div>
</template>
