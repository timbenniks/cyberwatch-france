<script setup lang="ts">
defineProps<{
  title: string
  detail: string
  actionLabel?: string
}>()

defineEmits<{ action: [] }>()
</script>

<template>
  <div class="mt-4 rounded border border-hairline bg-surface-2/60 p-3.5">
    <p class="font-medium text-ink">{{ title }}</p>
    <p class="mt-1 text-sm leading-relaxed text-ink-2">{{ detail }}</p>
    <button
      v-if="actionLabel"
      type="button"
      class="mt-3 inline-flex min-h-11 items-center text-[0.8125rem] text-amber hover:text-ink sm:min-h-0"
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </button>
  </div>
</template>
