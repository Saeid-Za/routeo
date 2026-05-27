<script setup lang="ts" generic="T extends Record<string, any>">
import type { HtmlHTMLAttributes } from "vue"
import { useClass } from "#imports"
import { useVirtualizer, type VirtualizerOptions } from "@tanstack/vue-virtual"

export type LocalTableColumn = {
	id: string
	label: string
	class?: string
}

const {
	rowKey = "id",
	class: className = "",
	loading,
	virtualScrollHeight = 36,
	itemPerPage = 30,
} = defineProps<{
	itemPerPage?: number
	virtualScrollHeight?: number
	rowKey?: string
	loading?: boolean
	columns: LocalTableColumn[]
	rows: T[]
	class?: HtmlHTMLAttributes["class"]
	rowClass?: string
	cellClass?: string
}>()

const emit = defineEmits<{
	rowClick: [row: T, event: Event]
	rowContext: [row: T, event: Event]
}>()

defineSlots<{
	row: (scope: {
		columns: LocalTableColumn[]
		row: T
		rowKey: string
		rowId: string
		rowClass?: string
		index: number
	}) => VNode[]

	[key: `cell-${string}`]: (scope: {
		columns: LocalTableColumn[]
		row: T
		column: string
		value: any
		cellClass?: string
		rowKey: string
		selected: boolean
		index: number
	}) => VNode[]

	empty: []
	loading: []
}>()

const rows = defineModel<T[]>("rows", { default: [] })

const containerElement = useTemplateRef("container")

const computedClass = useClass(
	"border relative h-1 flex flex-col justify-between",
	() => className,
)

const rowVirtualizerOptions = computed(() => {
	return {
		count: rows.value.length,
		getScrollElement: () => containerElement.value,
		estimateSize: () => virtualScrollHeight,
		overscan: itemPerPage / 2,
	} satisfies Partial<VirtualizerOptions<HTMLElement, HTMLElement>>
})

const rowVirtualizer = useVirtualizer(rowVirtualizerOptions)
const virtualRows = computed(() => {
	return rowVirtualizer.value.getVirtualItems()
})

const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

const before = computed(() => virtualRows.value.length > 0 ? virtualRows.value[0]!.start : 0)
const after = computed(() => {
	const hasItems = virtualRows.value.length > 0
	if (hasItems)
		return totalSize.value - virtualRows.value[virtualRows.value.length - 1]!.end
	return 0
})
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
							:class="column.class"
							class="text-foreground px-2 text-start align-middle h-full">
							<div class="flex gap-2 items-center justify-between">
								<div class="select-none">
									{{ column.label }}
								</div>
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
							:row-id="rows[virtualRow.index]![rowKey]!"
							:row="rows[virtualRow.index]!"
							:columns="columns">
							<tr
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
