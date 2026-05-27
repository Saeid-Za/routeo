<script setup lang="ts">
import type { AvatarImageProps } from "reka-ui"

const props = defineProps<AvatarImageProps>()
</script>

<template>
	<img
		v-bind="props"
		class="size-full object-cover">
</template>
