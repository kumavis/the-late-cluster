// The orchestrator: one episode through the thirteen stages of docs/WORKFLOW.md, resumable from
// production/state.json. For each stage it runs the tool's own steps, writes one brief per subagent
// task, has the runner do the tasks, combines what they wrote, and runs the gates. It never calls a
// model itself. The headless runner (the default where the claude command is signed in) hands each
// brief to Claude Code, a wave's tasks in parallel, and the run stops only at a failure or a
// send-back, printing what the project manager must decide; the manual runner stops at every wave
// and lists the subagents to spawn; the fixture runner copies prepared outputs (tests, bin/end-to-end.mjs).
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { loadContext } from './context.mjs'
import { buildPreviewVerify, buildThumbnail } from './gates/build.mjs'
import { gate } from './gates/common.mjs'
import { writePr } from './pr.mjs'
import { briefPath, writeBrief } from './briefs.mjs'
import { loadLedger } from './ledger.mjs'
import { checkSources } from './scraper.mjs'
import { bibleSnapshot } from './dna.mjs'
import { copyInherited } from './inherit.mjs'
import { describePost, loadDigest, lookupPosts } from './digest.mjs'
import { checkWeek, episodePaths, findEpisodeForWeek, formatEpisodeJson, ID_RE, listEpisodes, PKG, ProduceError, readJson, rel, weekSlug } from './repo.mjs'
import { loadState, newState, nextStage, resetFrom, saveState } from './state.mjs'
import { STAGE_DEFS, STAGES, requestedPlanProblems } from './stages.mjs'
import { makeTools } from './tools.mjs'
import { REQUESTS_FILE, requestFileProblems, requestedSegments } from './requests.mjs'
import { headlessReady, makeRunner } from './runners.mjs'

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

/** a failure or warning that concerns one task (finding 14): it names one of the task's keys */
export const concerns = (task, line) => task.keys.some((k) => line.includes(k))

/**
 * The slug for a week's episode: 2026-w47, or 2026-w47-2 when an episode or a ledger entry already
 * has that slug, so a second draft of the same week gets an id of its own (finding 32).
 */
export function freshSlug(root, ledgerDir, week) {
  const base = weekSlug(week)
  const taken = new Set([...listEpisodes(root).map((e) => e.id), ...loadLedger(ledgerDir).entries.map((e) => e.id)].map((id) => ID_RE.exec(id)?.[2]).filter(Boolean))
  if (!taken.has(base)) return base
  for (let k = 2; ; k++) if (!taken.has(`${base}-${k}`)) return `${base}-${k}`
}

/** the lines a send-back's verdict file passes on to the stage it routes to: its changes, never its reasons */
export function changesFrom(abs) {
  if (!abs || !existsSync(abs)) return []
  let j
  try {
    j = JSON.parse(readFileSync(abs, 'utf8'))
  } catch {
    return []
  }
  if (Array.isArray(j.changes)) return j.changes.map(String)
  return Object.entries(j.segments ?? {}).flatMap(([seg, v]) => (v.changes ?? []).filter((c) => c.owner === 'script').map((c) => `${seg}${c.file ? ` (${c.file})` : ''}: ${c.change}`))
}

/** all the tasks of a stage as they stand now (for --check --task and --rework) */
async function stageTasks(ctx, name) {
  const out = []
  for (const [w, wave] of STAGE_DEFS[name].waves.entries()) for (const t of await wave.tasks(ctx)) out.push({ ...t, wave: w })
  return out
}

/**
 * produce(options) → exit code. Options: root, week, status, check, task, stage, from, segment, runner
 * ('headless' | 'manual' | 'fixture'), fixture (dir), digest (dir), limits (file), bible (dir),
 * ledger (dir), previewOnly, exclude (ids), rework (task ids), find (query), network, tools, print,
 * ready (whether headless can run; detected when absent).
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
    for (const p of hits) print(JSON.stringify(describePost(d, p)))
    print(`find: ${hits.length} post${hits.length === 1 ? '' : 's'}`)
    return hits.length ? 0 : 1
  }
  if (o.status) return printStatus({ print, week, found, state, paths, root })

  if (state) {
    state.runs = (state.runs ?? 0) + 1
    if (o.runner && o.runner !== state.runner) state.runner = o.runner
  }
  let tools = o.tools ?? null
  const logDir = () => (paths ? join(paths.work, 'logs', `run-${String(state?.runs ?? 0).padStart(3, '0')}`) : null)
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
    if (o.task) return checkTask({ ctx, stage: o.check, id: o.task, print })
    const gates = o.check === 'build' ? [buildThumbnail] : def.waves.flatMap((w) => w.gates ?? [])
    const { ok, sentBack } = await runGates(ctx, gates, print)
    print(`check ${o.check} ${found.id}${o.segment ? ` (segment ${o.segment})` : ''}: ${sentBack ? `SEND-BACK to ${sentBack.route}` : ok ? 'ok' : 'FAIL'}`)
    return ok ? 0 : 1
  }

  const runner = o.runner ?? state?.runner ?? ((o.ready ?? headlessReady)({ command: config.headless.command }) ? 'headless' : 'manual')

  // before there is an episode: the digest (stage 1's scrape) and the scaffold
  if (!found) {
    if (!existsSync(join(digestDir, 'digest.json'))) {
      if (o.digest) throw new ProduceError(`no digest.json in ${o.digest}`)
      const args = ['--out', rel(root, digestDir), '--ledger', rel(root, ledgerDir)]
      print(`stage scope run: npm run scrape -- ${args.join(' ')}  (the scraper's default window: since the previous aired episode)`)
      const r = getTools().npm('scrape', args)
      if (r.code !== 0 || !existsSync(join(digestDir, 'digest.json'))) {
        print(`stage scope FAIL: the scrape exited ${r.code}`)
        return 1
      }
    }
    const slug = freshSlug(root, ledgerDir, week)
    const r = getTools().npm('episode:new', ['--title', `Week ${week}`, '--week', week, '--slug', slug])
    const id = /^created (\S+)/m.exec(r.out)?.[1]
    if (r.code !== 0 || !id) {
      print(`scaffold FAIL (exit ${r.code}): ${r.out.trim().split('\n').slice(-1)[0] ?? ''}`)
      return 1
    }
    found = findEpisodeForWeek(root, week)
    paths = episodePaths(root, found.id)
    state = newState({ week, episode: found.id, digest: rel(root, digestDir), limits: custom ?? 'default', runner })
    state.runs = 1
    print(`scaffold ${found.id}${slug !== weekSlug(week) ? ` (${weekSlug(week)} is taken by an earlier draft)` : ''}`)
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

  // a send-back routes the run to the stage that can fix it; its verdict file is set aside, and only
  // the file's changes (never its reasons) go into the briefs there
  for (const s of STAGES) {
    const st = state.stages[s]
    if (st.status !== 'sent-back') continue
    const sb = st.data?.sentBack ?? {}
    print(`sent back from ${s} to ${sb.route}: ${sb.reason ?? ''}`)
    const file = sb.file ? join(root, sb.file) : null
    const feedback = file?.endsWith('.json') ? changesFrom(file) : []
    if (file && existsSync(file)) setAside(file)
    resetFrom(state, sb.route)
    if (feedback.length) state.stages[sb.route].data = { ...(state.stages[sb.route].data ?? {}), feedback }
    break
  }

  if (o.exclude?.length) {
    const s = o.stage ?? nextStage(state)
    if (!['repetition-ideas', 'select'].includes(s)) throw new ProduceError(`--exclude applies at the repetition gate on ideas or at select (the run is at ${s})`, 2)
    state.stages[s].data = { ...(state.stages[s].data ?? {}), excluded: [...new Set([...(state.stages[s].data?.excluded ?? []), ...o.exclude])] }
    print(`excluded at ${s}: ${o.exclude.join(', ')}`)
  }
  // the segments the owner asked for (src/requests.mjs): a record out of shape stops the run; one
  // added after the draft stage reopens draft, fit and select for it, as --from draft would
  const requestProblems = requestFileProblems(paths.production)
  if (requestProblems.length) {
    for (const p of requestProblems) print(`  FAIL ${p}`)
    print(`produce ${found.id}: production/${REQUESTS_FILE} is not in shape; fix it and run again`)
    save()
    return 1
  }
  let from = o.from
  const late = requestedSegments(paths.production).filter((r) => !existsSync(join(paths.production, 'drafts', r.slug, 'script.js'))).map((r) => r.slug)
  if (late.length && !from && state.stages.draft.status === 'done') {
    // nothing is reopened for a request that could not be drafted (a slug taken, a card not screened)
    const blocked = requestedPlanProblems(await ctxFor())
    if (blocked.length) {
      for (const p of blocked) print(`  FAIL ${p}`)
      print(`produce ${found.id}: the requested ${late.join(', ')} cannot join yet; nothing was reopened`)
      save()
      return 1
    }
    print(`requested by the owner after the draft stage: ${late.join(', ')}; draft, fit and select reopen for ${late.length === 1 ? 'it' : 'them'} (as --from draft)`)
    from = 'draft'
  }
  // assembly had begun: it reopens too, and its writer is briefed again to place what joined
  const rejoin = from && late.length && existsSync(join(paths.production, 'assembly.md')) ? late : []
  let todo
  if (from) {
    if (!STAGES.includes(from)) throw new ProduceError(`--from takes one of ${STAGES.join(', ')}`, 2)
    resetFrom(state, from)
    if (STAGES.indexOf(from) <= STAGES.indexOf('build')) setStatus(paths, 'draft')
    todo = STAGES.slice(STAGES.indexOf(from))
    if (rejoin.length) {
      setAside(join(paths.production, 'assembly.md'))
      const joined = rejoin.join(', ')
      state.stages.assemble.data = { ...(state.stages.assemble.data ?? {}), feedback: [`${joined}: ${rejoin.length === 1 ? 'a segment' : 'segments'} the owner asked for joined after assembly began (production/${REQUESTS_FILE}). The tool copies ${rejoin.length === 1 ? 'it' : 'them'} into segments/, appends ${rejoin.length === 1 ? 'it' : 'them'} to the rundown, and merges ${rejoin.length === 1 ? 'its' : 'their'} sources and guests into production/sources.json and cast.js. Place ${rejoin.length === 1 ? 'it' : 'them'} in the order (episode.json "rundown" and plan.json alike), write the joins, and say what you changed in assembly.md.`] }
      print(`  assembly had begun: assembly.md is set aside and assemble.writer is briefed again to place ${joined}`)
    }
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
    const tasks = await stageTasks(ctx, s)
    for (const id of o.rework) {
      const t = tasks.find((x) => x.id === id)
      if (!t) throw new ProduceError(`--rework: no task ${id} in stage ${s} (tasks: ${tasks.map((x) => x.id).join(', ')})`, 2)
      for (const w of t.writes) if (existsSync(join(root, w)) && !t.done) setAside(join(root, w))
      const failures = (state.stages[s].gates ?? []).flatMap((g) => (g.failures ?? []).map((f) => `${g.name}: ${f}`)).filter((f) => concerns(t, f))
      state.stages[s].data = { ...(state.stages[s].data ?? {}), rework: { ...(state.stages[s].data?.rework ?? {}), [id]: failures } }
      print(`rework ${id}: its output is set aside; a fresh brief carries its ${failures.length} failure${failures.length === 1 ? '' : 's'}`)
    }
    state.stages[s].status = 'pending'
  }
  save()
  if (!todo.length) {
    print(`produce ${found.id}: done (npm run produce -- --week ${week} --from <stage> to redo one)`)
    return 0
  }

  const run = makeRunner(runner, { fixture: o.fixture && resolve(o.fixture), root, config, print, state, spawn: o.spawn })
  for (const name of todo) {
    print(`stage ${name} start`)
    const result = name === 'build' ? await buildStage({ ctxFor, tools: getTools(), paths, state, print }) : await runStage({ name, ctxFor, state, print, run, root, paths })
    state.stages[name] = { ...state.stages[name], ...result }
    save()
    if (result.status === 'waiting') {
      print(`produce ${found.id}: waiting at ${name} for ${result.waiting.length} subagent${result.waiting.length === 1 ? '' : 's'} (spawn each from its brief, then run produce again)`)
      return 1
    }
    if (result.status === 'sent-back') {
      print(`decide: ${name} sent the episode back to ${result.data.sentBack.route} (${result.data.sentBack.reason}). Run produce to go there, or take it to the owner.`)
      return 1
    }
    if (result.status !== 'done') {
      print(`stage ${name} FAIL${result.note ? `: ${result.note}` : ''}`)
      printDecision({ print, week, name, result })
      return 1
    }
    print(`stage ${name} done`)
  }
  print(`produce ${found.id}: ${todo.at(-1) === 'review' ? `done; pull request text in ${paths.rel(paths.prBody)}` : `ran ${todo.join(', ')}`}`)
  return 0
}

/** what a project manager must decide when a run stops on a failure: short, and only the choices */
function printDecision({ print, week, name, result }) {
  const failing = (result.gates ?? []).filter((g) => !g.ok)
  const lines = failing.flatMap((g) => g.failures.map((f) => `${g.name}: ${f}`))
  print(`decide: ${name} stopped with ${lines.length || 'no gate'} failure${lines.length === 1 ? '' : 's'}${result.tasks?.length ? `; tasks in the failing wave: ${result.tasks.join(', ')}` : ''}.`)
  for (const l of lines.slice(0, 8)) print(`  ${l.length > 220 ? `${l.slice(0, 217)}…` : l}`)
  if (lines.length > 8) print(`  … and ${lines.length - 8} more (npm run produce -- --week ${week} --status)`)
  print(`  then: --rework <task> (a fresh brief with its own failures), --exclude <id> (at repetition-ideas or select), --from <stage>, or take it to the owner.`)
}

/** --check <stage> --task <id>: that task's wave's gates, and only the lines that concern it */
async function checkTask({ ctx, stage, id, print }) {
  const tasks = await stageTasks(ctx, stage)
  const t = tasks.find((x) => x.id === id)
  if (!t) throw new ProduceError(`--task: no task ${id} in stage ${stage} now (${tasks.map((x) => x.id).join(', ') || 'none'})`, 2)
  const gates = STAGE_DEFS[stage].waves[t.wave].gates ?? []
  let n = 0
  for (const fn of gates) {
    let r
    try {
      r = await fn(ctx)
    } catch (e) {
      print(`FAIL ${fn.name}: the gate crashed: ${e.message.split('\n')[0]}`)
      n++
      continue
    }
    for (const f of r.failures) if (concerns(t, f)) {
      print(`FAIL ${f}`)
      n++
    }
  }
  if (!taskDone(ctx, t)) {
    print(`FAIL ${t.writes.join(', ')}: not written yet`)
    n++
  }
  print(`check ${stage} --task ${id}: ${n ? `FAIL (${n})` : 'ok'}`)
  return n ? 1 : 0
}

/** keep a rejected output beside the new one, numbered, instead of deleting it */
function setAside(abs) {
  let k = 1
  while (existsSync(`${abs}.rejected-${k}`)) k++
  renameSync(abs, `${abs}.rejected-${k}`)
}

/** one stage: its tool step, then each wave's subagents (round after round while it creates tasks), combination and gates */
async function runStage({ name, ctxFor, state, print, run, root, paths }) {
  const def = STAGE_DEFS[name]
  const st = state.stages[name]
  let ctx = await ctxFor()
  if (def.prepare) await def.prepare(ctx)
  const all = []
  const feedbackFor = (t) => [...(st.data?.rework?.[t.id] ?? []), ...(t.wave === 0 || t.wave === undefined ? st.data?.feedback ?? [] : [])]
  for (const [w, wave] of def.waves.entries()) {
    let lastTasks = []
    for (let round = 0; round < 25; round++) {
      ctx = await ctxFor()
      if (wave.before) await wave.before(ctx)
      const tasks = (await wave.tasks(ctx)).map((t) => ({ ...t, wave: w }))
      lastTasks = tasks.map((t) => t.id)
      for (const t of tasks) {
        const { missing } = writeBrief(ctx, t, { feedback: feedbackFor(t) })
        if (missing.length) return { status: 'failed', note: `the brief for ${t.id} names files that do not exist: ${missing.join(', ')}`, gates: brief(all) }
      }
      const pending = tasks.filter((t) => !taskDone(ctx, t))
      if (!pending.length) break
      const r = await run(ctx, pending, { briefPath: (t) => briefPath(ctx, t) })
      if (r.status === 'waiting') return { status: 'waiting', waiting: pending.map((t) => ({ task: t.id, role: t.role, brief: paths.rel(briefPath(ctx, t)), writes: t.writes })), gates: brief(all) }
      if (r.status === 'failed') return { status: 'failed', note: r.detail, gates: brief(all), tasks: lastTasks }
      if (round === 24) return { status: 'failed', note: `wave ${w + 1} kept producing new tasks` }
    }
    ctx = await ctxFor()
    const extra = wave.after ? await wave.after(ctx) : null
    ctx = await ctxFor()
    if (extra && typeof extra === 'object' && !Array.isArray(extra)) Object.assign(ctx, extra)
    const g = await runGates(ctx, wave.gates ?? [], print)
    all.push(...g.results)
    if (g.sentBack) return { status: 'sent-back', data: { ...(st.data ?? {}), sentBack: { ...g.sentBack, ...(g.sentBack.file ? { file: paths.rel(g.sentBack.file) } : {}) } }, gates: brief(all) }
    if (!g.ok) return { status: 'failed', gates: brief(all), note: `${g.failures.length} gate failure${g.failures.length === 1 ? '' : 's'} in wave ${w + 1}`, tasks: lastTasks }
  }
  if (name === 'select') {
    const plan = JSON.parse(readFileSync(paths.plan, 'utf8'))
    const inherited = copyInherited(root, paths.dir, plan)
    for (const e of inherited) print(`  inherited ${e.from}/${e.path} → production/inherited/${e.from}/${e.path}`)
    st.data = { ...(st.data ?? {}), inherited }
  }
  if (name === 'review') {
    const { body } = writePr({ ctx: await ctxFor(), state })
    print(`  pull request text: ${paths.rel(body)}`)
  }
  const data = { ...(st.data ?? {}) }
  delete data.rework
  delete data.feedback
  return { status: 'done', gates: brief(all), waiting: [], data }
}

/** stage 12: thumbnail, a preview (or published) build, verify, and every cited post checked live */
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
  if (!step('build.thumbnail-shot', tools.npm('thumbnail', thumbArgs))) return { status: 'failed', gates: brief(results) }
  const t = await buildThumbnail(await ctxFor())
  results.push(t)
  print(`gate ${t.name} ${t.ok ? 'ok' : 'FAIL'}`)
  if (!t.ok) return { status: 'failed', gates: brief(results), note: t.failures.join('; ') }
  if (state.previewOnly) {
    const b = tools.npm('build', [paths.id, '--preview'])
    if (!step('build.preview', b, b.code === 0 && /^built /m.test(b.out))) return { status: 'failed', gates: brief(results), note: 'the preview build failed' }
    const v = await buildPreviewVerify(await ctxFor())
    results.push(v)
    print(`gate ${v.name} ${v.skipped ? 'skip' : v.ok ? 'ok' : 'FAIL'}`)
    for (const f of v.failures) print(`  FAIL ${f}`)
    if (!v.ok) return { status: 'failed', gates: brief(results) }
  } else {
    setStatus(paths, 'published')
    const b = tools.npm('build', [paths.id])
    if (!step('build.build', b, b.code === 0 && /^built /m.test(b.out))) {
      setStatus(paths, 'draft')
      return { status: 'failed', gates: brief(results), note: 'the build failed; the episode is back to draft' }
    }
  }
  if (!step('build.verify', tools.npm('verify', []))) return { status: 'failed', gates: brief(results) }
  // every cited post still exists unchanged, checked over the network by the scraper's command
  const ctx = await ctxFor()
  const g = gate('build.sources-live')
  const r = checkSources(ctx, { file: paths.rel(paths.sources), out: paths.rel(join(paths.production, 'review', 'sources-live.md')) })
  if (r.missing) g.skip(`${r.out}: the cited posts were not checked live`)
  else if (r.code !== 0) g.fail(`npm run sources -- check exited ${r.code}: a cited post is gone or changed, or an account needs a person (review/sources-live.md)`)
  results.push(g.done())
  print(`gate build.sources-live ${g.skipped ? `skip (${g.skipped})` : g.ok ? 'ok' : 'FAIL'}`)
  for (const f of g.failures) print(`  FAIL ${f}`)
  if (!g.ok) return { status: 'failed', gates: brief(results) }
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
    for (const x of g) for (const f of (x.failures ?? []).slice(0, 5)) print(`  FAIL ${x.name}: ${f.length > 200 ? `${f.slice(0, 197)}…` : f}`)
    for (const x of g) if ((x.failures ?? []).length > 5) print(`  FAIL ${x.name}: … and ${x.failures.length - 5} more`)
    for (const x of g) if (x.sentBack) print(`  SEND-BACK ${x.name} → ${x.sentBack.route}: ${x.sentBack.reason}`)
  }
  const next = nextStage(state)
  const st = next ? state.stages[next] : null
  if (st?.waiting?.length) {
    print(`next: ${next}: spawn ${st.waiting.length} subagent${st.waiting.length === 1 ? '' : 's'}, each from its brief, then run produce again:`)
    for (const w of st.waiting) print(`  spawn ${w.role.padEnd(12)} ${w.task.padEnd(34)} brief ${w.brief}`)
  } else print(next ? `next: ${next} (run npm run produce -- --week ${week})` : 'next: nothing (done)')
  return 0
}
