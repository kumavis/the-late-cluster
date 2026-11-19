// production/state.json: where a run is. One entry per stage with its status, how many writer
// attempts it took and the last gate results. No timestamps, so a resumed run that does the same
// work writes the same file.
import { existsSync } from 'node:fs'
import { readJson, writeJson } from './repo.mjs'

export const STAGES = ['scrape', 'scaffold', 'pitch', 'write', 'render', 'direct', 'build', 'self-check', 'pr']
export const CREATIVE = new Set(['pitch', 'write', 'direct', 'self-check'])
/** pending → running → done | failed | waiting (a manual writer has the stage) | skipped */
export const STATUSES = ['pending', 'running', 'waiting', 'failed', 'done', 'skipped']

export function newState({ week, episode, digest, limits }) {
  return {
    format: 'late-cluster-production/1',
    week,
    episode,
    digest,
    limits,
    stages: Object.fromEntries(STAGES.map((s) => [s, { status: 'pending', attempts: 0 }])),
  }
}

export function loadState(file) {
  if (!existsSync(file)) return null
  const s = readJson(file)
  for (const name of STAGES) s.stages[name] ??= { status: 'pending', attempts: 0 }
  return s
}

export function saveState(file, state) {
  // stable key order: the stage table in pipeline order
  const stages = {}
  for (const name of STAGES) {
    const st = state.stages[name]
    const clean = { status: st.status, attempts: st.attempts ?? 0 }
    if (st.writer) clean.writer = st.writer
    if (st.note) clean.note = st.note
    if (st.gates?.length) clean.gates = st.gates.map((g) => ({ name: g.name, ok: g.ok, ...(g.skipped ? { skipped: g.skipped } : {}), ...(g.failures?.length ? { failures: g.failures } : {}), ...(g.warnings?.length ? { warnings: g.warnings } : {}) }))
    if (st.data) clean.data = st.data
    stages[name] = clean
  }
  writeJson(file, { ...state, stages })
}

/** the first stage that is not done or skipped, or null when the run is complete */
export const nextStage = (state) => STAGES.find((s) => !['done', 'skipped'].includes(state.stages[s].status)) ?? null

/** reset a stage and everything after it to pending */
export function resetFrom(state, stage) {
  for (const s of STAGES.slice(STAGES.indexOf(stage))) state.stages[s] = { status: 'pending', attempts: 0 }
}
