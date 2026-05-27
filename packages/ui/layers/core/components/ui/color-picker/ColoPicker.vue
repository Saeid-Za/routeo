<script setup lang="ts">
import { provideColorPicker } from "."
import ColorPickerAlpha from "./ColorPickerAlpha.vue"
import ColorPickerFormat from "./ColorPickerFormat.vue"
import ColorPickerHue from "./ColorPickerHue.vue"
import ColorPickerOutput from "./ColorPickerOutput.vue"
import ColorPickerPreview from "./ColorPickerPreview.vue"
import ColorPickerSelection from "./ColorPickerSelection.vue"

provideColorPicker()
</script>

<template>
	<div class="border rounded bg-card flex flex-col gap-4 size-full w-xs overflow-hidden">
		<ColorPickerSelection class="h-40 w-full" />

		<div class="px-4 flex gap-4 w-full items-center">
			<ColorPickerPreview />

			<div class="flex grow flex-col gap-2">
				<ColorPickerHue class="w-full" />

				<ColorPickerAlpha class="w-full" />
			</div>
		</div>

		<div class="px-4 pb-4 flex gap-2">
			<ColorPickerFormat />

			<ColorPickerOutput />
		</div>
	</div>
</template>
