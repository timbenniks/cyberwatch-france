<script setup lang="ts">
withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <main
    id="content"
    class="relative z-10 mx-auto max-w-[1400px] px-4 pb-24 pt-10 sm:px-6 lg:px-10"
    :class="compact ? 'sm:pt-14 lg:pt-16' : 'sm:pt-16 lg:pt-20'"
  >
    <slot />
  </main>
</template>
