<script setup lang="ts">
import type { IncidentKind, Severity } from '~/types/cyberwatch'

const { applyOnly } = useFilters()
useFilterQuery()
const { open } = useIncidentRoute()
const { open: methodologyOpen } = useMethodology()
const { t } = useLocale()

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

    <section class="mt-16 scroll-mt-24 sm:mt-24 lg:mt-32">
      <header class="mb-8 max-w-[62ch]">
        <p class="eyebrow">01 · {{ t('navOverview') }}</p>
        <h2 class="mt-3 font-display text-3xl leading-tight text-ink sm:text-[2.5rem]">{{ t('chartsTitle') }}</h2>
        <p class="mt-4 text-base leading-relaxed text-ink-2">{{ t('chartsLead') }}</p>
      </header>

      <div class="grid gap-4 lg:grid-cols-2">
        <AffectedBar class="lg:col-span-2" @select="open" />
        <KindByYear @filter="filterByKindYear" />
        <SectorBar @filter="filterBySector" />
        <SeverityBar @filter="filterBySeverity" />
        <AnssiContext />
      </div>
    </section>

    <div class="mt-16 sm:mt-24 lg:mt-32 [content-visibility:auto] [contain-intrinsic-size:auto_800px]">
      <Timeline @open="open" />
    </div>
    <div class="mt-16 sm:mt-24 lg:mt-32 [content-visibility:auto] [contain-intrinsic-size:auto_480px]">
      <PatternsGrid @open="open" />
    </div>
    <div class="mt-16 sm:mt-24 lg:mt-32 [content-visibility:auto] [contain-intrinsic-size:auto_420px]">
      <Recommendations />
    </div>
    <div class="mt-16 sm:mt-24 lg:mt-32 [content-visibility:auto] [contain-intrinsic-size:auto_640px]">
      <DataExplorer />
    </div>
    <div class="mt-20 sm:mt-24 [content-visibility:auto] [contain-intrinsic-size:auto_360px]">
      <SourceLedger />
    </div>
  </main>
</template>
