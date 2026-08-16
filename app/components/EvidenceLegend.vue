<script setup lang="ts">
import type { IncidentStatus } from '~/types/cyberwatch'
import type { UiKey } from '~/composables/useLocale'

const { t } = useLocale()

const entries: { status: IncidentStatus; key: UiKey }[] = [
  { status: 'confirmed', key: 'legendConfirmed' },
  { status: 'disputed', key: 'legendDisputed' },
  { status: 'unknown', key: 'legendUnknown' },
]
</script>

<template>
  <aside class="card p-5 sm:p-6" :aria-label="t('legendTitle')">
    <p class="eyebrow mb-4">{{ t('legendTitle') }}</p>
    <dl class="grid gap-4 sm:grid-cols-3">
      <div v-for="entry in entries" :key="entry.status">
        <dt class="mb-2">
          <StatusStamp :status="entry.status" />
        </dt>
        <dd class="text-[0.8125rem] leading-relaxed text-ink-2">{{ t(entry.key) }}</dd>
      </div>
    </dl>
  </aside>
</template>
