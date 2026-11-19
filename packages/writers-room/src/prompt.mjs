// The prompt a writer gets for a creative stage: the run's concrete values, what it may touch and
// run, how to check its own work, the previous attempt's failures, then the playbook itself. The
// playbook is generic; everything specific to this run is in the header, so a playbook never has
// to be edited for a week.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { PKG } from './repo.mjs'

export const PLAYBOOK = { pitch: 'pitch.md', write: 'write.md', direct: 'direct.md', 'self-check': 'self-check.md' }

/** what a stage's writer may change and run (paths relative to the repo root) */
export function stageScope({ stage, id, week, lore = 'docs/bible/lore.md' }) {
  const ep = `episodes/${id}`
  const check = `npm run produce -- --week ${week} --check ${stage}`
  const base = { check, read: ['the whole repository', `data/weeks/${week}/ (the digest)`, `shots/${id}/ (review frames)`] }
  switch (stage) {
    case 'pitch':
      return { ...base, edit: [`${ep}/production/pitch.md`, `${ep}/production/plan.json`, `${ep}/episode.json`], run: [check] }
    case 'write':
      return {
        ...base,
        edit: [`${ep}/segments/*/script.js`, `${ep}/cast.js`, `${ep}/looks.js`, `${ep}/episode.json`, `${ep}/production/sources.json`, `${ep}/production/intelligibility.json`, `${ep}/production/pitch.md`, `${ep}/production/plan.json`],
        run: [`npm run segment:new -- ${id} <seg>`, `npm run render -- ${id} <seg>...`, `npm run check -- ${id} [<seg>...]`, `bun packages/show/tools/analyze.ts whisper ${id} <seg>`, check],
      }
    case 'direct':
      return {
        ...base,
        edit: [`${ep}/segments/*/index.js`, `${ep}/looks.js`, `${ep}/production/thumbnail.txt`],
        run: [`npm run shoot -- ${id} <seg> <t>...`, `npm run check -- ${id} [<seg>...]`, check],
      }
    case 'self-check':
      return { ...base, edit: [`${ep}/production/scorecard.md`, lore], run: [check] }
    default:
      throw new Error(`not a creative stage: ${stage}`)
  }
}

export function buildPrompt({ stage, id, week, number, title, digestDir, limits, limitsAreDefault = true, attempt = 1, maxAttempts = 3, feedback = [], lore = 'docs/bible/lore.md', playbooks = join(PKG, 'playbooks') }) {
  const scope = stageScope({ stage, id, week, lore })
  const common = readFileSync(join(playbooks, 'README.md'), 'utf8')
  const book = readFileSync(join(playbooks, PLAYBOOK[stage]), 'utf8')
  const lines = [
    `# The Late Cluster: the ${stage} stage of episode ${id}`,
    '',
    `You are working in a checkout of the show's repository (the current directory). Do the ${stage} stage of the weekly pipeline for one episode by following the playbooks below, then stop. You are not talking to a person: nobody will answer questions. When something is unclear, take the safer choice, which is usually to leave the material out, and say so in the pitch's "Risks and open questions".`,
    '',
    '## This run',
    '',
    `- episode: \`${id}\` (number ${number}${title ? `, working title "${title}"` : ''}), folder \`episodes/${id}/\``,
    `- week: \`${week}\``,
    `- the week's digest: \`${digestDir}/digest.md\` (for reading) and \`${digestDir}/digest.json\` (exact text, URIs, flags)`,
    `- the lore file: \`${lore}\``,
    `- limits for this run: ${JSON.stringify(stripComments(limits))}${limitsAreDefault ? ' (the defaults)' : ' (NOT the defaults: this is a trial run)'}`,
    `- attempt ${attempt} of ${maxAttempts}`,
    '',
    '## What you may change and run',
    '',
    `Change only: ${scope.edit.map((p) => `\`${p}\``).join(', ')}.`,
    `Run only: ${scope.run.map((c) => `\`${c}\``).join(', ')}, plus read-only commands.`,
    'Everything else is refused by the permission settings, so do not try: no git, no gh, no network, no `npm run build`, no `npm run bot`, no other episode, no studio code.',
    '',
    `Check your work before you stop: \`${scope.check}\` runs the gates this stage is held to and prints every failure. The stage is finished when it prints no FAIL lines. The pipeline runs the same gates after you stop and gives you the failures if any remain.`,
  ]
  if (feedback.length) {
    lines.push('', '## The previous attempt failed these gates', '', 'Fix every one, then check again. The files from the previous attempt are still in place: edit them, do not start over unless a failure says so.', '', ...feedback.map((f) => `- ${f}`))
  }
  lines.push('', '---', '', common.trim(), '', '---', '', book.trim(), '')
  return lines.join('\n')
}

const stripComments = (o) => JSON.parse(JSON.stringify(o ?? {}, (k, v) => (k === '$comment' ? undefined : v)))
