export function sanitizeDiff(diff: string) {
  return diff
    .replace(/api[_-]?key\s*=\s*.*/gi, "REDACTED")
    .replace(/secret\s*=\s*.*/gi, "REDACTED")
    .replace(/password\s*=\s*.*/gi, "REDACTED");
}