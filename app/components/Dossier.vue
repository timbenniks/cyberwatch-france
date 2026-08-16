<script setup lang="ts">
import type { IncidentKind, Severity } from '~/types/cyberwatch'

const { applyOnly } = useFilters()
useFilterQuery()
const { open } = useIncidentRoute()
const { open: methodologyOpen } = useMethodology()
const { data, largestConfirmedAffected, withoutPublishedCount } = useCyberData()
const { t, L } = useLocale()

const anssi = computed(() => data.value?.summaryStats.anssi2025)
const cnil = computed(() => data.value?.summaryStats.cnil2025)

function scrollToTimeline() {
  document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
}

function filterByKindYear(payload: { kind: IncidentKind; year: number }) {
  trackPlausibleEvent('Chart Filter', { chart: 'kind-year', kind: payload.kind, year: payload.year })
  applyOnly(payload)
  scrollToTimeline()
}

function filterBySector(sector: string) {
  trackPlausibleEvent('Chart Filter', { chart: 'sector', sector })
  applyOnly({ sector })
  scrollToTimeline()
}

function filterBySeverity(severity: Severity) {
  trackPlausibleEvent('Chart Filter', { chart: 'severity', severity })
  applyOnly({ severity })
  scrollToTimeline()
}
</script>

<template>
  <main id="content" class="relative z-10 mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 lg:px-10">
    <HeroStats @select="open" @methodology="methodologyOpen = true" />

    <div class="mt-16 sm:mt-24 lg:mt-32">
      <Timeline @open="open" />
    </div>

    <div class="mt-16 sm:mt-24 lg:mt-32 [content-visibility:auto] [contain-intrinsic-size:auto_420px]">
      <Recommendations />
    </div>

    <section id="numbers" class="mt-16 scroll-mt-24 sm:mt-24 lg:mt-32">
      <header class="mb-8 max-w-[62ch]">
        <p class="eyebrow">03 · {{ t('navNumbers') }}</p>
        <h2 class="mt-3 font-display text-3xl leading-tight text-ink sm:text-[2.5rem]">{{ t('chartsTitle') }}</h2>
        <p class="mt-4 text-base leading-relaxed text-ink-2">
          {{ t('chartsLead', { n: withoutPublishedCount.length }) }}
        </p>
      </header>

      <div class="grid gap-4 lg:grid-cols-2">
        <AffectedBar class="lg:col-span-2" @select="open" />
        <KindByYear @filter="filterByKindYear" />
        <SectorBar @filter="filterBySector" />
        <SeverityBar @filter="filterBySeverity" />
        <AnssiContext />
      </div>

      <div class="mt-12">
        <p class="eyebrow mb-8">{{ t('nationalFiguresTitle') }}</p>
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
    </section>

    <div class="mt-20 border-t border-hairline pt-16 sm:mt-24 sm:pt-20 [content-visibility:auto] [contain-intrinsic-size:auto_960px]">
      <header class="mb-10 max-w-[62ch]">
        <p class="eyebrow">{{ t('forResearchers') }}</p>
        <p class="mt-3 text-sm leading-relaxed text-ink-2">{{ t('forResearchersLead') }}</p>
      </header>
      <PatternsGrid @open="open" />
      <div class="mt-14">
        <DataExplorer />
      </div>
      <div class="mt-14">
        <SourceLedger />
      </div>
    </div>
  </main>
</template>
