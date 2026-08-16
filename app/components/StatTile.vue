<script setup lang="ts">
const props = defineProps<{
  value: number
  label: string
  note: string
  format?: 'number' | 'compact' | 'percent'
  caption?: string
}>()

const { locale } = useLocale()
const { prefersReducedMotion } = useReducedMotion()

const shown = ref(props.value)
const formatted = computed(() => {
  const value = shown.value
  if (props.format === 'percent') return formatPercent(value, locale.value)
  if (props.format === 'compact') return formatCompact(value, locale.value)
  return formatNumber(Math.round(value), locale.value)
})

function countUp() {
  if (prefersReducedMotion.value) {
    shown.value = props.value
    return
  }
  const target = props.value
  const start = performance.now()
  const duration = 900
  shown.value = 0
  const step = (now: number) => {
    const progress = Math.min(1, (now - start) / duration)
    // easeOutCubic
    shown.value = target * (1 - Math.pow(1 - progress, 3))
    if (progress < 1) requestAnimationFrame(step)
    else shown.value = target
  }
  requestAnimationFrame(step)
}

onMounted(countUp)
watch(() => props.value, countUp)
</script>

<template>
  <div class="group relative border-t border-hairline-strong pt-4">
    <!-- Two lines reserved so the figures stay on one baseline in both languages -->
    <p class="eyebrow mb-3 min-h-[2.5em]">{{ label }}</p>
    <p class="font-display text-[2.5rem] leading-none font-light tracking-tight text-ink tabular sm:text-[3rem]">
      {{ formatted }}
    </p>
    <p v-if="caption" class="mt-2 text-sm text-ink-2">{{ caption }}</p>
    <p class="mt-1 text-[0.8125rem] leading-relaxed text-muted">{{ note }}</p>
  </div>
</template>
