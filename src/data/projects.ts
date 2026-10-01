/**
 * Deep-dive project pages for /workstation/:slug.
 *
 * Facts come from the workstation's own decision records, handoffs and git
 * history (private repositories), read on 1 Oct 2026. Nothing here may name a
 * private contact, host, account or credential; src/data/workstation.test.ts
 * runs the scrub rules over this file.
 */

export type ProjectStatus = "active" | "evaluating" | "paused" | "retired" | "rejected";

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  period: string;
  tagline: string;
  why: string[];
  what: string[];
  decisions: string[];
  /** Heading is chosen from status: "Where it stands" or "Why I stopped". */
  outcome: string[];
  learned: string;
  evidence: string[];
  tags: string[];
  /** Retired projects: how it could be brought back. */
  restore?: string;
  link?: { label: string; href: string; external?: boolean };
  /** Related posts on this site. */
  reading?: { label: string; to: string }[];
  related?: string[];
};

export const statusLabel: Record<ProjectStatus, string> = {
  active: "Active",
  evaluating: "Evaluating",
  paused: "Paused",
  retired: "Retired",
  rejected: "Rejected",
};

export const projects: Project[] = [
  /* ───────────── built and running ───────────── */
  {
    slug: "ai-workstation",
    name: "Local-first AI workstation",
    status: "active",
    period: "Jun 2026 – now",
    tagline: "One laptop that routes work across local models and paid frontier models, and remembers what it did.",
    why: [
      "I wanted AI help on everything I do, without sending everything to a cloud model and without paying frontier prices for routine work.",
      "The idea: do routine work locally, escalate to a paid model only when the task is consequential, and keep the whole thing inspectable.",
    ],
    what: [
      "An inference orchestrator that routes tasks across local runtimes (Ollama, LM Studio) and Claude Code or Codex.",
      "A repository of governance rules, runbooks, handoffs and a project index so any agent can pick up cold.",
      "A memory and retrieval layer with one canonical memory directory, plus skills that capture repeatable workflows.",
    ],
    decisions: [
      "Three overlapping routing documents were kept on purpose (rules, benchmark evidence, architecture), but the escalation policy that had been written twice, in different words, now lives in exactly one place.",
      "An early parallel scaffold was merged into the main tree and deleted once a repo-wide search proved nothing read it.",
      "Model choices are decided by running real tasks, not by reputation. Several models were retired this way (see the graveyard).",
    ],
    outcome: [
      "In daily use. 1,364 commits between 28 Jun and 30 Sep 2026, 500+ handoff notes and 100+ documents.",
      "A deliberate low-maintenance policy: I do not chase model releases. I revisit the stack only when a measured problem justifies it.",
    ],
    learned:
      "The hard part of a personal AI stack is not the models. It is keeping one source of truth for rules and memory, and being willing to delete things.",
    evidence: [
      "git history of the private workstation repository",
      "routing and architecture documents, with dated resolution notes",
    ],
    tags: ["Orchestration", "Local LLMs", "Documentation", "Governance"],
    related: ["hermes-gateway", "continuity", "ai-os-scaffold", "ds4"],
  },
  {
    slug: "hermes-gateway",
    name: "Hermes agent gateway (self-hosted fork)",
    status: "active",
    period: "2026 – now",
    tagline: "A general-purpose agent I can reach from my phone, running on my own hardware, extended with plugins of my own.",
    why: [
      "I wanted a hands-on agent that could be asked in plain words to do things, from a chat app, while I am away from the desk.",
      "I chose an open-source agent gateway and forked it so I could add the behaviour I needed and keep the safety rules on my side of the line.",
    ],
    what: [
      "A self-hosted gateway with a dashboard, a command line and chat channels.",
      "Nine custom plugins, including: switching the active model in plain words with a timed automatic revert, a daily session reset, and a handoff that launches a detached Claude or Codex job from chat and posts the result back.",
      "The handoff keeps the model in a proposing role: it suggests a job, and a short code that I send back is what launches it.",
      "A guard around personal documents lets the agent read when I ask, and requires me to approve every change after seeing the diff.",
    ],
    decisions: [
      "Local models were tried first for person-facing replies. A bake-off found the old baseline scored 70 out of 100, emitted fake function-call markup instead of a real lookup, and produced no PDFs, so a different local model replaced it.",
      "Fixes the agent reports about itself are checked by an independent script rather than trusted.",
      "Upgrades follow a written procedure: reinstall in place, never re-sync the live environment, because that once threatened a working voice stack.",
    ],
    outcome: [
      "Live. The fork had silently fallen 17,898 commits behind upstream. Reconciling it meant re-porting 78 of my commits through upstream's restructured modules and folding in 31 more from the branch that was actually running.",
      "To tell real breakage from noise, the full test suite was compared with a clean baseline: 97 failures already existed upstream of my changes and 3 were real regressions, which were fixed. An end-to-end test ran against a fake messaging socket, so no account or person could be reached.",
      "The live gateway was checkpointed before the cutover. A dependency that the sync had silently dropped was caught before the restart, not after.",
      "Closed 22 Sep 2026. A later upstream upgrade went live the same way on 29 Sep.",
    ],
    learned:
      "Forks rot invisibly. I now run a one-line drift check whenever I am already in a repo with an upstream, so the gap shows up while it is still small.",
    evidence: [
      "commit counts and the cutover record in the private fork",
      "model bake-off notes dated 13 Jul 2026",
    ],
    tags: ["Agents", "Plugins", "Release engineering", "Open source"],
    related: ["foresight", "supervisor", "qwen-lane"],
  },
  {
    slug: "messaging-assistant",
    name: "WhatsApp auto-reply assistant",
    status: "active",
    period: "Aug 2026 – now",
    tagline: "An assistant that answers on a messaging app, built around one idea: a message cannot be unsent, so the moment before delivery is the control point.",
    why: [
      "I wanted an assistant that could handle routine messages in my own conversations while I am busy.",
      "A reply to a real person is irreversible. That makes the delivery boundary the place to put the controls, not the prompt.",
    ],
    what: [
      "A model with a prompt, a refusing filter at the delivery boundary, and a shaping step that rewrites replies that are good but badly formed.",
      "Per-conversation on and off, and a temporary tone instruction that expires by itself.",
      "Calendar-aware answers that use dated lookups rather than asking the model to work out weekdays.",
      "A measurement setup in three layers: a probe of 123 scenarios run three times each that never sends, a canary that runs one real turn through the production path, and unit tests for the delivery rules.",
    ],
    decisions: [
      "Prompts plateau and mechanisms hold. Each recurring defect moved from a prompt rule to a filter or shaping rule.",
      "The credential vault tools are switched off on this surface, because the caller is whoever messages me.",
      "The tool manual is not given to the model on this surface. Cutting the assembled prompt from 61,923 to 28,790 characters reduced assistant-sounding output.",
      "Silence beats a degraded reply. When the preferred model is unavailable the assistant stays quiet rather than answering with a weaker model.",
      "A reply must trace to a recent inbound message: one grant per chat, used once, expiring in five minutes (described in my learning log).",
    ],
    outcome: [
      "Running. Two nights of measuring found a long list of defects. Examples: 1,178 characters of model reasoning delivered as the message, raw provider errors and voice-note transcripts reaching the sender, and replies of 700 characters where two sentences were wanted. Each became a filter or shaping rule that is now tested.",
      "A weak local model turned out to be the root cause of a whole day's defects. Moving this surface to a hosted model fixed more than any wording change had.",
    ],
    learned:
      "Treat the assistant like a system under test: measure it repeatedly, fix the harness when the harness is wrong, and put the hard rules where the model cannot talk its way past them.",
    evidence: [
      "the private issue list of defects found on 25–26 Sep 2026",
      "three posts in my public learning log, linked below",
    ],
    tags: ["LLM safety", "Egress filtering", "Adversarial testing", "Capability-based authorisation"],
    reading: [
      { label: "Red-teaming my own chatbot (day 200)", to: "/blog/200" },
      { label: "A reply is a capability, not a suggestion (day 206)", to: "/blog/206" },
      { label: "Lab 17: a minimal adversarial test harness", to: "/labs/17" },
    ],
    related: ["foresight", "hermes-gateway"],
  },
  {
    slug: "foresight",
    name: "Foresight: a pre-mortem and release gate",
    status: "active",
    period: "Aug 2026 – now",
    tagline: "A checklist of 34 ways things break, plus a tool that refuses to call work done until each relevant one is proven.",
    why: [
      "A WhatsApp auto-reply assistant I run produced about a dozen defects over two days: a duplicated greeting, internal model details sent to a contact, assistant-sounding replies where a person was expected, a group chat silently skipped.",
      "Every defect was found by reading what real people had already received. I wanted to find the same failures at my desk instead.",
    ],
    what: [
      "A catalogue of 34 recurring failure shapes, each with a real or honestly labelled hypothetical instance and a way to detect it.",
      "A card per branch, stored outside the repository: the failure, the enforcement, and the executed proof for each shape that applies.",
      "Proofs are hashed against the files they covered, so editing code after the test is detected instead of trusted.",
      "A hook that checks the card at the end of a session when risky files changed, and blocks once for the red zone: auth, outbound delivery, credentials, schedulers, deployment.",
    ],
    decisions: [
      "Size is not a risk proxy. The size floor that skips tiny changes is suspended for the red zone, because a one-line change can flip a security setting.",
      "Prefer a mechanism to an instruction. A voice rule held 5 times in 6 trials, which is not a guarantee on a surface a real person reads, so the hard constraint also exists as an outbound filter.",
      "Never use an unaware real person as the test. Use a test recipient, a sandbox or a canary I own.",
      "Hashes bind code, not the world, so proofs that depend on external state record what was observed and when.",
    ],
    outcome: [
      "In use on every change that touches a person, shared state or an outside system. It has caught its own mistakes: running the gate on the gate's construction found defects the tests had missed.",
    ],
    learned:
      "An instruction is a hint. A control is a mechanism sitting on the surface the caller can actually reach.",
    evidence: [
      "the skill and its worked example in a private, version-controlled skills repository",
      "the 34-row catalogue; failure counts from repeated trials",
    ],
    tags: ["Risk analysis", "Change control", "Verification", "Defence in depth"],
    related: ["messaging-assistant", "hermes-gateway", "supervisor", "continuity"],
  },
  {
    slug: "supervisor",
    name: "Supervisor service",
    status: "paused",
    period: "Jul 2026 – 3 Aug 2026 (switched off on purpose)",
    tagline: "A layer that makes an agent prove its work, with approvals, audit records and crash recovery. I ran it live, measured it, and switched it off.",
    why: [
      "My existing agent could say a task was done without anything independent confirming it. I wanted completion to mean evidence.",
      "I also wanted every sensitive step to pause for my approval and to leave a durable record.",
    ],
    what: [
      "A SQLite-backed state machine with a command-line interface and an API that listens only on loopback.",
      "Task-scoped permissions, durable audit records, approval queues and a classifier that routes requests.",
      "Evidence gating: hand-written summaries are rejected, self-reported success is rejected, and blind repetition of a failed step is refused and logged.",
      "A chat transport with a receipt store so every send is idempotent, and eight binding acceptance scenarios, run first against fixtures and then live.",
    ],
    decisions: [
      "Everything was additive and behind a feature flag, with each live stage gated on my written go.",
      "Disabling it needs no code change: two flags set to off and the background agent unloaded. Re-enabling is the reverse.",
    ],
    outcome: [
      "The live trial ran from 18 Jul. It was completely non-functional for its first two days, undetected: a workspace path pointed inside the repository, so every real task crashed on start. I found it on 20 Jul and fixed it.",
      "Between 18 Jul and 2 Aug the trial database held 41 tasks. 8 completed, but 3 were acceptance fixtures and 4 were the same request queued again, so only two distinct real tasks completed in 17 days. 25 ended as failed with evidence. Failed tasks averaged 121 minutes of active work against 19.5 for completed ones. Notifications were not the problem: 24 of the 25 failures sent a message, so I was told every time.",
      "On 3 Aug I switched it off on purpose, because I wanted to run the assistant plain for a while without a supervision layer in front of it. As of 1 Oct the flags are still off. The code is fixed and the tests pass; this is a pause, not an abandoned project.",
      "Three root causes were fixed the same day: chat narration being routed as supervised work, one routing refusal being paid for twice, and open attempts never being sealed on a failed run. A fourth, an expired login for one repair tool, was an operator action. The lane now reports the tool as unavailable instead of disguising it as a failed repair.",
    ],
    learned:
      "A supervision layer should be judged by finished real work, not by gates passing. At one point every readiness gate was green while two real tasks had completed.",
    evidence: [
      "deactivation record and trial-database audit dated 3 Aug 2026",
      "stage C repair record dated 20 Jul 2026",
    ],
    tags: ["Automation security", "Audit trails", "State machines", "Measuring honestly"],
    related: ["qwen-night-shift", "foresight", "capability-integration"],
  },
  {
    slug: "capability-integration",
    name: "Claude-capability integration (13 phases)",
    status: "active",
    period: "Jul 2026",
    tagline: "A clean-room rebuild of useful agent capabilities, shipped one evidence-gated phase at a time and switched off by default.",
    why: [
      "Public reference projects showed agent features I wanted: sessions, permission gates, task graphs, a repair loop, a memory layer.",
      "Copying code was off the table. I wanted to understand each capability and prove it before it touched anything.",
    ],
    what: [
      "Thirteen phases from baseline and provenance through to shadow trials against the old path and a rollback drill.",
      "Permanent modules for task contracts, a working wiki, shared runtime and compaction, a permission gate with git isolation and rollback, a capability registry, a task graph, and a plan-edit-test-repair loop.",
      "Remote visibility as a read-only projection, with review using subscriptions only so the project spends no API money.",
    ],
    decisions: [
      "Every capability is opt-in and feature-flagged. The old path stays the default.",
      "Most phases needed an independent frontier-model review. Reviewers rejected post-hoc timeouts, moving baselines and stale resume paths, and I fixed those rather than arguing.",
      "Direct reuse of reference code was rejected in the audit phase.",
    ],
    outcome: [
      "Complete. Highlights from the index: 22 of 22 tests passing, 15 of 15 possible repairs fixed and 3 of 3 impossible ones stopped honestly with zero false successes, and 9 of 9 shadow trials at least as good as the old path.",
      "No capability is a default yet. The cutover decision is still mine to make.",
    ],
    learned:
      "Acceptance evidence has to be committed before the result is known. Evidence that was corrected after the fact is not evidence.",
    evidence: [
      "implementation index and per-phase acceptance records",
      "test runner results: 22 of 22",
    ],
    tags: ["Systems design", "Testing", "Code review", "Change management"],
    related: ["supervisor", "foresight"],
  },
  {
    slug: "nuntorium",
    name: "Nuntorium: an iPhone command centre",
    status: "active",
    period: "Jun 2026 – now",
    tagline: "A native iOS app to submit tasks, watch runs and approve actions on my workstation agents from my phone.",
    why: [
      "I kept ending up driving the laptop from my phone. A purpose-built app should be faster and safer than a remote desktop.",
    ],
    what: [
      "Submit tasks, dictate with press-and-hold, and review an interpreted draft before it is sent.",
      "A command tab for reachability, provider health, recent runs, pending approvals and generated files.",
      "Live task detail from an event stream, with safe text previews of files a task produced.",
      "Local notifications when a task I am watching finishes.",
    ],
    decisions: [
      "Providers the laptop cannot run are shown as planned, never as if they worked.",
      "Previews are scoped to a safe workspace root, and paths outside it are rejected.",
      "A separate iOS redesign branch from 6 Jul was abandoned unmerged after I rendered it against the current app. It lacked the operations-first work that makes the app useful.",
    ],
    outcome: [
      "Active and still in progress. An honest limit is documented in the app: true push when the app is closed needs Apple's push service, a developer account and a server-side sender, which are not set up.",
    ],
    learned:
      "Show what is really running. A UI that implies a capability it lacks is worse than one with fewer buttons.",
    evidence: ["app README and feature list", "the closed-out redesign branch comparison"],
    tags: ["iOS", "SwiftUI", "Product", "Honest UX"],
    related: ["hermes-gateway", "ai-workstation"],
  },
  {
    slug: "webcheckup",
    name: "WebCheckup",
    status: "active",
    period: "Jul 2026 – now",
    tagline: "A non-invasive website check-up for small businesses, with strict rules about what the outreach is allowed to claim.",
    why: [
      "Small businesses rarely know how their public website looks to a stranger or a browser. I wanted to test whether a simple, honest, external check-up was something they would pay for.",
      "It had to be external and non-invasive. It is explicitly not a penetration test.",
    ],
    what: [
      "A scanner for HTTPS and TLS, browser hardening headers, mobile usability, speed, SEO basics, broken links and visible privacy signals.",
      "A report with priorities and plain explanations, aimed at a business owner rather than an engineer.",
      "An outreach pipeline with a human approval step before any email goes out.",
    ],
    decisions: [
      "A claims-trust gate: an email may state a finding only if the evidence reproduces. Speed claims need a minimum page weight and the home page.",
      "Italian and English email templates change together, and a parity test fails if they drift.",
      "A private engine repository and a public site-only repository, each with pre-push guards, so engine code and customer data cannot leak through the website.",
      "Markets are switched on one at a time with published notices.",
    ],
    outcome: [
      "Running. 123 commits and 39 test files in the engine repository. The public site is open source.",
      "I treat it as an experiment in whether the offer sells, not as a finished business.",
    ],
    learned:
      "Anything that contacts a stranger needs a gate on what it may claim, not only on what it may send.",
    evidence: ["public repository for the website", "engine commit history and tests"],
    tags: ["Web security basics", "Product", "Bilingual", "Responsible outreach"],
    link: { label: "Public site repository", href: "https://github.com/JuriBuora/webcheckup-online", external: true },
    related: ["foresight"],
  },
  {
    slug: "browser-research-adapter",
    name: "Browser research adapter and the DNS-rebinding fix",
    status: "active",
    period: "Jul 2026",
    tagline: "A tool that lets an agent read JavaScript-heavy pages, and the security review that found a way to abuse it.",
    why: [
      "An agent that researches the web needs a real browser for pages that render with JavaScript. A browser that fetches arbitrary URLs for an agent is an SSRF risk by default.",
    ],
    what: [
      "A Node adapter that drives Chromium through Playwright and validates targets before navigating.",
    ],
    decisions: [
      "My own security review found that Chromium resolves DNS independently of the Node check made moments earlier. A hostile site could answer with a public address for the check and a private one for the load: DNS rebinding.",
      "The decision record verifies its mechanism instead of assuming it. It confirms the launch flag exists in the installed Playwright, and that the actual connected address can be read back from a response.",
      "It weighs the options, records why a Node-mediated request fulfilment was rejected as the default, and notes the constraints of the test sandbox: no root and no ability to run a DNS server both resolvers could reach.",
    ],
    outcome: [
      "The decision is written and the defect is tracked to resolution. I count this as a good outcome of the process: the flaw was found by a review I ran, not by someone else.",
    ],
    learned:
      "A preflight check and the real request must use the same resolved address, or the check proves nothing.",
    evidence: ["architecture decision record", "the security review it resolves"],
    tags: ["SSRF", "DNS rebinding", "Chromium", "Security review"],
    related: ["foresight"],
  },
  {
    slug: "mcp-profile-launcher",
    name: "MCP profile launcher",
    status: "active",
    period: "Jul 2026 – now",
    tagline: "Start an agent session with the smallest set of tools it needs, instead of loading everything.",
    why: [
      "Every tool an agent can see costs tokens and widens what it can do. Loading all of them for every task is both slow and unsafe.",
    ],
    what: [
      "Six profiles (coding, github, auto, research, soc, admin) that expose only the tools a task needs.",
      "Routing, plus doctor, measure and handoff subcommands, with live enforcement for Codex, Claude and Aider backends.",
    ],
    decisions: [
      "Measure before claiming a saving. Running tools in Docker does not reduce tokens, because the schemas cost the same once loaded, so the docs say so.",
      "I also traced an old command-line client that sent roughly 290k tokens per request because dozens of connected apps were inlined, and replaced it with a wrapper around the current bundled client.",
    ],
    outcome: ["Five of five planned phases complete. Active."],
    learned:
      "Least privilege and token cost point the same way: fewer tools in view.",
    evidence: ["the architecture note, including its 'why Docker does not reduce tokens' section", "request-size measurements"],
    tags: ["MCP", "Least privilege", "Cost control"],
    related: ["ai-workstation"],
  },
  {
    slug: "continuity",
    name: "Continuity and close-out system",
    status: "active",
    period: "Jul 2026 – now",
    tagline: "A set of rules and tools so any session can stop at any moment and anyone can continue.",
    why: [
      "Work spread across several agents left branches, commits and half-finished jobs in different places. I needed to stop and resume elsewhere without a hunt for loose ends.",
    ],
    what: [
      "A handoff note for every meaningful task: what is done, what is left, the exact next command, and what must not be redone.",
      "A registry and helper that decide where current context and permanent history live, with atomic writes and locked append-only history.",
      "A rule to land my own work by concern, never sweeping up another session's files, and a stop hook that reports dirty files and unlanded branches.",
    ],
    decisions: [
      "History is complete but never loaded automatically. Retrieval of history is explicit and bounded.",
      "Revertibility instead of pre-approval: skills and policy live in git so a bad self-edit is a reviewable diff.",
    ],
    outcome: ["In use on every task. More than 500 files in the handoff folder as of 1 Oct 2026."],
    learned:
      "A safety net beats a question. Make undo cheap and let work proceed.",
    evidence: ["handoff folder", "continuity contract document"],
    tags: ["Process design", "Git workflow", "Documentation"],
    related: ["ai-workstation", "foresight"],
  },
  {
    slug: "cyber-learning-log",
    name: "Cybersecurity learning log and detection practice",
    status: "active",
    period: "Daily, ongoing",
    tagline: "A public, daily log of study, labs and mistakes on the way into security work.",
    why: [
      "I am moving into security work and wanted my learning to be checkable, not just claimed.",
    ],
    what: [
      "Daily notes and hands-on labs in a Jekyll repository, mirrored into this React and Vite site by a scheduled build.",
      "A detection-engineering practice repository with KQL rules, tuning notes and synthetic validation samples.",
    ],
    decisions: [
      "Include the mistakes. A log that only shows wins is not evidence of learning.",
      "The site rebuilds daily rather than every 30 minutes. 48 rebuilds a day of unchanged content was waste.",
    ],
    outcome: ["Ongoing. The latest site sync reached day 243."],
    learned: "Public notes make me explain things properly. The explanation is the practice.",
    evidence: ["the public repositories", "this site"],
    tags: ["Learning in public", "Detection engineering", "React", "CI/CD"],
    link: { label: "Browse the daily logs", href: "/blog" },
    related: [],
  },

  {
    slug: "farm-website",
    name: "Production website for a farm business",
    status: "active",
    period: "Jan 2025 – now",
    tagline: "A fast marketing site for a real agricultural business, built and maintained end to end.",
    why: [
      "A real business needed a site that loads quickly on a phone, shows up in local search, and lets customers find products and get in touch.",
    ],
    what: [
      "A multi-page static site in React, TypeScript, Vite and Tailwind: products, firewood, gallery, contact, company background and legal pages.",
      "SEO metadata and structured data, responsive image generation, form validation, and analytics that respect cookie consent.",
      "Static deployment with a custom domain, plus lint and unit tests.",
    ],
    decisions: [
      "Static over dynamic. There is no server to patch or database to leak, and the site is cheap to host.",
      "Analytics load only after consent, and the privacy and cookie pages say what is actually collected.",
    ],
    outcome: ["Live and in use. 231 commits between January 2025 and August 2026. The repository is public."],
    learned:
      "For a small business, the unglamorous parts decide whether a site works: speed on a phone, clear contact paths, and honest legal pages.",
    evidence: ["public repository and live site"],
    tags: ["React", "TypeScript", "SEO", "Privacy compliance", "Client work"],
    link: { label: "Repository on GitHub", href: "https://github.com/JuriBuora/farina-farm-website", external: true },
    related: ["webcheckup"],
  },
  {
    slug: "access-migration",
    name: "Legacy database migration study for a small business",
    status: "paused",
    period: "Jul 2026 – waiting on the client",
    tagline: "Analysing two old single-user databases and a spreadsheet, and planning a shared system the business can afford and run.",
    why: [
      "A small business ran its sales, purchases and staff hours on two legacy Access databases and an Excel sheet that only one person at a time could use.",
      "They needed two people editing and one person reading from a phone, without losing years of records or the calculations hidden in old queries.",
    ],
    what: [
      "A full analysis of both databases, done on copies: structure, record counts, and where the business logic actually lives. There was no custom code; the calculations sat in the queries.",
      "A technical and cost report in 37 sections with several options, from which the client approved one: a small shared database server with the familiar front end kept, redundant storage, 3-2-1 backups, power protection, and read-only access for one role.",
      "A first deliverable they could use straight away: a cleaned-up timesheet workbook with central pay rates, protected formulas and input validation.",
    ],
    decisions: [
      "Originals were never touched. I worked on copies and verified with hashes that the source files were unchanged.",
      "No implementation without approval. The report came first, the client chose, and each phase waits for a go.",
      "Keep the front end people already know. Changing the storage underneath is less risky than retraining everyone at once.",
      "The files are Windows-only, so I analysed them from a Mac through a virtual machine and scripted exports rather than clicking through by hand.",
    ],
    outcome: [
      "Analysis and the timesheet prototype are delivered. The migration itself is paused until the client reviews the prototype and we agree a test plan for checking the totals match.",
    ],
    learned:
      "In a migration the rows are the easy part. The meaning is in the queries, the rounding and the habits of the people who use it.",
    evidence: ["the client report and the delivered workbook (private)"],
    tags: ["Data migration", "SQL", "Backups", "Requirements", "Client work"],
    related: ["webcheckup"],
  },
  {
    slug: "home-climate",
    name: "Local control for home air conditioning",
    status: "active",
    period: "Aug 2026 – now",
    tagline: "Controlling two air-conditioning units over the local network, with no vendor cloud, and what that says about their security.",
    why: [
      "I wanted to switch and schedule the units from my own tools without depending on a vendor app or account.",
    ],
    what: [
      "A small command-line tool that reads and sets each unit over the local network.",
      "Home Assistant in Docker on a small home server, driving the same units.",
    ],
    decisions: [
      "It works because the units' network adapters accept local commands without any authentication. That is convenient, and it is also a finding: anything on the same network can control them.",
      "The server's firewall blocked my private network interface by default, so remote access had to be opened deliberately rather than by accident.",
      "The server's address changes, so everything refers to it by name instead of by a fixed address.",
    ],
    outcome: ["Working day to day."],
    learned:
      "Consumer devices often trust the local network completely. Knowing that changes what you allow onto it.",
    evidence: ["the tool and the Home Assistant configuration (private)"],
    tags: ["IoT", "Network security", "Docker", "Home Assistant"],
    related: ["ai-workstation"],
  },
  {
    slug: "lightroom-agent",
    name: "Lightroom culling helper",
    status: "active",
    period: "2026 – experimental",
    tagline: "A supervised helper that makes a first pass over a big folder of RAW photos, with an honest readiness score.",
    why: [
      "Sorting hundreds of RAW photos by hand is slow. I wanted a first pass I could review, not a tool that edits my archive on its own.",
    ],
    what: [
      "Scans a pilot folder of RAW files, extracts previews, builds comparative contact sheets and suggests keepers and low-priority frames.",
      "Packages the result as one review bundle I can open from my phone.",
    ],
    decisions: [
      "Supervised only. It suggests, I decide. It does not import ratings blindly.",
      "Its own documentation scores its readiness: 7 out of 10 for a pilot of 80 to 150 photos I review myself, 4 out of 10 for a big batch with checkpoints, 2 out of 10 for running unattended over the whole archive.",
    ],
    outcome: ["Useful for small supervised pilots. Not ready for unattended work, and labelled that way."],
    learned:
      "Writing down what a tool is not ready for is as useful as listing what it can do.",
    evidence: ["the project README with its readiness scores (private)"],
    tags: ["Automation", "Human in the loop", "Honest scope"],
    related: ["ai-workstation"],
  },

  /* ───────────── the graveyard ───────────── */
  {
    slug: "ds4",
    name: "DS4: a local DeepSeek V4 Flash backend",
    status: "retired",
    period: "Jul 2026 – 31 Jul 2026",
    tagline: "A very large model run locally. Removed after a benchmark that produced no valid data.",
    why: [
      "I wanted to know whether a frontier-class open model could run on this laptop and handle planning and coding that would otherwise cost money.",
    ],
    what: [
      "A local server and wrappers for a DeepSeek V4 Flash build, wired into the router as a provider and a fallback.",
      "Roughly 91 GB of weights and a 21 GB cache on a laptop with 128 GB of unified memory.",
    ],
    decisions: [],
    outcome: [
      "The 28 Jul benchmark produced zero valid data. The model's memory footprint stacked against everything else caused a real GPU out-of-memory failure, which tells you about the environment, not the model's quality.",
      "I could have re-run a clean benchmark. I chose removal: a proper re-benchmark was too big and slow for what I expected to get from it.",
      "Retired 31 Jul 2026. The provider and fallback entries were removed, and the code path that could serve it now returns false unconditionally.",
    ],
    restore:
      "Recovery is real, not theoretical: the source was a clean clone of the upstream project with nothing unpushed, the weights are re-downloadable, and a manifest with the quarantined service files was kept.",
    learned:
      "An environmental failure is not a verdict on the model. I also learned to write the way back before I delete anything.",
    evidence: ["retirement manifest", "the benchmark record that produced no valid data"],
    tags: ["Local LLMs", "Capacity planning", "Decommissioning"],
    related: ["ai-workstation", "qwen-lane"],
  },
  {
    slug: "aider",
    name: "Aider with a local model",
    status: "retired",
    period: "Jul 2026 – 30 Jul 2026",
    tagline: "A coding assistant lane that I uninstalled once better options covered its job.",
    why: [
      "I wanted a local, diff-based coding lane that could edit source without a paid model.",
    ],
    what: [
      "A wrapper script and a router lane that dispatched implementation and debugging tasks to Aider with a local model.",
      "A qualification test that covered a short plan, a bounded file write, and diff generation plus apply and test in an isolated git fixture.",
    ],
    decisions: [],
    outcome: [
      "Uninstalled on 30 Jul 2026 on my explicit instruction as part of a larger rebuild. The wrapper now exits with a reinstall hint, and the router refuses the lane before dispatch instead of running it.",
      "Code edits moved to an OpenCode lane with a local model, or to Claude Code.",
    ],
    restore:
      "One command reinstalls the pinned version. The inventory, rationale and rollback are in a retirement manifest.",
    learned:
      "Fail loudly when a lane is gone. A retired path that silently falls back is how you end up running something you thought you removed.",
    evidence: ["retirement manifest", "router lane that refuses before dispatch"],
    tags: ["Tooling", "Decommissioning", "Fail-closed"],
    related: ["ai-workstation"],
  },
  {
    slug: "skillclaw",
    name: "SkillClaw",
    status: "retired",
    period: "Jul 2026 – 1 Aug 2026",
    tagline: "A local proxy between my agent tools and the models. Retired when I dropped the approach it came with.",
    why: [
      "An experiment in a layer that sat between my coding tools and local models and recorded the conversations that passed through it.",
    ],
    what: [
      "Two always-on background services, a dedicated source clone with its own environment, wrappers, and a provider entry in the coding tool.",
      "On 26 Jul I wired it into the OpenCode lane with its own proxy port, taking care not to disturb the one already serving the agent gateway. Pointing the coding tool at the wrong proxy would have silently switched it to a different model.",
    ],
    decisions: [
      "As I recall, it went because I had decided not to use OpenClaw, the tool it came with. The record adds a concrete weakness: it was single-worker and synchronous, so one stuck request could block everything behind it.",
      "Retired, not merely stopped: the route checker now rejects any stale route to it, and my operator rules say never to reinstall it.",
    ],
    outcome: [
      "Both services were disabled and removed, and everything else moved into a permission-restricted rollback archive outside every directory my agents search.",
      "The agent gateway kept running on the verified proxy it already used, and direct local-model engineering now loads a safe profile without SkillClaw.",
      "The retirement record lists what was removed and how to roll back, but not why. I now write the reason down at the time.",
    ],
    restore: "Source, state and wrappers are in the rollback archive. Nothing depends on it, so it can stay retired.",
    learned:
      "Two always-on services with restart-on-crash are a real maintenance cost. Write the reason for retiring something at the time you retire it.",
    evidence: ["retirement handoff dated 1 Aug 2026", "26 Jul wiring handoff"],
    tags: ["Decommissioning", "Maintenance cost", "Proxy layers"],
    related: ["ai-workstation", "supermemory-eval"],
  },
  {
    slug: "qwen-lane",
    name: "The Qwen model lanes",
    status: "retired",
    period: "Jun – Aug 2026",
    tagline: "Several Qwen candidates for the local agent, each dropped for a measured reason.",
    why: [
      "A strong local coding model would let routine work run for free. I tried several Qwen builds in different roles.",
    ],
    what: [
      "Qwen 3 30B as the first Hermes baseline, Qwen 3.6 candidates, an 80B coder model through LM Studio and OpenCode, and a llama.cpp run of Qwen 3.8 for the person-facing agent.",
    ],
    decisions: [
      "13 Jul: Qwen 3.6 candidates and the old 30B baseline were removed after another model won on reliability. The baseline scored 70 out of 100, emitted fake function-call markup instead of a grounded lookup, and produced no PDFs.",
      "The llama.cpp and Qwen 3.8 experiment was rejected for person-facing use after a persona qualification failure, with a note not to reintroduce it casually.",
      "23 Aug: the 80B coder model was retired. On real OpenCode rounds it was the slowest of three candidates, and its 64.8 GB footprint bought no warm-cache benefit.",
    ],
    outcome: [
      "All retired. Historical benchmark records are kept for audit, and the router filters retired models out of candidates so a stale default cannot pick one.",
    ],
    restore: "The records say how each was run, so any of them can be re-tested against the current baseline.",
    learned:
      "Compare candidates on real tasks from the actual workflow. Benchmarks on paper picked the wrong winner more than once.",
    evidence: ["model routing document", "bake-off records"],
    tags: ["Model evaluation", "Local LLMs", "Benchmarks"],
    related: ["ds4", "qwen-night-shift", "hermes-gateway"],
  },
  {
    slug: "qwen-night-shift",
    name: "The overnight unattended run",
    status: "rejected",
    period: "26 – 27 Jul 2026",
    tagline: "A local model claimed six prompts done overnight. The next day's independent check disagreed.",
    why: [
      "I wanted to see how much real engineering a local model could do unattended, working through a queue of prompts overnight.",
    ],
    what: [
      "A night-shift run on a local Qwen model that reported Prompts 01, 02, 04, 07, 08 and 19 complete.",
    ],
    decisions: [
      "I commissioned an independent verification the next day rather than accepting the summary.",
    ],
    outcome: [
      "Verification at 13:45 on 27 Jul rejected the claim. Most items were partial or failing. The capability router defaulted open and did not require approval for personal operations. The task-receipt script let any terminal state be marked verified without an artefact or independent verifier. The memory-provenance validator accepted two fixtures whose hashes were deliberately mismatched.",
      "The same lesson later became a mechanism in the supervisor service, which rejects self-verification at insert.",
    ],
    restore: "Nothing to restore. The value is the finding, which shaped the supervisor service's evidence gating.",
    learned:
      "Never let the worker grade its own work. A confident summary and a passing check are different things.",
    evidence: ["independent verification handoff dated 27 Jul 2026"],
    tags: ["Verification", "Autonomous agents", "Honest evaluation"],
    related: ["supervisor", "qwen-lane", "foresight"],
  },
  {
    slug: "ai-os-scaffold",
    name: "AI-OS: the first multi-agent scaffold",
    status: "retired",
    period: "Late Jun – 4 Jul 2026",
    tagline: "My first orchestrator grew its own conventions beside the main ones. I merged what mattered and deleted the rest.",
    why: [
      "The first attempt at a multi-agent orchestrator, built in three quick versions with a router, orchestrator and dashboard.",
    ],
    what: [
      "A parallel copy of the memory, knowledge, handoff, playbook and template folders, plus a router and orchestrator that read their own config.",
    ],
    decisions: [
      "The router and orchestrator stayed, because they import their config by relative path and a careless merge would have broken them.",
      "The parallel memory folder was proved dead before deletion: a repo-wide search found nothing reading it, and the router already wrote to the root memory folder.",
      "Its few unique facts were merged into the root notes first. Empty scaffold folders were deleted, and a stale handoff instruction was corrected.",
    ],
    outcome: [
      "Resolved 4 Jul 2026: three real file collisions merged, two files retired as superseded by skills, twelve unique files moved, and the duplicate trees removed.",
    ],
    restore: "All of it is in git history.",
    learned:
      "Prove something is dead before deleting it, and keep the one thing that was quietly load-bearing.",
    evidence: ["resolution notes in the clean-up list"],
    tags: ["Refactoring", "Dead-code removal", "Documentation"],
    related: ["ai-workstation"],
  },
  {
    slug: "supermemory-eval",
    name: "Supermemory self-hosted evaluation",
    status: "retired",
    period: "Jul – Aug 2026",
    tagline: "A memory engine I ran fully offline to see if it should replace my own. It did not, because I already had one shared memory system.",
    why: [
      "A popular open-source memory engine promised fact extraction, profiles and hybrid search. I wanted to know if it beat the memory layer I had built.",
    ],
    what: [
      "A fully offline install: a small local model for fact extraction, local embeddings, a service bound to the loopback address, and no cloud keys.",
    ],
    decisions: [
      "Pinned to the previous version because the newest release had an open upstream bug: a native module was not bundled into its compiled binary.",
      "Kept strictly separate from the canonical memory layer, so an evaluation could not corrupt the real thing.",
      "Two integration problems were root-caused and fixed: an extraction workflow timeout on 22 Jul, and contention with the agent gateway for the same local model daemon on 28 Jul.",
    ],
    outcome: [
      "It worked end to end but never became part of the canonical memory system. It was switched off in early August.",
      "The reason is simple: I already had one shared memory and retrieval system that all my agents use. In late August I consolidated on that and uninstalled Supermemory. Two memory systems that can disagree are worse than one.",
    ],
    restore: "The install notes record the version pin and configuration, so it can be reinstalled from them.",
    learned:
      "Evaluate new tools beside your system, not inside it, and pin the version that works.",
    evidence: ["evaluation notes and resolved-limitation write-ups", "memory consolidation handoffs, 21–23 Aug 2026"],
    tags: ["Evaluation", "Memory and RAG", "Self-hosting"],
    related: ["ai-workstation", "skillclaw"],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

/** Display order for the main list: what a business would care about first. */
const workOrder = [
  "webcheckup",
  "farm-website",
  "access-migration",
  "foresight",
  "messaging-assistant",
  "hermes-gateway",
  "browser-research-adapter",
  "ai-workstation",
  "capability-integration",
  "mcp-profile-launcher",
  "continuity",
  "nuntorium",
  "cyber-learning-log",
  "home-climate",
  "lightroom-agent",
];

/** Things I chose to stop. Client work that is merely waiting on someone else is not in here. */
const isStopped = (p: Project) => p.status === "retired" || p.status === "rejected" || p.slug === "supervisor";

const rank = (slug: string) => {
  const i = workOrder.indexOf(slug);
  return i === -1 ? workOrder.length : i;
};

export const builtProjects = projects.filter((p) => !isStopped(p)).sort((a, b) => rank(a.slug) - rank(b.slug));
export const otherProjects = projects.filter(isStopped);
