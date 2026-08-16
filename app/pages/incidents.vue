<script setup lang="ts">
const { data, incidents } = useCyberData()
const { locale, t } = useLocale()
const { open } = useIncidentRoute()

useFilterQuery()

const { title } = usePageSeo({
  title: () => `${t('timelineTitle')} · ${t('brand')}`,
  description: () => t('timelineLead'),
})

defineOgImage(
  'OgDossier',
  {
    eyebrow: t('navIncidents'),
    years: t('brandYears'),
    incidentCount: incidents.value.length,
    incidentLabel: t('incidentsCount'),
    anssiEvents: '—',
    anssiLabel: t('navIncidents'),
    reviewedLabel: t('reviewedThrough'),
    reviewedThrough: data.value ? formatDate(data.value.project.reviewedThrough, locale.value) : '',
    severities: incidents.value.map((item) => item.severity).join(','),
  },
  { alt: title },
)
</script>

<template>
  <PageMain>
    <p v-if="!data" class="py-24 text-center text-ink-2" role="alert">{{ t('loadError') }}</p>
    <Timeline v-else @open="open" />
  </PageMain>
</template>
