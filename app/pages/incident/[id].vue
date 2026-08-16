<script setup lang="ts">
const { data, incidents } = useCyberData()
const { locale, t, L } = useLocale()
const { selected } = useIncidentRoute()
const { absolute } = useSiteUrl()
const { graphFor } = useStructuredData()

const siteName = computed(() => data.value?.project.name ?? 'France Cyberwatch')
const incident = computed(() => selected.value)

const { title } = usePageSeo({
  title: () =>
    incident.value ? `${L(incident.value.org)} — ${t('seoRecordSuffix')} — ${siteName.value}` : siteName.value,
  description: () => {
    if (!incident.value) return t('seoTagline')
    const sector = data.value?.ui.sectorLabels[incident.value.sector]?.[locale.value] ?? incident.value.sector
    const lead = L(incident.value.detail.lead)
    return `${formatDate(incident.value.date, locale.value)} · ${sector} · ${L(incident.value.affectedLabel)}. ${lead}`.slice(
      0,
      300,
    )
  },
  ogType: 'article',
  links: () => [
    {
      rel: 'alternate',
      type: 'application/json',
      href: absolute(`/api/incidents/${incident.value?.id ?? ''}`),
      title: 'Incident API',
    },
  ],
  jsonLd: () => graphFor(incident.value),
})

defineOgImage(
  'OgIncident',
  {
    eyebrow: t('incidentRecord'),
    org: incident.value ? L(incident.value.org) : siteName.value,
    date: incident.value ? formatDate(incident.value.date, locale.value) : '',
    sector: incident.value
      ? (data.value?.ui.sectorLabels[incident.value.sector]?.[locale.value] ?? incident.value.sector)
      : '',
    kindLabel: incident.value ? t(incident.value.kind) : '',
    severity: incident.value?.severity ?? 'low',
    severityLabel: incident.value ? t(incident.value.severity) : '',
    status: incident.value?.status ?? 'unknown',
    statusLabel: incident.value ? t(incident.value.status) : '',
    affected: incident.value ? formatAffected(incident.value, locale.value) : '',
    affectedLabel: t('affected'),
  },
  { alt: title },
)

watch(
  incident,
  (current) => {
    if (incidents.value.length && !current) {
      throw createError({ statusCode: 404, statusMessage: 'Incident not found', fatal: true })
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <p v-if="!data" class="mx-auto max-w-[52ch] py-32 text-center text-ink-2" role="alert">{{ t('loadError') }}</p>
    <main v-else-if="incident" id="content" class="relative z-10 mx-auto max-w-[1400px] px-4 pb-24 pt-10 sm:px-6 sm:pt-14 lg:px-10 lg:pt-16">
      <IncidentDetail :key="incident.id" :incident="incident" />
    </main>
  </div>
</template>
