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
