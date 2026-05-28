<template>
	<div class="text-muted-foreground text-sm px-2 py-1 flex items-center justify-between">
		<span>
			<slot />
		</span>

		<slot name="end" />
	</div>
</template>
