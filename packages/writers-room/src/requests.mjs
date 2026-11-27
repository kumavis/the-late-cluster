// Segments the owner asks for by name (the owner's decision of 27 November 2026: "Yes, same gates").
// The project manager writes production/owner-requests.json by hand; the tool checks its shape and
// makes each entry a planned draft (stage 7). From there it is drafted, fitted, scored, judged for
// repetition and its accounts' consent refreshed like every other draft. The one difference is at
// select: it is in the selection on the owner's word, and the rest is selected around it.
//
//   { "format": "late-cluster-requests/1",
//     "segments": [{ "slug": "<segment id>", "title": "<working title>",
//                    "asked": { "words": "<the owner's words, verbatim>", "date": "YYYY-MM-DD" },
//                    "cards": ["<kept card ids from research/longlist.json>"] (may be empty),
//                    "exceptions": ["<one plain sentence per exception the owner granted>"] }] }
//
// An exception can relax only what the craft bible asks (a limit, a window); nothing in the
// constitution is ever among them, so an exception that names it is refused.
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { readJsonFile } from './combine.mjs'
import { SEG_RE } from './repo.mjs'

export const REQUESTS_FILE = 'owner-requests.json'
export const REQUESTS_FORMAT = 'late-cluster-requests/1'
const AT = `production/${REQUESTS_FILE}`
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const CONSTITUTION_RE = /constitution|\barticle\s+[0-9ivx]+\b|real-people|09-real|\bR\d{1,2}\b/i

/** the record as written, or null when there is none; { record, error } when it does not parse */
export function readRequestsFile(prodDir) {
  const f = join(prodDir, REQUESTS_FILE)
  if (!existsSync(f)) return { record: null }
  try {
    return { record: readJsonFile(f) }
  } catch (e) {
    return { record: null, error: `${AT} does not parse: ${e.message.split('\n')[0]}` }
  }
}

/** what is wrong with one entry's shape (not its cards or slug collisions, which need the run) */
function entryProblems(s, k) {
  const at = `${AT} segments[${k}]${s && typeof s.slug === 'string' ? ` (${s.slug})` : ''}`
  if (!s || typeof s !== 'object' || Array.isArray(s)) return [`${at}: not an object`]
  const out = []
  if (typeof s.slug !== 'string' || !SEG_RE.test(s.slug)) out.push(`${at}: "slug" is a segment id: lower case words and dashes`)
  if (!String(s.title ?? '').trim()) out.push(`${at}: "title" is empty`)
  if (!s.asked || typeof s.asked !== 'object') out.push(`${at}: "asked" is { "words": "<the owner's words, verbatim>", "date": "YYYY-MM-DD" }`)
  else {
    if (typeof s.asked.words !== 'string' || !s.asked.words.trim()) out.push(`${at}: "asked.words" is the owner's words, verbatim`)
    if (typeof s.asked.date !== 'string' || !DATE_RE.test(s.asked.date) || Number.isNaN(Date.parse(s.asked.date))) out.push(`${at}: "asked.date" is the date the owner asked, YYYY-MM-DD`)
  }
  // a request may draw on no card (a segment about the show, with the house cast): without a card
  // and a source record the real-people gates refuse any real person's line or post anyway
  if (!Array.isArray(s.cards) || s.cards.some((c) => typeof c !== 'string' || !c.trim())) out.push(`${at}: "cards" lists the card ids it draws on (empty for none)`)
  else if (new Set(s.cards).size !== s.cards.length) out.push(`${at}: "cards" names a card twice`)
  if (!Array.isArray(s.exceptions)) out.push(`${at}: "exceptions" is a list of sentences (empty when the owner granted none)`)
  else
    s.exceptions.forEach((e, j) => {
      const t = typeof e === 'string' ? e.trim() : ''
      if (!t) out.push(`${at}: exceptions[${j}] is a plain sentence`)
      else if (/\n/.test(t) || !/[.!?]$/.test(t) || /[.!?]\s+[A-Z]/.test(t)) out.push(`${at}: exceptions[${j}] is one plain sentence, ending with a full stop; write each exception as its own entry`)
      else if (CONSTITUTION_RE.test(t)) out.push(`${at}: exceptions[${j}] names the constitution or a real-people rule; nothing in the constitution is ever an exception`)
    })
  return out
}

/** the record's shape: [] when it is absent or sound */
export function requestShapeProblems(record) {
  if (record == null) return []
  if (typeof record !== 'object' || Array.isArray(record)) return [`${AT}: not a JSON object`]
  const out = []
  if (record.format !== REQUESTS_FORMAT) out.push(`${AT}: "format" is "${REQUESTS_FORMAT}"`)
  if (!Array.isArray(record.segments)) return [...out, `${AT}: "segments" is a list`]
  record.segments.forEach((s, k) => out.push(...entryProblems(s, k)))
  const slugs = record.segments.map((s) => s?.slug).filter((x) => typeof x === 'string')
  for (const s of new Set(slugs.filter((x, k) => slugs.indexOf(x) !== k))) out.push(`${AT}: the slug ${s} is requested twice`)
  return out
}

/** every problem with the record file, its parse included */
export function requestFileProblems(prodDir) {
  const { record, error } = readRequestsFile(prodDir)
  return error ? [error] : requestShapeProblems(record)
}

/** the entries whose shape is sound, in the record's order */
export function requestedSegments(prodDir) {
  const { record } = readRequestsFile(prodDir)
  if (!record || !Array.isArray(record.segments)) return []
  const seen = new Set()
  return record.segments.filter((s, k) => {
    if (entryProblems(s, k).length || seen.has(s.slug)) return false
    seen.add(s.slug)
    return true
  })
}

/**
 * Whether a requested entry may be drafted in this run: its slug is not a planned draft's and every
 * card it names is in the longlist and kept by the constitution screen. → [problem]
 */
export function requestRunProblems(s, { planned, standing, longlist }) {
  const at = `${AT} ${s.slug}`
  const out = []
  if (standing.includes(s.slug)) out.push(`${at}: the slug is a standing segment's; choose another`)
  else if (planned.includes(s.slug)) out.push(`${at}: the slug collides with a planned draft (drafts/${s.slug}/); choose another`)
  if (!s.cards.length) return out
  if (!longlist) return [...out, `${at}: there is no research/longlist.json yet: its cards are screened at research (stage 2) before it can be drafted`]
  for (const c of s.cards) {
    const card = longlist.cards.find((x) => x.id === c)
    if (!card) out.push(`${at}: card ${c} is not in the run's longlist (research/longlist.json); a card is made and screened at research (stage 2) before it can be drafted`)
    else if (card.mergedInto) out.push(`${at}: card ${c} was merged into ${card.mergedInto} at the screen; name ${card.mergedInto}`)
    else if (card.kept !== true) out.push(`${at}: card ${c} did not pass the constitution screen (review/screen.json does not keep it)`)
  }
  return out
}

/** one brief line on what the owner asked for and what it changes, for those who score and review */
export function requestedNote(prodDir) {
  const r = requestedSegments(prodDir)
  if (!r.length) return null
  return `The owner asked for ${r.map((s) => `${s.slug}${s.exceptions.length ? ` (the owner's exceptions: ${s.exceptions.join(' ')})` : ''}`).join('; ')} (production/${REQUESTS_FILE}). It is in the selection on the owner's word, not on its score; score and judge it like any other draft. An exception relaxes only what it says, and never the constitution.`
}
