<script lang="ts" setup>
defineProps<{
	dnsList: string[]
}>()
</script>

<template>
	<div class="text-xs px-1.5 py-0.5 border rounded-full inline-flex gap-1 items-center">
		<div class="text-muted-foreground">
			DNS
		</div>

		<template v-if="dnsList.length === 0">
			<div>-</div>
		</template>

		<template v-else>
			<div
				v-for="dns in dnsList"
				:key="dns">
				{{ dns }}
			</div>
		</template>
	</div>
</template>
