// A brief is what the project manager hands one subagent: one file per task, under
// episodes/<id>/production/briefs/<stage>/<task>.md. It says the role (and so which subagent in
// .claude/agents/ to spawn), the lane or segment, what to read, what must not be read, what to
// write and where, and how the task is checked. A brief only points at what its role may read
// (docs/WORKFLOW.md, "Who may read what").
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { mustNotRead, readsFor } from './stages.mjs'

export const briefPath = (ctx, task) => join(ctx.paths.production, 'briefs', task.id.split('.')[0], `${task.id}.md`)

export function renderBrief(ctx, task, { others = [], feedback = [] } = {}) {
  const L = [
    `# ${task.title}`,
    '',
    `- **Role:** ${task.role} (spawn the \`${task.role}\` subagent defined in .claude/agents/${task.role}.md)`,
    `- **Task:** \`${task.id}\`, stage ${task.id.split('.')[0]} of episode \`${ctx.id}\` (window \`${ctx.week}\`)${task.lane ? `, lane \`${task.lane}\`` : ''}${task.segment ? `, segment \`${task.segment}\`` : ''}`,
    `- **Write:** ${task.writes.map((w) => `\`${w}\``).join(', ')}. Nothing else.`,
    `- **Checked by:** \`${task.check}\`, which runs the gates on what you wrote. You are done when it prints no FAIL lines that concern your files.`,
    '',
    '## Read',
    '',
    ...readsFor(ctx, task.role).map((r) => `- ${r}`),
    '',
  ]
  const no = mustNotRead(ctx, task.role, others)
  if (no.length) L.push('## Do not read', '', 'Writers, researchers and builders never see what the show has already done; reviewers do, which is how repetition is caught. Do not open:', '', ...no.map((r) => `- ${r}`), '')
  L.push('## The task', '', ...task.instructions.map((i) => (i.startsWith('- ') ? i : `${i}`)).flatMap((i) => [i, '']))
  if (feedback.length) L.push('## Sent back to you', '', 'The previous output failed these checks. Fix every one, editing your file in place:', '', ...feedback.map((f) => `- ${f}`), '')
  L.push('## Always', '', '- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner\'s: read it, never change it.', '- Real people: their own words, in their own context; nothing invented; the opt-out list is absolute. When in doubt, leave it out and say so.', "- You work alone, from this brief and the files it names. Nobody will answer questions. When you finish, reply with two or three sentences: what you wrote, and anything the next stage should know.", '')
  return L.join('\n')
}

/** write a task's brief (only when it changed, so a resumed run does not churn files) */
export function writeBrief(ctx, task, opts) {
  const f = briefPath(ctx, task)
  const text = renderBrief(ctx, task, opts)
  mkdirSync(dirname(f), { recursive: true })
  if (!existsSync(f) || readFileSync(f, 'utf8') !== text) writeFileSync(f, text)
  return f
}
