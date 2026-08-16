<script setup lang="ts">
await loadExplainers()

const { t, L, localePath } = useLocale()
const { explainers } = useExplainers()

const { title } = usePageSeo({
  title: () => `${t('learnTitle')} · ${t('brand')}`,
  description: () => t('learnLead'),
  ogImageAlt: () => `${t('brand')} · ${t('learnTitle')}`,
})

defineOgImage(
  'OgDossier',
  {
    eyebrow: t('learnEyebrow'),
    years: t('brandYears'),
    incidentCount: explainers.value.length,
    incidentLabel: t('learnGuides'),
    anssiEvents: '—',
    anssiLabel: t('learnNav'),
    reviewedLabel: t('learnHelp'),
    reviewedThrough: 'cybermalveillance.gouv.fr',
  },
  { alt: title },
)
</script>

<template>
  <main id="content" class="relative z-10 mx-auto max-w-[1400px] px-4 pb-24 pt-10 sm:px-6 sm:pt-16 lg:px-10 lg:pt-20">
    <header class="max-w-[62ch]">
      <p class="eyebrow">{{ t('learnEyebrow') }}</p>
      <h1 class="mt-5 font-display text-[2rem] leading-[1.08] text-ink sm:text-[3.25rem]">{{ t('learnTitle') }}</h1>
      <p class="mt-6 text-base leading-relaxed text-ink-2 sm:text-lg">{{ t('learnLead') }}</p>
    </header>

    <ol class="mt-14 grid max-w-[62ch] gap-4 sm:mt-16">
      <li v-for="(explainer, index) in explainers" :key="explainer.slug">
        <NuxtLink
          :to="localePath(`/learn/${explainer.slug}`)"
          class="card group flex gap-4 p-5 transition-colors hover:border-hairline-strong hover:bg-surface-2 sm:p-6"
          @click="trackPlausibleEvent('Open Explainer', { slug: explainer.slug })"
        >
          <span class="font-mono text-sm text-amber tabular" aria-hidden="true">{{
            String(index + 1).padStart(2, '0')
          }}</span>
          <div class="min-w-0">
            <h2 class="font-display text-xl leading-snug text-ink group-hover:text-amber sm:text-2xl">
              {{ L(explainer.title) }}
            </h2>
            <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(explainer.dek) }}</p>
            <p class="mt-4 font-mono text-[0.6875rem] uppercase tracking-widest text-muted">{{ t('learnOpen') }}</p>
          </div>
        </NuxtLink>
      </li>
    </ol>
  </main>
</template>
