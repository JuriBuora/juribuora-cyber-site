/**
 * The seven detail pages behind the cards on /in-plain-words, one per role,
 * in English and Italian. Same rules as plain.ts: plain language, every
 * technical word explained where it appears, nothing private. Model names
 * and sizes come from the workstation's own routing records.
 */
import type { Lang } from "./plain";

export type RoleItem = { name: string; tag?: string; body: string };

export type RoleDetail = {
  slug: string;
  title: string;
  role: string;
  oneLine: string;
  intro: string[];
  listTitle: string;
  items: RoleItem[];
  lessonsTitle: string;
  lessons: string[];
  fact: { value: string; label: string };
};

const en: RoleDetail[] = [
  {
    slug: "brains",
    title: "The brains",
    role: "AI models",
    oneLine: "The part that thinks. I have run more than ten of them, from small and quick to very large.",
    intro: [
      "An AI model is a program that has read an enormous amount of text and can now read, write and reason. Its size is counted in “parameters”, written with a B for billions. Think of it as the number of adjustable connections in the brain. More usually means smarter, slower, and much hungrier for memory.",
      "Most people who try this at home run models of 4 to 16 billion. My laptop has 128 GB of memory, which let me run models of up to 120 billion on my own desk, with nothing sent to anyone.",
    ],
    listTitle: "The ones I have worked with",
    items: [
      { name: "gpt-oss 120B", tag: "120 billion · local", body: "The largest I run on my own machine. It takes about 63 GB of memory by itself. I use it for hard reasoning and for coding by hand." },
      { name: "Qwen3 Coder Next", tag: "80 billion · local · retired", body: "A coding specialist. I retired it after real work showed it was the slowest of three candidates and its size bought nothing extra." },
      { name: "DeepSeek V4 Flash", tag: "about 91 GB on disk · local · retired", body: "A very large open model. It ran, but stacked on everything else it exhausted the machine’s memory during testing. Too big and too slow for daily use, so it went." },
      { name: "Gemma 4, my own agent build", tag: "31 billion · local", body: "For weeks the everyday brain of my assistant. It scored 100 out of 100 in a test shaped like real use, where the model before it scored 70. Today it is the one that can look at pictures." },
      { name: "Qwen3 and Qwen3 Coder", tag: "30 billion · local · retired", body: "Earlier everyday brains and candidates. One answered with invented tool commands instead of really looking things up, which is how it lost its place." },
      { name: "“Libero”", tag: "27 billion · local", body: "A model with fewer built-in refusals, kept only on my own machine. It is switched on by request, for one conversation or a set time, and then the normal model comes back automatically." },
      { name: "gpt-oss 20B", tag: "20 billion · local", body: "The everyday local brain since late August. Chosen after a head-to-head test on real tasks." },
      { name: "Qwen3 8B", tag: "8 billion · local", body: "The quick one. It answers simple messages in about 0.7 seconds, where the bigger model needs 2." },
      { name: "An embedding model", tag: "local", body: "Not a talker. It turns text into numbers so that the archive can find notes by meaning, not just by matching words." },
      { name: "Claude, GPT and Gemini", tag: "from outside companies", body: "Much larger models that I reach over the internet for the hardest jobs and for a second opinion. My main chat assistant currently answers with one of these, with a local model as its backup." },
    ],
    lessonsTitle: "What running them taught me",
    lessons: [
      "The biggest model is not the best one if it does not fit. A brain that pushes everything else out of memory helps nobody.",
      "Choose by testing on real work. More than once the model that looked best on paper lost.",
      "One brain cannot do every job. I tested using a single model for both quick and hard messages, and it was worse at both.",
    ],
    fact: { value: "8 to 120", label: "billion parameters: the range of models I have run on one laptop" },
  },
  {
    slug: "workers",
    title: "The workers",
    role: "Agents",
    oneLine: "A brain that has been given a goal and permission to act.",
    intro: [
      "A model on its own can only talk. An agent is a model with a job description: a goal, a set of tools, some rules and a memory. It can read a file, check a calendar, write code or prepare a report, and it keeps going until the job is done.",
      "I run several, because one worker doing everything is as bad an idea in software as it is in an office.",
    ],
    listTitle: "Who is on the team",
    items: [
      { name: "The personal assistant", tag: "Hermes", body: "Reachable from my chat apps, day and night. It is an open-source assistant that I run on my own hardware and have extended with nine add-ons of my own." },
      { name: "The two senior engineers", tag: "Claude Code and Codex", body: "They write, review and repair software. For anything important I have one check the other’s work." },
      { name: "The junior on site", tag: "OpenCode with a local model", body: "Works for free on my own machine on small, well-defined tasks. Its work is scored against a written definition of done." },
      { name: "The careful one", tag: "A terminal agent", body: "Asks before changing anything and can be told to plan only. I use it when I want a clear line between suggesting and doing." },
      { name: "The specialists", body: "One checks small business websites. One prepares a daily briefing of security news. One makes a first pass over large folders of photos. One drafts emails: it may propose three versions and is never allowed to press send." },
      { name: "The handbook", tag: "100+ skills", body: "Written instructions for “how we do this here”. Any worker can pick one up, which is how a lesson learned once stays learned." },
    ],
    lessonsTitle: "What managing them taught me",
    lessons: [
      "Workers report success too easily. An overnight run told me six jobs were finished; most were not.",
      "Give each worker a narrow job and only the tools for it.",
      "Write the lesson down as an instruction, or the next worker repeats the mistake.",
    ],
    fact: { value: "100+", label: "written skills any worker can follow" },
  },
  {
    slug: "manager",
    title: "The manager",
    role: "Routers",
    oneLine: "Decides which brain and which worker gets each job, and how much to spend on it.",
    intro: [
      "Every request has a cost in time and money. AI companies charge by the “token”, which is a piece of a word, and that includes everything sent along with the question, not only the answer.",
      "So the manager’s job is to send each task to the cheapest brain that can do it properly, and to stop workers carrying far more than they need.",
    ],
    listTitle: "The managers I built",
    items: [
      { name: "The task router", body: "Works out what kind of job it is, picks a brain and a worker, runs it, checks the result against what was asked, and tries again or passes it up to a stronger brain if it failed." },
      { name: "The size router", body: "Sends a simple message such as “thanks” to the small 8-billion model and everything else to a bigger one. Simple replies arrive in under a second instead of two." },
      { name: "Tool profiles", body: "Six ready-made sets of tools: coding, code hosting, long runs, research, security practice, administration. A session starts with only the set its job needs." },
      { name: "The cost check", body: "At the start of every real task, the worker asks whether a cheaper model could do it, and says so in one line." },
      { name: "The token diet", body: "One tool compresses what gets sent to the outside models. Another chooses which notes to include, so a worker reads the three that matter, not all of them." },
      { name: "Switching in plain words", body: "I can write “use the big one for three hours” in a chat. The model changes, and changes back by itself when the time is up." },
    ],
    lessonsTitle: "What it taught me",
    lessons: [
      "Measure before believing. One of my tools was sending 291,000 tokens to ask a one-word question, because dozens of unused tools were attached. After the fix it sent 23,860.",
      "Fewer tools in view is cheaper and safer at the same time.",
      "A small fast brain for small things makes the whole system feel quicker than one big brain for everything.",
    ],
    fact: { value: "291,000 → 23,860", label: "tokens for the same one-word request, before and after a fix" },
  },
  {
    slug: "hands",
    title: "The hands",
    role: "Tools",
    oneLine: "What a worker is able to touch. Each one comes with its own limit.",
    intro: [
      "A tool is anything that lets a worker act on the real world: send a message, add a calendar entry, open a web page. This is where mistakes stop being wrong words and become wrong actions.",
      "So every tool has a rule about how far it can go. The rule is built into the tool itself, because a rule that is only written in the instructions gets forgotten.",
    ],
    listTitle: "The tools, and the limit on each",
    items: [
      { name: "Chat messages", body: "Commands are accepted only from me. A reply to someone is allowed only if they wrote first and recently, and only once." },
      { name: "The calendar", body: "The assistant can add entries, but only to a calendar of its own, and it cannot delete. To cancel something it marks it as cancelled." },
      { name: "The web browser", body: "It can read pages for research. It cannot be pointed at machines inside my own network: I found five ways around that protection and closed them." },
      { name: "Email", body: "Drafts only. It proposes, I choose, and I send." },
      { name: "Files and code", body: "Every change is recorded, so any of them can be undone." },
      { name: "Documents", body: "It can produce finished reports as PDF files and deliver them, with a check that the file really exists before it says so." },
      { name: "The phone app", body: "An iPhone app I built to send jobs, watch them run and approve actions when I am away from the desk." },
      { name: "The power switch", body: "It can wake a second computer with one simple signal. Putting it to sleep goes through a separate, narrow path that can run exactly one command." },
    ],
    lessonsTitle: "What it taught me",
    lessons: [
      "Give the smallest tool that does the job. Wake and sleep look like one feature and are two different levels of trust.",
      "Where anyone can write to the assistant, the tools that hold passwords are removed entirely.",
      "“Please be careful” is not a safety measure. A limit the tool cannot exceed is.",
    ],
    fact: { value: "5", label: "ways past the browser’s protection that I found and closed myself" },
  },
  {
    slug: "archive",
    title: "The archive",
    role: "Memory",
    oneLine: "How the system remembers, and what it is deliberately not allowed to remember.",
    intro: [
      "An AI model forgets everything when a conversation ends. Anything it should know tomorrow has to be written down somewhere and found again.",
      "The technique has an awkward name, RAG, which simply means: look it up first, then answer. The hard part is not storing things. It is knowing which note is current, where it came from, and what should never be stored at all.",
    ],
    listTitle: "The layers of memory",
    items: [
      { name: "One shared memory", body: "A single searchable store on my own machine. Every worker reads from the same one, and every answer says which note it came from. No outside service is needed." },
      { name: "Notes I can read too", tag: "Obsidian", body: "A notebook that the workers write and I read on any device. If a machine keeps notes about my work, I want to be able to open them." },
      { name: "Handoff notes", tag: "500+", body: "After each real task: what is done, what is left, the exact next step, and what must not be redone. A stranger could finish the job from one." },
      { name: "The history room", body: "The complete record is kept, but it is never loaded automatically. It is searched on purpose, and a search returns at most eight short results." },
      { name: "The rule book", body: "Skills and rules live under version control, so a bad change by a worker shows up as a difference I can review and undo." },
      { name: "What stays out", body: "My personal documents and my private notebook are off limits. Passwords and message contents never go into memory." },
    ],
    lessonsTitle: "What it taught me",
    lessons: [
      "Two memories that can disagree are worse than one. I tested a popular memory tool beside my own, then removed it.",
      "A remembered fact needs a source and a date. My assistant once said good night before lunch because it trusted a stale note about the time.",
      "More memory is not better memory. Giving a worker everything makes it slower and more expensive and no smarter.",
    ],
    fact: { value: "1", label: "shared memory for every worker, instead of one each" },
  },
  {
    slug: "quality-control",
    title: "Quality control",
    role: "Checks and guardrails",
    oneLine: "The part I care about most: making sure the work is real and the mistakes stay small.",
    intro: [
      "A guardrail is a limit that holds even when the model, the instructions or I get something wrong. The difference between a rule and a guardrail is simple: a rule asks, a guardrail prevents.",
      "I measured this. A written rule about how my assistant should speak held five times out of six. That is fine for style. It is not fine for anything that reaches a real person, so the important rules became mechanisms.",
    ],
    listTitle: "The checks in place",
    items: [
      { name: "The pre-flight check", tag: "34 known failures", body: "Before a risky change, I go through a list of 34 ways things have gone wrong before, name the ones that apply, and record proof for each." },
      { name: "The last look before sending", body: "Every outgoing message passes a final filter. Internal notes, error text and the model’s own thinking are stopped there." },
      { name: "Silence over a bad answer", body: "If the good model is unavailable, the assistant says nothing. A weak reply to a real person costs more than a late one." },
      { name: "Nobody marks their own homework", body: "Work counts as finished when someone else has checked it and there is evidence. A worker’s own “done” is not accepted." },
      { name: "Yes or no on my phone", body: "Sensitive actions wait for my approval. A spoken command is read back and has to be confirmed before anything starts." },
      { name: "The hard stops", body: "Passwords, payments, my personal documents, and anything a backup could not undo. No worker crosses these on its own." },
      { name: "Tests that can fail", body: "A check that always passes proves nothing. Each safety test is first shown a known bad example, to prove it would catch one." },
    ],
    lessonsTitle: "What it taught me",
    lessons: [
      "Put the control where the worker cannot walk around it.",
      "Never test on a real person who does not know they are part of a test.",
      "Measure the control itself. I built a supervision layer, ran it for 17 days, found only two real jobs had completed, and switched it off to fix it.",
    ],
    fact: { value: "5 in 6", label: "times a written rule held, which is why it became a mechanism" },
  },
  {
    slug: "insurance",
    title: "The insurance",
    role: "Backups and recovery",
    oneLine: "What makes a mistake survivable.",
    intro: [
      "Things break. A disk fails, an update goes wrong, a worker deletes the wrong file. The question is never whether, only how much it costs when it happens.",
      "So nearly everything in my system is built to be undone, and I test the undoing instead of assuming it works.",
    ],
    listTitle: "The safety nets",
    items: [
      { name: "A locked copy elsewhere", body: "The assistant’s data is backed up, encrypted, on a different machine. Nobody can read it without the key." },
      { name: "A restore I actually tried", body: "I brought the backup back on that second machine and checked it: 2,606 files and 64,977 database rows, all readable, without disturbing the live system." },
      { name: "A copy before anything risky", body: "Before a change that could damage something, a dated copy is made first. A safety net is faster than a discussion." },
      { name: "A record of every change", body: "Code, rules and skills are all tracked, so any change can be reversed and I can see who made it." },
      { name: "Retiring things properly", body: "When I remove a tool, I write down how to bring it back and keep what is needed to do it. Then I really remove it." },
      { name: "Alarms I have heard ring", body: "A watchdog warns me before a login expires. I did not trust it until I had made it go off on purpose." },
      { name: "Leaving work finishable", body: "At the end of each task there is a note saying what is left. If I stop, someone else, or another AI, can continue." },
    ],
    lessonsTitle: "What it taught me",
    lessons: [
      "A backup you have never restored is a hope.",
      "Copying a database while it is in use can produce a broken copy that looks perfect. I caught that in a test, not in an emergency.",
      "An alarm nobody has ever heard is not an alarm.",
    ],
    fact: { value: "64,977", label: "database rows read back in a restore test" },
  },
];

const it: RoleDetail[] = [
  {
    slug: "brains",
    title: "I cervelli",
    role: "Modelli di IA",
    oneLine: "La parte che pensa. Ne ho fatti girare più di dieci, dai piccoli e veloci ai molto grandi.",
    intro: [
      "Un modello di IA è un programma che ha letto una quantità enorme di testi e ora sa leggere, scrivere e ragionare. La sua grandezza si conta in “parametri”, indicati con una B per miliardi. Pensali come il numero di collegamenti regolabili nel cervello. Di più vuol dire di solito più intelligente, più lento e molto più affamato di memoria.",
      "Chi prova queste cose a casa usa in genere modelli da 4 a 16 miliardi. Il mio portatile ha 128 GB di memoria, e questo mi ha permesso di far girare modelli fino a 120 miliardi sulla mia scrivania, senza inviare niente a nessuno.",
    ],
    listTitle: "Quelli con cui ho lavorato",
    items: [
      { name: "gpt-oss 120B", tag: "120 miliardi · in locale", body: "Il più grande che faccio girare sulla mia macchina. Da solo occupa circa 63 GB di memoria. Lo uso per ragionamenti difficili e per programmare a mano." },
      { name: "Qwen3 Coder Next", tag: "80 miliardi · in locale · ritirato", body: "Uno specialista della programmazione. L’ho ritirato dopo che il lavoro vero ha mostrato che era il più lento di tre candidati e che la sua grandezza non dava niente in più." },
      { name: "DeepSeek V4 Flash", tag: "circa 91 GB su disco · in locale · ritirato", body: "Un modello aperto molto grande. Funzionava, ma sommato a tutto il resto ha esaurito la memoria della macchina durante i test. Troppo grande e troppo lento per l’uso quotidiano, quindi è uscito." },
      { name: "Gemma 4, in una mia versione per agenti", tag: "31 miliardi · in locale", body: "Per settimane il cervello di tutti i giorni del mio assistente. Ha ottenuto 100 su 100 in una prova costruita come l’uso reale, dove il modello precedente aveva fatto 70. Oggi è quello che sa guardare le immagini." },
      { name: "Qwen3 e Qwen3 Coder", tag: "30 miliardi · in locale · ritirati", body: "Cervelli quotidiani e candidati delle prime fasi. Uno rispondeva con comandi inventati invece di andare davvero a controllare, ed è così che ha perso il posto." },
      { name: "“Libero”", tag: "27 miliardi · in locale", body: "Un modello con meno rifiuti preimpostati, tenuto solo sulla mia macchina. Si attiva su richiesta, per una conversazione o per un tempo stabilito, e poi torna da solo il modello normale." },
      { name: "gpt-oss 20B", tag: "20 miliardi · in locale", body: "Il cervello locale di tutti i giorni da fine agosto. Scelto dopo un confronto diretto su compiti reali." },
      { name: "Qwen3 8B", tag: "8 miliardi · in locale", body: "Quello veloce. Risponde ai messaggi semplici in circa 0,7 secondi, dove il modello più grande ne impiega 2." },
      { name: "Un modello di embedding", tag: "in locale", body: "Non parla. Trasforma i testi in numeri, così l’archivio trova gli appunti per significato e non solo per parole uguali." },
      { name: "Claude, GPT e Gemini", tag: "di aziende esterne", body: "Modelli molto più grandi che raggiungo via internet per i lavori più difficili e per un secondo parere. Il mio assistente principale in chat oggi risponde con uno di questi, con un modello locale di riserva." },
    ],
    lessonsTitle: "Cosa mi ha insegnato farli girare",
    lessons: [
      "Il modello più grande non è il migliore se non ci sta. Un cervello che butta fuori dalla memoria tutto il resto non aiuta nessuno.",
      "Si sceglie provando sul lavoro vero. Più di una volta ha perso il modello che sulla carta sembrava il migliore.",
      "Un cervello solo non può fare ogni lavoro. Ho provato a usare un unico modello sia per i messaggi rapidi sia per quelli difficili, ed è andato peggio in entrambi.",
    ],
    fact: { value: "da 8 a 120", label: "miliardi di parametri: la gamma di modelli che ho fatto girare su un solo portatile" },
  },
  {
    slug: "workers",
    title: "I lavoratori",
    role: "Agenti",
    oneLine: "Un cervello a cui sono stati dati un obiettivo e il permesso di agire.",
    intro: [
      "Un modello da solo può soltanto parlare. Un agente è un modello con un mansionario: un obiettivo, una serie di strumenti, alcune regole e una memoria. Può leggere un file, controllare un calendario, scrivere codice o preparare un rapporto, e va avanti finché il lavoro non è finito.",
      "Ne faccio girare diversi, perché un solo lavoratore che fa tutto è una cattiva idea nel software quanto in un ufficio.",
    ],
    listTitle: "Chi c’è in squadra",
    items: [
      { name: "L’assistente personale", tag: "Hermes", body: "Raggiungibile dalle mie app di messaggistica, giorno e notte. È un assistente open source che faccio girare sul mio hardware e che ho ampliato con nove estensioni mie." },
      { name: "I due ingegneri esperti", tag: "Claude Code e Codex", body: "Scrivono, rivedono e riparano software. Per le cose importanti faccio controllare a uno il lavoro dell’altro." },
      { name: "Il junior in sede", tag: "OpenCode con un modello locale", body: "Lavora gratis sulla mia macchina su compiti piccoli e ben definiti. Il suo lavoro riceve un punteggio rispetto a una definizione scritta di “fatto”." },
      { name: "Quello prudente", tag: "Un agente da terminale", body: "Chiede prima di cambiare qualsiasi cosa e può limitarsi a pianificare. Lo uso quando voglio una linea netta tra suggerire e fare." },
      { name: "Gli specialisti", body: "Uno controlla i siti delle piccole attività. Uno prepara ogni giorno un riepilogo di notizie sulla sicurezza. Uno fa una prima selezione in grandi cartelle di foto. Uno scrive bozze di email: può proporne tre versioni e non ha mai il permesso di premere invio." },
      { name: "Il manuale", tag: "oltre 100 competenze", body: "Istruzioni scritte su “come si fa qui”. Qualsiasi lavoratore può prenderne una, ed è così che una lezione imparata una volta resta imparata." },
    ],
    lessonsTitle: "Cosa mi ha insegnato gestirli",
    lessons: [
      "I lavoratori dichiarano il successo troppo facilmente. Una notte mi è stato detto che sei lavori erano finiti; quasi nessuno lo era.",
      "A ogni lavoratore un compito stretto e solo gli strumenti per quello.",
      "La lezione va scritta come istruzione, altrimenti il lavoratore successivo ripete l’errore.",
    ],
    fact: { value: "100+", label: "competenze scritte che ogni lavoratore può seguire" },
  },
  {
    slug: "manager",
    title: "Il direttore",
    role: "Router",
    oneLine: "Decide quale cervello e quale lavoratore riceve ogni compito, e quanto spenderci.",
    intro: [
      "Ogni richiesta costa tempo e denaro. Le aziende di IA fanno pagare a “token”, cioè a pezzetti di parola, e nel conto entra tutto ciò che viene inviato insieme alla domanda, non solo la risposta.",
      "Il compito del direttore è quindi mandare ogni lavoro al cervello più economico che sappia farlo bene, e impedire ai lavoratori di portarsi dietro molto più del necessario.",
    ],
    listTitle: "I direttori che ho costruito",
    items: [
      { name: "Lo smistatore dei compiti", body: "Capisce che tipo di lavoro è, sceglie un cervello e un lavoratore, lo esegue, confronta il risultato con ciò che era stato chiesto, e riprova o passa a un cervello più capace se non è andata." },
      { name: "Lo smistatore per taglia", body: "Manda un messaggio semplice come “grazie” al modello piccolo da 8 miliardi e tutto il resto a uno più grande. Le risposte semplici arrivano in meno di un secondo invece di due." },
      { name: "I profili di strumenti", body: "Sei gruppi pronti di strumenti: programmazione, gestione del codice, esecuzioni lunghe, ricerca, pratica di sicurezza, amministrazione. Una sessione parte solo con il gruppo che serve al suo compito." },
      { name: "Il controllo dei costi", body: "All’inizio di ogni compito vero, il lavoratore si chiede se un modello più economico potrebbe farlo, e lo dice in una riga." },
      { name: "La dieta dei token", body: "Uno strumento comprime ciò che viene inviato ai modelli esterni. Un altro sceglie quali appunti includere, così un lavoratore legge i tre che contano e non tutti." },
      { name: "Cambiare modello a parole", body: "Posso scrivere in chat “usa quello grande per tre ore”. Il modello cambia, e torna com’era da solo quando il tempo scade." },
    ],
    lessonsTitle: "Cosa mi ha insegnato",
    lessons: [
      "Misurare prima di credere. Uno dei miei strumenti inviava 291.000 token per fare una domanda di una parola, perché aveva attaccati decine di strumenti inutilizzati. Dopo la correzione ne inviava 23.860.",
      "Meno strumenti in vista costa meno ed è più sicuro allo stesso tempo.",
      "Un cervello piccolo e veloce per le cose piccole fa sembrare tutto il sistema più rapido di un solo cervello grande per tutto.",
    ],
    fact: { value: "291.000 → 23.860", label: "token per la stessa richiesta di una parola, prima e dopo una correzione" },
  },
  {
    slug: "hands",
    title: "Le mani",
    role: "Strumenti",
    oneLine: "Ciò che un lavoratore può toccare. Ognuno ha il suo limite.",
    intro: [
      "Uno strumento è qualsiasi cosa permetta a un lavoratore di agire sul mondo reale: inviare un messaggio, aggiungere un appuntamento, aprire una pagina web. È qui che gli errori smettono di essere parole sbagliate e diventano azioni sbagliate.",
      "Per questo ogni strumento ha una regola su fin dove può arrivare. La regola è costruita dentro lo strumento, perché una regola scritta solo nelle istruzioni viene dimenticata.",
    ],
    listTitle: "Gli strumenti, e il limite di ciascuno",
    items: [
      { name: "I messaggi in chat", body: "I comandi sono accettati solo da me. Una risposta a qualcuno è permessa solo se ha scritto per primo e di recente, e una volta sola." },
      { name: "Il calendario", body: "L’assistente può aggiungere appuntamenti, ma solo in un calendario suo, e non può cancellare. Per annullare qualcosa lo segna come annullato." },
      { name: "Il browser", body: "Può leggere pagine per fare ricerca. Non può essere puntato verso macchine interne alla mia rete: ho trovato cinque modi per aggirare quella protezione e li ho chiusi." },
      { name: "L’email", body: "Solo bozze. Lui propone, io scelgo, io invio." },
      { name: "File e codice", body: "Ogni modifica viene registrata, quindi ciascuna si può annullare." },
      { name: "I documenti", body: "Sa produrre rapporti finiti in PDF e consegnarli, verificando che il file esista davvero prima di dirlo." },
      { name: "L’app sul telefono", body: "Un’app per iPhone che ho costruito per inviare lavori, vederli girare e approvare azioni quando non sono alla scrivania." },
      { name: "L’interruttore", body: "Può accendere un secondo computer con un semplice segnale. Per metterlo a riposo passa da un percorso separato e stretto, che può eseguire un solo comando." },
    ],
    lessonsTitle: "Cosa mi ha insegnato",
    lessons: [
      "Dare lo strumento più piccolo che fa il lavoro. Accendere e spegnere sembrano una funzione sola e sono due livelli diversi di fiducia.",
      "Dove chiunque può scrivere all’assistente, gli strumenti che custodiscono password vengono tolti del tutto.",
      "“Per favore fai attenzione” non è una misura di sicurezza. Un limite che lo strumento non può superare lo è.",
    ],
    fact: { value: "5", label: "modi per aggirare la protezione del browser che ho trovato e chiuso io stesso" },
  },
  {
    slug: "archive",
    title: "L’archivio",
    role: "Memoria",
    oneLine: "Come il sistema ricorda, e cosa di proposito non gli è permesso ricordare.",
    intro: [
      "Un modello di IA dimentica tutto quando una conversazione finisce. Qualsiasi cosa debba sapere domani va scritta da qualche parte e poi ritrovata.",
      "La tecnica ha un nome poco felice, RAG, che vuol dire semplicemente: prima va a controllare, poi rispondi. La parte difficile non è conservare. È sapere quale appunto è quello attuale, da dove viene, e cosa non va conservato affatto.",
    ],
    listTitle: "Gli strati della memoria",
    items: [
      { name: "Una memoria condivisa", body: "Un solo archivio consultabile sulla mia macchina. Tutti i lavoratori leggono dallo stesso, e ogni risposta dice da quale appunto arriva. Non serve nessun servizio esterno." },
      { name: "Appunti che posso leggere anch’io", tag: "Obsidian", body: "Un quaderno che i lavoratori scrivono e io leggo da qualsiasi dispositivo. Se una macchina tiene appunti sul mio lavoro, voglio poterli aprire." },
      { name: "Le note di passaggio", tag: "oltre 500", body: "Dopo ogni compito vero: cosa è fatto, cosa resta, il passo successivo esatto, e cosa non va rifatto. Un estraneo potrebbe finire il lavoro partendo da una di queste." },
      { name: "La stanza dello storico", body: "Lo storico completo viene conservato, ma non viene mai caricato in automatico. Lo si consulta apposta, e una ricerca restituisce al massimo otto risultati brevi." },
      { name: "Il regolamento", body: "Competenze e regole sono sotto controllo di versione, così una modifica sbagliata di un lavoratore appare come una differenza che posso rivedere e annullare." },
      { name: "Cosa resta fuori", body: "I miei documenti personali e il mio quaderno privato sono vietati. Password e contenuti dei messaggi non entrano mai in memoria." },
    ],
    lessonsTitle: "Cosa mi ha insegnato",
    lessons: [
      "Due memorie che possono contraddirsi sono peggio di una. Ho provato un noto strumento di memoria accanto al mio, poi l’ho tolto.",
      "Un fatto ricordato ha bisogno di una fonte e di una data. Il mio assistente una volta ha augurato la buonanotte prima di pranzo perché si fidava di un appunto vecchio sull’ora.",
      "Più memoria non è memoria migliore. Dare tutto a un lavoratore lo rende più lento e più costoso, non più intelligente.",
    ],
    fact: { value: "1", label: "memoria condivisa per tutti i lavoratori, invece di una a testa" },
  },
  {
    slug: "quality-control",
    title: "Il controllo qualità",
    role: "Verifiche e protezioni",
    oneLine: "La parte a cui tengo di più: fare in modo che il lavoro sia vero e gli errori restino piccoli.",
    intro: [
      "Una protezione è un limite che regge anche quando il modello, le istruzioni o io sbagliamo qualcosa. La differenza tra una regola e una protezione è semplice: la regola chiede, la protezione impedisce.",
      "L’ho misurato. Una regola scritta su come doveva esprimersi il mio assistente ha retto cinque volte su sei. Va bene per lo stile. Non va bene per qualcosa che arriva a una persona vera, quindi le regole importanti sono diventate meccanismi.",
    ],
    listTitle: "I controlli in funzione",
    items: [
      { name: "Il controllo prima del decollo", tag: "34 guasti noti", body: "Prima di una modifica rischiosa passo in rassegna un elenco di 34 modi in cui le cose sono già andate storte, indico quelli che riguardano il caso, e registro una prova per ciascuno." },
      { name: "L’ultima occhiata prima dell’invio", body: "Ogni messaggio in uscita passa da un filtro finale. Note interne, testi di errore e i ragionamenti del modello si fermano lì." },
      { name: "Meglio il silenzio di una risposta sbagliata", body: "Se il modello buono non è disponibile, l’assistente non dice niente. Una risposta scadente a una persona vera costa più di una risposta in ritardo." },
      { name: "Nessuno si dà il voto da solo", body: "Un lavoro è finito quando qualcun altro lo ha controllato e c’è una prova. Il “fatto” detto dal lavoratore non basta." },
      { name: "Sì o no dal telefono", body: "Le azioni delicate aspettano la mia approvazione. Un comando a voce mi viene riletto e va confermato prima che parta qualcosa." },
      { name: "I limiti invalicabili", body: "Password, pagamenti, i miei documenti personali, e tutto ciò che un backup non potrebbe annullare. Nessun lavoratore li supera da solo." },
      { name: "Test che possono fallire", body: "Un controllo che passa sempre non dimostra niente. A ogni test di sicurezza viene prima mostrato un esempio sicuramente sbagliato, per provare che lo saprebbe riconoscere." },
    ],
    lessonsTitle: "Cosa mi ha insegnato",
    lessons: [
      "Il controllo va messo dove il lavoratore non può girarci intorno.",
      "Mai fare prove su una persona vera che non sa di far parte di una prova.",
      "Va misurato anche il controllo. Ho costruito un livello di supervisione, l’ho fatto girare 17 giorni, ho scoperto che erano stati conclusi solo due lavori veri, e l’ho spento per sistemarlo.",
    ],
    fact: { value: "5 su 6", label: "le volte in cui una regola scritta ha retto, ed è per questo che è diventata un meccanismo" },
  },
  {
    slug: "insurance",
    title: "L’assicurazione",
    role: "Backup e recupero",
    oneLine: "Ciò che rende un errore sopportabile.",
    intro: [
      "Le cose si rompono. Un disco si guasta, un aggiornamento va male, un lavoratore cancella il file sbagliato. La domanda non è mai se, ma quanto costa quando succede.",
      "Per questo quasi tutto nel mio sistema è costruito per poter tornare indietro, e il tornare indietro lo provo, invece di dare per scontato che funzioni.",
    ],
    listTitle: "Le reti di sicurezza",
    items: [
      { name: "Una copia chiusa a chiave altrove", body: "I dati dell’assistente vengono salvati, cifrati, su un’altra macchina. Nessuno può leggerli senza la chiave." },
      { name: "Un ripristino che ho provato davvero", body: "Ho recuperato il backup su quella seconda macchina e l’ho controllato: 2.606 file e 64.977 righe di database, tutti leggibili, senza disturbare il sistema in funzione." },
      { name: "Una copia prima di ogni rischio", body: "Prima di una modifica che potrebbe danneggiare qualcosa, si fa una copia datata. Una rete di sicurezza è più veloce di una discussione." },
      { name: "Un registro di ogni modifica", body: "Codice, regole e competenze sono tutti tracciati, così ogni modifica si può annullare e posso vedere chi l’ha fatta." },
      { name: "Ritirare le cose come si deve", body: "Quando tolgo uno strumento scrivo come rimetterlo e conservo ciò che serve per farlo. Poi lo tolgo davvero." },
      { name: "Allarmi che ho sentito suonare", body: "Un sistema di guardia mi avvisa prima che un accesso scada. Non mi sono fidato finché non l’ho fatto scattare apposta." },
      { name: "Lasciare il lavoro finibile", body: "Alla fine di ogni compito c’è una nota con ciò che resta. Se mi fermo, qualcun altro, o un’altra IA, può continuare." },
    ],
    lessonsTitle: "Cosa mi ha insegnato",
    lessons: [
      "Un backup che non hai mai ripristinato è una speranza.",
      "Copiare un database mentre è in uso può produrre una copia rotta che sembra perfetta. L’ho scoperto in una prova, non in un’emergenza.",
      "Un allarme che nessuno ha mai sentito non è un allarme.",
    ],
    fact: { value: "64.977", label: "righe di database rilette in una prova di ripristino" },
  },
];

export const plainRoles: Record<Lang, RoleDetail[]> = { en, it };

export const plainRoleSlugs = en.map((r) => r.slug);
