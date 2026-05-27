<script setup lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	SwitchRoot,
	SwitchThumb,
	useForwardPropsEmits,
} from "reka-ui"

const { class: rawClass, innerClass, ...props } = defineProps<SwitchRootProps & {
	class?: HTMLAttributes["class"]
	innerClass?: HTMLAttributes["class"]
}>()

const emits = defineEmits<SwitchRootEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
	"focus-visible:border-ring focus-visible:ring-ring/50",
	"dark:data-[state=unchecked]:bg-input/80 inline-flex",
	"h-[1.15rem] w-8 shrink-0 items-center rounded-full border",
	"border-transparent shadow transition-all outline-none",
	"focus-visible:ring disabled:cursor-not-allowed disabled:opacity-50",
	() => rawClass,
)

const innerClassName = useClass(
	"rounded-full bg-background size-4 block pointer-events-none ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground",
	() => innerClass,
)
</script>

<template>
	<SwitchRoot
		data-slot="switch"
		v-bind="forwarded"
		:class="className">
		<SwitchThumb
			data-slot="switch-thumb"
			:class="innerClassName">
			<slot name="thumb" />
		</SwitchThumb>
	</SwitchRoot>
</template>
