<script setup lang="ts">
const { ipList = [] } = defineProps<{
	ipList?: string[]
}>()
</script>

<template>
	<div class="text-sm px-2 border rounded-full inline-flex gap-2 items-center">
		<div class="text-muted-foreground">
			IP
		</div>

		<template v-if="ipList.length === 0">
			<div>-</div>
		</template>

		<template v-else>
			<div
				v-for="ip in ipList"
				:key="ip">
				{{ ip }}
			</div>
		</template>
	</div>
</template>
