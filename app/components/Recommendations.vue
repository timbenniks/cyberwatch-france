<script setup lang="ts">
import { Building2, Info, Users } from '@lucide/vue'

const { data } = useCyberData()
const { t, L, localePath } = useLocale()
const { explainers } = useExplainers()

const publicItems = computed(() => data.value?.recommendations.public ?? [])
const orgItems = computed(() => data.value?.recommendations.organizations ?? [])
</script>

<template>
  <section>
    <header class="mb-10 max-w-[62ch]">
      <p class="eyebrow">{{ t('navGuidance') }}</p>
      <h1 class="mt-3 font-display text-3xl leading-tight text-ink sm:text-[2.5rem]">{{ t('guidanceTitle') }}</h1>
      <p class="mt-4 text-base leading-relaxed text-ink-2">{{ t('guidanceLead') }}</p>
    </header>

    <div class="mt-6 flex gap-3 rounded border border-amber/40 bg-amber/8 p-4 sm:p-5" role="note">
      <Info :size="17" class="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
      <p class="text-[0.9375rem] leading-relaxed text-ink">{{ t('publicKeyPoint') }}</p>
    </div>

    <section class="mt-14 sm:mt-16" aria-labelledby="guidance-public">
      <div class="mb-6 flex items-start gap-3">
        <Users :size="18" class="mt-1 shrink-0 text-amber" aria-hidden="true" />
        <div class="max-w-[62ch]">
          <h2 id="guidance-public" class="font-display text-2xl leading-tight text-ink sm:text-3xl">
            {{ t('forPublic') }}
          </h2>
          <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('guidancePublicLead') }}</p>
        </div>
      </div>

      <ol class="grid gap-4 md:grid-cols-2">
        <li v-for="(item, index) in publicItems" :key="item.id" class="card flex gap-4 p-5 sm:p-6">
          <span class="font-mono text-sm text-amber tabular" aria-hidden="true">{{
            String(index + 1).padStart(2, '0')
          }}</span>
          <div>
            <h3 class="font-display text-lg leading-snug text-ink">{{ L(item.title) }}</h3>
            <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(item.description) }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="mt-16 sm:mt-20" aria-labelledby="guidance-org">
      <div class="mb-6 flex items-start gap-3">
        <Building2 :size="18" class="mt-1 shrink-0 text-amber" aria-hidden="true" />
        <div class="max-w-[62ch]">
          <h2 id="guidance-org" class="font-display text-2xl leading-tight text-ink sm:text-3xl">
            {{ t('forOrganisations') }}
          </h2>
          <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('guidanceOrgLead') }}</p>
        </div>
      </div>

      <ol class="grid gap-4 md:grid-cols-2">
        <li v-for="(item, index) in orgItems" :key="item.id" class="card flex gap-4 p-5 sm:p-6">
          <span class="font-mono text-sm text-amber tabular" aria-hidden="true">{{
            String(index + 1).padStart(2, '0')
          }}</span>
          <div>
            <h3 class="font-display text-lg leading-snug text-ink">{{ L(item.title) }}</h3>
            <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(item.description) }}</p>
          </div>
        </li>
      </ol>
    </section>

    <aside class="mt-16 card max-w-[62ch] p-5 sm:mt-20 sm:p-6" aria-labelledby="guidance-help">
      <p id="guidance-help" class="eyebrow">{{ t('learnHelp') }}</p>
      <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('learnHelpLead') }}</p>
      <a
        :href="learnHelpUrl"
        class="link-underline mt-4 inline-block text-sm text-amber hover:text-ink"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('learnHelpLink') }}
        <span class="sr-only">({{ t('opensNewTab') }})</span>
      </a>
    </aside>

    <section v-if="explainers.length" class="mt-16 sm:mt-20" aria-labelledby="guidance-learn">
      <header class="mb-6 max-w-[62ch]">
        <h2 id="guidance-learn" class="font-display text-2xl leading-tight text-ink sm:text-3xl">{{ t('learnTitle') }}</h2>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
          {{ t('learnCtaLead') }}
          <NuxtLink
            :to="localePath('/learn')"
            class="link-underline text-amber hover:text-ink"
            @click="trackPlausibleEvent('Open Learn', { from: 'guidance' })"
          >
            {{ t('learnCta') }}
          </NuxtLink>
        </p>
      </header>

      <ul class="grid gap-4 md:grid-cols-2">
        <li v-for="explainer in explainers" :key="explainer.slug">
          <NuxtLink
            :to="localePath(`/learn/${explainer.slug}`)"
            class="card group flex h-full flex-col p-5 transition-colors hover:border-hairline-strong hover:bg-surface-2 sm:p-6"
            @click="trackPlausibleEvent('Open Explainer', { slug: explainer.slug, from: 'guidance' })"
          >
            <h3 class="font-display text-lg leading-snug text-ink group-hover:text-amber">{{ L(explainer.title) }}</h3>
            <p class="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(explainer.dek) }}</p>
            <p class="mt-4 font-mono text-[0.6875rem] uppercase tracking-widest text-muted">{{ t('learnOpen') }}</p>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </section>
</template>
