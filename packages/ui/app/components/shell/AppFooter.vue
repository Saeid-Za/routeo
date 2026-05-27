<script lang="ts" setup>

</script>

<template>
	<div
		class="border-t bg-background flex h-[36px] shadow-lg items-center inset-x-0 bottom-0 justify-center gap-16 fixed z-2">
		<NuxtLink to="/">
			<button
				class="p-1 rounded-full flex cursor-pointer transition items-center justify-center hover:bg-card">
				<Icon name="i-pixel:home" />
			</button>
		</NuxtLink>

		<NuxtLink to="/logs">
			<button
				class="p-1 rounded-full flex cursor-pointer transition items-center justify-center hover:bg-card">
				<Icon name="i-pixel:cog" />
			</button>
		</NuxtLink>
	</div>
</template>
