export function useOnce<T>(asyncFunction: () => Promise<T> | T) {
	const key = useId()
	// Create a state to store the result
	const isFetched = useState<boolean>(key, () => false)

	onScopeDispose(() => {
		isFetched.value = false
	})

	// Check if the result has already been fetched
	if (!isFetched.value) {
		isFetched.value = true

		if (import.meta.server) {
			const nuxtApp = useNuxtApp()

			if (getCurrentInstance()) {
				onServerPrefetch(() => asyncFunction())
			}
			else {
				nuxtApp.hook("app:created", async () => {
					await asyncFunction()
				})
			}
		}
		else {
			const nuxtApp = useNuxtApp()

			if (getCurrentInstance()) {
				onBeforeMount(() => asyncFunction())
			}
			else {
				nuxtApp.hook("app:beforeMount", async () => {
					await asyncFunction()
				})
			}
		}
	}
}

export async function useBlockingOnce<T>(asyncFunction: () => Promise<T>) {
	// Create a state to store the result
	const result = useState<T | undefined>(useId())
	const isFetched = useState<boolean>(useId(), () => false)

	onScopeDispose(() => {
		result.value = undefined
		isFetched.value = false
	})

	// Check if the result has already been fetched
	if (isFetched.value === false) {
		isFetched.value = true
		try {
			result.value = await asyncFunction()
		}
		catch (error) {
			if (import.meta.server) {
				console.log(error)
			}
		}
	}

	return result.value!
}
