<script setup lang="ts">
import type { ECElementEvent } from 'echarts/core'
import { axisLabelStyle, barRadiusH, chartChrome, sequential, tooltipStyle, type TooltipParam } from '~/utils/echarts'

const emit = defineEmits<{ filter: [string] }>()

const { incidents, sectorLabel } = useCyberData()
const { t } = useLocale()
const { base } = useChartBase()
const narrow = useNarrowViewport()

/** Ascending, so the largest count lands at the top of a horizontal chart. */
const counts = computed(() => {
  const tally = new Map<string, number>()
  for (const incident of incidents.value) tally.set(incident.sector, (tally.get(incident.sector) ?? 0) + 1)
  return [...tally.entries()]
    .map(([sector, count]) => ({ sector, count }))
    .sort((a, b) => a.count - b.count || b.sector.localeCompare(a.sector))
})

const option = computed(() => {
  const max = Math.max(...counts.value.map((entry) => entry.count), 1)
  return {
    ...base.value,
    grid: { left: 4, right: 28, top: 6, bottom: 4, containLabel: true },
    xAxis: {
      type: 'value',
      minInterval: 1,
      axisLabel: axisLabelStyle,
      splitLine: { lineStyle: { color: chartChrome.gridline } },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'category',
      data: counts.value.map((entry) => sectorLabel(entry.sector)),
      axisLabel: {
        ...axisLabelStyle,
        color: chartChrome.ink2,
        fontFamily: chartChrome.sans,
        fontSize: narrow.value ? 11 : 12,
        width: narrow.value ? 96 : 150,
        overflow: 'truncate',
      },
      axisLine: { lineStyle: { color: chartChrome.axis } },
      axisTick: { show: false },
    },
    tooltip: { ...tooltipStyle, trigger: 'item' },
    series: [
      {
        type: 'bar',
        barMaxWidth: 14,
        cursor: 'pointer',
        itemStyle: {
          borderRadius: barRadiusH,
          // Sequential: one hue, darker with magnitude.
          color: (params: TooltipParam) => sequential(counts.value[params.dataIndex]?.count ?? 0, max),
        },
        label: {
          show: true,
          position: 'right',
          distance: 7,
          color: chartChrome.ink,
          fontFamily: chartChrome.mono,
          fontSize: 11,
        },
        data: counts.value.map((entry) => entry.count),
      },
    ],
  }
})

const tableRows = computed(() => [...counts.value].reverse().map((entry) => [sectorLabel(entry.sector), entry.count]))

function onClick(params: ECElementEvent) {
  const entry = counts.value[params.dataIndex]
  if (entry) emit('filter', entry.sector)
}
</script>

<template>
  <ChartCard :title="t('chartSectorTitle')" interactive>
    <div class="h-[320px] w-full">
      <AppChart :option="option" :label="t('chartSectorTitle')" @click="onClick" />
    </div>

    <template #table>
      <ChartTable :caption="t('chartSectorTitle')" :headers="[t('sector'), t('count')]" :rows="tableRows" />
    </template>
  </ChartCard>
</template>
