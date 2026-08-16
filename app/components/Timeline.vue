<script setup lang="ts">
import { SlidersHorizontal, X } from '@lucide/vue'
import type { Incident } from '~/types/cyberwatch'

const emit = defineEmits<{ open: [Incident] }>()

const { filtered, activeCount, reset, isFiltered } = useFilters()
const { locale, t } = useLocale()

const drawerOpen = ref(false)
const drawer = ref<HTMLElement | null>(null)
useScrollLock(drawerOpen)
useFocusTrap(drawer, () => (drawerOpen.value = false), drawerOpen)

watch(drawerOpen, async (open) => {
  if (!open) return
  await nextTick()
  drawer.value?.querySelector<HTMLElement>('button')?.focus()
})

/** Newest first, grouped year → month. */
const groups = computed(() => {
  const byYear = new Map<number, Map<string, Incident[]>>()
  for (const incident of filtered.value) {
    const months = byYear.get(incident.year) ?? new Map<string, Incident[]>()
    const key = monthKey(incident.date)
    months.set(key, [...(months.get(key) ?? []), incident])
    byYear.set(incident.year, months)
  }
  return [...byYear.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, months]) => ({
      year,
      months: [...months.entries()]
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(([key, incidents]) => ({ key, label: formatMonth(`${key}-01`, locale.value), incidents })),
    }))
})
</script>

<template>
  <section id="timeline" class="scroll-mt-24">
    <header class="mb-8 max-w-[62ch]">
      <p class="eyebrow">02 · {{ t('navTimeline') }}</p>
      <h2 class="mt-3 font-display text-3xl leading-tight text-ink sm:text-[2.5rem]">{{ t('timelineTitle') }}</h2>
      <p class="mt-4 text-base leading-relaxed text-ink-2">{{ t('timelineLead') }}</p>
    </header>

    <div class="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
      <aside class="no-print hidden lg:block" :aria-label="t('filters')">
        <div class="sticky top-24">
          <p class="eyebrow mb-4">{{ t('filters') }}</p>
          <FilterBar />
        </div>
      </aside>

      <!-- Mobile filter trigger -->
      <div class="no-print flex items-center justify-between gap-3 lg:hidden">
        <button
          type="button"
          class="inline-flex min-h-11 items-center gap-2 rounded border border-hairline px-3.5 py-2.5 text-sm text-ink"
          @click="drawerOpen = true"
        >
          <SlidersHorizontal :size="15" aria-hidden="true" />
          {{ t('filters') }}
          <span v-if="activeCount" class="rounded-full bg-amber px-1.5 text-[0.6875rem] font-medium text-on-amber">
            {{ activeCount }}
          </span>
        </button>
        <p class="text-sm text-ink-2" aria-live="polite">
          <span class="tabular font-medium text-ink">{{ filtered.length }}</span>
          {{ filtered.length === 1 ? t('matchingOne') : t('matchingMany') }}
        </p>
      </div>

      <div class="min-w-0">
        <div v-if="!filtered.length" class="card p-10 text-center">
          <p class="font-display text-xl text-ink">{{ t('noResults') }}</p>
          <p class="mt-2 text-sm text-ink-2">{{ t('noResultsHint') }}</p>
          <button
            v-if="isFiltered"
            type="button"
            class="link-underline mt-5 text-sm text-amber"
            @click="reset"
          >
            {{ t('resetFilters') }}
          </button>
        </div>

        <div v-for="group in groups" :key="group.year" class="mb-2">
          <div class="sticky top-14 z-10 -mx-1 bg-bg/90 px-1 py-3 backdrop-blur-sm sm:top-16">
            <div class="flex items-baseline gap-4">
              <span class="font-display text-2xl font-light text-ink tabular">{{ group.year }}</span>
              <span class="h-px flex-1 bg-hairline-strong" aria-hidden="true" />
              <span class="eyebrow"
                >{{ group.months.reduce((sum, month) => sum + month.incidents.length, 0) }}
                {{ t('incidentsCount') }}</span
              >
            </div>
          </div>

          <!-- The spine: a rail with a node per incident -->
          <div class="relative pl-6 sm:pl-8">
            <span class="absolute bottom-2 left-[3px] top-0 w-px bg-hairline" aria-hidden="true" />

            <div v-for="month in group.months" :key="month.key" class="pb-2">
              <p class="relative -ml-6 mb-3 pl-6 eyebrow sm:-ml-8 sm:pl-8">
                <span class="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-hairline-strong" aria-hidden="true" />
                {{ month.label }}
              </p>

              <ul class="space-y-3">
                <li v-for="incident in month.incidents" :key="incident.id" class="relative">
                  <span
                    class="absolute -left-6 top-6 h-[7px] w-[7px] -translate-x-1/2 rounded-full ring-4 ring-bg sm:-left-8"
                    :style="{ backgroundColor: `var(--color-sev-${incident.severity})` }"
                    aria-hidden="true"
                  />
                  <IncidentCard :incident="incident" @open="emit('open', $event)" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <EvidenceLegend class="mt-10" />
      </div>
    </div>

    <!-- Mobile filter drawer -->
    <Teleport to="body">
      <div v-if="drawerOpen" class="no-print fixed inset-0 z-50 lg:hidden">
        <div class="absolute inset-0 bg-bg/80 backdrop-blur-sm" @click="drawerOpen = false" />
        <div
          ref="drawer"
          class="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-lg border-t border-hairline-strong bg-surface-1 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
          role="dialog"
          aria-modal="true"
          :aria-label="t('filters')"
        >
          <div class="mb-5 flex items-center justify-between">
            <p class="eyebrow">{{ t('filters') }}</p>
            <button
              type="button"
              class="rounded border border-hairline p-2 text-ink-2"
              :aria-label="t('close')"
              @click="drawerOpen = false"
            >
              <X :size="16" />
            </button>
          </div>
          <FilterBar />
        </div>
      </div>
    </Teleport>
  </section>
</template>
