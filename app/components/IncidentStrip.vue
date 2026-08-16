<script setup lang="ts">
import type { Incident } from '~/types/cyberwatch'

/**
 * The signal spine, laid flat: every tracked incident as one tick on a real
 * time axis. Tick height carries severity, position carries date.
 */
const emit = defineEmits<{ select: [Incident] }>()

const { incidents } = useCyberData()
const { locale, t, L } = useLocale()

const hovered = ref<string | null>(null)

const bounds = computed(() => {
  const times = incidents.value.map((i) => new Date(`${i.date}T00:00:00`).getTime())
  if (!times.length) return { start: 0, span: 1 }
  const start = Math.min(...times)
  const end = Math.max(...times)
  // A month of breathing room at each end so the outermost ticks aren't clipped.
  const padding = 30 * 24 * 3600 * 1000
  return { start: start - padding, span: end - start + padding * 2 }
})

const heights: Record<string, number> = { critical: 100, high: 74, medium: 52, low: 38 }

const ticks = computed(() =>
  [...incidents.value]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((incident) => ({
      incident,
      left: ((new Date(`${incident.date}T00:00:00`).getTime() - bounds.value.start) / bounds.value.span) * 100,
      height: heights[incident.severity] ?? 52,
    })),
)

/** Quarter gridlines, labelled by month — and by year where the year turns over. */
const gridlines = computed(() => {
  const marks: { left: number; label: string; major: boolean }[] = []
  const startYear = new Date(bounds.value.start).getFullYear()
  for (let year = startYear; year <= startYear + 2; year += 1) {
    for (const month of [0, 3, 6, 9]) {
      const date = new Date(year, month, 1)
      const left = ((date.getTime() - bounds.value.start) / bounds.value.span) * 100
      if (left < 0 || left > 96) continue
      const short = new Intl.DateTimeFormat(locale.value === 'fr' ? 'fr-FR' : 'en-GB', { month: 'short' }).format(date)
      marks.push({ left, label: month === 0 ? `${short} ${year}` : short, major: month === 0 })
    }
  }
  return marks
})
</script>

<template>
  <div>
    <div class="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
      <div class="min-w-[36rem] sm:min-w-0">
        <div class="relative h-[104px]">
          <div
            v-for="mark in gridlines"
            :key="`${mark.left}-${mark.label}`"
            class="absolute bottom-0 top-0 w-px"
            :class="mark.major ? 'bg-hairline-strong' : 'bg-hairline'"
            :style="{ left: `${mark.left}%` }"
          >
            <span
              class="eyebrow absolute top-full left-1.5 mt-2 whitespace-nowrap text-[0.625rem]"
              :class="mark.major ? 'text-ink-2' : ''"
              >{{ mark.label }}</span
            >
          </div>

          <button
            v-for="tick in ticks"
            :key="tick.incident.id"
            type="button"
            class="absolute bottom-0 flex w-8 -translate-x-1/2 items-end justify-center sm:w-6"
            :style="{
              left: `${tick.left}%`,
              height: `${tick.height}%`,
              opacity: hovered && hovered !== tick.incident.id ? 0.35 : 1,
            }"
            :aria-label="`${L(tick.incident.org)} — ${formatDate(tick.incident.date, locale)} — ${t(tick.incident.severity)}`"
            @mouseenter="hovered = tick.incident.id"
            @mouseleave="hovered = null"
            @focus="hovered = tick.incident.id"
            @blur="hovered = null"
            @click="emit('select', tick.incident)"
          >
            <span
              class="w-[3px] rounded-t-[2px]"
              :style="{ height: '100%', backgroundColor: `var(--color-sev-${tick.incident.severity})` }"
              aria-hidden="true"
            />
          </button>
        </div>
        <div class="h-px w-full bg-hairline-strong" />
        <div class="h-7" aria-hidden="true" />
      </div>
    </div>

    <p class="mt-2 min-h-[1.25rem] font-mono text-[0.6875rem] tracking-wide text-ink-2">
      <template v-if="hovered">
        <span class="text-ink">{{ L(ticks.find((tick) => tick.incident.id === hovered)!.incident.org) }}</span>
        <span class="text-muted">
          · {{ formatDate(ticks.find((tick) => tick.incident.id === hovered)!.incident.date, locale) }}</span
        >
      </template>
      <span v-else class="text-muted">
        <span class="uppercase">{{ incidents.length }} {{ t('incidentsCount') }}</span> · {{ t('stripHint') }}
      </span>
    </p>
  </div>
</template>
