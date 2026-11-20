// The thirteen stages of docs/WORKFLOW.md (workflow v3). Each stage is a list of waves; a wave is a
// set of subagent tasks that work independently (each writes its own file), then the tool's step
// (combine what they wrote), then that wave's gates. A wave may have a `before` step the tool runs
// each round (fitting what changed, re-shooting what changed) and may create tasks as it goes (a
// repeat creates a rework, a send-back a fix). Tasks become briefs (src/briefs.mjs); the tool never
// calls a model. The definitions live in src/stage/: early (1-6), drafts (7-9), late (10-13).
import { EARLY } from './stage/early.mjs'
import { DRAFTS } from './stage/drafts.mjs'
import { LATE } from './stage/late.mjs'

import { STAGES } from './stage-names.mjs'

export { STAGES, TITLES } from './stage-names.mjs'
export const STAGE_DEFS = { ...EARLY, ...DRAFTS, ...LATE }
for (const s of STAGES) if (!STAGE_DEFS[s]) throw new Error(`stage ${s} has no definition`)

export { coverage } from './coverage.mjs'
export { draftPlan } from './stage/early.mjs'
export { readDrafts, selection } from './stage/drafts.mjs'
export { addedLines } from './stage/late.mjs'
