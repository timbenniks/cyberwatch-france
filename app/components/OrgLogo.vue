<script setup lang="ts">
import type { Incident } from '~/types/cyberwatch'

const props = withDefaults(
  defineProps<{
    org: string
    incident?: Incident
    size?: number
    /** Square that matches the sibling block's height instead of a fixed size. */
    stretch?: boolean
  }>(),
  { size: 40 },
)

const fallback = computed(() => initials(props.org))
const src = computed(() => (props.incident?.logo.file ? `/logos/${props.incident.logo.file}` : undefined))
const broken = ref(false)

const boxStyle = computed(() => {
  const fontSize = `${Math.round(props.size * 0.36)}px`
  if (props.stretch) return { fontSize }
  return { width: `${props.size}px`, height: `${props.size}px`, fontSize }
})

watch(src, () => {
  broken.value = false
})
</script>

<template>
  <span
    class="grid shrink-0 place-items-center overflow-hidden rounded-[3px] border"
    :class="[
      src && !broken ? 'border-hairline bg-logo-plate' : 'border-hairline bg-surface-2 font-display font-semibold text-ink-2',
      stretch ? 'relative h-full w-full min-h-0 min-w-0' : '',
    ]"
    :style="boxStyle"
    :aria-hidden="true"
  >
    <img
      v-if="src && !broken"
      :src="src"
      alt=""
      class="object-contain"
      :class="stretch ? 'absolute inset-0 h-full w-full p-[14%]' : 'h-full w-full'"
      :style="stretch ? undefined : { padding: `${Math.max(4, Math.round(size * 0.14))}px` }"
      @error="broken = true"
    />
    <template v-else>{{ fallback }}</template>
  </span>
</template>
