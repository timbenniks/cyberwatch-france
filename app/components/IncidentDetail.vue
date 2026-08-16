<script setup lang="ts">
import {
  ArrowLeft,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Landmark,
  Link2,
  Printer,
  TriangleAlert,
} from '@lucide/vue'
import type { Incident, MethodDisclosure } from '~/types/cyberwatch'

const props = defineProps<{ incident: Incident }>()

const { locale, t, L, localePath } = useLocale()
const { absolute } = useSiteUrl()
const { sectorLabel, sourceById } = useCyberData()
const { previous, next, step } = useIncidentRoute()

const copied = ref(false)
const affected = computed(() => formatAffected(props.incident, locale.value))
const isUnknownCount = computed(() => props.incident.affected === null)
const shareUrl = computed(() => absolute(localePath(`/incident/${props.incident.id}`)))
const detail = computed(() => props.incident.detail)

const terms = computed(() =>
  glossaryFor(
    [
      L(detail.value.lead),
      L(detail.value.how),
      L(detail.value.taken),
      L(detail.value.notTaken),
      L(props.incident.risk),
      L(detail.value.response),
      L(detail.value.attackerClaim),
    ].join(' '),
  ),
)

const citedSources = computed(() =>
  (props.incident.sourceIds ?? [props.incident.sourceId])
    .map((id) => sourceById.value.get(id))
    .filter((source): source is NonNullable<typeof source> => Boolean(source)),
)

const disclosureLabel: Record<MethodDisclosure, 'methodDisclosed' | 'methodPartial' | 'methodUndisclosed'> = {
  disclosed: 'methodDisclosed',
  partial: 'methodPartial',
  undisclosed: 'methodUndisclosed',
}

const disclosureStamp: Record<MethodDisclosure, string> = {
  disclosed: 'stamp stamp-confirmed',
  partial: 'stamp stamp-disputed',
  undisclosed: 'stamp stamp-unknown',
}

function printRecord() {
  window.print()
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(shareUrl.value)
    copied.value = true
    window.setTimeout(() => (copied.value = false), 2000)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <article>
    <p class="no-print">
      <NuxtLink
        :to="localePath('/')"
        class="link-underline inline-flex items-center gap-2 text-sm text-ink-2 hover:text-amber"
        @click="trackPlausibleEvent('Close Incident')"
      >
        <ArrowLeft :size="14" aria-hidden="true" />
        {{ t('backToDossier') }}
      </NuxtLink>
    </p>

    <header class="mt-8 flex items-start gap-5 sm:gap-6">
      <OrgLogo :org="L(incident.org)" :incident="incident" :size="88" />
      <div class="min-w-0 pt-0.5">
        <p class="eyebrow tabular">{{ formatDate(incident.date, locale) }}</p>
        <h1 class="mt-1.5 font-display text-[1.75rem] leading-[1.12] text-ink sm:text-4xl lg:text-[2.75rem]">
          {{ L(incident.org) }}
        </h1>
        <p class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-ink-2">
          <component :is="incident.kind === 'government' ? Landmark : Building2" :size="13" aria-hidden="true" />
          {{ t(incident.kind === 'government' ? 'government' : 'company') }}
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

    <div class="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-16">
      <div>
        <p class="max-w-[62ch] text-base leading-relaxed text-ink-2 sm:text-lg">{{ L(detail.lead) }}</p>

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
          <p class="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2">{{ L(detail.how) }}</p>
        </section>

        <section class="mt-12 border-t border-hairline pt-8">
          <h2 class="font-display text-2xl leading-tight text-ink">{{ t('whatWasTaken') }}</h2>
          <p class="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2">{{ L(detail.taken) }}</p>
        </section>

        <section class="mt-12 border-t border-hairline pt-8">
          <h2 class="font-display text-2xl leading-tight text-ink">{{ t('whatWasNotTaken') }}</h2>
          <p class="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2">{{ L(detail.notTaken) }}</p>
        </section>

        <section class="mt-12 border-t border-hairline pt-8">
          <h2 class="font-display text-2xl leading-tight text-ink">{{ t('risk') }}</h2>
          <p class="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2">{{ L(incident.risk) }}</p>
        </section>

        <section class="mt-12 border-t border-hairline pt-8">
          <h2 class="font-display text-2xl leading-tight text-ink">{{ t('officialResponse') }}</h2>
          <p class="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2">{{ L(detail.response) }}</p>
        </section>

        <section
          v-if="detail.attackerClaim"
          class="mt-12 flex gap-3 rounded border border-dashed border-amber/50 bg-amber/8 p-5"
          role="note"
        >
          <TriangleAlert :size="17" class="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
          <div>
            <p class="eyebrow text-amber">{{ t('attackerClaim') }}</p>
            <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(detail.attackerClaim) }}</p>
          </div>
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

      <aside class="lg:sticky lg:top-24">
        <div class="rounded border border-hairline bg-surface-1 p-5 sm:p-6">
          <p class="eyebrow mb-2">{{ t('affected') }}</p>
          <p
            class="font-display leading-snug"
            :class="isUnknownCount ? 'text-lg italic text-ink-2' : 'text-3xl text-ink tabular'"
          >
            {{ affected }}
          </p>
          <p v-if="!isUnknownCount" class="mt-2 text-sm leading-relaxed text-muted">
            {{ L(incident.affectedLabel) }}
          </p>
        </div>

        <div class="mt-4 rounded border border-hairline bg-surface-1 p-5 sm:p-6">
          <p class="eyebrow mb-3">{{ t('methodDisclosure') }}</p>
          <span :class="disclosureStamp[detail.methodDisclosure]">
            {{ t(disclosureLabel[detail.methodDisclosure]) }}
          </span>
        </div>

        <div class="mt-4 rounded border border-hairline bg-surface-1 p-5 sm:p-6">
          <p class="eyebrow mb-2.5">{{ t('confidence') }}</p>
          <p class="text-[0.875rem] leading-relaxed text-ink-2">{{ L(incident.confidence) }}</p>
        </div>

        <section class="mt-4 rounded border border-hairline bg-surface-1 p-5 sm:p-6">
          <h2 class="eyebrow mb-3">{{ t('citedSources') }}</h2>
          <ul class="space-y-3">
            <li v-for="source in citedSources" :key="source.id">
              <a
                :href="source.url"
                target="_blank"
                rel="noopener noreferrer"
                class="link-underline inline-flex items-start gap-2 text-[0.8125rem] leading-relaxed text-ink hover:text-amber"
              >
                {{ source.name }}
                <ExternalLink :size="13" class="mt-0.5 shrink-0" aria-hidden="true" />
                <span class="sr-only">({{ t('opensNewTab') }})</span>
              </a>
            </li>
          </ul>
        </section>

        <div class="no-print mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            class="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded border border-hairline px-3.5 text-[0.8125rem] text-ink-2 transition-colors hover:border-hairline-strong hover:text-ink sm:h-9"
            @click="copyLink(); trackPlausibleEvent('Copy Link', { id: incident.id })"
          >
            <component :is="copied ? Check : Link2" :size="14" aria-hidden="true" />
            {{ copied ? t('linkCopied') : t('copyLink') }}
          </button>
          <button
            type="button"
            class="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded border border-hairline px-3.5 text-[0.8125rem] text-ink-2 transition-colors hover:border-hairline-strong hover:text-ink sm:h-9"
            @click="printRecord(); trackPlausibleEvent('Print Incident', { id: incident.id })"
          >
            <Printer :size="14" aria-hidden="true" />
            {{ t('print') }}
          </button>
        </div>
      </aside>
    </div>

    <div class="no-print mt-14 flex flex-wrap items-center gap-2 border-t border-hairline pt-6">
      <button
        type="button"
        class="inline-flex h-11 items-center gap-2 rounded border border-hairline px-3.5 text-[0.8125rem] text-ink-2 transition-colors hover:border-hairline-strong hover:text-ink sm:h-9"
        :disabled="!previous"
        :aria-label="t('previousIncident')"
        @click="step(-1)"
      >
        <ChevronLeft :size="15" />
        <span class="hidden sm:inline">{{ previous ? L(previous.org) : t('previousIncident') }}</span>
      </button>
      <button
        type="button"
        class="inline-flex h-11 items-center gap-2 rounded border border-hairline px-3.5 text-[0.8125rem] text-ink-2 transition-colors hover:border-hairline-strong hover:text-ink sm:h-9"
        :disabled="!next"
        :aria-label="t('nextIncident')"
        @click="step(1)"
      >
        <span class="hidden sm:inline">{{ next ? L(next.org) : t('nextIncident') }}</span>
        <ChevronRight :size="15" />
      </button>
    </div>
  </article>
</template>
