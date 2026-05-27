<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import { Primitive, useForwardProps } from "reka-ui"

const props = defineProps<PrimitiveProps>()
const forwardedProps = useForwardProps(props)
</script>

<template>
	<Primitive
		v-bind="forwardedProps"
		data-slot="pin-input-separator">
		<slot>
			<Icon name="i-heroicons:minus-16-solid" />
		</slot>
	</primitive>
</template>
