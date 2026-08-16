<script setup lang="ts">
const { t } = useLocale()
const { incidentComposition } = useCyberData()
</script>

<template>
  <p class="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
    {{
      t('listMix', {
        gov: incidentComposition.government,
        co: incidentComposition.company,
        published: incidentComposition.published,
        unknown: incidentComposition.unknown,
      })
    }}
    <template v-if="incidentComposition.disputed">
      {{ ' ' + t('listMixDisputed', { n: incidentComposition.disputed }) }}
    </template>
  </p>
</template>
