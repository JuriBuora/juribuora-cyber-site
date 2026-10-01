// The script runs before the app, straight from public/, so it is tested as the
// text that ships rather than through an import of a module.
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import script from "../../public/first-paint.js?raw";

const html = document.documentElement;
const run = () => new Function(script)();

beforeEach(() => {
  vi.useFakeTimers();
  html.className = "dark";
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  localStorage.clear();
  html.className = "";
});

it("changes nothing for a new English-speaking visitor", () => {
  run();
  expect(html.className).toBe("dark");
});

it("applies a saved light theme before the app starts", () => {
  localStorage.setItem("theme", "light");
  run();
  expect(html.classList.contains("light")).toBe(true);
  expect(html.classList.contains("dark")).toBe(false);
  expect(html.classList.contains("lang-pending")).toBe(false);
});

it("holds the page back for a saved Italian choice, and for an Italian browser", () => {
  localStorage.setItem("plain-words-lang", "it");
  run();
  expect(html.classList.contains("lang-pending")).toBe(true);

  html.className = "dark";
  localStorage.clear();
  vi.spyOn(navigator, "language", "get").mockReturnValue("it-IT");
  run();
  expect(html.classList.contains("lang-pending")).toBe(true);
});

it("respects a saved English choice in an Italian browser", () => {
  localStorage.setItem("plain-words-lang", "en");
  vi.spyOn(navigator, "language", "get").mockReturnValue("it-IT");
  run();
  expect(html.classList.contains("lang-pending")).toBe(false);
});

it("shows the English text after a few seconds if the app never starts", () => {
  localStorage.setItem("plain-words-lang", "it");
  run();
  vi.advanceTimersByTime(3999);
  expect(html.classList.contains("lang-pending")).toBe(true);
  vi.advanceTimersByTime(1);
  expect(html.classList.contains("lang-pending")).toBe(false);
});

it("does not break when storage is blocked", () => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new Error("blocked");
  });
  expect(run).not.toThrow();
  expect(html.className).toBe("dark");
});
