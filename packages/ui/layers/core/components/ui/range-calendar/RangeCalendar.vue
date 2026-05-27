<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { RangeCalendarRoot, type RangeCalendarRootEmits, type RangeCalendarRootProps, useForwardPropsEmits } from "reka-ui"
import RangeCalendarCell from "./RangeCalendarCell.vue"
import RangeCalendarCellTrigger from "./RangeCalendarCellTrigger.vue"
import RangeCalendarGrid from "./RangeCalendarGrid.vue"
import RangeCalendarGridBody from "./RangeCalendarGridBody.vue"
import RangeCalendarGridHead from "./RangeCalendarGridHead.vue"
import RangeCalendarGridRow from "./RangeCalendarGridRow.vue"
import RangeCalendarHeadCell from "./RangeCalendarHeadCell.vue"
import RangeCalendarHeader from "./RangeCalendarHeader.vue"
import RangeCalendarHeading from "./RangeCalendarHeading.vue"
import RangeCalendarNextButton from "./RangeCalendarNextButton.vue"
import RangeCalendarPrevButton from "./RangeCalendarPrevButton.vue"

const { class: rawClass, ...props } = defineProps<RangeCalendarRootProps & { class?: HTMLAttributes["class"] }>()

const emits = defineEmits<RangeCalendarRootEmits>()

const className = useClass(
	"p-3",
	() => rawClass,
)

const forwarded = useForwardPropsEmits(() => props, emits)
</script>

<template>
	<RangeCalendarRoot
		v-slot="{ grid, weekDays }"
		:class="className"
		v-bind="forwarded">
		<RangeCalendarHeader>
			<RangeCalendarPrevButton />

			<RangeCalendarHeading />

			<RangeCalendarNextButton />
		</RangeCalendarHeader>

		<div class="mt-4 flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
			<RangeCalendarGrid
				v-for="month in grid"
				:key="month.value.toString()">
				<RangeCalendarGridHead>
					<RangeCalendarGridRow>
						<RangeCalendarHeadCell
							v-for="day in weekDays"
							:key="day">
							{{ day }}
						</RangeCalendarHeadCell>
					</RangeCalendarGridRow>
				</RangeCalendarGridHead>

				<RangeCalendarGridBody>
					<RangeCalendarGridRow
						v-for="(weekDates, index) in month.rows"
						:key="`weekDate-${index}`"
						class="mt-2 w-full">
						<RangeCalendarCell
							v-for="weekDate in weekDates"
							:key="weekDate.toString()"
							:date="weekDate">
							<RangeCalendarCellTrigger
								:day="weekDate"
								:month="month.value" />
						</RangeCalendarCell>
					</RangeCalendarGridRow>
				</RangeCalendarGridBody>
			</RangeCalendarGrid>
		</div>
	</RangeCalendarRoot>
</template>
