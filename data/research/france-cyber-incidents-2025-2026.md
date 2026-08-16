# France Cyberwatch 2025-2026: researched incident dossier

_Research cutoff: 16 August 2026_

This package turns the France Cyberwatch incident database into a source-driven research dossier. The database is used as an index and evidence-policy seed, not as an authority that overrides later reporting.

## Methodology

The research follows five rules:

1. **Primary sources first.** Company statements, ministries, regulators, parliamentary hearings and prosecutor material are preferred for incident scope.
2. **Chronology beats first impressions.** Early statements are preserved, but later forensic or judicial findings can revise them. Orange and the Interior Ministry are strong examples.
3. **Counts retain their meaning.** A customer account, bank account, employee, patient record, police file and unique person are different units. Numbers are not summed when their populations may overlap.
4. **Attacker claims stay labeled.** Criminal sales posts are useful leads, not verified victim statistics.
5. **Unknown stays unknown.** If a final count, entry vector or attribution is not public, the resource says so.

## National context

ANSSI reported 3,586 security events in 2025, including 2,209 reports and 1,366 incidents. It identified 460 events as possible data leaks, but only 42 percent could be associated with an established leak. This is a useful warning against equating every claim or suspicious event with confirmed exfiltration.

CNIL reported a record 6,167 personal-data breach notifications in 2025 and said roughly one in two reported incidents involved hacking. CNIL's own summary highlights three themes that are visible throughout this dossier: no sector is spared, breaches are becoming more massive, and service providers are frequently involved.

Primary national sources:
- [ANSSI, Panorama de la cybermenace 2025](https://cyber.gouv.fr/actualites/panorama-de-la-cybermenace-2025/)
- [CNIL, Annual report 2025](https://www.cnil.fr/en/annual-report-2025)

## Incident index

| # | Incident | Date | Sector | Confirmed / usable affected count | Core issue |
|---:|---|---|---|---|---|
| 1 | [Orange](incidents/01-orange-2025.md) | 25 July 2025 | Telecommunications | No verified customer-person count. A limited set of business-related internal data was later acknowledged as stolen. | Unknown entry vector; limited data theft later acknowledged |
| 2 | [Air France / KLM](incidents/02-air-france-klm-2025.md) | 6 August 2025 | Aviation | Unknown number of customers | Third-party customer-service platform |
| 3 | [Bouygues Telecom](incidents/03-bouygues-telecom-2025.md) | 4 August 2025 | Telecommunications | 6.4 million customer accounts | Unauthorized access; 6.4m customer accounts |
| 4 | [WEDA](incidents/04-weda-2025.md) | 10 November 2025 | Healthcare | About 23,000 health professionals were operationally affected. Patient-record count was not established in the public material reviewed. | Authenticated account abuse plus cross-tenant API authorization weakness |
| 5 | [Eurofiber France](incidents/05-eurofiber-france-2025.md) | 13 November 2025 | Telecom / cloud supplier | No verified natural-person count. French customer ticketing and Cloud Infra portal data were in scope. | SQL injection and REST API exfiltration |
| 6 | [French Interior Ministry](incidents/06-interior-ministry-2025.md) | December 2025 | Law enforcement | No verified person count. Official later detail: 72 TAJ files plus tens of thousands of TAJ index rows, 23 FPR files plus about 3,000 FPR index elements, and 1 Interpol file exfiltrated after 10 were viewed. | Compromised mailboxes and passwords reused to police apps |
| 7 | [DGFiP / FICOBA](incidents/07-ficoba-2026.md) | Late January to 13 February 2026 | Finance / tax | About 1.2 million bank accounts, not necessarily 1.2 million unique people | Compromised authorized inter-ministry credentials |
| 8 | [French Education Ministry / COMPAS](incidents/08-education-compas-2026.md) | 15 March 2026 | Education | About 243,000 agents, trainees and permanent staff | Impersonated external account |
| 9 | [French Education Ministry / ÉduConnect](incidents/09-education-educonnect-2026.md) | Late 2025, disclosed 14 April 2026 | Education | Unknown official student count. Criminal claims of 3.5 million pupils and 7.2 million report cards remain claims, not the ministry's verified scope. | Impersonated authorized account plus application flaw |
| 10 | [France Titres / ANTS](incidents/10-france-titres-ants-2026.md) | 15 April 2026 | Identity / public services | About 11.7 million individual and professional accounts may be concerned | Large portal data disclosure; official root cause still under investigation |
| 11 | [French Education Ministry](incidents/11-education-staff-training-2026.md) | Night of 25 July 2026 | Education | A 'significant number' of agents who had worked in academies since 2001; exact count not published | Impersonated professional account |
| 12 | [CEVA Logistics](incidents/12-ceva-logistics-2026.md) | 29 July to 1 August 2026 | Logistics / supply chain | Unknown person count; at least eight European warehouses and multiple downstream clients | Supply-chain / warehouse systems; root cause unknown |
| 13 | [Santé publique France contractor-hosted ordering platform](incidents/13-sante-publique-france-contractor-2026.md) | 13 August 2026 disclosure | Public health | About 80,000 users | Contractor-hosted ordering platform |
| 14 | [Direction générale des Finances publiques](incidents/14-dgfip-tax-systems-2026.md) | June and July 2026, publicly confirmed 14 August 2026 | Finance / tax | 678,000 individuals and businesses in the official 14 August count | Compromised DGFiP and third-party credentials |

## The main corrections to the seed database

### WEDA is now technically clearer

WEDA's own CNIL-notification material shows that the attack was not merely an unspecified intrusion. An authenticated customer account generated abnormal API calls at 17:00 on 10 November. The API could return patient data outside that professional's own patient set. A second customer account repeated the pattern around 21:00, and the platform was shut at 23:00. WEDA still said the approximate number of affected patient records and people was under investigation.

### The Interior Ministry scope is much narrower than the criminal claim, but more detailed than the first disclosure

The January 2026 Senate hearing gives the best public reconstruction. The attacker used compromised police mailboxes and application passwords found in email to reach a police portal. The minister later quantified extraction as 72 TAJ files plus tens of thousands of TAJ summary lines, 23 FPR files plus about 3,000 FPR summary elements, and one Interpol file after 10 were viewed. The criminal 16.4 million claim should not be used as a victim count.

### ANTS has a later judicial development

A 15-year-old was arrested on 25 April and publicly identified by the Paris prosecutor on 30 April as suspected of contributing to the ANTS data leak. This postdates the principal 21 April technical update. It strengthens the judicial history without changing the official 11.7 million potential-account scope or proving the larger criminal claims.

### ÉduConnect now has stronger attribution context but still no official final pupil count

French investigators arrested seven alleged DumpSec members in June in a broader investigation. Security reporting connected the group to ÉduConnect and repeated the group's claim of 3.5 million pupils and millions of report cards. The Education Ministry, however, had still not published a final student count in the official material reviewed. The numeric field should therefore remain unknown.

### The August DGFiP case was still evolving at the cutoff

The written Finance Ministry release confirms 678,000 individuals and businesses in the established consulted or extracted scope and says cadastral data was also consulted. Briefing coverage discussed a separate approximately 200,000 cadastral-account figure. Because the written release does not establish that as an additive second victim population, this resource does not sum it with 678,000.

## Cross-incident analysis

### 1. Valid credentials repeatedly became the attack path

FICOBA, COMPAS, the Education staff-training system, the Interior Ministry and the August DGFiP breach all demonstrate variations of the same problem: the attacker does not need to look like an attacker at login time when they possess a valid identity. This shifts the defensive requirement from authentication alone to phishing-resistant MFA, least privilege, segmentation, short-lived sessions, behavioral detection and high-quality query logging.

The Interior Ministry hearing is especially instructive because the minister said applications already protected by MFA were attempted but not penetrated. That is unusually direct public evidence that a stronger factor stopped lateral movement after a mailbox compromise.

### 2. Authorization matters as much as authentication

WEDA shows a different failure mode. A caller could be legitimately authenticated and still retrieve data outside the authorized customer boundary because the API did not sufficiently constrain object access. The result is a reminder that login security cannot compensate for broken authorization rules inside an application.

### 3. Suppliers multiply blast radius

Air France-KLM, Eurofiber, CEVA and the Santé publique France ordering platform all involve third parties or supplier environments. The downstream organization may have no compromised core network at all and still face customer notification, fraud risk and reputational damage because a supplier holds support, delivery or contact data.

### 4. Support and ticketing data is security data

The Eurofiber case demonstrates why help-desk and ticketing systems deserve high classification. Tickets can expose contact identities, configuration context and attachments. Even without payment data, they can provide excellent reconnaissance for attacking customer organizations.

### 5. Detection frequently happened after the damaging action

In the August DGFiP case, access was cut when suspicious credentials were found, but historical extraction was only established after an attacker claim caused investigators to reexamine logs. In the Interior Ministry case, several dates separate first mailbox anomalies, password resets and knowledge of portal access. Good incident response therefore needs retrospective query and exfiltration analysis, not just credential reset.

### 6. Breach notification language must distinguish 'no evidence' from 'did not happen'

Orange is the cleanest illustration. The company first said there was no evidence of exfiltration. Later it acknowledged a limited leak. A robust database should represent those as sequential findings rather than rewriting the first statement as false or leaving it as the final truth.

### 7. Exposed data creates a second attack surface

IBANs, tax details, school identities, delivery histories and government-account metadata all make impersonation easier. The breach may be the first stage, not the final harm. Victims should expect delayed phishing and fraud months after the initial news cycle.

## Combined chronology

| Date | Incident | Development |
|---|---|---|
| 25 Jul 2025 | Orange | Attack detected |
| 4 Aug 2025 | Bouygues Telecom | Attack detected, 6.4m customer accounts later confirmed |
| 6 Aug 2025 | Air France-KLM | Third-party customer-service breach disclosed |
| 10 Nov 2025 | WEDA | Abnormal API activity, then full shutdown |
| 13 Nov 2025 | Eurofiber France | Monitoring detects SQLi/API exfiltration campaign |
| Nov-Dec 2025 | Interior Ministry | Mailbox compromise develops into police-application access |
| Late Jan-13 Feb 2026 | FICOBA | Illegitimate queries using authorized third-administration credentials |
| 15 Mar 2026 | COMPAS | External account impersonation and exfiltration |
| Late 2025-Apr 2026 | ÉduConnect | Account impersonation plus application flaw, disclosed 14 Apr |
| 15 Apr 2026 | ANTS | Portal incident detected |
| 25 Jul 2026 | Education staff-training | Professional account impersonated |
| 29 Jul-1 Aug 2026 | CEVA Logistics | European warehouse intrusion window |
| 13 Aug 2026 | Santé publique France contractor | 80k-contact-record breach confirmed |
| 14 Aug 2026 | DGFiP tax systems | Government confirms 678k established scope after June/July intrusions |

## What organizations should learn

- Use phishing-resistant MFA on privileged, remote and database access.
- Do not treat email as a password vault. Search for credentials in mail and eliminate the practice.
- Separate routine identity from bulk-data privilege.
- Enforce authorization at every API object and tenant boundary.
- Alert on unusual query volume, unusual enumeration patterns and low-and-slow extraction, not just large downloads.
- Treat ticketing, CRM, logistics and ordering suppliers as part of the security perimeter.
- Minimize data retained by suppliers and delete it quickly when operational need ends.
- Preserve high-fidelity logs long enough to reconstruct what a compromised account did before it was disabled.
- In public communications, say precisely whether a fact is confirmed, suspected, attacker-claimed or still under investigation.

## What affected people should learn

A caller or message knowing a real IBAN, tax figure, school, recent order, home address or government-service identifier is not proof that the sender is legitimate. Open official services directly rather than using links in unexpected messages, use unique passwords and MFA, and preserve suspicious messages if stolen data appears to be used against you.

## Files in this package

- `README.md` - package guide and methodology
- `france-cyber-incidents-2025-2026.md` - this master research article
- `incidents/` - one maintainable dossier per incident
- `sources/source-register.md` - consolidated source register

# Full incident dossiers


# Orange: July 2025 intrusion and later data publication

_Research cutoff: 16 August 2026_

## At a glance

| Field | Finding |
|---|---|
| Organization | Orange |
| Sector | Telecommunications |
| Incident date | 25 July 2025 |
| Status | Confirmed incident; data-loss assessment changed after the first disclosure |
| Affected scope | No verified customer-person count. A limited set of business-related internal data was later acknowledged as stolen. |

## Executive summary

Orange detected a cyberattack on one of its information systems on 25 July 2025. Its first public statement, issued on 28 July, emphasized containment and service disruption: Orange Cyberdefense isolated potentially affected services, which interrupted some business-management platforms and several consumer-facing services, mainly in France. At that point the company said it had found no evidence that Orange or customer data had been exfiltrated.

That initial conclusion did not survive the investigation unchanged. In August, material attributed to the intrusion appeared on a criminal leak site. Orange then acknowledged that the attacker had obtained limited access and that old or low-sensitivity information concerning business customers had been taken. Reporting linked the publication to the WarLock extortion operation and described roughly 4 GB of data. Orange did not publicly confirm a mass theft of its French consumer-customer database, and the separate Orange Belgium event affecting about 850,000 accounts should not be merged into this incident.

The key lesson is evidentiary: the 28 July statement was accurate only as a statement of what the company knew then. A durable incident record has to preserve the later revision rather than freezing the first press release as the final truth.

## Detailed timeline

| Date | Event |
|---|---|
| 25 July 2025 | Orange detects a cyberattack on one information system. Incident response begins. |
| 28 July 2025 | Orange publicly discloses the incident, says affected services were isolated, confirms a complaint, and says there is no evidence of data exfiltration at that stage. |
| 30 July 2025 | Orange's initial recovery target for the principal disrupted services, under heightened monitoring. |
| Mid-August 2025 | Material attributed to Orange is published on a criminal leak site. Reporting associates the publication with WarLock. |
| 25-26 August 2025 | ZDNet and 01net report that Orange has acknowledged limited access and theft of old or low-sensitivity business-related information. Orange still does not confirm theft of a French mass consumer database. |

## What happened and how the attack worked

Orange has not published a definitive initial-access vector for this incident. The public record therefore does not support claims that a particular vulnerability, phishing technique, remote-access product, or credential set was the entry point.

What is confirmed is the defensive sequence. Orange isolated services considered potentially affected, and the isolation itself caused part of the visible outage. Later security reporting characterized the event as a ransomware or extortion incident associated with WarLock, but that attribution is based on criminal-site activity and reporting rather than an Orange technical postmortem. It should be treated as well-supported reporting, not as a formal attribution by the company.

The later disclosure also matters technically because it establishes that containment did not happen before every read or copy operation. The attacker obtained enough access to remove at least some data, even though Orange initially had no evidence of exfiltration.

## Data accessed, exposed or extracted

Later reporting, quoting an Orange spokesperson, described the stolen material as old or low-sensitivity data related to business customers and as the result of only limited access. ZDNet reported that seven internal documents appeared on the leak site and that the criminals claimed a larger set existed.

There is still no public, verified number of individuals affected by the France incident. The evidence does not justify substituting the separate Orange Belgium figure, treating the criminal group's claimed file volume as a victim count, or asserting that French consumer account credentials were stolen.

## What was not affected, or is not established

Orange did not confirm theft of passwords, payment-card data, or a French consumer customer database in this incident. The Orange Belgium breach disclosed later in August was described by Orange as a separate event and should be tracked separately.

## Operational and public impact

The immediate impact was operational: disruption to business-management services and some consumer services while systems were isolated. The secondary impact was trust and disclosure risk, because the public account evolved from no evidence of exfiltration to an acknowledged limited leak.

For affected business customers, even old operational documents can have value for reconnaissance, impersonation, supplier fraud, and follow-on phishing. The practical risk depends on the content and age of each file, which Orange has not catalogued publicly.

## Attacker claims, attribution and uncertainty

Reporting linked the leak to the WarLock ransomware or extortion ecosystem and cited a criminal claim of around 4 GB. Orange did not publish a formal attacker attribution. The criminal claim is useful as context for why data appeared publicly, but it should not be treated as an authoritative description of the intrusion or its full scope.

## Response, investigation and remediation

Orange Cyberdefense isolated affected or potentially affected services, Orange filed a complaint, and authorities were notified. Services were progressively restored under enhanced monitoring. After data appeared publicly, Orange said affected companies had been informed before publication and that it was cooperating with them and the competent authorities.

## What changed after the first reporting

The database seed correctly captured the first disclosure but must be read together with the August follow-up. The strongest final formulation is: Orange initially found no evidence of exfiltration, then later acknowledged that a limited set of older or low-sensitivity business-related data had been stolen and published. The scope of affected people remains unknown.

## Press and official quotes

> « isoler les services potentiellement concernés et limiter les impacts »
>
> “isolate the potentially affected services and limit the impact”
>
> Source: Orange, 28 July 2025

> « un accès limité »
>
> “limited access”
>
> Source: Orange spokesperson, reported by 01net

> « des données obsolètes ou de faible sensibilité »
>
> “old or low-sensitivity data”
>
> Source: Orange spokesperson, reported by 01net

## Evidence assessment

**High-confidence facts** in this dossier are drawn from first-party disclosures, regulator material, parliamentary testimony, prosecutor statements, or multiple mutually consistent reputable reports.

**Reported but not officially confirmed** details are explicitly described as reporting, allegations, criminal claims or analytical context. They are not promoted into the confirmed method or victim-count fields.

**Counts are semantic.** Accounts, bank accounts, files, records, employees, pupils and operational users are not interchangeable. Unknown person counts remain unknown.

## Sources

1. **Orange** (28 July 2025), [The Orange Group announces that it filed a complaint on Monday, 28 July concerning a security incident](https://newsroom.orange.com/the-orange-group-announces-that-it-filed-a-complaint-on-monday-28-july-concerning-a-security-incident-on-one-of-its-information-systems/?lang=eng). _Primary._
2. **ZDNet France** (25 August 2025), [La cyberattaque d'Orange se solde finalement par une fuite de données](https://www.zdnet.fr/actualites/la-cyberattaque-dorange-se-solde-finalement-par-une-fuite-de-donnees-480732.htm). _Secondary._
3. **01net** (26 August 2025), [Cyberattaque contre Orange : les données piratées ont été diffusées sur le dark web](https://www.01net.com/actualites/cyberattaque-contre-orange-donnees-piratees-diffusees-dark-web.html). _Secondary._


# Air France and KLM: third-party customer-service breach

_Research cutoff: 16 August 2026_

## At a glance

| Field | Finding |
|---|---|
| Organization | Air France / KLM |
| Sector | Aviation |
| Incident date | 6 August 2025 |
| Status | Confirmed; victim count not publicly disclosed |
| Affected scope | Unknown number of customers |

## Executive summary

Air France and KLM disclosed in early August 2025 that an external platform used for customer service had been accessed without authorization. The airlines stressed that the compromised environment was a third-party customer-service platform, not their core airline networks.

The exposed information was particularly useful for social engineering even though it did not include the most sensitive travel or payment credentials. Customer notices and reporting identified names, contact details, Flying Blue membership number and status, and the subject of customer-service requests. Some notices also referred to notes connected with those interactions.

The airlines said passwords, passport numbers, payment-card information, travel itineraries and Flying Blue mileage balances were not affected. The number of customers was never publicly disclosed. Air France reported the breach to the CNIL and KLM to the Dutch data-protection authority.

## Detailed timeline

| Date | Event |
|---|---|
| 6 August 2025 | Air France and KLM begin public notification of unauthorized access to an external customer-service platform. |
| 7 August 2025 | Security press reports the breach and confirms the companies will not disclose the victim count while the investigation is active. |
| 8 August 2025 and after | Additional coverage details the data fields and places the incident in a broader wave of attacks against third-party CRM and customer-support environments. |

## What happened and how the attack worked

The airlines confirmed that the unauthorized activity occurred on an external platform used by their contact centers. They said their own networks were not affected. They did not publicly name the vendor in their initial statements.

Security reporting connected the incident to a broader campaign in which attackers used social engineering against organizations relying on third-party CRM services. BleepingComputer specifically asked whether Salesforce was involved; the company declined to confirm that point. The defensible formulation is therefore that a third-party customer-service platform was compromised, while the specific vendor and initial social-engineering path remain unconfirmed by Air France-KLM.

## Data accessed, exposed or extracted

Confirmed or consistently reported exposed fields included names, contact information, Flying Blue membership number and status, and the subject of requests made to customer service. That combination can let a fraudster construct highly plausible messages that refer to a real loyalty account and a genuine prior support issue.

## What was not affected, or is not established

The airlines said passwords, passport numbers, payment-card data, travel data or itineraries, and Flying Blue mileage balances were not affected. Core Air France and KLM networks were also described as unaffected.

## Operational and public impact

The direct operational impact appears limited compared with incidents that took production systems offline. The primary risk is fraud: an attacker can use real support history and loyalty information to impersonate an airline, claim a booking or account issue, or attempt credential theft through a fake support flow.

## Attacker claims, attribution and uncertainty

Some security reporting associated the breach with a larger Salesforce-targeting campaign. Because Air France-KLM did not confirm the vendor or campaign, the relationship should remain an analytical hypothesis rather than a fact in a case timeline.

## Response, investigation and remediation

The companies and the external provider cut off the unauthorized access, took measures intended to prevent recurrence, notified data-protection authorities, and contacted affected customers. Customers were warned about suspicious email and telephone contact.

## What changed after the first reporting

The original dataset remains broadly accurate. The main discipline to preserve is that the victim count is unknown and the possible Salesforce connection is not company-confirmed.

## Press and official quotes

> “unusual activity on an external platform we use for customer service”
>
> Statement published in English
>
> Source: Air France-KLM statement

> “direct action to stop the unauthorized access”
>
> English rendering of the airline's response
>
> Source: KLM customer communication

## Evidence assessment

**High-confidence facts** in this dossier are drawn from first-party disclosures, regulator material, parliamentary testimony, prosecutor statements, or multiple mutually consistent reputable reports.

**Reported but not officially confirmed** details are explicitly described as reporting, allegations, criminal claims or analytical context. They are not promoted into the confirmed method or victim-count fields.

**Counts are semantic.** Accounts, bank accounts, files, records, employees, pupils and operational users are not interchangeable. Unknown person counts remain unknown.

## Sources

1. **KLM** (August 2025), [KLM informeert klanten over incident met persoonsgegevens](https://nieuws.klm.com/klm-informeert-klanten-over-incident-met-persoonsgegevens/). _Primary._
2. **ITPro** (August 2025), [Air France and KLM confirm customer data stolen in third-party breach](https://www.itpro.com/security/data-breaches/air-france-and-klm-confirm-customer-data-stolen-in-third-party-breach). _Secondary._
3. **BleepingComputer** (7 August 2025), [Air France and KLM disclose data breaches impacting customers](https://www.bleepingcomputer.com/news/security/air-france-and-klm-disclose-data-breaches-impacting-customers/). _Secondary._
4. **SecurityWeek** (7 August 2025), [Air France, KLM Say Hackers Accessed Customer Data](https://www.securityweek.com/air-france-klm-say-hackers-accessed-customer-data/). _Secondary._


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


# WEDA: cross-tenant API abuse, patient-data risk and care disruption

_Research cutoff: 16 August 2026_

## At a glance

| Field | Finding |
|---|---|
| Organization | WEDA |
| Sector | Healthcare |
| Incident date | 10 November 2025 |
| Status | Confirmed breach; exact number of patients affected remained under investigation in the primary notification material |
| Affected scope | About 23,000 health professionals were operationally affected. Patient-record count was not established in the public material reviewed. |

## Executive summary

The WEDA incident is more technically specific than the initial press coverage suggested. WEDA's own material prepared to help customers complete CNIL breach notifications states that monitoring detected an abnormal activity spike at 17:00 on 10 November 2025 on a customer account making many API calls. Investigation showed that the API, once a user was authenticated to a WEDA customer account, could return patient data in WEDA databases even when those patients were not attached to that healthcare professional's account.

WEDA contacted the holder of the first account, who said they had left the practice and were not responsible for the activity. WEDA disabled that account and blocked the source IP. Around 21:00, a second customer account showed the same API-call pattern. At 23:00 WEDA shut the application for all users to contain the incident.

This incident therefore should no longer be described merely as an unspecified intrusion. The evidence supports a combination of compromised or misused authenticated customer accounts plus an authorization weakness in API endpoints that allowed cross-tenant patient-data access. WEDA's notification material classified the event as a confidentiality loss and listed patients as the affected category, while explicitly stating that the approximate number of records and people was still under investigation.

The service shutdown had a separate operational effect. Around 23,000 health professionals lost normal access to patient records, prescribing and billing workflows. Partial, degraded service returned on 14 November with stronger authentication requirements and vulnerable endpoints decommissioned.

## Detailed timeline

| Date | Event |
|---|---|
| 10 November 2025, 17:00 | WEDA monitoring detects abnormal API activity on a customer account. |
| 10 November 2025, after 17:00 | WEDA determines the account can call an API that returns patient data beyond the authenticated professional's own patient set. The account holder says they are not responsible for the activity. WEDA disables the account and blocks the source IP. |
| 10 November 2025, around 21:00 | A second WEDA customer account shows the same abnormal API methodology. |
| 10 November 2025, 23:00 | WEDA closes the application to all users to contain the incident and investigate. |
| 11 November 2025 | CNIL says it has been informed of the WEDA data breach from this date. |
| 12 November 2025 | WEDA mobilizes forensic support, files a complaint with the Police nationale, and begins exchanges with ANSSI. |
| 12-13 November 2025 | WEDA reviews the Pro Santé Connect login process and tightens source-IP restrictions. |
| 14 November 2025 | Partial access resumes. Login plus password alone is no longer sufficient for health professionals; Pro Santé Connect or CPx authentication is required, and vulnerable endpoints are decommissioned. |
| 14 November 2025 onward | Service continues in degraded mode while fixes are applied and verified. Public and professional debate continues over exact patient exposure and notification obligations. |

## What happened and how the attack worked

WEDA's own CNIL-notification guidance is the strongest public technical source reviewed. It establishes that the suspicious activity came through authenticated customer accounts and that the relevant API had an authorization boundary problem: a connected customer account could query patient data not attached to that professional.

That is materially different from saying only that an attacker broke into a server. The likely security failure was not simply authentication but authorization. Authentication established that the caller possessed a valid session. The API then failed to sufficiently constrain what that session could retrieve.

The material does not establish how the attacker obtained control of the customer accounts. It labels the cause as an external malicious act and places the incident in the hacking, malware or phishing category for CNIL notification, but it does not prove whether phishing, credential stuffing, account reuse or another technique was used.

The remediation is also revealing. WEDA decommissioned vulnerable endpoints, required stronger healthcare authentication mechanisms for the partial reopening, and reviewed Pro Santé Connect. Those actions strongly support the conclusion that access control around authenticated API calls was central to containment.

## Data accessed, exposed or extracted

WEDA's primary material says the API could call patient data stored in WEDA databases across customer boundaries. It instructs customer organizations to classify the affected category as patients and says the approximate number of records and persons remained under investigation.

That evidence supports a patient-data confidentiality breach risk. It does not support inventing a national patient count. The 23,000 figure repeatedly reported in the press is the number of health professionals operationally affected by the shutdown, not the number of patients whose records were accessed.

Some local providers later told their own patients that their specific practice had not identified health data as compromised. Those local conclusions should not be generalized into a claim that no WEDA patient data anywhere was accessed.

## What was not affected, or is not established

No reliable public final total of affected patient records was found. The evidence also does not establish mass export of all WEDA patient records. The exact content and volume accessed per compromised account remain important unresolved questions in the public record.

## Operational and public impact

The outage immediately disrupted care workflows. Clinicians temporarily worked without normal electronic access to histories, prescriptions, correspondence and billing tools, sometimes reverting to paper and asking patients to bring recent documents.

The confidentiality risk is unusually serious because the system stores health information. Even where an incident does not involve millions of records, unauthorized access to a smaller subset of medical data can create significant privacy and discrimination risks.

## Attacker claims, attribution and uncertainty

Early media coverage used cautious language about possible partial extraction. WEDA's later CNIL-notification material gives stronger evidence of cross-tenant patient-data access capability but still leaves the count unresolved. Claims of a mass national patient dump remain unsupported by the sources reviewed.

## Response, investigation and remediation

WEDA shut the service, disabled suspicious accounts, blocked source IP addresses, brought in forensic support, contacted ANSSI, filed a police complaint and supported CNIL notification. Before reopening, it reviewed authentication, tightened network restrictions, decommissioned vulnerable endpoints, and restricted professional login to stronger healthcare authentication methods during the degraded recovery period.

## What changed after the first reporting

This dossier materially updates the seed database. The initial description of an unspecified intrusion is too vague given WEDA's later primary document. The public record now supports a more precise account: authenticated customer accounts were used to call APIs, the API could return patient data outside the customer's own scope, and WEDA treated the event as a confidentiality breach. The affected patient count still should remain unknown.

## Press and official quotes

> « un pic d'activité anormal »
>
> “an abnormal activity spike”
>
> Source: WEDA CNIL-notification material

> « Perte de la confidentialité »
>
> “loss of confidentiality”
>
> Source: WEDA CNIL-notification material

> « toujours en cours d'investigation »
>
> “still under investigation”
>
> Source: WEDA CNIL-notification material

## Evidence assessment

**High-confidence facts** in this dossier are drawn from first-party disclosures, regulator material, parliamentary testimony, prosecutor statements, or multiple mutually consistent reputable reports.

**Reported but not officially confirmed** details are explicitly described as reporting, allegations, criminal claims or analytical context. They are not promoted into the confirmed method or victim-count fields.

**Counts are semantic.** Accounts, bank accounts, files, records, employees, pupils and operational users are not interchangeable. Unknown person counts remain unknown.

## Sources

1. **WEDA** (November 2025), [Complétude du formulaire de notification CNIL](https://assistance.weda.fr/hubfs/2025-11_Notification%20violation%20CNIL%20WEDA.pdf). _Primary technical and regulatory material._
2. **CNIL** (November 2025 onward), [Question on WEDA breach notification](https://www.cnil.fr/en/cnil-direct/question/2652). _Official regulator._
3. **Le Monde** (18 November 2025), [Une cyberattaque contre Weda, logiciel utilisé par des milliers de médecins, provoque paralysie et fuite de données](https://www.lemonde.fr/pixels/article/2025/11/18/une-cyberattaque-contre-weda-logiciel-utilise-par-des-milliers-de-medecins-provoque-paralysie-et-fuite-de-donnees_6653915_4408996.html). _Secondary._
4. **01net** (November 2025), [Cyberattaque inquiétante en France : des données médicales auraient été piratées](https://www.01net.com/actualites/cyberattaque-inquietante-france-donnees-medicales-auraient-piratees-23-000-professionnels-sante-paralyses.html). _Secondary._
5. **Caducee.net** (19 November 2025), [Cyberattaque Weda : 23 000 soignants concernés](https://www.caducee.net/actualite-medicale/16693/cyberattaque-weda-23-000-soignants-concernes.html). _Secondary._
6. **AVEC Santé Nouvelle-Aquitaine** (17 November 2025), [Cyberattaque du logiciel WEDA : que s'est-il passé et comment réagir pour une MSP?](https://avecsantena.fr/cyberattaque-du-logiciel-weda-que-sest-il-passe-et-comment-reagir-pour-une-msp/). _Sector guidance._


# Eurofiber France: ticketing vulnerability, SQL injection and API exfiltration

_Research cutoff: 16 August 2026_

## At a glance

| Field | Finding |
|---|---|
| Organization | Eurofiber France |
| Sector | Telecom / cloud supplier |
| Incident date | 13 November 2025 |
| Status | Confirmed with unusually detailed post-incident disclosure |
| Affected scope | No verified natural-person count. French customer ticketing and Cloud Infra portal data were in scope. |

## Executive summary

Eurofiber France published one of the most useful technical postmortems in this collection. The incident affected its customer ticketing platform for Eurofiber France and regional brands, plus the ATE / Eurofiber Cloud Infra France customer portal.

The company traced the first activity to 6 November 2025, when the attacker used blind SQL injection against the user database. From 10 November, exfiltration intensified through REST API calls targeting tickets and documents. Monitoring detected anomalies on 13 November at 14:49, after which Eurofiber activated a crisis response, created forensic copies, isolated systems and patched the flaw.

The affected information included identification data, hashed passwords, ticket content and exchanges, and a limited set of attachments. Eurofiber said banking or other critical data were not compromised and that the integrity of its network and cloud services was not affected. The company later deployed MFA, hardened API token handling and added controls intended to reduce the chance of recurrence.

## Detailed timeline

| Date | Event |
|---|---|
| 6 November 2025 | Earliest traces identified later: blind SQL injection targeting the user database. |
| 10 November 2025 | Exfiltration intensifies through REST API calls targeting tickets and documents. |
| 13 November 2025, 14:49 | Monitoring detects abnormal activity. |
| 13 November 2025, afternoon | Crisis response begins; forensic preservation and containment actions are initiated. |
| 13 November 2025, 18:15 | Eurofiber reports the vulnerability patched and the affected server isolated. |
| November-December 2025 | Customer notification, regulatory notification and hardening continue. Eurofiber publishes a post-incident review with root cause and remediation detail. |

## What happened and how the attack worked

Eurofiber states that a vulnerability in the ticketing software, known in the security community under a CVE reference, permitted SQL injection and API-based data extraction. A customized version in Eurofiber's environment had not been identified by the vendor as vulnerable.

The company did not name the product or CVE in its own postmortem. Later security reporting may identify the software, but that detail should remain separate from the official technical account unless independently verified.

This is a classic example of an internet-facing business system becoming a bridge to sensitive operational context. Ticketing systems often contain hostnames, architecture details, troubleshooting logs, screenshots and attachments. Even when payment data is absent, those records can help an attacker map downstream customers.

## Data accessed, exposed or extracted

Eurofiber listed identification data such as name, first name, email, hashed password and, where present, phone or profile information. Ticket content, ticket exchanges and some attachments were also affected. The company said only about 2 percent of the oldest tickets had attachments in the affected category, which is still potentially sensitive depending on content.

The scope included Eurofiber France and regional brands Eurafibre, FullSave, Netiwan and Avelia, plus the Eurofiber Cloud Infra France portal. Customers outside France were reported unaffected.

## What was not affected, or is not established

Eurofiber said banking or critical data were not compromised. It also said the integrity and availability of the underlying network and cloud services were not compromised by the attack.

## Operational and public impact

The direct service impact was limited, but the downstream intelligence value is significant. A supplier's support tickets can expose configuration details about many organizations at once. This is why the incident belongs in the supplier-exposure category even without a large public victim count.

## Attacker claims, attribution and uncertainty

Later reporting named a ticketing product and a threat actor. Eurofiber's own postmortem did not. This resource therefore keeps those claims out of the confirmed technical core.

## Response, investigation and remediation

Eurofiber activated a crisis cell with its SOC provider, preserved forensic evidence, isolated and patched the vulnerable service, rotated passwords and API keys, tightened IP restrictions, notified customers and authorities, and introduced stronger authentication and API-token protection. The company also reported an extortion attempt in its follow-up.

## What changed after the first reporting

The seed database is strong here. The postmortem justifies keeping the methodDisclosure field at fully disclosed for the exploitation mechanism, while still leaving the attacker's identity unconfirmed.

## Press and official quotes

> “The first traces of the attack date back to November 6”
>
> Official English-language passage
>
> Source: Eurofiber France post-incident review

> « injection SQL »
>
> “SQL injection”
>
> Source: Eurofiber France

## Evidence assessment

**High-confidence facts** in this dossier are drawn from first-party disclosures, regulator material, parliamentary testimony, prosecutor statements, or multiple mutually consistent reputable reports.

**Reported but not officially confirmed** details are explicitly described as reporting, allegations, criminal claims or analytical context. They are not promoted into the confirmed method or victim-count fields.

**Counts are semantic.** Accounts, bank accounts, files, records, employees, pupils and operational users are not interchangeable. Unknown person counts remain unknown.

## Sources

1. **Eurofiber France** (13 November 2025), [Incident de cybersécurité chez Eurofiber France](https://www.eurofiber.com/fr-fr/actualites/incident-de-cybersecurite-chez-eurofiber-france). _Primary._
2. **Eurofiber France** (December 2025), [Incident de cybersécurité du 13 novembre : enseignements et actions engagées](https://www.eurofiber.com/fr-fr/actualites/incident-de-cybersecurite-du-13-novembre-enseignements-et-actions-engagees). _Primary technical postmortem._
3. **Eurofiber Cloud Infra** (22 December 2025), [Incident de cybersécurité : enseignements et actions engagées](https://eurofibercloudinfra.fr/2025/12/22/incident-de-cybersecurite-du-13-novembre-enseignements-et-actions-engagees/). _Primary related brand._


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


# DGFiP / FICOBA: stolen inter-ministry credentials and 1.2 million bank-account records

_Research cutoff: 16 August 2026_

## At a glance

| Field | Finding |
|---|---|
| Organization | DGFiP / FICOBA |
| Sector | Finance / tax |
| Incident date | Late January to 13 February 2026 |
| Status | Confirmed |
| Affected scope | About 1.2 million bank accounts, not necessarily 1.2 million unique people |

## Executive summary

From late January through 13 February 2026, an attacker used credentials belonging to a civil servant outside the DGFiP who was authorized to query FICOBA for inter-ministry information exchange. About 1.2 million bank-account records, less than 1 percent of the register according to government material, were consulted or extracted.

FICOBA is a register of bank accounts opened in France. The exposed information included bank-account identifiers such as RIB and IBAN, account-holder identity and postal address. The Finance Ministry explicitly said the tax identifier was not consulted during the illegitimate access. FICOBA does not store account balances or transaction history, so the breach did not give the attacker the ability to see or move funds directly.

A later parliamentary response is important because it identifies the security boundary correctly: the compromise came through an authorized account in another administration, not through exploitation of a software flaw in FICOBA itself.

## Detailed timeline

| Date | Event |
|---|---|
| Late January 2026 | Illegitimate FICOBA consultations begin using the credentials of an authorized civil servant outside DGFiP. |
| 13 February 2026 | Last day of the illegitimate access window stated in later parliamentary answers. |
| 16 February 2026 | DGFiP makes its first CNIL notification, according to a later parliamentary response. |
| 18 February 2026 | Finance Ministry publicly discloses the incident and the approximately 1.2 million-account scope. |
| 23 February 2026 | DGFiP supplements its CNIL notification. |
| 24 February 2026 onward | Banks receive securely transmitted information about their accounts that were in the illegitimately consulted set. |
| March-June 2026 | Government FAQs and parliamentary answers clarify that the compromised account belonged to another administration and that external access remained restricted pending hardening. |

## What happened and how the attack worked

The attack used valid credentials attached to an authorized inter-ministry user. The government has not published how those credentials were stolen. A parliamentary response explicitly states that the incident resulted from use of an account in a third administration and was not the result of a software vulnerability in FICOBA.

This distinction is central. The security problem is identity and privilege control across administrative boundaries: an account legitimately able to query a national financial register was compromised, and the downstream system accepted its requests as authorized until the misuse was detected.

## Data accessed, exposed or extracted

Exposed fields included RIB or IBAN, account-holder identity and postal address. The Finance Ministry said the tax identifier was not consulted during the illegal access.

The 1.2 million figure refers to bank accounts. One person can hold more than one account and one account can have multiple holders. It must not be relabeled as 1.2 million unique victims without a separate person-level count.

## What was not affected, or is not established

FICOBA does not contain account balances or transaction history. The incident did not compromise bank passwords, impots.gouv.fr passwords or access to taxpayers' secured tax spaces. An IBAN is sensitive for fraud and impersonation, but it is not a credential that grants online-banking control.

## Operational and public impact

The most credible downstream harms are targeted bank and tax phishing, identity fraud and attempts to create unauthorized direct debits. The combination of a real identity, address and IBAN is especially useful for a fake-bank adviser or administrative impersonation scam.

## Attacker claims, attribution and uncertainty

No named attacker attribution is supported by the official record reviewed. The case should remain unattributed unless judicial or government evidence is later published.

## Response, investigation and remediation

DGFiP restricted external access, worked with ANSSI and ministry security officials, notified the CNIL, filed a complaint, contacted affected users, and provided banks with account-level information so they could strengthen monitoring and customer warnings. Later parliamentary responses say external access remained cut while security work continued.

## What changed after the first reporting

The dataset's broad account is confirmed by later parliamentary material. The most useful addition is the explicit government statement that the compromised credentials belonged to a civil servant outside DGFiP and that the incident was not a FICOBA software exploit.

## Press and official quotes

> « usurpé les identifiants d'un fonctionnaire »
>
> “impersonated or used a civil servant's credentials”
>
> Source: Finance Ministry

> « 1,2 millions de comptes »
>
> “1.2 million accounts”
>
> Source: Finance Ministry

## Evidence assessment

**High-confidence facts** in this dossier are drawn from first-party disclosures, regulator material, parliamentary testimony, prosecutor statements, or multiple mutually consistent reputable reports.

**Reported but not officially confirmed** details are explicitly described as reporting, allegations, criminal claims or analytical context. They are not promoted into the confirmed method or victim-count fields.

**Counts are semantic.** Accounts, bank accounts, files, records, employees, pupils and operational users are not interchangeable. Unknown person counts remain unknown.

## Sources

1. **Ministry of Finance** (18 February 2026), [Accès illégitimes au fichier national des comptes bancaires (FICOBA)](https://presse.economie.gouv.fr/acces-illegitimes-au-fichier-national-des-comptes-bancaires-ficoba/). _Primary._
2. **Ministry of Economy and Finance** (3 March 2026), [FICOBA : tout savoir à l'accès illégitime](https://www.economie.gouv.fr/actualites/ficoba-tout-savoir-lacces-illegitime-au-fichier-national-des-comptes-bancaires). _Primary._
3. **impots.gouv.fr** (February 2026), [Accès illégitimes au fichier national des comptes bancaires](https://www.impots.gouv.fr/actualite/acces-illegitimes-au-fichier-national-des-comptes-bancaires-ficoba). _Primary._
4. **Assemblée nationale** (28 April 2026 response), [Question n°13230 : Fuite de données personnelles du fichier FICOBA](https://questions.assemblee-nationale.fr/q17/17-13230QE.htm). _Primary parliamentary answer._
5. **Assemblée nationale** (9 June 2026 response), [Question n°13370 : Information et accompagnement des usagers à la suite d'un incident FICOBA](https://questions.assemblee-nationale.fr/q17/17-13370QE.htm). _Primary parliamentary answer._


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


# France Titres / ANTS: 11.7 million accounts potentially concerned

_Research cutoff: 16 August 2026_

## At a glance

| Field | Finding |
|---|---|
| Organization | France Titres / ANTS |
| Sector | Identity / public services |
| Incident date | 15 April 2026 |
| Status | Confirmed incident; technical origin and exact downloaded volume remained under investigation in the principal official update |
| Affected scope | About 11.7 million individual and professional accounts may be concerned |

## Executive summary

France Titres, also known as ANTS, detected a security incident on 15 April 2026 involving the ants.gouv.fr portal. The 21 April official update said about 11.7 million individual and professional accounts could be concerned.

The potentially disclosed data was identification information: login identifier, title, name, email, date of birth and unique account identifier, with postal address, place of birth and telephone number for some accounts. ANTS said uploaded supporting documents and biometric data were outside the identified scope at that stage. It also said the disclosed fields by themselves did not allow someone to log into the named ANTS account.

The agency notified CNIL, referred the matter to the Paris prosecutor, and an OFAC investigation was opened. The Interior Minister also asked the Inspection générale de l'administration to establish the chain of responsibility. On 24 April the portal was placed in maintenance for additional security work.

A major later development is judicial. A 15-year-old was arrested on 25 April and, on 30 April, the Paris prosecutor said the minor was suspected of having contributed to the data leak. Press reporting described an IDOR-style API weakness and larger criminal claims of roughly 18 to 19 million records, but the official 21 April update did not confirm that vulnerability or the larger count.

## Detailed timeline

| Date | Event |
|---|---|
| 15 April 2026 | ANTS detects the security incident. |
| 16 April 2026 | ANTS reports to the Paris prosecutor that data presented as coming from the incident is being offered for sale. A cyber investigation begins. |
| 21 April 2026 | Official update says 11.7 million accounts may be concerned. Technical investigation of origin and scope is still ongoing. |
| 22-23 April 2026 | Press analysis discusses the scale and reports alleged API authorization weaknesses. Those technical accounts are not yet confirmed in the official update. |
| 24 April 2026, 19:30 | ANTS places the portal into maintenance to continue security strengthening. |
| 25 April 2026 | A 15-year-old suspect is arrested. |
| 30 April 2026 | Paris prosecutor publicly announces the arrest and says the minor is suspected of contributing to the leak. The government also announces a broader 200 million euro state digital-security investment plan in the wake of repeated breaches. |

## What happened and how the attack worked

The principal ANTS update does not name an initial-access vector or vulnerability. It says internal technical investigations are working to establish origin and scope.

Later journalism described an insecure direct object reference, or IDOR-style, weakness in which changing an identifier in an API request could expose another account's data. Researchers also said they had previously reported security flaws. Those accounts may be important, but they remain reporting unless and until France Titres, investigators or a judicial record confirms the specific technical path.

The safe technical statement is therefore: a portal security incident exposed or could expose account-identification data at large scale; the official cause was still under investigation as of the main public update.

## Data accessed, exposed or extracted

Potentially affected fields include login identifier, civil-status title, surname and given names, email, date of birth and a unique account ID. For some accounts the dataset also includes postal address, place of birth and phone number.

The 11.7 million figure is phrased officially as accounts that may be concerned. It should not automatically be interpreted as 11.7 million complete records definitely downloaded by the attacker.

## What was not affected, or is not established

At the 21 April stage, ANTS excluded supporting documents uploaded for administrative procedures and biometric data. Passwords were not listed among the disclosed fields, and the agency said the leaked identification data alone did not grant access to a named user account.

## Operational and public impact

The data is highly suitable for government-themed identity phishing. A fraudster can cite a real date of birth, address or ANTS context and impersonate a driving-license, passport, registration or identity-document process. The main direct danger is not that the leaked fields themselves unlock the portal, but that they make the next social-engineering step more convincing.

## Attacker claims, attribution and uncertainty

Sellers on criminal forums claimed a larger dataset, generally in the 18 to 19 million-record range. Official government communications used 11.7 million accounts as the potential scope. Later arrest of a minor suspected of contributing to the leak increases confidence that investigators identified at least one human actor, but it does not validate the criminal sellers' advertised volume.

## Response, investigation and remediation

ANTS notified CNIL, seized the Paris prosecutor through an Article 40 referral, cooperated with OFAC investigators, and informed professional and individual users. It advised password changes at the next login as a precaution. The Interior Minister asked IGA to map responsibility. The portal was later placed in maintenance for additional hardening.

## What changed after the first reporting

The arrest of a 15-year-old on 25 April is a significant post-dataset development to preserve. Another important editorial correction is a government information page that mistakenly referred to detection on 15 March. The primary ANTS and Interior Ministry material consistently says 15 April, so 15 April is the date used here.

## Press and official quotes

> « 11,7 millions de comptes seraient concernés »
>
> “11.7 million accounts may be concerned”
>
> Source: France Titres / Interior Ministry

> « investigations techniques internes »
>
> “internal technical investigations”
>
> Source: France Titres

## Evidence assessment

**High-confidence facts** in this dossier are drawn from first-party disclosures, regulator material, parliamentary testimony, prosecutor statements, or multiple mutually consistent reputable reports.

**Reported but not officially confirmed** details are explicitly described as reporting, allegations, criminal claims or analytical context. They are not promoted into the confirmed method or victim-count fields.

**Counts are semantic.** Accounts, bank accounts, files, records, employees, pupils and operational users are not interchangeable. Unknown person counts remain unknown.

## Sources

1. **France Titres / ANTS** (21 April 2026), [Incident de sécurité relatif au portail ants.gouv.fr : point d'étape du 21 avril 2026](https://mairie.ants.gouv.fr/toute-l-actualite/incident-de-securite-relatif-au-portail-antsgouvfr-point-detape-du-21-avril-2026). _Primary._
2. **Ministry of the Interior** (21 April 2026), [Point d'étape du 21 avril 2026 concernant l'incident de sécurité relatif au portail ants.gouv.fr](https://www.interieur.gouv.fr/actualites/communiques-de-presse/point-detape-du-21-avril-2026-concernant-lincident-de-securite-relatif-au-portail-antsgouvfr). _Primary._
3. **TF1 Info** (24 April 2026), [Piratage massif de l'ANTS : le portail fermé dès ce vendredi pour maintenance](https://www.tf1info.fr/justice-faits-divers/piratage-massif-de-l-ants-agence-nationale-titres-securises-le-portail-ferme-des-ce-vendredi-24-avril-pour-maintenance-2438027.html). _Secondary._
4. **Le Monde** (22 April 2026), [Fuite de données à l'ANTS : ce que l'on sait](https://www.lemonde.fr/pixels/article/2026/04/22/fuite-de-donnees-a-l-ants-site-qui-gere-les-demandes-de-pieces-d-identite-ce-que-l-on-sait_6682414_4408996.html). _Secondary._
5. **Le Monde** (30 April 2026), [Piratage de l'ANTS : un mineur de 15 ans interpellé](https://www.lemonde.fr/pixels/article/2026/04/30/piratage-de-l-ants-un-mineur-de-15-ans-interpelle_6684591_4408996.html). _Secondary, judicial update._
6. **TF1 Info** (30 April 2026), [Piratage de l'ANTS : ce que l'on sait de breach3d](https://www.tf1info.fr/justice-faits-divers/piratage-de-l-ants-ce-que-l-on-sait-de-breach3d-l-adolescent-de-15-ans-place-en-garde-a-vue-2439078.html). _Secondary, prosecutor statement._


# Education Ministry staff-training system: professional account compromise

_Research cutoff: 16 August 2026_

## At a glance

| Field | Finding |
|---|---|
| Organization | French Education Ministry |
| Sector | Education |
| Incident date | Night of 25 July 2026 |
| Status | Confirmed; exact headcount still under investigation at the research cutoff |
| Affected scope | A 'significant number' of agents who had worked in academies since 2001; exact count not published |

## Executive summary

The Education Ministry disclosed on 31 July 2026 that a professional account had been impersonated during the night of 25 July, giving fraudulent access to an information system dedicated to staff training. The ministry security operations center was alerted on 26 July and external access was suspended.

The system contained identity and professional information about agents who had worked in academies since 2001. For some, the accessible data also included postal address, telephone number and social-security number. The ministry explicitly said the system contained no banking data, passwords or pupil data.

At the 31 July disclosure the ministry could not provide a final headcount, describing the potential population only as a significant number of agents. No later official quantified update was found before the 16 August research cutoff.

## Detailed timeline

| Date | Event |
|---|---|
| Night of 25 July 2026 | Fraudulent access occurs after impersonation of a professional account. |
| 26 July 2026 | COSSIM is alerted. External access to the system is suspended and a crisis cell is activated. |
| 31 July 2026 | The ministry publicly discloses the incident and says the exact scope is still under investigation. |
| 1-16 August 2026 | No later official public person count is identified in the research reviewed for this dossier. |

## What happened and how the attack worked

The ministry describes the mechanism as impersonation of a professional account. It does not disclose how that account was compromised, whether MFA was present, or whether any software flaw was also involved.

This is the third major Education Ministry incident in the 2026 dataset and the second one whose public core is compromised credentials. The recurrence does not prove a shared attacker or identical method, but it reinforces the importance of access hardening and application segmentation.

## Data accessed, exposed or extracted

Potentially exposed information covers identity and professional data, including status and functions, for staff who worked in academies since 2001. For some records, postal address, phone number and social-security number are also present.

Because the exact number remains unknown, no numeric value should be used in aggregate charts.

## What was not affected, or is not established

The ministry explicitly states that the system does not contain banking data, passwords or pupil data.

## Operational and public impact

Social-security numbers and long-lived identity information create durable fraud risk. Unlike a password, a social-security identifier is not something a person can simply rotate after a breach. Employment role and contact details also support convincing ministry or payroll impersonation.

## Attacker claims, attribution and uncertainty

No reliable public attribution or attacker-claimed scope is needed to explain the confirmed case. The primary ministry disclosure should remain the anchor until a later official update provides a final volume.

## Response, investigation and remediation

The ministry suspended external access, activated a crisis cell, filed a complaint, notified ANSSI and CNIL, began checks across its other systems, and said potentially affected staff would be informed. It also reiterated that it had been strengthening security for several months.

## What changed after the first reporting

The seed record remains current through the research cutoff. The important editorial choice is not to guess a headcount from the age of the database or the size of the ministry.

## Press and official quotes

> « un nombre important de ses agents »
>
> “a significant number of its agents”
>
> Source: Education Ministry

> « les investigations se poursuivent »
>
> “the investigations are continuing”
>
> Source: Education Ministry

## Evidence assessment

**High-confidence facts** in this dossier are drawn from first-party disclosures, regulator material, parliamentary testimony, prosecutor statements, or multiple mutually consistent reputable reports.

**Reported but not officially confirmed** details are explicitly described as reporting, allegations, criminal claims or analytical context. They are not promoted into the confirmed method or victim-count fields.

**Counts are semantic.** Accounts, bank accounts, files, records, employees, pupils and operational users are not interchangeable. Unknown person counts remain unknown.

## Sources

1. **Ministry of Education** (31 July 2026), [Incident de sécurité affectant les données de personnels de l'éducation nationale](https://www.education.gouv.fr/incident-de-securite-affectant-les-donnees-de-personnels-de-l-education-nationale-505407). _Primary._


# CEVA Logistics: European warehouse intrusion with supply-chain data exposure

_Research cutoff: 16 August 2026_

## At a glance

| Field | Finding |
|---|---|
| Organization | CEVA Logistics |
| Sector | Logistics / supply chain |
| Incident date | 29 July to 1 August 2026 |
| Status | Confirmed by CEVA to customers and press; technical details still limited |
| Affected scope | Unknown person count; at least eight European warehouses and multiple downstream clients |

## Executive summary

A cyber intrusion hit part of CEVA Logistics' European contract-logistics operation beginning around 29 July 2026. CEVA told affected customers that the incident was identified on 1 August and later confirmed to press that the operational impact was limited to eight European warehouses. The company's other global systems and transport operations were described as unaffected.

The breach became visible publicly through CEVA's customers. European retailers and other organizations warned that shipping information held by CEVA had been accessed or copied. Valve, which uses CEVA to ship Steam hardware in Europe, said customer names, street addresses, phone numbers, email addresses and order details may have been compromised. CEVA retained Valve delivery information for up to 90 days after an order.

Valve said CEVA did not have Steam payment information, passwords or Steam Guard codes. The incident therefore shows a classic supply-chain blast radius: a logistics company may hold enough data to expose customers of many brands even though it does not hold their primary account credentials.

## Detailed timeline

| Date | Event |
|---|---|
| 29 July 2026 | Start of the intrusion window later communicated in Valve-related notices and reporting. |
| 1 August 2026 | CEVA identifies the intrusion, activates security measures and informs affected customers. Operational impact is later described as limited to eight European warehouses. |
| 7 August 2026 | Valve says it learns that information relating to its European hardware customers was likely compromised. |
| 10 August 2026 | TechCrunch and other outlets detail the multi-client impact. Valve begins broad customer notification. |
| 11-12 August 2026 | Additional reporting identifies more affected retailers and notes that the Dutch data-protection authority has received multiple breach notifications connected with the CEVA incident. |
| 16 August 2026 | CEVA's investigation remains ongoing and no public initial-access vector or total victim count has been established. |

## What happened and how the attack worked

CEVA has not published an initial access method, vulnerability, ransomware family or attacker. The physical operational disruption at warehouses led some commentators to speculate about ransomware or destructive malware, but that is not a confirmed technical finding.

The confirmed response facts are that CEVA isolated affected systems, activated security protocols and brought in external investigators. The breach's downstream data exposure appears to come from systems used in contract logistics and fulfillment rather than a compromise of every global CEVA business unit.

## Data accessed, exposed or extracted

For Valve customers, the likely exposed fields were name, street address, phone number, email address, and hardware product type or order details. Other CEVA clients reported overlapping sets of delivery and customer-contact data.

The exact total volume across all clients is unknown. Because different clients may have overlapping customers, adding each company's notification count would also risk double counting.

## What was not affected, or is not established

Valve said CEVA does not hold Steam payment information, passwords, Steam Guard codes or other Steam account credentials. CEVA told reporters that air, ocean, ground and rail operations continued and that the identified operational effect was limited to eight warehouses.

## Operational and public impact

The breach creates two layers of risk. Operationally, warehouse disruption can delay orders, returns and refunds. From a privacy perspective, stolen delivery context enables persuasive package scams. A criminal who knows a victim's address and exact recent hardware purchase can plausibly demand a small customs payment, redelivery fee or account verification.

## Attacker claims, attribution and uncertainty

Speculation about ransomware or a particular initial technique remains unconfirmed. The appropriate state is 'technical details unknown' rather than filling the gap with a common logistics-attack pattern.

## Response, investigation and remediation

CEVA activated security protocols, isolated affected systems and engaged external investigators. Downstream clients began notifying their customers and relevant data-protection authorities. Valve explicitly warned customers to expect fake messages and said it was pressing CEVA for a fuller account of what had been taken and how.

## What changed after the first reporting

This was still an active investigation at the research cutoff. The dataset should be treated as provisional on technical method, total number of affected people and final number of client organizations.

## Press and official quotes

> “expect fake messages”
>
> « attendez-vous à de faux messages »
>
> Source: Valve customer notice

> “Treat all of them as fake.”
>
> « Considérez-les tous comme frauduleux. »
>
> Source: Valve customer notice

## Evidence assessment

**High-confidence facts** in this dossier are drawn from first-party disclosures, regulator material, parliamentary testimony, prosecutor statements, or multiple mutually consistent reputable reports.

**Reported but not officially confirmed** details are explicitly described as reporting, allegations, criminal claims or analytical context. They are not promoted into the confirmed method or victim-count fields.

**Counts are semantic.** Accounts, bank accounts, files, records, employees, pupils and operational users are not interchangeable. Unknown person counts remain unknown.

## Sources

1. **TechCrunch** (10 August 2026), [A data breach at shipping giant Ceva Logistics is rippling across banks, retailers, Steam gamers, and beyond](https://techcrunch.com/2026/08/10/a-data-breach-at-shipping-giant-ceva-logistics-is-rippling-across-banks-retailers-steam-gamers-and-beyond/). _Secondary, direct CEVA confirmation._
2. **The Verge** (10 August 2026), [Steam hardware shipper breach leaks customer data, including names and addresses](https://www.theverge.com/games/977314/valve-steam-hardware-shipping-data-breach). _Secondary, Valve notice._
3. **PC Gamer** (10 August 2026), [Steam user data may have been compromised by a cyberattack targeting Valve's European shipping partner](https://www.pcgamer.com/gaming-industry/steam-user-data-may-have-been-compromised-by-a-cyberattack-targeting-valves-european-shipping-partner/). _Secondary, Valve statement._
4. **Computing** (12 August 2026), [Ceva Logistics hack affects firms across Europe](https://www.computing.co.uk/news/2026/security/ceva-logistics-hack-affects-firms-across-europe). _Secondary._
5. **TechRadar** (11 August 2026), [The CEVA Logistics data breach is having major knock-on effects across Europe](https://www.techradar.com/pro/security/the-ceva-logistics-data-breach-is-having-major-knock-on-effects-across-europe-heres-what-we-know). _Secondary._


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
