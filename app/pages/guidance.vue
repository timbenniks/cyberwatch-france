<script setup lang="ts">
await loadExplainers()

const { t } = useLocale()
const { title } = usePageSeo({
  title: () => `${t('guidanceTitle')} · ${t('brand')}`,
  description: () => t('guidanceLead'),
})

useDossierOgImage({
  eyebrow: t('navGuidance'),
  incidentCount: 2,
  incidentLabel: t('navGuidance'),
  anssiLabel: t('forPublic'),
  reviewedLabel: t('learnHelp'),
  reviewedThrough: 'cybermalveillance.gouv.fr',
  alt: title.value,
})
</script>

<template>
  <PageMain>
    <Recommendations />
  </PageMain>
</template>
