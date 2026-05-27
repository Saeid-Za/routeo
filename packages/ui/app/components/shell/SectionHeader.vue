<template>
	<div class="text-muted-foreground p-2 flex items-center justify-between">
		<span>
			<slot />
		</span>

		<slot name="end" />
	</div>
</template>
