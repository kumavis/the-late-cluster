// A brief is what one subagent is given for one task: episodes/<id>/production/briefs/<stage>/<task>.md.
// It names the role, the one place to write, the task's own scratch folder, a check command that
// prints only that task's lines, a short reading list (the constitution, the chapters this kind of
// task needs from config reading.kinds, the files it works from: never the whole bible), the gate's
// rules for the task, the terms of use of its cards (research/terms.md), and, on a later round, what
// the earlier round asked for and what came back. Every file a brief names exists (trial finding 31).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { PRONOUN_RULE, briefCards, peopleOfCards } from './pronouns.mjs'

export const briefPath = (ctx, task) => join(ctx.paths.production, 'briefs', task.stage, `${task.id}.md`)
export const scratchDir = (ctx, task) => `${ctx.config.scratch.dir.replace('{id}', ctx.id)}/${task.id}`

const NEVER = {
  writer: "the ledger (docs/ledger/), docs/trials/, earlier episodes and their builds, frames or git history, this episode's production/review/, other writers' files.",
  researcher: "the ledger, docs/trials/, earlier episodes, this episode's production/review/; never propose a joke or retype a post.",
  builder: "the ledger, docs/trials/, earlier episodes, this episode's production/review/; never change a script or what a real person is shown saying.",
  'sound-editor': "the ledger, docs/trials/, earlier episodes, production/review/; never change what a line says (only `as` respellings and voices), never cut a real person's words.",
  auditor: 'judging whether anything is funny, rewriting what you check, the network except through npm run sources and npm run media.',
  reviewer: 'rewriting what you judge, putting anything from the ledger into a file a writer reads beyond the one "avoid" line, the network.',
}

/** the reading list: the constitution, the chapters for this kind of task, then the files it works from */
export function readingList(ctx, task) {
  const r = ctx.config.reading
  const kinds = r.kinds ?? {}
  if (kinds[task.kind] === null) return { list: [], missing: [] }
  const bible = ctx.paths.rel(ctx.bibleDir)
  const chapters = [...(r.always ?? []), ...(kinds[task.kind] ?? kinds[task.stage] ?? [])]
  const list = [...new Set(chapters)].filter((c) => existsSync(join(ctx.bibleDir, c))).map((c) => `${bible}/${c}`)
  const missing = []
  for (const f of task.reads ?? []) {
    const optional = f.endsWith('?')
    const p = optional ? f.slice(0, -1) : f
    const abs = join(ctx.root, p.split(' ')[0])
    if (existsSync(abs)) list.push(p)
    else if (!optional) missing.push(p)
  }
  return { list, missing }
}

/** the terms of use of these cards, from research/terms.md */
export function termsFor(ctx, cards) {
  const f = join(ctx.paths.production, 'research', 'terms.md')
  if (!cards?.length || !existsSync(f)) return []
  const md = readFileSync(f, 'utf8')
  return cards.map((id) => {
    const m = new RegExp(`^## ${id.replace(/[-]/g, '\\-')}\\s*$([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'm').exec(md)
    return { id, text: m ? m[1].trim() : 'none recorded' }
  })
}

export function renderBrief(ctx, task, { feedback = [], earlier: before = [] } = {}) {
  const earlier = [...(task.earlier ?? []), ...before]
  const { list, missing } = readingList(ctx, task)
  if (task.role === 'viewer') return { text: [`# ${task.title}`, '', ...task.instructions, '', `Write your answer to \`${task.writes[0]}\`.`, ''].join('\n'), missing }
  const L = [
    `# ${task.title}`,
    '',
    `- **Role:** \`${task.role}\` (.claude/agents/${task.role}.md)`,
    `- **Task:** \`${task.id}\`, stage \`${task.stage}\` of episode \`${ctx.id}\` (window \`${ctx.week}\`)${task.lane ? `, lane \`${task.lane}\`` : ''}${task.segment ? `, segment \`${task.segment}\`` : ''}`,
    `- **Write:** ${task.writes.map((w) => `\`${w}\``).join(', ')}${task.alsoEdits?.length ? `; you may also edit ${task.alsoEdits.map((w) => `\`${w}\``).join(', ')}` : ''}. Nothing else.`,
    `- **Scratch:** \`${scratchDir(ctx, task)}/\`, yours alone; nothing there is kept.`,
    `- **Check:** \`${task.check}\` prints only this task's lines. You are done when it ends \`ok\`.`,
    '',
    '## Read',
    '',
    ...list.map((r) => `- ${r}`),
    '',
    '## The task',
    '',
    ...task.instructions.flatMap((i) => [i, '']),
  ]
  if (task.rules.length) L.push('## What the check enforces', '', ...task.rules.map((r) => `- ${r}`), '')
  const terms = termsFor(ctx, task.cards)
  if (terms.length) L.push('## Terms of use', '', ...terms.flatMap((t) => [`**${t.id}:** ${t.text}`, '']))
  // stated pronouns: every brief carries the rule; one that names people lists them (README "Pronouns")
  const people = peopleOfCards(ctx, briefCards(ctx, task))
  L.push('## People and pronouns', '', PRONOUN_RULE, '')
  if (people.length) L.push(...people.map((p) => `- @${p.handle}: ${p.pronouns}`), '')
  if (earlier.length) L.push('## The earlier round', '', ...earlier.map((e) => `- ${e}`), '')
  if (feedback.length) L.push('## Sent back to you', '', 'Fix every one, in place:', '', ...feedback.map((f) => `- ${f}`), '')
  L.push('## Never', '', `Never read or do: ${NEVER[task.role] ?? NEVER.writer} Never change the constitution. Nobody will answer questions. When you finish, reply in two or three sentences.`, '')
  return { text: L.join('\n'), missing }
}

/** write a task's brief (only when it changed, so a resumed run does not churn files) → { file, missing } */
export function writeBrief(ctx, task, opts) {
  const f = briefPath(ctx, task)
  const { text, missing } = renderBrief(ctx, task, opts)
  mkdirSync(dirname(f), { recursive: true })
  mkdirSync(join(ctx.root, scratchDir(ctx, task)), { recursive: true })
  if (!existsSync(f) || readFileSync(f, 'utf8') !== text) writeFileSync(f, text)
  return { file: f, missing }
}
