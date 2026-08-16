import type { Bilingual } from '~/types/cyberwatch'

export interface GlossaryEntry {
  id: string
  term: Bilingual
  definition: Bilingual
  /** Case-insensitive match against the incident text, in either language. */
  pattern: RegExp
}

/**
 * Plain-language definitions for the technical words that appear in the
 * dataset's own text. Definitions only — no incident facts live here.
 */
export const glossary: GlossaryEntry[] = [
  {
    id: 'phishing',
    term: { en: 'Phishing', fr: 'Hameçonnage' },
    definition: {
      en: 'A message or call that imitates a real organisation to get you to hand over a password, a code or a payment.',
      fr: 'Un message ou un appel qui imite une vraie organisation pour vous faire donner un mot de passe, un code ou un paiement.',
    },
    pattern: /phishing|hameçonnage/i,
  },
  {
    id: 'iban',
    term: { en: 'IBAN', fr: 'IBAN' },
    definition: {
      en: 'Your bank account number in international format. Knowing it lets a scammer sound convincing; it does not by itself let them take money.',
      fr: 'Votre numéro de compte bancaire au format international. Le connaître permet à un escroc de paraître crédible ; cela ne suffit pas à prélever de l’argent.',
    },
    pattern: /\biban\b/i,
  },
  {
    id: 'mfa',
    term: { en: 'MFA (multi-factor authentication)', fr: 'MFA (authentification multifacteur)' },
    definition: {
      en: 'A second proof of identity on top of the password — a code, an app or a security key. Phishing-resistant methods are keys and passkeys.',
      fr: 'Une seconde preuve d’identité en plus du mot de passe — un code, une application ou une clé de sécurité. Les méthodes résistantes au hameçonnage sont les clés et les passkeys.',
    },
    pattern: /\bmfa\b/i,
  },
  {
    id: 'exfiltration',
    term: { en: 'Exfiltration', fr: 'Exfiltration' },
    definition: {
      en: 'Copying data out of a system to somewhere the attacker controls.',
      fr: 'La copie de données hors d’un système vers un emplacement contrôlé par l’attaquant.',
    },
    pattern: /exfiltrat/i,
  },
  {
    id: 'sql-injection',
    term: { en: 'SQL injection', fr: 'Injection SQL' },
    definition: {
      en: 'Slipping database commands into an ordinary web form or link, so the site runs them and returns data it should not.',
      fr: 'Glisser des commandes de base de données dans un formulaire ou un lien ordinaire, pour que le site les exécute et renvoie des données qu’il ne devrait pas.',
    },
    pattern: /sql/i,
  },
  {
    id: 'credentials',
    term: { en: 'Credentials', fr: 'Identifiants' },
    definition: {
      en: 'A username and password pair, or the equivalent key an application uses to log in.',
      fr: 'Un couple identifiant / mot de passe, ou la clé équivalente utilisée par une application pour se connecter.',
    },
    pattern: /credential|identifiant/i,
  },
  {
    id: 'supply-chain',
    term: { en: 'Supplier or supply-chain exposure', fr: 'Exposition fournisseur' },
    definition: {
      en: 'Data leaks through a company that works for the organisation, rather than from the organisation itself.',
      fr: 'Des données fuient par une entreprise prestataire de l’organisation plutôt que par l’organisation elle-même.',
    },
    pattern: /supplier|supply chain|prestataire|fournisseur|sous-traitant/i,
  },
  {
    id: 'edge',
    term: { en: 'Edge or legacy system', fr: 'Système exposé ou ancien' },
    definition: {
      en: 'Equipment sitting at the boundary of a network, or older software still in service — both are common first footholds.',
      fr: 'Un équipement situé en bordure de réseau, ou un logiciel ancien encore en service — deux points d’entrée fréquents.',
    },
    pattern: /\bedge\b|legacy|obsolète|ancien système/i,
  },
]

export function glossaryFor(text: string): GlossaryEntry[] {
  return glossary.filter((entry) => entry.pattern.test(text))
}
