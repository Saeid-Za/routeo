<script setup lang="ts">
import type { WithClassAsProps } from "./interface"
import { useClass } from "#imports"
import { useCarousel } from "./useCarousel"

const props = defineProps<WithClassAsProps>()

const { orientation } = useCarousel()

const orientationClass = computed(() => orientation === "horizontal" ? "ps-4" : "pt-4")

const className = useClass(
	"min-w-0 shrink-0 grow-0 basis-full",
	orientationClass,
	() => props.class,
)
</script>

<template>
	<div
		data-slot="carousel-item"
		role="group"
		aria-roledescription="slide"
		:class="className">
		<slot />
	</div>
</template>
