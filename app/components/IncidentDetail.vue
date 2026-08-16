<script setup lang="ts">
import { ArrowLeft, Building2, Landmark, TriangleAlert } from '@lucide/vue'
import type { Incident, IncidentQuote } from '~/types/cyberwatch'

const props = defineProps<{ incident: Incident }>()

const { locale, t, L, localePath } = useLocale()
const { sectorLabel } = useCyberData()

const detail = computed(() => props.incident.detail)

const terms = computed(() =>
  glossaryFor(
    [
      L(detail.value.lead),
      L(detail.value.how),
      L(detail.value.taken),
      L(detail.value.notTaken),
      L(detail.value.impact),
      L(props.incident.risk),
      L(detail.value.response),
      L(detail.value.revision),
      L(detail.value.attackerClaim),
      ...(detail.value.quotes ?? []).flatMap((quote) => [quote.original, quote.translation]),
    ].join(' '),
  ),
)

function quoteMain(quote: IncidentQuote): string {
  return locale.value === quote.originalLang ? quote.original : quote.translation
}

function quoteOriginal(quote: IncidentQuote): string | null {
  return locale.value === quote.originalLang ? null : quote.original
}

</script>

<template>
  <article>
    <p class="no-print">
      <NuxtLink
        :to="localePath('/incidents')"
        class="link-underline inline-flex items-center gap-2 text-sm text-ink-2 hover:text-amber"
        @click="trackPlausibleEvent('Close Incident')"
      >
        <ArrowLeft :size="14" aria-hidden="true" />
        {{ t('backToDossier') }}
      </NuxtLink>
    </p>

    <div class="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-16">
      <div>
        <header class="grid grid-cols-[auto_minmax(0,1fr)] items-stretch gap-5 sm:gap-6">
          <div class="aspect-square h-0 min-h-full">
            <OrgLogo class="h-full w-full" :org="L(incident.org)" :incident="incident" :size="88" stretch />
          </div>
          <div class="min-w-0">
            <p class="eyebrow tabular">{{ formatDate(incident.date, locale) }}</p>
            <h1 class="mt-1.5 font-display text-[1.75rem] leading-[1.12] text-ink sm:text-4xl lg:text-[2.75rem]">
              {{ L(incident.org) }}
            </h1>
            <p class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-ink-2">
              <component :is="incident.kind === 'government' ? Landmark : Building2" :size="13" aria-hidden="true" />
              {{ t(kindLabelKey(incident.kind)) }}
              <span class="text-hairline-strong" aria-hidden="true">/</span>
              {{ sectorLabel(incident.sector) }}
            </p>
            <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <SeverityMark :severity="incident.severity" />
              <StatusStamp :status="incident.status" />
            </div>
          </div>
        </header>

        <div
          v-if="incident.status !== 'confirmed'"
          class="mt-8 flex gap-3 rounded border border-amber/40 bg-amber/8 p-4"
          role="note"
        >
          <TriangleAlert :size="17" class="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
          <p class="text-[0.875rem] leading-relaxed text-ink-2">
            {{ incident.status === 'disputed' ? t('disputedWarning') : t('unknownWarning') }}
          </p>
        </div>

        <div class="mt-10 max-w-[62ch]">
          <p
            v-for="(paragraph, index) in proseParagraphs(L(detail.lead))"
            :key="`lead-${index}`"
            class="text-base leading-relaxed text-ink-2 sm:text-lg"
            :class="index ? 'mt-4' : undefined"
          >
            {{ paragraph }}
          </p>
        </div>

        <section
          v-if="detail.timeline.length"
          class="mt-12 border-t border-hairline pt-8"
          :aria-labelledby="`timeline-${incident.id}`"
        >
          <h2 :id="`timeline-${incident.id}`" class="font-display text-2xl leading-tight text-ink">
            {{ t('recordTimeline') }}
          </h2>
          <ol class="mt-5 space-y-4">
            <li
              v-for="entry in detail.timeline"
              :key="`${entry.date}-${entry.label.en}`"
              class="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
            >
              <time class="eyebrow tabular text-amber" :datetime="entry.date">{{ formatDate(entry.date, locale) }}</time>
              <p class="text-[0.9375rem] leading-relaxed text-ink-2">{{ L(entry.label) }}</p>
            </li>
          </ol>
        </section>

        <section class="mt-12 border-t border-hairline pt-8">
          <h2 class="font-display text-2xl leading-tight text-ink">{{ t('howItHappened') }}</h2>
          <p
            v-for="(paragraph, index) in proseParagraphs(L(detail.how))"
            :key="`how-${index}`"
            class="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2"
          >
            {{ paragraph }}
          </p>
        </section>

        <section class="mt-12 border-t border-hairline pt-8">
          <h2 class="font-display text-2xl leading-tight text-ink">{{ t('whatWasTaken') }}</h2>
          <p
            v-for="(paragraph, index) in proseParagraphs(L(detail.taken))"
            :key="`taken-${index}`"
            class="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2"
          >
            {{ paragraph }}
          </p>
        </section>

        <section class="mt-12 border-t border-hairline pt-8">
          <h2 class="font-display text-2xl leading-tight text-ink">{{ t('whatWasNotTaken') }}</h2>
          <p
            v-for="(paragraph, index) in proseParagraphs(L(detail.notTaken))"
            :key="`notTaken-${index}`"
            class="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2"
          >
            {{ paragraph }}
          </p>
        </section>

        <section class="mt-12 border-t border-hairline pt-8">
          <h2 class="font-display text-2xl leading-tight text-ink">{{ t('operationalImpact') }}</h2>
          <p
            v-for="(paragraph, index) in proseParagraphs(L(detail.impact))"
            :key="`impact-${index}`"
            class="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2"
          >
            {{ paragraph }}
          </p>
        </section>

        <section
          v-if="detail.attackerClaim"
          class="mt-12 flex gap-3 rounded border border-dashed border-amber/50 bg-amber/8 p-5"
          role="note"
        >
          <TriangleAlert :size="17" class="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
          <div>
            <p class="eyebrow text-amber">{{ t('attackerClaim') }}</p>
            <p
              v-for="(paragraph, index) in proseParagraphs(L(detail.attackerClaim))"
              :key="`claim-${index}`"
              class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2"
            >
              {{ paragraph }}
            </p>
          </div>
        </section>

        <section class="mt-12 border-t border-hairline pt-8">
          <h2 class="font-display text-2xl leading-tight text-ink">{{ t('officialResponse') }}</h2>
          <p
            v-for="(paragraph, index) in proseParagraphs(L(detail.response))"
            :key="`response-${index}`"
            class="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2"
          >
            {{ paragraph }}
          </p>
        </section>

        <section v-if="detail.revision" class="mt-12 border-t border-hairline pt-8">
          <h2 class="font-display text-2xl leading-tight text-ink">{{ t('laterRevision') }}</h2>
          <p
            v-for="(paragraph, index) in proseParagraphs(L(detail.revision))"
            :key="`revision-${index}`"
            class="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2"
          >
            {{ paragraph }}
          </p>
        </section>

        <section v-if="detail.quotes?.length" class="mt-12 border-t border-hairline pt-8">
          <h2 class="font-display text-2xl leading-tight text-ink">{{ t('pressQuotes') }}</h2>
          <ul class="mt-5 space-y-6">
            <li v-for="(quote, index) in detail.quotes" :key="`${quote.sourceId}-${index}`" class="max-w-[62ch]">
              <blockquote class="border-l-2 border-amber/60 pl-4">
                <p class="text-[0.9375rem] leading-relaxed text-ink">{{ quoteMain(quote) }}</p>
                <p v-if="quoteOriginal(quote)" class="mt-2 text-[0.8125rem] leading-relaxed text-muted">
                  <span class="font-mono text-[0.6875rem] uppercase tracking-widest">{{ t('quoteOriginal') }}</span>
                  {{ quoteOriginal(quote) }}
                </p>
              </blockquote>
              <p class="mt-2 text-[0.8125rem] text-ink-2">{{ L(quote.attribution) }}</p>
            </li>
          </ul>
        </section>

        <section v-if="terms.length" class="mt-12 border-t border-hairline pt-8">
          <h2 class="font-display text-2xl leading-tight text-ink">{{ t('whatDoesThisMean') }}</h2>
          <dl class="mt-5 grid gap-3 sm:grid-cols-2">
            <div v-for="term in terms" :key="term.id" class="rounded border border-hairline bg-surface-2 p-3.5">
              <dt class="font-mono text-[0.75rem] uppercase tracking-wider text-amber">{{ L(term.term) }}</dt>
              <dd class="mt-1.5 text-[0.875rem] leading-relaxed text-ink-2">{{ L(term.definition) }}</dd>
            </div>
          </dl>
        </section>
      </div>

      <IncidentDetailSidebar :incident="incident" />
    </div>

    <IncidentDetailNav />
  </article>
</template>
