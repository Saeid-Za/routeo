<script lang="ts" setup>
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HtmlHTMLAttributes } from "vue"
import { useClass } from "#imports"
import { useForwardPropsEmits } from "reka-ui"
import { DrawerContent, DrawerPortal } from "vaul-vue"
import DrawerOverlay from "./DrawerOverlay.vue"

const props = defineProps<DialogContentProps & { class?: HtmlHTMLAttributes["class"] }>()
const emits = defineEmits<DialogContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const className = useClass(
	"group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
	// top
	"data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0",
	"data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh]",
	" data-[vaul-drawer-direction=top]:rounded-b-lg",
	// bot
	"data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0",
	"data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh]",
	"data-[vaul-drawer-direction=bottom]:rounded-t-lg",
	// right
	"data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0",
	"data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:sm:max-w-sm",
	// left
	"data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0",
	"data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:sm:max-w-sm",
	() => props.class,
)
</script>

<template>
	<DrawerPortal>
		<DrawerOverlay />

		<DrawerContent
			data-slot="drawer-content"
			v-bind="forwarded"
			:class="className">
			<div class="mx-auto mt-4 rounded-full bg-muted shrink-0 h-2 w-[100px] hidden group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />

			<slot />
		</DrawerContent>
	</DrawerPortal>
</template>
