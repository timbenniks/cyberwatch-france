<script setup lang="ts">
import { ArrowUpRight, Building2, Landmark } from '@lucide/vue'
import type { Incident } from '~/types/cyberwatch'

const props = defineProps<{ incident: Incident }>()
const emit = defineEmits<{ open: [Incident] }>()

const { locale, t, L } = useLocale()
const { sectorLabel } = useCyberData()

const affected = computed(() => formatAffected(props.incident, locale.value))
const isUnknownCount = computed(() => props.incident.affected === null)
</script>

<template>
  <button
    type="button"
    class="group card relative w-full p-5 text-left transition-colors duration-200 hover:border-hairline-strong hover:bg-surface-2"
    :aria-label="`${L(incident.org)} — ${t('openRecord')}`"
    @click="emit('open', incident)"
  >
    <div class="flex items-center gap-3">
      <p class="eyebrow min-w-0 flex-1 truncate">
        <span class="tabular">{{ formatDateShort(incident.date, locale) }}</span>
        <span class="mx-2 text-hairline-strong" aria-hidden="true">/</span>
        <span class="inline-flex items-center gap-1">
          <component :is="incident.kind === 'government' ? Landmark : Building2" :size="11" aria-hidden="true" />
          {{ t(incident.kind === 'government' ? 'government' : 'company') }}
        </span>
        <span class="mx-2 text-hairline-strong" aria-hidden="true">/</span>
        <span>{{ sectorLabel(incident.sector) }}</span>
      </p>
      <ArrowUpRight
        :size="14"
        class="shrink-0 text-muted transition-colors group-hover:text-amber"
        aria-hidden="true"
      />
    </div>

    <div class="mt-3 flex items-center gap-3">
      <OrgLogo :org="L(incident.org)" :incident="incident" :size="40" />
      <h3 class="min-w-0 font-display text-xl leading-snug text-ink group-hover:text-amber sm:text-2xl">
        {{ L(incident.org) }}
      </h3>
    </div>

    <p class="mt-3 text-sm leading-relaxed text-ink-2">{{ L(incident.detail.lead) }}</p>
    <p class="mt-1 text-sm leading-relaxed text-muted">{{ L(incident.method) }}</p>

    <div class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-hairline pt-3">
      <SeverityMark :severity="incident.severity" />
      <StatusStamp :status="incident.status" />
      <span
        :class="
          isUnknownCount
            ? 'text-[0.6875rem] italic text-muted'
            : 'font-mono text-[0.6875rem] font-medium tracking-wide text-ink tabular'
        "
      >
        {{ affected }}
      </span>
      <span class="min-w-0 basis-full truncate font-mono text-[0.6875rem] tracking-wide text-muted sm:ml-auto sm:basis-auto">
        {{ t('source') }} · {{ incident.sourceName }}
      </span>
    </div>
  </button>
</template>
