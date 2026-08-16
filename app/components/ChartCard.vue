<script setup lang="ts">
import { ChevronDown, ExternalLink } from '@lucide/vue'

defineProps<{
  title: string
  subtitle?: string
  note?: string
  context?: boolean
  sourceName?: string
  sourceUrl?: string
  interactive?: boolean
}>()

const { t } = useLocale()
const inspect = useCoarsePointer()
const tableOpen = ref(false)

onMounted(() => {
  if (window.matchMedia('(max-width: 639px)').matches) tableOpen.value = true
})

function toggleTable() {
  tableOpen.value = !tableOpen.value
  trackPlausibleEvent('Chart Table', { open: tableOpen.value ? 'show' : 'hide' })
}
</script>

<template>
  <figure
    class="card flex flex-col p-5 sm:p-6"
    :class="context ? 'border-dashed border-hairline-strong bg-surface-2/60' : ''"
  >
    <figcaption class="mb-5">
      <p v-if="context" class="eyebrow mb-2 text-amber">{{ t('contextBadge') }}</p>
      <h3 class="font-display text-xl leading-snug text-ink sm:text-[1.375rem]">{{ title }}</h3>
      <p v-if="subtitle" class="mt-1.5 text-sm text-muted">{{ subtitle }}</p>
    </figcaption>

    <div class="min-w-0 flex-1">
      <slot />
    </div>

    <slot name="readout" />

    <p v-if="note" class="mt-4 border-l-2 border-hairline-strong pl-3 text-[0.8125rem] leading-relaxed text-muted">
      {{ note }}
    </p>

    <div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hairline pt-3">
      <button
        type="button"
        class="inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-2 transition-colors hover:text-amber"
        :aria-expanded="tableOpen"
        @click="toggleTable"
      >
        <ChevronDown :size="14" class="transition-transform" :class="tableOpen ? 'rotate-180' : ''" />
        {{ tableOpen ? t('hideTable') : t('showTable') }}
      </button>
      <p v-if="interactive" class="eyebrow">{{ inspect ? t('tapToInspect') : t('clickToFilter') }}</p>
      <a
        v-if="sourceUrl"
        :href="sourceUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="link-underline ml-auto inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-2 hover:text-amber"
      >
        {{ sourceName }}
        <ExternalLink :size="13" aria-hidden="true" />
        <span class="sr-only">({{ t('opensNewTab') }})</span>
      </a>
    </div>

    <div v-if="tableOpen" class="mt-3 overflow-x-auto">
      <slot name="table" />
    </div>
  </figure>
</template>
