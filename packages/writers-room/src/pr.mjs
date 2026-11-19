// What the reviewer needs, written to production/pr-title.txt and production/pr-body.md for
// `gh pr create --title "$(cat …)" --body-file …`: the plan at a glance, gate results and every
// warning with its answer, the pitch's risks, the real accounts and posts used, the writer's
// self-check scorecard, how to watch the preview, and the reviewer's checklist from bible 09.
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { reviewerChecklist } from './bible.mjs'
import { bibleChanges, parseAmendments } from './dna.mjs'
import { join, relative, sep } from 'node:path'
import { normHandle } from './digest.mjs'
import { sections } from './gates/pitch.mjs'
import { realLines } from './gates/write.mjs'
import { STAGES } from './state.mjs'

const readIf = (f) => (existsSync(f) ? readFileSync(f, 'utf8') : null)
const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')

export function prTitle({ meta, week }) {
  return `Episode ${String(meta.number).padStart(3, '0')}: ${meta.title} (week ${week})`
}

export function prBody({ ctx, state, branch }) {
  const { meta, paths, plan, sources } = ctx
  const out = []
  const P = (...l) => out.push(...l)
  P(`**${meta.title}** · episode ${meta.id} · week ${ctx.week} · air date ${meta.airDate}`, '', meta.description ?? '', '')
  P('> Produced by the weekly pipeline (`npm run produce`). Nothing has aired. **Merging this pull request publishes the episode** (the Pages deploy runs on merge); the announcement is a separate, manual workflow. The show puts words in the mouths of puppets that stand for real people: read every script and watch the whole preview with sound before you approve.', '')
  if (state.previewOnly) P('> **Preview only.** This run never set the episode to `published` and never built it into `dist/`: it is a draft, built into `preview/` (gitignored). Do not merge it as an episode.', '')
  if (state.limits !== 'default') P(`> **Trial limits.** This run used non-default limits: \`${JSON.stringify(state.limits, (k, v) => (k === '$comment' ? undefined : v))}\`.`, '')

  // the change to the show itself, before the episode
  if (plan) P(...dnaSection(ctx, state))

  // the plan
  if (plan) {
    P('## The episode', '', `**Question:** ${typeof plan.question === 'string' ? plan.question : plan.question?.text ?? ''}`, '')
    P('| segment | format | planned | rendered | BUILT | notes |', '|---|---|---|---|---|---|')
    for (const s of plan.segments ?? []) {
      const cues = readIf(paths.segFile(s.id, 'cues.json'))
      const dur = cues ? `${JSON.parse(cues).duration.toFixed(1)} s` : '—'
      const notes = [s.genre && `song: ${s.genre}; ${s.theme}`, s.thread && `thread of ${s.thread.posts?.length ?? 0} posts`, s.topChicken && `Top Chicken: ${s.topChicken}`].filter(Boolean).join('; ')
      P(`| ${s.id} | ${cell(s.format)} | ${s.seconds} s | ${dur} | ${s.built ? s.built.join(' → ') : ''} | ${cell(notes)} |`)
    }
    if ((plan.cut ?? []).length) P('', '**Cut, and why:**', ...plan.cut.map((c) => `- ${c.what}: ${c.why}`))
    P('')
  }

  // gates and warnings
  P('## Gates', '', 'Deterministic checks the pipeline ran between stages. They do not judge taste, context or the repost test: those are yours.', '')
  const warnings = []
  const skipped = []
  for (const name of STAGES.filter((s) => s !== 'pr')) {
    const st = state.stages[name]
    const gates = st.gates ?? []
    if (!gates.length) {
      P(`- **${name}**: ${st.status}${st.note ? ` (${st.note})` : ''}`)
      continue
    }
    P(`- **${name}**: ${st.status}, ${gates.filter((g) => g.ok).length}/${gates.length} gates passed${st.attempts ? `, ${st.attempts} writer attempt${st.attempts === 1 ? '' : 's'}` : ''}`)
    for (const g of gates) {
      if (g.skipped) skipped.push(`${g.name}: ${g.skipped}`)
      for (const w of g.warnings ?? []) warnings.push(`${g.name}: ${w}`)
    }
  }
  if (skipped.length) P('', '**Skipped checks** (look at these yourself):', ...skipped.map((s) => `- ${s}`))
  const fresh = warnings.filter((w) => /^pitch\.freshness/.test(w))
  if (fresh.length) P('', '**Freshness warnings** (bible 03, fixed and fresh), with the writer\'s answers:', ...fresh.map((w) => `- ${w.replace(/^pitch\.freshness: /, '')}`))
  const waived = warnings.filter((w) => /waived:/.test(w))
  if (waived.length) P('', '**Waived Whisper failures** (listen to these lines):', ...waived.map((w) => `- ${w.replace(/^render\.whisper: /, '')}`))
  const other = warnings.filter((w) => !/^pitch\.freshness/.test(w) && !waived.includes(w))
  if (other.length) P('', '<details><summary>Other notes from the gates</summary>', '', ...other.map((w) => `- ${w}`), '', '</details>')
  P('')

  // risks
  const pitch = readIf(paths.pitch)
  const risks = pitch ? [...sections(pitch)].find(([k]) => k.startsWith('risks'))?.[1]?.trim() : null
  P('## Risks and open questions (from the pitch)', '', risks || '_The pitch has no risks section._', '')

  // sources
  P('## Real accounts and posts used', '', 'From `production/sources.json`. Every one must pass chapter 9; small accounts only as heroes (R7).', '')
  if (sources) {
    P('| account | role | played as | followers | |', '|---|---|---|---|---|')
    for (const a of sources.accounts ?? []) {
      const d = ctx.digest.accounts.get(normHandle(a.handle))
      P(`| @${cell(normHandle(a.handle))} | ${cell(a.role)} | ${cell(a.cast ?? '')} | ${d?.followers ?? '?'} | ${d?.small ? '**small account**' : ''} |`)
    }
    P('', '| post | author | use | segment |', '|---|---|---|---|')
    for (const p of sources.posts ?? []) {
      const d = ctx.digest.posts.get(p.uri)
      P(`| ${d?.url ? `[${cell(p.uri.split('/').pop())}](${d.url})` : cell(p.uri)} | @${cell(normHandle(p.author))} | ${cell(p.use)} | ${cell(p.segment ?? '')} |`)
    }
    if ((sources.links ?? []).length) P('', '**Links:**', ...sources.links.map((l) => `- ${typeof l === 'string' ? l : `${l.url}${l.use ? ` (${l.use})` : ''}`}`))
    if ((sources.numbers ?? []).length) P('', '**Numbers about people (R12):**', ...sources.numbers.map((n) => `- ${cell(n.statement ?? JSON.stringify(n))}`))
  } else P('_No sources.json._')
  P('')

  // every line a real account's puppet performs, beside the occasion it was said on
  const real = realLines(ctx)
  if (real.length) {
    P('## Real people\'s lines, as staged and as said', '', 'A real line may be performed in an exchange the show stages only if that exchange recreates the occasion it was said on: the same kind of prompt, the same meaning. No gate can judge that. Compare each staged setup with the original.', '')
    const quote = (who, text) => `> **${cell(who)}:** ${cell(text ?? '')}`
    for (const r of real) {
      P(`**\`${r.at}\`** (${r.kind}${r.source?.url ? `, [post](${r.source.url})` : ''})`, '')
      P(r.setup ? quote(`staged setup, ${r.setup.who}`, r.setup.text) : '> *(first line of the segment: no setup)*', '>', quote(`${r.who} (@${r.handle})`, r.text), '>')
      if (!r.original.length) P('> **original:** *none cited*')
      for (const o of r.original) P(o.post ? quote(`original, ${o.label}${o.post.handle ? `, @${o.post.handle}` : ''}`, o.post.text ?? o.post.uri) + (o.post.url ? ` ([post](${o.post.url}))` : '') : `> **original:** ${o.label}; the situation it was said in: ${cell(o.situation ?? 'not recorded')}`)
      P('')
    }
  }

  // scorecard
  const card = readIf(paths.scorecard)
  P('## The writer\'s self-check', '', 'The model\'s own scorecard. Fill in your own (bible 10, the scorecard); do not take these scores on trust.', '', '<details><summary>scorecard.md</summary>', '', card ? card.trim() : '_missing_', '', '</details>', '')

  // how to watch
  P('## Watch it', '', '```sh', `git fetch origin ${branch} && git checkout ${branch}`, 'npm ci', 'npm run preview            # then open the printed URL and go to /episodes/' + meta.id + '/', '```', '', `Or \`npm run dev -- ${meta.id}\` to scrub segment by segment (\`?seg=<id>\`). Review frames are attached to the workflow run as an artifact (\`shots/${meta.id}/\`).`, '')

  // the reviewer's checklist
  const list = reviewerChecklist(ctx.bibleDir)
  P('## Reviewer\'s checklist (bible 09, "What the reviewer checks")', '', 'Any "no" is a send-back.', '')
  if (list.error) P(`_${list.error}: read the chapter directly._`)
  else P(...list.items.map((i) => `- [ ] ${i}`))
  P('', '- [ ] The lore change (`docs/bible/lore.md`: the episode log entry and the rotation log row) is true and sourced.', '- [ ] I watched the whole preview with sound.')
  return out.join('\n') + '\n'
}

/** the retro, the experiment and its result, what was inherited, and the DNA edits */
export function dnaSection(ctx, state) {
  const { plan, paths } = ctx
  const out = ['## This pull request also changes the show', '', 'Approving it approves the DNA edits below as well as the episode. The constitution (' + ctx.config.constitution.map((f) => `\`${f}\``).join(', ') + ') is the owner\'s and must be untouched.', '']
  const r = plan.retro
  if (r) {
    const j = (xs) => (xs ?? []).map((x) => String(x).replace(/[.\s]+$/, '')).join('; ') || '—'
    out.push(`**Retro of ${r.episode}.** Worked: ${j(r.worked)}. Didn't: ${j(r.didnt)}.`)
    const links = (r.reactions ?? []).map((u) => ctx.digest.posts.get(u)?.url ?? u)
    out.push(`Reactions: ${links.length ? links.map((u) => `<${u}>`).join(', ') : `none cited (${r.reactionsNote ?? 'no reason given'})`}.`, '')
  } else out.push('**Retro:** none (no earlier published episode).', '')
  const d = plan.dna ?? {}
  if ((d.keep ?? []).length) out.push(`**Keep:** ${d.keep.join('; ')}.`)
  if ((d.change ?? []).length) out.push(`**Change:** ${d.change.map((c) => `${c.what} (because ${c.why})`).join('; ')}.`)
  const e = d.experiment
  const am = parseAmendments(readIf(join(paths.production, 'dna-amendments.md')) ?? '')
  if (e) out.push('', `**Experiment:** ${e.what}. Why: ${e.why}. Success: ${e.success}.`, `Writer's verdict before air: **${am.verdict ?? 'not recorded'}**. Judge it again after air, in the next retro.`)
  out.push('')
  const inh = state.stages.pitch?.data?.inherited ?? []
  if (inh.length) out.push('**Inherited** (read-only reference in `production/inherited/`; nothing is imported from it):', ...inh.map((x) => `- \`${x.from}/${x.path}\`: ${(plan.inherit ?? []).find((i) => i.from === x.from && i.path === x.path)?.why ?? ''}`), '')
  else out.push('**Inherited:** nothing. Built fresh.', '')
  if (state.bible?.snapshot) {
    const ch = bibleChanges(state.bible.snapshot, ctx.bibleDir, ctx.config.constitution)
    const lore = relative(ctx.bibleDir, ctx.loreFile).split(sep).join('/')
    const edits = ch.dna.filter((c) => c.file !== lore)
    out.push(`**DNA edits in this pull request** (${edits.length ? edits.length : 'none'}):`)
    for (const c of edits) out.push(`- \`docs/bible/${c.file}\` (${c.change}): ${am.files.find((f) => f.file === c.file)?.summary ?? '**not described in dna-amendments.md**'}`)
    if (!edits.length) out.push(`- none${am.none ? `: ${am.none}` : ''}`)
    if (ch.dna.some((c) => c.file === lore)) out.push(`- \`docs/bible/${lore}\`: the episode's routine lore entries`)
    out.push('', ch.constitutionChanged.length ? `**The constitution changed: ${ch.constitutionChanged.join(', ')}. Do not merge.**` : 'The constitution is unchanged (checked against the hashes taken when the run started).', '')
  }
  return out
}

export function writePr({ ctx, state, branch = `episode/${ctx.meta.id}` }) {
  writeFileSync(ctx.paths.prTitle, prTitle({ meta: ctx.meta, week: ctx.week }) + '\n')
  writeFileSync(ctx.paths.prBody, prBody({ ctx, state, branch }))
  return { title: ctx.paths.prTitle, body: ctx.paths.prBody }
}
