<script lang="ts" setup>
defineProps<{
	dnsList: string[]
}>()
</script>

<template>
	<div class="text-sm px-2 border rounded-full inline-flex gap-2 items-center">
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
