<script setup lang="ts">
import type { Severity } from '~/types/cyberwatch'

const props = withDefaults(defineProps<{ severity: Severity; showLabel?: boolean }>(), { showLabel: true })
const { t } = useLocale()

/** Tick count carries severity too, so the colour is never the only signal. */
const ticks: Record<Severity, number> = { critical: 3, high: 2, medium: 1, low: 1 }
const filled = computed(() => ticks[props.severity])
const isOutline = computed(() => props.severity === 'low')
const label = computed(() => t(props.severity))
const color = computed(() => `var(--color-sev-${props.severity})`)
</script>

<template>
  <span class="inline-flex items-center gap-1.5" :title="label">
    <span class="flex items-end gap-[2px]" aria-hidden="true">
      <span
        v-for="n in 3"
        :key="n"
        class="w-[3px] rounded-[1px]"
        :style="{
          height: `${4 + n * 3}px`,
          backgroundColor: n <= filled && !isOutline ? color : 'transparent',
          border: n <= filled ? `1px solid ${color}` : '1px solid var(--color-hairline-strong)',
        }"
      />
    </span>
    <span v-if="showLabel" class="eyebrow" :style="{ color }">{{ label }}</span>
    <span v-else class="sr-only">{{ label }}</span>
  </span>
</template>
