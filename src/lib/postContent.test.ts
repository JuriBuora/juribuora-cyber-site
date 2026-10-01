import { describe, expect, it } from "vitest";
import { stripHtmlComments } from "./postContent";

describe("stripHtmlComments", () => {
  it("removes a trailing edit stamp", () => {
    expect(stripHtmlComments("Read the process and service state.\n<!-- 26-09-2026 21:29 -->\n")).toBe(
      "Read the process and service state.\n",
    );
  });

  it("removes inline and multi-line comments but keeps the text around them", () => {
    expect(stripHtmlComments("a <!-- x --> b\n<!-- one\ntwo -->\nc")).toBe("a  b\nc");
  });

  it("leaves comments inside fenced code blocks alone", () => {
    const md = "```html\n<!-- keep me -->\n```\n~~~\n<!-- and me -->\n~~~\nend";
    expect(stripHtmlComments(md)).toBe(md);
  });

  it("does not treat a different fence character as the closing fence", () => {
    const md = "```\n~~~\n<!-- still code -->\n```\n<!-- gone -->\ntext";
    expect(stripHtmlComments(md)).toBe("```\n~~~\n<!-- still code -->\n```\ntext");
  });

  it("keeps a comment marker quoted in inline code", () => {
    const md = "Jekyll hides `<!-- stamp -->` but React printed it.";
    expect(stripHtmlComments(md)).toBe(md);
  });

  it("returns ordinary markdown unchanged", () => {
    const md = "# Title\n\nPlain text.\n\n- item\n";
    expect(stripHtmlComments(md)).toBe(md);
  });
});
