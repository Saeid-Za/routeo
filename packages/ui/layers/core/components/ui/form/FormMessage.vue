<script lang="ts" setup>
import { ErrorMessage } from "vee-validate"
import { toValue } from "vue"
import { useFormField } from "./useFormField"

const { name, formMessageId } = useFormField()
</script>

<template>
	<ErrorMessage
		:id="formMessageId"
		data-slot="form-message"
		as="p"
		:name="toValue(name)"
		class="text-xs text-destructive-foreground" />
</template>
