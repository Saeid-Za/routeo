<script lang="ts" setup>
import { useOnline } from "@vueuse/core"

const isOnline = useOnline()
</script>

<template>
	<SectionHeader>
		General Information

		<template #end>
			<UTooltip>
				<UTooltipTrigger>
					<div
						:class="isOnline ? 'bg-green-500' : 'bg-red-500'"
						class="rounded-full size-3" />
				</UTooltipTrigger>

				<UTooltipContent
					align="center"
					side="left">
					<div>
						Your system is currently
						<strong>
							{{ isOnline ? "Online" : "Offline" }}
						</strong>
					</div>
				</UTooltipContent>
			</UTooltip>
		</template>
	</SectionHeader>
</template>
