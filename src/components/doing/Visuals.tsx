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
      aria: "Illustrative migration review: source, install, runtime and downstream result",
      title: "Service review",
      rows: [
        ["Source identity", "ok", "Selected files compared"],
        ["Dependencies", "warn", "Optional services explicit"],
        ["Runtime", "ok", "Heartbeat observed"],
        ["Downstream outcome", "warn", "Requires a separate acceptance test"],
        ["Evidence date", "ok", "Record the observation time"],
      ] as [string, State, string][],
      state: { ok: "Good", warn: "Improve", fix: "Fix first" },
    },
    shapes: {
      aria: "Four failure shapes from the September 2026 Foresight catalogue",
      title: "4 failure shapes · Sep 2026",
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
      aria: "Illustrative calendar workflow: interpret, validate, write, read back.",
      steps: ["Interpret", "Validate", "Write", "Read back"],
      caught: "Checks before the action",
      stops: ["Participants are explicit", "Dates resolved with a timezone", "Stored event compared with the request"],
      caption: "Illustrative workflow; no real conversation",
    },
    funnel: {
      aria: "Illustrative video checks: producer progress, completed decode, positive frames and a dated receipt",
      title: "Useful output checks",
      rows: ["Producer is making progress", "Decode actually completed", "Decoded frames are present", "Result carries a timestamp"],
      caption: "Illustrative checklist, not an operational dashboard",
    },
    rebind: {
      aria: "Illustrative device workflow: authorize, request, verify the physical result",
      steps: [
        ["1. Authorize", "The owner approves the intended action."],
        ["2. Request", "A bounded request waits for service readiness."],
        ["3. Verify", "Readiness, physical effect and useful work need different evidence."],
      ],
      caption: "Illustrative workflow; physical acceptance is separate",
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
      aria: "Revisione illustrativa di una migrazione: sorgente, installazione, runtime e risultato",
      title: "Revisione del servizio",
      rows: [
        ["Identità sorgente", "ok", "File selezionati confrontati"],
        ["Dipendenze", "warn", "Servizi opzionali espliciti"],
        ["Runtime", "ok", "Heartbeat osservato"],
        ["Risultato finale", "warn", "Serve una prova di accettazione separata"],
        ["Data della prova", "ok", "Annotare quando è stato osservato"],
      ] as [string, State, string][],
      state: { ok: "Bene", warn: "Da migliorare", fix: "Da sistemare subito" },
    },
    shapes: {
      aria: "Quattro tipi di guasto dal catalogo Foresight di settembre 2026",
      title: "4 tipi di guasto · set 2026",
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
      aria: "Percorso illustrativo calendario: interpretare, validare, scrivere, rileggere.",
      steps: ["Interpreta", "Valida", "Scrivi", "Rileggi"],
      caught: "Controlli prima dell’azione",
      stops: ["Partecipanti espliciti", "Date risolte con un fuso orario", "Evento salvato confrontato con la richiesta"],
      caption: "Flusso illustrativo; nessuna conversazione reale",
    },
    funnel: {
      aria: "Controlli video illustrativi: avanzamento, decodifica completata, frame e ricevuta datata",
      title: "Controlli sull’output utile",
      rows: ["Il processo avanza", "La decodifica è completata", "Ci sono frame decodificati", "Il risultato ha una data"],
      caption: "Lista illustrativa, non un pannello operativo",
    },
    rebind: {
      aria: "Flusso dispositivi illustrativo: autorizza, richiedi, verifica il risultato fisico",
      steps: [
        ["1. Autorizza", "L’owner approva l’azione prevista."],
        ["2. Richiedi", "Una richiesta limitata attende la disponibilità del servizio."],
        ["3. Verifica", "Disponibilità, effetto fisico e lavoro utile richiedono prove diverse."],
      ],
      caption: "Flusso illustrativo; accettazione fisica separata",
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

export const FunnelMock = ({ lang }: Props) => {
  const t = text[lang].funnel;
  return (
    <figure>
      <div className={frame} role="img" aria-label={t.aria}>
        <p className={label}>{t.title}</p>
        <ul className="mt-4 space-y-3">
          {t.rows.map((row, i) => (
            <li key={row} className="flex items-center gap-3 rounded-2xl bg-background p-3 text-sm text-card-foreground">
              <span className="font-mono text-primary" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{row}
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
              className={"rounded-2xl p-3 " + (i === 1 ? "border border-primary/30 bg-primary/5" : "bg-background")}
            >
              <p className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                {i === 1 && <AlertTriangle className="h-4 w-4 text-primary" aria-hidden="true" />}
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
