// The gates of the evolving-DNA design: the pitch's retro, DNA notes, experiment and inheritance
// decision; inheritance kept to what the plan names; episode code importing only what the build
// covers; the constitution untouched; and every DNA amendment declared.
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, normalize, relative, resolve, sep } from 'node:path'
import { pathToFileURL } from 'node:url'
import { findPost, postRefs } from '../digest.mjs'
import { bibleChanges, parseAmendments } from '../dna.mjs'
import { inheritedFiles, inheritProblems } from '../inherit.mjs'
import { lex } from '../scan.mjs'
import { gate, list, read, rundown } from './common.mjs'

const words = (s) => new Set(String(s ?? '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2))
export function similarity(a, b) {
  const A = words(a)
  const B = words(b)
  if (!A.size || !B.size) return 0
  let n = 0
  for (const w of A) if (B.has(w)) n++
  return n / (A.size + B.size - n)
}
const norm = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const strings = (x) => Array.isArray(x) && x.every((s) => typeof s === 'string' && s.trim())

/** the previous published episode, if any */
const previous = (ctx) => [...ctx.history].sort((a, b) => b.number - a.number)[0] ?? null

/**
 * plan.json "retro": required when a published episode came before. It names that episode, says
 * what worked and what didn't, and cites the reactions to it from this week's digest ("About the
 * show"); an empty list needs a stated reason in "reactionsNote".
 */
export async function pitchRetro(ctx) {
  const g = gate('pitch.retro')
  const p = ctx.plan
  if (!p) {
    g.skip('no plan.json')
    return g.done()
  }
  const prev = previous(ctx)
  const r = p.retro
  if (!prev) {
    if (r !== null && r !== undefined) g.warn('there is no earlier published episode, so "retro" should be null')
    else g.skip('no earlier published episode')
    return g.done()
  }
  if (!r || typeof r !== 'object') {
    g.fail(`plan.json: "retro" is required: look back at ${prev.id} before planning this one (what worked, what didn't, the reactions)`)
    return g.done()
  }
  if (r.episode !== prev.id) g.fail(`plan.json retro.episode is ${JSON.stringify(r.episode)}; the previous published episode is ${prev.id}`)
  if (!Array.isArray(r.worked) || !Array.isArray(r.didnt) || !strings([...(r.worked ?? []), ...(r.didnt ?? [])])) g.fail('plan.json retro: "worked" and "didnt" must be lists of sentences')
  else if (!r.worked.length && !r.didnt.length) g.fail('plan.json retro: say at least one thing that worked or didn\'t')
  if (!Array.isArray(r.reactions)) g.fail('plan.json retro: "reactions" must be a list of post URIs (or empty, with "reactionsNote")')
  else {
    for (const u of r.reactions) {
      if (!postRefs(String(u)).length) g.fail(`plan.json retro.reactions: ${JSON.stringify(u)} is not a post URI`)
      else if (!findPost(ctx.digest, u)) g.fail(`plan.json retro.reactions: ${u} is not in this week's digest; reactions come from its "About the show" section`)
    }
    const about = ctx.digest.sections?.aboutShow?.posts ?? []
    if (!r.reactions.length) {
      if (!String(r.reactionsNote ?? '').trim()) g.fail(`plan.json retro: no reactions cited; add "reactionsNote" saying why (for example: the digest's "About the show" section is empty this week)`)
      if (about.length) g.warn(`the digest has ${about.length} posts about the show, and the retro cites none of them`)
    }
  }
  return g.done()
}

/**
 * plan.json "dna": what this episode keeps, what it changes and why, and one experiment with how
 * we will know it worked. The experiment must not restate an earlier episode's (fail on the same
 * words; warn on a near match).
 */
export async function pitchDna(ctx) {
  const g = gate('pitch.dna')
  const p = ctx.plan
  if (!p) {
    g.skip('no plan.json')
    return g.done()
  }
  const d = p.dna
  if (!d || typeof d !== 'object') {
    g.fail('plan.json: "dna" is required: { "keep": [...], "change": [{ "what", "why" }], "experiment": { "what", "why", "success" } }')
    return g.done()
  }
  if (!Array.isArray(d.keep) || !(d.keep.length === 0 || strings(d.keep))) g.fail('plan.json dna.keep must be a list of sentences (what this episode deliberately keeps)')
  if (!Array.isArray(d.change) || !d.change.every((c) => String(c?.what ?? '').trim() && String(c?.why ?? '').trim())) g.fail('plan.json dna.change must be a list of { "what", "why" }, both filled in')
  const e = d.experiment
  for (const k of ['what', 'why', 'success']) if (!String(e?.[k] ?? '').trim()) g.fail(`plan.json dna.experiment.${k} is empty: one deliberate experiment, why, and how we will know it worked`)
  if (String(e?.what ?? '').trim()) {
    for (const h of ctx.history) {
      const past = h.plan?.dna?.experiment?.what
      if (!past) continue
      if (norm(past) === norm(e.what)) g.fail(`plan.json dna.experiment restates ${h.id}'s experiment ("${past}"); try something new`)
      else if (similarity(past, e.what) >= 0.5) g.warn(`the experiment is close to ${h.id}'s ("${past}"); make sure it is a new one`)
    }
  }
  return g.done()
}

/** plan.json "inherit": each entry names an existing file in an earlier episode, with a reason */
export async function pitchInherit(ctx) {
  const g = gate('pitch.inherit')
  const p = ctx.plan
  if (!p) {
    g.skip('no plan.json')
    return g.done()
  }
  if (p.inherit === undefined) g.fail('plan.json: "inherit" is required; [] (carry nothing forward) is the default and a good one')
  else if (!Array.isArray(p.inherit)) g.fail('plan.json: "inherit" must be a list')
  else {
    const seen = new Set()
    p.inherit.forEach((e, k) => {
      for (const why of inheritProblems(ctx.root, ctx.id, e)) g.fail(`plan.json inherit[${k}]: ${why}`)
      const key = `${e?.from}/${e?.path}`
      if (seen.has(key)) g.fail(`plan.json inherit[${k}]: ${key} is listed twice`)
      seen.add(key)
    })
    if (p.inherit.length) g.warn(`inherits ${list(p.inherit.map((e) => `${e.from}/${e.path}`))}`)
  }
  return g.done()
}

/** production/inherited/ holds exactly what the plan names (change it with --from pitch) */
export async function inheritConsistent(ctx, name = 'inherit.consistent') {
  const g = gate(name)
  const want = (ctx.plan?.inherit ?? []).map((e) => `${e.from}/${e.path}`).sort()
  const have = inheritedFiles(ctx.paths.dir).sort()
  if (want.join('\n') !== have.join('\n')) g.fail(`production/inherited/ holds [${list(have) || 'nothing'}] but plan.json inherits [${list(want) || 'nothing'}]; inheritance is decided at the pitch: change plan.json "inherit" and re-run with --from pitch`)
  return g.done()
}

/** import specifiers in a JS source (static, re-exports and dynamic with a literal) */
export function importsOf(src) {
  const { masked, tokens } = lex(src)
  const out = []
  for (const t of tokens) {
    if (t.kind !== 'string') continue
    const before = masked.slice(Math.max(0, t.start - 200), t.start)
    if (/(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)$/.test(before)) out.push(t.value)
  }
  return out
}

/** the episode files sourceHash covers: from scripts/lib/hash.mjs when present, else the same rule */
async function coveredFiles(ctx) {
  const lib = join(ctx.root, 'scripts', 'lib', 'hash.mjs')
  if (existsSync(lib)) {
    try {
      const { sourceFiles } = await import(pathToFileURL(lib).href)
      return new Set(sourceFiles(ctx.paths.dir, rundown(ctx)))
    } catch {}
  }
  const out = new Set(['episode.json', 'cast.js', 'looks.js'].filter((f) => existsSync(join(ctx.paths.dir, f))))
  const { walk } = await import('../repo.mjs')
  for (const seg of rundown(ctx)) for (const f of walk(ctx.paths.segDir(seg))) if (!f.split('/').some((p) => p.startsWith('.'))) out.add(`segments/${seg}/${f}`)
  return out
}

/**
 * Episode code imports only the studio (`@late-cluster/show/...`), packages, and files of its own
 * episode that the build's sourceHash covers, through `@late-cluster/episode/...` or a relative
 * path. Never production/ (inherited reference is read, not imported), another episode, or a
 * studio file by relative path. Otherwise a build could depend on a file verify never checks.
 */
export async function episodeImports(ctx, name = 'imports') {
  const g = gate(name)
  const covered = await coveredFiles(ctx)
  const files = [...covered].filter((f) => /\.(m?js)$/.test(f))
  for (const f of files) {
    const src = read(join(ctx.paths.dir, f))
    if (src === null) continue
    for (const spec of importsOf(src)) {
      let target = null
      if (spec.startsWith('@late-cluster/show/')) continue
      if (spec.startsWith('@late-cluster/episode/')) target = spec.slice('@late-cluster/episode/'.length)
      else if (spec.startsWith('.')) {
        const abs = resolve(dirname(join(ctx.paths.dir, f)), spec)
        const r = relative(ctx.paths.dir, abs)
        if (r.startsWith('..') || r.startsWith(sep)) {
          g.fail(`${f}: imports ${spec}, outside the episode; import studio code as @late-cluster/show/<path>, and copy anything else into the episode`)
          continue
        }
        target = r.split(sep).join('/')
      } else if (spec.startsWith('/') || /^[a-z]+:/i.test(spec)) {
        g.fail(`${f}: imports ${spec} by absolute path or URL`)
        continue
      } else if (spec.startsWith('@late-cluster/')) {
        g.fail(`${f}: imports ${spec}; episodes import only @late-cluster/show/... and their own @late-cluster/episode/...`)
        continue
      } else continue // a package the studio depends on
      target = normalize(target).split(sep).join('/')
      if (target.startsWith('production/')) g.fail(`${f}: imports ${spec}, from production/ (working papers and inherited reference are never part of a build); copy what you need into the segment's folder`)
      else if (!covered.has(target)) g.fail(`${f}: imports ${spec}, which the build's sourceHash does not cover (episode.json, cast.js, looks.js and the rundown segments' folders), so verify could not see it change; put the helper in the segment's folder`)
    }
  }
  return g.done()
}

/** the constitution is byte-identical to the scaffold-time snapshot (independent of permissions) */
export async function constitutionUnchanged(ctx, name = 'constitution') {
  const g = gate(name)
  if (!ctx.bibleSnapshot) {
    g.skip('no snapshot of the bible in state.json')
    return g.done()
  }
  const { constitutionChanged } = bibleChanges(ctx.bibleSnapshot, ctx.bibleDir, ctx.config.constitution)
  for (const f of constitutionChanged) g.fail(`${f} is part of the constitution and has changed since this run started; only the owner changes it. Restore it exactly, and propose the change in the pull request's risks instead`)
  return g.done()
}

/**
 * production/dna-amendments.md (format: bible 10, stage 6): the experiment with the writer's verdict
 * before air, and every DNA file this run changed with a one-line summary, or "none" with the
 * reason. The lore file's routine entries (episode log, rotation and experiment log rows) need not
 * be listed; everything else in the DNA must be.
 */
export async function selfCheckDna(ctx) {
  const g = gate('self-check.dna')
  const md = read(join(ctx.paths.production, 'dna-amendments.md'))
  if (md === null) {
    g.fail('production/dna-amendments.md is missing (format: docs/bible/10-process.md, stage 6)')
    return g.done()
  }
  const a = parseAmendments(md)
  if (!a.hasExperiment) g.fail('dna-amendments.md: no "## Experiment" section')
  else if (!a.verdict) g.fail('dna-amendments.md: the Experiment section must give the verdict before air: worked, didn\'t, or can\'t tell yet, and why')
  else if (a.experimentText.replace(/[^a-z0-9]/gi, '').length < 30) g.fail('dna-amendments.md: say what the experiment was, its success measure, and why you judge it so')
  if (!a.hasEdits) g.fail('dna-amendments.md: no "## Edits to the DNA in this pull request" section')
  if (!ctx.bibleSnapshot) {
    g.skip('no snapshot of the bible in state.json')
    return g.done()
  }
  const lore = relative(ctx.bibleDir, ctx.loreFile).split(sep).join('/')
  const changed = bibleChanges(ctx.bibleSnapshot, ctx.bibleDir, ctx.config.constitution).dna
  const amended = changed.filter((c) => c.file !== lore)
  const listed = new Set(a.files.map((f) => f.file))
  for (const c of amended) if (!listed.has(c.file)) g.fail(`dna-amendments.md does not list ${c.file}, which this run ${c.change}; list every edit to the DNA with a one-line summary`)
  for (const f of a.files) if (f.file !== lore && !amended.some((c) => c.file === f.file)) g.fail(`dna-amendments.md lists ${f.file}, which has not changed in this run`)
  for (const f of a.files) if (f.summary.replace(/[^a-z0-9]/gi, '').length < 8) g.fail(`dna-amendments.md: give ${f.file} a one-line summary of the change`)
  if (a.hasEdits && !a.files.length && (a.none === null || !a.none.replace(/[^a-z0-9]/gi, ''))) g.fail('dna-amendments.md: no DNA edits listed, so say "none" and the reason (for example: the experiment is judged after air)')
  if (amended.length && a.verdict && a.verdict !== 'worked') g.warn(`DNA edited although the experiment's verdict is "${a.verdict}"; the reviewer should check each edit stands on its own`)
  if (amended.length) g.warn(`DNA edited: ${amended.map((c) => `${c.file} (${c.change})`).join(', ')}`)
  return g.done()
}
