<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import { useFormField } from "./useFormField"

const props = defineProps<{
	class?: HTMLAttributes["class"]
}>()

const { formDescriptionId } = useFormField()

const className = useClass(
	"text-sm text-muted-foreground",
	() => props.class,
)
</script>

<template>
	<p
		:id="formDescriptionId"
		data-slot="form-description"
		:class="className">
		<slot />
	</p>
</template>
