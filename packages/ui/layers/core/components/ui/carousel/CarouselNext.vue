<script setup lang="ts">
import type { WithClassAsProps } from "./interface"
import { useClass } from "#imports"
import Button from "../button/Button.vue"
import { useCarousel } from "./useCarousel"

const props = defineProps<WithClassAsProps>()

const { orientation, canScrollNext, scrollNext } = useCarousel()

const orientationClass = computed(() =>
	orientation === "horizontal"
		? "-end-12 top-1/2 -translate-y-1/2"
		: "-bottom-12 start-1/2 -translate-x-1/2 rotate-90")

const className = useClass(
	"touch-manipulation absolute size-8 rounded-full p-0",
	orientationClass,
	() => props.class,
)
</script>

<template>
	<Button
		data-slot="carousel-next"
		:disabled="!canScrollNext"
		:class="className"
		variant="outline"
		@click="scrollNext">
		<slot>
			<Icon
				name="i-heroicons:arrow-right-16-solid"
				class="text-current size-4" />

			<span class="sr-only">Next Slide</span>
		</slot>
	</Button>
</template>
