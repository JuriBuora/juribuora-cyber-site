const FENCE = /^\s{0,3}(`{3,}|~{3,})/;

/**
 * Removes HTML comments from post Markdown, except inside fenced code blocks.
 *
 * The source repo is rendered by Jekyll, where a comment such as the
 * `<!-- DD-MM-YYYY HH:MM -->` edit stamp is invisible. react-markdown does not
 * parse raw HTML, so without this the comment is printed as text.
 */
export function stripHtmlComments(markdown: string): string {
  const out: string[] = [];
  let fence: string | null = null;
  let inComment = false;

  for (const line of markdown.split("\n")) {
    if (!inComment) {
      const m = line.match(FENCE);
      if (m) {
        const marker = m[1];
        if (fence === null) fence = marker[0];
        else if (marker[0] === fence) fence = null;
        out.push(line);
        continue;
      }
    }
    if (fence !== null) {
      out.push(line);
      continue;
    }

    let rest = line;
    let kept = "";
    let touched = false;
    while (rest.length > 0) {
      if (inComment) {
        const end = rest.indexOf("-->");
        touched = true;
        if (end === -1) {
          rest = "";
        } else {
          rest = rest.slice(end + 3);
          inComment = false;
        }
      } else {
        const start = rest.indexOf("<!--");
        // Inside an inline code span (odd number of backticks so far) it is text, not a comment.
        const inCode = start !== -1 && ((kept + rest.slice(0, start)).split("`").length - 1) % 2 === 1;
        if (inCode) {
          kept += rest.slice(0, start + 4);
          rest = rest.slice(start + 4);
        } else if (start === -1) {
          kept += rest;
          rest = "";
        } else {
          kept += rest.slice(0, start);
          rest = rest.slice(start + 4);
          inComment = true;
          touched = true;
        }
      }
    }
    // A line that held only a comment disappears; it must not leave a blank line behind.
    if (touched && kept.trim() === "") continue;
    out.push(kept);
  }

  return out.join("\n").replace(/\n+$/, "\n");
}
