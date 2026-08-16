import type { Severity } from '~/types/cyberwatch'

/** Chart chrome, tuned to the #111726 chart surface. */
export const chartChrome = {
  surface: '#111726',
  gridline: '#202a3d',
  axis: '#2c3a52',
  muted: '#6f7c93',
  ink: '#f3ece1',
  ink2: '#a9b3c6',
  mono: "'IBM Plex Mono', ui-monospace, Menlo, monospace",
  sans: "'Public Sans', system-ui, sans-serif",
}

/** Reserved status palette — severity only, never a series colour. */
export const severityColor: Record<Severity, string> = {
  critical: '#d03b3b',
  high: '#ec835a',
  medium: '#fab219',
  low: '#0ca30c',
}

/** Categorical slots, validated for CVD against the chart surface. */
export const seriesColors = ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181']

/**
 * Single-hue ordinal ramp for magnitude. On a dark surface the brighter step
 * reads as "more", so the ramp runs dark → light with the largest value
 * lightest. Validated for monotone lightness and step spacing at #111726.
 */
const sequentialRamp = ['#1c5cab', '#2a78d6', '#5598e7', '#9ec5f4']

/** Magnitude → step. Equal values always get the same step. */
export function sequential(value: number, max: number): string {
  if (max <= 0) return sequentialRamp[0]!
  const step = Math.round((value / max) * (sequentialRamp.length - 1))
  return sequentialRamp[step]!
}

export const axisLabelStyle = {
  color: chartChrome.muted,
  fontFamily: chartChrome.mono,
  fontSize: 11,
}

export const tooltipStyle = {
  backgroundColor: '#0c1220',
  borderColor: chartChrome.axis,
  borderWidth: 1,
  padding: [10, 12] as [number, number],
  textStyle: { color: chartChrome.ink, fontFamily: chartChrome.sans, fontSize: 13 },
  extraCssText: 'border-radius:4px;box-shadow:0 12px 32px rgba(0,0,0,.45);max-width:280px;',
}

export const valueAxis = {
  type: 'value' as const,
  axisLabel: axisLabelStyle,
  splitLine: { lineStyle: { color: chartChrome.gridline } },
  axisLine: { show: false },
  axisTick: { show: false },
}

export const categoryAxis = {
  type: 'category' as const,
  axisLabel: { ...axisLabelStyle, color: chartChrome.ink2 },
  axisLine: { lineStyle: { color: chartChrome.axis } },
  axisTick: { show: false },
  splitLine: { show: false },
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
