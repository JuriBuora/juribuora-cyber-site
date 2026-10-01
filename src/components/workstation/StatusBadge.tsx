import { statusLabel, type ProjectStatus } from "@/data/projects";

const tone: Record<ProjectStatus, string> = {
  active: "border-primary/30 bg-primary/10 text-primary",
  evaluating: "border-border bg-secondary text-secondary-foreground",
  paused: "border-border bg-secondary text-secondary-foreground",
  retired: "border-border bg-muted text-muted-foreground",
  rejected: "border-destructive/40 bg-destructive/10 text-destructive",
};

const StatusBadge = ({ status }: { status: ProjectStatus }) => (
  <span className={`inline-block border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ${tone[status]}`}>
    {statusLabel[status]}
  </span>
);

export default StatusBadge;
