<script setup lang="ts">
await loadExplainers()

const { t } = useLocale()
const { title } = usePageSeo({
  title: () => `${t('guidanceTitle')} · ${t('brand')}`,
  description: () => t('guidanceLead'),
})

defineOgImage(
  'OgDossier',
  {
    eyebrow: t('navGuidance'),
    years: t('brandYears'),
    incidentCount: 2,
    incidentLabel: t('navGuidance'),
    anssiEvents: '—',
    anssiLabel: t('forPublic'),
    reviewedLabel: t('learnHelp'),
    reviewedThrough: 'cybermalveillance.gouv.fr',
  },
  { alt: title },
)
</script>

<template>
  <PageMain>
    <Recommendations />
  </PageMain>
</template>
