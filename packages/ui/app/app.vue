<script setup lang="ts">
import { ConfigProvider } from "reka-ui"

const language = useLanguage()
const dark = useDark()
const logStream = useLogStream()

logStream.start()

language.init("en")
dark.init("dark")
</script>

<template>
	<UTooltipProvider :delay-duration="50">
		<ConfigProvider :dir="language.dir.value">
			<LoadingIndicator
				:height="1"
				color="var(--primary)" />

			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>

			<USonner
				:theme="dark.isDark.value ? 'dark' : 'light'"
				:dir="language.dir.value"
				position="bottom-center" />
		</ConfigProvider>
	</UTooltipProvider>
</template>
