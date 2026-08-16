<script setup lang="ts">
import type { ECElementEvent } from 'echarts/core'
import { axisLabelStyle, barRadiusV, chartChrome, seriesColors, tooltipStyle } from '~/utils/echarts'
import type { IncidentKind } from '~/types/cyberwatch'

const emit = defineEmits<{ filter: [{ kind: IncidentKind; year: number }] }>()

const { incidents, years } = useCyberData()
const { t } = useLocale()
const { base } = useChartBase()

const ascendingYears = computed(() => [...years.value].sort((a, b) => a - b))
const kinds: IncidentKind[] = ['government', 'company']

function countFor(kind: IncidentKind, year: number) {
  return incidents.value.filter((i) => i.kind === kind && i.year === year).length
}

const option = computed(() => ({
  ...base.value,
  grid: { left: 4, right: 8, top: 34, bottom: 4, containLabel: true },
  legend: {
    show: true,
    top: 0,
    left: 0,
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 18,
    icon: 'roundRect',
    textStyle: { color: chartChrome.ink2, fontFamily: chartChrome.sans, fontSize: 12 },
  },
  tooltip: {
    ...tooltipStyle,
    trigger: 'axis',
    axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(169,179,198,0.06)' } },
  },
  xAxis: {
    type: 'category',
    data: ascendingYears.value.map(String),
    axisLabel: { ...axisLabelStyle, fontSize: 12 },
    axisLine: { lineStyle: { color: chartChrome.axis } },
    axisTick: { show: false },
  },
  yAxis: {
    type: 'value',
    minInterval: 1,
    axisLabel: axisLabelStyle,
    splitLine: { lineStyle: { color: chartChrome.gridline } },
    axisLine: { show: false },
    axisTick: { show: false },
  },
  series: kinds.map((kind, index) => ({
    name: t(kind === 'government' ? 'government' : 'companies'),
    type: 'bar',
    barMaxWidth: 46,
    barGap: '12%',
    cursor: 'pointer',
    itemStyle: { color: seriesColors[index], borderRadius: barRadiusV },
    label: {
      show: true,
      position: 'top',
      color: chartChrome.ink,
      fontFamily: chartChrome.mono,
      fontSize: 11,
    },
    data: ascendingYears.value.map((year) => countFor(kind, year)),
  })),
}))

const tableRows = computed(() =>
  ascendingYears.value.map((year) => [
    String(year),
    countFor('government', year),
    countFor('company', year),
    countFor('government', year) + countFor('company', year),
  ]),
)

function onClick(params: ECElementEvent) {
  const year = ascendingYears.value[params.dataIndex]
  const kind = kinds[typeof params.seriesIndex === 'number' ? params.seriesIndex : 0]
  if (year && kind) emit('filter', { kind, year })
}
</script>

<template>
  <ChartCard :title="t('chartKindTitle')" interactive>
    <div class="h-[280px] w-full">
      <AppChart :option="option" :label="t('chartKindTitle')" @click="onClick" />
    </div>

    <template #table>
      <ChartTable
        :caption="t('chartKindTitle')"
        :headers="[t('year'), t('government'), t('companies'), t('incidentsCount')]"
        :rows="tableRows"
      />
    </template>
  </ChartCard>
</template>
