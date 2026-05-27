<script lang="ts" setup>
</script>

<template>
	<div
		class="rounded bg-background/94 flex flex-col h-100dvh overflow-hidden"
		style="background-image: url(/images/noise.png);">
		<AppHeader />

		<div class="py-[46px] flex min-h-0 flex-1 flex-col overflow-y-auto">
			<slot />
		</div>

		<AppFooter />
	</div>
</template>
