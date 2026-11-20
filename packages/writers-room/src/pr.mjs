// What the reviewer of the pull request needs, written to production/pr-title.txt and
// production/pr-body.md for `gh pr create`: why each segment was picked (every number and reason),
// the repetition verdicts, the people warnings, each real line beside its staged setup and its
// original occasion, the real accounts used, the reviewer's scorecard and ledger entry, any edit to
// the craft bible, how to watch, and the reviewer's checklist from chapter 9.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { reviewerChecklist } from './bible.mjs'
import { bibleChanges, parseAmendments } from './dna.mjs'
import { normHandle } from './digest.mjs'
import { realLines } from './gates/write.mjs'
import { STAGES } from './stage-names.mjs'

const readIf = (f) => (existsSync(f) ? readFileSync(f, 'utf8') : null)
const jsonIf = (f) => (existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null)
const readdirIf = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.json')).sort() : [])
const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')

export const prTitle = ({ meta, week }) => `Episode ${String(meta.number).padStart(3, '0')}: ${meta.title} (${week})`

export function prBody({ ctx, state, branch }) {
  const { meta, paths } = ctx
  const prod = paths.production
  const out = []
  const P = (...l) => out.push(...l)
  P(`**${meta.title}** · episode ${meta.id} · ${ctx.week} · air date ${meta.airDate}`, '', meta.description ?? '', '')
  P('> Produced by the weekly pipeline (docs/WORKFLOW.md): research, brainstorm, ranking and selection by subagents, blocking review for repetition, deterministic gates. Nothing has aired. **The owner watches the whole episode with sound before anything is published.**', '')
  if (state.previewOnly) P('> **Preview only.** The episode is a draft built into `preview/`; it was never set to `published` or built into `dist/`.', '')
  if (state.limits !== 'default') P(`> **Trial limits:** \`${JSON.stringify(state.limits)}\`.`, '')
  if (state.settings) P(`> **Trial settings:** \`${JSON.stringify(state.settings)}\`.`, '')

  // why these segments
  const sel = jsonIf(join(prod, 'select/scores.json'))
  if (sel) {
    P('## Why these segments', '', `Each draft scored 0 to 10 by ${ctx.config.parallel.reviewers} reviewers; weights ${Object.entries(sel.weights).map(([k, w]) => `${k} ${w}`).join(', ')}; filled toward ${sel.targetSeconds} s, ceiling ${sel.maxSeconds} s.`, '')
    P('| draft | selected | score | funny | interesting | television | variety | seconds | why |', '|---|---|---|---|---|---|---|---|---|')
    for (const r of sel.drafts) P(`| ${r.slug}${r.standing ? ' (standing)' : ''} | ${r.selected ? '✓' : ''} | ${r.score} | ${r.funny} | ${r.interesting} | ${r.television} | ${r.variety} | ${r.seconds} | ${cell(r.why)} |`)
    const reasons = readdirIf(join(prod, 'review/select')).map((f) => jsonIf(join(prod, 'review/select', f))).filter(Boolean)
    P('', '<details><summary>Reviewers\' reasons</summary>', '', ...reasons.flatMap((r) => Object.entries(r.drafts ?? {}).map(([slug, x]) => `- ${slug}, ${r.reviewer}: ${cell(x.reason)}`)), '', '</details>', '')
  }
  const cards = jsonIf(join(prod, 'rank/cards.json'))
  const rank = jsonIf(join(prod, 'rank/scores.json'))
  if (cards && rank) {
    P('## How the material was ranked', '', `Reach stands in for how many people saw it (Bluesky does not publish views). Cards: ${Object.entries(cards.weights).map(([k, w]) => `${k} ${w}`).join(', ')}; shortlist: ${Object.entries(rank.weights).map(([k, w]) => `${k} ${w}`).join(', ')}.`, '')
    P('| card | reach | interest | rank | best joke | synergy | variety | final | shortlisted |', '|---|---|---|---|---|---|---|---|---|')
    for (const r of rank.cards) {
      const c = cards.cards.find((x) => x.card === r.card) ?? {}
      P(`| ${r.card}${r.interview ? ' (interview)' : ''} | ${c.reach ?? ''} | ${c.interest ?? ''} | ${r.rank} | ${r.bestJoke} | ${r.synergy} | ${r.variety} | ${r.final} | ${r.shortlisted ? '✓' : ''} |`)
    }
    P('')
  }

  // repetition and people
  P('## Repetition and people', '')
  for (const [label, file] of [['ideas', 'review/repetition-ideas.json'], ['scripts', 'review/repetition-scripts.json'], ['lines added at assembly', 'review/repetition-assembly.json']]) {
    const j = jsonIf(join(prod, file))
    if (!j) continue
    const v = Object.values(j.verdicts ?? {})
    P(`**${label}:** ${v.filter((x) => x.verdict === 'fresh').length} fresh, ${v.filter((x) => x.verdict === 'turned').length} turned, ${v.filter((x) => x.verdict === 'repeat').length} repeat.`)
    for (const x of v.filter((x) => x.verdict === 'turned')) P(`- turned ${x.id}${x.fromPrevious ? ' (carries something forward from the previous episode)' : ''}: ${x.verdicts.filter((y) => y.turned).map((y) => `${y.turned.what} → ${y.turned.how}`).join(' / ')}`)
    for (const x of v.filter((x) => x.verdict === 'repeat')) P(`- repeat ${x.id}: blocked; ${x.verdicts.map((y) => y.avoid).filter(Boolean).join(' / ')}`)
  }
  const warnings = STAGES.flatMap((s) => (state.stages[s].gates ?? []).flatMap((g) => (g.warnings ?? []).map((w) => ({ gate: g.name, w }))))
  const people = warnings.filter((x) => /often featured|featured before/.test(x.w))
  if (people.length) P('', '**People** (fresh people are preferred; nobody is barred):', ...[...new Set(people.map((x) => x.w))].map((w) => `- ${w}`))
  P('')

  // real lines beside their occasion
  const real = realLines(ctx)
  if (real.length) {
    P("## Real people's lines, as staged and as said", '', 'A real line may be performed in an exchange the show stages only if that exchange recreates the occasion it was said on. No gate can judge that: compare each staged setup with the original.', '')
    const quote = (who, text) => `> **${cell(who)}:** ${cell(text ?? '')}`
    for (const r of real) {
      P(`**\`${r.at}\`** (${r.kind}${r.source?.url ? `, [post](${r.source.url})` : ''})`, '')
      P(r.setup ? quote(`staged setup, ${r.setup.who}`, r.setup.text) : '> *(no setup)*', '>', quote(`${r.who} (@${r.handle})`, r.text), '>')
      for (const o of r.original) P(o.post ? quote(`original, ${o.label}${o.post.handle ? `, @${o.post.handle}` : ''}`, o.post.text ?? o.post.uri) : `> **original:** ${o.label}; the situation it was said in: ${cell(o.situation ?? 'not recorded')}`)
      P('')
    }
  }

  // sources
  const sources = ctx.sources
  P('## Real accounts and posts used', '')
  if (sources) {
    P('| account | DID | role | played as | followers | |', '|---|---|---|---|---|---|')
    for (const a of sources.accounts ?? []) {
      const d = ctx.digest.accounts.get(normHandle(a.handle))
      P(`| @${cell(normHandle(a.handle))} | ${cell(a.did ?? '')} | ${cell(a.role)} | ${cell(a.cast ?? '')} | ${d?.followers ?? '?'} | ${d?.small ? '**small account**' : ''} |`)
    }
    P('', '| post | author | use | segment |', '|---|---|---|---|')
    for (const p of sources.posts ?? []) P(`| ${ctx.digest.posts.get(p.uri)?.url ? `[${cell(p.uri.split('/').pop())}](${ctx.digest.posts.get(p.uri).url})` : cell(p.uri)} | @${cell(normHandle(p.author))} | ${cell(p.use)} | ${cell(p.segment ?? '')} |`)
  } else P('_No sources.json._')
  P('')

  // gates
  P('## Gates', '')
  for (const s of STAGES) {
    const st = state.stages[s]
    const gates = st.gates ?? []
    P(`- **${s}**: ${st.status}${gates.length ? `, ${gates.filter((g) => g.ok && !g.skipped).length}/${gates.length} passed` : ''}${gates.some((g) => g.skipped) ? `; skipped: ${gates.filter((g) => g.skipped).map((g) => `${g.name} (${g.skipped})`).join('; ')}` : ''}`)
  }
  const waived = warnings.filter((x) => /waived|judged harmless/.test(x.w))
  if (waived.length) P('', '**Waivers** (listen to these lines):', ...waived.map((x) => `- ${x.w}`))
  P('')

  // the review, the ledger and the bible
  const review = jsonIf(join(prod, 'review.json'))
  P('## The review', '', `Verdict: **${review?.verdict ?? 'none'}**${review?.reasons?.length ? `: ${review.reasons.join('; ')}` : ''}`, '', '<details><summary>scorecard.md</summary>', '', readIf(paths.scorecard)?.trim() ?? '_missing_', '', '</details>', '')
  P(`The episode's ledger entry (\`${paths.rel(join(ctx.ledgerDir, ctx.id + '.json'))}\`, \`.md\`) and the featured tracker (\`featured.json\`) are in this pull request.`, '')
  if (state.bible?.snapshot) {
    const ch = bibleChanges(state.bible.snapshot, ctx.bibleDir, ctx.config.constitution)
    const am = parseAmendments(readIf(join(prod, 'dna-amendments.md')) ?? '')
    if (ch.dna.length) P('**Edits to the craft bible in this pull request:**', ...ch.dna.map((c) => `- \`${c.file}\` (${c.change}): ${am.files.find((f) => f.file === c.file)?.summary ?? '**not described in dna-amendments.md**'}`), '')
    P(ch.constitutionChanged.length ? `**The constitution changed (${ch.constitutionChanged.join(', ')}). Do not merge.**` : 'The constitution is unchanged.', '')
  }

  P('## Watch it', '', '```sh', `git fetch origin ${branch} && git checkout ${branch}`, 'npm ci', state.previewOnly ? `npx vite preview --outDir preview/${meta.id}   # or: npm run dev -- ${meta.id}` : `npm run preview            # then open /episodes/${meta.id}/`, '```', '')
  const list = reviewerChecklist(ctx.bibleDir)
  P('## Reviewer\'s checklist (chapter 9)', '', 'Any "no" is a send-back.', '')
  if (list.error) P(`_${list.error}: read the chapter directly._`)
  else P(...list.items.map((i) => `- [ ] ${i}`))
  P('', '- [ ] I watched the whole episode with sound.')
  return out.join('\n') + '\n'
}

export function writePr({ ctx, state, branch = `episode/${ctx.meta.id}` }) {
  writeFileSync(ctx.paths.prTitle, prTitle({ meta: ctx.meta, week: ctx.week }) + '\n')
  writeFileSync(ctx.paths.prBody, prBody({ ctx, state, branch }))
  return { title: ctx.paths.prTitle, body: ctx.paths.prBody }
}
