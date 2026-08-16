<script setup lang="ts">
import { BadgeCheck, CircleHelp, TriangleAlert } from '@lucide/vue'
import type { IncidentStatus } from '~/types/cyberwatch'

const props = defineProps<{ status: IncidentStatus }>()
const { t } = useLocale()

const icons = { confirmed: BadgeCheck, disputed: TriangleAlert, unknown: CircleHelp }
const icon = computed(() => icons[props.status])
</script>

<template>
  <span class="stamp" :class="`stamp-${status}`">
    <component :is="icon" :size="12" :stroke-width="2.25" aria-hidden="true" />
    {{ t(status) }}
  </span>
</template>
