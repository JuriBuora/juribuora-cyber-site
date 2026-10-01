/**
 * Public-page scrub rules. The workstation page describes private projects, so
 * nothing that identifies a private contact, host, account or secret may ship.
 * Used by the unit test (source) and scripts/scrub-dist.mjs (built output).
 */
export const scrubRules: { name: string; pattern: RegExp }[] = [
  { name: "ipv4 address", pattern: /\b(?:\d{1,3}\.){3}\d{1,3}\b/ },
  { name: "localhost endpoint", pattern: /localhost:\d+|127\.0\.0\.1/i },
  { name: "tailscale / ts.net host", pattern: /\.ts\.net|tailscale/i },
  { name: "bearer or api key shape", pattern: /\b(?:sk|pk|ghp|gho|xox[bap])[-_][A-Za-z0-9_-]{16,}/ },
  { name: "private key block", pattern: /BEGIN [A-Z ]*PRIVATE KEY/ },
  { name: "home path", pattern: /\/Users\/[A-Za-z0-9._-]+/ },
  { name: "phone number", pattern: /\+\d{8,}/ },
  { name: "whatsapp jid", pattern: /@(?:s\.whatsapp\.net|lid)\b/ },
  { name: "telegram numeric id", pattern: /\b7374750226\b/ },
  { name: "personal vault or folder", pattern: /Juri Personale/ },
  { name: "private-life details", pattern: /girlfriend|(?<!font-)\bfamily\b|\bpartner\b|\bwife\b|\bhusband\b/i },
  { name: "personal contacts", pattern: /\b(?:Aurora|Antonella|Reika)\b/ },
  { name: "personal email other than public one", pattern: /[A-Za-z0-9._%+-]+@(?!gmail\.com)[A-Za-z0-9.-]+\.[a-z]{2,}/ },
];

export function scrub(text: string): string[] {
  return scrubRules.filter((r) => r.pattern.test(text)).map((r) => r.name);
}
