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
		class="text-sm px-2 border rounded-full inline-flex gap-2 items-center">
		<div class="text-muted-foreground">
			Internet Interface
		</div>

		<div>
			{{ displayName }}
		</div>
	</div>
</template>
