<script setup lang="ts">
const { t, localePath } = useLocale()
const { quizGraph } = useStructuredData()

const { title } = usePageSeo({
  title: () => `${t('quizTitle')} · ${t('brand')}`,
  description: () => t('quizLead'),
  ogImageAlt: () => `${t('brand')} · ${t('quizTitle')}`,
  jsonLd: () => quizGraph(),
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
  <PageMain>
    <p class="max-w-[62ch]">
      <NuxtLink :to="localePath('/learn')" class="link-underline text-sm text-muted hover:text-amber">
        {{ t('learnBack') }}
      </NuxtLink>
    </p>
    <ExplainerQuiz class="mt-8" />
  </PageMain>
</template>
