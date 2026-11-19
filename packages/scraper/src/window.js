// Time windows. Everything is UTC. A window is { label, start, end } with start inclusive and
// end exclusive, both as epoch milliseconds.

const DAY = 86_400_000
const WEEK = 7 * DAY

/** Monday 00:00 UTC of ISO week 1 of `year`. */
function isoYearStart(year) {
  const jan4 = Date.UTC(year, 0, 4)
  const dow = (new Date(jan4).getUTCDay() + 6) % 7 // Monday = 0
  return jan4 - dow * DAY
}

/** Number of ISO weeks in `year` (52 or 53). */
export function weeksInIsoYear(year) {
  return isoWeekOf(Date.UTC(year, 11, 28)).week
}

/** The ISO week a timestamp falls in. */
export function isoWeekOf(ms) {
  const d = new Date(ms)
  const day = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
  const dow = (new Date(day).getUTCDay() + 6) % 7
  const thursday = day + (3 - dow) * DAY
  const year = new Date(thursday).getUTCFullYear()
  const week = 1 + Math.floor((thursday - isoYearStart(year)) / WEEK)
  return { year, week }
}

export function weekLabel({ year, week }) {
  return `${year}-W${String(week).padStart(2, '0')}`
}

/** Parse `2026-W47` (also `2026W47`, `2026-w7`). Throws on anything else. */
export function parseIsoWeek(text) {
  const m = /^(\d{4})-?[Ww](\d{1,2})$/.exec(String(text).trim())
  if (!m) throw new Error(`not an ISO week: ${JSON.stringify(text)} (expected e.g. 2026-W47)`)
  const year = Number(m[1])
  const week = Number(m[2])
  if (week < 1 || week > weeksInIsoYear(year)) throw new Error(`${year} has no week ${week}`)
  return { year, week }
}

export function isoWeekWindow(text) {
  const w = parseIsoWeek(text)
  const start = isoYearStart(w.year) + (w.week - 1) * WEEK
  return { kind: 'week', label: weekLabel(w), start, end: start + WEEK }
}

/** The most recent ISO week that has fully ended at `now`. */
export function lastCompleteWeek(now = Date.now()) {
  const cur = isoWeekOf(now)
  const curStart = isoYearStart(cur.year) + (cur.week - 1) * WEEK
  return isoWeekWindow(weekLabel(isoWeekOf(curStart - WEEK)))
}

/** A rolling window of `days` days ending at `now`. */
export function rollingWindow(days, now = Date.now()) {
  const n = Number(days)
  if (!Number.isFinite(n) || n <= 0 || n > 60) throw new Error(`--days must be between 1 and 60, got ${days}`)
  const end = Math.floor(now / 1000) * 1000
  const start = end - Math.round(n * DAY)
  return { kind: 'rolling', label: `last-${n}d-${new Date(end).toISOString().slice(0, 10)}`, start, end }
}

/** Labels of the `count` ISO weeks before a week window, most recent first. */
export function previousWeekLabels(window, count) {
  const out = []
  for (let i = 1; i <= count; i++) out.push(weekLabel(isoWeekOf(window.start - i * WEEK + DAY)))
  return out
}

export function resolveWindow({ week, days, now = Date.now() } = {}) {
  if (week && days) throw new Error('use either --week or --days, not both')
  if (week) return isoWeekWindow(week)
  if (days) return rollingWindow(days, now)
  return lastCompleteWeek(now)
}

export function inWindow(ms, w) {
  return ms >= w.start && ms < w.end
}

export const iso = (ms) => new Date(ms).toISOString()
export const utcDay = (ms) => new Date(ms).toISOString().slice(0, 10)
export { DAY, WEEK }
