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
    class="group card relative w-full p-4 text-left transition-colors duration-200 hover:border-hairline-strong hover:bg-surface-2 sm:p-6"
    :aria-label="`${L(incident.org)} — ${t('openRecord')}`"
    @click="emit('open', incident)"
  >
    <div class="flex items-start gap-3.5">
      <OrgLogo :org="L(incident.org)" :incident="incident" :size="44" />

      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span class="eyebrow tabular">{{ formatDateShort(incident.date, locale) }}</span>
          <span class="text-hairline-strong" aria-hidden="true">/</span>
          <span class="inline-flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-wider text-ink-2">
            <component :is="incident.kind === 'government' ? Landmark : Building2" :size="12" aria-hidden="true" />
            {{ t(incident.kind === 'government' ? 'government' : 'company') }}
          </span>
          <span class="text-hairline-strong" aria-hidden="true">/</span>
          <span class="truncate text-[0.6875rem] uppercase tracking-wider text-muted">{{ sectorLabel(incident.sector) }}</span>
        </div>

        <h3 class="mt-2 font-display text-lg leading-snug text-ink group-hover:text-amber sm:text-xl">
          {{ L(incident.org) }}
        </h3>

        <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(incident.detail.lead) }}</p>
        <p class="mt-2 text-sm leading-relaxed text-muted">{{ L(incident.method) }}</p>

        <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <SeverityMark :severity="incident.severity" />
          <StatusStamp :status="incident.status" :tilt="false" />
          <span
            class="text-[0.8125rem]"
            :class="isUnknownCount ? 'italic text-muted' : 'tabular font-medium text-ink'"
          >
            {{ affected }}
          </span>
        </div>

        <p class="mt-3 truncate font-mono text-[0.6875rem] tracking-wide text-muted">
          {{ t('source') }}: {{ incident.sourceName }}
        </p>
      </div>

      <ArrowUpRight
        :size="16"
        class="mt-1 shrink-0 text-muted transition-colors group-hover:text-amber"
        aria-hidden="true"
      />
    </div>
  </button>
</template>
