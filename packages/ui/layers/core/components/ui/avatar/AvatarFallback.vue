<script setup lang="ts">
import type { AvatarFallbackProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { AvatarFallback } from "reka-ui"

const { class: rawClass, ...props } = defineProps<AvatarFallbackProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"bg-muted flex size-full items-center justify-center rounded-full",
	() => rawClass,
)
</script>

<template>
	<AvatarFallback
		data-slot="avatar-fallback"
		:class="className"
		v-bind="props">
		<slot />
	</AvatarFallback>
</template>
