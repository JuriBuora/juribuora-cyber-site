import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";
import StatusBadge from "./StatusBadge";

const ProjectCard = ({ project }: { project: Project }) => (
  <Link
    to={`/workstation/${project.slug}`}
    className="group flex h-full flex-col border border-border bg-card p-4 transition-colors hover:border-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
  >
    <div className="flex items-center justify-between gap-2">
      <StatusBadge status={project.status} />
      <span className="font-mono text-[11px] text-muted-foreground">{project.period}</span>
    </div>
    <h3 className="mt-3 text-base font-semibold text-card-foreground">{project.name}</h3>
    <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">{project.tagline}</p>
    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
      Read the story
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
    </span>
  </Link>
);

export default ProjectCard;
