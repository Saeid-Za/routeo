<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"[&>svg]:size-3.5",
	() => props.class,
)
</script>

<template>
	<li
		data-slot="breadcrumb-separator"
		role="presentation"
		aria-hidden="true"
		:class="className">
		<slot>
			<Icon name="i-heroicons:chevron-right-16-solid" />
		</slot>
	</li>
</template>
