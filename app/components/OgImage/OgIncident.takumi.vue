<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    org?: string
    date?: string
    sector?: string
    kindLabel?: string
    severity?: string
    severityLabel?: string
    status?: string
    statusLabel?: string
    affected?: string
    affectedLabel?: string
  }>(),
  {
    eyebrow: 'Incident record',
    org: 'France Cyberwatch',
    date: '2026',
    sector: 'Public',
    kindLabel: 'Government',
    severity: 'high',
    severityLabel: 'High',
    status: 'confirmed',
    statusLabel: 'Confirmed',
    affected: 'Number not publicly disclosed',
    affectedLabel: 'People or records affected',
  },
)

const severityColor: Record<string, string> = {
  critical: '#d03b3b',
  high: '#ec835a',
  medium: '#fab219',
  low: '#0ca30c',
}

const statusColor: Record<string, string> = {
  confirmed: '#35c2a5',
  disputed: '#f2a73b',
  unknown: '#a9b3c6',
}
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

    <div>
      <p
        style="
          font-family: 'IBM Plex Mono', monospace;
          font-size: 20px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #a9b3c6;
        "
      >
        {{ date }}
      </p>
      <h1
        style="
          font-family: Spectral, serif;
          font-size: 56px;
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-top: 12px;
          max-width: 980px;
        "
      >
        {{ org }}
      </h1>
      <p style="font-family: 'Public Sans', sans-serif; font-size: 24px; color: #a9b3c6; margin-top: 16px">
        {{ kindLabel }} · {{ sector }}
      </p>
    </div>

    <div class="flex flex-col" style="gap: 28px">
      <div>
        <p
          style="
            font-family: 'IBM Plex Mono', monospace;
            font-size: 16px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #6f7c93;
          "
        >
          {{ affectedLabel }}
        </p>
        <p
          style="
            font-family: Spectral, serif;
            font-size: 32px;
            font-weight: 300;
            line-height: 1.25;
            margin-top: 8px;
          "
        >
          {{ affected }}
        </p>
      </div>

      <div class="flex" style="gap: 16px">
        <div
          style="
            font-family: Spectral, serif;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            padding: 8px 12px;
            border-width: 2px;
            border-style: solid;
          "
          :style="{ color: severityColor[severity] ?? '#ec835a', borderColor: severityColor[severity] ?? '#ec835a' }"
        >
          {{ severityLabel }}
        </div>
        <div
          style="
            font-family: Spectral, serif;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            padding: 8px 12px;
            border-width: 2px;
          "
          :style="{
            color: statusColor[status] ?? '#35c2a5',
            borderColor: statusColor[status] ?? '#35c2a5',
            borderStyle: status === 'disputed' ? 'dashed' : status === 'unknown' ? 'dotted' : 'solid',
          }"
        >
          {{ statusLabel }}
        </div>
      </div>
    </div>
  </div>
</template>
