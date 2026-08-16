<script setup lang="ts">
import { Building2, Info, Users } from '@lucide/vue'

const { data } = useCyberData()
const { t, L, localePath } = useLocale()

const tabs = ['organizations', 'public'] as const
type Tab = (typeof tabs)[number]

const tab = ref<Tab>('organizations')
const items = computed(() => data.value?.recommendations[tab.value] ?? [])

function onTabKey(event: KeyboardEvent, option: Tab) {
  const index = tabs.indexOf(option)
  const delta = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0
  if (!delta) return
  event.preventDefault()
  const next = tabs[(index + delta + tabs.length) % tabs.length]!
  tab.value = next
  document.getElementById(`guidance-tab-${next}`)?.focus()
}
</script>

<template>
  <section id="guidance" class="scroll-mt-24">
    <header class="mb-8 max-w-[62ch]">
      <p class="eyebrow">04 · {{ t('navGuidance') }}</p>
      <h2 class="mt-3 font-display text-3xl leading-tight text-ink sm:text-[2.5rem]">{{ t('guidanceTitle') }}</h2>
      <p class="mt-4 text-base leading-relaxed text-ink-2">{{ t('guidanceLead') }}</p>
    </header>

    <div class="flex flex-wrap gap-2 border-b border-hairline" role="tablist" :aria-label="t('guidanceTitle')">
      <button
        v-for="option in tabs"
        :id="`guidance-tab-${option}`"
        :key="option"
        type="button"
        role="tab"
        :aria-selected="tab === option"
        :aria-controls="`guidance-panel-${option}`"
        :tabindex="tab === option ? 0 : -1"
        :class="[
          'inline-flex items-center gap-2 border-b-2 px-1 pb-3 pt-2 text-sm transition-colors sm:text-base',
          tab === option ? 'border-amber text-ink' : 'border-transparent text-muted hover:text-ink-2',
        ]"
        @click="tab = option"
        @keydown="onTabKey($event, option)"
      >
        <component :is="option === 'organizations' ? Building2 : Users" :size="15" aria-hidden="true" />
        {{ t(option === 'organizations' ? 'forOrganisations' : 'forPublic') }}
      </button>
    </div>

    <div
      :id="`guidance-panel-${tab}`"
      role="tabpanel"
      :aria-labelledby="`guidance-tab-${tab}`"
    >
      <div
        v-if="tab === 'public'"
        class="mt-6 flex gap-3 rounded border border-amber/40 bg-amber/8 p-4 sm:p-5"
        role="note"
      >
        <Info :size="17" class="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
        <p class="text-[0.9375rem] leading-relaxed text-ink">{{ t('publicKeyPoint') }}</p>
      </div>

      <ol class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <li v-for="(item, index) in items" :key="item.id" class="card flex gap-4 p-5">
          <span class="font-mono text-sm text-amber tabular" aria-hidden="true">{{
            String(index + 1).padStart(2, '0')
          }}</span>
          <div>
            <h3 class="font-display text-lg leading-snug text-ink">{{ L(item.title) }}</h3>
            <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(item.description) }}</p>
          </div>
        </li>
      </ol>

      <p v-if="tab === 'public'" class="mt-8 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2">
        {{ t('learnCtaLead') }}
        <NuxtLink
          :to="localePath('/learn')"
          class="link-underline text-amber hover:text-ink"
          @click="trackPlausibleEvent('Open Learn', { from: 'guidance' })"
        >
          {{ t('learnCta') }}
        </NuxtLink>
      </p>
    </div>
  </section>
</template>
