<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import type { Incident } from '~/types/cyberwatch'

const props = defineProps<{ incident: Incident }>()
const emit = defineEmits<{ open: [Incident] }>()

const { locale, t, L } = useLocale()

const affected = computed(() => formatAffected(props.incident, locale.value))
const isUnknownCount = computed(() => props.incident.affected === null)
</script>

<template>
  <button
    type="button"
    class="group card relative w-full p-4 text-left transition-colors duration-200 hover:border-hairline-strong hover:bg-surface-2 sm:p-5"
    :aria-label="`${L(incident.org)} — ${t('openRecord')}`"
    @click="emit('open', incident)"
  >
    <div class="flex items-start gap-3.5">
      <OrgLogo :org="L(incident.org)" :incident="incident" :size="40" />

      <div class="min-w-0 flex-1">
        <p class="eyebrow tabular">{{ formatDateShort(incident.date, locale) }}</p>

        <h3 class="mt-1.5 font-display text-lg leading-snug text-ink group-hover:text-amber sm:text-xl">
          {{ L(incident.org) }}
        </h3>

        <p class="mt-2 line-clamp-1 text-sm leading-relaxed text-ink-2">{{ L(incident.data) }}</p>

        <div class="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <SeverityMark :severity="incident.severity" />
          <StatusStamp :status="incident.status" :tilt="false" />
          <span
            class="text-[0.8125rem]"
            :class="isUnknownCount ? 'italic text-muted' : 'tabular font-medium text-ink'"
          >
            {{ affected }}
          </span>
        </div>
      </div>

      <ArrowUpRight
        :size="16"
        class="mt-1 shrink-0 text-muted transition-colors group-hover:text-amber"
        aria-hidden="true"
      />
    </div>
  </button>
</template>
