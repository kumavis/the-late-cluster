// The parts of the design bible the pipeline reads at run time instead of copying, so the two
// cannot drift silently: the pitch template's sections and the scorecard's rows and approval rule
// (10-process.md), the reviewer's checklist (09-real-people.md) and the rotation log (lore.md).
// Each reader fails loudly (returns { error }) when the text no longer has the expected shape.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const readBible = (root, file) => {
  const f = join(root, 'docs', 'bible', file)
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

/** the `## ` headings of the pitch template in 10-process.md, stage 2 */
export function pitchTemplateSections(root) {
  const md = readBible(root, '10-process.md')
  const stage = md && section(md, 'Stage 2')
  const fence = stage && /```markdown\n([\s\S]*?)```/.exec(stage)?.[1]
  if (!fence) return { error: 'docs/bible/10-process.md has no ```markdown pitch template under "## Stage 2"' }
  const names = [...fence.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => m[1])
  return names.length ? { sections: names } : { error: 'the pitch template in docs/bible/10-process.md has no ## sections' }
}

/**
 * The scorecard in 10-process.md: the Part A and Part B row ids, the Part B total needed and the
 * rows that may not score 0 ("Part B totals **15 or more**, with no 0 in B1, B2, B8 or B11").
 */
export function scorecardSpec(root) {
  const md = readBible(root, '10-process.md')
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
export function reviewerChecklist(root) {
  const md = readBible(root, '09-real-people.md')
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
 * The rotation log in lore.md: one row per episode. Returns [{ ep, formats: [], genre, theme,
 * guests: [], runner, shapes, descriptor, sincere, topChicken }] keyed by the header names.
 */
export function rotationLog(text) {
  const body = section(String(text ?? ''), 'Rotation log')
  if (!body) return { error: 'the lore file has no "## Rotation log" table', rows: [] }
  const rows = body.split('\n').filter((l) => /^\|/.test(l)).map((l) => l.split('|').slice(1, -1).map((c) => c.trim()))
  if (rows.length < 2) return { rows: [], header: rows[0] ?? [] }
  const header = rows[0].map((h) => h.toLowerCase().replace(/["“”]/g, ''))
  const col = (name) => header.findIndex((h) => h.includes(name))
  const out = []
  for (const r of rows.slice(2)) {
    const get = (name) => (col(name) >= 0 ? r[col(name)] ?? '' : '')
    out.push({
      ep: get('ep'),
      formats: get('formats').split(',').map((s) => s.replace(/\(.*?\)/g, '').trim()).filter(Boolean),
      genre: get('song genre'),
      theme: get('song theme'),
      guests: get('guests').split(/,(?![^()]*\))/).map((s) => s.replace(/\(.*?\)/g, '').trim()).filter(Boolean),
      runner: get('runner'),
      shapes: get('shapes'),
      descriptor: get('descriptor').replace(/^["“]|["”]$/g, ''),
      sincere: get('sincere'),
      topChicken: get('top chicken'),
    })
  }
  return { rows: out, header }
}

/** a plan-shaped summary of a rotation log row, for episodes that have no plan.json */
export function planFromLogRow(row) {
  return {
    fromLog: true,
    segments: row.formats.map((f, k) => ({ id: `#${k + 1}`, format: f, ...(/^song$/i.test(f) ? { genre: row.genre, theme: row.theme } : {}) })),
    guests: row.guests.map((g) => ({ name: g })),
    runner: row.runner,
    descriptor: row.descriptor,
    sincere: { kind: row.sincere },
  }
}
