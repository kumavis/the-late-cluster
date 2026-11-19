// production/state.json: where a run is. One entry per stage of docs/WORKFLOW.md with its status,
// the gate results and the stage's data (exclusions, inherited files, a send-back). It also
// remembers the run's settings (runner, digest, bible, ledger, limits, preview-only) so a resume
// needs only --week (trial finding 12). No timestamps.
import { existsSync } from 'node:fs'
import { readJson, writeJson } from './repo.mjs'
import { STAGES } from './stages.mjs'

export { STAGES }
/** pending → waiting (subagents have briefs) → done | failed (a gate) | sent-back (a review routed it elsewhere) */
export const STATUSES = ['pending', 'waiting', 'failed', 'sent-back', 'done']

export function newState({ week, episode, digest, limits, runner = 'manual' }) {
  return {
    format: 'late-cluster-production/2',
    week,
    episode,
    digest,
    limits,
    runner,
    runs: 0,
    stages: Object.fromEntries(STAGES.map((s) => [s, { status: 'pending' }])),
  }
}

export function loadState(file) {
  if (!existsSync(file)) return null
  const s = readJson(file)
  if (s.format !== 'late-cluster-production/2') return null // a run of the first protocol: start over
  for (const name of STAGES) s.stages[name] ??= { status: 'pending' }
  return s
}

export function saveState(file, state) {
  const stages = {}
  for (const name of STAGES) {
    const st = state.stages[name]
    const clean = { status: st.status }
    if (st.note) clean.note = st.note
    if (st.gates?.length) clean.gates = st.gates.map((g) => ({ name: g.name, ok: g.ok, ...(g.skipped ? { skipped: g.skipped } : {}), ...(g.sentBack ? { sentBack: g.sentBack } : {}), ...(g.failures?.length ? { failures: g.failures } : {}), ...(g.warnings?.length ? { warnings: g.warnings } : {}) }))
    if (st.waiting?.length) clean.waiting = st.waiting
    if (st.data && Object.keys(st.data).length) clean.data = st.data
    stages[name] = clean
  }
  writeJson(file, { ...state, stages })
}

/** the first stage that is not done, or null when the run is complete */
export const nextStage = (state) => STAGES.find((s) => state.stages[s].status !== 'done') ?? null

/** reset a stage and everything after it to pending (keeping each stage's exclusions) */
export function resetFrom(state, stage) {
  for (const s of STAGES.slice(STAGES.indexOf(stage))) {
    const excluded = state.stages[s]?.data?.excluded
    state.stages[s] = { status: 'pending', ...(excluded ? { data: { excluded } } : {}) }
  }
}
