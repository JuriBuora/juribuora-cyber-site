/**
 * Content for /workstation. Every number here was read from a real repository
 * on `asOf`; the `source` string says how to reproduce it. Nothing in this
 * file may name a private contact, host, account, or credential — the scrub
 * test in workstation.test.ts enforces that.
 */

export const asOf = "30 Sep 2026";

export type Stat = {
  value: string;
  label: string;
  source: string;
};

export const stats: Stat[] = [
  {
    value: "1,364",
    label: "commits in 13 weeks",
    source: "git rev-list --count HEAD, private workstation repo, 28 Jun – 30 Sep 2026",
  },
  {
    value: "34",
    label: "documented failure shapes in my release gate",
    source: "numbered rows in the foresight skill catalogue",
  },
  {
    value: "100+",
    label: "reusable agent skills, version-controlled",
    source: "entries in the git-tracked skills library (own work plus vetted third-party)",
  },
  {
    value: "9",
    label: "custom plugins on a self-hosted agent gateway",
    source: "custom plugin folders in the gateway's user plugin directory",
  },
  {
    value: "500+",
    label: "handoff notes so any session can resume cold",
    source: "files in the workstation repo's handoff/ folder",
  },
];

/** Weekly commit counts in the workstation repo, ISO weeks 26–40 of 2026. */
export const weeklyCommits: { week: string; commits: number }[] = [
  { week: "W26", commits: 5 },
  { week: "W27", commits: 192 },
  { week: "W28", commits: 59 },
  { week: "W29", commits: 125 },
  { week: "W30", commits: 130 },
  { week: "W31", commits: 139 },
  { week: "W32", commits: 136 },
  { week: "W33", commits: 143 },
  { week: "W34", commits: 159 },
  { week: "W35", commits: 40 },
  { week: "W36", commits: 4 },
  { week: "W37", commits: 16 },
  { week: "W38", commits: 80 },
  { week: "W39", commits: 115 },
  { week: "W40", commits: 21 },
];

export const weeklyCommitsTotal = 1364;

export type Layer = {
  name: string;
  note: string;
  items: string[];
  tone: "plain" | "guard";
};

/** Top to bottom: what a request touches on its way through. */
export const architecture: Layer[] = [
  {
    name: "Interfaces",
    note: "Where I talk to it",
    items: ["Telegram", "Claude Code", "Codex", "Terminal"],
    tone: "plain",
  },
  {
    name: "Gateway and routing",
    note: "Decides who does the work",
    items: ["Self-hosted Hermes agent gateway", "Model routing", "Plugins", "Scheduled jobs"],
    tone: "plain",
  },
  {
    name: "Models",
    note: "Local first, cloud when it earns it",
    items: ["Ollama", "LM Studio", "Claude", "GPT"],
    tone: "plain",
  },
  {
    name: "Guardrails",
    note: "Mechanisms, not instructions",
    items: ["Foresight gate", "Outbound content filter", "Approval queues", "Hard-stop boundary"],
    tone: "guard",
  },
  {
    name: "Memory and state",
    note: "Survives any one session",
    items: ["Git everywhere", "Handoff notes", "Skills library", "Append-only history"],
    tone: "plain",
  },
];

export type CaseStudy = {
  id: string;
  /** Deep-dive page under /workstation/<slug>. */
  slug: string;
  kicker: string;
  title: string;
  problem: string;
  lesson: string;
  skills: string[];
  link?: { label: string; to: string; external?: boolean };
};

export const caseStudies: CaseStudy[] = [
  {
    id: "foresight",
    slug: "foresight",
    kicker: "Release gate",
    title: "Foresight: find the failure at the desk, not on a real person",
    problem:
      "A WhatsApp auto-reply assistant I run sends messages to real people. Over two days its output produced about a dozen defects: a duplicated greeting, internal model details sent to a contact, assistant-sounding replies in a personal chat, and a group chat silently skipped. Every one was found by reading what people had already received.",
    lesson:
      "Where a failure would reach a person, build a mechanism. A written rule is a quality hint, not a control.",
    skills: ["Risk analysis", "Change control", "Defence in depth", "Verification design"],
  },
  {
    id: "fork",
    slug: "hermes-gateway",
    kicker: "Maintenance at scale",
    title: "Reconciling a fork that was 17,898 commits behind",
    problem:
      "I run my own fork of an open-source agent gateway. Nothing warned me it was drifting. By the time I tried to merge one small fix, the fork had fallen 17,898 commits behind upstream, and upstream had restructured its largest files.",
    lesson:
      "Staleness is invisible from inside normal work. The cost scales with how long nobody looked, so make looking cheap and routine.",
    skills: ["Git at scale", "Release engineering", "Rollback planning", "Incident learning"],
  },
  {
    id: "supervisor",
    slug: "supervisor",
    kicker: "Measuring honestly",
    title: "A supervision layer I built, measured, and switched off",
    problem:
      "An assistant that can read mail, move files and run commands is useful and risky in equal measure. I built a supervisor so completion would mean evidence and sensitive steps would wait for my approval.",
    lesson:
      "Judge a control layer by finished real work, not by gates passing, and build the way back before the way forward.",
    skills: ["Least privilege", "Approval flows", "Audit trails", "Honest measurement"],
  },
  {
    id: "webcheckup",
    slug: "webcheckup",
    kicker: "Product",
    title: "WebCheckup: a non-invasive website check-up service",
    problem:
      "I wanted to test whether small businesses would buy a simple, honest check-up of their public website, without building a SaaS or running anything intrusive.",
    lesson:
      "Anything that contacts a stranger needs a gate on what it is allowed to claim, not just on what it is allowed to send.",
    skills: ["Web security basics", "Product thinking", "Responsible outreach", "Bilingual copy"],
    link: { label: "Public site repository", to: "https://github.com/JuriBuora/webcheckup-online", external: true },
  },
  {
    id: "continuity",
    slug: "continuity",
    kicker: "Operating discipline",
    title: "Close-out contract: any session can stop and anyone can continue",
    problem:
      "Work spread across several AI agents and many sessions left branches, commits and half-finished jobs scattered. I needed to stop at any moment and resume elsewhere without hunting for loose ends.",
    lesson:
      "A safety net beats a question. Make the undo cheap, then let work proceed.",
    skills: ["Git workflow", "Documentation", "Process design", "Operational hygiene"],
  },
];

export const proves = [
  {
    title: "Security judgement",
    body: "I look for what can go wrong before building, and I put the control where the caller cannot walk around it.",
  },
  {
    title: "Operational discipline",
    body: "Version control, handoffs, restore paths and verification of what is actually running, not what the config says.",
  },
  {
    title: "Fluent with AI tooling",
    body: "I route work across local and cloud models, write the skills they follow, and measure where they fail.",
  },
];

export const honestScope = [
  "Built with AI pair-programming (Claude Code and Codex). I set the goals, constraints and review bar; the models write much of the code under them.",
  "Solo, personal and after hours. This is a lab, not a production team, and the scale is one person's.",
  "Most repositories are private because they hold personal data. Numbers come from git and are reproducible on request, in a live walkthrough.",
  "Public work you can open today: this site, the WebCheckup site, a production website for a farm business, and my detection-engineering practice repository.",
];
