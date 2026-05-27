<script setup lang="ts">
import type { CollapsibleContentProps } from "reka-ui"
import { CollapsibleContent } from "reka-ui"

const props = defineProps<CollapsibleContentProps>()
</script>

<template>
	<CollapsibleContent
		v-bind="props"
		data-slot="collapsible-content"
		class="transition-all overflow-hidden data-[state=open]:collapsible-down data-[state=closed]:collapsible-up">
		<slot />
	</CollapsibleContent>
</template>
