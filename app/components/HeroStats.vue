<script setup lang="ts">
import { ArrowUpRight, Info } from '@lucide/vue'
import type { Incident } from '~/types/cyberwatch'

const emit = defineEmits<{ select: [Incident]; methodology: [] }>()

const { data, incidents } = useCyberData()
const { locale, t, L, localePath } = useLocale()

const reviewed = computed(() => (data.value ? formatDate(data.value.project.reviewedThrough, locale.value) : ''))
const latest = computed(() => incidents.value[0] ?? null)

function open(incident: Incident) {
  emit('select', incident)
}
</script>

<template>
  <section class="relative">
    <div class="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:gap-16">
      <div>
        <p class="eyebrow">{{ t('heroEyebrow') }} · 2025—2026</p>
        <h1 class="mt-5 max-w-[22ch] font-display text-[1.875rem] leading-[1.08] text-ink sm:text-[3.25rem] lg:text-[3.5rem]">
          {{ t('heroTitle') }}
        </h1>
        <p class="mt-6 max-w-[62ch] text-base leading-relaxed text-ink-2 sm:text-lg">{{ t('heroLead', { n: incidents.length }) }}</p>

        <div class="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <p class="inline-flex items-center gap-2 rounded-full border border-hairline-strong px-3.5 py-1.5">
            <span class="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
            <span class="font-mono text-[0.6875rem] tracking-widest uppercase text-ink-2">
              {{ t('reviewedThrough') }} {{ reviewed }}
            </span>
          </p>
          <button
            type="button"
            class="link-underline inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-amber"
            @click="emit('methodology'); trackPlausibleEvent('Open Methodology')"
          >
            <Info :size="14" aria-hidden="true" />
            {{ t('readMethodology') }}
          </button>
        </div>

        <p class="mt-6 max-w-[62ch] text-sm leading-relaxed text-muted">
          <span class="eyebrow mr-2 text-muted">{{ t('scopeNote') }}</span>
          {{ L(data?.project.scope) }}
        </p>
      </div>

      <aside v-if="latest" class="lg:pt-2" :aria-label="t('heroLatest')">
        <p class="eyebrow mb-3">{{ t('heroLatest') }}</p>
        <button
          type="button"
          class="group card w-full border-l-2 border-l-amber p-5 text-left transition-colors hover:border-hairline-strong hover:bg-surface-2 sm:p-6"
          :aria-label="`${L(latest.org)} — ${t('openRecord')}`"
          @click="open(latest)"
        >
          <div class="flex items-start gap-3.5">
            <OrgLogo :org="L(latest.org)" :incident="latest" :size="44" />
            <div class="min-w-0 flex-1">
              <p class="eyebrow tabular">{{ formatDate(latest.date, locale) }}</p>
              <h2 class="mt-1.5 font-display text-xl leading-snug text-ink group-hover:text-amber sm:text-2xl">
                {{ L(latest.org) }}
              </h2>
            </div>
          </div>
          <p class="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(latest.detail.lead) }}</p>
          <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <SeverityMark :severity="latest.severity" />
            <StatusStamp :status="latest.status" />
            <span
              class="text-[0.8125rem]"
              :class="latest.affected === null ? 'italic text-muted' : 'tabular font-medium text-ink'"
            >
              {{ formatAffected(latest, locale) }}
            </span>
          </div>
          <p class="mt-5 inline-flex items-center gap-1.5 text-sm text-amber">
            {{ t('openRecord') }}
            <ArrowUpRight :size="14" aria-hidden="true" />
          </p>
        </button>

        <NuxtLink
          :to="localePath('/incidents')"
          class="link-underline mt-4 inline-flex text-sm text-ink-2 hover:text-amber"
          @click="trackPlausibleEvent('Nav', { section: '/incidents' })"
        >
          {{ t('seeAllIncidents', { n: incidents.length }) }}
        </NuxtLink>
      </aside>
    </div>
  </section>
</template>
