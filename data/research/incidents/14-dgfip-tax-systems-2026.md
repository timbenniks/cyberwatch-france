# DGFiP tax systems: stolen credentials and 678,000 tax records

_Research cutoff: 16 August 2026_

## At a glance

| Field | Finding |
|---|---|
| Organization | Direction générale des Finances publiques |
| Sector | Finance / tax |
| Incident date | June and July 2026, publicly confirmed 14 August 2026 |
| Status | Confirmed; investigation ongoing at the research cutoff |
| Affected scope | 678,000 individuals and businesses in the official 14 August count |

## Executive summary

The DGFiP confirmed on 14 August 2026 that two illegitimate-access incidents in June and July had relied on stolen or impersonated credentials belonging to a DGFiP agent and an authorized third party. When the intrusions were detected, access to the implicated accounts was cut. At that time, however, the access-control review did not identify that data had already been stolen.

The decisive trigger came on 12 and 13 August, when a malicious actor publicly claimed the intrusions. DGFiP then matched the claims against its logs and established that data concerning a total of 678,000 individuals and businesses had been consulted and extracted before access was terminated.

For individuals the official release lists tax information such as reference taxable income, household quotient and withholding-tax rate. For businesses it cites company name and SIREN. Cadastral data about property addresses and surface areas were also consulted. The secured impots.gouv.fr user spaces were not compromised, and the personal or business users' login identifiers and passwords were not stolen.

The investigation remained active at the research cutoff. DGFiP planned individual notifications from the week of 17 August and said it would file a criminal complaint. On 16 August, French reporting said the Paris prosecutor's cyber section had opened an investigation entrusted to OFAC.

## Detailed timeline

| Date | Event |
|---|---|
| Late June 2026 | A DGFiP agent account is compromised or impersonated. Access is detected and cut. Data theft is not identified at that moment. |
| July 2026 | A second illegitimate-access incident occurs using credentials of an authorized third party, according to the Finance Ministry's later statement. |
| 12 August 2026 | A malicious actor publicly claims access. DGFiP begins deeper investigation against historical logs. |
| 13 August 2026 | A further claim or disclosure is made by the malicious actor. |
| 14 August 2026 | Finance Ministry confirms 678,000 individuals and businesses in the established extracted or consulted scope, CNIL notification and preventive access cuts. User tax-space credentials are said to be unaffected. |
| 16 August 2026 | French reporting says the Paris prosecutor's cyber section has opened an investigation and entrusted it to OFAC. |
| Week of 17 August 2026 | DGFiP plans to contact each affected individual or business with details of the data that may have been consulted or extracted. |

## What happened and how the attack worked

The official account says the incidents rested on credential impersonation: one DGFiP agent and one authorized third party. The Finance Ministry has not publicly supplied the complete authentication architecture or confirmed the attacker's claims about specific remote-access products.

DGFiP said the theft was missed during the initial response because the attack was sophisticated. Press reporting based on a briefing by director-general Amélie Verdier adds that extraction was slow or broken into patterns that did not look like obvious bulk querying. That is an important detection lesson: cutting off a compromised credential is necessary, but a response also needs historical review for unusual queries and data movement that occurred before containment.

Criminal posts described a VPN and made additional claims about bypassing authentication controls. Those claims should remain separate from the official method unless DGFiP publishes confirmation.

## Data accessed, exposed or extracted

The written government statement sets the confirmed combined scope at 678,000 individuals and businesses. It lists reference taxable income, household quotient, withholding-tax rate, business name and SIREN, plus cadastral information relating to addresses and property surface areas.

Press briefing coverage separately reported a cadastral consultation involving around 200,000 accounts. Because the 14 August written release does not establish that as a second additive victim population, this resource does not add 200,000 to 678,000. Doing so could double count people or mix account and person semantics.

## What was not affected, or is not established

The Finance Ministry said individual and business 'Finances publiques' spaces were not compromised and that user identifiers and passwords for those spaces were not compromised. Stolen tax data can make fraud extremely convincing, but it does not itself provide a login to a taxpayer's secured account.

## Operational and public impact

This is one of the highest-risk identity datasets in the collection because it reveals both personal identity and financial circumstances. A scammer who knows a victim's reference income, household quotient and withholding rate can convincingly impersonate the tax authority, a bank, accountant or wealth-management service.

For high-income households, disclosure may also create targeting and physical-security concerns that go beyond ordinary email phishing.

## Attacker claims, attribution and uncertainty

The malicious actor made larger statements about the scale and access path. Those claims were useful because they caused DGFiP to reopen historical analysis, but the chartable victim number is the government's 678,000. The written release also says the exact nature and volume of extracted data and the final number of users concerned were still being investigated, so even the 678,000 figure should be understood as the established scope at 14 August, not necessarily the final endpoint of the inquiry.

## Response, investigation and remediation

DGFiP cut access associated with the compromised accounts, then made additional preventive cuts to sensitive information systems after the August discoveries. It notified the CNIL, worked with SHFDS and ANSSI, planned individual notification, and announced a criminal complaint. Reporting on 16 August said a Paris prosecutor investigation had been opened with OFAC.

## What changed after the first reporting

This case was evolving during the research. The seed database's separate approximately 200,000 cadastral-account note comes from briefing coverage, while the official written release presents cadastral data within an ongoing combined investigation. The safer resource design is to keep 678,000 as the confirmed numeric field, explain the separate press-reported cadastral figure in prose, and avoid summing them.

## Press and official quotes

> « un total de 678 000 particuliers et professionnels »
>
> “a total of 678,000 individuals and businesses”
>
> Source: Finance Ministry

> « n'ont pas été compromis »
>
> “were not compromised”, referring to users' secured tax spaces and credentials
>
> Source: Finance Ministry

## Evidence assessment

**High-confidence facts** in this dossier are drawn from first-party disclosures, regulator material, parliamentary testimony, prosecutor statements, or multiple mutually consistent reputable reports.

**Reported but not officially confirmed** details are explicitly described as reporting, allegations, criminal claims or analytical context. They are not promoted into the confirmed method or victim-count fields.

**Counts are semantic.** Accounts, bank accounts, files, records, employees, pupils and operational users are not interchangeable. Unknown person counts remain unknown.

## Sources

1. **Ministry of Finance** (14 August 2026), [Accès illégitimes au système d'information de la Direction générale des Finances publiques](https://presse.economie.gouv.fr/acces-illegitime-au-systeme-dinformation-de-la-direction-generale-des-finances-publiques/). _Primary._
2. **Le Monde** (14 August 2026), [French taxpayers' data stolen in hack of Finance Ministry](https://www.lemonde.fr/en/pixels/article/2026/08/14/french-taxpayers-data-stolen-in-hack-of-finance-ministry_6756510_13.html). _Secondary._
3. **Le Figaro** (14 August 2026), [Piratage de l'administration fiscale : la DGFiP révèle les contours du vol de données de 678 000 comptes](https://www.lefigaro.fr/conjoncture/piratage-de-l-administration-fiscale-la-dgfip-revele-les-contours-du-vol-de-donnees-de-678-000-comptes-20260814). _Secondary, briefing detail._
4. **Entrevue** (16 August 2026), [Piratage du fisc : le parquet de Paris ouvre une enquête sur 678 000 victimes](https://entrevue.fr/societe/piratage-du-fisc-le-parquet-de-paris-ouvre-une-enquete-sur-678-000-victimes/). _Secondary, judicial update._
