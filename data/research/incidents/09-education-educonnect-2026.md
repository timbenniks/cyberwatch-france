# Education Ministry / ÉduConnect: authorized-account impersonation plus an account-management vulnerability

_Research cutoff: 16 August 2026_

## At a glance

| Field | Finding |
|---|---|
| Organization | French Education Ministry / ÉduConnect |
| Sector | Education |
| Incident date | Late 2025, disclosed 14 April 2026 |
| Status | Confirmed breach; exact student count still not officially established at the research cutoff |
| Affected scope | Unknown official student count. Criminal claims of 3.5 million pupils and 7.2 million report cards remain claims, not the ministry's verified scope. |

## Executive summary

The Education Ministry disclosed on 14 April 2026 that pupil data had been exfiltrated from a service adjacent to ÉduConnect. The ministry's account identifies two distinct security failures. First, an authorized staff account was impersonated at the end of 2025, allowing fraudulent access to the pupil-account management service. Second, a security flaw in that service, identified in December 2025 and later fixed, was exploited shortly before remediation.

The exposed official field list was first name, last name, ÉduConnect identifier, school and class, email address when supplied by the pupil, and activation code for accounts that had not yet been activated. The ministry said already activated accounts belonging to pupils and their guardians were not compromised. It reset activation codes and blocked accounts that had not yet been distributed and activated.

Criminal-group claims were much larger, including claims of 3.5 million pupils and millions of report cards. Even after later reporting linked the DumpSec group to ÉduConnect and French police arrested alleged DumpSec members in June, the ministry's public statement still did not validate those advertised counts or the expanded document scope. Le Monde reported on 18 April that the ministry still did not know the exact number of affected pupils.

## Detailed timeline

| Date | Event |
|---|---|
| End of 2025 | An authorized staff account is impersonated, giving fraudulent access to the pupil-account management service linked to ÉduConnect. |
| December 2025 | A vulnerability in the service is identified. The ministry says it was exploited shortly before the flaw was fixed. |
| 12 April 2026 | A criminal group publicly advertises data it claims came from the education environment, including a multi-million-pupil figure. |
| 14 April 2026 | The Education Ministry publicly confirms exfiltration but says the exact pupil count is still under evaluation. |
| 18 April 2026 | Le Monde reports that the ministry still does not know the exact number of pupils affected and places the breach in a wider pattern of education-sector attacks. |
| 9 June 2026 | French investigators arrest seven people reported as alleged members of DumpSec in a broader investigation into more than 1,500 targeted entities. |
| 12 June 2026 | Security reporting publicly connects the arrests with a wider DumpSec campaign and repeats the group's ÉduConnect claims. Those numbers still remain outside the ministry's confirmed count. |

## What happened and how the attack worked

Unlike COMPAS, this incident combines compromised identity with a software weakness. The ministry says an authorized staff account was impersonated and that a vulnerability in the account-management service was exploited shortly before it was fixed.

The public statement does not name the vulnerability, provide a CVE, or explain the precise request sequence. It is therefore inappropriate to invent a technical label beyond the ministry's description. The combination is nevertheless important: a valid privileged identity widened the attacker's reach, and a vulnerable service then enabled data download beyond the school initially targeted.

## Data accessed, exposed or extracted

Officially confirmed fields are pupil first and last name, ÉduConnect identifier, school and class, email if provided, and activation code only for accounts not yet activated at the time of the incident.

The ministry confirmed data exfiltration. It did not publish a final pupil count by the research cutoff. Criminal claims of 3.5 million pupils and 7.2 million report cards have been repeated in the press, including after alleged DumpSec arrests, but they are not a substitute for a ministry-verified scope.

## What was not affected, or is not established

The ministry says accounts already activated by pupils and their guardians were not compromised and could continue to be used safely. It reset codes for unactivated accounts and blocked undistributed or unactivated accounts. The official field list does not include health data or social-security numbers.

## Operational and public impact

Because the dataset concerns minors and schools, the main risk is highly credible school-themed phishing aimed at pupils and parents. School, class, identity and activation context can be used to impersonate a school administrator, parent portal or account-support process.

## Attacker claims, attribution and uncertainty

DumpSec or accounts attributed to the group advertised a much larger scope, including millions of pupil records and report cards. Later law-enforcement reporting linked DumpSec to a large number of French compromises, and press accounts connected the group to ÉduConnect. That can strengthen attribution confidence at the campaign level without validating every number in the group's sales post. The victim count therefore remains officially unknown.

## Response, investigation and remediation

The ministry suspended access to the affected service, activated a crisis cell, reset activation codes, blocked unactivated accounts, began strengthening access with MFA, notified ANSSI and CNIL, and filed a complaint. Families were warned to be alert to school-themed fraud.

## What changed after the first reporting

The strongest addition after the seed database is the June law-enforcement development: alleged DumpSec members were arrested in a broader French investigation. This improves the attribution context but does not resolve the official student count. The database should continue to keep affected as null until a government number is published.

## Press and official quotes

> « le nombre exact est en cours d'évaluation »
>
> “the exact number is being evaluated”
>
> Source: Education Ministry

> « usurpation d'identité du compte d'un personnel habilité »
>
> “impersonation of an authorized staff member's account”
>
> Source: Education Ministry

## Evidence assessment

**High-confidence facts** in this dossier are drawn from first-party disclosures, regulator material, parliamentary testimony, prosecutor statements, or multiple mutually consistent reputable reports.

**Reported but not officially confirmed** details are explicitly described as reporting, allegations, criminal claims or analytical context. They are not promoted into the confirmed method or victim-count fields.

**Counts are semantic.** Accounts, bank accounts, files, records, employees, pupils and operational users are not interchangeable. Unknown person counts remain unknown.

## Sources

1. **Ministry of Education** (14 April 2026), [Incident de sécurité affectant les données de certains élèves de l'Éducation nationale](https://www.education.gouv.fr/incident-de-securite-affectant-les-donnees-de-certains-eleves-de-l-education-nationale-504443). _Primary._
2. **Le Monde** (18 April 2026), [L'éducation nationale, une cible vulnérable face aux cyberattaques](https://www.lemonde.fr/pixels/article/2026/04/18/fuites-de-donnees-l-education-nationale-une-cible-vulnerable-face-aux-cyberattaques_6681062_4408996.html). _Secondary._
3. **Anadolu Agency** (14 April 2026), [Cyberattaque contre l'Éducation nationale : des données d'élèves compromises](https://www.aa.com.tr/fr/france/cyberattaque-contre-l-%C3%A9ducation-nationale-des-donn%C3%A9es-d-%C3%A9l%C3%A8ves-compromises/3905581). _Secondary._
4. **01net** (12 June 2026), [Fuite de données : la France arrête 7 jeunes hackers après plus de 1500 cyberattaques](https://www.01net.com/actualites/fuite-donnees-france-arrete-7-jeunes-hackers-apres-plus-1500-cyberattaques.html). _Secondary, law-enforcement reporting._
