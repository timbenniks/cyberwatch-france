<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    dek?: string
    helpLabel?: string
    helpThrough?: string
  }>(),
  {
    eyebrow: 'Public explainers',
    title: 'France Cyberwatch',
    dek: '',
    helpLabel: 'Official help',
    helpThrough: 'cybermalveillance.gouv.fr',
  },
)
</script>

<template>
  <div
    class="flex h-full w-full flex-col justify-between"
    style="background-color: #080b14; color: #f3ece1; padding: 64px 72px; font-family: 'Public Sans', sans-serif"
  >
    <div class="flex items-baseline justify-between">
      <p
        style="
          font-family: 'IBM Plex Mono', monospace;
          font-size: 22px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #6f7c93;
        "
      >
        {{ eyebrow }}
      </p>
      <p style="font-family: Spectral, serif; font-size: 28px; font-weight: 600">
        France<span style="color: #f2a73b"> Cyberwatch</span>
      </p>
    </div>

    <div class="flex flex-col" style="gap: 24px; max-width: 1000px">
      <h1
        style="
          font-family: Spectral, serif;
          font-size: 52px;
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.12;
        "
      >
        {{ title }}
      </h1>
      <p
        v-if="dek"
        style="
          font-family: 'Public Sans', sans-serif;
          font-size: 24px;
          line-height: 1.4;
          color: #a9b3c6;
        "
      >
        {{ dek }}
      </p>
    </div>

    <p
      style="
        font-family: 'IBM Plex Mono', monospace;
        font-size: 18px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #6f7c93;
      "
    >
      {{ helpLabel }} {{ helpThrough }}
    </p>
  </div>
</template>
