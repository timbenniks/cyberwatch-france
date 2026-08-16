import type { Severity } from '~/types/cyberwatch'

export type ColorScheme = 'dark' | 'light'

export type ChartChrome = {
  surface: string
  gridline: string
  axis: string
  muted: string
  ink: string
  ink2: string
  onFill: string
  onSeriesFill: string
  tooltipBg: string
  tooltipShadow: string
  axisPointer: string
  mono: string
  sans: string
}

type TooltipPadding = [number, number]

type ChartPalette = {
  chrome: ChartChrome
  severityColor: Record<Severity, string>
  sequentialRamp: string[]
}

const fonts = {
  mono: "'IBM Plex Mono', ui-monospace, Menlo, monospace",
  sans: "'Public Sans', system-ui, sans-serif",
}

/** Categorical slots, validated for CVD against #111726 and #fffcf7. */
export const seriesColors = ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181']

/**
 * Chart chrome and status fills. Must stay in step with the CSS tokens in
 * style.css — dark defaults in `@theme`, light overrides in
 * `prefers-color-scheme: light`.
 *
 * Dark sequential: brighter = more, validated at #111726.
 * Light sequential: darker = more, validated at #fffcf7.
 */
const palettes: Record<ColorScheme, ChartPalette> = {
  dark: {
    chrome: {
      surface: '#111726',
      gridline: '#202a3d',
      axis: '#2c3a52',
      muted: '#6f7c93',
      ink: '#f3ece1',
      ink2: '#a9b3c6',
      onFill: '#0c1220',
      onSeriesFill: '#0c1220',
      tooltipBg: '#0c1220',
      tooltipShadow: 'rgba(0,0,0,.45)',
      axisPointer: 'rgba(169,179,198,0.06)',
      ...fonts,
    },
    severityColor: {
      critical: '#d03b3b',
      high: '#ec835a',
      medium: '#fab219',
      low: '#0ca30c',
    },
    sequentialRamp: ['#1c5cab', '#2a78d6', '#5598e7', '#9ec5f4'],
  },
  light: {
    chrome: {
      surface: '#fffcf7',
      gridline: '#d0c4b0',
      axis: '#b7aa94',
      muted: '#5c6a82',
      ink: '#121826',
      ink2: '#3a4860',
      onFill: '#fff8ee',
      onSeriesFill: '#0c1220',
      tooltipBg: '#fffcf7',
      tooltipShadow: 'rgba(18,24,38,.18)',
      axisPointer: 'rgba(18,24,38,0.06)',
      ...fonts,
    },
    severityColor: {
      critical: '#b42318',
      high: '#b0441c',
      medium: '#8a5e00',
      low: '#0a7a12',
    },
    sequentialRamp: ['#5a96d4', '#3472bc', '#1a5296', '#0c386e'],
  },
}

export function chartTheme(scheme: ColorScheme) {
  const palette = palettes[scheme]
  const { chrome, severityColor, sequentialRamp } = palette
  const axisLabelStyle = {
    color: chrome.muted,
    fontFamily: chrome.mono,
    fontSize: 11,
  }
  const tooltipPadding: TooltipPadding = [10, 12]
  return {
    chrome,
    severityColor,
    seriesColors,
    sequential(value: number, max: number): string {
      if (max <= 0) return sequentialRamp[0]!
      const step = Math.round((value / max) * (sequentialRamp.length - 1))
      return sequentialRamp[step]!
    },
    axisLabelStyle,
    tooltipStyle: {
      backgroundColor: chrome.tooltipBg,
      borderColor: chrome.axis,
      borderWidth: 1,
      padding: tooltipPadding,
      textStyle: { color: chrome.ink, fontFamily: chrome.sans, fontSize: 13 },
      extraCssText: `border-radius:4px;box-shadow:0 12px 32px ${chrome.tooltipShadow};max-width:280px;`,
    },
    valueAxis: {
      type: 'value' as const,
      axisLabel: axisLabelStyle,
      splitLine: { lineStyle: { color: chrome.gridline } },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    categoryAxis: {
      type: 'category' as const,
      axisLabel: { ...axisLabelStyle, color: chrome.ink2 },
      axisLine: { lineStyle: { color: chrome.axis } },
      axisTick: { show: false },
      splitLine: { show: false },
    },
  }
}

/** 4px rounded data-end, anchored to the baseline. */
type BarRadius = [number, number, number, number]
export const barRadiusH: BarRadius = [0, 4, 4, 0]
export const barRadiusV: BarRadius = [4, 4, 0, 0]

/** The subset of ECharts' callback payload the tooltips here actually read. */
export interface TooltipParam {
  dataIndex: number
  name: string
  seriesName?: string
  value: number
  color: string
  marker: string
}

export function swatch(color: string): string {
  return `<span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${color};margin-right:6px;vertical-align:middle"></span>`
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"]/g, (char) => `&${{ '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot' }[char]};`)
}
