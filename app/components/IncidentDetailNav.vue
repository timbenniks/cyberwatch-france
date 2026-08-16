<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'

const { t, L } = useLocale()
const { previous, next, step } = useIncidentRoute()
</script>

<template>
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
</template>
