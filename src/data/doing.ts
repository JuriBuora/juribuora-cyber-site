/**
 * Content for /what-im-doing: the short, outcome-first version of the work.
 * Every number traces to a record in the private workstation repositories
 * (see `proof.source`). Copy states what each approach delivers; it does not
 * claim customers, revenue or results that do not exist. The scrub test runs
 * over this file.
 */

export type Chapter = {
  id: string;
  kicker: string;
  headline: string;
  lead: string;
  /** What a team or business gets from this kind of work. */
  benefits: string[];
  proof: { value: string; label: string; source: string }[];
  /** Deep-dive page under /workstation/<slug>. */
  slug: string;
  reading?: { label: string; to: string }[];
  visual: "report" | "shapes" | "pipeline" | "funnel" | "rebind" | "deliverables";
};

export const chapters: Chapter[] = [
  {
    id: "webcheckup",
    kicker: "Product · Web security basics",
    headline: "Website check-ups a business owner can act on.",
    lead:
      "WebCheckup looks at a public website from the outside, the way a customer, a browser or a search engine would, and turns what it finds into a short, prioritised report in plain language.",
    benefits: [
      "Spots the visible problems that cost trust: broken HTTPS, missing browser protections, slow or unusable mobile pages, broken links.",
      "Says who can fix each point and how urgent it is, instead of handing over a scanner dump.",
      "Never claims what it cannot show: an outreach email may state a finding only if the evidence reproduces.",
    ],
    proof: [
      { value: "2", label: "languages, kept in sync by a test", source: "Italian and English email parity test in the engine repository" },
      { value: "39", label: "test files in the engine", source: "test files in the private engine repository" },
      { value: "123", label: "commits since July", source: "git rev-list --count HEAD, engine repository" },
    ],
    slug: "webcheckup",
    visual: "report",
  },
  {
    id: "client-work",
    kicker: "Client work · Web and data",
    headline: "Real work for real businesses.",
    lead:
      "I built and maintain the production website of a farm business. Separately, for a small business running on two old single-user databases, I analysed the data and planned an affordable move to a shared system, delivering the first usable piece along the way.",
    benefits: [
      "A fast, mobile-first site with search metadata, validated forms and analytics that wait for consent.",
      "Migration planning that starts from the evidence: copies only, originals verified untouched, and the business logic found where it really lives.",
      "Costed options in plain language, then phased delivery where each step waits for the client's go.",
    ],
    proof: [
      { value: "231", label: "commits on the live site", source: "git rev-list --count HEAD, public farm website repository" },
      { value: "37", label: "sections in the migration report", source: "client report delivered Jul 2026 (private)" },
      { value: "10", label: "sheets in the delivered workbook", source: "timesheet prototype delivered Jul 2026 (private)" },
    ],
    slug: "farm-website",
    reading: [{ label: "The migration study", to: "/workstation/access-migration" }],
    visual: "deliverables",
  },
  {
    id: "foresight",
    kicker: "Process · Release safety",
    headline: "Ship automation without finding the bugs through your customers.",
    lead:
      "Foresight is a release gate I built after an AI system's output reached real people with defects nobody had caught. Before a risky change goes out, the failure shapes that apply are named, each gets a mechanism, and each gets a proof that was actually run.",
    benefits: [
      "Fewer incidents that are found by the people on the receiving end.",
      "A written trail: what could break, what stops it, and the evidence it was checked.",
      "Controls that hold. Where a failure would reach a person, the rule is built into the system rather than left as an instruction.",
    ],
    proof: [
      { value: "34", label: "documented failure shapes", source: "numbered rows in the foresight skill catalogue" },
      { value: "5 in 6", label: "times a prompt rule held, so it became a filter", source: "repeated-trial measurement recorded in the skill" },
    ],
    slug: "foresight",
    visual: "shapes",
  },
  {
    id: "safe-messaging",
    kicker: "Applied AI · Fail-safe delivery",
    headline: "AI that talks to people, with a safety net at the door.",
    lead:
      "I run an auto-reply assistant on WhatsApp for my own conversations, with people who know it is there. Because a wrong message cannot be unsent, I treat the moment before delivery as the control point and measure the assistant like a system under test.",
    benefits: [
      "A filter and a shaping step sit between the model and the recipient, so internal notices, leaked reasoning and tool errors never go out.",
      "Per-conversation on and off, a temporary tone instruction that expires on its own, and a reply that fails the final checks is not sent at all.",
      "Measured, not hoped for: 123 test scenarios run three times each, plus a real canary turn on the production path.",
    ],
    proof: [
      { value: "123 × 3", label: "scenario runs per measurement round", source: "probe description in the private issue list, 25–26 Sep 2026" },
      { value: "2 nights", label: "of measuring turned up the defects; most fixes became mechanisms", source: "same issue list" },
    ],
    slug: "messaging-assistant",
    reading: [
      { label: "Red-teaming my own chatbot", to: "/blog/200" },
      { label: "A reply is a capability, not a suggestion", to: "/blog/206" },
    ],
    visual: "pipeline",
  },
  {
    id: "supervisor",
    kicker: "Agents · Honest measurement",
    headline: "Agents that have to prove their work, and a trial I reported honestly.",
    lead:
      "I built a supervision layer so an AI agent could not simply say a job was done. I ran it live, measured it, and switched it off while I fixed what the numbers exposed.",
    benefits: [
      "Approvals before sensitive steps, an audit record for every decision, and crash recovery that does not repeat side effects.",
      "Completion needs independent evidence. Self-reported success is rejected.",
      "A culture of measuring outcomes. A readiness gate that is green is not the same as work getting done.",
    ],
    proof: [
      { value: "41", label: "tasks in the live trial", source: "trial database audit, 18 Jul – 2 Aug 2026, in the supervisor current-state record" },
      { value: "2", label: "distinct real tasks completed", source: "same audit" },
    ],
    slug: "supervisor",
    visual: "funnel",
  },
  {
    id: "security",
    kicker: "Security · Review and practice",
    headline: "Finding the flaw in my own tool before anyone else does.",
    lead:
      "I reviewed a browser tool I wrote for an AI agent and found a real DNS-rebinding path: the safety check and the browser could end up talking to different addresses. I documented the options and what each costs. Alongside that I keep a public daily learning log and a detection-engineering practice repository.",
    benefits: [
      "A habit of attacking my own work, then writing down the reasoning so a reviewer can disagree with it.",
      "Comfortable with the basics of web and network risk: SSRF, DNS, TLS, headers, least privilege.",
      "Learning in public: 243 days of notes and labs, including the mistakes.",
    ],
    proof: [
      { value: "243", label: "days in the public log", source: "latest content sync of the public learning log" },
      { value: "1", label: "real SSRF path found in my own code", source: "browser adapter security review, 27 Jul 2026" },
    ],
    slug: "browser-research-adapter",
    visual: "rebind",
  },
];

export const roles = [
  {
    title: "Junior security analyst",
    body: "Triage, detection tuning, web and network risk, careful write-ups. I explain my reasoning and I like being reviewed.",
  },
  {
    title: "AI and automation operations",
    body: "Running agents, routing between models, keeping them safe and measurable, and documenting so anyone can take over.",
  },
  {
    title: "Small-business web health",
    body: "Plain-language website check-ups and fixes for HTTPS, performance, mobile and visibility.",
  },
];

export const heroStats = [
  { value: "1,364", label: "commits in 13 weeks" },
  { value: "34", label: "failure shapes in my release gate" },
  { value: "243", label: "days of public learning notes" },
];
