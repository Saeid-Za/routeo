<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { AvatarRoot } from "reka-ui"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"relative flex size-8 shrink-0 overflow-hidden rounded-full",
	() => props.class,
)
</script>

<template>
	<AvatarRoot
		data-slot="avatar"
		:class="className">
		<slot />
	</AvatarRoot>
</template>
