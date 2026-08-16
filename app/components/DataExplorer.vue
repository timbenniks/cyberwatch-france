<script setup lang="ts">
import { ArrowDown, ArrowUp, ChevronRight, Download, ExternalLink } from '@lucide/vue'
import type { Incident } from '~/types/cyberwatch'
import type { UiKey } from '~/composables/useLocale'

const { filtered } = useFilters()
const { severityOrder, sectorLabel } = useCyberData()
const { locale, t, L } = useLocale()

type SortKey = 'date' | 'org' | 'kind' | 'sector' | 'severity' | 'status' | 'affected'
const sortKey = ref<SortKey>('date')
const sortDescending = ref(true)
const expanded = ref<string | null>(null)

const columns: { key: SortKey | null; label: UiKey; className?: string }[] = [
  { key: 'date', label: 'date' },
  { key: 'org', label: 'organisation' },
  { key: 'kind', label: 'kind' },
  { key: 'sector', label: 'sector' },
  { key: 'severity', label: 'severity' },
  { key: 'status', label: 'status' },
  { key: 'affected', label: 'affected' },
  { key: null, label: 'dataColumn' },
  { key: null, label: 'method' },
  { key: null, label: 'confidence' },
  { key: null, label: 'source' },
]

function compare(a: Incident, b: Incident): number {
  switch (sortKey.value) {
    case 'severity':
      return severityOrder.value.indexOf(a.severity) - severityOrder.value.indexOf(b.severity)
    // Unknown counts sort last in both directions rather than acting as 0.
    case 'affected': {
      if (a.affected === null && b.affected === null) return 0
      if (a.affected === null) return 1
      if (b.affected === null) return -1
      return a.affected - b.affected
    }
    case 'date':
      return a.date.localeCompare(b.date)
    case 'org':
      return a.org[locale.value].localeCompare(b.org[locale.value], locale.value === 'fr' ? 'fr' : 'en')
    default:
      return String(a[sortKey.value]).localeCompare(String(b[sortKey.value]))
  }
}

const rows = computed(() => {
  const sorted = [...filtered.value].sort(compare)
  if (!sortDescending.value) return sorted
  // Nulls stay pinned to the bottom when sorting by affected.
  if (sortKey.value === 'affected') {
    const known = sorted.filter((incident) => incident.affected !== null).reverse()
    return [...known, ...sorted.filter((incident) => incident.affected === null)]
  }
  return sorted.reverse()
})

function toggleSort(key: SortKey | null) {
  if (!key) return
  if (sortKey.value === key) sortDescending.value = !sortDescending.value
  else {
    sortKey.value = key
    sortDescending.value = key === 'date' || key === 'affected'
  }
}

const sortableColumns = computed(() => columns.filter((column): column is typeof column & { key: SortKey } => column.key !== null))

function onMobileSort(event: Event) {
  const key = (event.target as HTMLSelectElement).value as SortKey
  if (sortKey.value === key) return
  sortKey.value = key
  sortDescending.value = key === 'date' || key === 'affected'
}
</script>

<template>
  <section id="data">
    <header class="mb-6 max-w-[62ch]">
      <p class="eyebrow">{{ t('navData') }}</p>
      <h2 class="mt-2 font-display text-2xl leading-tight text-ink sm:text-3xl">{{ t('dataTitle') }}</h2>
      <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('dataLead') }}</p>
    </header>

    <div class="card p-5 sm:p-6">
      <FilterBar layout="wide" />
    </div>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <p class="text-sm text-ink-2">
        <span class="tabular font-medium text-ink">{{ rows.length }}</span> {{ t('rowsShown') }}
      </p>
      <label class="flex items-center gap-2 text-sm text-ink-2 md:hidden">
        <span class="eyebrow">{{ t('sortBy') }}</span>
        <select
          class="rounded border border-hairline bg-surface-1 px-3 py-2 text-sm text-ink"
          :value="sortKey"
          @change="onMobileSort"
        >
          <option v-for="column in sortableColumns" :key="column.key" :value="column.key">{{ t(column.label) }}</option>
        </select>
      </label>
      <div class="flex w-full gap-2 sm:ml-auto sm:w-auto">
        <button
          type="button"
          class="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded border border-hairline px-3 py-2 text-[0.8125rem] text-ink-2 transition-colors hover:border-hairline-strong hover:text-ink sm:min-h-0 sm:flex-none"
          @click="exportCsv(rows, locale); trackPlausibleEvent('Download CSV')"
        >
          <Download :size="14" aria-hidden="true" />
          {{ t('downloadCsv') }}
        </button>
        <button
          type="button"
          class="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded border border-hairline px-3 py-2 text-[0.8125rem] text-ink-2 transition-colors hover:border-hairline-strong hover:text-ink sm:min-h-0 sm:flex-none"
          @click="exportJson(rows); trackPlausibleEvent('Download JSON')"
        >
          <Download :size="14" aria-hidden="true" />
          {{ t('downloadJson') }}
        </button>
      </div>
    </div>

    <ul class="mt-3 space-y-3 md:hidden">
      <li v-for="incident in rows" :key="incident.id" class="card p-4">
        <p class="eyebrow tabular">{{ formatDateShort(incident.date, locale) }}</p>
        <h3 class="mt-1 font-display text-lg leading-snug text-ink">{{ L(incident.org) }}</h3>
        <p class="mt-1 text-[0.75rem] uppercase tracking-wider text-muted">
          {{ t(incident.kind === 'government' ? 'government' : 'company') }}
          · {{ sectorLabel(incident.sector) }}
        </p>
        <div class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <SeverityMark :severity="incident.severity" />
          <StatusStamp :status="incident.status" :tilt="false" />
        </div>
        <p class="mt-3 text-sm" :class="incident.affected === null ? 'italic text-muted' : 'tabular text-ink'">
          {{ formatAffected(incident, locale) }}
        </p>
        <p class="mt-2 text-sm leading-relaxed text-ink-2" :class="expanded === incident.id ? '' : 'line-clamp-3'">
          {{ incident.data[locale] }}
        </p>
        <div class="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            class="inline-flex min-h-11 items-center gap-1 text-[0.75rem] text-amber"
            :aria-expanded="expanded === incident.id"
            @click="expanded = expanded === incident.id ? null : incident.id"
          >
            <ChevronRight :size="11" class="transition-transform" :class="expanded === incident.id ? 'rotate-90' : ''" />
            {{ expanded === incident.id ? t('collapse') : t('expand') }}
          </button>
          <a
            :href="incident.sourceUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="link-underline inline-flex min-h-11 items-center gap-1.5 text-[0.75rem] text-ink-2 hover:text-amber"
          >
            {{ incident.sourceName }}
            <ExternalLink :size="12" aria-hidden="true" />
            <span class="sr-only">({{ t('opensNewTab') }})</span>
          </a>
        </div>
        <p v-if="expanded === incident.id" class="mt-3 border-t border-hairline pt-3 text-sm leading-relaxed text-ink-2">
          {{ incident.method[locale] }}
        </p>
      </li>
      <li v-if="!rows.length" class="card p-8 text-center text-ink-2">{{ t('noResults') }}</li>
    </ul>

    <div class="card mt-3 hidden overflow-x-auto md:block">
      <table class="w-full min-w-[1100px] border-collapse text-left text-sm">
        <caption class="sr-only">
          {{
            t('dataTitle')
          }}
        </caption>
        <thead>
          <tr class="border-b border-hairline-strong">
            <th
              v-for="column in columns"
              :key="column.label"
              scope="col"
              class="whitespace-nowrap px-3 py-3 first:pl-5 last:pr-5"
              :aria-sort="
                column.key && sortKey === column.key ? (sortDescending ? 'descending' : 'ascending') : undefined
              "
            >
              <button
                v-if="column.key"
                type="button"
                class="eyebrow inline-flex items-center gap-1 transition-colors hover:text-ink"
                :class="sortKey === column.key ? 'text-amber' : ''"
                @click="toggleSort(column.key)"
              >
                {{ t(column.label) }}
                <component
                  v-if="sortKey === column.key"
                  :is="sortDescending ? ArrowDown : ArrowUp"
                  :size="11"
                  aria-hidden="true"
                />
              </button>
              <span v-else class="eyebrow">{{ t(column.label) }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="incident in rows"
            :key="incident.id"
            class="border-b border-hairline align-top last:border-0 hover:bg-surface-2/60"
          >
            <td class="whitespace-nowrap px-3 py-3.5 pl-5 tabular text-ink-2">
              {{ formatDateShort(incident.date, locale) }}
            </td>
            <td class="px-3 py-3.5 font-medium text-ink">{{ L(incident.org) }}</td>
            <td class="whitespace-nowrap px-3 py-3.5 text-ink-2">
              {{ t(incident.kind === 'government' ? 'government' : 'company') }}
            </td>
            <td class="px-3 py-3.5 text-ink-2">{{ sectorLabel(incident.sector) }}</td>
            <td class="whitespace-nowrap px-3 py-3.5"><SeverityMark :severity="incident.severity" /></td>
            <td class="whitespace-nowrap px-3 py-3.5"><StatusStamp :status="incident.status" :tilt="false" /></td>
            <td class="px-3 py-3.5" :class="incident.affected === null ? 'italic text-muted' : 'tabular text-ink'">
              {{ formatAffected(incident, locale) }}
            </td>
            <td class="min-w-[220px] px-3 py-3.5 text-ink-2">
              <p :class="expanded === incident.id ? '' : 'line-clamp-2'">{{ incident.data[locale] }}</p>
            </td>
            <td class="min-w-[220px] px-3 py-3.5 text-ink-2">
              <p :class="expanded === incident.id ? '' : 'line-clamp-2'">{{ incident.method[locale] }}</p>
              <button
                type="button"
                class="mt-1.5 inline-flex items-center gap-1 text-[0.75rem] text-amber"
                :aria-expanded="expanded === incident.id"
                @click="expanded = expanded === incident.id ? null : incident.id"
              >
                <ChevronRight :size="11" class="transition-transform" :class="expanded === incident.id ? 'rotate-90' : ''" />
                {{ expanded === incident.id ? t('collapse') : t('expand') }}
              </button>
            </td>
            <td class="min-w-[180px] px-3 py-3.5 text-ink-2">
              <p :class="expanded === incident.id ? '' : 'line-clamp-2'">{{ L(incident.confidence) }}</p>
            </td>
            <td class="min-w-[160px] px-3 py-3.5 pr-5">
              <a
                :href="incident.sourceUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="link-underline inline-flex items-start gap-1.5 text-ink-2 hover:text-amber"
              >
                {{ incident.sourceName }}
                <ExternalLink :size="12" class="mt-1 shrink-0" aria-hidden="true" />
                <span class="sr-only">({{ t('opensNewTab') }})</span>
              </a>
            </td>
          </tr>
          <tr v-if="!rows.length">
            <td :colspan="columns.length" class="px-5 py-10 text-center text-ink-2">{{ t('noResults') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
