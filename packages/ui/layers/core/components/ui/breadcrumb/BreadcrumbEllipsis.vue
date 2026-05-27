<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"flex size-9 items-center justify-center",
	() => props.class,
)
</script>

<template>
	<span
		data-slot="breadcrumb-ellipsis"
		role="presentation"
		aria-hidden="true"
		:class="className">
		<slot>
			<Icon
				name="i-heroicons:ellipsis-horizontal-solid"
				class="size-4" />
		</slot>

		<span class="sr-only">More</span>
	</span>
</template>
