<script setup lang="ts">
const props = withDefaults(defineProps<{ org: string; size?: number }>(), { size: 40 })

const fallback = computed(() => initials(props.org))
</script>

<template>
  <span
    class="grid shrink-0 place-items-center overflow-hidden rounded-[3px] border border-hairline bg-surface-2 font-display font-semibold text-ink-2"
    :style="{ width: `${size}px`, height: `${size}px`, fontSize: `${Math.round(size * 0.36)}px` }"
    :aria-hidden="true"
  >
    {{ fallback }}
  </span>
</template>
