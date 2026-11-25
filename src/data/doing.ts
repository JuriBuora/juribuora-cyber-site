/**
 * Current showcase: bounded claims from the approved 25 Nov 2026 audit.
 * Historical client deliverables retain their dates. Upstream work is attributed;
 * deployment details and private evidence stay outside this public module.
 */
import { jekyllSnapshot } from "./jekyllSnapshot.generated";

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
    "id": "hermes-ubuntu",
    "kicker": "Linux · AI integrations",
    "headline": "Moving an AI assistant gateway to Ubuntu.",
    "lead": "I adapted and deployed Nous Research’s open-source Hermes Agent on Ubuntu, separating the messaging gateway from optional workstation services. The 25 November 2026 audit checked runtime metadata and selected installed files; some tasks still depend on cloud models or workstation services.",
    "benefits": [
      "Deployment and dependency handling around an existing open-source agent, with upstream and custom work clearly attributed.",
      "A distinction between a running service, completed work and an accepted result, supported by recorded evidence.",
      "Operational documentation that keeps optional dependencies and recovery limits visible."
    ],
    "proof": [
      {
        "value": "Ubuntu",
        "label": "gateway observed running on 25 Nov 2026",
        "source": "25 Nov 2026 audit: service metadata, heartbeat and selected installed-file hashes"
      },
      {
        "value": "Open source",
        "label": "Hermes Agent by Nous Research",
        "source": "Hermes upstream baseline and custom integration comparison, 25 Nov 2026"
      }
    ],
    "slug": "hermes-ubuntu",
    "visual": "report",
    "reading": [
      {
        "label": "Deployment case study",
        "to": "/portfolio/12"
      }
    ]
  },
  {
    "id": "conversation-calendar",
    "kicker": "WhatsApp · Calendar integration",
    "headline": "Turning conversation into checked calendar actions.",
    "lead": "I built workflows around Hermes Agent for bounded conversation capture, participant and date validation, and native Google Calendar writes with readback checks. A recorded owner request verified a write and readback on 15 November 2026; newer conversational features were still under normal-use validation at the 25 November audit.",
    "benefits": [
      "Conversation context is limited and validated before a proposed appointment becomes a calendar action.",
      "Deterministic event IDs and readback checks help detect duplicates and verify the write.",
      "Persistent notification state supports retries after failures; a crash between remote acceptance and the local receipt can still duplicate a notification."
    ],
    "proof": [
      {
        "value": "15 Nov",
        "label": "2026: recorded calendar write and readback",
        "source": "15 Nov 2026 owner-request acceptance receipt; a different script version from the 25 Nov audit"
      },
      {
        "value": "Retry",
        "label": "persistent notification state, with limits",
        "source": "25 Nov 2026 source review: bounded outbox and at-least-once notification semantics"
      }
    ],
    "slug": "conversation-calendar",
    "visual": "pipeline",
    "reading": [
      {
        "label": "Calendar case study",
        "to": "/portfolio/13"
      },
      {
        "label": "Earlier messaging work",
        "to": "/workstation/messaging-assistant"
      },
      {
        "label": "Red-teaming my own chatbot",
        "to": "/blog/200"
      },
      {
        "label": "A reply is a capability, not a suggestion",
        "to": "/blog/206"
      }
    ]
  },
  {
    "id": "video-reliability",
    "kicker": "Reliability · Video output",
    "headline": "Checking usable output as well as running processes.",
    "lead": "I built and operated a video pipeline with progress-based recovery and integrity checks that decode the output. The 25 November 2026 audit found a completed successful decode check and advancing files. That evidence covers the sampled output, rather than continuous availability or every archive.",
    "benefits": [
      "Recovery decisions use work progressing, rather than process presence alone.",
      "Output validation checks whether the produced video can actually be decoded.",
      "Recorded checks keep observed results separate from failure cases that have not been exercised."
    ],
    "proof": [
      {
        "value": "Decode",
        "label": "completed check observed on 25 Nov 2026",
        "source": "25 Nov 2026 audit: completed integrity-check result and decoded output"
      },
      {
        "value": "Progress",
        "label": "advancing output in the audit sample",
        "source": "25 Nov 2026 audit: passive file-progress sampling; no new fault or playback test"
      }
    ],
    "slug": "video-reliability",
    "visual": "funnel",
    "reading": [
      {
        "label": "Output reliability case study",
        "to": "/portfolio/14"
      }
    ]
  },
  {
    "id": "workstation-climate",
    "kicker": "Automation · Devices and control",
    "headline": "Coordinating requests, readiness and owner approval.",
    "lead": "I implemented coordinated workstation requests with bounded retries and readiness checks, alongside owner-approved climate workflows and usage reporting. At the 25 November 2026 audit, readiness records did not independently prove an automatic sleep-to-work transition, and physical climate actuation following approval remained unverified.",
    "benefits": [
      "Shared coordination, timeouts and readiness polling make optional workstation dependencies explicit.",
      "Approval boundaries distinguish an authorised request from confirmed physical actuation.",
      "Usage reporting distinguishes operating-mode hours from energy consumption."
    ],
    "proof": [
      {
        "value": "Readiness",
        "label": "request path reviewed on 25 Nov 2026",
        "source": "25 Nov 2026 audit: recorded requests and readiness evidence; automatic sleep-to-work acceptance remained open"
      },
      {
        "value": "Approval",
        "label": "control boundary and reporting reviewed",
        "source": "25 Nov 2026 audit: approval bridge and report receipts; physical actuation remained unverified"
      }
    ],
    "slug": "workstation-on-demand",
    "visual": "rebind",
    "reading": [
      {
        "label": "Workstation case study",
        "to": "/portfolio/15"
      },
      {
        "label": "Climate integration",
        "to": "/workstation/climate-automation"
      },
      {
        "label": "Climate case study",
        "to": "/portfolio/16"
      }
    ]
  },
  {
    "id": "web-client-data",
    "kicker": "Client work · Web and data",
    "headline": "Practical websites, check-ups and migration planning.",
    "lead": "WebCheckup turns findings from a public website into a prioritised report. I also built and maintain a farm-business website and, in July 2026, delivered a database migration study and a usable workbook prototype for a small business.",
    "benefits": [
      "Website work includes mobile layouts, search metadata, form validation and consent-aware analytics.",
      "Check-up findings need reproducible evidence and a clear owner for the proposed fix.",
      "Migration planning uses copies, preserves originals and separates the delivered prototype from a full migration."
    ],
    "proof": [
      {
        "value": "37",
        "label": "sections in the July 2026 migration report",
        "source": "Client migration report delivered in July 2026; historical deliverable, not a completed migration"
      },
      {
        "value": "10",
        "label": "sheets in the July 2026 workbook prototype",
        "source": "Timesheet workbook prototype delivered in July 2026"
      }
    ],
    "slug": "webcheckup",
    "visual": "deliverables",
    "reading": [
      {
        "label": "Farm-business website",
        "to": "/workstation/farm-website"
      },
      {
        "label": "The migration study",
        "to": "/workstation/access-migration"
      }
    ]
  },
  {
    "id": "security-foresight",
    "kicker": "Security · Review and release evidence",
    "headline": "Reviewing my own tools and asking for proof before release.",
    "lead": "I found a DNS-rebinding path while reviewing my own browser tool in July 2026 and documented the trade-offs. Foresight turns relevant failure cases into mechanisms and recorded checks before a risky change. My public learning log and detection-engineering practice remain part of that work.",
    "benefits": [
      "Security reviews explain the reasoning and leave room for a reviewer to challenge it.",
      "Release checks name what could fail, what mechanism addresses it and which proof was actually run.",
      "Public notes and labs distinguish research, synthetic checks and observed operational outcomes."
    ],
    "proof": [
      {
        "value": "Review",
        "label": "browser-tool security study, July 2026",
        "source": "27 Jul 2026 browser adapter review: DNS-rebinding path and mitigation trade-offs"
      },
      {
        "value": "Evidence",
        "label": "failure cases, mechanisms and executed checks",
        "source": "Foresight release-gate method reviewed in the approved 25 Nov 2026 portfolio audit"
      }
    ],
    "slug": "foresight",
    "visual": "shapes",
    "reading": [
      {
        "label": "Browser-tool security review",
        "to": "/workstation/browser-research-adapter"
      }
    ]
  }
];

export const roles = [
  {
    "title": "Junior IT operations",
    "body": "Linux services, dependency handling, recovery checks and documentation that another operator can use."
  },
  {
    "title": "AI and automation integrations",
    "body": "Connecting existing tools and APIs, validating their outputs and keeping authority and failure handling explicit."
  },
  {
    "title": "Junior security analyst",
    "body": "Triage, detection practice, web and network risk, and write-ups that make the reasoning reviewable."
  }
];

export const heroStats = [
  { value: "Linux", label: "services and operations" },
  { value: "APIs", label: "practical automation integrations" },
  { value: jekyllSnapshot.posts.length.toLocaleString("en-GB"), label: "public learning-log posts in the synced snapshot" },
];
