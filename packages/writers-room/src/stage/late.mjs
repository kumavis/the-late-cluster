// Stages 10 to 13 of docs/WORKFLOW.md: assemble (with the repetition gate on the lines added at
// assembly and a sound editor), stage (builders, then an auditor with a verdict per segment and a
// route per change), build (with the live source check) and review (the cold-viewer test, then the
// reviewer).
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { combineRepetition, filesIn, readJsonFile, repetitionProblems } from '../combine.mjs'
import { importFresh } from '../context.mjs'
import { gate } from '../gates/common.mjs'
import { writePronouns, writeGuestLines, writeLabels, writeLength, writeNames, writeOptOut, writeRundown, writeSources } from '../gates/write.mjs'
import { renderCheck, renderHeard, renderLengths, renderWhisper } from '../gates/render.mjs'
import { directCards, directCredits, directDisclaimer, directFrames, directModules, directUnread, shootChanged } from '../gates/direct.mjs'
import { reviewLedger, reviewScorecard, reviewVerdict } from '../gates/build.mjs'
import { constitutionUnchanged, episodeImports, inheritConsistent, selfCheckDna } from '../gates/dna.mjs'
import { normHandle } from '../digest.mjs'
import { peopleRules } from '../ledger.mjs'
import { formatEpisodeJson, writeJson } from '../repo.mjs'
import { scriptLines } from '../scan.mjs'
import { ensureFit, fitCommand, fitProblems, heardLine, readFit } from '../studio.mjs'
import { VIEWER_BRIEF, prepareCold, writeColdReport } from '../cold.mjs'
import { draftsDir } from './drafts.mjs'
import { P, W, R, REPETITION_RULES, as, has, json, pendingRepetition, repetitionFiles, reviewerIds, sha, shaText, task } from './common.mjs'

const rundownOf = (ctx) => JSON.parse(readFileSync(ctx.paths.episodeJson, 'utf8')).rundown ?? []
const linesOf = (f) => (existsSync(f) ? scriptLines(readFileSync(f, 'utf8')).map((l, k) => ({ id: l.id ?? `#${k}`, who: l.who.join(','), text: l.text })) : [])

/** lines added or changed at assembly: every line whose id is new to its draft or whose words changed */
export function addedLines(ctx) {
  const drafts = json(P(ctx, 'assemble/drafts.json'), {})
  const out = []
  for (const seg of rundownOf(ctx)) {
    const before = drafts[seg] ?? {}
    for (const l of linesOf(ctx.paths.segFile(seg, 'script.js'))) if (before[l.id] !== l.text) out.push({ id: `${seg}:${l.id}`, version: shaText(l.text ?? ''), seg, line: l.id, who: l.who, text: l.text })
  }
  return out
}

/** the selected drafts' cast entries merged into the episode's cast.js (plain data), unless one exists */
async function mergeCast(ctx, plan) {
  if (has(ctx.paths.castJs)) return
  const cast = {}
  for (const s of plan.segments) {
    const f = join(draftsDir(ctx), s.id, 'cast.js')
    if (has(f)) Object.assign(cast, (await importFresh(f)).CAST ?? {})
  }
  if (Object.keys(cast).length) writeFileSync(ctx.paths.castJs, `// Merged by the pipeline from the selected drafts' cast.js. The assembler may edit it.\nexport const CAST = ${JSON.stringify(cast, null, 2)}\n`)
}

/** fit every segment whose script or the episode's cast changed since its last fit */
const fitSegments = (ctx) => Object.fromEntries(rundownOf(ctx).filter((s) => has(ctx.paths.segFile(s, 'script.js'))).map((s) => [s, ensureFit(ctx, { seg: s })]))

const assemble = {
  name: 'assemble',
  async prepare(ctx) {
    const plan = readJsonFile(P(ctx, 'plan.json'))
    const meta = JSON.parse(readFileSync(ctx.paths.episodeJson, 'utf8'))
    if (!meta.rundown?.length) {
      const snap = {}
      for (const s of plan.segments) {
        mkdirSync(ctx.paths.segDir(s.id), { recursive: true })
        const from = join(draftsDir(ctx), s.id, 'script.js')
        if (!has(ctx.paths.segFile(s.id, 'script.js'))) cpSync(from, ctx.paths.segFile(s.id, 'script.js'))
        snap[s.id] = Object.fromEntries(linesOf(from).map((l) => [l.id, l.text]))
      }
      writeJson(P(ctx, 'assemble/drafts.json'), snap)
      meta.rundown = plan.segments.map((s) => s.id)
      writeFileSync(ctx.paths.episodeJson, formatEpisodeJson(meta))
    }
    if (!has(ctx.paths.sources)) {
      const merged = json(P(ctx, 'select/sources.json'), { format: 'late-cluster-sources/1', week: ctx.week, accounts: [], posts: [], links: [], lines: [], numbers: [] })
      delete merged.selection
      writeJson(ctx.paths.sources, merged)
    }
    await mergeCast(ctx, plan)
  },
  waves: [
    {
      tasks: (ctx) => [
        task(ctx, 'assemble', {
          id: 'assemble.writer',
          role: 'writer',
          title: 'Assemble the episode',
          writes: ['assembly.md'],
          alsoEdits: [`episodes/${ctx.id}/segments/<seg>/script.js`, `episodes/${ctx.id}/episode.json`, `episodes/${ctx.id}/cast.js`, `episodes/${ctx.id}/looks.js`, W(ctx, 'sources.json'), W(ctx, 'plan.json')],
          keys: ['assembly.md', 'episode.json', 'rundown'],
          reads: [W(ctx, 'plan.json'), ...rundownOf(ctx).map((s) => `episodes/${ctx.id}/segments/${s}/script.js`), W(ctx, 'experiment.md'), 'packages/writers-room/playbooks/sources.md'],
          instructions: [
            `The tool has copied the selected drafts into episodes/${ctx.id}/segments/<id>/script.js, set the rundown from plan.json, merged the drafts' sources into production/sources.json and their guests into cast.js.`,
            'Make an episode of them: the order (episode.json "rundown", and plan.json in the same order), the open, the close and the joins; the title and description in episode.json. Write production/assembly.md: what you changed and why, in a few lines.',
            "Every line you add or change goes through the repetition gate, and the sound editor fits it; do not render. A real account's puppet still says only what it published, in its own context.",
          ],
          rules: ['episode.json rundown equals plan.json; a title and a description; status stays draft.', "Every real line's source and staged setup recorded in sources.json \"lines\".", `At most ${ctx.limits.words?.max} spoken words.`],
        }),
      ],
      gates: [writeRundown],
    },
    {
      tasks: (ctx) => {
        const items = addedLines(ctx)
        if (!items.length) return []
        const files = repetitionFiles(P(ctx, 'review/repetition-assembly'))
        const pending = pendingRepetition(files, items, reviewerIds(ctx))
        if (Object.keys(pending).length)
          return Object.entries(pending).map(([r, { round, items: its }]) =>
            task(ctx, 'assemble', {
              id: `assemble.repetition-${r}-r${round}`,
              role: 'reviewer',
              kind: 'repetition',
              title: `Repetition gate on the lines added at assembly, round ${round} (${r})`,
              writes: [`review/repetition-assembly/${r}-r${round}.json`],
              keys: [`review/repetition-assembly/${r}-r${round}.json`, `${r}'s`, `${r} `],
              reads: [`${R(ctx, ctx.ledgerDir)}/README.md?`],
              instructions: [
                'With the ledger and the earlier scripts in front of you, give each line the assembler added or changed one verdict (the open, the close, the joins, a line split for the engine).',
                'Lines: ' + its.map((it) => `${it.id} [${it.version}] (${it.who}): "${it.text}"`).join(' || '),
                `Write review/repetition-assembly/${r}-r${round}.json: { "reviewer": "${r}", "round": ${round}, "items": [{ "id": "<seg:line>", "version": "<the version in brackets>", "verdict", "turned", "fromPrevious", "avoid", "reason" }] }. Judge alone.`,
              ],
              rules: REPETITION_RULES(ctx),
            }),
          )
        const combined = combineRepetition(files, items)
        const repeats = items.filter((it) => combined[it.id]?.verdict === 'repeat')
        if (!repeats.length) return []
        return [
          task(ctx, 'assemble', {
            id: 'assemble.rework',
            role: 'writer',
            kind: 'assemble',
            title: 'Lines added at assembly that cannot stay',
            writes: [`episodes/${ctx.id}/segments/${repeats[0].seg}/script.js`],
            alsoEdits: [...new Set(repeats.map((x) => `episodes/${ctx.id}/segments/${x.seg}/script.js`))],
            keys: repeats.map((x) => x.id),
            reads: [...new Set(repeats.map((x) => `episodes/${ctx.id}/segments/${x.seg}/script.js`))],
            instructions: [`These lines cannot stay as they are:\n${repeats.map((x) => `- ${x.id} (${x.who}): "${x.text}". Avoid: ${combined[x.id].verdicts.map((v) => v.avoid).filter(Boolean).join(' / ')}`).join('\n')}`, 'Rewrite or remove each one. Do not render.'],
            rules: ['Each line above is changed or gone; the new words are judged again.'],
            done: (c) => repeats.every((x) => !addedLines(c).some((y) => y.id === x.id && y.version === x.version)),
          }),
        ]
      },
      gates: [assembleRepetition],
    },
    {
      before: (ctx) => fitSegments(ctx),
      tasks: (ctx) => {
        const segs = rundownOf(ctx)
        const problems = segs.map((s) => ({ seg: s, ...fitProblems(readFit(ctx, { seg: s }), ctx.config.fit.blocking) }))
        const open = problems.filter((p) => p.blocking.length || p.weak.length)
        if (!open.length) return []
        if (!has(P(ctx, 'assemble/sound.md')) || open.every((p) => !p.blocking.length))
          return [
            task(ctx, 'assemble', {
              id: 'assemble.sound',
              role: 'sound-editor',
              kind: 'fit',
              title: 'Fit the assembled episode to the voice engine',
              writes: ['assemble/sound.md'],
              alsoEdits: [...open.map((p) => `episodes/${ctx.id}/segments/${p.seg}/script.js`), `episodes/${ctx.id}/cast.js`],
              reads: open.map((p) => `episodes/${ctx.id}/segments/${p.seg}/fit.json`),
              instructions: [
                `The fitting tool's tables are segments/<seg>/fit.json. Lines to settle:\n${open.flatMap((p) => [...p.blocking, ...p.weak].map((l) => `- ${p.seg} ${heardLine(l)}`)).join('\n')}`,
                `Settle each with \`as\`, pauses or a guest's voice, re-fitting with \`${fitCommand(ctx.id, { seg: '<seg>' })}\`; change no line's words. Write production/assemble/sound.md: what you did, and "cannot be said: <heard>" for a line that needs the assembler.`,
              ],
              rules: ["No line's words change.", 'Nothing flagged or unsayable is left, unless sound.md hands it back to the writer.'],
              done: (c) => has(P(c, 'assemble/sound.md')),
            }),
          ]
        const fitted = json(P(ctx, 'fit/hashes.json'), {})
        return open
          .filter((p) => p.blocking.length)
          .map((p) =>
            task(ctx, 'assemble', {
              id: `assemble.rewrite-${p.seg}`,
              role: 'writer',
              kind: 'rewrite',
              segment: p.seg,
              title: `Lines in ${p.seg} that cannot be said`,
              writes: [`episodes/${ctx.id}/segments/${p.seg}/script.js`],
              keys: [`${p.seg} `, `segments/${p.seg}/`],
              reads: [W(ctx, 'assemble/sound.md')],
              instructions: [`Not heard as written:\n${p.blocking.map((l) => `- ${heardLine(l)}`).join('\n')}`, "Rewrite only those lines; for a real person's line: a marked cut that keeps its meaning, a house reading from the card, or the card alone. Do not render."],
              rules: ['Nothing flagged or unsayable in segments/<seg>/fit.json.'],
              done: (c) => json(P(c, 'fit/hashes.json'), {})[`segment:${p.seg}`] !== fitted[`segment:${p.seg}`] || sha(c.paths.segFile(p.seg, 'script.js')) !== sha(ctx.paths.segFile(p.seg, 'script.js')),
            }),
          )
      },
      after: (ctx) => ({ renderResult: ctx.tools.npm('render', [ctx.id, ...rundownOf(ctx)]) }),
      gates: [assembleRendered, assembleFitted, writeRundown, writeSources, writeGuestLines, writePronouns, writeLabels, writeNames, writeOptOut, writeLength, peopleSources, renderCheck, renderWhisper, renderHeard, renderLengths, as(constitutionUnchanged, 'assemble.constitution')],
    },
  ],
}

async function assembleRepetition(ctx) {
  const g = gate('repetition.assembly')
  const items = addedLines(ctx)
  if (!items.length) {
    g.skip('no line was added or changed at assembly')
    return g.done()
  }
  const combined = combineRepetition(repetitionFiles(P(ctx, 'review/repetition-assembly')), items)
  const r = repetitionProblems(combined, { reviewers: ctx.config.repetition.reviewers, maxTurnedFromPrevious: ctx.config.repetition.maxTurnedFromPrevious, label: 'line' })
  r.failures.forEach((f) => g.fail(f))
  writeJson(P(ctx, 'review/repetition-assembly.json'), { verdicts: combined })
  return g.done()
}

async function assembleRendered(ctx) {
  const g = gate('assemble.render')
  const r = ctx.renderResult
  if (r && r.code !== 0) g.fail(`npm run render exited ${r.code}: ${r.out.split('\n').filter((l) => /✗|error/i.test(l)).slice(0, 10).join(' | ')}`)
  return g.done()
}

async function assembleFitted(ctx) {
  const g = gate('assemble.fitted')
  for (const seg of rundownOf(ctx)) {
    const f = readFit(ctx, { seg })
    if (!f) {
      g.fail(`segments/${seg}/fit.json is missing: ${fitCommand(ctx.id, { seg })}`)
      continue
    }
    for (const l of fitProblems(f, ctx.config.fit.blocking).blocking) g.fail(`${seg} ${heardLine(l)}`)
  }
  return g.done()
}

/** the people rules on what was assembled: sources.json's guests and every account shown */
async function peopleSources(ctx) {
  const g = gate('assemble.people')
  const s = ctx.sources ?? {}
  const acc = new Map((s.accounts ?? []).map((a) => [normHandle(a.handle), a]))
  const who = (h) => ({ did: acc.get(normHandle(h))?.did ?? null, handle: normHandle(h) })
  const speakers = (s.accounts ?? []).filter((a) => a.role === 'guest').map((a) => who(a.handle))
  const shown = (s.posts ?? []).filter((p) => ['card', 'quote', 'thread', 'line'].includes(p.use)).map((p) => who(p.author))
  const p = peopleRules(ctx.ledger, ctx.paths.number, { speakers, featured: [...speakers, ...shown] }, ctx.config.people, ctx.digest)
  p.failures.forEach((f) => g.fail(f))
  p.warnings.forEach((w) => g.warn(w))
  return g.done()
}

// ---------------------------------------------------------------- 11. stage

const OWNERS = { segment: "the segment's builder", episode: "the episode's looks.js or cast.js (a builder)", studio: "the studio's built-ins (outside this run: the project manager decides)", script: 'the script (back to assembly)' }
const auditRounds = (ctx) => filesIn(P(ctx, 'review/stage'), '.json').filter((f) => /\/r\d+\.json$/.test(f)).map((f) => ({ f, n: Number(/r(\d+)\.json$/.exec(f)[1]), j: readJsonFile(f) })).sort((a, b) => a.n - b.n)
const changesOf = (j, owner) => Object.entries(j.segments ?? {}).flatMap(([seg, v]) => (v.changes ?? []).filter((c) => c.owner === owner).map((c) => ({ seg, ...c })))
const segHash = (ctx, seg) => (has(ctx.paths.segFile(seg, 'index.js')) ? sha(ctx.paths.segFile(seg, 'index.js')) : 'none')
const looksHash = (ctx) => [ctx.paths.looksJs, ctx.paths.castJs].map((f) => (has(f) ? sha(f) : 'none')).join('+')

const stage = {
  name: 'stage',
  waves: [
    {
      tasks: (ctx) =>
        rundownOf(ctx).map((seg) =>
          task(ctx, 'stage', {
            id: `stage.${seg}`,
            role: 'builder',
            segment: seg,
            title: `Stage the segment ${seg}`,
            writes: [`episodes/${ctx.id}/segments/${seg}/index.js`],
            keys: [`segments/${seg}/`, `${seg} @`, `${seg}:`, ` in ${seg}`],
            reads: [`episodes/${ctx.id}/segments/${seg}/script.js`, `episodes/${ctx.id}/segments/${seg}/cues.json`, 'packages/show/README.md', 'packages/show/templates/segment/index.js?', W(ctx, 'sources.json'), W(ctx, 'experiment.md'), W(ctx, 'inherited/?')],
            instructions: [
              `Write episodes/${ctx.id}/segments/${seg}/index.js against the rendered cues.json ("Authoring a segment" in packages/show/README.md). Helpers and props go in segments/${seg}/, imported as @late-cluster/episode/segments/${seg}/<file>.js; studio code as @late-cluster/show/<path>.`,
              `Shoot and look at your frames: \`npm run shoot -- ${ctx.id} ${seg} <t>…\`. Run the experiment where it touches this segment.`,
            ],
            rules: [
              'A real post on screen, on a card or performed by a puppet, shows its exact text (production/sources.json), with display name, handle, date and counts; cut only with an ellipsis.',
              `Nothing longer than ${ctx.config.screen.glanceWords} words on screen unless at least ${Math.round(ctx.config.screen.spokenCoverage * 100)} % of it is spoken in the segment.`,
              'Frames at every cue load with no page errors and no unknown cues.',
              'Imports: studio and this segment only; never another segment or production/.',
              'The script, the cues and what a real person is shown saying do not change.',
            ],
          }),
        ),
      gates: [directModules, directDisclaimer, directCards, directUnread, directFrames, directCredits, as(episodeImports, 'stage.imports'), as(inheritConsistent, 'stage.inherit'), as(constitutionUnchanged, 'stage.constitution')],
    },
    {
      before: (ctx) => shootChanged(ctx),
      tasks: (ctx) => {
        const rounds = auditRounds(ctx)
        const last = rounds.at(-1)
        const snap = last ? json(P(ctx, `stage/hashes-r${last.n}.json`), {}) : {}
        const fixes = []
        if (last) {
          const bySeg = new Map()
          for (const c of changesOf(last.j, 'segment')) bySeg.set(c.seg, [...(bySeg.get(c.seg) ?? []), c])
          for (const [seg, cs] of bySeg)
            fixes.push(
              task(ctx, 'stage', {
                id: `stage.fix-${seg}-r${last.n}`,
                role: 'builder',
                kind: 'stage',
                segment: seg,
                title: `Changes to the staging of ${seg}`,
                writes: [`episodes/${ctx.id}/segments/${seg}/index.js`],
                keys: [`segments/${seg}/`, `${seg} @`],
                reads: [`episodes/${ctx.id}/segments/${seg}/index.js`, `shots/${ctx.id}/${seg}/`],
                instructions: [`The frames were looked at. Make these changes:\n${cs.map((c) => `- ${c.file ? `${c.file}: ` : ''}${c.change}`).join('\n')}`, `Shoot and look again: \`npm run shoot -- ${ctx.id} ${seg} <t>…\`.`],
                rules: stage.waves[0].tasks(ctx)[0]?.rules ?? [],
                done: (c) => segHash(c, seg) !== snap[seg],
              }),
            )
          const ep = changesOf(last.j, 'episode')
          if (ep.length)
            fixes.push(
              task(ctx, 'stage', {
                id: `stage.fix-episode-r${last.n}`,
                role: 'builder',
                kind: 'stage',
                title: "Changes to the episode's looks",
                writes: [`episodes/${ctx.id}/looks.js`],
                alsoEdits: [`episodes/${ctx.id}/cast.js`],
                keys: ['looks.js', 'cast.js'],
                reads: [`episodes/${ctx.id}/looks.js?`, `episodes/${ctx.id}/cast.js?`],
                instructions: [`Make these changes:\n${ep.map((c) => `- ${c.seg}: ${c.file ? `${c.file}: ` : ''}${c.change}`).join('\n')}`],
                rules: ['Change looks and voices only; never a guest\'s handle or name.'],
                done: (c) => looksHash(c) !== snap._episode,
              }),
            )
          const open = fixes.filter((t) => !t.done(ctx))
          if (open.length) return open
          if (!fixes.length) return []
        }
        const n = (last?.n ?? 0) + 1
        if (!has(P(ctx, `review/stage/r${n}.json`))) writeJson(P(ctx, `stage/hashes-r${n}.json`), { ...Object.fromEntries(rundownOf(ctx).map((s) => [s, segHash(ctx, s)])), _episode: looksHash(ctx) })
        return [
          task(ctx, 'stage', {
            id: `stage.auditor-r${n}`,
            role: 'auditor',
            kind: 'stage-audit',
            title: `Look at the staged frames, round ${n}`,
            writes: [`review/stage/r${n}.json`],
            reads: [...rundownOf(ctx).map((s) => `shots/${ctx.id}/${s}/`), `shots/${ctx.id}/end/?`, W(ctx, 'sources.json')],
            earlier: last ? [`Round ${last.n} asked for changes; they have been made. Look again at every segment.`] : [],
            instructions: [
              'Look at every frame. Find anything unreadable (under the captions, too small, gone before it can be read), anything shown but not performed, anything that changes what a real person said, and anything that breaks the constitution on screen.',
              `Write review/stage/r${n}.json: { "segments": { "<seg>": { "verdict": "pass" | "change", "changes": [{ "owner": "segment" | "episode" | "studio" | "script", "file": "<the file>", "change": "<exactly what to change>" }] } } }, one entry for every segment (${rundownOf(ctx).join(', ')}). The owner decides who gets the change: ${Object.entries(OWNERS).map(([k, v]) => `${k}, ${v}`).join('; ')}.`,
            ],
            rules: ['A verdict for every segment; every change names its owner and says exactly what to change.'],
          }),
        ]
      },
      gates: [directCards, directUnread, directFrames, stageAudit],
    },
  ],
}

async function stageAudit(ctx) {
  const g = gate('stage.audit')
  const last = auditRounds(ctx).at(-1)
  if (!last) {
    g.fail('review/stage/r1.json is missing')
    return g.done()
  }
  const at = R(ctx, last.f)
  for (const seg of rundownOf(ctx)) {
    const v = last.j.segments?.[seg]
    if (!v || !['pass', 'change'].includes(v.verdict)) g.fail(`${at}: segment ${seg} needs "verdict": "pass" or "change"`)
    else if (v.verdict === 'change' && !(v.changes ?? []).length) g.fail(`${at}: ${seg} says change but lists none`)
    for (const c of v?.changes ?? []) if (!OWNERS[c.owner] || !String(c.change ?? '').trim()) g.fail(`${at}: ${seg}: each change names an owner (${Object.keys(OWNERS).join(', ')}) and says what to change`)
  }
  if (!g.ok) return g.done()
  const studio = changesOf(last.j, 'studio')
  if (studio.length) g.fail(`${at}: ${studio.length} change${studio.length === 1 ? '' : 's'} to the studio's built-ins (${studio.map((c) => c.seg).join(', ')}); the project manager decides who makes them, then runs produce again`)
  if (changesOf(last.j, 'script').length) g.sendBack('assemble', `the stage auditor routes changes to the scripts (${at})`, last.f)
  else if (rundownOf(ctx).some((s) => last.j.segments[s].verdict === 'change')) g.fail(`${at}: changes are still open; run produce again to brief them`)
  return g.done()
}

// ---------------------------------------------------------------- 12. build (tools only; see pipeline.mjs)

const build = { name: 'build', tool: true, waves: [] }

// ---------------------------------------------------------------- 13. review

const review = {
  name: 'review',
  prepare(ctx) {
    // once: the title and the whole credits roll for the reviewer (finding 31), then the cold sets
    if (has(P(ctx, 'review/cold/sets.json'))) return
    const f = ctx.config.frames
    ctx.tools.npm('shoot', [ctx.id, 'title', ...(f.titleTimes ?? [1]).map(String)])
    ctx.tools.npm('shoot', [ctx.id, 'end', ...(f.endTimes ?? [2]).map(String)])
    prepareCold(ctx)
  },
  waves: [
    {
      tasks: (ctx) =>
        prepareCold(ctx).sets.map((s) =>
          task(ctx, 'review', {
            id: `review.viewer-${s.set}`,
            role: 'viewer',
            kind: 'viewer',
            title: `Stills ${s.set}`,
            writes: [`shots/${ctx.id}/_cold/set-${s.set}/answer.md`],
            instructions: [...VIEWER_BRIEF(s.set, s.frames), `The frames are in shots/${ctx.id}/_cold/set-${s.set}/.`],
          }),
        ),
      after: (ctx) => writeColdReport(ctx),
    },
    {
      tasks: (ctx) => [
        task(ctx, 'review', {
          id: 'review.reviewer',
          role: 'reviewer',
          title: 'Review the episode, and write it into the ledger',
          writes: ['scorecard.md', 'review.json', `${R(ctx, ctx.ledgerDir)}/${ctx.id}.json`, `${R(ctx, ctx.ledgerDir)}/${ctx.id}.md`],
          alsoEdits: [`${R(ctx, ctx.ledgerDir)}/featured.json`, W(ctx, 'dna-amendments.md'), `${R(ctx, ctx.bibleDir)}/<a craft chapter>`],
          reads: [W(ctx, 'plan.json'), W(ctx, 'experiment.md'), W(ctx, 'review/cold-viewers.md'), ...rundownOf(ctx).flatMap((s) => [`episodes/${ctx.id}/segments/${s}/script.js`, `episodes/${ctx.id}/segments/${s}/fit.json?`, `shots/${ctx.id}/${s}/`]), `shots/${ctx.id}/title/?`, `shots/${ctx.id}/end/?`, `${R(ctx, ctx.ledgerDir)}/README.md?`],
          instructions: [
            'Fill in the scorecard (chapter 10) as production/scorecard.md, one sentence of evidence per row. What each line was heard as is in segments/<seg>/fit.json; the frames are under shots/. Judge the experiment in row B12, with review/cold-viewers.md in hand.',
            `Write the episode into the ledger: ${R(ctx, ctx.ledgerDir)}/${ctx.id}.md (every joke, runner, format, guest, account on a card, song genre and staging device) and ${R(ctx, ctx.ledgerDir)}/${ctx.id}.json ({ "id", "aired": false, "guests", "featured", "formats", "song", "runners", "catchphrases", "devices" }), and the tracker featured.json.`,
            'Write production/review.json: { "verdict": "approve" | "send-back", "route": "<the stage that can fix it>", "reasons": [], "changes": ["<what the recipient must change, with nothing from the ledger in it>"] }. Only "changes" reaches the stage it routes to. A send-back is a valid result.',
            'If the episode earned a change to the craft bible, edit the chapter and list it in production/dna-amendments.md. Never edit the constitution.',
          ],
          rules: ['Every row of the scorecard with evidence; the verdict follows the card.', "The ledger entry's guests and featured are who is on screen, by DID; the tracker has this episode's appearances."],
        }),
      ],
      gates: [reviewScorecard, reviewLedger, selfCheckDna, as(constitutionUnchanged, 'review.constitution'), as(reviewVerdict, 'review.verdict')],
    },
  ],
}

export const LATE = { assemble, stage, build, review }
