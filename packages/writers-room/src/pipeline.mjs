// The orchestrator: one week's episode through the stages, resumable from production/state.json.
//
//   scrape → scaffold → pitch* → write* → render → direct* → build → self-check* → pr
//   (* a writer does it; the gates run after it, and failures go back to it, up to maxAttempts)
//
// Deterministic stages call the repo's own commands through `tools` and respect their exit codes.
// Output is one line per event: `stage <name> …`, `gate <name> ok|FAIL|skip …`, indented details.
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { loadContext } from './context.mjs'
import { buildThumbnail, loreIds, SELF_CHECK_GATES } from './gates/build.mjs'
import { gate } from './gates/common.mjs'
import { DIRECT_GATES } from './gates/direct.mjs'
import { PITCH_GATES } from './gates/pitch.mjs'
import { RENDER_GATES } from './gates/render.mjs'
import { WRITE_GATES } from './gates/write.mjs'
import { constitutionUnchanged, episodeImports, inheritConsistent, pitchDna, pitchInherit, pitchRetro, selfCheckDna } from './gates/dna.mjs'
import { bibleSnapshot } from './dna.mjs'
import { copyInherited, removeInherited } from './inherit.mjs'
import { writePr } from './pr.mjs'
import { buildPrompt } from './prompt.mjs'
import { checkWeek, episodePaths, findEpisodeForWeek, formatEpisodeJson, listEpisodes, PKG, ProduceError, readJson, rel, weekSlug } from './repo.mjs'
import { CREATIVE, loadState, newState, nextStage, resetFrom, saveState, STAGES } from './state.mjs'
import { makeTools } from './tools.mjs'
import { makeWriter } from './writers/index.mjs'

/** a shared gate under a stage's name (pitch.constitution, write.imports, …) */
const as = (fn, name) => Object.defineProperty((ctx) => fn(ctx, name), 'name', { value: name })
export const GATES = {
  pitch: [...PITCH_GATES, pitchRetro, pitchDna, pitchInherit, as(constitutionUnchanged, 'pitch.constitution')],
  write: [...WRITE_GATES, as(inheritConsistent, 'write.inherit'), as(episodeImports, 'write.imports'), as(constitutionUnchanged, 'write.constitution')],
  render: RENDER_GATES,
  direct: [...DIRECT_GATES, as(inheritConsistent, 'direct.inherit'), as(episodeImports, 'direct.imports'), as(constitutionUnchanged, 'direct.constitution')],
  build: [buildThumbnail],
  'self-check': [...SELF_CHECK_GATES, selfCheckDna, as(constitutionUnchanged, 'self-check.constitution')],
}

export function loadConfig({ limitsFile } = {}) {
  const config = readJson(join(PKG, 'config', 'pipeline.json'))
  let custom = null
  if (limitsFile) {
    custom = JSON.parse(JSON.stringify(readJson(resolve(limitsFile)), (k, v) => (k === '$comment' ? undefined : v)))
    config.limits = { ...config.limits, ...custom }
  }
  return { config, custom }
}

/** run a list of gates; print and return { ok, results, failures } */
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
    print(`gate ${r.name} ${r.skipped ? 'skip' : r.ok ? 'ok' : 'FAIL'}${r.skipped ? ` (${r.skipped})` : ''}`)
    for (const f of r.failures) print(`  FAIL ${f}`)
    for (const w of r.warnings) print(`  warn ${w}`)
  }
  const failures = results.flatMap((r) => r.failures.map((f) => `${r.name}: ${f}`))
  return { ok: !failures.length, results, failures }
}

/**
 * produce(options) → exit code. Options: root, week, stage, from, status, check, writer ('claude' |
 * 'manual' | 'fixture'), model, fixture (dir), digest (dir), limits (file), lore (file), network,
 * maxAttempts, tools (injectable), writerImpl (injectable), print.
 */
export async function produce(o) {
  const print = o.print ?? console.log
  const root = resolve(o.root)
  const week = checkWeek(o.week)
  const { config, custom } = loadConfig({ limitsFile: o.limits })
  const maxAttempts = Number(o.maxAttempts ?? config.maxAttempts)
  let found = findEpisodeForWeek(root, week)
  let paths = found ? episodePaths(root, found.id) : null
  let state = paths ? loadState(paths.state) : null

  if (o.status) return printStatus({ print, week, found, state })

  const digestDir = resolve(root, o.digest ?? state?.digest ?? join('data', 'weeks', week))
  const bibleDir = resolve(root, o.bible ?? state?.bible?.dir ?? join('docs', 'bible'))
  const loreFile = resolve(root, o.lore ?? state?.lore ?? join(bibleDir, 'lore.md'))
  const logDir = () => (paths ? join(paths.work, 'logs') : null)
  const tools = o.tools ?? makeTools({ root, logDir: logDir() })
  const ctxFor = async () => {
    const ctx = await loadContext({ root, id: paths.id, week, digestDir, bibleDir, bibleSnapshot: state?.bible?.snapshot, config, limits: state?.limits && state.limits !== 'default' ? { ...config.limits, ...state.limits } : config.limits, tools, network: Boolean(o.network), loreFile })
    ctx.loreIdsBefore = state?.stages?.['self-check']?.data?.loreIdsBefore
    return ctx
  }

  if (o.check) {
    if (!found) throw new ProduceError(`no episode for ${week} yet; run npm run produce -- --week ${week}`)
    if (!GATES[o.check]) throw new ProduceError(`--check takes one of ${Object.keys(GATES).join(', ')}`, 2)
    const { ok } = await runGates(await ctxFor(), GATES[o.check], print)
    print(`check ${o.check} ${found.id}: ${ok ? 'ok' : 'FAIL'}`)
    return ok ? 0 : 1
  }

  // stages 1 and 2 happen before there is an episode folder to hold state.json
  if (!found) {
    if (o.stage && !['scrape', 'scaffold'].includes(o.stage)) throw new ProduceError(`no episode for ${week} yet: run without --stage first`)
    if (existsSync(join(digestDir, 'digest.json'))) print(`stage scrape skip (digest exists: ${rel(root, digestDir)}/digest.json)`)
    else {
      if (o.digest) throw new ProduceError(`no digest.json in ${o.digest}`)
      print(`stage scrape run: npm run scrape -- --week ${week}`)
      const r = tools.npm('scrape', ['--week', week])
      if (r.code !== 0 || !existsSync(join(digestDir, 'digest.json'))) {
        print(`stage scrape FAIL (exit ${r.code})${r.log ? ` log ${rel(root, r.log)}` : ''}`)
        return 1
      }
      print('stage scrape done')
    }
    if (o.stage === 'scrape') return 0
    const r = tools.npm('episode:new', ['--title', `Week ${week}`, '--week', week, '--slug', weekSlug(week)])
    const id = /^created (\S+)/m.exec(r.out)?.[1]
    if (r.code !== 0 || !id) {
      print(`stage scaffold FAIL (exit ${r.code}): ${r.out.trim().split('\n').slice(-1)[0] ?? ''}`)
      return 1
    }
    found = findEpisodeForWeek(root, week)
    paths = episodePaths(root, found.id)
    state = newState({ week, episode: found.id, digest: rel(root, digestDir), limits: custom ?? 'default' })
    if (loreFile !== join(bibleDir, 'lore.md')) state.lore = rel(root, loreFile)
    state.bible = { dir: rel(root, bibleDir), snapshot: bibleSnapshot(bibleDir, config.constitution) }
    if (o.previewOnly) state.previewOnly = true
    state.stages.scrape = { status: 'done', attempts: 0, note: o.digest ? `digest from ${rel(root, digestDir)}` : undefined }
    state.stages.scaffold = { status: 'done', attempts: 0, note: `npm run episode:new created ${found.id}` }
    saveState(paths.state, state)
    print(`stage scaffold done ${found.id}`)
    if (o.stage === 'scaffold') return 0
  }
  if (!state) {
    // an episode folder made by hand for this week: adopt it
    state = newState({ week, episode: found.id, digest: rel(root, digestDir), limits: custom ?? 'default' })
    state.stages.scrape.status = existsSync(join(digestDir, 'digest.json')) ? 'done' : 'pending'
    state.stages.scaffold = { status: 'done', attempts: 0, note: 'adopted an existing episode folder' }
    state.bible = { dir: rel(root, bibleDir), snapshot: bibleSnapshot(bibleDir, config.constitution) }
  }
  if (!state.bible) state.bible = { dir: rel(root, bibleDir), snapshot: bibleSnapshot(bibleDir, config.constitution) }
  if (o.bible && state.bible.dir !== rel(root, bibleDir)) state.bible = { dir: rel(root, bibleDir), snapshot: bibleSnapshot(bibleDir, config.constitution) }
  if (custom && JSON.stringify(state.limits) !== JSON.stringify(custom)) state.limits = custom
  if (o.digest) state.digest = rel(root, digestDir)
  if (o.lore) state.lore = rel(root, loreFile)
  if (o.previewOnly) state.previewOnly = true
  const save = () => saveState(paths.state, state)

  // which stages to run
  let todo
  if (o.from) {
    if (!STAGES.includes(o.from)) throw new ProduceError(`--from takes one of ${STAGES.join(', ')}`, 2)
    resetFrom(state, o.from)
    if (STAGES.indexOf(o.from) <= STAGES.indexOf('build')) setStatus(paths, 'draft')
    if (STAGES.indexOf(o.from) <= STAGES.indexOf('pitch')) removeInherited(paths.dir)
    todo = STAGES.slice(STAGES.indexOf(o.from))
  } else if (o.stage) {
    if (!STAGES.includes(o.stage)) throw new ProduceError(`--stage takes one of ${STAGES.join(', ')}`, 2)
    const before = STAGES.slice(0, STAGES.indexOf(o.stage)).filter((s) => !['done', 'skipped'].includes(state.stages[s].status))
    if (before.length) throw new ProduceError(`${o.stage} needs ${before.join(', ')} done first (npm run produce -- --week ${week})`)
    state.stages[o.stage] = { ...state.stages[o.stage], status: state.stages[o.stage].status === 'waiting' ? 'waiting' : 'pending' }
    todo = [o.stage]
  } else {
    const next = nextStage(state)
    todo = next ? STAGES.slice(STAGES.indexOf(next)) : []
  }
  save()
  if (!todo.length) {
    print(`produce ${found.id}: already done (npm run produce -- --week ${week} --from <stage> to redo one)`)
    return 0
  }

  let writer = null
  const getWriter = () => (writer ??= o.writerImpl ?? makeWriter(o.writer ?? 'claude', { config, model: o.model, dir: o.fixture && resolve(o.fixture), print }))
  const env = { root, week, paths, config, state, print, tools, maxAttempts, loreFile, bibleDir, digestDir, ctxFor, getWriter, save }

  for (const name of todo) {
    if (['scrape', 'scaffold'].includes(name) && state.stages[name].status !== 'pending') continue
    const st = state.stages[name]
    print(`stage ${name} start`)
    let result
    if (name === 'scrape' || name === 'scaffold') result = { status: 'done' }
    else if (CREATIVE.has(name)) result = await creative(env, name)
    else if (name === 'render') result = await renderStage(env)
    else if (name === 'build') result = await buildStage(env)
    else if (name === 'pr') result = await prStage(env)
    state.stages[name] = { ...state.stages[name], note: undefined, ...result, attempts: result.attempts ?? state.stages[name].attempts ?? st.attempts ?? 0 }
    save()
    if (result.status === 'waiting') {
      print(`produce ${found.id}: waiting at ${name}: ${result.note ?? ''}`)
      return 1
    }
    if (result.status !== 'done') {
      print(`stage ${name} FAIL${result.note ? `: ${result.note}` : ''}`)
      print(`produce ${found.id}: stopped at ${name}; fix and run npm run produce -- --week ${week} to resume`)
      return 1
    }
    print(`stage ${name} done${state.stages[name].attempts ? ` attempts=${state.stages[name].attempts}` : ''}`)
  }
  const last = todo.at(-1)
  print(`produce ${found.id}: ${last === 'pr' ? `done; pull request text in ${paths.rel(paths.prBody)}` : `ran ${todo.join(', ')}`}`)
  return 0
}

function setStatus(paths, status) {
  const meta = JSON.parse(readFileSync(paths.episodeJson, 'utf8'))
  if (meta.status === status) return
  meta.status = status
  writeFileSync(paths.episodeJson, formatEpisodeJson(meta))
}

const brief = (results) => results.map((r) => ({ name: r.name, ok: r.ok, skipped: r.skipped, failures: r.failures, warnings: r.warnings }))

/** a creative stage: (gates if a person had it) → writer → gates, retried with the failures */
async function creative(env, stage, { feedbackFrom = null } = {}) {
  const { state, print, maxAttempts, paths, week, root, loreFile, config } = env
  const st = state.stages[stage]
  let attempts = st.attempts ?? 0
  let feedback = feedbackFrom ?? []
  if (stage === 'self-check' && !st.data?.loreIdsBefore) {
    st.data = { ...(st.data ?? {}), loreIdsBefore: existsSync(loreFile) ? loreIds(readFileSync(loreFile, 'utf8')) : [] }
    env.save()
  }
  // a stage handed to a person: their work is checked before anyone is asked again
  if (st.status === 'waiting' && !feedbackFrom) {
    const g = await runGates(await env.ctxFor(), GATES[stage], print)
    if (g.ok) return finish(env, stage, { status: 'done', attempts, gates: brief(g.results) })
    feedback = g.failures
  }
  for (let k = 0; k < maxAttempts; k++) {
    attempts++
    state.stages[stage] = { ...state.stages[stage], status: 'running', attempts }
    env.save()
    const ctx = await env.ctxFor()
    const prompt = buildPrompt({ stage, id: paths.id, week, number: String(paths.number).padStart(3, '0'), title: ctx.meta.title, digestDir: rel(root, ctx.digestDir), limits: ctx.limits, limitsAreDefault: state.limits === 'default', attempt: k + 1, maxAttempts, feedback, lore: rel(root, loreFile), bible: rel(root, env.bibleDir), constitution: config.constitution, others: otherEpisodes(root, paths.id), inherited: inheritedList(state) })
    print(`stage ${stage} attempt ${attempts} writer=${env.getWriter().name}${feedback.length ? ` (${feedback.length} failures to fix)` : ''}`)
    const w = await env.getWriter().run({ stage, prompt, root, id: paths.id, week, paths, attempt: attempts, feedback, loreFile, loreRel: rel(root, loreFile), bibleDir: env.bibleDir, bibleRel: rel(root, env.bibleDir), constitution: config.constitution, others: otherEpisodes(root, paths.id) })
    if (w.status === 'waiting') return { status: 'waiting', attempts, note: w.detail }
    const g = await runGates(await env.ctxFor(), GATES[stage], print)
    if (g.ok) return finish(env, stage, { status: 'done', attempts, gates: brief(g.results), ...(w.status === 'failed' ? { note: `the writer reported: ${w.detail}; the gates passed anyway` } : {}) })
    if (w.status === 'failed') return { status: 'failed', attempts, gates: brief(g.results), note: w.detail }
    feedback = g.failures
    state.stages[stage].gates = brief(g.results)
    env.save()
  }
  return { status: 'failed', attempts, gates: state.stages[stage].gates, note: `the gates still fail after ${maxAttempts} attempts; the failures are above and in production/state.json` }
}

/** every episode folder but this one: what the writer may not read */
export const otherEpisodes = (root, id) => listEpisodes(root).map((e) => e.id).filter((x) => x !== id)
const inheritedList = (state) => (state.stages.pitch?.data?.inherited ?? []).map((e) => `production/inherited/${e.from}/${e.path}`)

/** after a pitch passes: the plan's title and description go into episode.json; inherited files are copied */
async function finish(env, stage, result) {
  if (stage === 'pitch') {
    const plan = readJson(env.paths.plan)
    const inherited = copyInherited(env.root, env.paths.dir, plan)
    result.data = { ...(env.state.stages.pitch.data ?? {}), inherited }
    for (const e of inherited) env.print(`  inherited ${e.from}/${e.path} → production/inherited/${e.from}/${e.path}`)
    const meta = JSON.parse(readFileSync(env.paths.episodeJson, 'utf8'))
    let changed = false
    if (plan.title && meta.title !== plan.title) (meta.title = plan.title), (changed = true)
    if (plan.description && !String(meta.description ?? '').trim()) (meta.description = plan.description), (changed = true)
    if (changed) writeFileSync(env.paths.episodeJson, formatEpisodeJson(meta))
  }
  return result
}

/** stage 4: render everything, check, Whisper; failures go back to the write stage's writer */
async function renderStage(env) {
  const { state, print, tools, paths, maxAttempts } = env
  let attempts = state.stages.render.attempts ?? 0
  for (let k = 0; ; k++) {
    const ctx = await env.ctxFor()
    const segs = ctx.meta.rundown
    print(`stage render run: npm run render -- ${paths.id} ${segs.join(' ')}`)
    const r = tools.npm('render', [paths.id, ...segs])
    let g
    if (r.code !== 0) {
      const x = gate('render.render')
      x.fail(`npm run render exited ${r.code}: ${r.out.split('\n').filter((l) => /✗|error/i.test(l)).slice(0, 10).join(' | ')}`)
      g = { ok: false, results: [x.done()], failures: x.failures.map((f) => `render.render: ${f}`) }
      print(`gate render.render FAIL`)
    } else g = await runGates(ctx, GATES.render, print)
    if (g.ok) return { status: 'done', attempts, gates: brief(g.results) }
    if (k >= maxAttempts) return { status: 'failed', attempts, gates: brief(g.results), note: `render gates still fail after ${attempts} rewrites` }
    // hand the failures to the write stage's writer, then re-check the write gates
    attempts++
    state.stages.render = { ...state.stages.render, status: 'running', attempts, gates: brief(g.results) }
    env.save()
    print(`stage render: back to the write stage's writer with ${g.failures.length} failures`)
    const w = await creative(env, 'write', { feedbackFrom: g.failures })
    state.stages.write = { ...state.stages.write, note: undefined, ...w }
    env.save()
    if (w.status === 'waiting') return { status: 'waiting', attempts, note: w.note }
    if (w.status !== 'done') return { status: 'failed', attempts, note: 'the rewrite for the render gates failed the write gates' }
  }
}

/** stage 6: thumbnail, publish, build into dist/, verify */
async function buildStage(env) {
  const { print, tools, paths } = env
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
  if (!step('build.thumbnail-shot', tools.npm('thumbnail', thumbArgs))) return { status: 'failed', gates: results }
  const t = await buildThumbnail(await env.ctxFor())
  results.push(t)
  print(`gate ${t.name} ${t.ok ? 'ok' : 'FAIL'}`)
  if (!t.ok) return { status: 'failed', gates: results, note: t.failures.join('; ') }
  if (env.state.previewOnly) {
    // a trial that must stay unpublished: a draft built into preview/<id>/ (gitignored), never dist/
    print(`stage build run: npm run build -- ${paths.id} --preview  (preview only: the episode stays a draft)`)
    const b = tools.npm('build', [paths.id, '--preview'])
    if (!step('build.preview', b, b.code === 0 && /^built /m.test(b.out))) return { status: 'failed', gates: results, note: 'the preview build failed' }
    print(`  ${/^built .*$/m.exec(b.out)[0]}`)
  } else {
    setStatus(paths, 'published')
    print(`stage build run: npm run build -- ${paths.id}`)
    const b = tools.npm('build', [paths.id])
    if (!step('build.build', b, b.code === 0 && /^built /m.test(b.out))) {
      setStatus(paths, 'draft')
      return { status: 'failed', gates: results, note: 'the build failed; the episode is back to draft' }
    }
    print(`  ${/^built .*$/m.exec(b.out)[0]}`)
  }
  print('stage build run: npm run verify')
  const v = tools.npm('verify', [])
  if (!step('build.verify', v)) return { status: 'failed', gates: results }
  return { status: 'done', gates: results }
}

async function prStage(env) {
  const ctx = await env.ctxFor()
  const { title, body } = writePr({ ctx, state: env.state })
  env.print(`  title ${env.paths.rel(title)}`)
  env.print(`  body  ${env.paths.rel(body)}`)
  return { status: 'done', gates: [] }
}

function printStatus({ print, week, found, state }) {
  if (!found) {
    print(`status ${week}: no episode yet`)
    return 0
  }
  print(`status ${week} ${found.id} (${found.meta.status})`)
  if (!state) {
    print('  no production/state.json: not started by the pipeline')
    return 0
  }
  for (const s of STAGES) {
    const st = state.stages[s]
    const g = st.gates ?? []
    print(`${s.padEnd(10)} ${st.status}${st.attempts ? ` attempts=${st.attempts}` : ''}${g.length ? ` gates=${g.filter((x) => x.ok).length}/${g.length}` : ''}${st.note ? `  (${st.note})` : ''}`)
    for (const x of g) for (const f of x.failures ?? []) print(`  FAIL ${x.name}: ${f}`)
  }
  const next = nextStage(state)
  print(next ? `next: ${next}` : 'next: nothing (done)')
  return 0
}
