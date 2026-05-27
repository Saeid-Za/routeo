<script lang="ts" setup>
import type { LabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { useClass } from "#imports"
import Label from "../label/Label.vue"
import { useFormField } from "./useFormField"

const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>()

const { error, formItemId } = useFormField()

const className = useClass(
	// No Gap or flex-col needed
	"flex data-[error=true]:text-destructive-foreground",
	() => props.class,
)
</script>

<template>
	<Label
		data-slot="form-label"
		:data-error="!!error"
		:class="className"
		:for="formItemId">
		<slot />
	</Label>
</template>
