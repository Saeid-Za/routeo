<script lang="ts" setup>
defineProps<{
	size: number
	groupClass?: string
	itemClass?: string
}>()

const emit = defineEmits<{
	complete: [value: string[]]
}>()

const model = defineModel<string[]>()

const input = useTemplateRef("input")

function focus() {
	const firstElem = input.value?.at(0)
	firstElem?.$el.focus()
}

function handleEvent(index: number) {
	if (index <= 0)
		index = 0

	else if (index >= input.value!.length - 1)
		index = input.value!.length - 1

	const firstElem = input.value!.at(index)
	firstElem?.$el.focus()
}

defineExpose({
	focus,
})
</script>

<template>
	<UPinInput
		v-model="model"
		type="number"
		otp
		@complete="emit('complete', $event)"
		@change.stop
		@input.stop>
		<UPinInputGroup
			dir="ltr"
			:class="groupClass">
			<UPinInputSlot
				v-for="(id, index) in size"
				ref="input"
				:key="id"
				:class="itemClass"
				:index="index"
				@keydown.left.stop.prevent="handleEvent(index - 1)"
				@keydown.right.stop.prevent="handleEvent(index + 1)" />
		</UPinInputGroup>
	</UPinInput>
</template>
