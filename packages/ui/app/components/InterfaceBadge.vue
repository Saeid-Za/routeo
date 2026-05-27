<script setup lang="ts">
defineProps<{
	interfaces: NetworkInterface[]
}>()
</script>

<template>
	<div class="text-sm px-2 border rounded-full inline-flex gap-2 items-center">
		<div class="text-muted-foreground">
			Interfaces
		</div>

		<template v-if="interfaces.length === 0">
			<div>-</div>
		</template>

		<template v-else>
			<div
				v-for="int in interfaces"
				:key="int.name">
				{{ int.name }}
			</div>
		</template>
	</div>
</template>
