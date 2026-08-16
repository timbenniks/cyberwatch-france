<script setup lang="ts">
const { data } = useCyberData()
const { L } = useLocale()

const rules = computed(() => Object.entries(data.value?.ui.chartRules ?? {}))
</script>

<template>
  <ul class="space-y-2.5">
    <li v-for="[key, rule] in rules" :key="key" class="flex gap-3 text-[0.875rem] leading-relaxed text-ink-2">
      <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber" aria-hidden="true" />
      {{ L(rule) }}
    </li>
  </ul>
</template>
