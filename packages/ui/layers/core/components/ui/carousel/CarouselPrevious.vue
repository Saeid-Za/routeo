<script setup lang="ts">
import type { WithClassAsProps } from "./interface"
import { useClass } from "#imports"
import Button from "../button/Button.vue"
import { useCarousel } from "./useCarousel"

const props = defineProps<WithClassAsProps>()

const { orientation, canScrollPrev, scrollPrev } = useCarousel()

const orientationClass = computed(() =>
	orientation === "horizontal"
		? "-start-12 top-1/2 -translate-y-1/2"
		: "-top-12 start-1/2 -translate-x-1/2 rotate-90")

const className = useClass(
	"touch-manipulation absolute h-8 w-8 rounded-full p-0",
	orientationClass,
	() => props.class,
)
</script>

<template>
	<Button
		data-slot="carousel-previous"
		:disabled="!canScrollPrev"
		:class="className"
		variant="outline"
		@click="scrollPrev">
		<slot>
			<Icon
				name="i-heroicons:arrow-left-16-solid"
				class="text-current size-4" />

			<span class="sr-only">Previous Slide</span>
		</slot>
	</Button>
</template>
