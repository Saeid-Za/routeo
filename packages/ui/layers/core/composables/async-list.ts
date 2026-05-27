type PaginationTakeAll = { takeAll: boolean }

type Option = {
	value: any
	label: string
}

type Input<T extends Record<string, any>> = {
	where?: T
	pagination?: PaginationTakeAll
}

type OutputWrapper<T extends Tuple> = { data: Output<T> }

type Output<T extends Tuple> = {
	count: number
	data: T[]
}

type Tuple = { id: string, name: string }

type FetchFunc<T extends Record<string, any>, U extends Tuple> = (input: Input<T>) => Promise<OutputWrapper<U>>

export type AsyncList = ReturnType<typeof useAsyncList>

export function useAsyncList<T extends Record<string, any>, U extends Tuple>(callback: FetchFunc<T, U>) {
	const loading = shallowRef(false)
	const options = shallowRef<Option[]>([])

	async function init(input: Input<T>) {
		input.pagination = { takeAll: true }

		loading.value = true
		try {
			const { data: response } = await callback(input)
			const output: Option[] = response.data.map(item => ({ label: item.name, value: item.id }))
			options.value = output
		}
		catch {}
		loading.value = false
	}

	return {
		loading,
		options,
		init,
	}
}
