<script setup lang="ts">
import type { Severity } from '~/types/cyberwatch'

defineProps<{ severities: Severity[] }>()
const { t } = useLocale()
</script>

<template>
  <ul class="flex flex-wrap items-center gap-x-4 gap-y-1.5">
    <li v-for="severity in severities" :key="severity" class="flex items-center gap-1.5 text-xs text-ink-2">
      <span
        class="h-2.5 w-2.5 rounded-[2px]"
        :style="{ backgroundColor: `var(--color-sev-${severity})` }"
        aria-hidden="true"
      />
      {{ t(severity) }}
    </li>
  </ul>
</template>
