<script setup lang="ts" generic="T extends Record<string, any>">
import type { VirtualizerOptions } from "@tanstack/vue-virtual"
import type { Awaitable } from "@vueuse/core"
import type { HtmlHTMLAttributes } from "vue"
import { useClass } from "#imports"
import { useVirtualizer } from "@tanstack/vue-virtual"
import { useInfiniteScroll } from "@vueuse/core"

export type TableColumn = {
	id: string
	label: string
	class?: string
	sortable?: boolean
}

export type TableRequestPayload = {
	sortBy: Partial<{ field: string, descending: boolean }>
}

const {
	rowKey = "id",
	class: className = "",
	onRequest,
	hasMore,
	loading,
	rows,
	virtualScrollHeight = 36,
	itemPerPage = 30,
} = defineProps<{
	itemPerPage?: number
	virtualScrollHeight?: number
	rowKey?: string
	loading?: boolean
	columns: TableColumn[]
	rows: T[]
	class?: HtmlHTMLAttributes["class"]
	rowClass?: string
	cellClass?: string
	totalCount?: number
	hasMore?: boolean
	onRequest?: (payload: TableRequestPayload) => Awaitable<any>
}>()

const emit = defineEmits<{
	rowClick: [row: T, event: MouseEvent]
	rowContext: [row: T, event: MouseEvent]
	request: [payload: TableRequestPayload]
}>()

defineSlots<{
	row: (scope: {
		columns: TableColumn[]
		row: T
		rowKey: string
		index: number
	}) => VNode[]

	[key: `cell-${string}`]: (scope: {
		columns: TableColumn[]
		row: T
		cellClass?: string
		column: string
		value: any
		rowKey: string
		selected: boolean
		index: number
	}) => VNode[]

	empty: []
	loading: []
}>()

const sortingField = ref<string>()
const sortingPivot = ref<"dsc" | "asc">()

const containerElement = useTemplateRef("container")

const sortBy = computed(() => {
	if (!sortingField.value || sortingPivot.value === undefined)
		return {}

	return {
		field: sortingField.value,
		descending: sortingPivot.value === "dsc",
	}
})

const infinite = useInfiniteScroll(
	containerElement,
	async () => {
		if (loading)
			return

		if (onRequest) {
			await onRequest({ sortBy: sortBy.value })
		}
	},
	{
		distance: itemPerPage / 3 * virtualScrollHeight,
		canLoadMore: () => {
			return hasMore
		},
	},
)

watch(() => hasMore, (hasMore) => {
	if (hasMore)
		infinite.reset()
})

const rowVirtualizerOptions = computed(() => {
	return {
		count: rows.length,
		getScrollElement: () => containerElement.value,
		estimateSize: () => virtualScrollHeight,
		overscan: itemPerPage / 2,
	} satisfies Partial<VirtualizerOptions<HTMLElement, HTMLElement>>
})

const rowVirtualizer = useVirtualizer(rowVirtualizerOptions)
const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

const before = computed(() => virtualRows.value.length > 0 ? virtualRows.value[0]!.start : 0)
const after = computed(() => {
	const hasItems = virtualRows.value.length > 0
	if (hasItems)
		return totalSize.value - virtualRows.value[virtualRows.value.length - 1]!.end
	return 0
})

const computedClass = useClass(
	"border relative h-1 flex flex-col justify-between",
	() => className,
)

async function emitSorting(columnId: string) {
	if (sortingField.value === columnId) {
		if (sortingPivot.value === "dsc") {
			sortingPivot.value = "asc"
		}
		else if (sortingPivot.value === "asc") {
			sortingPivot.value = undefined
			sortingField.value = undefined
		}
		else {
			sortingPivot.value = "dsc"
		}
	}

	else {
		sortingField.value = columnId
		sortingPivot.value = "dsc"
	}

	if (onRequest) {
		await onRequest({ sortBy: sortBy.value })
	}
}

function onColumnSortingToggle(column: TableColumn) {
	if (!column.sortable)
		return

	emitSorting(column.id)
}
</script>

<template>
	<div :class="computedClass">
		<FadeTransition>
			<UCard
				v-if="!loading && rows.length === 0"
				class="px-2 translate-x--1/2 translate-y-1/2 left-1/2 top-1/2 absolute">
				No Data was Found
			</UCard>

			<div
				v-else-if="loading"
				class="px-2 translate-x--1/2 translate-y-1/2 left-1/2 top-1/2 absolute">
				<Icon
					name="i-mingcute:loading-fill"
					class="animate-spin" />
			</div>
		</FadeTransition>

		<div
			ref="container"
			class="will-change-scroll size-full backface-hidden z-1 overflow-auto">
			<table
				class="text-sm min-w-full whitespace-nowrap border-separate border-spacing-0">
				<!-- Sticky Header -->
				<thead
					class="bg-accent opacity-85 capitalize top-0 sticky z-20 backdrop-blur-sm">
					<tr class="h-11">
						<th
							v-for="column in columns"
							:key="column.id"
							:class="[column.class, { 'cursor-pointer': column.sortable }]"
							class="text-foreground px-2 text-start align-middle h-full"
							@click="onColumnSortingToggle(column)">
							<div class="flex gap-2 items-center justify-between">
								<div class="select-none">
									{{ column.label }}
								</div>

								<FadeTransition>
									<Icon
										v-if="sortingField === column.id && sortingPivot !== undefined"
										:name="sortingPivot === 'asc' ? 'i-lucide:sort-asc' : 'i-lucide:sort-desc'"
										class="size-5" />

									<div
										v-else
										class="opacity-0 size-5" />
								</FadeTransition>
							</div>
						</th>
					</tr>
				</thead>

				<!-- Virtualized Body -->
				<tbody class="border-b [&_tr:last-child]:border-0">
					<!-- Top Spacer -->
					<tr :style="{ height: `${before}px` }">
						<td :colspan="columns.length" />
					</tr>

					<!-- Virtual Rows -->
					<template
						v-for="(virtualRow) of virtualRows"
						:key="rows[virtualRow.index][rowKey]">
						<slot
							name="row"
							:row-key="rowKey"
							:index="virtualRow.index"
							:row="rows[virtualRow.index]!"
							:columns="columns">
							<tr
								:key="rows[virtualRow.index]![rowKey]"
								:class="rowClass"
								class="transition-colors hover:bg-accent/50!"
								@click="emit('rowClick', rows[virtualRow.index]!, $event)"
								@contextmenu.prevent="emit('rowContext', rows[virtualRow.index]!, $event)">
								<template
									v-for="(column, columnIndex) in columns"
									:key="`cell-${column.id}-${columnIndex}`">
									<slot
										:selected="false"
										:index="virtualRow.index"
										:row-key="rowKey"
										:column="column.id"
										:value="rows[virtualRow.index]![column.id]"
										:columns="columns"
										:name="`cell-${column.id}`"
										:cell-class="cellClass"
										:row="rows[virtualRow.index]!">
										<UTableCell :class="cellClass">
											{{ rows[virtualRow.index]![column.id] }}
										</UTableCell>
									</slot>
								</template>
							</tr>
						</slot>
					</template>

					<!-- Bottom Spacer -->
					<tr :style="{ height: `${after}px` }">
						<td :colspan="columns.length" />
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
