<script setup lang="ts">
import type { WithClassAsProps } from "./interface"
import { useClass } from "#imports"
import { useCarousel } from "./useCarousel"

defineOptions({
	inheritAttrs: false,
})

const props = defineProps<WithClassAsProps>()

const { carouselRef, orientation } = useCarousel()

const orientationClass = computed(() => orientation === "horizontal" ? "-ms-4" : "-mt-4 flex-col")

const className = useClass(
	"flex",
	orientationClass,
	() => props.class,
)
</script>

<template>
	<div
		ref="carouselRef"
		data-slot="carousel-content"
		class="overflow-hidden">
		<div
			:class="className"
			v-bind="$attrs">
			<slot />
		</div>
	</div>
</template>
