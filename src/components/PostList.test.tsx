import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { jekyllSnapshot } from "@/data/jekyllSnapshot.generated";
import { POSTS_PER_STEP } from "@/lib/postWindow";
import PostList from "./PostList";

const total = jekyllSnapshot.posts.length + jekyllSnapshot.labs.length;
const cards = (container: HTMLElement) => container.querySelectorAll('a[href^="/blog/"], a[href^="/lab/"]').length;
const list = (lockedTab?: "blog" | "lab") =>
  render(
    <MemoryRouter>
      <PostList lockedTab={lockedTab} />
    </MemoryRouter>,
  );

afterEach(() => {
  sessionStorage.clear();
  vi.unstubAllGlobals();
});

describe("home post list", () => {
  it("starts with one step of posts and says how to reach the rest", () => {
    expect(total).toBeGreaterThan(POSTS_PER_STEP * 2);
    const { container } = list();
    expect(cards(container)).toBe(POSTS_PER_STEP);
    expect(screen.getByText(new RegExp(`${POSTS_PER_STEP} of ${total} shown`))).toBeTruthy();
    expect(container.querySelector('a[href="/blog"]')).not.toBeNull();
    expect(container.querySelector('a[href="/labs"]')).not.toBeNull();
  });

  it("adds a step from the button when nothing loads automatically", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { container } = list();
    fireEvent.click(screen.getByRole("button", { name: `Show ${POSTS_PER_STEP} more` }));
    expect(cards(container)).toBe(POSTS_PER_STEP * 2);
  });

  it("adds steps by itself as the end of the list comes near, until every post is shown", () => {
    const watchers: Array<(entries: Array<{ isIntersecting: boolean }>) => void> = [];
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: (entries: Array<{ isIntersecting: boolean }>) => void) { watchers.push(callback); }
      observe() {} unobserve() {} disconnect() {}
    });
    const { container } = list();
    for (let step = 0; step < 20 && cards(container) < total; step += 1) {
      act(() => watchers[watchers.length - 1]([{ isIntersecting: true }]));
    }
    expect(cards(container)).toBe(total);
    expect(screen.queryByRole("button", { name: /^Show \d+ more$/ })).toBeNull();
  });

  it("goes back to the first step when the reader searches", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { container } = list();
    fireEvent.click(screen.getByRole("button", { name: `Show ${POSTS_PER_STEP} more` }));
    fireEvent.change(screen.getByPlaceholderText("Search posts..."), { target: { value: "a" } });
    expect(cards(container)).toBeLessThanOrEqual(POSTS_PER_STEP);
  });

  it("keeps the whole list on an archive page", () => {
    const { container } = list("blog");
    expect(cards(container)).toBe(jekyllSnapshot.posts.length);
    expect(screen.queryByRole("button", { name: /^Show \d+ more$/ })).toBeNull();
  });
});
