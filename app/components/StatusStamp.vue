<script setup lang="ts">
import { BadgeCheck, CircleHelp, TriangleAlert } from '@lucide/vue'
import type { IncidentStatus } from '~/types/cyberwatch'

const props = withDefaults(defineProps<{ status: IncidentStatus; tilt?: boolean }>(), { tilt: true })
const { t } = useLocale()

const icons = { confirmed: BadgeCheck, disputed: TriangleAlert, unknown: CircleHelp }
const icon = computed(() => icons[props.status])
</script>

<template>
  <span
    class="stamp"
    :class="[`stamp-${status}`, tilt ? '-rotate-2' : '']"
    :style="tilt ? { transform: 'rotate(-2deg)' } : undefined"
  >
    <component :is="icon" :size="12" :stroke-width="2.25" aria-hidden="true" />
    {{ t(status) }}
  </span>
</template>
