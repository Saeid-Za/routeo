<script lang="ts" setup>
import type { DrawerTitleProps } from "vaul-vue"
import type { HtmlHTMLAttributes } from "vue"
import { useClass } from "#imports"
import { DrawerTitle } from "vaul-vue"

const { class: rawClass, ...props } = defineProps<DrawerTitleProps & { class?: HtmlHTMLAttributes["class"] }>()

const className = useClass(
	"font-semibold text-foreground",
	() => rawClass,
)
</script>

<template>
	<DrawerTitle
		data-slot="drawer-title"
		v-bind="props"
		:class="className">
		<slot />
	</DrawerTitle>
</template>
