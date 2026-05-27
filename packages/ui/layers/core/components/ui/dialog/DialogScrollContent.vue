<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import {
	DialogClose,
	DialogContent,

	DialogOverlay,
	DialogPortal,
	useForwardPropsEmits,
} from "reka-ui"

const { class: rawClass, ...props } = defineProps<DialogContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<DialogContentEmits>()

const forwarded = useForwardPropsEmits(() => props, emits)

const className = useClass(
	"relative z-50 grid w-full max-w-lg my-8 gap-4 border",
	"border-border bg-background p-6 shadow-lg",
	"duration-200 sm:rounded-lg md:w-full",
	() => rawClass,
)

function onPointer<T extends Event & { detail: { originalEvent: PointerEvent } }>(event: T) {
	const originalEvent = event.detail.originalEvent
	const target = originalEvent.target as HTMLElement
	if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
		event.preventDefault()
	}
}
</script>

<template>
	<DialogPortal>
		<DialogOverlay
			class="bg-background/80 grid inset-0 place-items-center fixed z-50 overflow-y-auto backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0">
			<DialogContent
				:class="className"
				v-bind="forwarded"
				@pointer-down-outside="onPointer">
				<slot />

				<DialogClose
					class="p-0.5 rounded-md transition-colors end-4 top-4 absolute hover:bg-secondary">
					<Icon
						name="i-mdi:close-circle-outline"
						class="size-4" />

					<span class="sr-only">Close</span>
				</DialogClose>
			</DialogContent>
		</DialogOverlay>
	</DialogPortal>
</template>
