<script setup lang="ts">
import type { UiKey } from '~/composables/useLocale'

const { t, localePath } = useLocale()

const paths: { path: string; title: UiKey; lead: UiKey }[] = [
  { path: '/incidents', title: 'navIncidents', lead: 'homePathIncidentsLead' },
  { path: '/guidance', title: 'navGuidance', lead: 'homePathGuidanceLead' },
  { path: '/numbers', title: 'navNumbers', lead: 'homePathNumbersLead' },
  { path: '/learn', title: 'learnNav', lead: 'homePathLearnLead' },
]
</script>

<template>
  <section class="mt-16 sm:mt-20" aria-labelledby="home-continue">
    <h2 id="home-continue" class="font-display text-2xl leading-tight text-ink sm:text-3xl">{{ t('homeContinueTitle') }}</h2>
    <ul class="mt-8 grid gap-4 sm:grid-cols-2">
      <li v-for="item in paths" :key="item.path">
        <NuxtLink
          :to="localePath(item.path)"
          class="card group flex h-full flex-col p-5 transition-colors hover:border-hairline-strong hover:bg-surface-2 sm:p-6"
          @click="trackPlausibleEvent('Nav', { section: item.path })"
        >
          <h3 class="font-display text-xl leading-snug text-ink group-hover:text-amber">{{ t(item.title) }}</h3>
          <p class="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">{{ t(item.lead) }}</p>
          <p class="mt-5 font-mono text-[0.6875rem] uppercase tracking-widest text-muted">{{ localePath(item.path) }}</p>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
