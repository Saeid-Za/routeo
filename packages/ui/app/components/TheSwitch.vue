<script setup lang="ts">
import { AnimatePresence, Motion } from "motion-v"
import { computed } from "vue"

const props = defineProps<{ loading?: boolean }>()

const isOn = defineModel<boolean>({ required: true })

// Container scale pulse
const statusScale = computed(() => props.loading ? 1.15 : isOn.value ? 1.1 : 1)

// Glow effect
const boxShadow = computed(() => {
	if (props.loading) {
		return `
      0 0 15px rgba(20,184,166,0.5),
      0 0 30px rgba(20,184,166,0.35),
      0 0 60px rgba(20,184,166,0.2)
    `
	}
	return isOn.value
		? `
      0 0 15px rgba(34,197,94,0.6),
      0 0 30px rgba(34,197,94,0.4),
      0 0 60px rgba(34,197,94,0.25)
    `
		: "0 0 5px rgba(100,100,100,0.3)"
})

// Background color
const bgColor = computed(() => {
	if (props.loading)
		return "bg-cyan-500"
	return isOn.value ? "bg-green-500" : "bg-accent"
})

// Icon color
const iconColor = computed(() => {
	if (props.loading)
		return "text-white"
	return isOn.value ? "text-white" : "text-gray-300"
})

// Label text
const labelText = computed(() => {
	if (props.loading && isOn.value)
		return "Disconnecting"
	if (props.loading && !isOn.value)
		return "Connecting"
	return isOn.value ? "Connected" : "Disconnected"
})

// Label color
const labelColor = computed(() => {
	if (props.loading)
		return "text-cyan-400"
	return isOn.value ? "text-green-400" : "text-gray-400"
})

function toggle() {
	if (!props.loading)
		isOn.value = !isOn.value
}
</script>

<template>
	<div class="flex flex-col gap-2 items-center">
		<!-- Button -->
		<AnimatePresence>
			<Motion
				:animate="{ scale: statusScale, opacity: 1, boxShadow }"
				:exit="{ scale: 0.8, opacity: 0 }"
				:while-hover="{ scale: statusScale * 1.07, rotate: props.loading ? 10 : 0 }"
				:while-tap="{ scale: statusScale * 0.92, rotate: 0 }"
				class="rounded-full flex size-28 cursor-pointer select-none transition-all duration-300 items-center justify-center"
				:class="[bgColor, iconColor]"
				@click="toggle">
				<Motion
					:initial="{ y: 0, rotate: 0 }"
					:animate="props.loading
						? { y: [0, -3, 0, 3, 0], rotate: [0, 20, -20, 20, 0], opacity: [1, 0.7, 1, 0.7, 1] }
						: isOn
							? { y: [0, -8, 0, -4, 0], rotate: [0, 6, -6, 3, 0] }
							: { y: 0, rotate: 0, opacity: 1 }"
					:transition="props.loading
						? { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }
						: isOn
							? { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }
							: {}">
					<Icon
						:name="isOn ? 'i-lucide-wifi' : 'i-lucide-wifi-off'"
						class="size-10" />
				</Motion>
			</Motion>
		</AnimatePresence>

		<!-- Label with animation -->
		<Motion
			:animate="props.loading
				? { opacity: [1, 0.7, 1] }
				: isOn
					? { opacity: [1, 0.9, 1] }
					: { opacity: 1 }"
			:transition="props.loading
				? { repeat: Infinity, duration: 1.2, ease: 'easeInOut' }
				: isOn
					? { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }
					: {}"
			class="text-sm font-medium mt-5"
			:class="[labelColor]">
			{{ labelText }}
		</Motion>
	</div>
</template>
