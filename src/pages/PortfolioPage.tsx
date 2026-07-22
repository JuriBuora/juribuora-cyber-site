import { ArrowRight, BadgeCheck, ClipboardCheck, FileCheck2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import BlogFooter from "@/components/BlogFooter";
import BlogHeader from "@/components/BlogHeader";
import ScrollToTop from "@/components/ScrollToTop";

const caseStudies = [
  {
    title: "Linux Identity and Access Lifecycle",
    evidence: "Google Cybersecurity Certificate lab",
    summary:
      "Created and removed a Linux user, assigned primary and supplementary groups, changed file ownership, and documented the cleanup path for leftover groups.",
    skills: ["Linux", "Access control", "Least privilege", "Documentation"],
    to: "/labs/6",
  },
  {
    title: "Detection Quality: Tuning a False Positive",
    evidence: "Hands-on verification lab",
    summary:
      "Reproduced a noisy check, read its literal condition, scoped it to the real signal, and retained a known-bad regression test so true positives still fire.",
    skills: ["Triage", "Detection engineering", "Bash", "Git"],
    to: "/labs/7",
  },
  {
    title: "Safer Privileged Automation",
    evidence: "Feature-gated autonomous-supervisor work",
    summary:
      "Designed task-scoped permissions, approvals, durable audit records, and restart-safe operator controls before allowing an agent to act on sensitive work.",
    skills: ["Automation security", "Auditability", "Approvals", "Recovery"],
    to: "/blog/167",
  },
  {
    title: "Verifiable Artifact Delivery",
    evidence: "Integrity and authorization case study",
    summary:
      "Built a narrow artifact-delivery model with expiring single-use-purpose links, SHA-256 verification, revocation, and duplicate-safe recovery.",
    skills: ["Integrity", "Authorization", "Hashing", "Secure delivery"],
    to: "/blog/168",
  },
];

const PortfolioPage = () => (
  <div className="min-h-screen bg-background">
    <ScrollToTop />
    <BlogHeader />

    <section className="border-b border-border bg-card">
      <div className="container mx-auto max-w-4xl px-4 py-14">
        <div className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/10 p-3">
          <ShieldCheck className="h-5 w-5 text-primary" />
        </div>
        <p className="mt-5 font-mono text-xs uppercase tracking-[0.24em] text-primary">Selected Evidence</p>
        <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Cybersecurity Portfolio</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A focused view of practical work: security reasoning, hands-on labs, implementation evidence, and the checks used to validate each result.
        </p>
      </div>
    </section>

    <main className="container mx-auto max-w-4xl px-4 py-12">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border border-border bg-card p-4">
          <BadgeCheck className="h-5 w-5 text-primary" />
          <p className="mt-3 text-sm font-semibold text-card-foreground">Evidence-led</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Each item starts with an outcome that can be explained and checked.</p>
        </div>
        <div className="border border-border bg-card p-4">
          <ClipboardCheck className="h-5 w-5 text-primary" />
          <p className="mt-3 text-sm font-semibold text-card-foreground">Security judgement</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">The focus is the decision, the trade-off, and the control behind the tool.</p>
        </div>
        <div className="border border-border bg-card p-4">
          <FileCheck2 className="h-5 w-5 text-primary" />
          <p className="mt-3 text-sm font-semibold text-card-foreground">Honest scope</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Feature-gated and test-only work is labelled as such, never presented as live production capability.</p>
        </div>
      </div>

      <section className="mt-10">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Case Studies</p>
        <div className="mt-5 grid gap-4">
          {caseStudies.map((study) => (
            <article key={study.title} className="border border-border bg-card p-5">
              <p className="font-mono text-xs text-primary">{study.evidence}</p>
              <h2 className="mt-2 text-lg font-semibold text-card-foreground">{study.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{study.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {study.skills.map((skill) => (
                  <span key={skill} className="border border-primary/20 bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
                    {skill}
                  </span>
                ))}
              </div>
              <Link to={study.to} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                Read the evidence
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>

    <BlogFooter />
  </div>
);

export default PortfolioPage;
