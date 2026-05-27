import { cleana } from "cleana"

export function useOffsetPagination<T>(input: OffsetPaginationInput<T>) {
	const rows = ref<T[]>([])
	const page = shallowRef(input.page ?? 1)
	const itemPerPage = shallowRef(input.itemPerPage)
	const totalCount = shallowRef(0)
	const maxNumberOfPages = shallowRef(0)
	const sortBy = shallowRef(input.sortBy)
	const descending = shallowRef(input.descending)
	const loading = shallowRef(false)

	async function next() {
		page.value += 1
		return await getData()
	}

	async function previous() {
		page.value -= 1
		return await getData()
	}

	async function gotoPage(newPage: number, amountPerPage: number | null = null) {
		page.value = newPage

		if (amountPerPage)
			itemPerPage.value = amountPerPage

		return await getData()
	}

	async function onRequest(input: OffsetPaginationOutputType) {
		page.value = input.page
		itemPerPage.value = input.rowsPerPage

		return await getData()
	}

	async function getData() {
		loading.value = true
		const pagination = getPaginationData()
		try {
			const result = await input.callback(pagination)
			rows.value = result.data as any
			totalCount.value = result.count
			maxNumberOfPages.value = Math.ceil(result.count / pagination.take)
		}
		catch (e) {
			console.error(e)
		}

		loading.value = false
	}

	function setItemPerPage(amount: number) {
		itemPerPage.value = amount
	}

	function setSortField(newSortField: string) {
		sortBy.value = newSortField
	}

	function getPaginationData() {
		const take = itemPerPage.value
		const skip = (page.value - 1) * take

		const result: OffsetPaginationInputType = {
			sortBy: cleana({ descending: descending.value, field: sortBy.value }),
			skip,
			take,
		}

		return result
	}

	return {
		next,
		previous,
		onRequest,
		gotoPage,
		setItemPerPage,
		getData,
		setSortField,
		rows,
		itemPerPage,
		loading,
		page,
		totalCount,
		maxNumberOfPages,
	}
}

export function useSSRPagination<T>(input: OffsetPaginationInput<T> & { key: string }) {
	const rows = useState<T[]>(`${input.key}-rows`, () => [])
	const page = useState(`${input.key}-page`, () => input.page ?? 1)
	const itemPerPage = useState(`${input.key}-items-per-page`, () => input.itemPerPage)
	const totalCount = useState(`${input.key}-total-count`, () => 0)
	const maxNumberOfPages = useState(`${input.key}-max-pages`, () => 0)
	const sortBy = useState(`${input.key}-sort-by`, () => input.sortBy)
	const descending = useState(`${input.key}-descending`, () => input.descending)
	const loading = useState(`${input.key}-loading`, () => false)

	async function next() {
		page.value += 1
		return await refresh()
	}

	async function previous() {
		page.value -= 1
		return await refresh()
	}

	async function gotoPage(newPage: number, amountPerPage: number | null = null) {
		page.value = newPage

		if (amountPerPage)
			itemPerPage.value = amountPerPage

		return await refresh()
	}

	async function onRequest(input: OffsetPaginationOutputType) {
		page.value = input.page
		itemPerPage.value = input.rowsPerPage

		return await refresh()
	}

	async function refresh() {
		loading.value = true
		const pagination = getPaginationData()
		try {
			const result = await input.callback(pagination)
			rows.value = result.data
			totalCount.value = result.count
			maxNumberOfPages.value = Math.ceil(result.count / pagination.take)
		}
		catch (e) {
			console.error(e)
		}

		loading.value = false
	}

	function setItemPerPage(amount: number) {
		itemPerPage.value = amount
	}

	function setSortField(newSortField: string) {
		sortBy.value = newSortField
	}

	function getPaginationData() {
		const take = itemPerPage.value
		const skip = (page.value - 1) * take

		const result: OffsetPaginationInputType = {
			sortBy: cleana({ descending: descending.value, field: sortBy.value }),
			skip,
			take,
		}

		return result
	}

	return {
		next,
		previous,
		onRequest,
		gotoPage,
		setItemPerPage,
		refresh,
		setSortField,
		rows,
		itemPerPage,
		loading,
		page,
		totalCount,
		maxNumberOfPages,
	}
}

type OffsetPaginationInput<T> = {
	page?: number
	itemPerPage: number
	sortBy?: string
	descending?: boolean
	callback: (pagination: OffsetPaginationInputType) => Promise<CallbackResult<T>>
}

type CallbackResult<T> = {
	data: T[]
	count: number
}

type OffsetPaginationInputType = {
	sortBy: Partial<{ field: string, descending: boolean }>
	take: number
	skip: number
}

type OffsetPaginationOutputType = {
	page: number
	rowsPerPage: number
}
