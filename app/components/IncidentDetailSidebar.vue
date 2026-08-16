<script setup lang="ts">
import { Check, ExternalLink, Link2, Printer } from '@lucide/vue'
import type { Incident, MethodDisclosure, SourceKind } from '~/types/cyberwatch'

const props = defineProps<{ incident: Incident }>()

const { locale, t, L, localePath } = useLocale()
const { absolute } = useSiteUrl()
const { sourceById } = useCyberData()
const { copied, announcement, copy } = useCopyFeedback()

const affected = computed(() => formatAffected(props.incident, locale.value))
const isUnknownCount = computed(() => props.incident.affected === null)
const shareUrl = computed(() => absolute(localePath(`/incident/${props.incident.id}`)))
const detail = computed(() => props.incident.detail)

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

const sourceKindLabel: Record<SourceKind, 'sourceKindPrimary' | 'sourceKindOfficial' | 'sourceKindSecondary'> = {
  primary: 'sourceKindPrimary',
  official: 'sourceKindOfficial',
  secondary: 'sourceKindSecondary',
}

function printRecord() {
  window.print()
}

async function copyLink() {
  try {
    await copy(shareUrl.value, t('linkCopied'))
    trackPlausibleEvent('Copy Link', { id: props.incident.id })
  } catch {
    /* clipboard can fail in older browsers */
  }
}
</script>

<template>
  <aside class="lg:sticky lg:top-24">
    <span class="sr-only" aria-live="polite">{{ announcement }}</span>
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
      <ul class="space-y-4">
        <li v-for="source in citedSources" :key="source.id">
          <p class="mb-1">
            <span
              class="rounded-[2px] border px-1.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-widest"
              :class="source.kind === 'secondary' ? 'border-hairline-strong text-muted' : 'border-teal/50 text-teal'"
            >
              {{ t(sourceKindLabel[source.kind]) }}
            </span>
          </p>
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
          <p class="mt-1 text-[0.75rem] text-muted">
            {{ source.publisher }}
            <template v-if="source.published">
              <span aria-hidden="true"> · </span>
              <time :datetime="source.published">{{ formatDate(source.published, locale) }}</time>
            </template>
          </p>
        </li>
      </ul>
    </section>

    <p class="mt-4 px-1 text-[0.75rem] leading-relaxed text-muted">
      {{ t('lastResearched') }}
      <time class="tabular" :datetime="incident.lastResearched">{{ formatDate(incident.lastResearched, locale) }}</time>
    </p>

    <div class="no-print mt-4 flex flex-wrap gap-2">
      <button
        type="button"
        class="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded border border-hairline px-3.5 text-[0.8125rem] text-ink-2 transition-colors hover:border-hairline-strong hover:text-ink sm:h-9"
        @click="copyLink"
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
</template>
