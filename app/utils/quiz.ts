import type { Bilingual } from '~/types/cyberwatch'

import { quizQuestionCount } from '~~/shared/utils/quiz-meta'

export const quizPath = '/learn/quiz'

/** Shareable pass mark. 13 of 16 is 81%; 12 of 16 is 75%. */
export const quizPassPercent = 80

export type QuizKind = 'choice' | 'yesno'

export type QuizChoice = {
  id: string
  label: Bilingual
  why: Bilingual
}

export type QuizQuestion = {
  id: string
  section: Bilingual
  prompt: Bilingual
  dek: Bilingual
  kind: QuizKind
  choices: QuizChoice[]
  correctId: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'health-leak',
    section: {
      en: 'Health, school, and data longevity',
      fr: 'Santé, école, et durée de vie des données',
    },
    prompt: {
      en: 'Why is a health-themed leak dangerous even if no medical records were stolen?',
      fr: 'Pourquoi une fuite à thème santé reste-t-elle dangereuse, même sans dossier médical volé ?',
    },
    dek: {
      en: 'A health-themed leak can be contact and delivery details only, with no medical file attached. The question is what those details are still enough to do.',
      fr: 'Une fuite à thème santé peut n’être que des coordonnées de contact et de livraison, sans dossier médical. La question est ce que ces détails suffisent encore à faire.',
    },
    kind: 'choice',
    correctId: 'b',
    choices: [
      {
        id: 'a',
        label: {
          en: 'It allows criminals to access your hospital’s secure servers.',
          fr: 'Elle permet aux criminels d’accéder aux serveurs sécurisés de votre hôpital.',
        },
        why: {
          en: 'A stolen contact file is a copy of details, not a key to hospital systems. The danger is the message they can write with those details, not a new login to a ward.',
          fr: 'Un fichier de coordonnées volé est une copie de détails, pas une clé vers les systèmes hospitaliers. Le danger est le message qu’ils peuvent écrire avec ces détails, pas une nouvelle connexion à un service.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'It provides contact and delivery details that can be used to send convincing messages about vaccinations or reimbursements.',
          fr: 'Elle fournit des coordonnées et des détails de livraison qui servent à envoyer des messages convaincants sur une vaccination ou un remboursement.',
        },
        why: {
          en: 'Health-branded names, addresses and phone numbers are enough to send a message about a vaccination, a kit, a reimbursement or an appointment that uses your real details. No medical record is required for that script.',
          fr: 'Des noms, adresses et téléphones estampillés santé suffisent à envoyer un message sur une vaccination, un kit, un remboursement ou un rendez-vous qui utilise vos vrais détails. Aucun dossier médical n’est nécessaire pour ce scénario.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'It automatically invalidates your health insurance.',
          fr: 'Elle annule automatiquement votre assurance maladie.',
        },
        why: {
          en: 'A leak does not cancel cover. Treat unexpected health messages as a scam risk, and open the official service yourself if you need to check something.',
          fr: 'Une fuite n’annule pas une couverture. Traitez les messages santé inattendus comme un risque d’arnaque, et ouvrez vous-même le service officiel si vous devez vérifier quelque chose.',
        },
      },
    ],
  },
  {
    id: 'school-files',
    section: {
      en: 'Health, school, and data longevity',
      fr: 'Santé, école, et durée de vie des données',
    },
    prompt: {
      en: 'Why are school and staff files particularly useful for scammers?',
      fr: 'Pourquoi les fichiers scolaires et d’agents sont-ils particulièrement utiles aux escrocs ?',
    },
    dek: {
      en: 'Education files hold identity, contact details, sometimes absences and the names of tutors or colleagues. That is a map of people, not of buildings.',
      fr: 'Les fichiers de l’Éducation portent l’identité, les coordonnées, parfois des absences et des noms de tuteurs ou de collègues. C’est une carte de personnes, pas de bâtiments.',
    },
    kind: 'choice',
    correctId: 'b',
    choices: [
      {
        id: 'a',
        label: {
          en: 'They contain blueprints of school buildings.',
          fr: 'Ils contiennent les plans des bâtiments scolaires.',
        },
        why: {
          en: 'Education leaks in this kind of file are about people, not architecture. The useful material is who can be reached, and in what role.',
          fr: 'Ce type de fuite scolaire porte sur des personnes, pas sur l’architecture. La matière utile est qui est joignable, et dans quel rôle.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'They provide a map of who works where, student names, and absences, so fake messages can feel local.',
          fr: 'Ils dressent une carte de qui travaille où, des noms d’élèves et des absences, pour que de faux messages paraissent locaux.',
        },
        why: {
          en: 'Identity, contact details, absences and tutor or colleague names let a message name the school, a teacher or a parent. The facts make it local. You should still open the official service yourself.',
          fr: 'Identité, coordonnées, absences et noms de tuteurs ou de collègues permettent à un message de nommer l’établissement, un enseignant ou un parent. Les faits rendent cela local. Il faut toujours ouvrir soi-même le service officiel.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'They allow criminals to change student grades.',
          fr: 'Ils permettent aux criminels de modifier les notes des élèves.',
        },
        why: {
          en: 'A stolen copy of a file is not write-access to the school system. The typical misuse is a fake message to a parent, a teacher or payroll, not editing marks.',
          fr: 'La copie volée d’un fichier n’est pas un droit d’écriture sur le système scolaire. L’usage typique est un faux message à un parent, un enseignant ou la paie, pas la modification des notes.',
        },
      },
    ],
  },
  {
    id: 'news-cycle',
    section: {
      en: 'Health, school, and data longevity',
      fr: 'Santé, école, et durée de vie des données',
    },
    prompt: {
      en: 'You should stop being cautious about a data breach once it is no longer being reported in the news.',
      fr: 'Il faut cesser d’être prudent au sujet d’une fuite dès qu’elle n’est plus dans l’actualité.',
    },
    dek: {
      en: 'Stolen files are cheap to keep, copy and reuse. A dump from this year can still fuel messages next winter, timed to a school year or a public-health campaign.',
      fr: 'Les fichiers volés coûtent peu à conserver, copier et réutiliser. Un dump de cette année peut encore alimenter des messages l’hiver suivant, calés sur une rentrée ou une campagne de santé publique.',
    },
    kind: 'yesno',
    correctId: 'false',
    choices: [
      {
        id: 'true',
        label: { en: 'True', fr: 'Vrai' },
        why: {
          en: 'The news cycle ends. The data does not. Stolen files are cheap to keep, copy and reuse for months or years, often timed to a new school year or a public-health campaign.',
          fr: 'L’actualité passe. Les données restent. Les fichiers volés coûtent peu à conserver, copier et réutiliser pendant des mois ou des années, souvent calés sur une rentrée ou une campagne de santé publique.',
        },
      },
      {
        id: 'false',
        label: { en: 'False', fr: 'Faux' },
        why: {
          en: 'Stolen data is cheap to keep and stays useful long after the headlines. Increased caution should last months, not days. Watch for messages that reuse the organisation’s name later.',
          fr: 'Les données volées coûtent peu à conserver et restent utiles longtemps après les titres. La vigilance accrue doit durer des mois, pas des jours. Surveillez les messages qui réutilisent plus tard le nom de l’organisation.',
        },
      },
    ],
  },
  {
    id: 'phishing-difference',
    section: {
      en: 'Phishing personalisation',
      fr: 'Hameçonnage personnalisé',
    },
    prompt: {
      en: 'What is the main difference between ordinary phishing and phishing that follows a data leak?',
      fr: 'Quelle est la principale différence entre le hameçonnage ordinaire et celui qui suit une fuite de données ?',
    },
    dek: {
      en: 'Ordinary phishing guesses. After a leak, the first sentence can recite a true name, address or contract number. The channel is not the difference.',
      fr: 'Le hameçonnage ordinaire devine. Après une fuite, la première phrase peut réciter un vrai nom, une adresse ou un numéro de contrat. Le canal n’est pas la différence.',
    },
    kind: 'choice',
    correctId: 'b',
    choices: [
      {
        id: 'a',
        label: {
          en: 'Ordinary phishing is always sent via SMS.',
          fr: 'Le hameçonnage ordinaire est toujours envoyé par SMS.',
        },
        why: {
          en: 'Both kinds use email, SMS, apps and phone calls. The channel is not the difference. The difference is whether the first sentence can recite a true detail about you.',
          fr: 'Les deux formes utilisent e-mail, SMS, applications et appels. Le canal n’est pas la différence. La différence est de savoir si la première phrase peut réciter un détail vrai sur vous.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'After a leak, the message recites true details such as your name, address or contract number, instead of a generic greeting.',
          fr: 'Après une fuite, le message récite de vrais détails — nom, adresse ou numéro de contrat — au lieu d’une formule générique.',
        },
        why: {
          en: 'Ordinary phishing guesses. After a leak, the message recites. A dump with your name, email, phone, address or customer number lets the first sentence sound like your operator, airline or school.',
          fr: 'Le hameçonnage ordinaire devine. Après une fuite, le message récite. Un dump avec votre nom, e-mail, téléphone, adresse ou numéro client permet à la première phrase de sonner comme votre opérateur, votre compagnie aérienne ou l’école.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Phishing after a leak is easier for email filters to catch.',
          fr: 'Le hameçonnage après une fuite est plus facile à intercepter pour les filtres.',
        },
        why: {
          en: 'Personal details often make a message look less like bulk spam, not more. Filters see less of the generic pattern. You still have to treat an unexpected informed message as a warning.',
          fr: 'Les détails personnels font souvent moins « spam de masse », pas plus. Les filtres voient moins le motif générique. Un message inattendu et renseigné reste un signal d’alerte.',
        },
      },
    ],
  },
  {
    id: 'urgent-channel',
    section: {
      en: 'Phishing personalisation',
      fr: 'Hameçonnage personnalisé',
    },
    prompt: {
      en: 'Which channel is often more convincing than email because a scammer can project a sense of urgency?',
      fr: 'Quel canal est souvent plus convaincant que l’e-mail, parce qu’un escroc peut y faire sentir l’urgence ?',
    },
    dek: {
      en: 'The same informed script works on SMS, apps and calls. A live voice can make the urgency harder to step away from than a message you can reread.',
      fr: 'Le même scénario renseigné marche par SMS, application et appel. Une voix en direct rend l’urgence plus difficile à quitter qu’un message que l’on peut relire.',
    },
    kind: 'choice',
    correctId: 'c',
    choices: [
      {
        id: 'a',
        label: { en: 'Postal mail.', fr: 'Le courrier postal.' },
        why: {
          en: 'A letter can look official, but it is slow. The guides flag the phone because urgency is heard in the voice, and you are asked to act before you can check.',
          fr: 'Une lettre peut paraître officielle, mais elle est lente. Les guides insistent sur le téléphone parce que l’urgence s’entend, et l’on vous demande d’agir avant de pouvoir vérifier.',
        },
      },
      {
        id: 'b',
        label: { en: 'Social media posts.', fr: 'Les publications sur les réseaux sociaux.' },
        why: {
          en: 'Public posts are easier to ignore or to check with someone else. A live call isolates you and pushes you to hand over a code or stay on the line.',
          fr: 'Un post public est plus facile à ignorer ou à vérifier avec quelqu’un. Un appel en direct vous isole et vous pousse à dicter un code ou à rester en ligne.',
        },
      },
      {
        id: 'c',
        label: { en: 'Phone calls.', fr: 'Les appels téléphoniques.' },
        why: {
          en: 'A call is often more convincing than an email because you can hear the urgency. The script is the same: they already know something, and they need the access they do not have.',
          fr: 'Un appel est souvent plus convaincant qu’un e-mail, parce que l’urgence s’entend. Le scénario ne change pas : ils savent déjà quelque chose, et ils ont besoin de l’accès qui leur manque.',
        },
      },
    ],
  },
  {
    id: 'iban-login',
    section: { en: 'IBAN leaks', fr: 'Fuites d’IBAN' },
    prompt: {
      en: 'Does having someone’s IBAN allow a criminal to log into their bank account?',
      fr: 'Posséder l’IBAN de quelqu’un permet-il à un criminel de se connecter à son compte bancaire ?',
    },
    dek: {
      en: 'An IBAN, and the French RIB, identifies an account so that payments can be sent to it. That is not the same as a password or an app approval.',
      fr: 'Un IBAN, et le RIB français, identifie un compte pour que des paiements puissent y être envoyés. Ce n’est pas la même chose qu’un mot de passe ou une validation dans l’application.',
    },
    kind: 'choice',
    correctId: 'b',
    choices: [
      {
        id: 'a',
        label: {
          en: 'Yes, if they also have the person’s name.',
          fr: 'Oui, s’ils ont aussi le nom de la personne.',
        },
        why: {
          en: 'Name plus IBAN identifies an account for payments. It is not a password. The bank still needs authentication you control before anyone can open the account.',
          fr: 'Le nom plus l’IBAN identifie un compte pour des paiements. Ce n’est pas un mot de passe. La banque exige encore une authentification que vous contrôlez avant d’ouvrir le compte.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'No. The bank still requires authentication you control, such as an app approval or a passkey.',
          fr: 'Non. La banque exige encore une authentification que vous contrôlez, comme une validation dans l’application ou une passkey.',
        },
        why: {
          en: 'An IBAN identifies an account so money can be sent to it. Knowing it does not, by itself, let someone log in or take money out. A password, app approval, card reader or passkey is still required.',
          fr: 'Un IBAN identifie un compte pour qu’on puisse y envoyer de l’argent. Le connaître ne permet pas, à lui seul, de se connecter ni de sortir des fonds. Il faut encore un mot de passe, une validation dans l’application, un lecteur de carte ou une passkey.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Only if the account is with a French bank.',
          fr: 'Uniquement si le compte est dans une banque française.',
        },
        why: {
          en: 'The rule is the same for a French RIB or any other IBAN: the identifier is not a login. French banks still ask for authentication you control.',
          fr: 'La règle est la même pour un RIB français ou un autre IBAN : l’identifiant n’est pas un identifiant de connexion. Les banques françaises demandent encore une authentification que vous contrôlez.',
        },
      },
    ],
  },
  {
    id: 'iban-use',
    section: { en: 'IBAN leaks', fr: 'Fuites d’IBAN' },
    prompt: {
      en: 'How do criminals typically use a stolen IBAN?',
      fr: 'Comment les criminels se servent-ils typiquement d’un IBAN volé ?',
    },
    dek: {
      en: 'They want the conversation. Reciting your IBAN, name and address lets them pretend they already belong in a bank or tax call.',
      fr: 'Ils veulent la conversation. Réciter votre IBAN, votre nom et votre adresse leur permet de faire comme s’ils avaient déjà leur place dans un appel bancaire ou fiscal.',
    },
    kind: 'choice',
    correctId: 'a',
    choices: [
      {
        id: 'a',
        label: {
          en: 'As a prop to gain trust, so they can trick you into approving a mandate or installing software.',
          fr: 'Comme accessoire pour gagner votre confiance, afin de vous faire valider un mandat ou installer un logiciel.',
        },
        why: {
          en: 'They want the conversation. Reciting your IBAN, name and address lets them pretend to be the bank or the tax office. Typical asks: approve a SEPA mandate, install remote-access software, or read a code from your banking app. The IBAN is the prop. You complete the fraud if you follow the instructions.',
          fr: 'Ils veulent la conversation. Réciter votre IBAN, votre nom et votre adresse leur permet de se faire passer pour la banque ou les impôts. Demandes typiques : valider un mandat SEPA, installer un logiciel de prise de contrôle, ou dicter un code de l’application bancaire. L’IBAN n’est que l’accessoire. C’est vous qui terminez la fraude si vous suivez les consignes.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'To print physical credit cards.',
          fr: 'Pour imprimer des cartes bancaires physiques.',
        },
        why: {
          en: 'An IBAN is an account identifier, not card data. Printing a card needs different stolen material. The usual IBAN scam is a phone call or message that uses the number as proof they “already have your file”.',
          fr: 'Un IBAN est un identifiant de compte, pas des données de carte. Imprimer une carte demande un autre matériau volé. L’arnaque habituelle à l’IBAN est un appel ou un message qui s’en sert comme preuve qu’ils « ont déjà votre dossier ».',
        },
      },
      {
        id: 'c',
        label: {
          en: 'To change the account holder’s legal address.',
          fr: 'Pour changer l’adresse légale du titulaire du compte.',
        },
        why: {
          en: 'Knowing an IBAN does not let a stranger rewrite your civil status or your bank’s registered address. The risk is impersonation in a conversation, not an automatic change of records.',
          fr: 'Connaître un IBAN ne permet pas à un inconnu de réécrire votre état civil ni l’adresse enregistrée à la banque. Le risque est l’usurpation dans une conversation, pas un changement automatique des fichiers.',
        },
      },
    ],
  },
  {
    id: 'ai-assist',
    section: {
      en: 'AI and machine-generated scams',
      fr: 'IA et arnaques générées par machine',
    },
    prompt: {
      en: 'How do language models (AI) assist cybercriminals?',
      fr: 'Comment les modèles de langue (IA) aident-ils les cybercriminels ?',
    },
    dek: {
      en: 'These systems predict the next word. That is already enough to write fluent, official-sounding asks at a scale no call centre can match.',
      fr: 'Ces systèmes prédisent le mot suivant. Cela suffit déjà à écrire des demandes fluides, au ton officiel, à une échelle qu’aucun centre d’appels ne peut suivre.',
    },
    kind: 'choice',
    correctId: 'b',
    choices: [
      {
        id: 'a',
        label: {
          en: 'They can automatically break into secure government databases.',
          fr: 'Ils peuvent forcer automatiquement des bases gouvernementales sécurisées.',
        },
        why: {
          en: 'A language model is not a master hacker and it does not log into systems by itself. What it does well is write the ask. Breaking in, if it happens, is still done by people and other tools.',
          fr: 'Un modèle de langue n’est pas un pirate hors pair, et il ne se connecte pas tout seul aux systèmes. Ce qu’il fait bien, c’est écrire la demande. Un forçage, s’il a lieu, reste le fait de personnes et d’autres outils.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'They can produce fluent, official-sounding messages at massive scale, which makes scams cheaper to run.',
          fr: 'Ils peuvent produire, à très grande échelle, des messages fluides au ton officiel, ce qui rend les arnaques moins chères à mener.',
        },
        why: {
          en: 'The useful part for crime is not a machine that breaks into systems. It is a machine that makes the email, the SMS and the call script cheap enough to run all day, in fluent French or English, with many variants.',
          fr: 'Ce qui sert le crime, ce n’est pas une machine qui force les systèmes. C’est une machine qui rend l’e-mail, le SMS et le script d’appel assez bon marché pour tourner toute la journée, en français ou en anglais fluides, avec beaucoup de variantes.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'They can predict your future banking passwords.',
          fr: 'Ils peuvent prédire vos futurs mots de passe bancaires.',
        },
        why: {
          en: 'The model predicts the next word in a sentence, not the secret you have not typed. It has no file on your bank unless a person pastes leaked facts into the prompt.',
          fr: 'Le modèle prédit le mot suivant d’une phrase, pas le secret que vous n’avez pas saisi. Il n’a aucun dossier sur votre banque, sauf si quelqu’un colle des faits divulgués dans la consigne.',
        },
      },
    ],
  },
  {
    id: 'perfect-french',
    section: {
      en: 'AI and machine-generated scams',
      fr: 'IA et arnaques générées par machine',
    },
    prompt: {
      en: 'Is perfect French or a professional tone proof that a message is from an official ministry or bank?',
      fr: 'Un français parfait ou un ton professionnel prouve-t-il qu’un message vient d’un ministère ou d’une banque officiels ?',
    },
    dek: {
      en: 'Language models are good at imitating official letters. Fluency is a style. It is not an identity check.',
      fr: 'Les modèles de langue imitent bien les courriers officiels. La fluidité est un style. Ce n’est pas une preuve d’identité.',
    },
    kind: 'yesno',
    correctId: 'no',
    choices: [
      {
        id: 'yes',
        label: { en: 'Yes', fr: 'Oui' },
        why: {
          en: 'Language models are good at imitating official letters. Fluency is a style, not an identity check. The test is still: did you open the official site yourself, and did anyone ask you to hurry, pay, or share a code?',
          fr: 'Les modèles de langue imitent bien les courriers officiels. La fluidité est un style, pas une preuve d’identité. Le test reste : avez-vous ouvert vous-même le site officiel, et vous a-t-on demandé de vous dépêcher, de payer ou de partager un code ?',
        },
      },
      {
        id: 'no',
        label: { en: 'No', fr: 'Non' },
        why: {
          en: 'Language models are excellent at imitating official tones and patterns. Perfect French is not proof of identity. Knowing a real detail about you is not proof either, even when the writing is flawless.',
          fr: 'Les modèles de langue imitent très bien les tons et les formules officiels. Un français parfait n’est pas une preuve d’identité. Connaître un vrai détail sur vous non plus, même quand le texte est impeccable.',
        },
      },
    ],
  },
  {
    id: 'gov-costume',
    section: {
      en: 'Government data breaches',
      fr: 'Fuites de données publiques',
    },
    prompt: {
      en: 'What “costume” do criminals gain when they access government files such as tax or identity records?',
      fr: 'Quel « costume » les criminels gagnent-ils en accédant à des fichiers publics, fiscaux ou d’identité ?',
    },
    dek: {
      en: 'France already knows a lot about you through tax, titles and school administration. When those files leak, a caller can sound like the service that holds them.',
      fr: 'La France sait déjà beaucoup de choses sur vous via les impôts, les titres et l’administration scolaire. Quand ces fichiers fuient, un appelant peut parler comme le service qui les détient.',
    },
    kind: 'choice',
    correctId: 'a',
    choices: [
      {
        id: 'a',
        label: {
          en: 'They can use real withholding rates, property addresses or title applications to make impersonation more believable.',
          fr: 'Ils peuvent citer de vrais taux de prélèvement, adresses de biens ou demandes de titre pour rendre l’usurpation plus crédible.',
        },
        why: {
          en: '“We are calling from the tax office” is a weak line until the caller can mention a plausible income figure, a withholding rate, a property address or a pending title application. Then it is a strong line. The file is the costume, not a legal power.',
          fr: '« Nous appelons des impôts » est une phrase faible, jusqu’à ce que l’appelant puisse citer un revenu plausible, un taux de prélèvement, une adresse de bien ou une demande de titre en cours. Alors la phrase devient forte. Le fichier est le costume, pas un pouvoir légal.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'They gain legal immunity for their actions.',
          fr: 'Ils obtiennent une immunité juridique pour leurs actes.',
        },
        why: {
          en: 'Stealing or using government files is still a crime. The “costume” is the ability to sound like the administration, not protection from the law.',
          fr: 'Voler ou utiliser des fichiers publics reste un délit. Le « costume » est la capacité à parler comme l’administration, pas une protection face à la loi.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'They are able to issue real passports.',
          fr: 'Ils peuvent délivrer de vrais passeports.',
        },
        why: {
          en: 'A leaked identity file is not the passport printer. Even when civil-status fields leak, supporting documents and biometrics are often not in the same dump. The usual follow-on is a fake “your card is ready, pay here” message.',
          fr: 'Un fichier d’identité divulgué n’est pas l’imprimante à passeports. Même quand l’état civil fuit, les pièces justificatives et la biométrie ne sont souvent pas dans le même dump. La suite habituelle est un faux message du type « votre titre est prêt, réglez ici ».',
        },
      },
    ],
  },
  {
    id: 'gov-copycat',
    section: {
      en: 'Government data breaches',
      fr: 'Fuites de données publiques',
    },
    prompt: {
      en: 'What should you expect after a major government data breach is widely reported?',
      fr: 'À quoi faut-il s’attendre après qu’une fuite majeure dans l’administration a été largement rapportée ?',
    },
    dek: {
      en: 'A headline is not a personal notification. The public risk includes the wave of copycat messages that borrow the story.',
      fr: 'Un titre n’est pas une notification personnelle. Le risque public inclut la vague de messages copiés qui empruntent l’histoire.',
    },
    kind: 'choice',
    correctId: 'b',
    choices: [
      {
        id: 'a',
        label: {
          en: 'An immediate refund of your taxes.',
          fr: 'Un remboursement immédiat de vos impôts.',
        },
        why: {
          en: 'A headline is not a personal payout. Unexpected refund messages after a tax or identity story are a common lure. Check only in the official service you opened yourself.',
          fr: 'Un titre n’est pas un virement personnel. Les messages de remboursement inattendus après une affaire fiscale ou d’identité sont un appât fréquent. Vérifiez uniquement dans le service officiel que vous avez ouvert vous-même.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'A wave of copycat scam messages that borrow from the news story to lure victims.',
          fr: 'Une vague de messages d’arnaque copiés, qui empruntent l’actualité pour attirer les victimes.',
        },
        why: {
          en: 'After a widely reported government incident, expect fake messages that borrow the story — including messages that claim to be from the police or “about your file”. A headline is not a personal notification.',
          fr: 'Après un incident administratif très médiatisé, attendez-vous à de faux messages qui empruntent l’histoire — y compris des messages qui se prétendent de la police ou « au sujet de votre dossier ». Un titre n’est pas une notification personnelle.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'The government will call you directly to ask for your password.',
          fr: 'L’administration vous appellera directement pour demander votre mot de passe.',
        },
        why: {
          en: 'Tax, identity and police services will not ask you to confirm a password, buy vouchers or read codes over the phone. That request is the scam, especially after the story is in the news.',
          fr: 'Les impôts, les titres et la police ne vous demanderont pas de confirmer un mot de passe, d’acheter des bons ou de dicter des codes au téléphone. Cette demande est l’arnaque, surtout une fois l’affaire dans l’actualité.',
        },
      },
    ],
  },
  {
    id: 'trust-file',
    section: {
      en: 'Protection and how leaked data is used',
      fr: 'Protection et utilité des données divulguées',
    },
    prompt: {
      en: 'If a caller knows your real address and contract number, should you trust them?',
      fr: 'Si un appelant connaît votre vraie adresse et votre numéro de contrat, devez-vous lui faire confiance ?',
    },
    dek: {
      en: 'Those details are exactly what leaks. A caller who can recite them is not proving they work for the organisation.',
      fr: 'Ce sont précisément ces informations qui fuitent. Un appelant capable de les réciter ne prouve pas qu’il travaille pour l’organisme.',
    },
    kind: 'yesno',
    correctId: 'no',
    choices: [
      {
        id: 'yes',
        label: { en: 'Yes', fr: 'Oui' },
        why: {
          en: 'Those details are exactly what leaks. A caller who can recite them is not proving they work for the organisation. They have a copy of a file, or enough of one to sound real.',
          fr: 'Ce sont précisément ces informations qui fuitent. Un appelant capable de les réciter ne prouve pas qu’il travaille pour l’organisme. Il a une copie d’un fichier, ou assez d’éléments pour paraître vrai.',
        },
      },
      {
        id: 'no',
        label: { en: 'No', fr: 'Non' },
        why: {
          en: '“They knew my file” is a warning sign, not a credential. Hang up and open the official site or app yourself. Knowing your address, IBAN, school or date of birth does not make a caller genuine.',
          fr: '« Ils connaissaient mon dossier » est un signal d’alerte, pas une preuve d’identité. Raccrochez et ouvrez vous-même le site ou l’application officiels. Connaître votre adresse, IBAN, établissement ou date de naissance ne rend pas un appelant légitime.',
        },
      },
    ],
  },
  {
    id: 'safest-response',
    section: {
      en: 'Protection and how leaked data is used',
      fr: 'Protection et utilité des données divulguées',
    },
    prompt: {
      en: 'What is the safest way to respond to an unexpected message about a bill, delivery or tax issue?',
      fr: 'Quelle est la façon la plus sûre de réagir à un message inattendu au sujet d’une facture, d’une livraison ou d’un problème fiscal ?',
    },
    dek: {
      en: 'The link and the number in the message belong to the sender’s story. Official services are the ones you open yourself.',
      fr: 'Le lien et le numéro du message appartiennent au récit de l’expéditeur. Les services officiels sont ceux que vous ouvrez vous-même.',
    },
    kind: 'choice',
    correctId: 'c',
    choices: [
      {
        id: 'a',
        label: {
          en: 'Click the link in the message to see what is wrong.',
          fr: 'Cliquer le lien du message pour voir ce qui ne va pas.',
        },
        why: {
          en: 'The link is often the trap: a fake login page or a payment form. A well-written message is not a reason to use it. Type the official address or open the official app.',
          fr: 'Le lien est souvent le piège : une fausse page de connexion ou un formulaire de paiement. Un message bien rédigé n’est pas une raison de s’en servir. Saisissez l’adresse officielle ou ouvrez l’application officielle.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Call the number provided in the SMS.',
          fr: 'Appeler le numéro fourni dans le SMS.',
        },
        why: {
          en: 'The number in the message belongs to the sender’s story, not to the real service. Look up the organisation yourself, or use the number already in the official app.',
          fr: 'Le numéro du message appartient au récit de l’expéditeur, pas au vrai service. Recherchez l’organisme vous-même, ou utilisez le numéro déjà présent dans l’application officielle.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Ignore the message and open the official app, or type the website address into your browser yourself.',
          fr: 'Ignorer le message et ouvrir l’application officielle, ou saisir vous-même l’adresse du site dans le navigateur.',
        },
        why: {
          en: 'Open taxes, banking, deliveries and school services yourself. Type the address. Do not use a link or a number from an unexpected message, however well written or well informed it is.',
          fr: 'Ouvrez vous-même impôts, banque, livraisons et services scolaires. Saisissez l’adresse. N’utilisez pas un lien ou un numéro d’un message inattendu, si bien rédigé ou renseigné soit-il.',
        },
      },
    ],
  },
  {
    id: 'report-fr',
    section: {
      en: 'Protection and how leaked data is used',
      fr: 'Protection et utilité des données divulguées',
    },
    prompt: {
      en: 'Where should you report suspicious messages, or seek advice after a cyber incident, in France?',
      fr: 'Où signaler des messages suspects, ou demander conseil après un incident cyber, en France ?',
    },
    dek: {
      en: 'Keep the messages. Use a public-help channel you typed or bookmarked yourself, not a reply to the unexpected sender.',
      fr: 'Conservez les messages. Passez par un canal d’aide public que vous avez saisi ou mis en favori vous-même, pas par une réponse à l’expéditeur inattendu.',
    },
    kind: 'choice',
    correctId: 'b',
    choices: [
      {
        id: 'a',
        label: {
          en: 'Reply to the message and ask the sender to prove they are genuine.',
          fr: 'Répondre au message et demander à l’expéditeur de prouver qu’il est légitime.',
        },
        why: {
          en: 'Replying tells them the address is live, and any “proof” they send is still part of the scam. Keep the messages and use an official channel you opened yourself.',
          fr: 'Répondre leur indique que l’adresse est active, et toute « preuve » qu’ils envoient fait encore partie de l’arnaque. Conservez les messages et passez par un canal officiel que vous avez ouvert vous-même.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Cybermalveillance.gouv.fr',
          fr: 'Cybermalveillance.gouv.fr',
        },
        why: {
          en: 'Cybermalveillance.gouv.fr is the public service for advice after a cyber incident or scam. Keep the messages. That site does not replace a notice from the organisation that held your data, but it is the right place to start.',
          fr: 'Cybermalveillance.gouv.fr est le service public d’aide après un incident ou une arnaque. Conservez les messages. Ce site ne remplace pas une notification de l’organisation qui détenait vos données, mais c’est le bon point de départ.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'The phone number or website printed in the unexpected message.',
          fr: 'Le numéro ou le site imprimés dans le message inattendu.',
        },
        why: {
          en: 'Those details are part of the lure. Type cybermalveillance.gouv.fr yourself, or open the official app of the real organisation from your own bookmark.',
          fr: 'Ces éléments font partie de l’appât. Saisissez vous-même cybermalveillance.gouv.fr, ou ouvrez l’application officielle du vrai organisme depuis votre propre favori.',
        },
      },
    ],
  },
  {
    id: 'password-reuse',
    section: {
      en: 'Passwords after a leak',
      fr: 'Mots de passe après une fuite',
    },
    prompt: {
      en: 'A service you used may have held a password you also used on your bank and your mail. What should you do first?',
      fr: 'Un service que vous utilisiez a pu détenir un mot de passe que vous utilisiez aussi pour votre banque et votre messagerie. Que faire d’abord ?',
    },
    dek: {
      en: 'The useful prize after a leak is often not that one login. It is every other account that shared the same secret.',
      fr: 'Le butin utile après une fuite n’est souvent pas cette seule connexion. Ce sont tous les autres comptes qui partageaient le même secret.',
    },
    kind: 'choice',
    correctId: 'b',
    choices: [
      {
        id: 'a',
        label: {
          en: 'Change the password only on the service that was breached.',
          fr: 'Changer le mot de passe uniquement sur le service qui a fuité.',
        },
        why: {
          en: 'Changing it there is useful, but the other accounts still accept the old secret. Change every account that shared it, starting with mail and banking.',
          fr: 'Le changer là est utile, mais les autres comptes acceptent encore l’ancien secret. Changez tous les comptes qui le partageaient, en commençant par la messagerie et la banque.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Change it on every other account that shared that password.',
          fr: 'Le changer sur tous les autres comptes qui partageaient ce mot de passe.',
        },
        why: {
          en: 'Reuse is the real problem. One stolen file should not open several services. A password manager makes the next secret unique.',
          fr: 'C’est la réutilisation qui pose problème. Un fichier volé ne devrait pas ouvrir plusieurs services. Un gestionnaire de mots de passe rend le secret suivant unique.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Wait to see whether money leaves your accounts before changing anything.',
          fr: 'Attendre de voir si de l’argent quitte vos comptes avant de changer quoi que ce soit.',
        },
        why: {
          en: 'A hashed or unused password is still a reason to change it. Do not wait to see whether money moves. The other accounts that shared the secret are already exposed.',
          fr: 'Un mot de passe hashé ou encore inutilisé reste une raison de le changer. N’attendez pas de voir si de l’argent bouge. Les autres comptes qui partageaient le secret sont déjà exposés.',
        },
      },
    ],
  },
  {
    id: 'passkey-vs-sms',
    section: {
      en: 'Passwords after a leak',
      fr: 'Mots de passe après une fuite',
    },
    prompt: {
      en: 'Why is a passkey harder to phish than an SMS code after a leak?',
      fr: 'Pourquoi une passkey est-elle plus difficile à hameçonner qu’un code SMS après une fuite ?',
    },
    dek: {
      en: 'Multi-factor authentication is useful. Not every factor is equal once someone already has your name, number or IBAN.',
      fr: 'L’authentification à plusieurs facteurs est utile. Tous les facteurs ne se valent pas une fois que quelqu’un a déjà votre nom, votre numéro ou votre IBAN.',
    },
    kind: 'choice',
    correctId: 'b',
    choices: [
      {
        id: 'a',
        label: {
          en: 'A passkey is simply a longer password.',
          fr: 'Une passkey n’est qu’un mot de passe plus long.',
        },
        why: {
          en: 'A passkey is a key stored on your device or password manager, made for one site. It is not a string you type. Length is not the difference.',
          fr: 'Une passkey est une clé stockée sur votre appareil ou dans votre gestionnaire, faite pour un seul site. Ce n’est pas une chaîne que vous saisissez. La longueur n’est pas la différence.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'A passkey is bound to the real site. An SMS code can be read aloud to a caller.',
          fr: 'Une passkey est liée au vrai site. Un code SMS peut être dicté à un appelant.',
        },
        why: {
          en: 'A fake page cannot collect a passkey the way it collects a typed password. An SMS code still has to be typed or read out, which is what a caller who already knows your number will ask for.',
          fr: 'Une fausse page ne peut pas collecter une passkey comme elle collecte un mot de passe saisi. Un code SMS doit encore être saisi ou dicté, ce qu’un appelant qui connaît déjà votre numéro vous demandera.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'SMS codes become illegal to send after a breach notice.',
          fr: 'Les codes SMS deviennent illégaux à envoyer après une notification de fuite.',
        },
        why: {
          en: 'Banks and tax services still send SMS codes. The problem is that a code you can read aloud is still phishable. Prefer a passkey or an authenticator you unlock yourself.',
          fr: 'Les banques et les impôts envoient encore des codes SMS. Le problème est qu’un code que l’on peut dicter reste hameçonnable. Préférez une passkey ou une application d’authentification que vous déverrouillez vous-même.',
        },
      },
    ],
  },
]

if (quizQuestions.length !== quizQuestionCount) {
  throw new Error(`quizQuestionCount is ${quizQuestionCount} but quizQuestions has ${quizQuestions.length}`)
}

export function quizChoiceLetter(index: number): string {
  return String.fromCharCode(65 + index)
}

export function quizScoreFor(answers: Record<string, string>): number {
  return quizQuestions.reduce((total, question) => total + (answers[question.id] === question.correctId ? 1 : 0), 0)
}

export function quizHasPassed(score: number, total = quizQuestions.length): boolean {
  if (total <= 0) return false
  return (score / total) * 100 >= quizPassPercent
}

export function quizLinkedInShareUrl(text: string): string {
  return `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`
}
