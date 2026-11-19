// The orchestrator: one episode through the eleven stages of docs/WORKFLOW.md, resumable from
// production/state.json. For each stage it runs the tool's own steps, writes the briefs for the
// subagents the project manager must spawn, waits for their files, combines them, and runs the
// gates. It never calls a model itself: with the default runner (manual) it stops and says exactly
// what to spawn; the fixture runner copies prepared outputs (tests, bin/end-to-end.mjs); the headless runner
// hands each brief to Claude Code.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { loadContext } from './context.mjs'
import { buildPreviewVerify, buildThumbnail } from './gates/build.mjs'
import { gate } from './gates/common.mjs'
import { writePr } from './pr.mjs'
import { briefPath, writeBrief } from './briefs.mjs'
import { bibleSnapshot } from './dna.mjs'
import { copyInherited } from './inherit.mjs'
import { describePost, loadDigest, lookupPosts } from './digest.mjs'
import { checkWeek, episodePaths, findEpisodeForWeek, formatEpisodeJson, listEpisodes, PKG, ProduceError, readJson, rel, weekSlug } from './repo.mjs'
import { loadState, newState, nextStage, resetFrom, saveState } from './state.mjs'
import { STAGE_DEFS, STAGES } from './stages.mjs'
import { makeTools } from './tools.mjs'
import { makeRunner } from './runners.mjs'

const deepMerge = (a, b) => {
  if (!b || typeof b !== 'object' || Array.isArray(b)) return b
  const out = { ...(a && typeof a === 'object' && !Array.isArray(a) ? a : {}) }
  for (const [k, v] of Object.entries(b)) if (k !== '$comment') out[k] = deepMerge(out[k], v)
  return out
}

/** the config, with --limits merged over `limits` and --settings merged over the whole (trial runs) */
export function loadConfig({ limitsFile, settings } = {}) {
  let config = readJson(join(PKG, 'config', 'pipeline.json'))
  if (settings) config = deepMerge(config, settings)
  let custom = null
  if (limitsFile) {
    custom = JSON.parse(JSON.stringify(readJson(resolve(limitsFile)), (k, v) => (k === '$comment' ? undefined : v)))
    config.limits = { ...config.limits, ...custom }
  }
  return { config, custom }
}

/** run a list of gates; print and return { ok, results, failures, sentBack } */
export async function runGates(ctx, gates, print = () => {}) {
  const results = []
  for (const fn of gates) {
    let r
    try {
      r = await fn(ctx)
    } catch (e) {
      const g = gate(fn.name)
      g.fail(`the gate itself crashed: ${e.message.split('\n')[0]}`)
      r = g.done()
    }
    results.push(r)
    print(`gate ${r.name} ${r.skipped ? 'skip' : r.sentBack ? 'SEND-BACK' : r.ok ? 'ok' : 'FAIL'}${r.skipped ? ` (${r.skipped})` : ''}`)
    for (const f of r.failures) print(`  FAIL ${f}`)
    if (r.sentBack) print(`  SEND-BACK to ${r.sentBack.route}: ${r.sentBack.reason}`)
    for (const w of r.warnings) print(`  warn ${w}`)
  }
  const failures = results.flatMap((r) => r.failures.map((f) => `${r.name}: ${f}`))
  return { ok: !failures.length, results, failures, sentBack: results.find((r) => r.sentBack)?.sentBack ?? null }
}

const brief = (results) => results.map((r) => ({ name: r.name, ok: r.ok, skipped: r.skipped, sentBack: r.sentBack, failures: r.failures, warnings: r.warnings }))

/** is a task done: its own test, or every file it writes exists (a folder: holds at least one file) */
export function taskDone(ctx, task) {
  if (task.done) return task.done(ctx)
  return task.writes.every((w) => {
    const abs = join(ctx.root, w)
    if (w.endsWith('/')) return existsSync(abs) && readdirSync(abs).some((f) => !f.startsWith('.'))
    return existsSync(abs)
  })
}

const setStatus = (paths, status) => {
  const meta = JSON.parse(readFileSync(paths.episodeJson, 'utf8'))
  if (meta.status === status) return
  meta.status = status
  writeFileSync(paths.episodeJson, formatEpisodeJson(meta))
}

/**
 * produce(options) → exit code. Options: root, week, status, check, stage, from, segment, runner
 * ('manual' | 'fixture' | 'headless'), fixture (dir), digest (dir), limits (file), bible (dir),
 * ledger (dir), previewOnly, exclude (ids), rework (task ids), find (query), network, tools, print.
 */
export async function produce(o) {
  const print = o.print ?? console.log
  const root = resolve(o.root)
  const week = checkWeek(o.week)
  let found = findEpisodeForWeek(root, week)
  let paths = found ? episodePaths(root, found.id) : null
  let state = paths ? loadState(paths.state) : null
  const settings = o.settings ? JSON.parse(JSON.stringify(readJson(resolve(o.settings)), (k, v) => (k === '$comment' ? undefined : v))) : state?.settings ?? null
  const { config, custom } = loadConfig({ limitsFile: o.limits, settings })

  const digestDir = resolve(root, o.digest ?? state?.digest ?? join('data', 'weeks', week))
  const bibleDir = resolve(root, o.bible ?? state?.bible?.dir ?? join('docs', 'bible'))
  const ledgerDir = resolve(root, o.ledger ?? state?.ledger ?? config.ledger.dir)

  if (o.find) {
    const d = loadDigest(digestDir, { optOutFile: join(root, 'packages/scraper/config/optout.json') })
    const hits = lookupPosts(d, o.find)
    for (const p of hits) print(JSON.stringify(describePost(d, p), null, 2))
    print(`find: ${hits.length} post${hits.length === 1 ? '' : 's'}`)
    return hits.length ? 0 : 1
  }
  if (o.status) return printStatus({ print, week, found, state, paths, root })

  if (state) {
    state.runs = (state.runs ?? 0) + 1
    if (o.runner && o.runner !== state.runner) state.runner = o.runner
  }
  const runner = o.runner ?? state?.runner ?? 'manual'
  const logDir = () => (paths ? join(paths.work, 'logs', `run-${String(state?.runs ?? 0).padStart(3, '0')}`) : null)
  let tools = o.tools ?? null
  const getTools = () => (tools ??= makeTools({ root, logDir: logDir() }))
  const ctxFor = async () => {
    const ctx = await loadContext({ root, id: paths.id, week, digestDir, config, limits: state?.limits && state.limits !== 'default' ? { ...config.limits, ...state.limits } : config.limits, tools: getTools(), network: Boolean(o.network), bibleDir, bibleSnapshot: state?.bible?.snapshot, ledgerDir, onlySegment: o.segment ?? null })
    ctx.state = state
    return ctx
  }

  if (o.check) {
    if (!found) throw new ProduceError(`no episode for ${week} yet; run npm run produce -- --week ${week}`)
    const def = STAGE_DEFS[o.check]
    if (!def) throw new ProduceError(`--check takes one of ${STAGES.join(', ')}`, 2)
    const ctx = await ctxFor()
    const gates = o.check === 'build' ? [buildThumbnail] : def.waves.flatMap((w) => w.gates ?? [])
    const { ok, sentBack } = await runGates(ctx, gates, print)
    print(`check ${o.check} ${found.id}${o.segment ? ` (segment ${o.segment})` : ''}: ${sentBack ? `SEND-BACK to ${sentBack.route}` : ok ? 'ok' : 'FAIL'}`)
    return ok ? 0 : 1
  }

  // before there is an episode: the digest (stage 1's scrape) and the scaffold
  if (!found) {
    if (!existsSync(join(digestDir, 'digest.json'))) {
      if (o.digest) throw new ProduceError(`no digest.json in ${o.digest}`)
      // no window flag: the scraper's default window runs from the previous aired episode (it reads
      // the ledger and episodes/<id>/episode.json for the date) to now, else the last complete week
      const args = ['--out', rel(root, digestDir), '--ledger', rel(root, ledgerDir)]
      print(`stage scope run: npm run scrape -- ${args.join(' ')}  (the scraper's default window: since the previous aired episode)`)
      const r = getTools().npm('scrape', args)
      if (r.code !== 0 || !existsSync(join(digestDir, 'digest.json'))) {
        print(`stage scope FAIL: the scrape exited ${r.code}`)
        return 1
      }
    }
    const r = getTools().npm('episode:new', ['--title', `Week ${week}`, '--week', week, '--slug', weekSlug(week)])
    const id = /^created (\S+)/m.exec(r.out)?.[1]
    if (r.code !== 0 || !id) {
      print(`scaffold FAIL (exit ${r.code}): ${r.out.trim().split('\n').slice(-1)[0] ?? ''}`)
      return 1
    }
    found = findEpisodeForWeek(root, week)
    paths = episodePaths(root, found.id)
    state = newState({ week, episode: found.id, digest: rel(root, digestDir), limits: custom ?? 'default', runner })
    state.runs = 1
    print(`scaffold ${found.id}`)
  }
  if (!state) {
    state = newState({ week, episode: found.id, digest: rel(root, digestDir), limits: custom ?? 'default', runner })
    state.runs = 1
  }
  state.runner = runner
  if (custom && JSON.stringify(state.limits) !== JSON.stringify(custom)) state.limits = custom
  if (o.digest) state.digest = rel(root, digestDir)
  if (o.ledger || !state.ledger) state.ledger = rel(root, ledgerDir)
  if (o.previewOnly) state.previewOnly = true
  if (settings) state.settings = settings
  if (!state.bible || (o.bible && state.bible.dir !== rel(root, bibleDir))) state.bible = { dir: rel(root, bibleDir), snapshot: bibleSnapshot(bibleDir, config.constitution) }
  const save = () => saveState(paths.state, state)

  // a send-back routes the run to the stage that can fix it
  for (const s of STAGES) {
    const st = state.stages[s]
    if (st.status !== 'sent-back') continue
    const route = st.data?.sentBack?.route
    print(`sent back from ${s} to ${route}: ${st.data?.sentBack?.reason ?? ''}`)
    const reason = st.data?.sentBack?.reason
    // the review's verdict file is set aside so the stage reviews again later
    for (const f of [join(paths.production, 'review.json'), join(paths.production, 'stage', 'review.json'), join(paths.production, 'scope', 'review.md')]) if (existsSync(f) && STAGES.indexOf(s) >= STAGES.indexOf(route)) setAside(f, state)
    resetFrom(state, route)
    state.stages[route].data = { ...(state.stages[route].data ?? {}), feedback: [`sent back from ${s}: ${reason}`] }
    break
  }

  // which stages to run
  if (o.exclude?.length) {
    const s = o.stage ?? nextStage(state)
    if (!['repetition-ideas', 'select'].includes(s)) throw new ProduceError(`--exclude applies at the repetition gate on ideas or at select (the run is at ${s})`, 2)
    state.stages[s].data = { ...(state.stages[s].data ?? {}), excluded: [...new Set([...(state.stages[s].data?.excluded ?? []), ...o.exclude])] }
    print(`excluded at ${s}: ${o.exclude.join(', ')}`)
  }
  let todo
  if (o.from) {
    if (!STAGES.includes(o.from)) throw new ProduceError(`--from takes one of ${STAGES.join(', ')}`, 2)
    resetFrom(state, o.from)
    if (STAGES.indexOf(o.from) <= STAGES.indexOf('build')) setStatus(paths, 'draft')
    todo = STAGES.slice(STAGES.indexOf(o.from))
  } else if (o.stage) {
    const before = STAGES.slice(0, STAGES.indexOf(o.stage)).filter((s) => state.stages[s].status !== 'done')
    if (before.length) throw new ProduceError(`${o.stage} needs ${before.join(', ')} done first`)
    todo = [o.stage]
  } else {
    const next = nextStage(state)
    todo = next ? STAGES.slice(STAGES.indexOf(next)) : []
  }
  if (o.rework?.length) {
    const ctx = await ctxFor()
    const s = todo[0]
    const tasks = STAGE_DEFS[s].waves.flatMap((w) => w.tasks(ctx))
    for (const id of o.rework) {
      const t = tasks.find((x) => x.id === id)
      if (!t) throw new ProduceError(`--rework: no task ${id} in stage ${s} (tasks: ${tasks.map((x) => x.id).join(', ')})`, 2)
      for (const w of t.writes) if (existsSync(join(root, w))) setAside(join(root, w), state)
      state.stages[s].data = { ...(state.stages[s].data ?? {}), rework: { ...(state.stages[s].data?.rework ?? {}), [id]: (state.stages[s].gates ?? []).flatMap((g) => g.failures ?? []) } }
      print(`rework ${id}: its output is set aside; a fresh brief carries the failures`)
    }
    state.stages[s].status = 'pending'
  }
  save()
  if (!todo.length) {
    print(`produce ${found.id}: done (npm run produce -- --week ${week} --from <stage> to redo one)`)
    return 0
  }

  const run = makeRunner(runner, { fixture: o.fixture && resolve(o.fixture), root, config, print, state })
  for (const name of todo) {
    print(`stage ${name} start`)
    const result = name === 'build' ? await buildStage({ ctxFor, tools: getTools(), paths, state, print }) : await runStage({ name, ctxFor, state, print, run, save, root, paths })
    state.stages[name] = { ...state.stages[name], ...result }
    save()
    if (result.status === 'waiting') {
      print(`produce ${found.id}: waiting at ${name} for ${result.waiting.length} subagent${result.waiting.length === 1 ? '' : 's'} (npm run produce -- --week ${week} --status lists them)`)
      return 1
    }
    if (result.status === 'sent-back') {
      print(`produce ${found.id}: ${name} sent the episode back to ${result.data.sentBack.route}; run npm run produce -- --week ${week} to go there`)
      return 1
    }
    if (result.status !== 'done') {
      print(`stage ${name} FAIL${result.note ? `: ${result.note}` : ''}`)
      print(`produce ${found.id}: stopped at ${name}. Fix it (or --rework <task id>), then run npm run produce -- --week ${week} to resume`)
      return 1
    }
    print(`stage ${name} done`)
  }
  print(`produce ${found.id}: ${todo.at(-1) === 'review' ? `done; pull request text in ${paths.rel(paths.prBody)}` : `ran ${todo.join(', ')}`}`)
  return 0
}

/** keep a rejected output beside the new one, numbered, instead of deleting it */
function setAside(abs, state) {
  let k = 1
  while (existsSync(`${abs}.rejected-${k}`)) k++
  renameSync(abs, `${abs}.rejected-${k}`)
}

/** one stage: its tool step, then each wave's subagents, combination and gates */
async function runStage({ name, ctxFor, state, print, run, save, root, paths }) {
  const def = STAGE_DEFS[name]
  const st = state.stages[name]
  let ctx = await ctxFor()
  if (def.prepare) def.prepare(ctx)
  const all = []
  for (const [w, wave] of def.waves.entries()) {
    for (let round = 0; round < 25; round++) {
      ctx = await ctxFor()
      const tasks = wave.tasks(ctx)
      const others = listEpisodes(root).map((e) => e.id).filter((x) => x !== paths.id)
      for (const t of tasks) writeBrief(ctx, t, { others, feedback: [...(st.data?.rework?.[t.id] ?? []), ...(st.data?.feedback ?? [])] })
      const pending = tasks.filter((t) => !taskDone(ctx, t))
      if (!pending.length) break
      const r = await run(ctx, pending, { briefPath: (t) => briefPath(ctx, t) })
      if (r.status === 'waiting') return { status: 'waiting', waiting: pending.map((t) => ({ task: t.id, role: t.role, brief: paths.rel(briefPath(ctx, t)), writes: t.writes })), gates: brief(all) }
      if (r.status === 'failed') return { status: 'failed', note: r.detail, gates: brief(all) }
      if (round === 24) return { status: 'failed', note: `wave ${w + 1} kept producing new tasks` }
    }
    ctx = await ctxFor()
    const extra = wave.after ? wave.after(ctx) : null
    ctx = await ctxFor()
    if (extra && typeof extra === 'object') Object.assign(ctx, extra)
    const g = await runGates(ctx, wave.gates ?? [], print)
    all.push(...g.results)
    if (g.sentBack) return { status: 'sent-back', data: { ...(st.data ?? {}), sentBack: g.sentBack }, gates: brief(all) }
    if (!g.ok) return { status: 'failed', gates: brief(all), note: `${g.failures.length} gate failure${g.failures.length === 1 ? '' : 's'} in wave ${w + 1}` }
  }
  // stage-specific follow-ups once its gates pass
  if (name === 'select') {
    const plan = JSON.parse(readFileSync(paths.plan, 'utf8'))
    const inherited = copyInherited(root, paths.dir, plan)
    for (const e of inherited) print(`  inherited ${e.from}/${e.path} → production/inherited/${e.from}/${e.path}`)
    st.data = { ...(st.data ?? {}), inherited }
  }
  if (name === 'review') {
    const ctx2 = await ctxFor()
    const { body } = writePr({ ctx: ctx2, state })
    print(`  pull request text: ${paths.rel(body)}`)
  }
  const data = { ...(st.data ?? {}) }
  delete data.rework
  delete data.feedback
  return { status: 'done', gates: brief(all), waiting: [], data }
}

/** stage 10: thumbnail, then a preview build verified as a draft, or a published build and verify */
async function buildStage({ ctxFor, tools, paths, state, print }) {
  const results = []
  const step = (name, r, ok = r.code === 0) => {
    const g = gate(name)
    if (!ok) g.fail(`exited ${r.code}: ${r.out.trim().split('\n').slice(-3).join(' | ')}`)
    results.push(g.done())
    print(`gate ${name} ${ok ? 'ok' : 'FAIL'}`)
    for (const f of g.failures) print(`  FAIL ${f}`)
    return ok
  }
  const moment = existsSync(paths.thumbnailMoment) ? readFileSync(paths.thumbnailMoment, 'utf8').trim().split(/\s+/).filter(Boolean) : []
  const thumbArgs = moment.length === 2 ? [paths.id, moment[0], moment[1]] : [paths.id]
  print(`stage build run: npm run thumbnail -- ${thumbArgs.join(' ')}`)
  if (!step('build.thumbnail-shot', tools.npm('thumbnail', thumbArgs))) return { status: 'failed', gates: brief(results) }
  const t = await buildThumbnail(await ctxFor())
  results.push(t)
  print(`gate ${t.name} ${t.ok ? 'ok' : 'FAIL'}`)
  if (!t.ok) return { status: 'failed', gates: brief(results), note: t.failures.join('; ') }
  if (state.previewOnly) {
    print(`stage build run: npm run build -- ${paths.id} --preview  (preview only: the episode stays a draft)`)
    const b = tools.npm('build', [paths.id, '--preview'])
    if (!step('build.preview', b, b.code === 0 && /^built /m.test(b.out))) return { status: 'failed', gates: brief(results), note: 'the preview build failed' }
    print(`  ${/^built .*$/m.exec(b.out)[0]}`)
    const v = await buildPreviewVerify(await ctxFor())
    results.push(v)
    print(`gate ${v.name} ${v.skipped ? 'skip' : v.ok ? 'ok' : 'FAIL'}`)
    for (const f of v.failures) print(`  FAIL ${f}`)
    if (!v.ok) return { status: 'failed', gates: brief(results) }
  } else {
    setStatus(paths, 'published')
    print(`stage build run: npm run build -- ${paths.id}`)
    const b = tools.npm('build', [paths.id])
    if (!step('build.build', b, b.code === 0 && /^built /m.test(b.out))) {
      setStatus(paths, 'draft')
      return { status: 'failed', gates: brief(results), note: 'the build failed; the episode is back to draft' }
    }
    print(`  ${/^built .*$/m.exec(b.out)[0]}`)
  }
  print('stage build run: npm run verify')
  if (!step('build.verify', tools.npm('verify', []))) return { status: 'failed', gates: brief(results) }
  return { status: 'done', gates: brief(results) }
}

function printStatus({ print, week, found, state, paths }) {
  if (!found) {
    print(`status ${week}: no episode yet`)
    return 0
  }
  print(`status ${week} ${found.id} (${found.meta.status})${state ? `, runner ${state.runner}${state.previewOnly ? ', preview only' : ''}` : ''}`)
  if (!state) {
    print('  no production/state.json from this protocol: not started')
    return 0
  }
  for (const s of STAGES) {
    const st = state.stages[s]
    const g = st.gates ?? []
    print(`${s.padEnd(17)} ${st.status}${g.length ? ` gates=${g.filter((x) => x.ok && !x.sentBack).length}/${g.length}` : ''}${st.note ? `  (${st.note})` : ''}`)
    for (const x of g) for (const f of x.failures ?? []) print(`  FAIL ${x.name}: ${f}`)
    for (const x of g) if (x.sentBack) print(`  SEND-BACK ${x.name} → ${x.sentBack.route}: ${x.sentBack.reason}`)
  }
  const next = nextStage(state)
  const st = next ? state.stages[next] : null
  if (st?.waiting?.length) {
    print(`next: ${next}: spawn ${st.waiting.length} subagent${st.waiting.length === 1 ? '' : 's'}, each from its brief, then run produce again:`)
    for (const w of st.waiting) print(`  spawn ${w.role.padEnd(10)} ${w.task.padEnd(34)} brief ${w.brief}  writes ${w.writes.join(', ')}`)
  } else print(next ? `next: ${next} (run npm run produce -- --week ${week})` : 'next: nothing (done)')
  return 0
}
