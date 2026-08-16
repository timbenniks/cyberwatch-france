type DossierOgInput = {
  eyebrow: string
  incidentCount?: number
  incidentLabel: string
  anssiEvents?: string
  anssiLabel: string
  reviewedLabel: string
  reviewedThrough: string
  alt: string
}

/** Shared OgDossier payload so section pages cannot drift on years / counts / review date. */
export function useDossierOgImage(input: DossierOgInput) {
  const { incidents } = useCyberData()
  const { t } = useLocale()

  defineOgImage(
    'OgDossier',
    {
      eyebrow: input.eyebrow,
      years: t('brandYears'),
      incidentCount: input.incidentCount ?? incidents.value.length,
      incidentLabel: input.incidentLabel,
      anssiEvents: input.anssiEvents ?? '—',
      anssiLabel: input.anssiLabel,
      reviewedLabel: input.reviewedLabel,
      reviewedThrough: input.reviewedThrough,
      severities: incidents.value.map((item) => item.severity).join(','),
    },
    { alt: input.alt },
  )
}
