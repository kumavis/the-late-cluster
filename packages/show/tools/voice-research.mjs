/**
 * npm run voice-research -- <ep> --draft <slug> | <ep> --drafts | <ep> <seg>   [--dry-run]
 * npm run voice-research -- <ep> --draft <slug> --add <word> --line <id> --status works|unstable|cannot --note "…" [--as <spelling>]
 * npm run voice-research -- <ep> --draft <slug> --pattern "<pattern>" --note "…" [--words a,b]
 * npm run voice-research -- --page                                              # only regenerate docs/voice-research.md
 * npm run voice-research -- --sounds [--dry-run]                                # the sounds check over the file (bun: the engine's G2P)
 *
 * The voice research file (data/voice-research.json) and its page (docs/voice-research.md). The
 * harvest reads a draft's (or a segment's) fit.json: each caption word respelled in the chosen `as`
 * and heard in every take goes in as `works`; every line still weak, flagged or unsayable is listed
 * with what was heard and the words missed, so the sound editor can record the word that failed
 * with `--add` (or a pattern with `--pattern`). It never makes an entry it cannot attribute to a
 * word, and never records a real person's name or handle. Every run that changes the file
 * regenerates the page. A harvested spelling whose sounds are not the word's (fit.json's `sounds`)
 * goes in as `misleads`, never as `works`; --sounds runs the same check over every working spelling
 * already in the file (sounds.ts, under bun) and marks the ones that fail.
 *
 * Exit 0 when every hard line (unsayable, or flagged for something other than a name or a blocking
 * word) is recorded; 1 when one is not, or a line is heard as something crude, alarming or out of
 * bounds (that is for another spelling, or the owner); 2 for bad arguments.
 *
 * Node builtins only; run with node (no engine, no Whisper). Only --sounds needs bun.
 */
import { existsSync, readdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { resolveEpisode, EpisodeError } from './episode.mjs'
import { DraftError, draftSlugs, resolveDraft, takeDraftArg } from './draft.mjs'
import { blockingFlags, realNames } from './heard.mjs'
import { RESEARCH_FILE, PAGE_FILE, addPattern, addWord, hardLines, harvest, isRecorded, loadResearch, mergeWorks, renderPage, validate } from './voice-research-lib.mjs'

const HERE = new URL('./', import.meta.url)
const USAGE = 'usage: npm run voice-research -- <ep> (--draft <slug> | --drafts | <seg>) [--dry-run] [--add <word> --line <id> --status works|unstable|cannot|misleads --note "…" [--as <spelling>] | --pattern "…" --note "…" [--words a,b]] | --page | --sounds [--dry-run]'

const fail = (msg, code = 2) => {
  console.error(msg.startsWith('usage') ? msg : `error: ${msg}`)
  process.exit(code)
}

function writeAtomic(file, text) {
  const tmp = `${file}.${process.pid}.tmp`
  writeFileSync(tmp, text)
  renameSync(tmp, file)
}

const readJson = (f) => {
  try {
    return JSON.parse(readFileSync(f, 'utf8'))
  } catch {
    return null
  }
}

async function castOf(files) {
  const { CAST } = await import(new URL('../src/cast.js', HERE).href)
  const house = new Set(Object.keys(CAST))
  const cast = { ...CAST }
  for (const f of files) if (f && existsSync(f)) Object.assign(cast, (await import(pathToFileURL(f).href)).CAST ?? {})
  return { house, cast }
}

function save(research, { dry }) {
  const problems = validate(research)
  if (problems.length) fail(`the research file would not be well formed:\n  ${problems.join('\n  ')}`, 1)
  if (dry) return console.log('dry run: nothing written')
  writeAtomic(RESEARCH_FILE, JSON.stringify(research, null, 1) + '\n')
  writeAtomic(PAGE_FILE, renderPage(research))
  console.log(`wrote packages/show/tools/data/voice-research.json (${research.words.length} words, ${research.patterns.length} patterns) and docs/voice-research.md`)
}

async function main() {
  let args = process.argv.slice(2)
  const opt = (name) => {
    const i = args.indexOf(`--${name}`)
    if (i < 0) return null
    const v = args[i + 1]
    if (v === undefined || v.startsWith('--')) fail(USAGE)
    args.splice(i, 2)
    return v
  }
  const flag = (name) => {
    const i = args.indexOf(`--${name}`)
    if (i < 0) return false
    args.splice(i, 1)
    return true
  }
  if (flag('sounds')) {
    // the engine's G2P runs under bun: sounds.ts does the check and writes the file and the page
    const r = spawnSync('bun', [fileURLToPath(new URL('./sounds.ts', HERE)), '--research', ...(flag('dry-run') ? ['--dry-run'] : [])], { stdio: 'inherit' })
    if (r.error) fail(`--sounds needs bun on the PATH (${r.error.message})`, 1)
    process.exit(r.status ?? 1)
  }
  if (flag('page')) {
    const r = loadResearch()
    const problems = validate(r)
    if (problems.length) fail(`packages/show/tools/data/voice-research.json:\n  ${problems.join('\n  ')}`, 1)
    writeAtomic(PAGE_FILE, renderPage(r))
    return console.log('wrote docs/voice-research.md')
  }
  let slug = null
  try {
    ;({ slug, rest: args } = takeDraftArg(args))
  } catch (e) {
    fail(e.message)
  }
  const all = flag('drafts')
  const dry = flag('dry-run')
  const add = opt('add'), lineId = opt('line'), status = opt('status'), note = opt('note'), as = opt('as')
  const pattern = opt('pattern'), words = opt('words')
  if (args.some((a) => a.startsWith('--'))) fail(USAGE)
  if (args.length !== (slug || all ? 1 : 2)) fail(USAGE)
  if ((add || pattern) && (all || (add && pattern))) fail('--add and --pattern take one draft (--draft <slug>) or one segment, and one at a time')
  if (add && !lineId) fail('--add needs --line <id> (the line of fit.json the word failed in)')

  let ep
  try {
    ep = resolveEpisode(args[0])
  } catch (e) {
    if (e instanceof EpisodeError) fail(e.message, e.code ?? 2)
    throw e
  }
  // the fits to read: { source, label, fit file, cast files, sources.json }
  const targets = []
  const draftTarget = (s) => {
    const d = resolveDraft(ep, s)
    return { source: `${ep.id}/${s}`, label: `--draft ${s}`, file: join(d.dir, 'fit.json'), cast: [join(ep.dir, 'cast.js'), d.cast], sources: d.sources }
  }
  try {
    if (slug) targets.push(draftTarget(slug))
    else if (all) for (const s of draftSlugs(ep, { readdirSync })) targets.push(draftTarget(s))
    else {
      const seg = args[1]
      const published = ep.meta?.status === 'published'
      const file = published ? fileURLToPath(new URL(`./.cache/fit/${ep.id}/${seg}/fit.json`, HERE)) : ep.segFile(seg, 'fit.json')
      targets.push({ source: `${ep.id}/${seg}`, label: seg, file, cast: [join(ep.dir, 'cast.js')], sources: join(ep.dir, 'production', 'sources.json') })
    }
  } catch (e) {
    if (e instanceof DraftError) fail(e.message, e.code)
    throw e
  }
  if (!targets.length) fail(`${ep.id} has no drafts`)

  let research = loadResearch()
  const problems = validate(research)
  if (problems.length) fail(`packages/show/tools/data/voice-research.json is not well formed:\n  ${problems.join('\n  ')}`, 1)
  let changed = false
  let open = 0

  for (const t of targets) {
    const fit = readJson(t.file)
    if (!fit) {
      console.log(`${t.label}: no fit.json (${ep.rel(t.file)}): npm run fit -- ${ep.id} ${t.label} --json`)
      open++
      continue
    }
    const { house, cast } = await castOf(t.cast)
    const names = realNames(cast, readJson(t.sources))
    const ctx = { source: t.source, house, names }

    if (add) {
      try {
        ;({ research } = addWord(research, { fit, lineId, word: add, status, as, note, ...ctx }))
      } catch (e) {
        fail(e.message)
      }
      console.log(`recorded "${add}" (${status}) from ${t.label} ${lineId}`)
      changed = true
    } else if (pattern) {
      try {
        ;({ research } = addPattern(research, { pattern, note, words: words ? words.split(',') : [], ...ctx }))
      } catch (e) {
        fail(e.message)
      }
      console.log(`recorded the pattern "${pattern}" from ${t.label}`)
      changed = true
    } else {
      const h = harvest(fit, ctx)
      const m = mergeWorks(research, h.works, { source: t.source })
      if (m.added.length || m.updated.length) changed = true
      research = m.research
      console.log(`${t.label}: ${h.works.length} working spelling${h.works.length === 1 ? '' : 's'} (new ${m.added.join(', ') || 'none'}; more for ${m.updated.join(', ') || 'none'}); ${h.listed.length} line${h.listed.length === 1 ? '' : 's'} still weak, flagged or unsayable`)
      for (const s of h.skipped) console.log(`  not recorded: ${s.word}: ${s.why}`)
    }

    // the lines still hard, and whether each is recorded
    const hard = new Set(hardLines(fit).map((l) => l.id))
    for (const l of harvest(fit, ctx).listed) {
      const blocking = blockingFlags(l.flags)
      const rec = isRecorded(research, l, t.source)
      const mark = blocking.length ? 'NEVER ACCEPTED' : hard.has(l.id) ? (rec ? 'recorded' : 'RECORD IT') : rec ? 'recorded' : l.status === 'weak' ? 'weak: record the word if it matters' : 'a name: the caption carries it'
      if (blocking.length || (hard.has(l.id) && !rec)) open++
      console.log(`  ${l.id} (${l.voice}, ${l.status}${l.flags.length ? `: ${l.flags.join(', ')}` : ''}) ${mark}`)
      console.log(`    "${l.text}"`)
      for (const x of l.heard.slice(0, 4)) console.log(`    heard ×${x.count ?? 1}: "${x.text}"`)
      if (l.missed.length) console.log(`    missed: ${l.missed.map((x) => `${x.word} ×${x.count}`).join(', ')}`)
      if (blocking.length) console.log('    something heard is never accepted: choose another spelling; if none exists, it goes at the top of the fit notes for the owner')
      else if (hard.has(l.id) && !rec) console.log(`    record the word that failed: npm run voice-research -- ${ep.id} ${t.label} --add <word> --line ${l.id} --status cannot|unstable --note "…"`)
    }
  }
  if (changed) save(research, { dry })
  else console.log('nothing new to record')
  process.exit(open ? 1 : 0)
}

await main()
