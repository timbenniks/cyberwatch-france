<script setup lang="ts">
const { data } = useCyberData()
const { locale, t } = useLocale()
useFilterQuery()

const { title } = usePageSeo({
  title: () => `${t('timelineTitle')} · ${t('brand')}`,
  description: () => t('timelineLead'),
})

useDossierOgImage({
  eyebrow: t('navIncidents'),
  incidentLabel: t('incidentsCount'),
  anssiLabel: t('navIncidents'),
  reviewedLabel: t('reviewedThrough'),
  reviewedThrough: data.value ? formatDate(data.value.project.reviewedThrough, locale.value) : '',
  alt: title.value,
})
</script>

<template>
  <PageMain>
    <p v-if="!data" class="py-24 text-center text-ink-2" role="alert">{{ t('loadError') }}</p>
    <Timeline v-else />
  </PageMain>
</template>
