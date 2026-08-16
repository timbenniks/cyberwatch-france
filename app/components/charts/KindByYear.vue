<script setup lang="ts">
import type { ECElementEvent } from 'echarts/core'
import { barRadiusV } from '~/utils/echarts'
import type { IncidentKind } from '~/types/cyberwatch'

const emit = defineEmits<{ filter: [{ kind: IncidentKind; year: number }] }>()

const { incidents, years } = useCyberData()
const { t } = useLocale()
const { base, theme } = useChartBase()
const { inspect, selectedKey, onSelect } = useChartInspect()

const ascendingYears = computed(() => [...years.value].sort((a, b) => a - b))
const kinds: IncidentKind[] = ['government', 'company']

const countsByKindYear = computed(() => {
  const counts = new Map<string, number>()
  for (const incident of incidents.value) {
    const key = `${incident.kind}:${incident.year}`
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return counts
})

function countFor(kind: IncidentKind, year: number) {
  return countsByKindYear.value.get(`${kind}:${year}`) ?? 0
}

function keyFor(kind: IncidentKind, year: number) {
  return `${kind}:${year}`
}

function parseKey(key: string): { kind: IncidentKind; year: number } | null {
  const [rawKind, yearText] = key.split(':')
  const year = Number(yearText)
  if ((rawKind !== 'government' && rawKind !== 'company') || !Number.isFinite(year)) return null
  return { kind: rawKind, year }
}

const selected = computed(() => {
  if (!selectedKey.value) return null
  const parsed = parseKey(selectedKey.value)
  if (!parsed) return null
  return { ...parsed, count: countFor(parsed.kind, parsed.year) }
})

const option = computed(() => {
  const { chrome, seriesColors, axisLabelStyle, tooltipStyle } = theme.value
  return {
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
      textStyle: { color: chrome.ink2, fontFamily: chrome.sans, fontSize: 12 },
    },
    tooltip: {
      ...tooltipStyle,
      show: !inspect.value,
      trigger: 'axis',
      axisPointer: { type: 'shadow', shadowStyle: { color: chrome.axisPointer } },
    },
    xAxis: {
      type: 'category',
      data: ascendingYears.value.map(String),
      axisLabel: { ...axisLabelStyle, fontSize: 12 },
      axisLine: { lineStyle: { color: chrome.axis } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisLabel: axisLabelStyle,
      splitLine: { lineStyle: { color: chrome.gridline } },
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
        color: chrome.ink,
        fontFamily: chrome.mono,
        fontSize: 11,
      },
      data: ascendingYears.value.map((year) => countFor(kind, year)),
    })),
  }
})

const tableRows = computed(() =>
  ascendingYears.value.map((year) => [
    String(year),
    countFor('government', year),
    countFor('company', year),
    countFor('government', year) + countFor('company', year),
  ]),
)

const selectedDetail = computed(() => {
  if (!selected.value) return ''
  return `${selected.value.year} · ${selected.value.count} ${t('incidentsCount')}`
})

function onClick(params: ECElementEvent) {
  const year = ascendingYears.value[params.dataIndex]
  const kind = kinds[typeof params.seriesIndex === 'number' ? params.seriesIndex : 0]
  if (year && kind) onSelect(keyFor(kind, year), () => emit('filter', { kind, year }))
}
</script>

<template>
  <ChartCard :title="t('chartKindTitle')" interactive>
    <div class="h-[280px] w-full">
      <AppChart :option="option" :label="t('chartKindTitle')" @click="onClick" />
    </div>

    <template #readout>
      <ChartReadout
        v-if="inspect && selected"
        :title="t(selected.kind === 'government' ? 'government' : 'companies')"
        :detail="selectedDetail"
        :action-label="t('filterInTimeline')"
        @action="emit('filter', { kind: selected.kind, year: selected.year })"
      />
    </template>

    <template #table>
      <ChartTable
        :caption="t('chartKindTitle')"
        :headers="[t('year'), t('government'), t('companies'), t('incidentsCount')]"
        :rows="tableRows"
      />
    </template>
  </ChartCard>
</template>
