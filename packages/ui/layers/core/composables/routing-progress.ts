export const useRoutingProgress = defineComposable("routerProgress", () => {
	const router = useRouter()
	const isLoading = shallowRef(false)

	function init() {
		router.beforeEach((_to, _from, next) => {
			isLoading.value = true
			next()
		})

		router.beforeResolve((_to, _from, next) => {
			isLoading.value = false
			next()
		})
	}

	return {
		init,
		isLoading,
	}
})
