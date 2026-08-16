# French Interior Ministry: compromised mailboxes, police portal access and sensitive file extraction

_Research cutoff: 16 August 2026_

## At a glance

| Field | Finding |
|---|---|
| Organization | French Interior Ministry |
| Sector | Law enforcement |
| Incident date | December 2025 |
| Status | Confirmed; early mass-extraction claim disproved by later official detail |
| Affected scope | No verified person count. Official later detail: 72 TAJ files plus tens of thousands of TAJ index rows, 23 FPR files plus about 3,000 FPR index elements, and 1 Interpol file exfiltrated after 10 were viewed. |

## Executive summary

The Interior Ministry intrusion is the clearest example in this collection of why early attacker claims should not be converted into victim statistics. A criminal actor claimed access to data on more than 16 million people. The minister later rejected the idea that millions of complete records had been extracted.

A detailed Senate hearing on 13 January 2026 reconstructed the compromise. On 25 November 2025, the police noticed passwords to several professional mailboxes had been changed. Services reset passwords on 28 November. By 8 December, the ministry knew an unauthorized person had reached a Police nationale portal and several applications. Compromised mailboxes contained application passwords that agents had exchanged in email, an internal security-hygiene failure that helped the attacker move from messaging to police systems.

The portal exposed roughly 150 applications. The attacker consulted seven. The most sensitive were TAJ, the criminal-records treatment system, FPR, the wanted-persons file, and Interpol records. The minister later said 72 full TAJ files were exfiltrated along with tens of thousands of index-like TAJ lines; 23 FPR files and about 3,000 index elements were taken; 10 Interpol files were viewed and one was exfiltrated. No destruction or modification was reported.

A 22-year-old suspect was arrested on 17 December and later placed under judicial investigation and detention. The ministry accelerated MFA across applications and carried out account cleanup, logging review and retrospective threat hunting.

## Detailed timeline

| Date | Event |
|---|---|
| 25 November 2025 | DGPN notices that passwords to several police mailboxes have been changed. |
| 28 November 2025 | Services reset mailbox passwords themselves. |
| 8 December 2025 | The ministry knows that an unauthorized person has accessed a Police nationale portal and several applications. A criminal investigation is opened with OFAC involvement. |
| 12 December 2025 | A later Senate hearing page labels the malicious intrusion as occurring on this date. Because the minister's detailed chronology establishes unauthorized portal access by 8 December, this should not be treated as the first-access date. |
| 16 December 2025 | Later official discussion says no further traces of active attack were found after this period. |
| 17 December 2025 | Minister Laurent Nuñez publicly confirms access to TAJ and FPR and extraction of dozens of confidential files. A 22-year-old suspect is arrested. |
| 20 December 2025 | Press reports the suspect has been placed under formal investigation and remanded. |
| 13 January 2026 | Nuñez gives the Senate a detailed technical and data-scope reconstruction, including the 72 TAJ, 23 FPR and Interpol figures and MFA remediation. |

## What happened and how the attack worked

The attack path was strongly identity-driven. Compromised professional mailboxes gave the attacker access to messages in which some agents had exchanged passwords for internal applications. Those credentials opened a police portal shared across services and enabled access to applications that were not protected by stronger factors.

Nuñez told senators that applications already protected by MFA were attempted but not successfully penetrated. That detail turns this case into unusually direct evidence of the defensive value of MFA after a mailbox compromise.

The initial failure was not a single exotic exploit. It was a chain: professional mailbox compromise, poor handling of application passwords in email, reuse of credentials to internal applications, then selective querying and extraction from sensitive police systems.

## Data accessed, exposed or extracted

TAJ contains around 19 million files, but the attacker did not export all of them. The minister said 72 complete TAJ files were exfiltrated, together with tens of thousands of summary or index lines containing identity information but not the reason for a person's TAJ listing.

For FPR, the minister said 23 complete files and around 3,000 summary elements were extracted. Ten Interpol files were viewed and one was exfiltrated.

These quantities are operational record counts, not a clean number of unique natural persons. The correct database victim field therefore remains unknown rather than 16.4 million.

## What was not affected, or is not established

The minister said there was no extraction of millions of complete police records and no ransom demand. No destruction or modification of the police files was reported. An HR application available through the portal was not visited, according to the later hearing.

## Operational and public impact

The sensitivity of even a small number of full police records is extreme. They can contain investigative, law-enforcement or personal information whose disclosure may affect witnesses, suspects, officers or active operations. Index rows can also be damaging because identity data from a police context can enable targeting or intimidation.

The incident also became a governance case study: it showed that a hardened central database can still be exposed through weaker identity practices on surrounding systems.

## Attacker claims, attribution and uncertainty

A group using the name Indra claimed access to more than 16 million people and associated the figure with police files. That number closely resembled the size of TAJ rather than the amount later shown to have been extracted. Later ministerial testimony establishes a far narrower, though still serious, extraction. The 16.4 million claim should remain labeled as disputed attacker marketing.

## Response, investigation and remediation

The ministry opened a criminal investigation, arrested a suspect, reset administrative messaging passwords, removed roughly a thousand accounts belonging to departed personnel, worked with ANSSI on retrospective hunting and log review, and expanded MFA. Nuñez said MFA would be generalized across ministry applications, and the ministry reviewed access profiles and messaging practices.

## What changed after the first reporting

The original database's 'dozens of files' description was reasonable immediately after the disclosure, but the January Senate hearing provides a much better final scope. The case should now record the precise categories and counts disclosed by the minister while preserving the fact that a unique-person total is unknown.

## Press and official quotes

> « Ce qui s'est passé est très grave »
>
> “What happened is very serious”
>
> Source: Laurent Nuñez

> « hygiène numérique »
>
> “digital hygiene”
>
> Source: Laurent Nuñez, Senate hearing

## Evidence assessment

**High-confidence facts** in this dossier are drawn from first-party disclosures, regulator material, parliamentary testimony, prosecutor statements, or multiple mutually consistent reputable reports.

**Reported but not officially confirmed** details are explicitly described as reporting, allegations, criminal claims or analytical context. They are not promoted into the confirmed method or victim-count fields.

**Counts are semantic.** Accounts, bank accounts, files, records, employees, pupils and operational users are not interchangeable. Unknown person counts remain unknown.

## Sources

1. **Sénat** (13 January 2026), [Commission des lois, audition de Laurent Nuñez](https://www.senat.fr/compte-rendu-commissions/20260112/lois.html). _Primary parliamentary testimony._
2. **Sénat** (13 January 2026), [Audition de Laurent Nuñez](https://www.senat.fr/actualite/audition-de-laurent-nunez-6388.html). _Primary._
3. **Assemblée nationale** (17 December 2025), [Compte rendu de la première séance du mercredi 17 décembre 2025](https://questions.assemblee-nationale.fr/dyn/17/comptes-rendus/seance/session-ordinaire-de-2025-2026/premiere-seance-du-mercredi-17-decembre-2025). _Primary parliamentary record._
4. **Public Sénat** (13 January 2026), [Cyberattaque contre le ministère de l'Intérieur : Laurent Nuñez va généraliser la double identification](https://www.publicsenat.fr/actualites/politique/cyberattaque-contre-le-ministere-de-linterieur-laurent-nunez-va-generaliser-la-double-identification-pour-lacces-aux-applications). _Secondary, parliamentary specialist._
5. **Le Monde** (17 December 2025), [Hackers pirate French Interior Ministry databases](https://www.lemonde.fr/en/pixels/article/2025/12/17/hackers-pirate-french-interior-ministry-databases_6748599_13.html). _Secondary._
6. **France 24** (17 December 2025), [Des dizaines de fichiers sensibles du ministère de l'Intérieur volés](https://www.france24.com/fr/info-en-continu/20251217-des-dizaines-de-fichiers-sensibles-du-ministere-de-l-interieur-voles-lors-dune-attaque-informatique). _Secondary._
