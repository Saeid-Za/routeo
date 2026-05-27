<script lang="ts" setup>
import { useDropZone, useFileDialog } from "@vueuse/core"

const model = defineModel<File>()

const dropZoneRef = ref<HTMLDivElement>()
const fileDialog = useFileDialog()

fileDialog.onChange((files) => {
	const file = files?.item(0)
	if (file)
		model.value = file
})

function onDrop(files: File[] | null) {
	const outputFile = Array.isArray(files) ? files.at(0) : files
	if (outputFile)
		model.value = outputFile
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
	onDrop,
	multiple: false,
})
</script>

<template>
	<div
		ref="dropZoneRef"
		class="mx-auto"
		@click="fileDialog.open({ multiple: false })">
		<label
			:class="isOverDropZone ? 'border-primary!' : ''"
			class="border-2 border-border rounded-lg border-dashed bg-card flex flex-col h-64 w-full cursor-pointer transition duration-200 ease-in-out items-center justify-center hover:bg-card/75">
			<Transition>
				<div
					v-if="!model"
					class="pb-6 pt-5 flex flex-col gap-2 items-center justify-center">
					<Icon
						class="size-10"
						name="i-ic:sharp-cloud-upload" />

					<div class="text-sm text-foreground">
						<span class="font-semibold">Drag and drop</span> your files here
					</div>

					<div class="text-xs text-muted">Or Select File</div>
				</div>

				<div
					v-else
					class="pb-6 pt-5 flex flex-col gap-2 items-center justify-center">
					<div class="text-sm text-foreground flex gap-2">
						File
						<UBadge
							variant="outline"
							class="px-2 py-1">{{ model.name }}</UBadge>
						was selected.
					</div>
				</div>
			</Transition>
		</label>
	</div>
</template>
