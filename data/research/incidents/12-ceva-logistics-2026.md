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
