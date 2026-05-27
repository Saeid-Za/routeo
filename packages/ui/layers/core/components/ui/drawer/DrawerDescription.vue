<script lang="ts" setup>
import type { DrawerDescriptionProps } from "vaul-vue"
import type { HtmlHTMLAttributes } from "vue"
import { useClass } from "#imports"
import { DrawerDescription } from "vaul-vue"

const { class: rawClass, ...props } = defineProps<DrawerDescriptionProps & { class?: HtmlHTMLAttributes["class"] }>()

const className = useClass(
	"text-sm text-muted-foreground",
	() => rawClass,
)
</script>

<template>
	<DrawerDescription
		data-slot="drawer-description"
		v-bind="props"
		:class="className">
		<slot />
	</DrawerDescription>
</template>
