// The bible has two layers. The constitution (config: `constitution`, today 00-constitution.md and
// 09-real-people.md) only the owner changes. Everything else under docs/bible/ is the show's DNA,
// which an episode's pull request may amend. The pipeline records a snapshot of both layers when an
// episode is scaffolded (content hashes in state.json, no git), and the self-check gates compare the
// bible with it: the constitution must be byte-identical, and every DNA change must be declared in
// production/dna-amendments.md.
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { isFile, walk } from './repo.mjs'

const sha = (buf) => createHash('sha256').update(buf).digest('hex')

/** { constitution: { file: sha | null }, dna: { file: sha } } for a bible folder */
export function bibleSnapshot(bibleDir, constitution) {
  const c = {}
  for (const f of constitution) c[f] = isFile(join(bibleDir, f)) ? sha(readFileSync(join(bibleDir, f))) : null
  const dna = {}
  for (const f of walk(bibleDir)) if (!constitution.includes(f) && !f.split('/').some((p) => p.startsWith('.'))) dna[f] = sha(readFileSync(join(bibleDir, f)))
  return { constitution: c, dna }
}

/** what changed since a snapshot: constitution files, and DNA files added, modified or removed */
export function bibleChanges(snapshot, bibleDir, constitution) {
  const now = bibleSnapshot(bibleDir, constitution)
  const constitutionChanged = constitution.filter((f) => (snapshot.constitution?.[f] ?? null) !== now.constitution[f])
  const dna = []
  for (const [f, h] of Object.entries(now.dna)) {
    if (!(f in (snapshot.dna ?? {}))) dna.push({ file: f, change: 'added' })
    else if (snapshot.dna[f] !== h) dna.push({ file: f, change: 'modified' })
  }
  for (const f of Object.keys(snapshot.dna ?? {})) if (!(f in now.dna)) dna.push({ file: f, change: 'removed' })
  return { constitutionChanged, dna: dna.sort((a, b) => a.file.localeCompare(b.file)) }
}

/**
 * production/dna-amendments.md, in the shape bible 10 (stage 6, the self-check) gives it:
 *
 *   # DNA amendments: episode NNN
 *   ## Experiment
 *   <what it was; the success measure; the writer's judgement before air: worked / didn't / can't tell yet, and why>
 *   ## Edits to the DNA in this pull request
 *   - `03-episode-shape.md` (Evolving the show): <the change, one line> — because <evidence>
 *   (or)  none: <the reason>
 *
 * Returns { hasExperiment, verdict, experimentText, hasEdits, none, files: [{ file, summary }] }.
 */
export function parseAmendments(md) {
  const text = String(md ?? '')
  const sections = new Map()
  let cur = null
  for (const line of text.split('\n')) {
    const m = /^##\s+(.+?)\s*$/.exec(line)
    if (m) sections.set((cur = m[1].toLowerCase()), [])
    else if (cur) sections.get(cur).push(line)
  }
  const find = (re) => [...sections].find(([k]) => re.test(k))?.[1].join('\n') ?? null
  const exp = find(/^experiment/)
  const v = (exp && /(?:before air|verdict)[^:\n]*:\s*\**\s*(worked|did not work|didn['’]t work|didn['’]t|can['’]t tell(?: yet)?|cannot tell(?: yet)?|unclear)\b/i.exec(exp)) || (exp && /\b(worked|did not work|didn['’]t work|didn['’]t|can['’]t tell(?: yet)?|cannot tell(?: yet)?|unclear)\b/i.exec(exp))
  const verdict = v ? (/^work/i.test(v[1]) ? 'worked' : /^(did|didn)/i.test(v[1]) ? "didn't" : "can't tell") : null
  const edits = find(/^(edits to the dna|amendments)/)
  const files = []
  for (const line of (edits ?? '').split('\n')) {
    const m = /^\s*[-*]\s+(.*)$/.exec(line)
    const f = m && /`?((?:[\w.-]+\/)*[\w.-]+\.md)`?/.exec(m[1])
    if (f) files.push({ file: f[1].replace(/^(\.\/)?(docs\/bible\/)?/, ''), summary: m[1].slice(f.index + f[0].length).replace(/^[^:—–-]*[:—–-]\s*/, '').trim() })
  }
  const none = edits !== null && !files.length ? /^\s*(?:[-*]\s*)?["“]?none\b["”]?\s*[,:.—–-]?\s*(.*)$/im.exec(edits) : null
  return { hasExperiment: exp !== null, verdict, experimentText: (exp ?? '').trim(), hasEdits: edits !== null, none: none ? none[1].trim() : null, files }
}
