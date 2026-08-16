<script setup lang="ts">
import { Info } from '@lucide/vue'
import type { Incident } from '~/types/cyberwatch'

const emit = defineEmits<{ select: [Incident]; methodology: [] }>()

const { data, incidents, largestConfirmedAffected } = useCyberData()
const { locale, t, L } = useLocale()

const anssi = computed(() => data.value?.summaryStats.anssi2025)
const cnil = computed(() => data.value?.summaryStats.cnil2025)
const reviewed = computed(() => (data.value ? formatDate(data.value.project.reviewedThrough, locale.value) : ''))
</script>

<template>
  <section id="overview" class="relative scroll-mt-24 pt-8 sm:pt-16 lg:pt-20">
    <div class="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
      <div>
        <p class="eyebrow">{{ t('heroEyebrow') }} · 2025—2026</p>
        <h1 class="mt-5 max-w-[19ch] font-display text-[1.875rem] leading-[1.08] text-ink sm:text-[3.25rem] lg:text-[3.75rem]">
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
      </div>

      <aside class="lg:pt-2" :aria-label="t('scopeNote')">
        <div class="card border-l-2 border-l-amber p-5 sm:p-6">
          <p class="eyebrow mb-3 text-amber">{{ t('scopeNote') }}</p>
          <p class="text-[0.9375rem] leading-relaxed text-ink-2">{{ L(data?.project.scope) }}</p>
        </div>
      </aside>
    </div>

    <!-- Signature: every tracked incident on one time axis -->
    <div class="mt-14 sm:mt-16">
      <IncidentStrip @select="emit('select', $event)" />
    </div>

    <div class="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
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
  </section>
</template>
