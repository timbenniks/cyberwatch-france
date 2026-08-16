# Bouygues Telecom: 6.4 million customer accounts exposed

_Research cutoff: 16 August 2026_

## At a glance

| Field | Finding |
|---|---|
| Organization | Bouygues Telecom |
| Sector | Telecommunications |
| Incident date | 4 August 2025 |
| Status | Confirmed |
| Affected scope | 6.4 million customer accounts |

## Executive summary

Bouygues Telecom detected a cyberattack on 4 August 2025 and disclosed it two days later. The intrusion gave unauthorized access to personal data linked to 6.4 million customer accounts. The scale made it one of France's largest corporate data breaches of the year.

The exposed fields included contact and civil-status information, contract information and banking identifiers such as BIC and IBAN. For some professional customers, the public guidance also referred to company identifiers such as SIREN. Bouygues said account passwords and payment-card numbers were not exposed.

An IBAN does not itself provide online-banking access, but it materially improves the credibility of bank, telecom and direct-debit scams. Bouygues notified the CNIL, filed a complaint and contacted affected customers by email or SMS.

## Detailed timeline

| Date | Event |
|---|---|
| 4 August 2025 | Bouygues Telecom detects the attack and its technical teams stop the unauthorized access. |
| 6 August 2025 | Public disclosure: 6.4 million accounts; CNIL notified; complaint filed; customer notification begins. |
| 13 August 2025 | Bouygues and Cybermalveillance.gouv.fr publish or amplify practical guidance on phishing, IBAN-related fraud and direct-debit disputes. |
| 4 February 2026 | Cybermalveillance.gouv.fr's public advice page is updated, preserving the 6.4 million-account scope and fraud guidance. |

## What happened and how the attack worked

Bouygues has described the event as unauthorized access and said its technical teams stopped it. The company has not publicly identified the initial access vector, a vulnerability, or an attacker. Any stronger claim about how the intruder entered the environment would go beyond the published evidence.

## Data accessed, exposed or extracted

The public scope includes customer contact details, civil-status information, contract data, and BIC/IBAN. Cybermalveillance's public summary also notes company identity and SIREN for relevant professional records. The 6.4 million figure is a count of customer accounts, not necessarily 6.4 million unique natural persons.

## What was not affected, or is not established

Bouygues said customer account passwords and payment-card numbers were not exposed. Possession of an IBAN does not equal possession of bank credentials and does not automatically allow an attacker to move money.

## Operational and public impact

The durable risk is targeted impersonation. A scammer who knows a victim's operator, identity, contract context and IBAN can convincingly pose as a telecom employee, bank fraud unit, debt collector or payment intermediary. The exposure can also support fraudulent direct-debit attempts, although banks provide dispute mechanisms for unauthorized debits.

## Attacker claims, attribution and uncertainty

No reliable public attribution has been established by Bouygues. The incident should not be assigned to a named group solely because telecom companies were being targeted during the same period.

## Response, investigation and remediation

Bouygues contained the unauthorized access, notified the CNIL, filed a criminal complaint and informed affected customers. Its FAQ explained what an IBAN can and cannot enable and referred customers to their bank when suspicious activity appears. Cybermalveillance.gouv.fr published public guidance designed to reduce follow-on fraud.

## What changed after the first reporting

The database entry is stable. The most important precision is semantic: the confirmed 6.4 million number is customer accounts, and the presence of IBAN data should not be described as a compromise of online banking.

## Press and official quotes

> « accès non autorisé à certaines données personnelles de 6,4 millions de comptes clients »
>
> “unauthorized access to certain personal data of 6.4 million customer accounts”
>
> Source: Bouygues Telecom

## Evidence assessment

**High-confidence facts** in this dossier are drawn from first-party disclosures, regulator material, parliamentary testimony, prosecutor statements, or multiple mutually consistent reputable reports.

**Reported but not officially confirmed** details are explicitly described as reporting, allegations, criminal claims or analytical context. They are not promoted into the confirmed method or victim-count fields.

**Counts are semantic.** Accounts, bank accounts, files, records, employees, pupils and operational users are not interchangeable. Unknown person counts remain unknown.

## Sources

1. **Bouygues Telecom** (6 August 2025), [Bouygues Telecom, victime d'une cyberattaque](https://www.corporate.bouyguestelecom.fr/archives-communique-presse/bouygues-telecom-annonce-avoir-ete-victime-dune-cyberattaque/). _Primary._
2. **Bouygues Telecom** (August 2025), [Cyberattaque et fuite de données : on répond à vos questions](https://mag.bouyguestelecom.fr/cybersecurite/cyberattaque-fuite-de-donnees-questions/). _Primary._
3. **Cybermalveillance.gouv.fr** (August 2025, updated 4 February 2026), [Violation de données personnelles de l'opérateur Bouygues Telecom](https://www.cybermalveillance.gouv.fr/tous-nos-contenus/actualites/violation-de-donnees-personnelles-bouygues-telecom-202508). _Official public guidance._
4. **Le Monde** (7 August 2025), [Le piratage d'ampleur de Bouygues Telecom confirme que les opérateurs télécoms sont dans le viseur](https://www.lemonde.fr/economie/article/2025/08/07/le-piratage-d-ampleur-de-bouygues-telecom-confirme-que-les-operateurs-telecoms-sont-dans-le-viseur-des-cybercriminels_6627266_3234.html). _Secondary._
5. **TechCrunch** (7 August 2025), [Data breach at French telecom giant Bouygues affects millions of customers](https://techcrunch.com/2025/08/07/data-breach-at-french-telecom-giant-bouygues-affects-millions-of-customers/). _Secondary._
