<script setup lang="ts">
const { src } = defineProps<{
	src: string
}>()

const isIcon = computed(() => {
	return src.startsWith("i-")
})
</script>

<template>
	<img
		v-if="!isIcon"
		class="object-contain"
		:src="src">

	<Icon
		v-else
		:name="src" />
</template>
