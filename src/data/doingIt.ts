/**
 * Italian copy mirrors the six English chapters and their dated claim limits.
 * Structure, routes and visuals are shared through doing.ts.
 */
import type { Lang } from "./plain";
import { jekyllSnapshot } from "./jekyllSnapshot.generated";

export type ChapterText = {
  kicker: string;
  headline: string;
  lead: string;
  benefits: string[];
  proof: { value: string; label: string; source: string }[];
  reading?: string[];
};

export const chaptersIt: Record<string, ChapterText> = {
  "hermes-ubuntu": {
    "kicker": "Linux · Integrazioni AI",
    "headline": "Migrare su Ubuntu il gateway di un assistente AI.",
    "lead": "Ho personalizzato e distribuito su Ubuntu Hermes Agent, progetto open source di Nous Research, separando il gateway di messaggistica dai servizi opzionali della workstation. L’audit del 25 novembre 2026 ha verificato metadati runtime e file installati selezionati; alcune attività dipendono ancora da modelli cloud o servizi della workstation.",
    "benefits": [
      "Distribuzione e gestione delle dipendenze attorno a un agente open source esistente, distinguendo il progetto originale dalle integrazioni personalizzate.",
      "Distinzione fra servizio in esecuzione, lavoro completato e risultato accettato, sostenuta da prove registrate.",
      "Documentazione operativa che rende visibili dipendenze opzionali e limiti del recupero."
    ],
    "proof": [
      {
        "value": "Ubuntu",
        "label": "gateway osservato in esecuzione il 25 nov 2026",
        "source": "Audit del 25 nov 2026: metadati del servizio, heartbeat e hash di file installati selezionati"
      },
      {
        "value": "Open source",
        "label": "Hermes Agent di Nous Research",
        "source": "Confronto fra baseline upstream Hermes e integrazioni personalizzate, 25 nov 2026"
      }
    ],
    "reading": [
      "Caso studio sulla migrazione"
    ]
  },
  "conversation-calendar": {
    "kicker": "WhatsApp · Integrazione calendario",
    "headline": "Dalla conversazione ad azioni sul calendario verificate.",
    "lead": "Ho sviluppato flussi attorno a Hermes Agent per raccogliere contesto conversazionale entro limiti definiti, validare partecipanti e date e scrivere su Google Calendar con rilettura di controllo. Una richiesta reale documentata ha verificato scrittura e rilettura il 15 novembre 2026; all’audit del 25 novembre le nuove capacità conversazionali erano ancora in validazione nell’uso normale.",
    "benefits": [
      "Il contesto conversazionale viene limitato e validato prima che un appuntamento proposto diventi un’azione sul calendario.",
      "ID evento deterministici e rilettura aiutano a rilevare duplicati e verificare la scrittura.",
      "Lo stato persistente delle notifiche permette di ritentare dopo un errore; un blocco fra accettazione remota e ricevuta locale può ancora duplicare una notifica."
    ],
    "proof": [
      {
        "value": "15 nov",
        "label": "2026: scrittura e rilettura calendario registrate",
        "source": "Ricevuta di accettazione della richiesta owner del 15 nov 2026; versione dello script diversa da quella dell’audit del 25 nov"
      },
      {
        "value": "Retry",
        "label": "stato persistente delle notifiche, con limiti",
        "source": "Revisione del sorgente del 25 nov 2026: outbox limitata e notifiche con semantica almeno-una-volta"
      }
    ],
    "reading": [
      "Caso studio sul calendario",
      "Il lavoro precedente sulla messaggistica",
      "Attaccare il mio stesso chatbot",
      "Una risposta è un permesso, non un suggerimento"
    ]
  },
  "video-reliability": {
    "kicker": "Affidabilità · Output video",
    "headline": "Verificare l’output utilizzabile e i processi in esecuzione.",
    "lead": "Ho costruito e gestito una pipeline video con recupero basato sull’avanzamento e controlli d’integrità che decodificano l’output. L’audit del 25 novembre 2026 ha rilevato una verifica di decodifica completata con successo e file in avanzamento. Queste prove riguardano l’output campionato, senza dimostrare disponibilità continua o integrità di ogni archivio.",
    "benefits": [
      "Le decisioni di recupero usano l’avanzamento del lavoro, oltre alla presenza del processo.",
      "La validazione dell’output controlla se il video prodotto può essere effettivamente decodificato.",
      "Le verifiche registrate distinguono i risultati osservati dai casi di guasto che non sono stati esercitati."
    ],
    "proof": [
      {
        "value": "Decodifica",
        "label": "verifica completata osservata il 25 nov 2026",
        "source": "Audit del 25 nov 2026: risultato della verifica d’integrità completata e output decodificato"
      },
      {
        "value": "Avanzamento",
        "label": "output in crescita nel campione dell’audit",
        "source": "Audit del 25 nov 2026: campionamento passivo dell’avanzamento dei file; nessun nuovo test guasti o playback"
      }
    ],
    "reading": [
      "Caso studio sull’affidabilità dell’output"
    ]
  },
  "workstation-climate": {
    "kicker": "Automazione · Dispositivi e controllo",
    "headline": "Coordinare richieste, disponibilità e approvazione dell’owner.",
    "lead": "Ho implementato richieste coordinate alla workstation con tentativi limitati e controlli di disponibilità, insieme a flussi del clima approvati dall’owner e report di utilizzo. All’audit del 25 novembre 2026, le registrazioni di disponibilità non dimostravano indipendentemente una transizione automatica dalla sospensione al lavoro utile e l’attuazione fisica del clima dopo approvazione restava non verificata.",
    "benefits": [
      "Coordinamento condiviso, timeout e verifiche di disponibilità rendono esplicite le dipendenze opzionali dalla workstation.",
      "I confini di approvazione distinguono una richiesta autorizzata dall’attuazione fisica confermata.",
      "I report di utilizzo distinguono le ore nelle modalità operative dai consumi energetici."
    ],
    "proof": [
      {
        "value": "Disponibilità",
        "label": "percorso di richiesta rivisto il 25 nov 2026",
        "source": "Audit del 25 nov 2026: richieste registrate e prove di disponibilità; accettazione automatica sospensione-lavoro ancora aperta"
      },
      {
        "value": "Approvazione",
        "label": "confine di controllo e report revisionati",
        "source": "Audit del 25 nov 2026: bridge di approvazione e ricevute dei report; attuazione fisica ancora non verificata"
      }
    ],
    "reading": [
      "Caso studio sulla workstation",
      "Integrazione del clima",
      "Caso studio sul clima"
    ]
  },
  "web-client-data": {
    "kicker": "Lavoro per clienti · Web e dati",
    "headline": "Siti pratici, controlli e pianificazione delle migrazioni.",
    "lead": "WebCheckup trasforma i riscontri su un sito pubblico in un rapporto con priorità. Ho anche costruito e mantengo il sito di un’azienda agricola e, a luglio 2026, ho consegnato uno studio di migrazione database e un prototipo utilizzabile di un file di lavoro per una piccola attività.",
    "benefits": [
      "Il lavoro sui siti comprende layout per telefono, metadati per la ricerca, validazione dei moduli e statistiche subordinate al consenso.",
      "I riscontri di un controllo richiedono prove riproducibili e un responsabile chiaro per la correzione proposta.",
      "La pianificazione della migrazione usa copie, preserva gli originali e distingue il prototipo consegnato dalla migrazione completa."
    ],
    "proof": [
      {
        "value": "37",
        "label": "sezioni nel rapporto di migrazione di luglio 2026",
        "source": "Rapporto di migrazione consegnato al cliente a luglio 2026; consegna storica, non migrazione completata"
      },
      {
        "value": "10",
        "label": "fogli nel prototipo consegnato a luglio 2026",
        "source": "Prototipo del file ore consegnato a luglio 2026"
      }
    ],
    "reading": [
      "Il sito dell’azienda agricola",
      "Lo studio di migrazione"
    ]
  },
  "security-foresight": {
    "kicker": "Sicurezza · Revisione e prove di rilascio",
    "headline": "Revisionare i miei strumenti e chiedere prove prima del rilascio.",
    "lead": "A luglio 2026 ho trovato un percorso di DNS rebinding revisionando il mio strumento per il browser e ne ho documentato i compromessi. Foresight associa ai casi di guasto pertinenti meccanismi e verifiche registrate prima di una modifica rischiosa. Il diario pubblico di studio e la pratica sulle regole di rilevamento restano parte del lavoro.",
    "benefits": [
      "Le revisioni di sicurezza spiegano il ragionamento e consentono a chi revisiona di metterlo in discussione.",
      "I controlli di rilascio indicano cosa potrebbe fallire, quale meccanismo lo affronta e quale prova è stata realmente eseguita.",
      "Appunti pubblici e laboratori distinguono ricerca, verifiche sintetiche e risultati operativi osservati."
    ],
    "proof": [
      {
        "value": "Revisione",
        "label": "studio di sicurezza sul browser, luglio 2026",
        "source": "Revisione dell’adapter browser del 27 lug 2026: percorso DNS rebinding e compromessi delle mitigazioni"
      },
      {
        "value": "Prove",
        "label": "casi di guasto, meccanismi e verifiche eseguite",
        "source": "Metodo Foresight rivisto nell’audit portfolio approvato del 25 nov 2026"
      }
    ],
    "reading": [
      "La revisione di sicurezza dello strumento browser"
    ]
  }
};

export const rolesIt = [
  {
    "title": "Operazioni IT junior",
    "body": "Servizi Linux, gestione delle dipendenze, verifiche di recupero e documentazione utilizzabile da un altro operatore."
  },
  {
    "title": "Integrazioni AI e automazione",
    "body": "Collegare strumenti e API esistenti, validarne i risultati e rendere espliciti autorizzazioni e gestione dei guasti."
  },
  {
    "title": "Analista di sicurezza junior",
    "body": "Triage, pratica di rilevamento, rischio web e di rete e resoconti che rendono il ragionamento verificabile."
  }
];

export const heroStatsIt = [
  { value: "Linux", label: "servizi e operazioni" },
  { value: "API", label: "integrazioni pratiche per l’automazione" },
  { value: jekyllSnapshot.posts.length.toLocaleString("it-IT"), label: "articoli pubblici di studio nello snapshot sincronizzato" },
];

export type DoingUi = {
  kicker: string;
  headlineA: string;
  headlineB: string;
  lead: string;
  contact: string;
  seeProjects: string;
  pdf: string;
  plainA: string;
  plainLink: string;
  plainB: string;
  teamGets: string;
  fullStory: string;
  counted: string;
  fitKicker: string;
  fitTitle: string;
  fitBody: string;
  longTitle: string;
  longBody: string;
  openWorkstation: string;
  emailMe: string;
  detailNote: string;
};

export const doingUi: Record<Lang, DoingUi> = {
  en: {
    kicker: "What I'm doing",
    headlineA: "I build and operate Linux services,",
    headlineB: "automations and AI integrations.",
    lead: "Practical projects, dated evidence and clear limits. Built with AI assistance: I set the requirements, integrate the tools and verify the results.",
    contact: "Get in touch",
    seeProjects: "See the projects",
    pdf: "One-page PDF",
    plainA: "Not in tech?",
    plainLink: "Read it in plain words",
    plainB: ", in English or Italian.",
    teamGets: "What a team gets",
    fullStory: "The full story",
    counted: "Evidence and scope",
    fitKicker: "Where I fit",
    fitTitle: "Early in my career, and open to what fits.",
    fitBody: "I am preparing for a junior role in IT operations, automation or security. These projects show what I have built, how I check it and where I am still learning.",
    longTitle: "Want the long version?",
    longBody: "The workstation page has every project, including the ones I stopped and why. I will also walk you through any of it live.",
    openWorkstation: "Open the workstation",
    emailMe: "Email me",
    detailNote: "",
  },
  it: {
    kicker: "Cosa sto facendo",
    headlineA: "Costruisco e gestisco servizi Linux,",
    headlineB: "automazioni e integrazioni AI.",
    lead: "Progetti pratici, prove datate e limiti espliciti. Con assistenza AI: io definisco i requisiti, integro gli strumenti e verifico i risultati.",
    contact: "Scrivimi",
    seeProjects: "Vedi i progetti",
    pdf: "PDF di una pagina (in inglese)",
    plainA: "Non sei del settore?",
    plainLink: "Leggilo in parole semplici",
    plainB: ".",
    teamGets: "Cosa ottiene un team",
    fullStory: "La storia completa",
    counted: "Prove e ambito",
    fitKicker: "Dove posso essere utile",
    fitTitle: "All’inizio della carriera, e aperto a ciò che è adatto.",
    fitBody: "Mi preparo a un ruolo junior nelle operazioni IT, nell’automazione o nella sicurezza. Questi progetti mostrano cosa ho costruito, come lo verifico e dove sto ancora imparando.",
    longTitle: "Vuoi la versione lunga?",
    longBody: "La pagina della workstation contiene tutti i progetti, compresi quelli che ho fermato e il perché. Posso anche mostrarti tutto dal vivo.",
    openWorkstation: "Apri la workstation",
    emailMe: "Scrivimi",
    detailNote: "Le schede tecniche sono in inglese; i cinque nuovi casi studio includono anche la versione italiana.",
  },
};
