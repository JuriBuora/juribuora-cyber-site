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
};

const en: PlainContent = {
  switchLabel: "Leggi in italiano",
  kicker: "In plain words",
  headline: "My laptop runs like a small company.",
  lead:
    "I build artificial intelligence that does real jobs for me, and the safety checks that keep it from making a mess. Here is how it works, with no technical words that are not explained.",
  castTitle: "Who works there",
  castIntro:
    "Think of a small office. Each part of my system has a job, like a person would.",
  cast: [
    {
      title: "The brains",
      role: "AI models",
      body: "They read and write. Some are big and careful, some are small and quick. Some live on my own computer, so private things can stay with me. For harder jobs I borrow stronger ones from outside companies.",
    },
    {
      title: "The workers",
      role: "Agents",
      body: "A brain alone only talks. A worker is a brain that has been given a goal and is allowed to do things: open a file, check a calendar, write a report.",
    },
    {
      title: "The manager",
      role: "Router",
      body: "Decides who gets each job. A big brain is not wasted on “thanks”, and a small one is not trusted with something important.",
    },
    {
      title: "The hands",
      role: "Tools",
      body: "Files, the calendar, the web browser, messages. Each worker only gets the tools its job needs, the same way a new employee does not get every key on day one.",
    },
    {
      title: "The archive",
      role: "Memory",
      body: "Decisions, notes and what was done yesterday. Nothing has to be explained twice, and anyone can pick up where the last one stopped.",
    },
    {
      title: "Quality control",
      role: "Checks",
      body: "Nobody’s work counts as finished because they say so. Someone else has to check it, and there has to be proof.",
    },
    {
      title: "The insurance",
      role: "Backups",
      body: "A locked copy of everything important, kept on another machine. I have tested that it really can be brought back.",
    },
  ],
  journeyTitle: "One request, start to finish",
  journeyIntro: "What happens when I ask for something from my phone.",
  journey: [
    { title: "I ask", body: "I send a message, typed or spoken: “tidy up this project and tell me what changed”." },
    { title: "It checks it is really me", body: "A message from anyone else is ignored. A spoken request is read back to me first, in case it was misheard." },
    { title: "The manager picks a worker", body: "A simple job goes to a small, fast brain on my laptop. A hard one goes to a stronger one." },
    { title: "The worker looks things up", body: "It reads the notes in the archive instead of guessing, then does the job with the tools it is allowed to use." },
    { title: "Anything risky waits for me", body: "Sending a message, deleting something, spending money: it stops and asks. I say yes or no from my phone." },
    { title: "The work is checked", body: "For work that matters, a separate check confirms the result exists and does what was asked. If it does not, the answer is “not done”, not “done”." },
    { title: "I get the result", body: "A short message with what was done, what was not, and where to find it." },
  ],
  storiesTitle: "Three things that went wrong",
  storiesIntro:
    "The interesting part of this work is not making a machine clever. It is stopping a clever machine from doing something silly. These all happened to me.",
  whatHappened: "What happened",
  whatChanged: "What I changed",
  stories: [
    {
      title: "It said good night at 11:24 in the morning",
      what: "My assistant sent someone a cheerful “good night” before lunch. It was using a note about the time that had been written hours earlier and never refreshed.",
      fix: "It now looks at the clock every time instead of trusting an old note. Small bug, real lesson: a machine is only as right as its information is fresh.",
    },
    {
      title: "A message switched my computer off",
      what: "One day my computer shut down after a chat message arrived, and at first I could not find what had done it.",
      fix: "Turning the computer off now needs to prove who is asking, and every attempt is written down. If I cannot say who did something, that is the problem to fix first.",
    },
    {
      title: "It said it had finished six jobs overnight",
      what: "I left a worker running while I slept. In the morning it reported six jobs done. I had them checked independently: most were half done or wrong.",
      fix: "A worker is no longer allowed to mark its own homework. Finished means proven, by someone else.",
    },
  ],
  usesTitle: "What it is good for",
  usesIntro: "This is not a toy. These are things it has produced.",
  uses: [
    { title: "A website for a real farm", body: "A fast site for an agricultural business, with products, contacts and the legal pages done properly. It is live and used." },
    { title: "Check-ups for small business websites", body: "A service that looks at a shop’s website from the outside and explains, in plain language, what would worry a customer or a browser." },
    { title: "A public diary of learning security", body: "One entry a day for more than 240 days, mistakes included, plus practical exercises." },
    { title: "An assistant I can reach from my phone", body: "It answers routine messages for me, with people who know it is there, and it stays silent when it is not sure." },
  ],
  companyTitle: "Why a company might care",
  company: [
    "More and more companies let AI do real work. Somebody has to make sure it does the right thing, tells the truth about what it did, and can be stopped.",
    "That is what I practise every day: giving a machine only the access it needs, checking its work, and keeping a way back when something breaks.",
    "I also write everything down in plain language, so the next person does not have to guess.",
  ],
  wordsTitle: "A few words, explained",
  words: [
    { term: "AI model", meaning: "A program that has learned from a huge amount of text and can read, write and reason about new text." },
    { term: "Agent", meaning: "An AI model that has been given a goal and permission to use tools to reach it." },
    { term: "Running locally", meaning: "The AI works on my own computer instead of on a company’s servers, so what I give it stays on my machine." },
    { term: "Cybersecurity", meaning: "Keeping computers, accounts and information safe from people who should not have them." },
    { term: "Backup", meaning: "A spare copy kept somewhere else. It only counts once you have tried restoring it." },
    { term: "Phishing", meaning: "A fake message made to look real, so that you hand over a password or click something harmful." },
  ],
  faqTitle: "Questions people ask me",
  faq: [
    { q: "Did you write all of this yourself?", a: "No, and I say so. I work together with AI coding assistants. I decide what should be built, what must never happen, and I check the result. They write a lot of the code under those rules." },
    { q: "Does my information go to the internet?", a: "It depends on the job. I can run AI entirely on my own computer when privacy matters. When a job needs a stronger AI from an outside company, I choose that on purpose and know what is being sent." },
    { q: "Is this your job?", a: "Not yet. I built it in my free time while studying security. I am looking for a junior role in security or in running AI systems safely." },
    { q: "Can I see it working?", a: "Yes. Write to me and I will show you, live." },
  ],
  outroTitle: "The short version",
  outro:
    "I built a small AI workplace inside a laptop: the models are the brains, the agents do the work, a manager hands out the jobs, an archive remembers, and checks make sure the result is real and can be undone.",
  ctaContact: "Write to me",
  ctaDetail: "See the detailed version",
  roleMore: "Which ones, and how",
  roleBack: "All seven roles",
  roleNext: "Next",
};

const it: PlainContent = {
  switchLabel: "Read in English",
  kicker: "In parole semplici",
  headline: "Il mio portatile funziona come una piccola azienda.",
  lead:
    "Costruisco intelligenze artificiali che fanno lavori veri per me, e i controlli di sicurezza che impediscono loro di combinare guai. Ecco come funziona, senza parole tecniche lasciate senza spiegazione.",
  castTitle: "Chi ci lavora",
  castIntro:
    "Immagina un piccolo ufficio. Ogni parte del mio sistema ha un compito, come lo avrebbe una persona.",
  cast: [
    {
      title: "I cervelli",
      role: "Modelli di IA",
      body: "Leggono e scrivono. Alcuni sono grandi e attenti, altri piccoli e veloci. Alcuni vivono sul mio computer, così le cose private possono restare con me. Per i lavori più difficili ne prendo in prestito di più capaci da aziende esterne.",
    },
    {
      title: "I lavoratori",
      role: "Agenti",
      body: "Un cervello da solo parla e basta. Un lavoratore è un cervello a cui è stato dato un obiettivo e il permesso di fare cose: aprire un file, guardare il calendario, scrivere un rapporto.",
    },
    {
      title: "Il direttore",
      role: "Router",
      body: "Decide a chi va ogni lavoro. Un cervello grande non viene sprecato per un “grazie”, e a uno piccolo non si affida qualcosa di importante.",
    },
    {
      title: "Le mani",
      role: "Strumenti",
      body: "File, calendario, browser, messaggi. Ogni lavoratore riceve solo gli strumenti che servono al suo compito, come un nuovo assunto non riceve tutte le chiavi il primo giorno.",
    },
    {
      title: "L’archivio",
      role: "Memoria",
      body: "Decisioni, appunti e quello che è stato fatto ieri. Niente va spiegato due volte, e chiunque può riprendere da dove l’altro si è fermato.",
    },
    {
      title: "Il controllo qualità",
      role: "Verifiche",
      body: "Un lavoro non è finito perché chi l’ha fatto dice che lo è. Qualcun altro deve controllarlo, e serve una prova.",
    },
    {
      title: "L’assicurazione",
      role: "Backup",
      body: "Una copia chiusa a chiave di tutto ciò che conta, tenuta su un’altra macchina. Ho verificato che si possa davvero recuperare.",
    },
  ],
  journeyTitle: "Una richiesta, dall’inizio alla fine",
  journeyIntro: "Cosa succede quando chiedo qualcosa dal telefono.",
  journey: [
    { title: "Chiedo", body: "Mando un messaggio, scritto o a voce: “sistema questo progetto e dimmi cosa è cambiato”." },
    { title: "Controlla che sia davvero io", body: "Un messaggio di chiunque altro viene ignorato. Una richiesta a voce mi viene prima riletta, nel caso sia stata capita male." },
    { title: "Il direttore sceglie un lavoratore", body: "Un lavoro semplice va a un cervello piccolo e veloce sul portatile. Uno difficile va a uno più capace." },
    { title: "Il lavoratore si documenta", body: "Legge gli appunti in archivio invece di tirare a indovinare, poi fa il lavoro con gli strumenti che gli sono concessi." },
    { title: "Le cose rischiose aspettano me", body: "Inviare un messaggio, cancellare qualcosa, spendere soldi: si ferma e chiede. Rispondo sì o no dal telefono." },
    { title: "Il lavoro viene controllato", body: "Per i lavori che contano, una verifica separata conferma che il risultato esiste e fa ciò che era stato chiesto. Se non è così, la risposta è “non fatto”, non “fatto”." },
    { title: "Ricevo il risultato", body: "Un messaggio breve con cosa è stato fatto, cosa no, e dove trovarlo." },
  ],
  storiesTitle: "Tre cose andate storte",
  storiesIntro:
    "La parte interessante di questo lavoro non è rendere intelligente una macchina. È impedire a una macchina intelligente di fare una sciocchezza. Sono successe tutte a me.",
  whatHappened: "Cosa è successo",
  whatChanged: "Cosa ho cambiato",
  stories: [
    {
      title: "Ha augurato la buonanotte alle 11:24 del mattino",
      what: "Il mio assistente ha mandato a qualcuno un allegro “buonanotte” prima di pranzo. Usava un appunto sull’ora scritto ore prima e mai aggiornato.",
      fix: "Adesso guarda l’orologio ogni volta invece di fidarsi di un vecchio appunto. Errore piccolo, lezione vera: una macchina ha ragione solo quanto sono fresche le sue informazioni.",
    },
    {
      title: "Un messaggio ha spento il mio computer",
      what: "Un giorno il computer si è spento dopo l’arrivo di un messaggio in chat, e all’inizio non riuscivo a capire cosa fosse stato.",
      fix: "Ora per spegnere il computer bisogna dimostrare chi lo chiede, e ogni tentativo viene registrato. Se non so dire chi ha fatto una cosa, è quello il primo problema da risolvere.",
    },
    {
      title: "Ha detto di aver finito sei lavori in una notte",
      what: "Ho lasciato un lavoratore acceso mentre dormivo. Al mattino ha riferito sei lavori conclusi. Li ho fatti controllare da un altro: quasi tutti erano a metà o sbagliati.",
      fix: "Un lavoratore non può più darsi il voto da solo. Finito vuol dire dimostrato, da qualcun altro.",
    },
  ],
  usesTitle: "A cosa serve",
  usesIntro: "Non è un giocattolo. Queste sono cose che ha prodotto.",
  uses: [
    { title: "Il sito di una vera azienda agricola", body: "Un sito veloce per un’azienda agricola, con prodotti, contatti e pagine legali fatte come si deve. È online e viene usato." },
    { title: "Controlli per i siti delle piccole attività", body: "Un servizio che guarda il sito di un negozio dall’esterno e spiega, in parole semplici, cosa preoccuperebbe un cliente o un browser." },
    { title: "Un diario pubblico di studio della sicurezza", body: "Una pagina al giorno da più di 240 giorni, errori compresi, più esercizi pratici." },
    { title: "Un assistente raggiungibile dal telefono", body: "Risponde per me ai messaggi di routine, con persone che sanno che c’è, e resta in silenzio quando non è sicuro." },
  ],
  companyTitle: "Perché può interessare a un’azienda",
  company: [
    "Sempre più aziende fanno fare lavoro vero all’IA. Qualcuno deve assicurarsi che faccia la cosa giusta, dica la verità su ciò che ha fatto, e si possa fermare.",
    "È quello che pratico ogni giorno: dare a una macchina solo l’accesso che le serve, controllarne il lavoro, e tenere una via di ritorno quando qualcosa si rompe.",
    "E scrivo tutto in parole semplici, così chi viene dopo non deve indovinare.",
  ],
  wordsTitle: "Qualche parola, spiegata",
  words: [
    { term: "Modello di IA", meaning: "Un programma che ha imparato da una quantità enorme di testi e sa leggere, scrivere e ragionare su testi nuovi." },
    { term: "Agente", meaning: "Un modello di IA a cui è stato dato un obiettivo e il permesso di usare strumenti per raggiungerlo." },
    { term: "In locale", meaning: "L’IA lavora sul mio computer invece che sui server di un’azienda, quindi ciò che le do resta sulla mia macchina." },
    { term: "Sicurezza informatica", meaning: "Tenere computer, account e informazioni al sicuro da chi non dovrebbe averli." },
    { term: "Backup", meaning: "Una copia di riserva tenuta altrove. Conta solo dopo aver provato a ripristinarla." },
    { term: "Phishing", meaning: "Un messaggio falso fatto per sembrare vero, per farti consegnare una password o cliccare qualcosa di dannoso." },
  ],
  faqTitle: "Le domande che mi fanno",
  faq: [
    { q: "Hai scritto tutto tu?", a: "No, e lo dico. Lavoro insieme ad assistenti di programmazione basati su IA. Io decido cosa va costruito, cosa non deve mai succedere, e controllo il risultato. Loro scrivono molto del codice dentro quelle regole." },
    { q: "Le mie informazioni vanno su internet?", a: "Dipende dal lavoro. Posso far girare l’IA interamente sul mio computer quando conta la riservatezza. Quando serve un’IA più potente di un’azienda esterna, lo scelgo apposta e so cosa viene inviato." },
    { q: "È il tuo lavoro?", a: "Non ancora. L’ho costruito nel tempo libero mentre studio sicurezza informatica. Cerco un ruolo junior nella sicurezza o nella gestione sicura di sistemi di IA." },
    { q: "Posso vederlo in funzione?", a: "Sì. Scrivimi e te lo mostro dal vivo." },
  ],
  outroTitle: "In breve",
  outro:
    "Ho costruito un piccolo posto di lavoro per l’IA dentro un portatile: i modelli sono i cervelli, gli agenti fanno il lavoro, un direttore distribuisce i compiti, un archivio ricorda, e i controlli garantiscono che il risultato sia vero e si possa annullare.",
  ctaContact: "Scrivimi",
  ctaDetail: "Vedi la versione dettagliata",
  roleMore: "Quali, e come",
  roleBack: "Tutti e sette i ruoli",
  roleNext: "Avanti",
};

export const plain: Record<Lang, PlainContent> = { en, it };
