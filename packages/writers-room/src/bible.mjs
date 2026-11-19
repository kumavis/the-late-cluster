// The parts of the design bible the pipeline reads at run time instead of copying, so the two
// cannot drift silently: the scorecard's rows and approval rule (10-process.md), the reviewer's
// checklist and the source kinds of R3 (09-real-people.md).
// Each reader fails loudly (returns { error }) when the text no longer has the expected shape.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

/** the bible folder: docs/bible/ in the repo, or a copy given with --bible */
export const bibleDirOf = (root) => join(root, 'docs', 'bible')

const readBible = (bibleDir, file) => {
  const f = join(bibleDir, file)
  return existsSync(f) ? readFileSync(f, 'utf8') : null
}

/** a `## Heading` section's body (up to the next heading of the same or higher level) */
export function section(md, heading, level = 2) {
  const lines = String(md).split('\n')
  const start = lines.findIndex((l) => new RegExp(`^#{${level}}\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(l))
  if (start < 0) return null
  const out = []
  let fence = false
  for (const l of lines.slice(start + 1)) {
    if (/^```/.test(l)) fence = !fence
    const m = !fence && /^(#+)\s/.exec(l)
    if (m && m[1].length <= level) break
    out.push(l)
  }
  return out.join('\n')
}

/**
 * The scorecard in 10-process.md: the Part A and Part B row ids, the Part B total needed and the
 * rows that may not score 0 ("Part B totals **15 or more**, with no 0 in B1, B2, B8 or B11").
 */
export function scorecardSpec(bibleDir) {
  const md = readBible(bibleDir, '10-process.md')
  const card = md && section(md, 'The scorecard')
  if (!card) return { error: 'docs/bible/10-process.md has no "## The scorecard" section' }
  const ids = (part) => [...(section(card, `Part ${part}`, 3) ?? '').matchAll(/^\|\s*([AB]\d+)\s*\|/gm)].map((m) => m[1])
  const a = ids('A')
  const b = ids('B')
  const total = /totals\s+\*{0,2}(\d+)\s+or more/i.exec(card)
  const zeros = /no 0 in\s+([^.]+)/i.exec(card)
  const hasStep0 = /###\s+Step 0/i.test(card)
  if (!a.length || !b.length || !total || !zeros) return { error: `the scorecard in docs/bible/10-process.md changed shape (found ${a.length} A rows, ${b.length} B rows, ${total ? 'a' : 'no'} total, ${zeros ? 'a' : 'no'} no-zero rule); update packages/writers-room/src/bible.mjs` }
  return { a, b, maxB: b.length * 2, approveAt: Number(total[1]), noZero: [...zeros[1].matchAll(/B\d+/g)].map((m) => m[0]), step0: hasStep0 }
}

/** the reviewer's checklist: the numbered list under "## What the reviewer checks" in 09-real-people.md */
export function reviewerChecklist(bibleDir) {
  const md = readBible(bibleDir, '09-real-people.md')
  const body = md && section(md, 'What the reviewer checks')
  if (!body) return { error: 'docs/bible/09-real-people.md has no "## What the reviewer checks" section' }
  const items = []
  for (const line of body.split('\n')) {
    const m = /^(\d+)\.\s+(.*)$/.exec(line)
    if (m) items.push(m[2])
    else if (items.length && /^\s{2,}\S/.test(line)) items[items.length - 1] += ' ' + line.trim()
  }
  return items.length ? { items } : { error: 'the reviewer checklist in docs/bible/09-real-people.md has no numbered items' }
}

/**
 * The source-comment kinds rule R3 names (`// verbatim: at://…`, `// catchphrase`, …), read from
 * 09-real-people.md, so the guest-lines gate can say when config/pipeline.json no longer matches.
 */
export function r3Tags(bibleDir) {
  const md = readBible(bibleDir, '09-real-people.md')
  const body = md && section(md, 'R3', 3)
  if (!body) return { error: '09-real-people.md has no "### R3" section' }
  const tags = [...new Set([...body.matchAll(/`\/\/\s*([a-z]+)\b/gi)].map((m) => m[1].toLowerCase()))]
  return tags.length ? { tags } : { error: 'R3 names no source-comment tags' }
}
