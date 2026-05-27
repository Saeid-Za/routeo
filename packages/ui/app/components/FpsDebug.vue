<script lang="ts" setup>
import { useFps } from "@vueuse/core"

const fps = useFps()
</script>

<template>
	<div class="text-xs font-mono p-1 rounded bg-card fixed">
		{{ fps }}
	</div>
</template>
