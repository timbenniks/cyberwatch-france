<script setup lang="ts">
import { ExternalLink } from '@lucide/vue'
import type { Source } from '~/types/cyberwatch'

const { data, incidents } = useCyberData()
const { t } = useLocale()

/** Official = a French public body, or the organisation's own disclosure. */
function isOfficial(source: Source): boolean {
  const host = new URL(source.url).hostname
  if (host.endsWith('.gouv.fr') || host.endsWith('.europa.eu')) return true
  return incidents.value.some(
    (incident) => incident.sourceId === source.id && host.includes(incident.logo.domain.split('.')[0]!),
  )
}

const entries = computed(() =>
  (data.value?.sources ?? []).map((source) => ({
    source,
    official: isOfficial(source),
    citedBy: incidents.value.filter((incident) => incident.sourceId === source.id),
  })),
)
</script>

<template>
  <section class="scroll-mt-24">
    <header class="mb-6 max-w-[62ch]">
      <h2 class="font-display text-2xl leading-tight text-ink sm:text-3xl">{{ t('sourcesTitle') }}</h2>
      <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('sourcesLead') }}</p>
    </header>

    <ul class="grid gap-px overflow-hidden rounded border border-hairline bg-hairline sm:grid-cols-2">
      <li v-for="entry in entries" :key="entry.source.id" class="bg-surface-1 p-4 sm:p-5">
        <div class="mb-2 flex items-center gap-2">
          <span
            class="rounded-[2px] border px-1.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-widest"
            :class="entry.official ? 'border-teal/50 text-teal' : 'border-hairline-strong text-muted'"
          >
            {{ entry.official ? t('officialSource') : t('pressSource') }}
          </span>
          <span v-if="entry.citedBy.length" class="eyebrow">
            {{ t('usedBy') }} {{ entry.citedBy.length }}
          </span>
        </div>
        <a
          :href="entry.source.url"
          target="_blank"
          rel="noopener noreferrer"
          class="link-underline inline-flex items-start gap-1.5 text-[0.9375rem] leading-snug text-ink hover:text-amber"
        >
          {{ entry.source.name }}
          <ExternalLink :size="13" class="mt-1 shrink-0" aria-hidden="true" />
          <span class="sr-only">({{ t('opensNewTab') }})</span>
        </a>
        <p class="mt-1.5 truncate font-mono text-[0.6875rem] text-muted">{{ entry.source.url }}</p>
      </li>
    </ul>
  </section>
</template>
