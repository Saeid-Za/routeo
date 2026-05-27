import { cleana } from "cleana"

export type CursorProps<T> = {
	"itemsPerPage": number
	"rowKey": string
	"loading": boolean
	"hasMore": boolean
	"rows": T[]
	"update:rows": (newRows: T[]) => void
	"onRequest": (input: CursorPaginationOutputType) => Promise<void>
}

export function useCursorPagination<T, U>(input: CursorPaginationInput<T, U>) {
	const rows = ref<T[]>([])
	const cursor = shallowRef<string | undefined>(input.cursor)
	const itemPerPage = shallowRef(input.itemPerPage)
	const totalCount = shallowRef(0)
	const sortBy = shallowRef(input.sortBy)
	const descending = shallowRef(input.descending)
	const loading = shallowRef(false)
	const hasMore = shallowRef(true)
	const mode = input.insertMode ?? "last"

	const props = computed<CursorProps<T>>(() => {
		return {
			"itemsPerPage": itemPerPage.value,
			"rowKey": input.rowKey,
			"loading": loading.value,
			"hasMore": hasMore.value,
			"rows": rows.value as T[],
			"update:rows": (newRows: T[]) => { rows.value = newRows },
			"onRequest": onRequest,
		}
	})

	async function onRequest(input: CursorPaginationOutputType) {
		itemPerPage.value = input.rowsPerPage ?? itemPerPage.value

		if (sortBy.value === input.sortBy?.field && descending.value === input.sortBy?.descending) {
			return await getData()
		}

		sortBy.value = input.sortBy?.field
		descending.value = input.sortBy?.descending

		return await onFilter()
	}

	async function onFilter() {
		return await getData({ reset: true })
	}

	async function getData(opts?: GetDataInput) {
		loading.value = true
		const pagination = getPaginationData(opts)

		try {
			const result = await input.callback(pagination)
			if (opts?.reset) {
				rows.value = result.data
			}
			else {
				if (mode === "last")
					rows.value.push(...result.data as any)
				else if (mode === "first")
					rows.value.unshift(...result.data as any)
			}

			const lastItem = result.data.at(-1)
			const lastItemId = lastItem ? lastItem[input.rowKey as keyof T] as string : undefined

			if (lastItemId)
				cursor.value = lastItemId

			totalCount.value = result.count
			hasMore.value = totalCount.value > rows.value.length
		}
		catch (e) {
			hasMore.value = false
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

	function getPaginationData(opts?: GetDataInput) {
		if (opts?.reset)
			cursor.value = undefined

		const take = itemPerPage.value

		const result: CursorPaginationInputType = {
			sortBy: cleana({ descending: descending.value, field: sortBy.value }),
			cursor: cursor.value,
			take,
		}

		return result
	}

	return {
		onFilter,
		onRequest,
		setItemPerPage,
		getData,
		setSortField,
		props,
		rowKey: input.rowKey,
		hasMore,
		rows,
		itemPerPage,
		loading,
		cursor,
		totalCount,
	}
}

type CursorPaginationInput<T, U> = {
	cursor?: string
	itemPerPage: number
	rowKey: string
	insertMode?: "first" | "last"
	sortBy?: U
	descending?: boolean
	callback: (pagination: CursorPaginationInputType) => Promise<CallbackResult<T>>
}

type CallbackResult<T> = {
	data: T[]
	count: number
}

type CursorPaginationInputType = {
	sortBy: Partial<{ field: string, descending: boolean }>
	take: number
	cursor?: string
}

type CursorPaginationOutputType = {
	rowsPerPage?: number
	sortBy?: Partial<{ field: string, descending: boolean }>
}

type GetDataInput = {
	reset: boolean
}
