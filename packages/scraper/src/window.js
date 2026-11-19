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

/**
 * Parse --since / --until. A bare date (2026-11-13) is 00:00 UTC that day. A date-time
 * without an offset is UTC; with Z or ±hh:mm it is taken as given.
 */
export function parseInstant(text, name = '--since') {
  const t = String(text ?? '').trim()
  const date = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t)
  if (date) {
    const [y, m, d] = date.slice(1).map(Number)
    const ms = Date.UTC(y, m - 1, d)
    const back = new Date(ms)
    if (back.getUTCFullYear() !== y || back.getUTCMonth() !== m - 1 || back.getUTCDate() !== d) throw new Error(`${name}: no such date ${t}`)
    return ms
  }
  const dt = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})?$/.exec(t)
  if (!dt) throw new Error(`${name}: expected a date (2026-11-13) or an ISO date-time (2026-11-13T18:00Z), got ${JSON.stringify(text)}`)
  const ms = Date.parse(dt[3] ? t : t + 'Z')
  if (!Number.isFinite(ms)) throw new Error(`${name}: not a valid date-time ${JSON.stringify(text)}`)
  return ms
}

const compact = (ms) => new Date(ms).toISOString().slice(0, 16).replace(':', '') + 'Z' // 2026-11-13T0000Z

/** A window from --since to --until (default now), end exclusive, at most 60 days. */
export function rangeWindow(since, until, now = Date.now()) {
  const start = parseInstant(since, '--since')
  const end = until != null ? parseInstant(until, '--until') : Math.floor(now / 1000) * 1000
  if (end <= start) throw new Error('--until must be after --since')
  if (end > now + 60_000) throw new Error('--until is in the future')
  if (end - start > 60 * DAY) throw new Error('a --since window can be at most 60 days long')
  return { kind: 'range', label: `${compact(start)}_${compact(end)}`, start, end }
}

export function resolveWindow({ week, days, since, until, now = Date.now() } = {}) {
  const chosen = [week && '--week', days && '--days', since && '--since'].filter(Boolean)
  if (chosen.length > 1) throw new Error(`use only one of --week, --days and --since (got ${chosen.join(' and ')})`)
  if (until && !since) throw new Error('--until needs --since')
  if (week) return isoWeekWindow(week)
  if (days) return rollingWindow(days, now)
  if (since) return rangeWindow(since, until, now)
  return lastCompleteWeek(now)
}

/**
 * ISO week labels whose weeks overlap the baseline before a window, most recent first:
 * where earlier runs' posts.jsonl may hold baseline posts.
 */
export function baselineWeekLabels(window, baselineWeeks) {
  const out = []
  const from = window.start - baselineWeeks * WEEK
  for (let t = window.start - 1; t >= from; t -= WEEK) {
    const l = weekLabel(isoWeekOf(t))
    if (!out.includes(l)) out.push(l)
  }
  const last = weekLabel(isoWeekOf(from))
  if (!out.includes(last)) out.push(last)
  return out
}

export function inWindow(ms, w) {
  return ms >= w.start && ms < w.end
}

export const iso = (ms) => new Date(ms).toISOString()
export const utcDay = (ms) => new Date(ms).toISOString().slice(0, 10)
export { DAY, WEEK }
