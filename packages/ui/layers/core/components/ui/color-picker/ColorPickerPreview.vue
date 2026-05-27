<script setup lang="ts">
import { useColorPicker } from "."

const { color } = useColorPicker()
</script>

<template>
	<div
		class="border rounded-full size-10"
		:style="{ background: color.toRgbString() }" />
</template>
