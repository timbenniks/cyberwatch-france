<script setup lang="ts">
const { t, L } = useLocale()
const { data } = useCyberData()

const rules = [
  { title: 'homeRuleUnknownTitle', body: 'homeRuleUnknown' },
  { title: 'homeRuleDisputedTitle', body: 'homeRuleDisputed' },
  { title: 'homeRuleCiteTitle', body: 'homeRuleCite' },
] as const
</script>

<template>
  <section class="mt-16 border-t border-hairline pt-16 sm:mt-20 sm:pt-20" aria-labelledby="home-how">
    <header class="max-w-[62ch]">
      <p class="eyebrow">{{ t('methodology') }}</p>
      <h2 id="home-how" class="mt-3 font-display text-2xl leading-tight text-ink sm:text-3xl">{{ t('homeHowTitle') }}</h2>
      <p class="mt-4 text-base leading-relaxed text-ink-2">{{ t('homeHowLead') }}</p>
    </header>

    <ul class="mt-10 grid gap-4 md:grid-cols-3">
      <li v-for="rule in rules" :key="rule.title" class="card p-5 sm:p-6">
        <h3 class="font-display text-lg leading-snug text-ink">{{ t(rule.title) }}</h3>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ t(rule.body) }}</p>
      </li>
    </ul>

    <div v-if="data" class="mt-10 max-w-[62ch]">
      <p class="eyebrow">{{ t('scopeNote') }}</p>
      <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(data.project.scope) }}</p>
      <p class="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">{{ L(data.project.methodology) }}</p>
    </div>
  </section>
</template>
