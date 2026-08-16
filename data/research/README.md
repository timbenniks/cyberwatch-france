# France Cyberwatch research package

Research cutoff: 16 August 2026

This directory contains a source-driven expansion of the France Cyberwatch 2025-2026 incident database.

## Start here

- [Master article](france-cyber-incidents-2025-2026.md)
- [Source register](sources/source-register.md)

## Incident dossiers

1. [Orange: July 2025 intrusion and later data publication](incidents/01-orange-2025.md)
2. [Air France and KLM: third-party customer-service breach](incidents/02-air-france-klm-2025.md)
3. [Bouygues Telecom: 6.4 million customer accounts exposed](incidents/03-bouygues-telecom-2025.md)
4. [WEDA: cross-tenant API abuse, patient-data risk and care disruption](incidents/04-weda-2025.md)
5. [Eurofiber France: ticketing vulnerability, SQL injection and API exfiltration](incidents/05-eurofiber-france-2025.md)
6. [French Interior Ministry: compromised mailboxes, police portal access and sensitive file extraction](incidents/06-interior-ministry-2025.md)
7. [DGFiP / FICOBA: stolen inter-ministry credentials and 1.2 million bank-account records](incidents/07-ficoba-2026.md)
8. [Education Ministry / COMPAS: 243,000 staff records exfiltrated](incidents/08-education-compas-2026.md)
9. [Education Ministry / ÉduConnect: authorized-account impersonation plus an account-management vulnerability](incidents/09-education-educonnect-2026.md)
10. [France Titres / ANTS: 11.7 million accounts potentially concerned](incidents/10-france-titres-ants-2026.md)
11. [Education Ministry staff-training system: professional account compromise](incidents/11-education-staff-training-2026.md)
12. [CEVA Logistics: European warehouse intrusion with supply-chain data exposure](incidents/12-ceva-logistics-2026.md)
13. [Santé publique France contractor: 80,000 contact records exposed](incidents/13-sante-publique-france-contractor-2026.md)
14. [DGFiP tax systems: stolen credentials and 678,000 tax records](incidents/14-dgfip-tax-systems-2026.md)

## Editorial rules

- Primary disclosures override unattributed summaries when they conflict.
- Later forensic, parliamentary or judicial updates may revise an early company statement.
- Criminal claims are labeled and are never promoted to chart counts without independent confirmation.
- Account counts are not silently converted into people.
- Unknown counts remain unknown.
- Separate incidents are not merged merely because they involve the same organization or time period.
- Quotes are deliberately brief. French excerpts include an English translation when useful.
- Links are direct source links so the files can be published outside ChatGPT.

## Suggested site integration

For each incident page, keep the short card data from the database for navigation and charts, but use the corresponding dossier as the long-form detail view. Add fields for `lastResearched`, `officialScope`, `reportedScope`, `attackerClaim`, `methodConfidence`, `sourceCount`, and `corrections` if you want the front end to expose evidentiary state.
