<script lang="ts" setup>
const {
	color = "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)",
	throttle = 200,
	duration = 2000,
	height = 3,
} = defineProps<{
	throttle?: number
	duration?: number
	height?: number
	color?: string
	estimatedProgress?: () => (duration: number, elapsed: number) => number
}>()

// TODO: since we dont want anything more than progress it's recommended to extract the logic from original source
const { progress } = useLoadingIndicator({
	duration,
	throttle,
})
</script>

<template>
	<div
		class="nuxt-loading-indicator"
		:style="{
			position: 'fixed',
			top: 0,
			right: 0,
			left: 0,
			pointerEvents: 'none',
			width: 'auto',
			height: `${height}px`,
			background: color,
			backgroundSize: `${(100 / progress) * 100}% auto`,
			transform: `scaleX(${progress}%)`,
			transformOrigin: 'left',
			transition: 'transform 0.1s, height 0.4s, opacity 0.4s',
			zIndex: 999999,
		}">
		<slot />
	</div>
</template>
