<script lang="ts">
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { vAutoAnimate } from "@formkit/auto-animate/vue"
import { useId } from "reka-ui"
import { provide } from "vue"
import { FORM_ITEM_INJECTION_KEY } from "./injectionKeys"
</script>

<script lang="ts" setup>
const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const className = useClass(
	"gap-y-2 flex flex-col",
	() => props.class,
)

const id = useId()
provide(FORM_ITEM_INJECTION_KEY, id)
</script>

<template>
	<div
		v-auto-animate
		data-slot="form-item"
		:class="className">
		<slot />
	</div>
</template>
