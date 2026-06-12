// ── Utility helpers ──────────────────────────────────────────────
// Ported from legacy/js/store.js

/**
 * Generate a random ID (short, unique enough for client-side use).
 * Pattern: 2-char random prefix + timestamp base-36.
 */
export function uid(): string {
  return (
    "id" +
    Math.random().toString(36).slice(2, 9) +
    Date.now().toString(36)
  );
}

/**
 * Get today's date as a YYYY-MM-DD string, with optional day offset.
 * @param off - number of days from today (default 0 = today)
 */
export function todayStr(off?: number): string {
  const offset = off ?? 0;
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

/**
 * Format a YYYY-MM-DD date string into a human-readable form.
 * Example: "2024-03-15" → "Fri, Mar 15"
 */
export function fmtDate(s: string): string {
  const d = new Date(s + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * Calculate completion percentage for a given set of tasks.
 * @param tasks - array of task objects with a `status` field
 * @returns 0–100, or null if no tasks
 */
export function completionPercent<
  T extends { status: string }
>(tasks: T[]): number | null {
  if (!tasks.length) return null;
  const done = tasks.filter((t) => t.status === "DONE").length;
  return Math.round((100 * done) / tasks.length);
}

/**
 * Calculate how many consecutive days (ending today) have 100% completion.
 * @param getTasksForDate - function that returns tasks for a given YYYY-MM-DD
 * @param childId - optional filter for a specific profile
 * @returns streak count (0 if today is not 100% complete)
 */
export function streak(
  getTasksForDate: (date: string) => { status: string }[]
): number {
  let s = 0;
  const today = todayStr(0);

  // Check today first
  if (completionPercent(getTasksForDate(today)) === 100) {
    s++;
  } else {
    return 0;
  }

  // Walk backwards up to 120 days
  for (let i = 1; i < 120; i++) {
    if (completionPercent(getTasksForDate(todayStr(-i))) === 100) {
      s++;
    } else {
      break;
    }
  }

  return s;
}

/** Get date string with offset (alias for todayStr for clarity). */
export function dateOffset(off: number): string {
  return todayStr(off);
}

/** Get 3-letter day label from a YYYY-MM-DD string. */
export function dayLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 3);
}

/**
 * Escape HTML special characters (XSS prevention for any
 * legacy-rendered content that hasn't moved to React yet).
 */
export function esc(s: unknown): string {
  return String(s ?? "").replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[c] || c;
  });
}
