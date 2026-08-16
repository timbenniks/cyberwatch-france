# Santé publique France contractor: 80,000 contact records exposed

_Research cutoff: 16 August 2026_

## At a glance

| Field | Finding |
|---|---|
| Organization | Santé publique France contractor-hosted ordering platform |
| Sector | Public health |
| Incident date | 13 August 2026 disclosure |
| Status | Confirmed through agency statements reported by French press |
| Affected scope | About 80,000 users |

## Executive summary

Santé publique France confirmed on 13 August 2026 that a contractor-hosted platform used to order public-health prevention materials had been attacked. The affected service, moncoupon.santepubliquefrance.fr, operates separately from the agency's other sites and systems.

About 80,000 contact records were affected. The database was used to ship ordered materials and contained email addresses, postal addresses and telephone numbers. Santé publique France stressed that it did not contain medical data, diagnoses or social-security numbers. That distinction matters: this is a public-health-sector breach, but not a breach of medical records.

The service was placed into maintenance, passwords were cleared and the CNIL was notified. The initial access path was not disclosed by the agency. Posts attributed to the attacker described administrator access and use of an export function, but those details are an attacker account, not an official technical finding.

## Detailed timeline

| Date | Event |
|---|---|
| 11 August 2026 | An online claim about the platform appears, according to incident reporting. |
| 13 August 2026 | Santé publique France confirms that a contractor-operated ordering platform has been attacked and that about 80,000 contact records are concerned. |
| 13-14 August 2026 | The platform is placed into maintenance, credentials are cleared, CNIL is notified and French media publish the agency's clarification that the database contains no health or social-security data. |
| 16 August 2026 | No public agency technical postmortem or confirmed initial-access vector has been identified. |

## What happened and how the attack worked

The confirmed architecture matters more than an unverified exploit story. The affected service was a separate contractor-hosted platform used for ordering prevention materials. Santé publique France said it was independent of the agency's other websites and systems.

The attacker claimed to have obtained administrator rights and used an export function. Without a primary technical account, those statements should remain labeled as claims. The incident still demonstrates the supplier problem: a small external application can hold a large set of official-brand contact information and create reputational risk for the public body even when its core systems are untouched.

## Data accessed, exposed or extracted

The exposed information consisted of contact and delivery fields such as email, postal address and telephone number. Reporting on samples also referred to professional role or organization for some records. The agency-confirmed scale is approximately 80,000 people.

## What was not affected, or is not established

Santé publique France said there were no medical records, diagnoses or social-security numbers in the affected database. The platform was separate from the agency's other systems.

## Operational and public impact

The biggest practical risk is health-themed impersonation. Victims may be more likely to trust a message that knows their contact information and refers to a real prevention-material order or Santé publique France context. The brand association can therefore amplify phishing even without clinical data.

## Attacker claims, attribution and uncertainty

Online claims about administrator access and export functionality are not an agency technical statement. They are useful leads for future investigation but should not be merged into the confirmed method field.

## Response, investigation and remediation

The platform was taken into maintenance, passwords were cleared, the CNIL was notified and restoration work began. Public communications emphasized that no health or social-security data was present and warned about follow-on fraud.

## What changed after the first reporting

The seed record is accurate. Because the case was only days old at the research cutoff, method, contractor root cause and any later law-enforcement result remain open.

## Press and official quotes

> « aucune donnée de santé »
>
> “no health data”
>
> Source: Santé publique France, reported by French press

## Evidence assessment

**High-confidence facts** in this dossier are drawn from first-party disclosures, regulator material, parliamentary testimony, prosecutor statements, or multiple mutually consistent reputable reports.

**Reported but not officially confirmed** details are explicitly described as reporting, allegations, criminal claims or analytical context. They are not promoted into the confirmed method or victim-count fields.

**Counts are semantic.** Accounts, bank accounts, files, records, employees, pupils and operational users are not interchangeable. Unknown person counts remain unknown.

## Sources

1. **Le Parisien with AFP** (13 August 2026), [Cyberattaque d'un prestataire de Santé publique France : 80 000 personnes concernées](https://www.leparisien.fr/faits-divers/cyberattaque-dun-prestataire-de-sante-publique-france-80-000-personnes-concernees-par-la-fuite-de-donnees-13-08-2026-FTP4SNTQI5DOVMQDCBBTQX5F4U.php). _Secondary, agency confirmation._
2. **E-Sante** (14 August 2026), [Cyberattaque chez Santé publique France : les données de contact de 80 000 usagers piratées](https://www.e-sante.fr/cyberattaque-chez-sante-publique-france-les-donnees-de-contact-de-80-000-usagers-piratees/actualite/744070). _Secondary._
