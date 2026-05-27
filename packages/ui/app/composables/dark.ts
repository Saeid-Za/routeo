export const useDark = defineComposable("dark", () => {
	const colorMode = useColorMode()
	const cookieValue = useCookie("nuxt-color-mode")
	const isDark = computed(() => colorMode.preference === "dark")

	function setDarkMode(value?: boolean) {
		const newValue = value ? "dark" : "light"
		colorMode.preference = newValue
		cookieValue.value = newValue
	}

	function toggleMode() {
		setDarkMode(colorMode.preference !== "dark")
	}

	function init(forcedValue: "dark" | "light") {
		const isDark = forcedValue === "dark"
		setDarkMode(isDark)
	}

	return {
		isDark,
		toggleMode,
		setDarkMode,
		init,
	}
})
