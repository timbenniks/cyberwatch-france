<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    years?: string
    incidentCount?: number
    incidentLabel?: string
    anssiEvents?: string
    anssiLabel?: string
    reviewedLabel?: string
    reviewedThrough?: string
    /** Newest-first severity list, drawn as the signal spine. */
    severities?: string
  }>(),
  {
    eyebrow: 'Public incident dossier',
    years: '2025—2026',
    incidentCount: 14,
    incidentLabel: 'incidents',
    anssiEvents: '3,586',
    anssiLabel: 'ANSSI security events handled',
    reviewedLabel: 'Data reviewed through',
    reviewedThrough: '16 August 2026',
    severities: 'critical,high,critical,high,medium,critical,high,medium,high,critical,medium,high,low,high',
  },
)

const colors: Record<string, string> = {
  critical: '#d03b3b',
  high: '#ec835a',
  medium: '#fab219',
  low: '#0ca30c',
}

const heights: Record<string, number> = {
  critical: 72,
  high: 54,
  medium: 38,
  low: 26,
}

const ticks = computed(() =>
  props.severities
    .split(',')
    .map((severity) => severity.trim())
    .filter(Boolean)
    .map((severity) => ({
      color: colors[severity] ?? colors.medium,
      height: heights[severity] ?? 38,
    })),
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
      <p
        style="
          font-family: 'IBM Plex Mono', monospace;
          font-size: 22px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #f2a73b;
        "
      >
        {{ years }}
      </p>
    </div>

    <div>
      <h1 style="font-family: Spectral, serif; font-size: 72px; font-weight: 300; letter-spacing: -0.02em; line-height: 1">
        France<span style="color: #f2a73b"> Cyberwatch</span>
      </h1>

      <div class="flex" style="margin-top: 40px; gap: 64px">
        <div>
          <p style="font-family: Spectral, serif; font-size: 64px; font-weight: 300; line-height: 1">
            {{ incidentCount }}
          </p>
          <p
            style="
              font-family: 'IBM Plex Mono', monospace;
              font-size: 18px;
              letter-spacing: 0.14em;
              text-transform: uppercase;
              color: #a9b3c6;
              margin-top: 8px;
            "
          >
            {{ incidentLabel }}
          </p>
        </div>
        <div>
          <p style="font-family: Spectral, serif; font-size: 64px; font-weight: 300; line-height: 1">
            {{ anssiEvents }}
          </p>
          <p
            style="
              font-family: 'IBM Plex Mono', monospace;
              font-size: 18px;
              letter-spacing: 0.14em;
              text-transform: uppercase;
              color: #a9b3c6;
              margin-top: 8px;
            "
          >
            {{ anssiLabel }}
          </p>
        </div>
      </div>
    </div>

    <div>
      <div class="flex items-end" style="height: 80px; gap: 10px">
        <div
          v-for="(tick, index) in ticks"
          :key="index"
          style="width: 14px; border-radius: 2px 2px 0 0"
          :style="{ height: `${tick.height}px`, backgroundColor: tick.color }"
        />
      </div>
      <p
        style="
          font-family: 'IBM Plex Mono', monospace;
          font-size: 18px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #6f7c93;
          margin-top: 28px;
        "
      >
        {{ reviewedLabel }} {{ reviewedThrough }}
      </p>
    </div>
  </div>
</template>
