import { asOf, weeklyCommits, weeklyCommitsTotal } from "@/data/workstation";

const BAR_W = 20;
const GAP = 8;
const HEIGHT = 140;
const WIDTH = weeklyCommits.length * (BAR_W + GAP) - GAP;

const ActivityChart = () => {
  const max = Math.max(...weeklyCommits.map((w) => w.commits));
  const peak = weeklyCommits.find((w) => w.commits === max);

  return (
    <figure className="border border-border bg-card p-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Commits per week</span>
        <span className="font-mono text-xs text-muted-foreground">
          {weeklyCommitsTotal.toLocaleString("en-GB")} total · W26–W40 2026 · as of {asOf}
        </span>
      </figcaption>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="mt-5 h-40 w-full"
        role="img"
        aria-label={`Bar chart of weekly commits from week 26 to week 40 of 2026. Peak week ${peak?.week} with ${max} commits. Total ${weeklyCommitsTotal}.`}
        preserveAspectRatio="none"
      >
        <line x1="0" x2={WIDTH} y1={HEIGHT - 0.5} y2={HEIGHT - 0.5} className="stroke-border" strokeWidth="1" />
        {weeklyCommits.map((w, i) => {
          const h = Math.max(2, (w.commits / max) * (HEIGHT - 6));
          return (
            <rect
              key={w.week}
              x={i * (BAR_W + GAP)}
              y={HEIGHT - h}
              width={BAR_W}
              height={h}
              rx="1.5"
              className={w.commits === max ? "fill-primary" : "fill-primary/55"}
            >
              <title>{`${w.week}: ${w.commits} commits`}</title>
            </rect>
          );
        })}
      </svg>

      <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Peak week: {max} commits ({peak?.week}). The quiet weeks are real; the chart is not smoothed.
      </p>
    </figure>
  );
};

export default ActivityChart;
