import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const datasetPath = fileURLToPath(new URL('./data/france-cyberwatch-data.json', import.meta.url))
const dataset = JSON.parse(readFileSync(datasetPath, 'utf8')) as { incidents: { id: string }[] }
const explainerPath = fileURLToPath(new URL('./data/explainers.json', import.meta.url))
const explainerData = JSON.parse(readFileSync(explainerPath, 'utf8')) as { explainers: { slug: string }[] }

const siteUrl =
  process.env.NUXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

const plausibleDomain = process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN || ''
const plausibleSrc =
  process.env.NUXT_PUBLIC_PLAUSIBLE_SRC || 'https://plausible.io/js/script.outbound-links.tagged-events.js'
const plausibleApiHost = process.env.NUXT_PUBLIC_PLAUSIBLE_API_HOST || ''

/** Every incident gets its own prerendered, indexable page. */
const incidentRoutes = dataset.incidents.flatMap((incident) => [
  `/incident/${incident.id}`,
  `/fr/incident/${incident.id}`,
])

const explainerRoutes = explainerData.explainers.flatMap((explainer) => [
  `/learn/${explainer.slug}`,
  `/fr/learn/${explainer.slug}`,
])

export default defineNuxtConfig({
  compatibilityDate: '2026-08-16',
  modules: ['@nuxt/fonts', 'nuxt-og-image'],

  css: ['~/assets/css/style.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  components: [{ path: '~/components', pathPrefix: false }],

  fonts: {
    families: [
      { name: 'Spectral', weights: [300, 600], global: true },
      { name: 'Public Sans', weights: [400, 500], styles: ['normal', 'italic'], global: true },
      { name: 'IBM Plex Mono', weights: [400, 500], global: true },
    ],
  },

  site: {
    url: siteUrl,
    name: 'France Cyberwatch',
  },

  ogImage: {
    zeroRuntime: true,
    defaults: {
      width: 1200,
      height: 630,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'color-scheme', content: 'light dark' },
        { name: 'theme-color', content: '#f3ece1', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#080b14', media: '(prefers-color-scheme: dark)' },
      ],
      link: [{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    },
  },

  runtimeConfig: {
    public: {
      /**
       * Canonical and og: URLs are baked into the prerendered HTML, so they
       * cannot come from the request. Vercel supplies the production domain at
       * build time; override locally with NUXT_PUBLIC_SITE_URL.
       */
      siteUrl,
      /**
       * Plausible site domain as registered in the dashboard (not a secret).
       * Leave empty locally; set NUXT_PUBLIC_PLAUSIBLE_DOMAIN on Vercel.
       */
      plausibleDomain,
      plausibleSrc,
      plausibleApiHost,
    },
  },

  nitro: {
    // data/ is the single source of truth: served at /data and imported by the API.
    publicAssets: [{ baseURL: '/data', dir: fileURLToPath(new URL('./data', import.meta.url)), maxAge: 3600 }],
    prerender: {
      crawlLinks: false,
      routes: ['/', '/fr', '/docs', '/fr/docs', '/learn', '/fr/learn', ...incidentRoutes, ...explainerRoutes],
    },
  },

  routeRules: {
    // API headers live in server/middleware/api-headers.ts so they hold on any target.
    '/data/**': {
      headers: { 'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
    },
    '/_nuxt/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    '/grain.png': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    '/favicon.svg': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    '/logos/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
    '/og.png': {
      headers: { 'cache-control': 'public, max-age=86400, stale-while-revalidate=604800' },
    },
    '/': {
      headers: { 'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
    },
    '/fr': {
      headers: { 'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
    },
    '/docs': {
      headers: { 'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
    },
    '/fr/docs': {
      headers: { 'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
    },
    '/learn': {
      headers: { 'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
    },
    '/fr/learn': {
      headers: { 'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
    },
    '/learn/**': {
      headers: { 'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
    },
    '/fr/learn/**': {
      headers: { 'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
    },
    '/incident/**': {
      headers: { 'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
    },
    '/fr/incident/**': {
      headers: { 'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
    },
  },

  typescript: { typeCheck: false },
})
