<script lang="ts" setup>
const props = defineProps<{
	modelValue?: any | any[]
	selfValue?: any
	multiple?: boolean
}>()

const isSelected = computed(() => {
	let selected = false
	if (props.multiple)
		selected = props.modelValue?.includes(props.selfValue)

	else
		selected = props.selfValue === props.modelValue

	return selected
})
</script>

<template>
	<div class="size-4">
		<Icon
			v-if="isSelected"
			class="size-4"
			name="i-mdi:check" />
	</div>
</template>
