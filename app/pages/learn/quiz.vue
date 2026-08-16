<script setup lang="ts">
const { t, locale, localePath } = useLocale()
const { absolute } = useSiteUrl()

const { title } = usePageSeo({
  title: () => `${t('quizTitle')} · ${t('brand')}`,
  description: () => t('quizLead'),
  ogImageAlt: () => `${t('brand')} · ${t('quizTitle')}`,
  jsonLd: () => ({
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: t('quizTitle'),
    description: t('quizLead'),
    inLanguage: locale.value,
    url: absolute(localePath(quizPath)),
    educationalLevel: 'beginner',
    numberOfQuestions: quizQuestions.length,
    isPartOf: { '@type': 'WebSite', name: t('brand'), url: absolute('/') },
  }),
})

defineOgImage(
  'OgExplainer',
  {
    eyebrow: t('quizEyebrow'),
    title: t('quizTitle'),
    dek: t('quizLead'),
    helpLabel: t('learnHelp'),
    helpThrough: 'cybermalveillance.gouv.fr',
  },
  { alt: title },
)
</script>

<template>
  <main id="content" class="relative z-10 mx-auto max-w-[1400px] px-4 pb-24 pt-10 sm:px-6 sm:pt-16 lg:px-10 lg:pt-20">
    <p class="max-w-[62ch]">
      <NuxtLink :to="localePath('/learn')" class="link-underline text-sm text-muted hover:text-amber">
        {{ t('learnBack') }}
      </NuxtLink>
    </p>
    <ExplainerQuiz class="mt-8" />
  </main>
</template>
