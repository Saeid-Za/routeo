<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
	() => props.class,
)
</script>

<template>
	<tfoot
		data-slot="table-footer"
		:class="className">
		<slot />
	</tfoot>
</template>
