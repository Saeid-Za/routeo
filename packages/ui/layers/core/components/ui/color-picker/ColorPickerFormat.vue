<script setup lang="ts">
import { useColorPicker } from "."

const { mode } = useColorPicker()
const formats = ["hex", "rgb", "hsl"]
</script>

<template>
	<USelect v-model="mode">
		<USelectTrigger class="px-2 py-1">
			<USelectValue placeholder="Color Mode" />
		</USelectTrigger>

		<USelectContent>
			<USelectGroup>
				<USelectItem
					v-for="f in formats"
					:key="f"
					:value="f">
					{{ f.toUpperCase() }}
				</USelectItem>
			</USelectGroup>
		</USelectContent>
	</USelect>
</template>
