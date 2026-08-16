import type { Incident, Locale } from '~/types/cyberwatch'

function download(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function csvCell(value: string | number | null): string {
  if (value === null) return ''
  const text = String(value)
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

const columns = [
  'date',
  'org',
  'kind',
  'sector',
  'severity',
  'status',
  'affected',
  'affectedLabel',
  'data',
  'method',
  'risk',
  'confidence',
  'sourceName',
  'sourceUrl',
] as const

export function exportCsv(incidents: Incident[], locale: Locale) {
  const rows = incidents.map((incident) =>
    columns
      .map((column) => {
        switch (column) {
          case 'org':
          case 'confidence':
          case 'affectedLabel':
          case 'data':
          case 'method':
          case 'risk':
            return csvCell(incident[column][locale])
          // Unknown stays empty in the export — writing 0 would invent a fact.
          case 'affected':
            return csvCell(incident.affected)
          default:
            return csvCell(incident[column])
        }
      })
      .join(','),
  )
  download([columns.join(','), ...rows].join('\n'), `france-cyberwatch-${locale}.csv`, 'text/csv')
}

export function exportJson(incidents: Incident[]) {
  download(JSON.stringify(incidents, null, 2), 'france-cyberwatch.json', 'application/json')
}
