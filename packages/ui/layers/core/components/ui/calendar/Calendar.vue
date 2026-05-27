<script lang="ts" setup>
import type { CalendarRootProps, DateValue } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { CalendarRoot, useForwardPropsEmits } from "reka-ui"
import CalendarCell from "./CalendarCell.vue"
import CalendarCellTrigger from "./CalendarCellTrigger.vue"
import CalendarGrid from "./CalendarGrid.vue"
import CalendarGridBody from "./CalendarGridBody.vue"
import CalendarGridHead from "./CalendarGridHead.vue"
import CalendarGridRow from "./CalendarGridRow.vue"
import CalendarHeadCell from "./CalendarHeadCell.vue"
import CalendarHeader from "./CalendarHeader.vue"
import CalendarHeading from "./CalendarHeading.vue"
import CalendarNextButton from "./CalendarNextButton.vue"
import CalendarPrevButton from "./CalendarPrevButton.vue"

const { class: rawClass, ...props } = defineProps<CalendarRootProps & {
	class?: HTMLAttributes["class"]
	modelValue: DateValue | undefined
}>()

const emits = defineEmits<{
	/** Event handler called whenever the placeholder value changes */
	"update:placeholder": [date: DateValue]
}>()
const forwarded = useForwardPropsEmits(() => props, emits)

const modelValue = defineModel<DateValue>({ required: false })

const className = useClass(
	"p-3",
	() => rawClass,
)
</script>

<template>
	<CalendarRoot
		v-slot="{ grid, weekDays }"
		v-bind="forwarded"
		v-model="modelValue"
		:class="className">
		<CalendarHeader>
			<CalendarPrevButton />

			<CalendarHeading />

			<CalendarNextButton />
		</CalendarHeader>

		<div class="mt-4 flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
			<CalendarGrid
				v-for="month in grid"
				:key="month.value.toString()">
				<CalendarGridHead>
					<CalendarGridRow>
						<CalendarHeadCell
							v-for="day in weekDays"
							:key="day">
							{{ day }}
						</CalendarHeadCell>
					</CalendarGridRow>
				</CalendarGridHead>

				<CalendarGridBody>
					<CalendarGridRow
						v-for="(weekDates, index) in month.rows"
						:key="`weekDate-${index}`"
						class="mt-2 w-full">
						<CalendarCell
							v-for="weekDate in weekDates"
							:key="weekDate.toString()"
							:date="weekDate">
							<CalendarCellTrigger
								:day="weekDate"
								:month="month.value" />
						</CalendarCell>
					</CalendarGridRow>
				</CalendarGridBody>
			</CalendarGrid>
		</div>
	</CalendarRoot>
</template>
