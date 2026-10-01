/**
 * Italian text for /what-im-doing, laid over the English content in doing.ts
 * by chapter id, plus the page's own labels in both languages. Slugs, links
 * and visuals stay in doing.ts so the two languages cannot drift apart in
 * structure; a test checks every chapter has a translation of the same shape.
 */
import type { Lang } from "./plain";

export type ChapterText = {
  kicker: string;
  headline: string;
  lead: string;
  benefits: string[];
  proof: { value: string; label: string; source: string }[];
  reading?: string[];
};

export const chaptersIt: Record<string, ChapterText> = {
  webcheckup: {
    kicker: "Prodotto · Basi di sicurezza web",
    headline: "Controlli del sito su cui il titolare di un’attività può agire.",
    lead:
      "WebCheckup guarda un sito pubblico dall’esterno, come farebbe un cliente, un browser o un motore di ricerca, e trasforma ciò che trova in un rapporto breve, con le priorità, scritto in parole semplici.",
    benefits: [
      "Individua i problemi visibili che fanno perdere fiducia: HTTPS non funzionante, protezioni del browser mancanti, pagine lente o inutilizzabili da telefono, link rotti.",
      "Dice chi può sistemare ogni punto e quanto è urgente, invece di consegnare l’elenco grezzo di uno scanner.",
      "Non afferma mai ciò che non può dimostrare: un’email di contatto può citare un problema solo se la prova si ripete.",
    ],
    proof: [
      { value: "2", label: "lingue, tenute allineate da un test", source: "test di parità tra email in italiano e in inglese, nel repository del motore" },
      { value: "39", label: "file di test nel motore", source: "file di test nel repository privato del motore" },
      { value: "123", label: "commit da luglio", source: "git rev-list --count HEAD, repository del motore" },
    ],
  },
  "client-work": {
    kicker: "Lavoro per clienti · Web e dati",
    headline: "Lavoro vero per attività vere.",
    lead:
      "Ho costruito e mantengo il sito di produzione di un’azienda agricola. A parte, per una piccola attività che lavorava su due vecchi database a utente singolo, ho analizzato i dati e pianificato un passaggio sostenibile a un sistema condiviso, consegnando lungo il percorso il primo pezzo utilizzabile.",
    benefits: [
      "Un sito veloce, pensato prima per il telefono, con i dati per i motori di ricerca, moduli validati e statistiche che aspettano il consenso.",
      "Una migrazione pianificata partendo dalle prove: solo copie, originali verificati intatti, e la logica dell’attività trovata dove vive davvero.",
      "Opzioni con i costi, spiegate in parole semplici, e poi una consegna a fasi in cui ogni passo aspetta il via del cliente.",
    ],
    proof: [
      { value: "231", label: "commit sul sito online", source: "git rev-list --count HEAD, repository pubblico del sito dell’azienda agricola" },
      { value: "37", label: "sezioni nel rapporto di migrazione", source: "rapporto consegnato al cliente a luglio 2026 (privato)" },
      { value: "10", label: "fogli nel file di lavoro consegnato", source: "prototipo del foglio ore consegnato a luglio 2026 (privato)" },
    ],
    reading: ["Lo studio di migrazione"],
  },
  foresight: {
    kicker: "Metodo · Rilasci sicuri",
    headline: "Mettere in produzione l’automazione senza scoprire gli errori attraverso i clienti.",
    lead:
      "Foresight è un controllo prima del rilascio che ho costruito dopo che i risultati di un sistema di IA erano arrivati a persone vere con difetti che nessuno aveva visto. Prima che parta una modifica rischiosa, si indicano i tipi di guasto che la riguardano, ognuno riceve un meccanismo, e ognuno una prova realmente eseguita.",
    benefits: [
      "Meno incidenti scoperti da chi sta dall’altra parte.",
      "Una traccia scritta: cosa poteva rompersi, cosa lo impedisce, e la prova che è stato controllato.",
      "Controlli che reggono. Dove un guasto arriverebbe a una persona, la regola è costruita nel sistema invece di restare un’istruzione.",
    ],
    proof: [
      { value: "34", label: "tipi di guasto documentati", source: "righe numerate nel catalogo della competenza foresight" },
      { value: "5 su 6", label: "le volte in cui una regola nel prompt ha retto, ed è diventata un filtro", source: "misura su prove ripetute, registrata nella competenza" },
    ],
  },
  "safe-messaging": {
    kicker: "IA applicata · Consegna a prova di errore",
    headline: "Un’IA che parla con le persone, con una rete di sicurezza sulla porta.",
    lead:
      "Uso un assistente che risponde in automatico su WhatsApp nelle mie conversazioni, con persone che sanno che c’è. Poiché un messaggio sbagliato non si può ritirare, tratto l’istante prima dell’invio come punto di controllo e misuro l’assistente come un sistema sotto test.",
    benefits: [
      "Tra il modello e il destinatario ci sono un filtro e un passaggio di rifinitura, così note interne, ragionamenti del modello ed errori degli strumenti non escono mai.",
      "Acceso o spento per singola conversazione, un’indicazione di tono temporanea che scade da sola, e una risposta che non supera i controlli finali non viene inviata.",
      "Misurato, non sperato: 123 scenari di prova eseguiti tre volte ciascuno, più un turno reale di controllo sul percorso di produzione.",
    ],
    proof: [
      { value: "123 × 3", label: "esecuzioni di scenari per ogni giro di misura", source: "descrizione della sonda nell’elenco privato dei difetti, 25–26 settembre 2026" },
      { value: "2 notti", label: "di misure hanno fatto emergere i difetti; quasi tutte le correzioni sono diventate meccanismi", source: "stesso elenco dei difetti" },
    ],
    reading: ["Attaccare il mio stesso chatbot", "Una risposta è un permesso, non un suggerimento"],
  },
  supervisor: {
    kicker: "Agenti · Misurare con onestà",
    headline: "Agenti che devono dimostrare il loro lavoro, e una prova che ho raccontato con onestà.",
    lead:
      "Ho costruito un livello di supervisione perché un agente di IA non potesse semplicemente dire che un lavoro era fatto. L’ho fatto girare dal vivo, l’ho misurato, e l’ho spento mentre correggevo ciò che i numeri avevano messo in luce.",
    benefits: [
      "Approvazioni prima dei passi delicati, una registrazione per ogni decisione, e un recupero dopo un blocco che non ripete le azioni già fatte.",
      "Per dire “finito” serve una prova indipendente. Il successo dichiarato da chi ha fatto il lavoro viene respinto.",
      "Un’abitudine a misurare i risultati. Un controllo di prontezza verde non è la stessa cosa del lavoro che viene portato a termine.",
    ],
    proof: [
      { value: "41", label: "compiti nella prova dal vivo", source: "verifica del database della prova, 18 luglio – 2 agosto 2026, nel registro di stato del supervisore" },
      { value: "2", label: "compiti reali distinti completati", source: "stessa verifica" },
    ],
  },
  security: {
    kicker: "Sicurezza · Revisione e pratica",
    headline: "Trovare il difetto nel mio strumento prima che lo trovi qualcun altro.",
    lead:
      "Ho revisionato uno strumento per il browser che avevo scritto per un agente di IA e ho trovato un vero percorso di DNS rebinding: il controllo di sicurezza e il browser potevano finire a parlare con indirizzi diversi. Ho documentato le opzioni e il costo di ciascuna. In parallelo tengo un diario pubblico quotidiano di studio e un repository di pratica sulle regole di rilevamento.",
    benefits: [
      "L’abitudine di attaccare il mio stesso lavoro, e poi di mettere per iscritto il ragionamento perché chi revisiona possa non essere d’accordo.",
      "A mio agio con le basi del rischio web e di rete: SSRF, DNS, TLS, intestazioni, privilegio minimo.",
      "Imparare in pubblico: 243 giorni di appunti e laboratori, errori compresi.",
    ],
    proof: [
      { value: "243", label: "giorni nel diario pubblico", source: "ultima sincronizzazione del diario pubblico di studio" },
      { value: "1", label: "percorso SSRF reale trovato nel mio codice", source: "revisione di sicurezza dello strumento per il browser, 27 luglio 2026" },
    ],
  },
};

export const rolesIt = [
  {
    title: "Analista di sicurezza junior",
    body: "Triage, messa a punto delle regole di rilevamento, rischio web e di rete, resoconti accurati. Spiego il mio ragionamento e mi piace essere revisionato.",
  },
  {
    title: "Gestione di IA e automazione",
    body: "Far girare agenti, smistare il lavoro tra modelli, tenerli sicuri e misurabili, e documentare in modo che chiunque possa subentrare.",
  },
  {
    title: "Salute dei siti delle piccole attività",
    body: "Controlli del sito in parole semplici e correzioni per HTTPS, velocità, telefono e visibilità.",
  },
];

export const heroStatsIt = [
  { value: "1.364", label: "commit in 13 settimane" },
  { value: "34", label: "tipi di guasto nel mio controllo di rilascio" },
  { value: "243", label: "giorni di appunti pubblici di studio" },
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
    headlineA: "I build AI that does real work,",
    headlineB: "and the safety around it.",
    lead: "Real projects, what each one does for a team, and the numbers behind them. Built with AI pair-programming. I set the goals, the guardrails and the review.",
    contact: "Get in touch",
    seeProjects: "See the projects",
    pdf: "One-page PDF",
    plainA: "Not in tech?",
    plainLink: "Read it in plain words",
    plainB: ", in English or Italian.",
    teamGets: "What a team gets",
    fullStory: "The full story",
    counted: "How the numbers were counted",
    fitKicker: "Where I fit",
    fitTitle: "Early in my career, and open to what fits.",
    fitBody: "I am at the start of a move into security and AI operations. I would rather show you the work than describe it, and I learn quickly from review.",
    longTitle: "Want the long version?",
    longBody: "The workstation page has every project, including the ones I stopped and why. I will also walk you through any of it live.",
    openWorkstation: "Open the workstation",
    emailMe: "Email me",
    detailNote: "",
  },
  it: {
    kicker: "Cosa sto facendo",
    headlineA: "Costruisco IA che fa lavoro vero,",
    headlineB: "e la sicurezza che le sta intorno.",
    lead: "Progetti reali, cosa fa ciascuno per un team, e i numeri che li sostengono. Costruiti programmando in coppia con l’IA. Io stabilisco gli obiettivi, i limiti e la revisione.",
    contact: "Scrivimi",
    seeProjects: "Vedi i progetti",
    pdf: "PDF di una pagina (in inglese)",
    plainA: "Non sei del settore?",
    plainLink: "Leggilo in parole semplici",
    plainB: ".",
    teamGets: "Cosa ottiene un team",
    fullStory: "La storia completa",
    counted: "Come sono stati contati i numeri",
    fitKicker: "Dove posso essere utile",
    fitTitle: "All’inizio della carriera, e aperto a ciò che è adatto.",
    fitBody: "Sto iniziando un percorso nella sicurezza informatica e nella gestione di sistemi di IA. Preferisco mostrarti il lavoro piuttosto che descriverlo, e imparo in fretta dalle revisioni.",
    longTitle: "Vuoi la versione lunga?",
    longBody: "La pagina della workstation contiene tutti i progetti, compresi quelli che ho fermato e il perché. Posso anche mostrarti tutto dal vivo.",
    openWorkstation: "Apri la workstation",
    emailMe: "Scrivimi",
    detailNote: "Le pagine di dettaglio e gli articoli collegati sono in inglese.",
  },
};
