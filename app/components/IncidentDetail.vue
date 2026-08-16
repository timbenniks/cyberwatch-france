<script setup lang="ts">
import {
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Link2,
  Landmark,
  Printer,
  TriangleAlert,
  X,
} from '@lucide/vue'
import type { Incident } from '~/types/cyberwatch'

const props = defineProps<{ incident: Incident; hasPrevious: boolean; hasNext: boolean }>()
const emit = defineEmits<{ close: []; previous: []; next: [] }>()

const { locale, t, L, localePath } = useLocale()
const { absolute } = useSiteUrl()
const { sectorLabel } = useCyberData()

const panel = ref<HTMLElement | null>(null)
const body = ref<HTMLElement | null>(null)
const closeButton = ref<HTMLElement | null>(null)
const copied = ref(false)

useScrollLock(true)
useRestoreFocus()
useFocusTrap(panel, () => emit('close'))

const affected = computed(() => formatAffected(props.incident, locale.value))
const isUnknownCount = computed(() => props.incident.affected === null)
// Share the record in the language the reader is looking at.
const shareUrl = computed(() => absolute(localePath(`/incident/${props.incident.id}`)))

const terms = computed(() =>
  glossaryFor(
    [props.incident.data[locale.value], props.incident.method[locale.value], props.incident.risk[locale.value]].join(' '),
  ),
)

const sections = computed(() => [
  { key: 'dataAffected' as const, text: L(props.incident.data) },
  { key: 'method' as const, text: L(props.incident.method) },
  { key: 'risk' as const, text: L(props.incident.risk) },
])

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

watch(
  () => props.incident.id,
  async () => {
    await nextTick()
    body.value?.scrollTo({ top: 0 })
  },
)

onMounted(async () => {
  await nextTick()
  closeButton.value?.focus()
})
</script>

<template>
  <div class="fixed inset-0 z-50 grid sm:place-items-center sm:p-6">
    <div class="no-print absolute inset-0 bg-bg/80 backdrop-blur-sm" @click="emit('close')" />

    <article
      ref="panel"
      role="dialog"
      aria-modal="true"
      :aria-label="`${t('incidentRecord')} — ${L(incident.org)}`"
      class="card relative flex h-full max-h-none w-full max-w-none flex-col overflow-hidden rounded-none sm:h-auto sm:max-h-[min(90vh,880px)] sm:max-w-[680px] sm:rounded"
    >
      <header class="flex shrink-0 items-center gap-2 border-b border-hairline px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-7">
        <p class="eyebrow mr-auto">{{ t('incidentRecord') }}</p>
        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded border border-hairline text-ink-2 transition-colors enabled:hover:text-ink disabled:opacity-35 sm:h-9 sm:w-9"
          :disabled="!hasPrevious"
          :aria-label="t('previousIncident')"
          @click="emit('previous')"
        >
          <ChevronLeft :size="15" />
        </button>
        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded border border-hairline text-ink-2 transition-colors enabled:hover:text-ink disabled:opacity-35 sm:h-9 sm:w-9"
          :disabled="!hasNext"
          :aria-label="t('nextIncident')"
          @click="emit('next')"
        >
          <ChevronRight :size="15" />
        </button>
        <button
          ref="closeButton"
          type="button"
          class="grid h-11 w-11 place-items-center rounded border border-hairline text-ink-2 transition-colors hover:border-hairline-strong hover:text-ink sm:h-9 sm:w-9"
          :aria-label="t('close')"
          @click="emit('close')"
        >
          <X :size="15" />
        </button>
      </header>

      <div ref="body" class="overflow-y-auto px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 sm:px-7 sm:pb-8">
        <div class="flex items-start gap-4">
          <OrgLogo :org="L(incident.org)" :size="52" />
          <div class="min-w-0">
            <p class="eyebrow tabular">{{ formatDate(incident.date, locale) }}</p>
            <h2 class="mt-1.5 font-display text-2xl leading-tight text-ink sm:text-3xl">{{ L(incident.org) }}</h2>
            <p class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-ink-2">
              <component :is="incident.kind === 'government' ? Landmark : Building2" :size="13" aria-hidden="true" />
              {{ t(incident.kind === 'government' ? 'government' : 'company') }}
              <span class="text-hairline-strong" aria-hidden="true">/</span>
              {{ sectorLabel(incident.sector) }}
            </p>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <SeverityMark :severity="incident.severity" />
          <StatusStamp :status="incident.status" />
        </div>

        <div
          v-if="incident.status !== 'confirmed'"
          class="mt-6 flex gap-3 rounded border border-amber/40 bg-amber/8 p-4"
          role="note"
        >
          <TriangleAlert :size="17" class="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
          <p class="text-[0.875rem] leading-relaxed text-ink-2">
            {{ incident.status === 'disputed' ? t('disputedWarning') : t('unknownWarning') }}
          </p>
        </div>

        <section class="mt-7 border-t border-hairline pt-5">
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
        </section>

        <section v-for="section in sections" :key="section.key" class="mt-6 border-t border-hairline pt-5">
          <p class="eyebrow mb-2.5">{{ t(section.key) }}</p>
          <p class="text-[0.9375rem] leading-relaxed text-ink-2">{{ section.text }}</p>
        </section>

        <section class="mt-6 border-t border-hairline pt-5">
          <p class="eyebrow mb-2.5">{{ t('confidence') }}</p>
          <p class="text-[0.9375rem] leading-relaxed text-ink-2">{{ L(incident.confidence) }}</p>
        </section>

        <section v-if="terms.length" class="mt-6 border-t border-hairline pt-5">
          <p class="eyebrow mb-3">{{ t('whatDoesThisMean') }}</p>
          <dl class="space-y-3">
            <div v-for="term in terms" :key="term.id" class="rounded border border-hairline bg-surface-2 p-3.5">
              <dt class="font-mono text-[0.75rem] uppercase tracking-wider text-amber">{{ L(term.term) }}</dt>
              <dd class="mt-1.5 text-[0.875rem] leading-relaxed text-ink-2">{{ L(term.definition) }}</dd>
            </div>
          </dl>
        </section>

        <section class="mt-6 border-t border-hairline pt-5">
          <p class="eyebrow mb-2.5">{{ t('source') }}</p>
          <a
            :href="incident.sourceUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="link-underline inline-flex items-start gap-2 text-[0.9375rem] leading-relaxed text-ink hover:text-amber"
          >
            {{ incident.sourceName }}
            <ExternalLink :size="14" class="mt-1 shrink-0" aria-hidden="true" />
            <span class="sr-only">({{ t('opensNewTab') }})</span>
          </a>
        </section>

        <div class="no-print mt-8 flex flex-wrap gap-2 border-t border-hairline pt-5">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded border border-hairline px-3.5 py-2 text-[0.8125rem] text-ink-2 transition-colors hover:border-hairline-strong hover:text-ink"
            @click="copyLink(); trackPlausibleEvent('Copy Link', { id: incident.id })"
          >
            <component :is="copied ? Check : Link2" :size="14" aria-hidden="true" />
            {{ copied ? t('linkCopied') : t('copyLink') }}
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded border border-hairline px-3.5 py-2 text-[0.8125rem] text-ink-2 transition-colors hover:border-hairline-strong hover:text-ink"
            @click="printRecord(); trackPlausibleEvent('Print Incident', { id: incident.id })"
          >
            <Printer :size="14" aria-hidden="true" />
            {{ t('print') }}
          </button>
        </div>
      </div>
    </article>
  </div>
</template>
