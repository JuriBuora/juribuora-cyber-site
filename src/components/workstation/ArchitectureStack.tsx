import { ArrowDown } from "lucide-react";
import { architecture } from "@/data/workstation";

const ArchitectureStack = () => (
  <figure>
    <ol className="space-y-0" aria-label="Layers a request passes through, top to bottom">
      {architecture.map((layer, i) => {
        const guard = layer.tone === "guard";
        return (
          <li key={layer.name}>
            <div
              className={
                "border p-4 sm:flex sm:items-start sm:gap-6 " +
                (guard ? "border-primary/40 bg-primary/5" : "border-border bg-card")
              }
            >
              <div className="sm:w-44 sm:shrink-0">
                <p className={"font-mono text-xs uppercase tracking-[0.18em] " + (guard ? "text-primary" : "text-foreground")}>
                  {layer.name}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{layer.note}</p>
              </div>
              <ul className="mt-3 flex flex-wrap gap-2 sm:mt-0">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className={
                      "border px-2 py-1 font-mono text-xs " +
                      (guard ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground")
                    }
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {i < architecture.length - 1 && (
              <div className="flex justify-center py-1 text-muted-foreground" aria-hidden="true">
                <ArrowDown className="h-4 w-4" />
              </div>
            )}
          </li>
        );
      })}
    </ol>
    <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
      Simplified. The highlighted layer is the one I care most about: the controls that hold when a model, a prompt or I get something wrong.
    </figcaption>
  </figure>
);

export default ArchitectureStack;
