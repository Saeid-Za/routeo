import { BarChart, LineChart, PieChart } from "echarts/charts"
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from "echarts/components"
import * as echarts from "echarts/core"

import { LabelLayout, LegacyGridContainLabel } from "echarts/features"
import { CanvasRenderer } from "echarts/renderers"

echarts.use([
	BarChart,
	PieChart,
	LineChart,
	TitleComponent,
	TooltipComponent,
	GridComponent,
	LegendComponent,
	LabelLayout,
	CanvasRenderer,
	LegacyGridContainLabel,
])

export { echarts }
