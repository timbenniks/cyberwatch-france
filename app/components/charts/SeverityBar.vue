<script setup lang="ts">
import type { ECElementEvent } from 'echarts/core'
import { chartChrome, escapeHtml, severityColor, swatch, tooltipStyle, type TooltipParam } from '~/utils/echarts'
import type { Severity } from '~/types/cyberwatch'

const emit = defineEmits<{ filter: [Severity] }>()

const { incidents, severitiesPresent } = useCyberData()
const { locale, t } = useLocale()
const { base } = useChartBase()

const counts = computed(() =>
  severitiesPresent.value.map((severity) => ({
    severity,
    count: incidents.value.filter((i) => i.severity === severity).length,
  })),
)

const total = computed(() => incidents.value.length)

const option = computed(() => ({
  ...base.value,
  grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false },
  xAxis: { type: 'value', max: total.value, show: false },
  yAxis: { type: 'category', data: [''], show: false },
  tooltip: {
    ...tooltipStyle,
    trigger: 'item',
    formatter: (params: TooltipParam) =>
      `${swatch(params.color)}<strong>${escapeHtml(params.seriesName ?? '')}</strong><br/>${params.value} / ${
        total.value
      } ${escapeHtml(t('incidentsCount'))} · ${formatPercent((params.value / total.value) * 100, locale.value)}`,
  },
  series: counts.value.map((entry) => ({
    name: t(entry.severity),
    type: 'bar',
    stack: 'severity',
    barWidth: 44,
    cursor: 'pointer',
    // 2px surface gap between adjacent fills.
    itemStyle: {
      color: severityColor[entry.severity],
      borderColor: chartChrome.surface,
      borderWidth: 1,
    },
    label: {
      show: true,
      color: '#0c1220',
      fontFamily: chartChrome.mono,
      fontWeight: 500,
      fontSize: 12,
      formatter: () => String(entry.count),
    },
    data: [entry.count],
  })),
}))

const tableRows = computed(() =>
  counts.value.map((entry) => [
    t(entry.severity),
    entry.count,
    formatPercent((entry.count / total.value) * 100, locale.value),
  ]),
)

function onClick(params: ECElementEvent) {
  const entry = counts.value.find((candidate) => t(candidate.severity) === params.seriesName)
  if (entry) emit('filter', entry.severity)
}
</script>

<template>
  <ChartCard :title="t('chartSeverityTitle')" interactive>
    <div class="h-[60px] w-full">
      <AppChart :option="option" :label="t('chartSeverityTitle')" @click="onClick" />
    </div>
    <ul class="mt-5 space-y-2.5">
      <li v-for="entry in counts" :key="entry.severity" class="flex items-baseline gap-3 text-sm">
        <span
          class="h-2.5 w-2.5 shrink-0 translate-y-[1px] rounded-[2px]"
          :style="{ backgroundColor: severityColor[entry.severity] }"
          aria-hidden="true"
        />
        <span class="text-ink">{{ t(entry.severity) }}</span>
        <span class="ml-auto tabular text-ink-2"
          >{{ entry.count }}
          <span class="text-muted">· {{ formatPercent((entry.count / total) * 100, locale) }}</span></span
        >
      </li>
    </ul>

    <template #table>
      <ChartTable :caption="t('chartSeverityTitle')" :headers="[t('severity'), t('count'), t('share')]" :rows="tableRows" />
    </template>
  </ChartCard>
</template>
