<script setup lang="ts">
import { RotateCcw, Search, X } from '@lucide/vue'

/** 'rail' stacks for the narrow timeline sidebar; 'wide' spreads across a card. */
const props = withDefaults(defineProps<{ layout?: 'rail' | 'wide' }>(), { layout: 'rail' })

const { filters, matchCount, isFiltered, reset } = useFilters()
const { years, sectors, severitiesPresent, sectorLabel } = useCyberData()
const { t } = useLocale()

const quickFilters = computed(() => [
  { label: t('allIncidents'), active: !isFiltered.value, apply: reset },
  {
    label: t('government'),
    active: filters.value.kind === 'government',
    apply: () => (filters.value.kind = filters.value.kind === 'government' ? 'all' : 'government'),
  },
  {
    label: t('companies'),
    active: filters.value.kind === 'company',
    apply: () => (filters.value.kind = filters.value.kind === 'company' ? 'all' : 'company'),
  },
  {
    label: t('criticalOnly'),
    active: filters.value.severity === 'critical',
    apply: () => (filters.value.severity = filters.value.severity === 'critical' ? 'all' : 'critical'),
  },
  {
    label: t('disputed'),
    active: filters.value.status === 'disputed',
    apply: () => (filters.value.status = filters.value.status === 'disputed' ? 'all' : 'disputed'),
  },
])

/** Ids must stay unique — this bar renders in the rail, the drawer and the table. */
const uid = useId()
const fieldId = (name: string) => `${name}-${uid}`

function onYear(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  filters.value.year = value === 'all' ? 'all' : Number(value)
}

const selectClass =
  'w-full min-h-11 rounded border border-hairline bg-surface-1 px-3 py-2.5 text-sm text-ink transition-colors hover:border-hairline-strong focus-visible:border-amber sm:min-h-0 sm:py-2'
</script>

<template>
  <div class="space-y-5">
    <div class="relative">
      <Search :size="15" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
      <label :for="fieldId('search')" class="sr-only">{{ t('search') }}</label>
      <input
        :id="fieldId('search')"
        v-model="filters.query"
        type="search"
        :placeholder="t('searchPlaceholder')"
        class="w-full rounded border border-hairline bg-surface-1 py-3 pl-9 pr-9 text-sm text-ink placeholder:text-muted focus-visible:border-amber sm:py-2.5"
      />
      <button
        v-if="filters.query"
        type="button"
        class="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-muted hover:text-ink"
        :aria-label="t('clearSearch')"
        @click="filters.query = ''"
      >
        <X :size="14" />
      </button>
    </div>

    <div class="flex flex-wrap gap-2">
      <button
        v-for="quick in quickFilters"
        :key="quick.label"
        type="button"
        class="rounded-full border px-3 py-2 text-[0.8125rem] transition-colors"
        :class="
          quick.active
            ? 'border-amber bg-amber/12 text-amber'
            : 'border-hairline text-ink-2 hover:border-hairline-strong hover:text-ink'
        "
        :aria-pressed="quick.active"
        @click="quick.apply(); trackPlausibleEvent('Filter', { label: quick.label })"
      >
        {{ quick.label }}
      </button>
    </div>

    <div class="grid gap-3 sm:grid-cols-2" :class="props.layout === 'rail' ? 'lg:grid-cols-1' : 'lg:grid-cols-4'">
      <div>
        <label class="eyebrow mb-1.5 block" :for="fieldId('year')">{{ t('year') }}</label>
        <select :id="fieldId('year')" :value="filters.year" :class="selectClass" @change="onYear">
          <option value="all">{{ t('all') }}</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>

      <div>
        <label class="eyebrow mb-1.5 block" :for="fieldId('sector')">{{ t('sector') }}</label>
        <select :id="fieldId('sector')" v-model="filters.sector" :class="selectClass">
          <option value="all">{{ t('all') }}</option>
          <option v-for="sector in sectors" :key="sector" :value="sector">{{ sectorLabel(sector) }}</option>
        </select>
      </div>

      <div>
        <label class="eyebrow mb-1.5 block" :for="fieldId('severity')">{{ t('severity') }}</label>
        <select :id="fieldId('severity')" v-model="filters.severity" :class="selectClass">
          <option value="all">{{ t('all') }}</option>
          <option v-for="severity in severitiesPresent" :key="severity" :value="severity">{{ t(severity) }}</option>
        </select>
      </div>

      <div>
        <label class="eyebrow mb-1.5 block" :for="fieldId('status')">{{ t('status') }}</label>
        <select :id="fieldId('status')" v-model="filters.status" :class="selectClass">
          <option value="all">{{ t('all') }}</option>
          <option value="confirmed">{{ t('confirmed') }}</option>
          <option value="disputed">{{ t('disputed') }}</option>
          <option value="unknown">{{ t('unknown') }}</option>
        </select>
      </div>
    </div>

    <div class="flex items-center justify-between gap-3 border-t border-hairline pt-4">
      <p class="text-sm text-ink-2" aria-live="polite">
        <span class="tabular font-medium text-ink">{{ matchCount }}</span>
        {{ matchCount === 1 ? t('matchingOne') : t('matchingMany') }}
      </p>
      <button
        type="button"
        class="inline-flex items-center gap-1.5 text-[0.8125rem] transition-colors"
        :class="isFiltered ? 'text-amber hover:text-ink' : 'cursor-not-allowed text-muted'"
        :disabled="!isFiltered"
        @click="reset"
      >
        <RotateCcw :size="13" aria-hidden="true" />
        {{ t('resetFilters') }}
      </button>
    </div>
  </div>
</template>
