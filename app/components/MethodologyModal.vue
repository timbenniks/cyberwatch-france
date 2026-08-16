<script setup lang="ts">
import { X } from '@lucide/vue'

const emit = defineEmits<{ close: [] }>()

const { data } = useCyberData()
const { locale, t, L } = useLocale()

const dialog = ref<HTMLElement | null>(null)
useScrollLock(true)
useRestoreFocus()
useFocusTrap(dialog, () => emit('close'))

onMounted(async () => {
  await nextTick()
  dialog.value?.querySelector<HTMLElement>('button')?.focus()
})
</script>

<template>
  <div class="fixed inset-0 z-50 grid place-items-center p-0 sm:p-4">
    <div class="absolute inset-0 bg-bg/80 backdrop-blur-sm" @click="emit('close')" />
    <div
      ref="dialog"
      role="dialog"
      aria-modal="true"
      :aria-label="t('methodology')"
      class="card relative max-h-[100dvh] w-full max-w-[640px] overflow-y-auto rounded-none p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:max-h-[85vh] sm:rounded sm:p-8"
    >
      <button
        type="button"
        class="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] grid h-11 w-11 place-items-center rounded border border-hairline text-ink-2 hover:text-ink sm:h-9 sm:w-9"
        :aria-label="t('close')"
        @click="emit('close')"
      >
        <X :size="15" />
      </button>

      <p class="eyebrow">{{ t('methodology') }}</p>
      <h2 class="mt-3 font-display text-2xl leading-tight text-ink">{{ data?.project.name }}</h2>

      <p class="mt-5 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(data?.project.methodology) }}</p>

      <div class="mt-6 border-t border-hairline pt-5">
        <p class="eyebrow mb-3">{{ t('scopeNote') }}</p>
        <p class="text-[0.9375rem] leading-relaxed text-ink-2">{{ L(data?.project.scope) }}</p>
      </div>

      <div class="mt-6 border-t border-hairline pt-5">
        <p class="eyebrow mb-3">{{ t('chartsTitle') }}</p>
        <ChartRulesList />
      </div>

      <p class="mt-6 border-t border-hairline pt-5 font-mono text-[0.6875rem] uppercase tracking-widest text-muted">
        {{ t('reviewedThrough') }} {{ data ? formatDate(data.project.reviewedThrough, locale) : '' }}
      </p>
    </div>
  </div>
</template>
