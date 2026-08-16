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
