<script setup lang="ts">
import type { ECElementEvent, EChartsCoreOption } from 'echarts/core'

/**
 * ECharts is ~200 kB gzip. Load it only when a chart is about to enter the
 * viewport so first paint is not paying for plots below the fold.
 */
const VChart = defineAsyncComponent(async () => {
  await import('~/utils/echarts-register')
  const { default: chart } = await import('vue-echarts')
  return chart
})

defineProps<{
  option: EChartsCoreOption
  label: string
}>()

const emit = defineEmits<{ click: [ECElementEvent] }>()

const root = ref<HTMLElement | null>(null)
const ready = ref(false)

onMounted(() => {
  const node = root.value
  if (!node || typeof IntersectionObserver === 'undefined') {
    ready.value = true
    return
  }
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      ready.value = true
      observer.disconnect()
    },
    { rootMargin: '280px' },
  )
  observer.observe(node)
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <div ref="root" class="h-full w-full">
    <ClientOnly>
      <VChart
        v-if="ready"
        :option="option"
        autoresize
        class="h-full w-full"
        role="img"
        :aria-label="label"
        @click="emit('click', $event)"
      />
      <div v-else class="h-full w-full rounded-sm bg-surface-2/40" aria-hidden="true" />
      <template #fallback>
        <div class="h-full w-full rounded-sm bg-surface-2/40" aria-hidden="true" />
      </template>
    </ClientOnly>
  </div>
</template>
