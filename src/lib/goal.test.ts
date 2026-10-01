import { describe, expect, it } from "vitest";
import { goalProgress } from "./goal";

describe("goalProgress", () => {
  const goals = [240, 365];

  it("works toward the first target before it is reached", () => {
    expect(goalProgress(120, goals)).toEqual({ reached: null, target: 240, percent: 50 });
  });

  it("moves to the next target once one is passed", () => {
    expect(goalProgress(243, goals)).toEqual({ reached: 240, target: 365, percent: 67 });
    expect(goalProgress(240, goals)).toEqual({ reached: 240, target: 365, percent: 66 });
  });

  it("never reports more than 100% after the last target", () => {
    expect(goalProgress(400, goals)).toEqual({ reached: 365, target: 365, percent: 100 });
  });
});
