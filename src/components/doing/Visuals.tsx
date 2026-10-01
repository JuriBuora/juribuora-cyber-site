import { AlertTriangle, ArrowRight, Check, ShieldCheck } from "lucide-react";

/** Every mockup must carry this label: these are illustrations, not client evidence. */
const Illustrative = () => (
  <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
    Illustrative example
  </p>
);

const frame = "rounded-3xl border border-border bg-card p-5 sm:p-6";

/* ───────── WebCheckup: a report card, not a real client ───────── */
const reportRows: { label: string; state: "ok" | "warn" | "fix"; note: string }[] = [
  { label: "HTTPS and certificate", state: "ok", note: "Valid and not expiring soon" },
  { label: "Browser protections", state: "warn", note: "Two recommended headers missing" },
  { label: "Mobile usability", state: "ok", note: "Readable and tappable" },
  { label: "Speed", state: "fix", note: "Home page is heavier than it needs to be" },
  { label: "Broken links", state: "ok", note: "None found" },
];
const stateStyle = {
  ok: "bg-primary/15 text-primary",
  warn: "bg-secondary text-secondary-foreground",
  fix: "bg-destructive/15 text-destructive",
} as const;
const stateText = { ok: "Good", warn: "Improve", fix: "Fix first" } as const;

export const ReportMock = () => (
  <figure>
    <div className={frame} role="img" aria-label="Example website check-up report with five checks and their status">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Website check-up</p>
      <ul className="mt-4 divide-y divide-border">
        {reportRows.map((r) => (
          <li key={r.label} className="flex items-center justify-between gap-3 py-3">
            <div>
              <p className="text-sm font-medium text-card-foreground">{r.label}</p>
              <p className="text-xs text-muted-foreground">{r.note}</p>
            </div>
            <span className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[11px] ${stateStyle[r.state]}`}>
              {stateText[r.state]}
            </span>
          </li>
        ))}
      </ul>
    </div>
    <Illustrative />
  </figure>
);

/* ───────── Foresight: real catalogue rows ───────── */
const shapes = [
  ["Two writers, one surface", "Two jobs greet the same person"],
  ["Exit code is not the outcome", "Command says success, nothing changed"],
  ["Internal messages on external surfaces", "Debug text reaches a customer"],
  ["Backup exists, restore does not", "Copy made, never proven restorable"],
];
export const ShapesMock = () => (
  <figure>
    <div className={frame} role="img" aria-label="Four of the thirty-four failure shapes in the Foresight catalogue">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">4 of 34 failure shapes</p>
      <ul className="mt-4 space-y-3">
        {shapes.map(([name, ex]) => (
          <li key={name} className="rounded-2xl bg-background p-3">
            <p className="text-sm font-medium text-card-foreground">{name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{ex}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] text-primary">
              <Check className="h-3 w-3" aria-hidden="true" /> mechanism + proof recorded
            </p>
          </li>
        ))}
      </ul>
    </div>
    <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
      Names are from the real catalogue; examples are paraphrased
    </p>
  </figure>
);

/* ───────── Safe messaging: the pipeline and what it stops ───────── */
const stops = ["An internal error notice", "Model reasoning written out as the reply", "A transcript echoed back to the sender"];
export const PipelineMock = () => (
  <figure>
    <div className={frame} role="img" aria-label="Pipeline: model, filter, shaping, delivery. The filter blocks internal notices, leaked reasoning and echoed transcripts.">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-xs">
        {["Model", "Filter", "Shaping", "Delivered"].map((step, i, a) => (
          <li key={step} className="flex items-center gap-2">
            <span
              className={
                "rounded-full border px-3 py-1.5 " +
                (step === "Filter" ? "border-primary/40 bg-primary/10 text-primary" : "border-border text-foreground")
              }
            >
              {step}
            </span>
            {i < a.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <p className="mt-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">Caught at the filter</p>
      <ul className="mt-3 space-y-2">
        {stops.map((s) => (
          <li key={s} className="flex items-center gap-2 rounded-2xl bg-background p-3 text-sm text-card-foreground">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {s}
          </li>
        ))}
      </ul>
    </div>
    <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
      Real defect classes found, paraphrased
    </p>
  </figure>
);

/* ───────── Supervisor: real numbers ───────── */
const funnel = [
  { label: "Tasks in the live trial", n: 41 },
  { label: "Failed, with evidence", n: 25 },
  { label: "Completed", n: 8 },
  { label: "Distinct real tasks", n: 2 },
];
export const FunnelMock = () => (
  <figure>
    <div className={frame} role="img" aria-label="Bar chart: 41 tasks, 25 failed with evidence, 8 completed, 2 distinct real tasks completed">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Live trial, 18 Jul – 2 Aug 2026</p>
      <ul className="mt-4 space-y-3">
        {funnel.map((f, i) => (
          <li key={f.label}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-card-foreground">{f.label}</span>
              <span className="font-mono tabular-nums text-foreground">{f.n}</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-secondary">
              <div
                className={"h-2 rounded-full " + (i === funnel.length - 1 ? "bg-primary" : "bg-primary/45")}
                style={{ width: `${(f.n / 41) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
    <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
      Real numbers from the trial database
    </p>
  </figure>
);

/* ───────── Security: the rebinding race ───────── */
const steps = [
  { t: "1. The check", d: "Safety check resolves the site: a public address. Passes.", bad: false },
  { t: "2. The load", d: "The browser resolves it again on its own: now a private address.", bad: true },
  { t: "3. The fix", d: "Pin the browser to the address that was checked, and verify it.", bad: false },
];
export const RebindMock = () => (
  <figure>
    <div className={frame} role="img" aria-label="Three steps: the check sees a public address, the browser later resolves a private one, the fix pins the checked address">
      <ol className="space-y-3">
        {steps.map((s) => (
          <li
            key={s.t}
            className={"rounded-2xl p-3 " + (s.bad ? "border border-destructive/40 bg-destructive/10" : "bg-background")}
          >
            <p className="flex items-center gap-2 text-sm font-medium text-card-foreground">
              {s.bad && <AlertTriangle className="h-4 w-4 text-destructive" aria-hidden="true" />}
              {s.t}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
    <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
      Simplified diagram of the finding
    </p>
  </figure>
);
