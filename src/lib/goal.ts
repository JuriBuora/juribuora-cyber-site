/** Day-count targets for the learning log, in order. Add the next one when a target is reached. */
export const GOALS = [240, 365];

export type GoalProgress = {
  /** The most recent target already passed, if any. */
  reached: number | null;
  /** The target currently being worked toward (the last one, once all are passed). */
  target: number;
  /** Whole percent toward `target`, never above 100. */
  percent: number;
};

export function goalProgress(daysLogged: number, goals: number[] = GOALS): GoalProgress {
  const passed = goals.filter((g) => daysLogged >= g);
  const target = goals.find((g) => daysLogged < g) ?? goals[goals.length - 1];
  return {
    reached: passed.length ? passed[passed.length - 1] : null,
    target,
    percent: Math.min(100, Math.round((daysLogged / target) * 100)),
  };
}
