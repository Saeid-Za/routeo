import { cleana } from "cleana"

export function useLocalPagination<T, U>(input: LocalPaginationInput<T, U>) {
	const rows = ref<T[]>([])
	const itemPerPage = shallowRef(input.itemPerPage)
	const totalCount = shallowRef(0)
	const sortBy = shallowRef(input.sortBy)
	const descending = shallowRef(input.descending)
	const loading = shallowRef(false)

	const tableModel = computed(() => ({
		rows: rows.value,
		itemsPerPage: itemPerPage.value,
	}))

	async function onRequest(input: CursorPaginationOutputType) {
		itemPerPage.value = input.rowsPerPage ?? itemPerPage.value
		sortBy.value = input.sortBy?.field
		descending.value = input.sortBy?.descending

		return await getData()
	}

	async function getData() {
		loading.value = true
		const pagination = getPaginationData()

		try {
			const result = await input.callback(pagination)
			rows.value.push(...result.data as any)
			totalCount.value = result.data.length
		}
		catch (e) {
			console.error(e)
		}

		loading.value = false
	}

	function setItemPerPage(amount: number) {
		itemPerPage.value = amount
	}

	function setSortField(newSortField: U) {
		sortBy.value = newSortField
	}

	function getPaginationData() {
		const result: LocalPaginationInputType = {
			sortBy: cleana({ descending: descending.value, field: sortBy.value }),
		}

		return result
	}

	return {
		onRequest,
		setItemPerPage,
		getData,
		setSortField,
		rowKeyName: input.rowKeyName,
		rows,
		itemPerPage,
		loading,
		totalCount,
		tableModel,
	}
}

type LocalPaginationInput<T, U> = {
	itemPerPage: number
	rowKeyName: string
	sortBy?: U
	descending?: boolean
	callback: (pagination: LocalPaginationInputType) => Promise<CallbackResult<T>>
}

type CallbackResult<T> = {
	data: T[]
}

type LocalPaginationInputType = {
	sortBy: Partial<{ field: string, descending: boolean }>
}

type CursorPaginationOutputType = {
	rowsPerPage?: number
	sortBy?: Partial<{ field: string, descending: boolean }>
}
