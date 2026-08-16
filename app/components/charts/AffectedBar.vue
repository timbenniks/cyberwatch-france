<script setup lang="ts">
import type { ECElementEvent } from 'echarts/core'
import { barRadiusH, escapeHtml, swatch, type TooltipParam } from '~/utils/echarts'
import type { Incident } from '~/types/cyberwatch'

const emit = defineEmits<{ select: [Incident] }>()

const { incidents, withoutPublishedCount, severitiesPresent } = useCyberData()
const { locale, t } = useLocale()
const { base, theme } = useChartBase()
const narrow = useNarrowViewport()
const { inspect, selectedKey, onSelect } = useChartInspect()

/** Only confirmed incidents with a published numeric figure. Unknown and disputed claims are never plotted as 0. */
const plotted = computed(() =>
  incidents.value
    .filter((i): i is Incident & { affected: number } => i.status === 'confirmed' && typeof i.affected === 'number')
    .sort((a, b) => a.affected - b.affected),
)

const selected = computed(() => plotted.value.find((incident) => incident.id === selectedKey.value) ?? null)

const legendSeverities = computed(() => {
  const present = new Set(plotted.value.map((i) => i.severity))
  return severitiesPresent.value.filter((s) => present.has(s))
})

const option = computed(() => {
  const { chrome, severityColor, axisLabelStyle, tooltipStyle } = theme.value
  return {
    ...base.value,
    grid: { left: 4, right: narrow.value ? 56 : 80, top: 8, bottom: 4, containLabel: true },
    xAxis: {
      type: 'value',
      axisLabel: { ...axisLabelStyle, formatter: (value: number) => formatCompact(value, locale.value) },
      splitLine: { lineStyle: { color: chrome.gridline } },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'category',
      data: plotted.value.map((i) => i.org[locale.value]),
      axisLabel: {
        ...axisLabelStyle,
        color: chrome.ink2,
        fontFamily: chrome.sans,
        fontSize: narrow.value ? 11 : 12,
        width: narrow.value ? 88 : 150,
        overflow: 'truncate',
      },
      axisLine: { lineStyle: { color: chrome.axis } },
      axisTick: { show: false },
    },
    tooltip: {
      ...tooltipStyle,
      show: !inspect.value,
      trigger: 'item',
      formatter: (params: TooltipParam) => {
        const incident = plotted.value[params.dataIndex]!
        return [
          `<strong style="font-size:13px">${escapeHtml(incident.org[locale.value])}</strong>`,
          `<span style="color:${chrome.ink2};font-size:12px">${escapeHtml(formatDate(incident.date, locale.value))}</span>`,
          `<div style="margin-top:6px">${swatch(severityColor[incident.severity])}${escapeHtml(
            incident.affectedLabel[locale.value],
          )}</div>`,
        ].join('<br/>')
      },
    },
    series: [
      {
        type: 'bar',
        barMaxWidth: 18,
        cursor: 'pointer',
        itemStyle: {
          borderRadius: barRadiusH,
          color: (params: TooltipParam) => severityColor[plotted.value[params.dataIndex]!.severity],
        },
        label: {
          show: true,
          position: 'right',
          distance: 8,
          color: chrome.ink,
          fontFamily: chrome.mono,
          fontSize: narrow.value ? 10 : 11,
          formatter: (params: TooltipParam) => formatNumber(params.value, locale.value),
        },
        data: plotted.value.map((i) => i.affected),
      },
    ],
  }
})

const tableRows = computed(() =>
  [...plotted.value]
    .reverse()
    .map((i) => [i.org[locale.value], formatDate(i.date, locale.value), t(i.severity), formatNumber(i.affected, locale.value)]),
)

const note = computed(() => `${withoutPublishedCount.value.length} ${t('noCountPublished')}.`)

const selectedDetail = computed(() => {
  if (!selected.value) return ''
  return [
    formatDate(selected.value.date, locale.value),
    t(selected.value.severity),
    formatAffected(selected.value, locale.value),
  ].join(' · ')
})

function onClick(params: ECElementEvent) {
  const incident = plotted.value[params.dataIndex]
  if (incident) onSelect(incident.id, () => emit('select', incident))
}
</script>

<template>
  <ChartCard :title="t('chartAffectedTitle')" :subtitle="t('chartAffectedSub')" :note="note" interactive>
    <div class="h-[360px] w-full sm:h-[340px]">
      <AppChart :option="option" :label="t('chartAffectedTitle')" @click="onClick" />
    </div>
    <SeverityLegend class="mt-4" :severities="legendSeverities" />

    <template #readout>
      <ChartReadout
        v-if="inspect && selected"
        :title="selected.org[locale]"
        :detail="selectedDetail"
        :action-label="t('openRecord')"
        @action="emit('select', selected)"
      />
    </template>

    <template #table>
      <ChartTable
        :caption="t('chartAffectedTitle')"
        :headers="[t('organisation'), t('date'), t('severity'), t('affected')]"
        :rows="tableRows"
      />
    </template>
  </ChartCard>
</template>
