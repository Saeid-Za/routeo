<script setup lang="ts">
import type { EChartsCoreOption, EChartsType } from "echarts/core"
import { useResizeObserver } from "@vueuse/core"
import { echarts } from "~~/layers/core/utils/echarts.config"

const props = defineProps<{
	options: EChartsCoreOption
}>()

const chartRef = useTemplateRef("chartRef")

const chartInstance = shallowRef<EChartsType | null>(null)

function renderChart() {
	if (!chartRef.value)
		return

	if (!chartInstance.value) {
		chartInstance.value = echarts.init(chartRef.value)
	}

	chartInstance.value.setOption(props.options, true)
}

watch(
	() => props.options,
	() => {
		renderChart()
	},
	{ deep: true, immediate: true },
)

onMounted(() => {
	renderChart()
})

onBeforeUnmount(() => {
	chartInstance.value?.dispose()
	chartInstance.value = null
})

useResizeObserver(chartRef, () => {
	chartInstance.value?.resize()
})

defineExpose({ chartRef, chartInstance, renderChart })
</script>

<template>
	<div
		ref="chartRef"
		class="min-h-[300px]" />
</template>
