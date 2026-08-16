<script setup lang="ts">
await loadExplainers()

const { t, L, localePath } = useLocale()
const { explainers } = useExplainers()

const { title } = usePageSeo({
  title: () => `${t('learnTitle')} · ${t('brand')}`,
  description: () => t('learnLead'),
  ogImageAlt: () => `${t('brand')} · ${t('learnTitle')}`,
})

useDossierOgImage({
  eyebrow: t('learnEyebrow'),
  incidentCount: explainers.value.length,
  incidentLabel: t('learnGuides'),
  anssiLabel: t('learnNav'),
  reviewedLabel: t('learnHelp'),
  reviewedThrough: 'cybermalveillance.gouv.fr',
  alt: title.value,
})
</script>

<template>
  <PageMain>
    <div
      class="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-12 xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-x-16"
    >
      <header class="max-w-[62ch] lg:col-start-1 lg:row-start-1">
        <p class="eyebrow">{{ t('learnEyebrow') }}</p>
        <h1 class="mt-5 font-display text-[2rem] leading-[1.08] text-ink sm:text-[3.25rem]">{{ t('learnTitle') }}</h1>
        <p class="mt-6 text-base leading-relaxed text-ink-2 sm:text-lg">{{ t('learnLead') }}</p>
      </header>

      <aside class="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24">
        <NuxtLink
          :to="localePath(quizPath)"
          class="card group flex gap-4 p-5 transition-colors hover:border-hairline-strong hover:bg-surface-2 sm:p-6"
          @click="trackPlausibleEvent('Open Quiz')"
        >
          <span class="font-mono text-sm text-amber tabular" aria-hidden="true">Q</span>
          <div class="min-w-0">
            <p class="eyebrow">{{ t('quizEyebrow') }}</p>
            <h2 class="mt-2 font-display text-xl leading-snug text-ink group-hover:text-amber sm:text-2xl">
              {{ t('quizTitle') }}
            </h2>
            <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{{ t('quizLead') }}</p>
            <p class="mt-4 font-mono text-[0.6875rem] uppercase tracking-widest text-muted">{{ t('quizOpen') }}</p>
          </div>
        </NuxtLink>
      </aside>

      <ol class="grid max-w-[62ch] gap-4 lg:col-start-1 lg:row-start-2">
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
    </div>
  </PageMain>
</template>
