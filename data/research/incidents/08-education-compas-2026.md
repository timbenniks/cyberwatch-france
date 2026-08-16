# Education Ministry / COMPAS: 243,000 staff records exfiltrated

_Research cutoff: 16 August 2026_

## At a glance

| Field | Finding |
|---|---|
| Organization | French Education Ministry / COMPAS |
| Sector | Education |
| Incident date | 15 March 2026 |
| Status | Confirmed |
| Affected scope | About 243,000 agents, trainees and permanent staff |

## Executive summary

An attacker used an impersonated external account to reach COMPAS, the Education Ministry information system used for management of trainee teachers. The fraudulent access occurred on 15 March 2026. The ministry's security operations center was alerted on 19 March after unauthorized dissemination of COMPAS data was identified.

Initial investigation found that about 243,000 agents, including trainees and permanent staff recorded in the system, had data exfiltrated. The exposed fields included identity details, postal addresses, telephone numbers and periods of absence, without the medical reason for the absence. Tutor names and professional telephone numbers were also in scope.

The ministry suspended external access, opened a crisis cell, checked other systems, notified ANSSI and the CNIL, and filed a complaint. A Senate response later specified that CNIL notification occurred on 21 March, the complaint on 24 March, and individual notification was planned by 1 April.

## Detailed timeline

| Date | Event |
|---|---|
| 15 March 2026 | Fraudulent access to COMPAS occurs after impersonation of an external account. |
| 19 March 2026 | COSSIM, the ministry security operations center, is alerted to unauthorized dissemination of COMPAS data. External access is closed and a crisis cell is activated. |
| 21 March 2026 | CNIL is notified, according to a later Senate response. |
| 23-24 March 2026 | Public disclosure and reporting establish an approximate 243,000-person scope. |
| 24 March 2026 | Complaint is filed, according to the minister's Senate response. |
| By 1 April 2026 | The ministry says the 243,000 people concerned will be individually informed. |

## What happened and how the attack worked

The ministry says the access followed impersonation of an external account. It does not describe a software vulnerability in COMPAS or explain how the external account was obtained.

The event is therefore best classified as compromised credentials used for valid authenticated access. It belongs in the same identity-risk family as FICOBA and later Education Ministry incidents, but it should not be assumed that the credential theft technique was identical.

## Data accessed, exposed or extracted

The ministry lists names and other identity information, postal addresses, phone numbers and periods of absence without the health reason. Tutor identity and professional telephone numbers were also exposed.

The 243,000 figure is an official approximate person count, unlike several other incidents in this collection where only accounts or records are counted.

## What was not affected, or is not established

The official disclosure emphasized that absence periods did not include the underlying health reason. The public primary source reviewed does not provide evidence for broader claims about medical files or banking credentials.

## Operational and public impact

Teachers and other staff expressed concern that the data could be used to locate or target them. Real home addresses, phone numbers and employment context can support harassment, impersonation and tailored fraud even when the dataset does not contain passwords.

## Attacker claims, attribution and uncertainty

Security reporting said samples later appeared on data-trading venues, but the official 243,000 figure is the appropriate scope for the confirmed record. Any reseller's sample size or advertised volume should remain separate.

## Response, investigation and remediation

The ministry suspended external access to COMPAS, activated a crisis cell, carried out checks across other systems, notified ANSSI and the CNIL, filed a complaint and informed staff. In parliamentary debate, the minister also described a wider government security program focused on MFA, segmentation and reduced application exposure.

## What changed after the first reporting

The seed record remains accurate. The later Senate response supplies useful dates for CNIL notification, complaint and individual notification and strengthens the cross-case conclusion that credential impersonation is a recurring weakness.

## Press and official quotes

> « usurpation d'un compte externe »
>
> “impersonation of an external account”
>
> Source: Education Ministry

> « environ 243 000 agents »
>
> “about 243,000 agents”
>
> Source: Education Ministry

## Evidence assessment

**High-confidence facts** in this dossier are drawn from first-party disclosures, regulator material, parliamentary testimony, prosecutor statements, or multiple mutually consistent reputable reports.

**Reported but not officially confirmed** details are explicitly described as reporting, allegations, criminal claims or analytical context. They are not promoted into the confirmed method or victim-count fields.

**Counts are semantic.** Accounts, bank accounts, files, records, employees, pupils and operational users are not interchangeable. Unknown person counts remain unknown.

## Sources

1. **Ministry of Education** (23-24 March 2026), [Incident de sécurité affectant les données de certains personnels de l'éducation nationale](https://www.education.gouv.fr/incident-de-securite-affectant-les-donnees-de-certains-personnels-de-l-education-nationale-470657). _Primary._
2. **Sénat** (26 March 2026), [Cyber protection des administrations](https://www.senat.fr/questions/base/2026/qSEQ26030760G.html). _Primary ministerial response._
3. **RTL** (24 March 2026), [L'inquiétude des enseignants après le piratage des coordonnées de 243.000 agents](https://www.rtl.fr/actu/sciences-tech/ils-peuvent-nous-localiser-l-inquietude-des-enseignants-apres-le-piratage-des-coordonnees-de-243-000-agents-de-l-education-nationale-7900616158). _Secondary._
4. **AEF Info** (23 March 2026), [À la suite d'un nouveau piratage, les données de 243 000 enseignants...](https://www.aefinfo.fr/depeche/747986). _Secondary._
