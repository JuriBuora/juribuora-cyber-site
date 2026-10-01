import { AlertTriangle, ArrowRight, Check, ShieldCheck } from "lucide-react";
import type { Lang } from "@/data/plain";

/**
 * The pictures beside each chapter of /what-im-doing. Every one carries a
 * visible caption saying whether it is an illustration, a paraphrase, or real
 * data, in both languages; a test counts those captions.
 */
type State = "ok" | "warn" | "fix";

const text = {
  en: {
    illustrative: "Illustrative example",
    report: {
      aria: "Example website check-up report with five checks and their status",
      title: "Website check-up",
      rows: [
        ["HTTPS and certificate", "ok", "Valid and not expiring soon"],
        ["Browser protections", "warn", "Two recommended headers missing"],
        ["Mobile usability", "ok", "Readable and tappable"],
        ["Speed", "fix", "Home page is heavier than it needs to be"],
        ["Broken links", "ok", "None found"],
      ] as [string, State, string][],
      state: { ok: "Good", warn: "Improve", fix: "Fix first" },
    },
    shapes: {
      aria: "Four of the thirty-four failure shapes in the Foresight catalogue",
      title: "4 of 34 failure shapes",
      rows: [
        ["Two writers, one surface", "Two jobs greet the same person"],
        ["Exit code is not the outcome", "Command says success, nothing changed"],
        ["Internal messages on external surfaces", "Debug text reaches a customer"],
        ["Backup exists, restore does not", "Copy made, never proven restorable"],
      ],
      done: "mechanism + proof recorded",
      caption: "Names are from the real catalogue; examples are paraphrased",
    },
    pipeline: {
      aria: "Pipeline: model, filter, shaping, delivery. The filter blocks internal notices, leaked reasoning and echoed transcripts.",
      steps: ["Model", "Filter", "Shaping", "Delivered"],
      caught: "Caught at the filter",
      stops: ["An internal error notice", "Model reasoning written out as the reply", "A transcript echoed back to the sender"],
      caption: "Real defect classes found, paraphrased",
    },
    funnel: {
      aria: "Bar chart: 41 tasks, 25 failed with evidence, 8 completed, 2 distinct real tasks completed",
      title: "Live trial, 18 Jul – 2 Aug 2026",
      rows: ["Tasks in the live trial", "Failed, with evidence", "Completed", "Distinct real tasks"],
      caption: "Real numbers from the trial database",
    },
    rebind: {
      aria: "Three steps: the check sees a public address, the browser later resolves a private one, the fix pins the checked address",
      steps: [
        ["1. The check", "Safety check resolves the site: a public address. Passes."],
        ["2. The load", "The browser resolves it again on its own: now a private address."],
        ["3. The fix", "Pin the browser to the address that was checked, and verify it."],
      ],
      caption: "Simplified diagram of the finding",
    },
    deliverables: {
      aria: "Five client deliverables: four shipped or delivered, the migration itself paused",
      title: "Deliverables",
      rows: [
        ["Production website", "Live, public repository", "Shipped"],
        ["Database analysis", "Two legacy databases, on copies", "Delivered"],
        ["Migration report", "37 sections, costed options", "Delivered"],
        ["Timesheet workbook", "10 sheets, protected formulas", "Delivered"],
        ["Database migration", "Waiting for the client's review", "Paused"],
      ],
      caption: "Real deliverables and their status",
    },
  },
  it: {
    illustrative: "Esempio illustrativo",
    report: {
      aria: "Esempio di rapporto di controllo del sito con cinque verifiche e il loro stato",
      title: "Controllo del sito",
      rows: [
        ["HTTPS e certificato", "ok", "Valido e lontano dalla scadenza"],
        ["Protezioni del browser", "warn", "Mancano due intestazioni consigliate"],
        ["Uso da telefono", "ok", "Leggibile e facile da toccare"],
        ["Velocità", "fix", "La pagina iniziale pesa più del necessario"],
        ["Link rotti", "ok", "Nessuno trovato"],
      ] as [string, State, string][],
      state: { ok: "Bene", warn: "Da migliorare", fix: "Da sistemare subito" },
    },
    shapes: {
      aria: "Quattro dei trentaquattro tipi di guasto nel catalogo Foresight",
      title: "4 dei 34 tipi di guasto",
      rows: [
        ["Due autori, una sola superficie", "Due processi salutano la stessa persona"],
        ["Il codice di uscita non è il risultato", "Il comando dice riuscito, niente è cambiato"],
        ["Messaggi interni su canali esterni", "Un testo di diagnostica arriva a un cliente"],
        ["Il backup c’è, il ripristino no", "Copia fatta, mai dimostrata recuperabile"],
      ],
      done: "meccanismo + prova registrati",
      caption: "I nomi vengono dal catalogo reale; gli esempi sono parafrasati",
    },
    pipeline: {
      aria: "Percorso: modello, filtro, rifinitura, consegna. Il filtro blocca note interne, ragionamenti del modello e trascrizioni rimandate indietro.",
      steps: ["Modello", "Filtro", "Rifinitura", "Consegnato"],
      caught: "Fermati dal filtro",
      stops: ["Un avviso interno di errore", "Il ragionamento del modello scritto come risposta", "Una trascrizione rimandata a chi l’ha inviata"],
      caption: "Tipi di difetto realmente trovati, parafrasati",
    },
    funnel: {
      aria: "Grafico a barre: 41 compiti, 25 falliti con prove, 8 completati, 2 compiti reali distinti completati",
      title: "Prova dal vivo, 18 lug – 2 ago 2026",
      rows: ["Compiti nella prova dal vivo", "Falliti, con prove", "Completati", "Compiti reali distinti"],
      caption: "Numeri reali dal database della prova",
    },
    rebind: {
      aria: "Tre passi: il controllo vede un indirizzo pubblico, il browser poi ne risolve uno privato, la correzione fissa l’indirizzo controllato",
      steps: [
        ["1. Il controllo", "Il controllo di sicurezza risolve il sito: un indirizzo pubblico. Passa."],
        ["2. Il caricamento", "Il browser lo risolve di nuovo per conto suo: ora è un indirizzo privato."],
        ["3. La correzione", "Fissare il browser all’indirizzo che è stato controllato, e verificarlo."],
      ],
      caption: "Schema semplificato del problema trovato",
    },
    deliverables: {
      aria: "Cinque consegne per clienti: quattro pubblicate o consegnate, la migrazione in pausa",
      title: "Consegne",
      rows: [
        ["Sito di produzione", "Online, repository pubblico", "Pubblicato"],
        ["Analisi dei database", "Due vecchi database, su copie", "Consegnata"],
        ["Rapporto di migrazione", "37 sezioni, opzioni con i costi", "Consegnato"],
        ["Foglio ore", "10 fogli, formule protette", "Consegnato"],
        ["Migrazione del database", "In attesa della revisione del cliente", "In pausa"],
      ],
      caption: "Consegne reali e il loro stato",
    },
  },
} as const;

type Props = { lang: Lang };

const frame = "rounded-3xl border border-border bg-card p-5 sm:p-6";
const label = "font-mono text-xs uppercase tracking-widest text-muted-foreground";
const Caption = ({ children }: { children: string }) => (
  <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{children}</p>
);

const stateStyle: Record<State, string> = {
  ok: "bg-primary/15 text-primary",
  warn: "bg-secondary text-secondary-foreground",
  fix: "bg-destructive/15 text-destructive",
};

/* WebCheckup: a report card, not a real client */
export const ReportMock = ({ lang }: Props) => {
  const t = text[lang].report;
  return (
    <figure>
      <div className={frame} role="img" aria-label={t.aria}>
        <p className={label}>{t.title}</p>
        <ul className="mt-4 divide-y divide-border">
          {t.rows.map(([name, state, note]) => (
            <li key={name} className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="text-sm font-medium text-card-foreground">{name}</p>
                <p className="text-xs text-muted-foreground">{note}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[11px] ${stateStyle[state]}`}>
                {t.state[state]}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Caption>{text[lang].illustrative}</Caption>
    </figure>
  );
};

/* Foresight: real catalogue rows */
export const ShapesMock = ({ lang }: Props) => {
  const t = text[lang].shapes;
  return (
    <figure>
      <div className={frame} role="img" aria-label={t.aria}>
        <p className={label}>{t.title}</p>
        <ul className="mt-4 space-y-3">
          {t.rows.map(([name, example]) => (
            <li key={name} className="rounded-2xl bg-background p-3">
              <p className="text-sm font-medium text-card-foreground">{name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{example}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] text-primary">
                <Check className="h-3 w-3" aria-hidden="true" /> {t.done}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <Caption>{t.caption}</Caption>
    </figure>
  );
};

/* Safe messaging: the pipeline and what it stops */
export const PipelineMock = ({ lang }: Props) => {
  const t = text[lang].pipeline;
  return (
    <figure>
      <div className={frame} role="img" aria-label={t.aria}>
        <ol className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {t.steps.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span
                className={
                  "rounded-full border px-3 py-1.5 " +
                  (i === 1 ? "border-primary/40 bg-primary/10 text-primary" : "border-border text-foreground")
                }
              >
                {step}
              </span>
              {i < t.steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />}
            </li>
          ))}
        </ol>
        <p className={`mt-5 ${label}`}>{t.caught}</p>
        <ul className="mt-3 space-y-2">
          {t.stops.map((s) => (
            <li key={s} className="flex items-center gap-2 rounded-2xl bg-background p-3 text-sm text-card-foreground">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
      </div>
      <Caption>{t.caption}</Caption>
    </figure>
  );
};

/* Supervisor: real numbers */
const funnelValues = [41, 25, 8, 2];
export const FunnelMock = ({ lang }: Props) => {
  const t = text[lang].funnel;
  return (
    <figure>
      <div className={frame} role="img" aria-label={t.aria}>
        <p className={label}>{t.title}</p>
        <ul className="mt-4 space-y-3">
          {t.rows.map((row, i) => (
            <li key={row}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-card-foreground">{row}</span>
                <span className="font-mono tabular-nums text-foreground">{funnelValues[i]}</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-secondary">
                <div
                  className={"h-2 rounded-full " + (i === funnelValues.length - 1 ? "bg-primary" : "bg-primary/45")}
                  style={{ width: `${(funnelValues[i] / funnelValues[0]) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Caption>{t.caption}</Caption>
    </figure>
  );
};

/* Security: the rebinding race */
export const RebindMock = ({ lang }: Props) => {
  const t = text[lang].rebind;
  return (
    <figure>
      <div className={frame} role="img" aria-label={t.aria}>
        <ol className="space-y-3">
          {t.steps.map(([title, body], i) => (
            <li
              key={title}
              className={"rounded-2xl p-3 " + (i === 1 ? "border border-destructive/40 bg-destructive/10" : "bg-background")}
            >
              <p className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                {i === 1 && <AlertTriangle className="h-4 w-4 text-destructive" aria-hidden="true" />}
                {title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
      </div>
      <Caption>{t.caption}</Caption>
    </figure>
  );
};

/* Client work: real deliverables and where each stands */
export const DeliverablesMock = ({ lang }: Props) => {
  const t = text[lang].deliverables;
  return (
    <figure>
      <div className={frame} role="img" aria-label={t.aria}>
        <p className={label}>{t.title}</p>
        <ul className="mt-4 divide-y divide-border">
          {t.rows.map(([name, note, state], i) => (
            <li key={name} className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="text-sm font-medium text-card-foreground">{name}</p>
                <p className="text-xs text-muted-foreground">{note}</p>
              </div>
              <span
                className={
                  "shrink-0 rounded-full px-2.5 py-1 font-mono text-[11px] " +
                  (i < t.rows.length - 1 ? "bg-primary/15 text-primary" : "bg-secondary text-secondary-foreground")
                }
              >
                {state}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Caption>{t.caption}</Caption>
    </figure>
  );
};
