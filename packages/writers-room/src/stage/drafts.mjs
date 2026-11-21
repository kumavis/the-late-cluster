// Stages 7 to 9 of docs/WORKFLOW.md: draft, fit and select (with the repetition gate on scripts and
// the auditor's consent refresh). Writers write words; the fitting tool and sound editors decide how
// they are heard; reviewers score; the tool applies the caps.
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { findPost, normHandle } from '../digest.mjs'
import { combineRepetition, filesIn, readIdeas, readJsonFile, repetitionProblems, selectDrafts } from '../combine.mjs'
import { earlier, keyOf, peopleRules } from '../ledger.mjs'
import { gate } from '../gates/common.mjs'
import { checkGuestLines, r3Drift, spokenWords } from '../gates/write.mjs'
import { pronounGateLines, pronounProblems } from '../pronouns.mjs'
import { importFresh } from '../context.mjs'
import { inheritProblems } from '../inherit.mjs'
import { scriptLines } from '../scan.mjs'
import { SEG_RE, writeJson } from '../repo.mjs'
import { RESEARCH_FILE, RESEARCH_PAGE, ensureFit, fitCommand, fitProblems, heardLine, isRecorded, readFit, readResearch, renderDraftCommand, researchCommand, researchSource, voicesCommand } from '../studio.mjs'
import { sourcesCommand } from '../scraper.mjs'
import { draftPlan } from './early.mjs'
import { P, W, R, REPETITION_RULES, excludedOf, has, json, pendingRepetition, previousAired, previousLabel, repetitionFiles, reviewerIds, sha, shaText, task } from './common.mjs'

export const draftsDir = (ctx) => P(ctx, 'drafts')

export function readDrafts(ctx) {
  const dir = draftsDir(ctx)
  if (!has(dir)) return []
  return readdirSync(dir)
    .filter((s) => SEG_RE.test(s) && has(join(dir, s, 'script.js')))
    .sort()
    .map((slug) => {
      const notesFile = join(dir, slug, 'notes.json')
      let notes = {}
      try {
        notes = has(notesFile) ? readJsonFile(notesFile) : {}
      } catch {}
      return { slug, dir: join(dir, slug), notes, version: sha(join(dir, slug, 'script.js')) }
    })
}

/** a draft's own cast.js merged over the episode's cast, so its guests are checked as guests (finding 20) */
export async function castWithDraft(ctx, slug) {
  const f = join(draftsDir(ctx), slug, 'cast.js')
  if (!has(f)) return ctx.castInfo
  let extra = {}
  try {
    extra = (await importFresh(f)).CAST ?? {}
  } catch {}
  return { ...ctx.castInfo, cast: { ...ctx.castInfo.cast, ...extra }, guests: new Set([...ctx.castInfo.guests, ...Object.entries(extra).filter(([, c]) => c?.guest).map(([id]) => id)]) }
}

const NOTES = (d) => `{ "slug": "${d.slug}", "title", "format", "seconds": <your estimate>, "standing": ${d.standing ? `"${d.standing}"` : 'null'}, "cards": [${d.cards.map((c) => `"${c}"`).join(', ')}], "ideas": [${d.ideas.map((i) => `"${i}"`).join(', ')}], "turn": "<the turn, in five words>", "speakers": ["<handles of real accounts whose puppets speak>"], "featured": ["<handles of real accounts shown on screen>"]${d.standing === 'music' ? ', "genre", "theme"' : ''}${d.standing === 'top-chicken' ? ', "results": ["<at:// result posts>"]' : ''} }`

const STANDING = {
  interview: 'The interview: one community member, constructed from their public posts. Every answer is a real post of theirs, verbatim (`// interview: at://<post> · context: at://<what it replied to>`); every question recreates what that post was actually replying to: a house character asks what was asked, or reads aloud what was said. Put the exchanges in the true order of their occasions.',
  'top-chicken': "Top Chicken: the window's results with enough of the game around them to be a segment: the record and the gap, the window's numbers, and the show's own guess about what happens next, labelled as a guess in the voice and on screen. Winners only by name.",
  music: 'Music: a song on a theme from the window.',
}

function draftTask(ctx, d) {
  const ideas = readIdeas(ctx.prod)
  const prev = previousAired(ctx)
  const ideaLines = d.ideas.map((id) => {
    const i = ideas.find((x) => x.id === id)
    return i ? `- ${id} (card ${i.card}): ${i.premise} / turn: ${i.turn} / screen: ${i.screen} / format: ${i.format}` : `- ${id}`
  })
  return task(ctx, 'draft', {
    id: `draft.${d.slug}`,
    role: 'writer',
    kind: d.standing ? `draft-${d.standing}` : 'draft',
    segment: d.slug,
    title: d.standing ? `Draft the standing segment: ${d.slug}` : `Draft a segment from card ${d.card}`,
    writes: [`drafts/${d.slug}/script.js`, `drafts/${d.slug}/notes.json`],
    alsoEdits: [W(ctx, `drafts/${d.slug}/sources.json`), W(ctx, `drafts/${d.slug}/cast.js`)],
    keys: [`drafts/${d.slug}`],
    reads: [...(d.cards.length ? d.cards.map((c) => W(ctx, `research/kept/${c}.json`)) : [W(ctx, 'rank/pool.md')]), 'packages/show/tools/README.md', 'packages/writers-room/playbooks/sources.md', W(ctx, 'experiment.md'), `${RESEARCH_PAGE}?`],
    cards: d.cards,
    instructions: [
      d.standing ? STANDING[d.standing] : `Draft one segment from card ${d.card}.`,
      d.ideas.length ? `The ideas ranked for it:\n${ideaLines.join('\n')}` : d.cards.length ? 'No idea was ranked for it: work from the card.' : 'No idea was ranked for it: take its material from the pool (rank/pool.md).',
      d.standing === 'music' && prev?.song?.genre ? `Avoid: the genre "${prev.song.genre}".` : null,
      `Write drafts/${d.slug}/script.js in the script format of packages/show/tools/README.md, with \`id: '${d.slug}'\`, and drafts/${d.slug}/notes.json: ${NOTES(d)}. If real accounts appear, drafts/${d.slug}/sources.json (playbooks/sources.md); a guest the studio lacks goes in drafts/${d.slug}/cast.js as \`{ name, handle, title, guest: true }\` with no voice settings, because a sound editor places the voice (\`npm run voices\`).`,
      'Write words. Do not render audio and do not chase what the engine hears: the fitting tool and a sound editor make a best effort, and nothing comes back to you for how a line is heard.',
      `Optional, a minute's reading: ${RESEARCH_PAGE} lists the words the voices find hard. A hard word may still be used: the captions carry every line, word for word.`,
      'Television: nothing on screen for the viewer to read in silence. Run the experiment (experiment.md) where it touches this segment.',
    ].filter(Boolean),
    rules: [
      `script.js loads, has \`id: '${d.slug}'\` and beats; notes.json has title, format, seconds, turn, and speakers and featured as lists.`,
      "A real account's puppet says only what that account published, tagged `// verbatim: at://… · context: at://…` (or interview, catchphrase), after a staged line that recreates its occasion; each line recorded in sources.json \"lines\". Guests in your cast.js count as guests.",
      `Nobody who spoke in ${previousLabel(ctx)} speaks.`,
      d.standing === 'interview' ? 'One community member: notes.json "speakers" lists exactly one handle.' : null,
      d.standing === 'music' ? `notes.json has "genre" and "theme"; the genre is not ${prev?.song?.genre ? `"${prev.song.genre}"` : 'the previous aired episode\'s'}.` : null,
      d.standing === 'top-chicken' ? `notes.json "results" lists at least ${ctx.config.standing.topChickenMinResults} of the window's result posts, when there are that many.` : null,
    ].filter(Boolean),
  })
}

// ---------------------------------------------------------------- 7. draft

const draft = {
  name: 'draft',
  waves: [{ tasks: (ctx) => draftPlan(ctx).map((d) => draftTask(ctx, d)), gates: [draftFiles, draftLines, draftStanding] }],
}

async function draftFiles(ctx) {
  const g = gate('draft.files')
  const drafts = readDrafts(ctx)
  const wps = (ctx.limits.wordsPerSecond?.min + ctx.limits.wordsPerSecond?.max) / 2 || 1.9
  let total = 0
  for (const slug of draftPlan(ctx).map((d) => d.slug)) if (!drafts.some((d) => d.slug === slug)) g.fail(`drafts/${slug}/script.js is missing`)
  for (const d of drafts) {
    let script
    try {
      script = (await importFresh(join(d.dir, 'script.js'))).default
    } catch (e) {
      g.fail(`drafts/${d.slug}/script.js does not load: ${e.message.split('\n')[0]}`)
      continue
    }
    if (script?.id !== d.slug) g.fail(`drafts/${d.slug}/script.js: "id" must be '${d.slug}'`)
    if (!Array.isArray(script?.beats) || !script.beats.length) g.fail(`drafts/${d.slug}/script.js has no beats`)
    for (const k of ['title', 'format', 'turn']) if (!String(d.notes[k] ?? '').trim()) g.fail(`drafts/${d.slug}/notes.json: "${k}" is empty`)
    if (!(Number(d.notes.seconds) > 0)) g.fail(`drafts/${d.slug}/notes.json: "seconds" must be the estimated running time`)
    for (const k of ['speakers', 'featured']) if (!Array.isArray(d.notes[k])) g.fail(`drafts/${d.slug}/notes.json: "${k}" must be a list of handles (empty if none)`)
    total += Math.max(Math.round(spokenWords(script) / wps), Number(d.notes.seconds) || 0)
  }
  const n = drafts.length
  g.warn(`drafted about ${total} s in ${n} drafts (target ${ctx.limits.targetSeconds} s)`)
  return g.done()
}

/** the real-people rules on every draft, against the draft's own sources.json and cast */
async function draftLines(ctx) {
  const g = gate('draft.lines')
  for (const w of r3Drift(ctx)) g.warn(w)
  for (const d of readDrafts(ctx)) {
    const sf = join(d.dir, 'sources.json')
    const view = Object.create(ctx)
    view.sources = has(sf) ? readJsonFile(sf) : null
    view.castInfo = await castWithDraft(ctx, d.slug)
    const r = checkGuestLines(view, { seg: d.slug, file: `drafts/${d.slug}/script.js`, text: readFileSync(join(d.dir, 'script.js'), 'utf8') })
    r.failures.forEach((f) => g.fail(f))
    r.warnings.forEach((w) => g.warn(w))
    // pronouns: a warning at the draft stage, blocking at assembly
    const pr = pronounGateLines(pronounProblems(view, { seg: d.slug, file: `drafts/${d.slug}/script.js`, text: readFileSync(join(d.dir, 'script.js'), 'utf8') }), { blocking: false })
    pr.warnings.forEach((w) => g.warn(`pronouns: ${w}`))
    const p = peopleRules(ctx.ledger, ctx.paths.number, { speakers: d.notes.speakers ?? [] }, ctx.config.people, ctx.digest)
    p.failures.forEach((f) => g.fail(`drafts/${d.slug}: ${f}`))
  }
  return g.done()
}

async function draftStanding(ctx) {
  const g = gate('draft.standing')
  const drafts = readDrafts(ctx)
  for (const s of ctx.config.standing.segments) {
    const d = drafts.find((x) => x.slug === s)
    if (!d) g.fail(`the standing segment ${s} has no draft (drafts/${s}/): it is drafted every week and selected on merit`)
    else if (d.notes.standing !== s) g.fail(`drafts/${s}/notes.json: "standing" must be "${s}"`)
  }
  const interview = drafts.find((d) => d.slug === 'interview')
  if (interview) {
    const sp = new Set((interview.notes.speakers ?? []).map(normHandle))
    if (sp.size !== 1) g.fail(`drafts/interview: an interview is with one community member; notes.json "speakers" lists ${sp.size}`)
  }
  const music = drafts.find((d) => d.slug === 'music')
  if (music) {
    if (!String(music.notes.genre ?? '').trim() || !String(music.notes.theme ?? '').trim()) g.fail('drafts/music/notes.json needs "genre" and "theme"')
    const norm = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
    const past = earlier(ctx.ledger, ctx.paths.number)
    if (past[0]?.song && norm(past[0].song.genre) === norm(music.notes.genre)) g.fail(`drafts/music: the genre "${music.notes.genre}" is the previous aired episode's; pick another`)
    for (const e of past.slice(1, ctx.config.music.genreWarnWindow)) if (e.song && norm(e.song.genre) === norm(music.notes.genre)) g.warn(`drafts/music: the genre "${music.notes.genre}" was used in ${e.id}`)
  }
  const tc = drafts.find((d) => d.slug === 'top-chicken')
  if (tc) {
    const results = (ctx.digest.sections?.games ?? []).find((x) => x.id === 'top-chicken')?.results ?? []
    const want = Math.min(ctx.config.standing.topChickenMinResults, results.length)
    const used = (tc.notes.results ?? []).filter((u) => findPost(ctx.digest, u))
    if (used.length < want) g.fail(`drafts/top-chicken draws on ${used.length} of the window's ${results.length} results; use at least ${want}, listed in notes.json "results"`)
  }
  return g.done()
}

// ---------------------------------------------------------------- 8. fit

/** fit every draft whose script or cast changed since it was last fitted */
export function fitDrafts(ctx, slugs = readDrafts(ctx).map((d) => d.slug)) {
  return Object.fromEntries(slugs.map((slug) => [slug, ensureFit(ctx, { draft: slug })]))
}

const BLOCKING = (ctx) => ctx.config.fit.blocking
/** a draft's heard-waivers.json (an out-of-bounds subject heard, judged harmless): { <line id>: { heard, judgement } } */
function draftWaivers(ctx, slug) {
  const f = join(draftsDir(ctx), slug, 'heard-waivers.json')
  if (!has(f)) return {}
  try {
    const w = readJsonFile(f)
    return w?.[slug] && typeof w[slug] === 'object' ? w[slug] : w
  } catch {
    return {}
  }
}
const problemsOf = (ctx, slug, f = readFit(ctx, { draft: slug })) => fitProblems(f, BLOCKING(ctx), { waivers: draftWaivers(ctx, slug) })
/** the rewrites the owner asked for: production/fit/owner-rewrites.json { "drafts": { <slug>: [<line id>] }, "segments": { <seg>: [<line id>] } } */
export const ownerRewrites = (ctx, kind) => json(P(ctx, 'fit/owner-rewrites.json'), {})?.[kind] ?? {}
const hasGuests = async (ctx, slug) => (await castWithDraft(ctx, slug)).guests.size > ctx.castInfo.guests.size || (readDrafts(ctx).find((d) => d.slug === slug)?.notes.speakers ?? []).length > 0
const textsOf = (ctx, slug) => Object.fromEntries(scriptLines(readFileSync(join(draftsDir(ctx), slug, 'script.js'), 'utf8')).map((l, k) => [l.id ?? `#${k}`, l.text]))

const fit = {
  name: 'fit',
  waves: [
    {
      before: (ctx) => fitDrafts(ctx),
      tasks: async (ctx) => {
        const drafts = readDrafts(ctx)
        const withGuests = []
        for (const d of drafts) if (await hasGuests(ctx, d.slug)) withGuests.push(d.slug)
        if (!withGuests.length) return []
        return [
          task(ctx, 'fit', {
            id: 'fit.voices',
            role: 'sound-editor',
            kind: 'voices',
            title: 'Voices for the guests of every draft',
            writes: ['fit/voices.md'],
            alsoEdits: withGuests.map((s) => W(ctx, `drafts/${s}/cast.js`)),
            reads: ['packages/show/src/cast.js', ...withGuests.map((s) => W(ctx, `drafts/${s}/cast.js?`))],
            instructions: [
              `Run \`${voicesCommand(ctx.id)}\`. Give every guest in these drafts (${withGuests.join(', ')}) a voice distinct from each other and from the house cast, editing only the voice settings in drafts/<slug>/cast.js (a guest with no entry gets one there).`,
              'Write fit/voices.md: one line per guest, the voice chosen and what it is distinct from.',
            ],
            rules: ['fit/voices.md exists. No line of any script changes.'],
          }),
        ]
      },
    },
    {
      before: (ctx) => fitDrafts(ctx),
      tasks: (ctx) => {
        const snap = json(P(ctx, 'fit/texts.json'), {})
        const out = []
        for (const d of readDrafts(ctx)) {
          const f = readFit(ctx, { draft: d.slug })
          const p = problemsOf(ctx, d.slug, f)
          if (!f || (!p.blocking.length && !p.hard.length && !p.weak.length)) continue
          if (!snap[d.slug]) {
            snap[d.slug] = textsOf(ctx, d.slug)
            writeJson(P(ctx, 'fit/texts.json'), snap)
          }
          const open = [...new Map([...p.blocking, ...p.hard, ...p.weak].map((l) => [l.id, l])).values()]
          out.push(
            task(ctx, 'fit', {
              id: `fit.${d.slug}`,
              role: 'sound-editor',
              kind: 'fit',
              segment: d.slug,
              title: `Fit the draft ${d.slug} to the voice engine: best effort`,
              writes: [`drafts/${d.slug}/fit-notes.md`],
              alsoEdits: [W(ctx, `drafts/${d.slug}/script.js`), W(ctx, `drafts/${d.slug}/cast.js`), RESEARCH_FILE, RESEARCH_PAGE],
              keys: [`drafts/${d.slug}`],
              reads: [W(ctx, `drafts/${d.slug}/fit.json`), W(ctx, `drafts/${d.slug}/script.js`), W(ctx, 'fit/voices.md?'), `${RESEARCH_PAGE}?`],
              instructions: [
                `The fitting tool's table is drafts/${d.slug}/fit.json. Lines to settle:\n${open.map((l) => `- ${heardLine(l)}`).join('\n')}`,
                `Best effort is sufficient (the owner's ruling of 21 November 2026: subtitles carry the line). Choose among the respellings the tool tried (\`tried\`), or try your own in \`as\`, then re-fit: \`${fitCommand(ctx.id, { draft: d.slug })}\` (\`${renderDraftCommand(ctx.id, d.slug)}\` to listen). Change no line's words: only \`as\`, pauses and the guest's voice. Then move on: nothing goes back to the writer.`,
                `Record what stayed hard: \`${researchCommand(ctx.id, { draft: d.slug })}\` harvests the spellings that worked and lists every line still unsayable, weak or flagged; record the word that failed with \`--add <word> --line <id> --status cannot|unstable --note "…"\` (or a pattern with \`--pattern\`). It ends 0 when every hard line is recorded. A real person's name is never recorded and needs no waiver.`,
                'The one exception: something heard that is crude, alarming or out of bounds is never accepted. Choose another spelling; if none avoids it, put the line at the top of the notes, under "For the owner", with every heard text.',
                `Write drafts/${d.slug}/fit-notes.md: "For the owner" first (if any); then for each line above what you did and what it is heard as now; then, under "heard differently, caption exact", every real person's line still heard differently.`,
              ],
              rules: ["No line's text changes (only `as`, pauses and voices).", `Every hard line (unsayable, or flagged for a statement heard differently) is recorded in ${RESEARCH_FILE}.`, 'Nothing heard is crude, alarming or out of bounds; or the line is listed for the owner.'],
            }),
          )
        }
        return out
      },
      gates: [fitWords],
    },
    {
      before: (ctx) => fitDrafts(ctx),
      // a rewrite only when the owner asks for one (production/fit/owner-rewrites.json): not part of the routine flow
      tasks: (ctx) => {
        const out = []
        const asked = ownerRewrites(ctx, 'drafts')
        const rewrites = json(P(ctx, 'fit/rewrites.json'), {})
        for (const d of readDrafts(ctx)) {
          const ids = asked[d.slug]
          if (!ids) continue
          const f = readFit(ctx, { draft: d.slug })
          const lines = (f?.lines ?? []).filter((l) => !Array.isArray(ids) || !ids.length || ids.includes(l.id))
          // the script as it was when the owner asked: the task is done once it has changed
          if (!rewrites[d.slug]?.from) {
            rewrites[d.slug] = { from: d.version }
            writeJson(P(ctx, 'fit/rewrites.json'), rewrites)
          }
          const from = rewrites[d.slug].from
          out.push(
            task(ctx, 'fit', {
              id: `fit.rewrite-${d.slug}`,
              role: 'writer',
              kind: 'rewrite',
              segment: d.slug,
              title: `Lines in ${d.slug} the owner asked to be rewritten`,
              writes: [`drafts/${d.slug}/script.js`],
              alsoEdits: [W(ctx, `drafts/${d.slug}/sources.json`), W(ctx, `drafts/${d.slug}/notes.json`)],
              keys: [`drafts/${d.slug}`, `${d.slug} `],
              reads: [W(ctx, `drafts/${d.slug}/fit-notes.md?`), ...(d.notes.cards ?? []).map((c) => W(ctx, `research/kept/${c}.json`))],
              cards: d.notes.cards ?? [],
              instructions: [
                `The owner asked for these lines to be rewritten:\n${lines.map((l) => `- ${heardLine(l)}`).join('\n')}`,
                "Rewrite only those lines. A house character's line can be reworded. For a real person's line the choices are: a marked cut that keeps its meaning, a reading by a house character from the card, or the card alone. Do not render: the tool fits the new version.",
              ],
              rules: ['Each line above is changed; nothing heard is crude, alarming or out of bounds in fit.json.'],
              done: (c) => sha(join(draftsDir(c), d.slug, 'script.js')) !== from,
            }),
          )
        }
        return out
      },
      gates: [fitHeard],
    },
  ],
}

/** sound editors change no words (finding: a sound editor never changes what a line means) */
async function fitWords(ctx) {
  const g = gate('fit.words')
  const snap = json(P(ctx, 'fit/texts.json'), {})
  const rewritten = json(P(ctx, 'fit/rewrites.json'), {})
  for (const [slug, texts] of Object.entries(snap)) {
    if (rewritten[slug] || !has(join(draftsDir(ctx), slug, 'script.js'))) continue
    const now = textsOf(ctx, slug)
    for (const [id, t] of Object.entries(texts)) if (now[id] !== t) g.fail(`drafts/${slug}/script.js ${id}: the words changed ("${t}" → "${now[id] ?? '(gone)'}"); a sound editor changes only \`as\`, pauses and voices`)
  }
  return g.done()
}

/**
 * Every draft (or the given slugs) is fitted, best effort (the owner's ruling of 21 November 2026):
 * fit.json exists; nothing is heard as something alarming, out of bounds or crude (the only thing
 * that blocks; listed first, for the owner); every hard line left (unsayable, or a statement heard
 * differently) is recorded in the voice research file. Weak lines, a real name not heard and every
 * real person's line heard differently are warnings, listed for the owner's watch.
 */
export function fittedProblems(ctx, slugs) {
  const owner = []
  const failures = []
  const warnings = []
  const hashes = json(P(ctx, 'fit/hashes.json'), {})
  const research = readResearch(ctx)
  for (const slug of slugs) {
    const f = readFit(ctx, { draft: slug })
    if (!f) {
      failures.push(`drafts/${slug}/fit.json is missing: ${fitCommand(ctx.id, { draft: slug })}${ctx.tools.hasScript?.('fit') === false ? ' (npm run fit is not in package.json yet: the studio\'s fitting tool has not landed)' : ''}`)
      continue
    }
    if (!hashes[`draft:${slug}`]) warnings.push(`drafts/${slug}/fit.json was not made by this run`)
    const p = problemsOf(ctx, slug, f)
    for (const l of p.blocking) owner.push(`for the owner: ${slug} ${heardLine(l)}: never accepted; another spelling, or the owner asks for a rewrite (production/fit/owner-rewrites.json)`)
    const source = researchSource(ctx, { draft: slug })
    const unrecorded = p.hard.filter((l) => !isRecorded(research, l, source))
    for (const l of unrecorded) failures.push(`${slug} ${heardLine(l)}: its hard word is not recorded in ${RESEARCH_FILE}: ${researchCommand(ctx.id, { draft: slug })} --add <word> --line ${l.id} --status cannot|unstable --note "…"`)
    const recorded = p.hard.filter((l) => !unrecorded.includes(l))
    if (recorded.length) warnings.push(`${slug}: best effort, recorded (for the owner's watch): ${recorded.map((l) => l.id).join(', ')}`)
    if (p.weak.length) warnings.push(`${slug}: ${p.weak.length} weak line${p.weak.length === 1 ? '' : 's'} (${p.weak.map((l) => l.id).join(', ')})`)
    for (const l of p.different) warnings.push(`heard differently, caption exact: ${slug} ${heardLine(l)}`)
  }
  return { failures: [...owner, ...failures], warnings }
}

async function fitHeard(ctx) {
  const g = gate('fit.heard')
  const r = fittedProblems(ctx, readDrafts(ctx).map((d) => d.slug))
  r.failures.forEach((f) => g.fail(f))
  r.warnings.forEach((w) => g.warn(w))
  return g.done()
}

// ---------------------------------------------------------------- 9. select

const isInterview = (d) => d.standing === 'interview' || /\binterview\b/i.test(d.format ?? '')

/** the people in a draft, keyed as the ledger keys them (DID first) */
function peopleOf(ctx, d) {
  const k = (h) => keyOf(h, ctx.digest)
  return { speakers: [...new Set((d.notes.speakers ?? []).map(k).filter(Boolean))], all: [...new Set([...(d.notes.speakers ?? []), ...(d.notes.featured ?? [])].map(k).filter(Boolean))] }
}

/** pairs the repetition gate judged a repeat between two scripts, on their current versions */
function pairRepeats(ctx) {
  const drafts = readDrafts(ctx)
  const ver = (s) => drafts.find((d) => d.slug === s)?.version
  const out = []
  for (const f of repetitionFiles(P(ctx, 'review/repetition-scripts')))
    for (const x of f.items ?? [])
      if (Array.isArray(x.pair) && x.pair.length === 2 && x.verdict === 'repeat' && (!x.versions || x.versions.every((v, k) => v === ver(x.pair[k])))) out.push(x.pair)
  return out
}

/** what the consent refreshes put out: accounts and posts, from every round */
function consentOut(ctx) {
  return filesIn(P(ctx, 'review/consent'), '.json').flatMap((f) => readJsonFile(f).out ?? [])
}

/** the selection, with the caps applied as the rundown fills (finding 22) */
export function selection(ctx) {
  const drafts = readDrafts(ctx)
  const prev = previousAired(ctx)
  const spoke = new Set((prev?.guests ?? []).map((p) => keyOf(p, ctx.digest)))
  const caps = ctx.config.selection.caps ?? {}
  const pairs = pairRepeats(ctx)
  const outs = consentOut(ctx)
  const outKeys = new Set(outs.map((o) => o.account).filter(Boolean).map((h) => keyOf(h, ctx.digest)))
  const outPosts = new Set(outs.map((o) => o.post).filter(Boolean))
  const info = new Map(drafts.map((d) => {
    const src = has(join(d.dir, 'sources.json')) ? readJsonFile(join(d.dir, 'sources.json')) : {}
    const posts = new Set([...(src.posts ?? []).map((p) => p.uri), ...(src.lines ?? []).map((l) => l.post), ...(d.notes.results ?? [])].filter(Boolean))
    const accounts = [...(src.accounts ?? []).map((a) => a.did ?? keyOf(a.handle, ctx.digest))]
    return [d.slug, { ...peopleOf(ctx, d), posts, accounts, interview: isInterview({ ...d.notes, standing: d.notes.standing }) }]
  }))
  const blocked = (slug, chosen) => {
    const me = info.get(slug)
    if ([...me.all, ...me.accounts].some((k) => outKeys.has(k)) || [...me.posts].some((u) => outPosts.has(u))) return 'the consent refresh put an account or post in it out'
    const back = me.speakers.find((k) => spoke.has(k))
    if (back) return `someone who spoke in ${prev.id} speaks in it`
    if (me.interview && chosen.filter((s) => info.get(s).interview).length >= (caps.interviews ?? 1)) return `an episode has ${caps.interviews ?? 1} interview`
    const max = caps.segmentsPerPerson ?? 2
    const over = me.all.find((k) => chosen.filter((s) => info.get(s).all.includes(k)).length >= max)
    if (over) return `someone in it is already in ${max} selected segments`
    const pair = pairs.find((p) => p.includes(slug) && chosen.includes(p.find((x) => x !== slug)))
    if (pair) return `it repeats with ${pair.find((x) => x !== slug)} (a verdict on the pair)`
    return null
  }
  const rows = drafts.map((d) => ({ slug: d.slug, title: d.notes.title, standing: d.notes.standing, seconds: Math.round(Number(d.notes.seconds) || 0) }))
  const reviews = filesIn(P(ctx, 'review/select'), '.json').map(readJsonFile)
  return selectDrafts({ drafts: rows, reviews, weights: ctx.config.selection.weights, targetSeconds: ctx.limits.targetSeconds, maxSeconds: ctx.limits.runtimeSeconds.max, excluded: excludedOf(ctx, 'select'), blocked })
}

const selectedItems = (ctx) => {
  const drafts = readDrafts(ctx)
  return selection(ctx).rows.filter((r) => r.selected).map((r) => ({ id: r.slug, version: drafts.find((d) => d.slug === r.slug)?.version }))
}
export const selectionHash = (ctx) => shaText(selectedItems(ctx).map((i) => `${i.id}@${i.version}`).join(','))

/** the selected drafts' sources merged, for the consent refresh */
function writeSelectedSources(ctx) {
  const merged = { format: 'late-cluster-sources/1', week: ctx.week, selection: selectionHash(ctx), accounts: [], posts: [], links: [], lines: [], numbers: [] }
  for (const { id } of selectedItems(ctx)) {
    const f = join(draftsDir(ctx), id, 'sources.json')
    if (!has(f)) continue
    const j = readJsonFile(f)
    for (const a of j.accounts ?? []) if (!merged.accounts.some((x) => normHandle(x.handle) === normHandle(a.handle))) merged.accounts.push(a)
    for (const p of j.posts ?? []) if (!merged.posts.some((x) => x.uri === p.uri)) merged.posts.push({ ...p, segment: p.segment ?? id })
    for (const k of ['links', 'lines', 'numbers']) merged[k].push(...(j[k] ?? []))
  }
  writeJson(P(ctx, 'select/sources.json'), merged)
}

const select = {
  name: 'select',
  waves: [
    {
      before: (ctx) => fitDrafts(ctx),
      tasks: (ctx) => {
        const drafts = readDrafts(ctx)
        const scored = filesIn(P(ctx, 'review/select'), '.json').map((f) => f.split('/').pop().replace('.json', ''))
        const scorers = reviewerIds(ctx)
          .filter((r) => !scored.includes(r))
          .map((r) =>
            task(ctx, 'select', {
              id: `select.${r}`,
              role: 'reviewer',
              title: `Score the fitted drafts (${r})`,
              writes: [`review/select/${r}.json`],
              keys: [`review/select/${r}.json`, `${r} `],
              reads: drafts.flatMap((d) => [W(ctx, `drafts/${d.slug}/script.js`), W(ctx, `drafts/${d.slug}/notes.json`)]),
              instructions: [
                `Score every draft (${drafts.map((d) => d.slug).join(', ')}) from 0 to 10 on four things: funny; interesting; television (does it work on screen: nothing left to read in silence); variety (something different from the other drafts and from ${previousLabel(ctx)}). Standing segments are selected on merit too.`,
                `Write review/select/${r}.json: { "reviewer": "${r}", "drafts": { "<slug>": { "funny", "interesting", "television", "variety", "reason" } }, "inherit": [] }. Judge alone. "inherit" is usually empty; only if a builder truly needs an earlier file as reference: { "from": "<episode id>", "path": "segments/<seg>/index.js", "why" }.`,
                'The tool fills the rundown by score and applies the caps (one interview, nobody in more than two segments, nobody who spoke in the previous aired episode).',
              ],
              rules: ['All four scores, 0 to 10, for every draft, with a reason.'],
            }),
          )
        if (scorers.length) return scorers
        const items = selectedItems(ctx)
        const files = repetitionFiles(P(ctx, 'review/repetition-scripts'))
        const pending = pendingRepetition(files, items, reviewerIds(ctx))
        if (Object.keys(pending).length)
          return Object.entries(pending).map(([r, { round, items: its }]) =>
            task(ctx, 'select', {
              id: `select.repetition-${r}-r${round}`,
              role: 'reviewer',
              kind: 'repetition',
              title: `Repetition gate on the selected scripts, round ${round} (${r})`,
              writes: [`review/repetition-scripts/${r}-r${round}.json`],
              keys: [`review/repetition-scripts/${r}-r${round}.json`, `${r}'s`, `${r} `],
              reads: [`${R(ctx, ctx.ledgerDir)}/README.md?`, ...its.map((it) => W(ctx, `drafts/${it.id}/script.js`))],
              instructions: [
                'With the ledger and the earlier scripts in front of you, give each selected script one verdict. A standing segment recurs by the owner\'s decision; what must be new is how it is built.',
                'A repeat that exists only between two of these scripts goes on the pair: an item { "pair": ["<slug>", "<slug>"], "versions": ["<version>", "<version>"], "verdict": "repeat", "avoid" }. The tool then keeps the better-scored one.',
                'Scripts and the version each verdict names: ' + items.map((it) => `${it.id} (version ${it.version})`).join(', ') + (its.length < items.length ? `. Judge again: ${its.map((x) => x.id).join(', ')}.` : ''),
                `Write review/repetition-scripts/${r}-r${round}.json: { "reviewer": "${r}", "round": ${round}, "items": [{ "id": "<slug>", "version": "<version>", "verdict": "fresh|turned|repeat", "turned": { "what", "how" }, "fromPrevious": true|false, "avoid", "reason" }] }. Judge alone.`,
              ],
              rules: [...REPETITION_RULES(ctx), 'Each verdict names the script\'s current version.'],
            }),
          )
        const combined = combineRepetition(files, items)
        const redrafts = items
          .filter((it) => combined[it.id]?.verdict === 'repeat')
          .map((it) => {
            const d = drafts.find((x) => x.slug === it.id)
            return task(ctx, 'select', {
              id: `select.redraft-${it.id}`,
              role: 'writer',
              kind: 'redraft',
              segment: it.id,
              title: `Redraft ${it.id}`,
              writes: [`drafts/${it.id}/script.js`],
              alsoEdits: [W(ctx, `drafts/${it.id}/notes.json`), W(ctx, `drafts/${it.id}/sources.json`)],
              keys: [`drafts/${it.id}`, `script ${it.id}`],
              reads: [...(d?.notes.cards ?? []).map((c) => W(ctx, `research/kept/${c}.json`)), 'packages/show/tools/README.md'],
              cards: d?.notes.cards ?? [],
              instructions: [`The draft ${it.id} was selected but cannot go forward as it is. Avoid: ${combined[it.id].verdicts.map((v) => v.avoid).filter(Boolean).join(' / ') || '(not given)'}.`, `Rewrite drafts/${it.id}/script.js (and notes.json, sources.json if they change) so it steers clear of that, or turns it on its head. Do not render: the tool fits the new version, and reviewers judge it.`],
              rules: ['The new version loads and keeps every real-people rule of the draft stage.'],
              done: (c) => readDrafts(c).find((x) => x.slug === it.id)?.version !== it.version,
            })
          })
        if (redrafts.length) return redrafts
        // the consent refresh, once per selection
        const hash = selectionHash(ctx)
        const rounds = filesIn(P(ctx, 'review/consent'), '.json').map(readJsonFile)
        if (rounds.some((x) => x.selection === hash)) return []
        writeSelectedSources(ctx)
        const n = rounds.length + 1
        const dd = R(ctx, ctx.digestDir)
        return [
          task(ctx, 'select', {
            id: `select.consent-r${n}`,
            role: 'auditor',
            kind: 'consent',
            title: `Refresh consent for the selection (round ${n})`,
            writes: [`review/consent/r${n}.json`],
            alsoEdits: [W(ctx, `review/consent-r${n}.md`)],
            reads: [W(ctx, 'select/sources.json'), `${dd}/private/bio-review.md?`],
            instructions: [
              `Run \`${sourcesCommand(W(ctx, 'select/sources.json'), dd, W(ctx, `review/consent-r${n}.md`))} --json\`. It reads, over the network, every selected account's bio and labels as they are now, the pinned post, posts since the scrape and any post about the show, and checks that each cited post still exists unchanged. Exit 1 means something needs a person: you.`,
              'Rule on every selected account the scraper flagged for its bio (private/bio-review.md, "bioReview"). An account whose bio or posts ask not to be quoted, kept or used is out; so is a cited post that is gone or changed. Use the network only through npm run sources and npm run media.',
              `Write review/consent/r${n}.json: { "selection": "${hash}", "verdict": "pass" | "out", "out": [{ "account": "<handle or DID>" } or { "post": "<at://>" }], "reason": "<one sentence>" }. The tool drops every draft with something out and selects again.`,
            ],
            rules: [`"selection" is "${hash}"; "verdict" is "pass" with "out" empty, or "out" with at least one account or post.`],
          }),
        ]
      },
      after: (ctx) => {
        const sel = selection(ctx)
        const drafts = readDrafts(ctx)
        const items = drafts.map((d) => ({ id: d.slug, version: d.version }))
        const combined = combineRepetition(repetitionFiles(P(ctx, 'review/repetition-scripts')), items)
        writeJson(P(ctx, 'select/scores.json'), { weights: ctx.config.selection.weights, targetSeconds: ctx.limits.targetSeconds, maxSeconds: ctx.limits.runtimeSeconds.max, total: sel.total, drafts: sel.rows.map(({ reviewers, ...r }) => r) })
        writeJson(P(ctx, 'review/repetition-scripts.json'), { verdicts: combined, pairs: pairRepeats(ctx) })
        writeSelectedSources(ctx)
        const chosen = sel.rows.filter((r) => r.selected)
        writeJson(P(ctx, 'plan.json'), {
          format: 'late-cluster-plan/2',
          id: ctx.id,
          week: ctx.week,
          segments: chosen.map((r) => {
            const d = drafts.find((x) => x.slug === r.slug)
            return { id: r.slug, title: d.notes.title, format: d.notes.format, seconds: Math.round(Number(d.notes.seconds) || 0), standing: d.notes.standing ?? null, cards: d.notes.cards ?? [], ideas: d.notes.ideas ?? [], turn: d.notes.turn ?? null, speakers: d.notes.speakers ?? [], featured: d.notes.featured ?? [], ...(d.notes.genre ? { genre: d.notes.genre, theme: d.notes.theme } : {}), score: r.score, repetition: combined[r.slug]?.verdict ?? null }
          }),
          cut: sel.rows.filter((r) => !r.selected).map((r) => ({ what: r.slug, why: r.why })),
          inherit: dedupeInherit(filesIn(P(ctx, 'review/select'), '.json').flatMap((f) => readJsonFile(f).inherit ?? [])),
        })
      },
      gates: [selectScores, selectRepetition, selectCaps, selectConsent, selectFitted, selectFits, selectInherit],
    },
  ],
}

const dedupeInherit = (xs) => xs.filter((x, k) => x && xs.findIndex((y) => y?.from === x.from && y?.path === x.path) === k)

async function selectScores(ctx) {
  const g = gate('select.scores')
  const reviews = filesIn(P(ctx, 'review/select'), '.json').map(readJsonFile)
  for (const d of readDrafts(ctx)) {
    const n = reviews.filter((r) => ['funny', 'interesting', 'television', 'variety'].every((k) => typeof r.drafts?.[d.slug]?.[k] === 'number')).length
    if (n < ctx.config.parallel.reviewers) g.fail(`draft ${d.slug} has scores from ${n} reviewers; it needs ${ctx.config.parallel.reviewers}`)
  }
  return g.done()
}

async function selectRepetition(ctx) {
  const g = gate('repetition.scripts')
  const items = selectedItems(ctx)
  const combined = combineRepetition(repetitionFiles(P(ctx, 'review/repetition-scripts')), items)
  const r = repetitionProblems(combined, { reviewers: ctx.config.repetition.reviewers, maxTurnedFromPrevious: ctx.config.repetition.maxTurnedFromPrevious, label: 'script' })
  r.failures.forEach((f) => g.fail(f))
  const chosen = items.map((i) => i.id)
  for (const p of pairRepeats(ctx)) if (p.every((s) => chosen.includes(s))) g.fail(`scripts ${p.join(' and ')} repeat each other (a verdict on the pair) and are both selected`)
  const turned = Object.values(combined).filter((c) => c.verdict === 'turned').map((c) => c.id)
  if (turned.length) g.warn(`turned: ${turned.join(', ')} (review/repetition-scripts.json)`)
  return g.done()
}

async function selectCaps(ctx) {
  const g = gate('select.caps')
  const drafts = readDrafts(ctx)
  const chosen = new Set(selection(ctx).rows.filter((r) => r.selected).map((r) => r.slug))
  const sel = drafts.filter((d) => chosen.has(d.slug))
  const caps = ctx.config.selection.caps ?? {}
  const interviews = sel.filter((d) => isInterview(d.notes)).length
  if (interviews > (caps.interviews ?? 1)) g.fail(`${interviews} interviews selected; an episode has ${caps.interviews ?? 1}`)
  const count = new Map()
  for (const d of sel) for (const k of peopleOf(ctx, d).all) count.set(k, (count.get(k) ?? 0) + 1)
  for (const [k, n] of count) if (n > (caps.segmentsPerPerson ?? 2)) g.fail(`${k} is in ${n} selected segments; at most ${caps.segmentsPerPerson ?? 2}`)
  const p = peopleRules(ctx.ledger, ctx.paths.number, { speakers: sel.flatMap((d) => d.notes.speakers ?? []), featured: sel.flatMap((d) => [...(d.notes.featured ?? []), ...(d.notes.speakers ?? [])]) }, ctx.config.people, ctx.digest)
  p.failures.forEach((f) => g.fail(f))
  p.warnings.forEach((w) => g.warn(w))
  return g.done()
}

async function selectConsent(ctx) {
  const g = gate('select.consent')
  const hash = selectionHash(ctx)
  const round = filesIn(P(ctx, 'review/consent'), '.json').map((f) => ({ f, j: readJsonFile(f) })).find((x) => x.j.selection === hash)
  if (!round) g.fail(`no consent refresh for the current selection (${hash})`)
  else if (!['pass', 'out'].includes(round.j.verdict)) g.fail(`${R(ctx, round.f)}: "verdict" is "pass" or "out"`)
  else if (round.j.verdict === 'out' && !(round.j.out ?? []).length) g.fail(`${R(ctx, round.f)}: "out" names no account or post`)
  else if (round.j.verdict === 'out') g.fail(`${R(ctx, round.f)}: the current selection still has something out; the tool selects again on the next run`)
  return g.done()
}

async function selectFitted(ctx) {
  const g = gate('select.fitted')
  const r = fittedProblems(ctx, selectedItems(ctx).map((i) => i.id))
  r.failures.forEach((f) => g.fail(`${f} (a redraft is fitted again: run --from fit)`))
  return g.done()
}

async function selectFits(ctx) {
  const g = gate('select.fits')
  const sel = selection(ctx)
  const chosen = sel.rows.filter((r) => r.selected)
  if (!chosen.length) g.fail('nothing was selected')
  if (sel.total > ctx.limits.runtimeSeconds.max) g.fail(`the rundown is ${sel.total} s, over the ${ctx.limits.runtimeSeconds.max} s ceiling`)
  g.warn(`selected ${chosen.map((r) => `${r.slug} (${r.score})`).join(', ')}: about ${sel.total} s of a ${ctx.limits.targetSeconds} s target`)
  return g.done()
}

async function selectInherit(ctx) {
  const g = gate('select.inherit')
  const plan = json(P(ctx, 'plan.json'))
  for (const [k, e] of (plan?.inherit ?? []).entries()) for (const why of inheritProblems(ctx.root, ctx.id, e)) g.fail(`plan.json inherit[${k}]: ${why}`)
  return g.done()
}

export const DRAFTS = { draft, fit, select }
