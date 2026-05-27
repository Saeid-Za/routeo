<script setup lang="ts">
import type { TabsListProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { TabsList } from "reka-ui"

const { class: rawClass, ...props } = defineProps<TabsListProps & { class?: HTMLAttributes["class"] }>()

const className = useClass(
	"bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
	() => rawClass,
)
</script>

<template>
	<TabsList
		data-slot="tabs-list"
		v-bind="props"
		:class="className">
		<slot />
	</TabsList>
</template>
