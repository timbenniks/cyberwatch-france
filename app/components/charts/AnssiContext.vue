<script setup lang="ts">
import { chartChrome, escapeHtml, seriesColors, swatch, tooltipStyle, type TooltipParam } from '~/utils/echarts'

const { data, sourceById } = useCyberData()
const { locale, t, L } = useLocale()
const { base } = useChartBase()

const shares = computed(() => data.value?.summaryStats.sectorDistributionPercent ?? [])
const source = computed(() => sourceById.value.get(data.value?.summaryStats.anssi2025.sourceId ?? ''))

const option = computed(() => ({
  ...base.value,
  grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false },
  xAxis: { type: 'value', max: 100, show: false },
  yAxis: { type: 'category', data: [''], show: false },
  tooltip: {
    ...tooltipStyle,
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
    itemStyle: {
      color: seriesColors[index % seriesColors.length],
      borderColor: chartChrome.surface,
      borderWidth: 1,
    },
    label: {
      show: share.value >= 9,
      color: '#0b1220',
      fontFamily: chartChrome.mono,
      fontWeight: 500,
      fontSize: 12,
      formatter: () => `${share.value}%`,
    },
    data: [share.value],
  })),
}))

const tableRows = computed(() => shares.value.map((share) => [L(share.label), formatPercent(share.value, locale.value)]))
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
      <AppChart :option="option" :label="t('chartAnssiTitle')" />
    </div>
    <ul class="mt-5 grid gap-2.5 sm:grid-cols-2">
      <li v-for="(share, index) in shares" :key="share.id" class="flex items-baseline gap-3 text-sm">
        <span
          class="h-2.5 w-2.5 shrink-0 translate-y-[1px] rounded-[2px]"
          :style="{ backgroundColor: seriesColors[index % seriesColors.length] }"
          aria-hidden="true"
        />
        <span class="text-ink">{{ L(share.label) }}</span>
        <span class="ml-auto tabular text-ink-2">{{ formatPercent(share.value, locale) }}</span>
      </li>
    </ul>

    <template #table>
      <ChartTable :caption="t('chartAnssiTitle')" :headers="[t('sector'), t('share')]" :rows="tableRows" />
    </template>
  </ChartCard>
</template>
