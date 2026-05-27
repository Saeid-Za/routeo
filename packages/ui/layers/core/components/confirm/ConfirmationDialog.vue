<script lang="ts" setup>
defineProps<{
	title: string
	description: string
}>()

defineEmits<{
	cancel: []
	ok: []
}>()

const { t } = useLanguage()
</script>

<template>
	<UDialog>
		<UDialogContent>
			<UDialogHeader>
				<UDialogTitle>{{ title }}</UDialogTitle>

				<UDialogDescription>
					{{ description }}
				</UDialogDescription>
			</UDialogHeader>

			<div class="flex gap-3 justify-center">
				<Btn
					class="border border-border w-160px"
					color="accent"
					@click="$emit('cancel')">
					{{ t('cancel') }}
				</Btn>

				<Btn
					color="accent"
					class="border border-border w-80px"
					@click="$emit('ok')">
					{{ t('ok') }}
				</Btn>
			</div>
		</UDialogContent>
	</UDialog>
</template>
