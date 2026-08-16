<script setup lang="ts">
defineProps<{ headers: string[]; rows: (string | number)[][]; caption?: string }>()
</script>

<template>
  <table class="w-full border-collapse text-left text-[0.8125rem]">
    <caption v-if="caption" class="sr-only">{{ caption }}</caption>
    <thead>
      <tr class="border-b border-hairline-strong">
        <th v-for="header in headers" :key="header" scope="col" class="py-2 pr-4 eyebrow font-medium">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index" class="border-b border-hairline last:border-0">
        <td
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          class="py-2 pr-4 align-top"
          :class="cellIndex === 0 ? 'text-ink' : 'tabular text-ink-2'"
        >
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
