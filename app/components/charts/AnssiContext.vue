<script setup lang="ts">
import type { ECElementEvent } from 'echarts/core'
import { escapeHtml, swatch, type TooltipParam } from '~/utils/echarts'

const { data, sourceById } = useCyberData()
const { locale, t, L } = useLocale()
const { base, theme } = useChartBase()
const { inspect, selectedKey, select } = useChartInspect()

const shares = computed(() => data.value?.summaryStats.sectorDistributionPercent ?? [])
const source = computed(() => sourceById.value.get(data.value?.summaryStats.anssi2025.sourceId ?? ''))
const selected = computed(() => shares.value.find((share) => share.id === selectedKey.value) ?? null)

const option = computed(() => {
  const { chrome, seriesColors, tooltipStyle } = theme.value
  return {
    ...base.value,
    grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false },
    xAxis: { type: 'value', max: 100, show: false },
    yAxis: { type: 'category', data: [''], show: false },
    tooltip: {
      ...tooltipStyle,
      show: !inspect.value,
      trigger: 'item',
      formatter: (params: TooltipParam) =>
        `${swatch(params.color)}<strong>${escapeHtml(params.seriesName ?? '')}</strong><br/>${formatPercent(
          params.value,
          locale.value,
        )} ${escapeHtml(t('share').toLowerCase())}`,
    },
    series: shares.value.map((share, index) => ({
      name: L(share.label),
      type: 'bar',
      stack: 'anssi',
      barWidth: 44,
      cursor: 'pointer',
      itemStyle: {
        color: seriesColors[index % seriesColors.length],
        borderColor: chrome.surface,
        borderWidth: 1,
      },
      label: {
        show: share.value >= 9,
        color: chrome.onSeriesFill,
        fontFamily: chrome.mono,
        fontWeight: 500,
        fontSize: 12,
        formatter: () => `${share.value}%`,
      },
      data: [share.value],
    })),
  }
})

const tableRows = computed(() => shares.value.map((share) => [L(share.label), formatPercent(share.value, locale.value)]))

const selectedDetail = computed(() => {
  if (!selected.value) return ''
  return `${formatPercent(selected.value.value, locale.value)} ${t('share').toLowerCase()}`
})

function onClick(params: ECElementEvent) {
  const share = shares.value[typeof params.seriesIndex === 'number' ? params.seriesIndex : -1]
  if (share) select(share.id)
}
</script>

<template>
  <ChartCard
    :title="t('chartAnssiTitle')"
    :subtitle="t('chartAnssiSub')"
    context
    :source-name="source?.name"
    :source-url="source?.url"
  >
    <div class="h-[60px] w-full">
      <AppChart :option="option" :label="t('chartAnssiTitle')" @click="onClick" />
    </div>
    <ul class="mt-5 grid gap-2.5 sm:grid-cols-2">
      <li v-for="(share, index) in shares" :key="share.id" class="flex items-baseline gap-3 text-sm">
        <span
          class="h-2.5 w-2.5 shrink-0 translate-y-[1px] rounded-[2px]"
          :style="{ backgroundColor: `var(--color-series-${(index % 5) + 1})` }"
          aria-hidden="true"
        />
        <span class="text-ink">{{ L(share.label) }}</span>
        <span class="ml-auto tabular text-ink-2">{{ formatPercent(share.value, locale) }}</span>
      </li>
    </ul>

    <template #readout>
      <ChartReadout v-if="inspect && selected" :title="L(selected.label)" :detail="selectedDetail" />
    </template>

    <template #table>
      <ChartTable :caption="t('chartAnssiTitle')" :headers="[t('sector'), t('share')]" :rows="tableRows" />
    </template>
  </ChartCard>
</template>
