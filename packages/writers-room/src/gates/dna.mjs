// The bible's two layers and the build's integrity: inheritance kept to what the plan names; episode
// code importing only what the build covers (and a segment only from its own folder); the
// constitution untouched; every edit to the craft bible (the DNA) declared.
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, normalize, relative, resolve, sep } from 'node:path'
import { pathToFileURL } from 'node:url'
import { bibleChanges, parseAmendments } from '../dna.mjs'
import { experimentProblems } from '../experiment.mjs'
import { inheritedFiles } from '../inherit.mjs'
import { lex } from '../scan.mjs'
import { gate, list, read, rundown } from './common.mjs'

/** production/inherited/ holds exactly what the plan names (change it with --from select) */
export async function inheritConsistent(ctx, name = 'inherit.consistent') {
  const g = gate(name)
  const want = (ctx.plan?.inherit ?? []).map((e) => `${e.from}/${e.path}`).sort()
  const have = inheritedFiles(ctx.paths.dir).sort()
  if (want.join('\n') !== have.join('\n')) g.fail(`production/inherited/ holds [${list(have) || 'nothing'}] but plan.json inherits [${list(want) || 'nothing'}]; inheritance is decided at the pitch: change plan.json "inherit" and re-run with --from select`)
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
      else {
        // a segment imports only from its own folder (packages/show/README: "Don't import from another segment"; trial finding 38)
        const own = /^segments\/([^/]+)\//.exec(f)?.[1]
        const other = /^segments\/([^/]+)\//.exec(target)?.[1]
        if (own && other && own !== other) g.fail(`${f}: imports ${spec}, from another segment's folder (${other}); a segment imports only from its own folder: copy the helper into segments/${own}/`)
      }
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
 * reason. Optional when the run did not touch the DNA.
 */
export async function selfCheckDna(ctx) {
  const g = gate('review.dna')
  // the episode's experiment, proposed by a reviewer at the rank stage and judged in scorecard row B12
  const exp = read(join(ctx.paths.production, 'experiment.md'))
  for (const p of experimentProblems(exp)) g.fail(p)
  const md = read(join(ctx.paths.production, 'dna-amendments.md'))
  const changedNow = ctx.bibleSnapshot ? bibleChanges(ctx.bibleSnapshot, ctx.bibleDir, ctx.config.constitution).dna : []
  if (md === null) {
    if (changedNow.length) g.fail(`the craft bible changed in this run (${changedNow.map((c) => c.file).join(', ')}) but production/dna-amendments.md is missing: list each edit with a one-line summary`)
    else if (exp !== null && !experimentProblems(exp).length) g.warn('no edit to the craft bible in this run')
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
  const amended = changedNow
  const listed = new Set(a.files.map((f) => f.file))
  for (const c of amended) if (!listed.has(c.file)) g.fail(`dna-amendments.md does not list ${c.file}, which this run ${c.change}; list every edit to the DNA with a one-line summary`)
  for (const f of a.files) if (!amended.some((c) => c.file === f.file)) g.fail(`dna-amendments.md lists ${f.file}, which has not changed in this run`)
  for (const f of a.files) if (f.summary.replace(/[^a-z0-9]/gi, '').length < 8) g.fail(`dna-amendments.md: give ${f.file} a one-line summary of the change`)
  if (a.hasEdits && !a.files.length && (a.none === null || !a.none.replace(/[^a-z0-9]/gi, ''))) g.fail('dna-amendments.md: no DNA edits listed, so say "none" and the reason (for example: the experiment is judged after air)')
  if (amended.length && a.verdict && a.verdict !== 'worked') g.warn(`DNA edited although the experiment's verdict is "${a.verdict}"; the reviewer should check each edit stands on its own`)
  if (amended.length) g.warn(`DNA edited: ${amended.map((c) => `${c.file} (${c.change})`).join(', ')}`)
  return g.done()
}
