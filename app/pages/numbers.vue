<script setup lang="ts">
import type { IncidentKind, Severity } from '~/types/cyberwatch'

const { applyOnly } = useFilters()
const { open } = useIncidentRoute()
const { data, largestConfirmedAffected, withoutPublishedCount } = useCyberData()
const { locale, t, L, localePath } = useLocale()
useFilterQuery()

const anssi = computed(() => data.value?.summaryStats.anssi2025)
const cnil = computed(() => data.value?.summaryStats.cnil2025)

const { title } = usePageSeo({
  title: () => `${t('chartsTitle')} · ${t('brand')}`,
  description: () => t('chartsLead', { n: withoutPublishedCount.value.length }),
})

useDossierOgImage({
  eyebrow: t('navNumbers'),
  incidentLabel: t('incidentsCount'),
  anssiEvents: data.value
    ? formatNumber(data.value.summaryStats.anssi2025.securityEventsHandled, locale.value)
    : '',
  anssiLabel: t('statAnssiEvents'),
  reviewedLabel: t('reviewedThrough'),
  reviewedThrough: data.value ? formatDate(data.value.project.reviewedThrough, locale.value) : '',
  alt: title.value,
})

function goToIncidents(query: Record<string, string>) {
  return navigateTo({ path: localePath('/incidents'), query })
}

function filterByKindYear(payload: { kind: IncidentKind; year: number }) {
  trackPlausibleEvent('Chart Filter', { chart: 'kind-year', kind: payload.kind, year: payload.year })
  applyOnly(payload)
  void goToIncidents({ kind: payload.kind, year: String(payload.year) })
}

function filterBySector(sector: string) {
  trackPlausibleEvent('Chart Filter', { chart: 'sector', sector })
  applyOnly({ sector })
  void goToIncidents({ sector })
}

function filterBySeverity(severity: Severity) {
  trackPlausibleEvent('Chart Filter', { chart: 'severity', severity })
  applyOnly({ severity })
  void goToIncidents({ severity })
}
</script>

<template>
  <PageMain>
    <p v-if="!data" class="py-24 text-center text-ink-2" role="alert">{{ t('loadError') }}</p>
    <template v-else>
      <header class="mb-10 max-w-[62ch]">
        <p class="eyebrow">{{ t('navNumbers') }}</p>
        <h1 class="mt-3 font-display text-3xl leading-tight text-ink sm:text-[2.5rem]">{{ t('chartsTitle') }}</h1>
        <p class="mt-4 text-base leading-relaxed text-ink-2">
          {{ t('chartsLead', { n: withoutPublishedCount.length }) }}
        </p>
        <IncidentCompositionNote />
      </header>

      <aside class="mb-10 card max-w-[62ch] p-5 sm:p-6" :aria-label="t('chartsRulesTitle')">
        <p class="eyebrow">{{ t('chartsRulesTitle') }}</p>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('chartsRulesLead') }}</p>
        <ChartRulesList class="mt-4" />
      </aside>

      <div class="grid gap-4 lg:grid-cols-2">
        <AffectedBar class="lg:col-span-2" @select="open" />
        <KindByYear @filter="filterByKindYear" />
        <SectorBar @filter="filterBySector" />
        <SeverityBar @filter="filterBySeverity" />
        <AnssiContext />
      </div>

      <div class="mt-16 sm:mt-20">
        <header class="mb-8 max-w-[62ch]">
          <p class="eyebrow">{{ t('nationalFiguresTitle') }}</p>
          <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('nationalFiguresLead') }}</p>
        </header>
        <div class="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile
            v-if="anssi"
            :value="anssi.securityEventsHandled"
            :label="t('statAnssiEvents')"
            :note="t('statAnssiEventsNote')"
          />
          <StatTile
            v-if="cnil"
            :value="cnil.personalDataBreachNotifications"
            :label="t('statCnil')"
            :note="t('statCnilNote')"
          />
          <StatTile
            v-if="largestConfirmedAffected != null"
            :value="largestConfirmedAffected.affected"
            format="compact"
            :label="t('statLargest')"
            :caption="L(largestConfirmedAffected.org)"
            :note="t('statLargestNote')"
          />
          <StatTile
            v-if="anssi"
            :value="anssi.confirmedLeakRatePercent"
            format="percent"
            :label="t('statLeakRate')"
            :note="t('statLeakRateNote')"
          />
        </div>
      </div>

      <div class="mt-20 border-t border-hairline pt-16 sm:mt-24 sm:pt-20 [content-visibility:auto] [contain-intrinsic-size:auto_960px]">
        <header class="mb-10 max-w-[62ch]">
          <p class="eyebrow">{{ t('forResearchers') }}</p>
          <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('forResearchersLead') }}</p>
        </header>
        <PatternsGrid @open="open" />
        <div class="mt-14">
          <DataExplorer />
        </div>
        <div class="mt-14">
          <SourceLedger />
        </div>
      </div>
    </template>
  </PageMain>
</template>
