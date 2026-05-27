export const useTokenCookie = defineComposable("token-cookie", () => {
	const expires = new Date()
	expires.setFullYear(expires.getFullYear() + 1)

	const tokenValue = useCookie("token", {
		sameSite: "strict",
		priority: "high",
		// This is not the token expiresation date itself, but a way to make a
		// Persistent data storage that could be shared on first request.
		expires,
	})

	function setCookie(token: string) {
		tokenValue.value = token
	}

	function getCookie() {
		refreshCookie("token")
		return tokenValue.value
	}

	function clearCookie() {
		tokenValue.value = null
	}

	return {
		clearCookie,
		setCookie,
		getCookie,
	}
})
