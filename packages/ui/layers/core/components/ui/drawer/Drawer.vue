<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps as Props } from "vaul-vue"
import { useForwardPropsEmits } from "reka-ui"
import { DrawerRoot } from "vaul-vue"

// Type `never` breaks object destructuring
type DrawerRootProps = Omit<Props, "fadeFromIndex">

const {
	shouldScaleBackground = true,
	...props
} = defineProps<DrawerRootProps>()

const emits = defineEmits<DrawerRootEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)
</script>

<template>
	<DrawerRoot
		data-slot="drawer"
		v-bind="forwarded"
		:should-scale-background>
		<slot />
	</DrawerRoot>
</template>
