<script setup lang="ts">
import type { Incident } from '~/types/cyberwatch'

const props = withDefaults(
  defineProps<{
    org: string
    incident?: Incident
    size?: number
  }>(),
  { size: 40 },
)

const fallback = computed(() => initials(props.org))
const src = computed(() => (props.incident?.logo.file ? `/logos/${props.incident.logo.file}` : undefined))
const broken = ref(false)

watch(src, () => {
  broken.value = false
})
</script>

<template>
  <span
    class="grid shrink-0 place-items-center overflow-hidden rounded-[3px] border"
    :class="src && !broken ? 'border-hairline bg-[#f3ece1]' : 'border-hairline bg-surface-2 font-display font-semibold text-ink-2'"
    :style="{ width: `${size}px`, height: `${size}px`, fontSize: `${Math.round(size * 0.36)}px` }"
    :aria-hidden="true"
  >
    <img
      v-if="src && !broken"
      :src="src"
      alt=""
      class="h-full w-full object-contain"
      :style="{ padding: `${Math.max(4, Math.round(size * 0.14))}px` }"
      @error="broken = true"
    />
    <template v-else>{{ fallback }}</template>
  </span>
</template>
