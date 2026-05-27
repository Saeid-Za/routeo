<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const className = useClass(
	"mt-auto flex flex-col gap-2 p-4",
	() => props.class,
)
</script>

<template>
	<div
		data-slot="sheet-footer"
		:class="className">
		<slot />
	</div>
</template>
