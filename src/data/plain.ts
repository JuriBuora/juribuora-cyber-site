/**
 * Content for /in-plain-words: the same work as /what-im-doing, explained for
 * someone who does not work in tech. English and Italian carry the same
 * points; the test checks the two stay the same shape. No jargon without an
 * explanation next to it, and nothing private (the scrub test covers this file).
 */

export type Lang = "en" | "it";

type Card = { title: string; role: string; body: string };
type Step = { title: string; body: string };
type Story = { title: string; what: string; fix: string };
type Item = { title: string; body: string };
type QA = { q: string; a: string };

export type PlainContent = {
  switchLabel: string;
  kicker: string;
  headline: string;
  lead: string;
  castTitle: string;
  castIntro: string;
  cast: Card[];
  journeyTitle: string;
  journeyIntro: string;
  journey: Step[];
  storiesTitle: string;
  storiesIntro: string;
  whatHappened: string;
  whatChanged: string;
  stories: Story[];
  usesTitle: string;
  usesIntro: string;
  uses: Item[];
  companyTitle: string;
  company: string[];
  wordsTitle: string;
  words: { term: string; meaning: string }[];
  faqTitle: string;
  faq: QA[];
  outroTitle: string;
  outro: string;
  ctaContact: string;
  ctaDetail: string;
  /** Labels for the seven role pages. */
  roleMore: string;
  roleBack: string;
  roleNext: string;
  roleOpenHint: string;
  roleCuriosity: string;
  roleHistoryTitle: string;
  roleHistoryBody: string;
  roleHistoryLink: string;
};

const en: PlainContent = {
  switchLabel: "Leggi in italiano",
  kicker: "In plain words",
  headline: "My AI tools work like a small team.",
  lead:
    "I integrate open-source AI tools with Linux services, calendars and practical automations, and check what they actually do. Here is how it works, with no technical words that are not explained.",
  castTitle: "Who works there",
  castIntro:
    "Think of a small office. These roles explain the design. The detail pages preserve the September–October 2026 setup and earlier experiments; the current showcase describes the November work.",
  cast: [
    {
      title: "The brains",
      role: "AI models",
      body: "They read and write. I have tried models on my own computer and models from outside companies. A local model keeps its calculation on the machine, but tools and other services may still send data elsewhere.",
    },
    {
      title: "The workers",
      role: "Agents",
      body: "A brain alone only talks. A worker is a brain that has been given a goal and is allowed to do things: open a file, check a calendar, write a report.",
    },
    {
      title: "The manager",
      role: "Router",
      body: "The aim is to match a job to a suitable model and worker. I tested different routing rules in September 2026; those results do not establish which route every request uses today.",
    },
    {
      title: "The hands",
      role: "Tools",
      body: "Files, the calendar, the web browser, messages. I design each workflow to give the worker the access it needs. The actual limits depend on the tools and permissions in that workflow.",
    },
    {
      title: "The archive",
      role: "Memory",
      body: "Decisions, notes and what was done yesterday. Written records help the next session continue; they still need checking for gaps and stale information.",
    },
    {
      title: "Quality control",
      role: "Checks",
      body: "My rule is to ask for evidence beyond the worker’s own claim. A check supports only the result it actually examined; it cannot guarantee that every task was completed correctly.",
    },
    {
      title: "The insurance",
      role: "Backups",
      body: "Encrypted copies and restore exercises were part of the September–October 2026 setup. A successful exercise showed that selected data could be read back. It did not establish that every copy contains everything or can rebuild the whole system.",
    },
  ],
  journeyTitle: "One request, start to finish",
  journeyIntro: "An example of the intended flow. The route and approval steps depend on the particular workflow.",
  journey: [
    { title: "I ask", body: "I send a message, typed or spoken: “tidy up this project and tell me what changed”." },
    { title: "It checks it is really me", body: "A command should arrive through an approved route. Where a spoken request needs confirmation, reading it back helps catch a misheard instruction." },
    { title: "The manager picks a worker", body: "The model and worker should fit the task. Local processing and outside services are possible choices; automatic routing needs its own checks." },
    { title: "The worker looks things up", body: "The worker should consult relevant notes and use permitted tools. Old notes and missing information still need checking." },
    { title: "Anything risky waits for me", body: "Sensitive actions need the right authority. A new approval may be needed; a previously authorised action can run within its agreed limits." },
    { title: "The work is checked", body: "The aim is to compare the result with the request using independent evidence. A check that was not run leaves the outcome unverified." },
    { title: "I get the result", body: "A short message with what was done, what was not, and where to find it." },
  ],
  storiesTitle: "Three things that went wrong",
  storiesIntro:
    "These earlier incidents shaped the design described in the September–October 2026 notes. Each taught me to check a different part of the system.",
  whatHappened: "What happened",
  whatChanged: "What I changed",
  stories: [
    {
      title: "It said good night at 11:24 in the morning",
      what: "My assistant sent someone a cheerful “good night” before lunch. It was using a note about the time that had been written hours earlier and never refreshed.",
      fix: "The recorded fix read the clock for each request. The lesson was to check whether information is fresh enough for the decision.",
    },
    {
      title: "A message switched my computer off",
      what: "One day my computer shut down after a chat message arrived, and at first I could not find what had done it.",
      fix: "The recorded response added identity checks and an attempt record. It taught me to establish who can request a consequential action and how to trace it.",
    },
    {
      title: "It said it had finished six jobs overnight",
      what: "I left a worker running while I slept. In the morning it reported six jobs done. I had them checked independently: most were half done or wrong.",
      fix: "That experience made independent evidence a design requirement. The old Supervisor experiment is retired and is not part of the current setup.",
    },
  ],
  usesTitle: "What it is good for",
  usesIntro: "Examples of delivered work and workflows I have developed. Their detail pages explain the evidence and limits.",
  uses: [
    { title: "A website for a real farm", body: "A fast site for an agricultural business, with products, contacts and the legal pages done properly. It is live and used." },
    { title: "Check-ups for small business websites", body: "A service that looks at a shop’s website from the outside and explains, in plain language, what would worry a customer or a browser." },
    { title: "A public diary of learning security", body: "A public collection of dated security notes and practical exercises, including mistakes and what I learned." },
    { title: "An assistant I can reach from my phone", body: "I built chat workflows with reply controls and output filters. Those mechanisms have specific tests; recognising and blocking every uncertain answer remains beyond what those tests prove." },
  ],
  companyTitle: "Why a company might care",
  company: [
    "More and more companies let AI do real work. Somebody has to make sure it does the right thing, tells the truth about what it did, and can be stopped.",
    "That is what I practise every day: giving a machine only the access it needs, checking its work, and keeping a way back when something breaks.",
    "I document decisions and open questions in plain language so another person can review the work.",
  ],
  wordsTitle: "A few words, explained",
  words: [
    { term: "AI model", meaning: "A program that has learned from a huge amount of text and can read, write and reason about new text." },
    { term: "Agent", meaning: "An AI model that has been given a goal and permission to use tools to reach it." },
    { term: "Running locally", meaning: "The model calculates on my own computer. Other tools, storage or outside services in the same task may still send data elsewhere." },
    { term: "Cybersecurity", meaning: "Keeping computers, accounts and information safe from people who should not have them." },
    { term: "Backup", meaning: "A spare copy kept separately. A restore exercise checks what can be recovered from that particular copy." },
    { term: "Phishing", meaning: "A fake message made to look real, so that you hand over a password or click something harmful." },
  ],
  faqTitle: "Questions people ask me",
  faq: [
    { q: "Did you write all of this yourself?", a: "No, and I say so. I work together with AI coding assistants. I decide what should be built, what must never happen, and I check the result. They write a lot of the code under those rules." },
    { q: "Does my information go to the internet?", a: "It depends on the whole workflow. Some model calls can run locally; others use an outside service. I need to check the tools and data path as well as the model before calling a task private." },
    { q: "Is this your job?", a: "Not yet. I built it in my free time while studying security. I am looking for a junior role in IT operations, automation or security." },
    { q: "Can I see it working?", a: "Yes. Write to me and I will show you, live." },
  ],
  outroTitle: "The short version",
  outro:
    "I adapted Nous Research’s Hermes Agent and moved its gateway to Ubuntu. Optional workstation and cloud services remain. The models propose work, tools perform actions, and checks compare results with the request.",
  ctaContact: "Write to me",
  ctaDetail: "See the detailed version",
  roleMore: "Which ones, and how",
  roleBack: "All seven roles",
  roleNext: "Next",
  roleOpenHint: "Open a card for the story behind it.",
  roleCuriosity: "A curiosity",
  roleHistoryTitle: "Historical setup · September–October 2026",
  roleHistoryBody: "These detail pages describe that period’s setup and earlier tests. Model choices, routing, controls and backup results are historical, not a live inventory. The old Supervisor is retired and is not part of the current setup.",
  roleHistoryLink: "See the November 2026 work",
};

const it: PlainContent = {
  switchLabel: "Read in English",
  kicker: "In parole semplici",
  headline: "I miei strumenti IA lavorano come una piccola squadra.",
  lead:
    "Integro strumenti IA open source con servizi Linux, calendari e automazioni pratiche, e verifico cosa fanno davvero. Ecco come funziona, senza parole tecniche lasciate senza spiegazione.",
  castTitle: "Chi ci lavora",
  castIntro:
    "Immagina un piccolo ufficio. Questi ruoli spiegano il progetto. Le pagine di dettaglio conservano l’assetto di settembre–ottobre 2026 e gli esperimenti precedenti; la vetrina attuale descrive il lavoro di novembre.",
  cast: [
    {
      title: "I cervelli",
      role: "Modelli di IA",
      body: "Leggono e scrivono. Ho provato modelli sul mio computer e modelli di aziende esterne. Un modello locale tiene il proprio calcolo sulla macchina, ma strumenti e altri servizi possono comunque inviare dati altrove.",
    },
    {
      title: "I lavoratori",
      role: "Agenti",
      body: "Un cervello da solo parla e basta. Un lavoratore è un cervello a cui è stato dato un obiettivo e il permesso di fare cose: aprire un file, guardare il calendario, scrivere un rapporto.",
    },
    {
      title: "Il direttore",
      role: "Router",
      body: "L’obiettivo è affidare il lavoro a un modello e a un lavoratore adatti. Ho provato diverse regole di smistamento a settembre 2026; quei risultati non stabiliscono quale percorso usi oggi ogni richiesta.",
    },
    {
      title: "Le mani",
      role: "Strumenti",
      body: "File, calendario, browser, messaggi. Progetto ogni flusso per dare al lavoratore l’accesso necessario. I limiti effettivi dipendono dagli strumenti e dai permessi di quel flusso.",
    },
    {
      title: "L’archivio",
      role: "Memoria",
      body: "Decisioni, appunti e quello che è stato fatto ieri. Gli appunti aiutano la sessione successiva a continuare; restano da controllare lacune e informazioni superate.",
    },
    {
      title: "Il controllo qualità",
      role: "Verifiche",
      body: "La mia regola è chiedere prove oltre alla dichiarazione del lavoratore. Una verifica sostiene solo il risultato che ha esaminato; non può garantire che ogni compito sia stato concluso correttamente.",
    },
    {
      title: "L’assicurazione",
      role: "Backup",
      body: "Copie cifrate e prove di ripristino facevano parte dell’assetto di settembre–ottobre 2026. Una prova riuscita ha mostrato che i dati selezionati erano rileggibili. Non ha dimostrato che ogni copia contenga tutto o possa ricostruire l’intero sistema.",
    },
  ],
  journeyTitle: "Una richiesta, dall’inizio alla fine",
  journeyIntro: "Un esempio del flusso previsto. Percorso e approvazioni dipendono dal singolo flusso di lavoro.",
  journey: [
    { title: "Chiedo", body: "Mando un messaggio, scritto o a voce: “sistema questo progetto e dimmi cosa è cambiato”." },
    { title: "Controlla che sia davvero io", body: "Un comando deve arrivare da un percorso autorizzato. Quando una richiesta vocale richiede conferma, rileggerla aiuta a scoprire un’istruzione capita male." },
    { title: "Il direttore sceglie un lavoratore", body: "Modello e lavoratore devono essere adatti al compito. Elaborazione locale e servizi esterni sono scelte possibili; lo smistamento automatico richiede verifiche proprie." },
    { title: "Il lavoratore si documenta", body: "Il lavoratore deve consultare gli appunti pertinenti e usare gli strumenti consentiti. Appunti vecchi e informazioni mancanti restano da controllare." },
    { title: "Le cose rischiose aspettano me", body: "Le azioni delicate richiedono l’autorizzazione corretta. Può servire una nuova approvazione; un’azione già autorizzata può procedere entro i limiti concordati." },
    { title: "Il lavoro viene controllato", body: "L’obiettivo è confrontare il risultato con la richiesta usando prove indipendenti. Una verifica non eseguita lascia l’esito non verificato." },
    { title: "Ricevo il risultato", body: "Un messaggio breve con cosa è stato fatto, cosa no, e dove trovarlo." },
  ],
  storiesTitle: "Tre cose andate storte",
  storiesIntro:
    "Questi incidenti precedenti hanno orientato il progetto descritto negli appunti di settembre–ottobre 2026. Ciascuno mi ha insegnato a verificare una parte diversa del sistema.",
  whatHappened: "Cosa è successo",
  whatChanged: "Cosa ho cambiato",
  stories: [
    {
      title: "Ha augurato la buonanotte alle 11:24 del mattino",
      what: "Il mio assistente ha mandato a qualcuno un allegro “buonanotte” prima di pranzo. Usava un appunto sull’ora scritto ore prima e mai aggiornato.",
      fix: "La correzione registrata leggeva l’orologio a ogni richiesta. La lezione era controllare se le informazioni fossero abbastanza fresche per la decisione.",
    },
    {
      title: "Un messaggio ha spento il mio computer",
      what: "Un giorno il computer si è spento dopo l’arrivo di un messaggio in chat, e all’inizio non riuscivo a capire cosa fosse stato.",
      fix: "La risposta registrata aggiungeva controlli d’identità e un registro dei tentativi. Mi ha insegnato a stabilire chi possa chiedere un’azione importante e come ricostruirla.",
    },
    {
      title: "Ha detto di aver finito sei lavori in una notte",
      what: "Ho lasciato un lavoratore acceso mentre dormivo. Al mattino ha riferito sei lavori conclusi. Li ho fatti controllare da un altro: quasi tutti erano a metà o sbagliati.",
      fix: "Quell’esperienza ha reso le prove indipendenti un requisito di progetto. Il vecchio esperimento Supervisor è ritirato e non fa parte dell’assetto attuale.",
    },
  ],
  usesTitle: "A cosa serve",
  usesIntro: "Esempi di lavoro consegnato e flussi che ho sviluppato. Le pagine di dettaglio spiegano prove e limiti.",
  uses: [
    { title: "Il sito di una vera azienda agricola", body: "Un sito veloce per un’azienda agricola, con prodotti, contatti e pagine legali fatte come si deve. È online e viene usato." },
    { title: "Controlli per i siti delle piccole attività", body: "Un servizio che guarda il sito di un negozio dall’esterno e spiega, in parole semplici, cosa preoccuperebbe un cliente o un browser." },
    { title: "Un diario pubblico di studio della sicurezza", body: "Una raccolta pubblica di appunti datati sulla sicurezza ed esercizi pratici, compresi errori e lezioni apprese." },
    { title: "Un assistente raggiungibile dal telefono", body: "Ho costruito flussi di chat con controlli sulle risposte e filtri in uscita. Questi meccanismi hanno prove specifiche; riconoscere e bloccare ogni risposta incerta resta oltre ciò che quelle prove dimostrano." },
  ],
  companyTitle: "Perché può interessare a un’azienda",
  company: [
    "Sempre più aziende fanno fare lavoro vero all’IA. Qualcuno deve assicurarsi che faccia la cosa giusta, dica la verità su ciò che ha fatto, e si possa fermare.",
    "È quello che pratico ogni giorno: dare a una macchina solo l’accesso che le serve, controllarne il lavoro, e tenere una via di ritorno quando qualcosa si rompe.",
    "Documento decisioni e questioni aperte in parole semplici, così un’altra persona può revisionare il lavoro.",
  ],
  wordsTitle: "Qualche parola, spiegata",
  words: [
    { term: "Modello di IA", meaning: "Un programma che ha imparato da una quantità enorme di testi e sa leggere, scrivere e ragionare su testi nuovi." },
    { term: "Agente", meaning: "Un modello di IA a cui è stato dato un obiettivo e il permesso di usare strumenti per raggiungerlo." },
    { term: "In locale", meaning: "Il modello esegue il calcolo sul mio computer. Altri strumenti, archivi o servizi esterni nello stesso compito possono comunque inviare dati altrove." },
    { term: "Sicurezza informatica", meaning: "Tenere computer, account e informazioni al sicuro da chi non dovrebbe averli." },
    { term: "Backup", meaning: "Una copia di riserva tenuta separatamente. Una prova di ripristino verifica cosa si possa recuperare da quella specifica copia." },
    { term: "Phishing", meaning: "Un messaggio falso fatto per sembrare vero, per farti consegnare una password o cliccare qualcosa di dannoso." },
  ],
  faqTitle: "Le domande che mi fanno",
  faq: [
    { q: "Hai scritto tutto tu?", a: "No, e lo dico. Lavoro insieme ad assistenti di programmazione basati su IA. Io decido cosa va costruito, cosa non deve mai succedere, e controllo il risultato. Loro scrivono molto del codice dentro quelle regole." },
    { q: "Le mie informazioni vanno su internet?", a: "Dipende dall’intero flusso. Alcune chiamate al modello possono restare locali; altre usano un servizio esterno. Prima di definire privato un compito devo controllare strumenti e percorso dei dati, oltre al modello." },
    { q: "È il tuo lavoro?", a: "Non ancora. L’ho costruito nel tempo libero mentre studio sicurezza informatica. Cerco un ruolo junior nelle operazioni IT, nell’automazione o nella sicurezza." },
    { q: "Posso vederlo in funzione?", a: "Sì. Scrivimi e te lo mostro dal vivo." },
  ],
  outroTitle: "In breve",
  outro:
    "Ho adattato Hermes Agent di Nous Research e spostato il gateway su Ubuntu. Restano servizi opzionali sulla workstation e nel cloud. I modelli propongono, gli strumenti agiscono e i controlli confrontano il risultato con la richiesta.",
  ctaContact: "Scrivimi",
  ctaDetail: "Vedi la versione dettagliata",
  roleMore: "Quali, e come",
  roleBack: "Tutti e sette i ruoli",
  roleNext: "Avanti",
  roleOpenHint: "Apri una scheda per la storia che c’è dietro.",
  roleCuriosity: "Una curiosità",
  roleHistoryTitle: "Assetto storico · Settembre–ottobre 2026",
  roleHistoryBody: "Queste pagine di dettaglio descrivono l’assetto di quel periodo e le prove precedenti. Modelli, smistamento, controlli e risultati dei backup sono storici, non un inventario in tempo reale. Il vecchio Supervisor è ritirato e non fa parte dell’assetto attuale.",
  roleHistoryLink: "Vedi il lavoro di novembre 2026",
};

export const plain: Record<Lang, PlainContent> = { en, it };
