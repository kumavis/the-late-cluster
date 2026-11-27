// Stages 1 to 6 of docs/WORKFLOW.md: scope, research, rank cards, brainstorm, shortlist and the
// repetition gate on ideas. Reviewers' and auditors' files are under production/review/; what other
// roles read (research/, rank/, the longlist, terms.md) carries numbers and decisions, never a
// reviewer's reasons (trial finding 17).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { findPost, isOptedOut } from '../digest.mjs'
import { experimentProblems, coldStretches } from '../experiment.mjs'
import { combineRepetition, filesIn, ideaProblems, rankCards, reachOf, reachWeights, readCards, readIdeas, readJsonFile, repetitionProblems, shortlistCards } from '../combine.mjs'
import { peopleRules } from '../ledger.mjs'
import { gate } from '../gates/common.mjs'
import { coverage, coverageMd } from '../coverage.mjs'
import { laneFiles, laneSkeletons, laneTaggers, loadSkeletons, lookupCommand, markOf, mediaCommand } from '../scraper.mjs'
import { writeJson } from '../repo.mjs'
import { pronounLabel } from '../pronouns.mjs'
import { verbatimMismatch } from '../scan.mjs'
import { NOTE_FORMAT, NOTE_RULE, REPORT_RULE, STOP_RULE, noteProblems } from '../consent.mjs'
import { P, W, R, REPETITION_RULES, excludedOf, has, json, pendingRepetition, previousLabel, repetitionFiles, reviewerIds, task } from './common.mjs'

// ---------------------------------------------------------------- 1. scope

const SCOPE_Q = ['Is this the community the show is about?', 'Is it wide enough that the episode will not be about the same few people?', 'Is anything obviously missing?']

/** review/scope.md's verdict: the first line of its "## Verdict" section, and nothing else (finding 2) */
export function scopeVerdict(md) {
  const m = /^## Verdict\s*\n+([^\n]*)/m.exec(md ?? '')
  if (!m) return null
  const v = /^(proceed|rescrape)\b:?\s*(.*)$/i.exec(m[1].trim())
  return v ? { verdict: v[1].toLowerCase(), change: v[2].trim() } : { verdict: null, raw: m[1].trim() }
}

const scope = {
  name: 'scope',
  prepare(ctx) {
    const c = coverage(ctx)
    writeJson(P(ctx, 'scope/coverage.json'), c)
    mkdirSync(P(ctx, 'scope'), { recursive: true })
    writeFileSync(P(ctx, 'scope/coverage.md'), coverageMd(c))
  },
  waves: [
    {
      tasks: (ctx) => {
        const dd = R(ctx, ctx.digestDir)
        const rejected = filesIn(P(ctx, 'review'), '').filter((f) => /\/scope\.md\.rejected-\d+$/.test(f))
        const earlier = rejected.map((f, k) => {
          const v = scopeVerdict(readFileSync(f, 'utf8'))
          return `Round ${k + 1} asked: ${v?.verdict === 'rescrape' ? `rescrape: ${v.change}` : v?.verdict ?? 'no verdict'}. The scraper's configuration was changed and the same window scraped again; judge the new figures, and say whether that request was met.`
        })
        return [
          task(ctx, 'scope', {
            id: 'scope.auditor',
            role: 'auditor',
            title: rejected.length ? `Scope review, round ${rejected.length + 1}` : 'Scope review: the right community, widely enough?',
            earlier,
            writes: ['review/scope.md'],
            reads: [W(ctx, 'scope/coverage.md'), `${dd}/coverage.md?`, 'packages/scraper/config/cluster.json?'],
            instructions: [
              "Read the tool's figures (scope/coverage.md), the scraper's coverage report and its cluster configuration. Nothing else is needed.",
              `Write review/scope.md with these sections, in order: ${SCOPE_Q.map((q) => `"## ${q}"`).join(', ')}, "## Notes to the owner", "## Notes to research", "## Verdict".`,
              'The first line under "## Verdict" is exactly `proceed`, or `rescrape: <one change to the scraper configuration that fits the request budget>`. A rescrape is a valid result.',
            ],
            rules: ['Every section above is present, in a heading of its own.', 'The verdict is read from the first line under "## Verdict" only.'],
          }),
        ]
      },
      gates: [scopeReview],
    },
  ],
}

async function scopeReview(ctx) {
  const g = gate('scope.review')
  const f = P(ctx, 'review/scope.md')
  const md = has(f) ? readFileSync(f, 'utf8') : ''
  for (const h of [...SCOPE_Q, 'Notes to the owner', 'Notes to research', 'Verdict']) if (!md.includes(`## ${h}`)) g.fail(`review/scope.md has no "## ${h}" section`)
  const v = scopeVerdict(md)
  if (!v?.verdict) g.fail('review/scope.md: the first line under "## Verdict" must be `proceed` or `rescrape: <change>`')
  else if (v.verdict === 'rescrape') g.sendBack('scope', "the auditor asks for a rescrape (review/scope.md, Verdict): a builder changes the scraper's configuration, rescrapes the same window into the same folder (its .cache keeps it inside the request budget: do not delete the folder), then run produce again", f)
  return g.done()
}

// ---------------------------------------------------------------- 2. research

const CARD_FORMAT = '{ "id": "<lane>-<words>", "lane", "title", "skeletons": ["<skeleton id>"], "posts": ["<at:// uri>", …] (the skeletons\' posts you keep; omit for all), "summary": "<what happened, in neutral words>", "media": { "<at:// uri>": "<what the picture or video shows>" }, "showable": "<what could be shown working, or none>", "unknown": "<what is not understood, or none>", "sensitive": "<notes, or none>" }'

/** a card's posts: the ones it names, else every post of its skeletons; each enriched from the skeleton */
export function cardPosts(ctx, card, skeletons = loadSkeletons(ctx.digestDir, ctx.digest)) {
  const fromSk = (card.skeletons ?? []).flatMap((id) => skeletons.list.find((s) => s.id === id)?.posts ?? [])
  const named = (card.posts ?? []).map((p) => (typeof p === 'string' ? p : p?.uri)).filter(Boolean)
  const uris = named.length ? named : fromSk.map((p) => p.uri)
  const anywhere = (u) => ((card.skeletons ?? []).length ? null : skeletons.list.find((s) => s.id === findPost(ctx.digest, u)?.story)?.posts.find((p) => p.uri === u) ?? null)
  return uris.map((u) => fromSk.find((p) => p.uri === u) ?? anywhere(u)).map((p, k) => p ?? { uri: uris[k], missing: true })
}

// The tagged lane: the card records who pointed, and proposes nothing (a tag decides nothing).
const POINTED_BY = '"pointedBy": ["<at:// uri of each tagger\'s post, from lanes/tagged.json>"]'
const PROPOSALS = ['proposal', 'recommend', 'recommendation', 'pitch', 'priority', 'promise']

/** research lanes that get a task: a lane marked skipWhenEmpty is left out when its slice is empty */
export function activeLanes(ctx, sk = loadSkeletons(ctx.digestDir, ctx.digest)) {
  return ctx.config.parallel.researchLanes.map((lane) => ({ lane, ids: laneSkeletons(ctx.digestDir, sk, lane.id) })).filter((x) => !(x.lane.skipWhenEmpty && !x.ids.length))
}
export const emptyLanes = (ctx, sk) => { const on = new Set(activeLanes(ctx, sk).map((x) => x.lane.id)); return ctx.config.parallel.researchLanes.filter((l) => !on.has(l.id)) }

const hasMedia = (p) => (p.media?.length ?? 0) > 0 || (Array.isArray(p.alt) ? p.alt.length : p.alt) || (p.text === '' && !p.missing)

export function researchCardProblems(ctx, { file, card, lane }, skeletons) {
  const out = []
  const at = R(ctx, file)
  const lanes = ctx.config.parallel.researchLanes.map((l) => l.id)
  if (!card || typeof card !== 'object') return [`${at}: not a JSON object`]
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(card.id ?? '')) || !String(card.id).startsWith(`${lane}-`)) out.push(`${at}: "id" must be lower case words and dashes starting "${lane}-"`)
  if (card.lane !== lane || !lanes.includes(lane)) out.push(`${at}: "lane" must be "${lane}", the folder it sits in`)
  for (const k of ['title', 'summary']) if (!String(card[k] ?? '').trim()) out.push(`${at}: "${k}" is empty`)
  for (const k of ['sensitive', 'showable', 'unknown']) if (typeof card[k] !== 'string') out.push(`${at}: "${k}" must be a sentence, or "none"`)
  for (const k of ['jokes', 'ideas', 'premise', 'turn', 'punchline', 'gag', 'angle']) if (k in card) out.push(`${at}: a card carries no jokes ("${k}")`)
  for (const id of card.skeletons ?? []) if (!skeletons.list.some((s) => s.id === id)) out.push(`${at}: skeleton ${id} is not in the week's skeletons`)
  if (lane === 'tagged') {
    const taggers = laneTaggers(ctx.digestDir)
    const allowed = new Set((card.skeletons ?? []).flatMap((id) => (taggers.get(id) ?? []).map((t) => t.uri)))
    const named = Array.isArray(card.pointedBy) ? card.pointedBy.map((x) => (typeof x === 'string' ? x : x?.uri)) : []
    if (!named.length) out.push(`${at}: a tagged card records who pointed: ${POINTED_BY}`)
    for (const u of named) if (!allowed.has(u)) out.push(`${at}: pointedBy ${u} is not a tagger's post for the card's skeletons in lanes/tagged.json`)
    for (const k of PROPOSALS) if (k in card) out.push(`${at}: a tagged card proposes nothing ("${k}"): a tag guides where the show looks and decides nothing else`)
  }
  if (!(card.skeletons ?? []).length && !(card.posts ?? []).length) out.push(`${at}: name the "skeletons" the card is made from`)
  const posts = cardPosts(ctx, card, skeletons)
  if (!posts.length) out.push(`${at}: the card keeps no post`)
  for (const p of posts) {
    if (p.missing) {
      out.push(`${at}: ${p.uri} is not a post of the card's skeletons`)
      continue
    }
    const ref = (card.posts ?? []).find((x) => typeof x === 'object' && x?.uri === p.uri)
    if (ref && typeof ref.text === 'string' && p.text && verbatimMismatch(ref.text, p.text)) out.push(`${at}: ${p.uri}: "text" is not the post's exact text; leave text out, the tool copies it from the skeleton`)
    if (markOf(p)) out.push(`${at}: ${p.uri} is marked sensitive by the scraper (${typeof markOf(p) === 'string' ? markOf(p) : 'marked'}); leave that post out, the rest of the story stays usable`)
    if (isOptedOut(ctx.digest, p.handle) || isOptedOut(ctx.digest, p.did)) out.push(`${at}: ${p.uri} is by an opted-out account; leave it out`)
    if (hasMedia(p) && !String(card.media?.[p.uri] ?? '').trim()) out.push(`${at}: ${p.uri} has pictures or video: say what they show in "media" (look with ${mediaCommand(R(ctx, ctx.digestDir), p.uri)})`)
  }
  return out
}

/** the longlist as other roles see it: each card with its posts' exact text and people, no reasons */
function writeLonglist(ctx) {
  const skeletons = loadSkeletons(ctx.digestDir, ctx.digest)
  const screen = json(P(ctx, 'review/screen.json'), {}).cards ?? {}
  const w = reachWeights(ctx.root, ctx.config)
  const cards = readCards(ctx.prod).map(({ card, file }) => {
    const s = screen[card.id]
    const dropped = new Set(s?.drop ?? [])
    const posts = cardPosts(ctx, card, skeletons).filter((p) => !p.missing && !dropped.has(p.uri))
    const reach = Math.round(posts.reduce((t, p) => t + (typeof p.reach === 'number' ? p.reach : reachOf(ctx.digest, [p.uri], w)), 0))
    const people = [...new Map(posts.filter((p) => p.handle).map((p) => [p.did ?? p.handle, { handle: p.handle, did: p.did, followers: p.followers, featured: p.featured, pronouns: pronounLabel(p.pronouns), pronounForms: p.pronouns?.forms ?? [] }])).values()]
    return { id: card.id, lane: card.lane, title: card.title, summary: card.summary, file: R(ctx, file), reach, kept: s ? s.keep === true : null, mergedInto: s?.mergedInto ?? null, posts: posts.map(({ uri, url, handle, did, text, followers, replyTo, quotes, alt, repostNotes }) => ({ uri, url, handle, did, text, followers, replyTo, quotes, alt, media: card.media?.[uri] ?? null, ...(repostNotes ? { repostNotes } : {}) })), people, showable: card.showable, unknown: card.unknown, sensitive: card.sensitive }
  })
  for (const c of cards) if (c.mergedInto) {
    const t = cards.find((x) => x.id === c.mergedInto)
    if (t) t.merged = [...(t.merged ?? []), { card: c.id, posts: c.posts }]
  }
  writeJson(P(ctx, 'research/longlist.json'), { reachNote: "Reach stands in for how many people saw it, which Bluesky does not publish: the sum of the scraper's reach score over the card's posts.", cards })
  // one file per kept card: what a writer is pointed at, instead of the whole longlist
  for (const c of cards.filter((x) => x.kept)) writeJson(P(ctx, `research/kept/${c.id}.json`), c)
  const terms = ['# Terms of use', '', 'Written by the tool from the screen. Every brief for a card includes its section.', '', ...cards.filter((c) => c.kept).flatMap((c) => [`## ${c.id}`, '', String(screen[c.id]?.terms ?? 'none').trim() || 'none', '', `People (stated pronouns): ${c.people.map((p) => `@${p.handle}: ${p.pronouns}`).join('; ') || 'none'}.`, ''])]
  writeFileSync(P(ctx, 'research/terms.md'), terms.join('\n'))
  return cards
}

const research = {
  name: 'research',
  waves: [
    {
      tasks: (ctx) => {
        const dd = R(ctx, ctx.digestDir)
        const sk = loadSkeletons(ctx.digestDir, ctx.digest)
        return activeLanes(ctx, sk).map(({ lane, ids }) => {
          return task(ctx, 'research', {
            id: `research.${lane.id}`,
            role: 'researcher',
            lane: lane.id,
            title: `Research lane: ${lane.title}`,
            writes: [`research/cards/${lane.id}/`],
            reads: [...laneFiles(ctx.digestDir, lane.id).map((f) => R(ctx, f)), sk.source === 'scraper' ? `${dd}/skeletons/index.json` : `${dd}/digest.md?`],
            instructions: [
              `Your lane is "${lane.title}". Its slice of the digest is listed above${ids.length ? `; its skeletons: ${ids.slice(0, 60).join(', ')}${ids.length > 60 ? ` and ${ids.length - 60} more` : ''}` : ''}. ${sk.source === 'scraper' ? `A skeleton (${dd}/skeletons/<id>.json) already holds every post's exact text, people, reach, replies, alt text and media addresses.` : 'This digest has no skeletons yet: a skeleton id is a story id (s-…).'}`,
              `Choose the skeletons that are worth a card, merge those that are one story, and write one card per story as research/cards/${lane.id}/<card id>.json: ${lane.id === 'tagged' ? CARD_FORMAT.replace(/ \}$/, `, ${POINTED_BY} }`) : CARD_FORMAT}.`,
              `Look at every picture and video you keep (${mediaCommand(dd)} fetches them) and say in "media" what each shows. Look posts up with ${lookupCommand(dd)}. Never retype a post: name it by its address.`,
              lane.id === 'games' ? 'Top Chicken: every result in the window, the record and any streak. Winners only by name; never rank or name a non-winner.' : null,
              lane.id === 'voices' ? 'New and smaller voices: featured marks are facts for the people rules, never a reason to leave anyone out.' : null,
              lane.id === 'interview' ? 'Interview candidates: people who made something and were asked about it. One card per candidate, keeping each answer with the post it replied to.' : null,
              lane.id === 'tagged' ? `What the audience pointed at: members of the cluster tagged the show's account at these things. Card what was pointed at exactly like any other story: what happened, what is shown, what is not understood. Record on the card who pointed, as ${POINTED_BY}, and nothing more about them. Propose nothing: a tag guides where the show looks and decides nothing else, and the show promises nobody a place. The tagger's own post is addressed to the show; it is not material for the card.` : null,
            ].filter(Boolean),
            rules: [
              `"id" is lower case words and dashes and starts with "${lane.id}-"; "lane" is "${lane.id}".`,
              '"title" and "summary" are not empty; "sensitive", "showable" and "unknown" are each a sentence or "none".',
              'No joke fields: jokes, ideas, premise, turn, punchline, gag, angle.',
              'Every skeleton exists; every post is one of the card\'s skeletons\' posts.',
              'No post the scraper marks sensitive and no opted-out account: leave that post out; the rest of the story stays usable. A post with a repost note ("repostNotes": what it says about being quoted) is usable; the note goes with it to the longlist.',
              'Every kept post with a picture or video has its "media" description.',
              ...(lane.id === 'tagged' ? ['"pointedBy" names at least one tagger\'s post, each one listed for the card\'s skeletons in lanes/tagged.json; no proposal fields.'] : []),
            ],
          })
        })
      },
      after: (ctx) => writeLonglist(ctx),
      gates: [researchCards],
    },
    {
      tasks: (ctx) => [
        task(ctx, 'research', {
          id: 'research.screen',
          role: 'auditor',
          kind: 'screen',
          title: 'Screen the longlist against the constitution',
          writes: ['review/screen.json'],
          reads: [W(ctx, 'research/longlist.json'), `${R(ctx, ctx.digestDir)}/private/bio-review.md?`],
          instructions: [
            'Screen every card in research/longlist.json post by post against the constitution: out-of-bounds subjects, accounts that are out, small accounts who would not come off well, anything that cannot be used in its own context. One flagged post removes that post; it removes the card only if the story cannot stand without it.',
            `${STOP_RULE} An account that is out takes its posts off every card.`,
            `${NOTE_RULE} That covers every account on a kept card whose bio the scraper flagged (private/bio-review.md) and every post with "repostNotes".`,
            REPORT_RULE,
            `Write review/screen.json: { "cards": { "<card id>": { "keep": true|false, "reason": "<one sentence>", "drop": ["<at:// uri of a post removed>"], "mergedInto": "<card id that carries this story, for a duplicate>", "terms": "<on what terms a kept card may be used, or none>", "notes": [${NOTE_FORMAT}] } } }. This is the only file you write; the tool writes research/terms.md and the longlist from it.`,
          ],
          rules: ['A decision for every card: "keep" true or false, and a "reason".', 'A merged card has "keep": false and "mergedInto" naming a kept card.', '"drop" names posts on that card; a kept card keeps at least one post, none of them marked sensitive, out of bounds or opted out.', 'Every kept card has "terms" (a sentence, or "none").', 'Each note has "account", the exact "words", "where" (an at:// address or "bio") and "to".'],
        }),
      ],
      after: (ctx) => writeLonglist(ctx),
      gates: [researchScreen],
    },
  ],
}

async function researchCards(ctx) {
  const g = gate('research.cards')
  const sk = loadSkeletons(ctx.digestDir, ctx.digest)
  const cards = readCards(ctx.prod)
  if (!cards.length) g.fail('no cards in research/cards/<lane>/')
  const ids = new Set()
  for (const c of cards) {
    for (const f of researchCardProblems(ctx, c, sk)) g.fail(f)
    if (ids.has(c.card.id)) g.fail(`${R(ctx, c.file)}: card id ${c.card.id} is used twice`)
    ids.add(c.card.id)
  }
  const empty = emptyLanes(ctx, sk)
  for (const lane of empty) g.warn(`lane ${lane.id} (${lane.title}): nothing in this window's slice, so no task`)
  for (const lane of ctx.config.parallel.researchLanes) if (!empty.includes(lane) && !cards.some((c) => c.lane === lane.id)) g.warn(`lane ${lane.id} found nothing`)
  return g.done()
}

async function researchScreen(ctx) {
  const g = gate('research.screen')
  const f = P(ctx, 'review/screen.json')
  if (!has(f)) {
    g.fail('review/screen.json is missing')
    return g.done()
  }
  const screen = readJsonFile(f).cards ?? {}
  const sk = loadSkeletons(ctx.digestDir, ctx.digest)
  const cards = readCards(ctx.prod)
  for (const { card } of cards) {
    const s = screen[card.id]
    const at = `review/screen.json ${card.id}`
    if (!s) {
      g.fail(`review/screen.json has no decision for card ${card.id}`)
      continue
    }
    if (typeof s.keep !== 'boolean' || !String(s.reason ?? '').trim()) g.fail(`${at}: give "keep": true|false and a "reason"`)
    const posts = cardPosts(ctx, card, sk)
    for (const u of s.drop ?? []) if (!posts.some((p) => p.uri === u)) g.fail(`${at}: "drop" names ${u}, which is not on this card`)
    if (s.mergedInto) {
      if (s.keep) g.fail(`${at}: a merged card has "keep": false`)
      if (!screen[s.mergedInto]?.keep) g.fail(`${at}: "mergedInto" ${s.mergedInto} is not a kept card`)
    }
    if (s.keep !== true) continue
    const left = posts.filter((p) => !p.missing && !(s.drop ?? []).includes(p.uri))
    if (!left.length) g.fail(`${at}: kept, but every post is dropped`)
    for (const p of left) if (markOf(p) || isOptedOut(ctx.digest, p.handle) || ctx.digest.posts.get(p.uri)?.outOfBounds) g.fail(`${at}: keeps ${p.uri}, which is marked sensitive, out of bounds or opted out; drop it`)
    if (typeof s.terms !== 'string') g.fail(`${at}: a kept card needs "terms" (a sentence, or "none")`)
  }
  for (const [id, s] of Object.entries(screen)) for (const f of noteProblems(s?.notes, `review/screen.json ${id}`)) g.fail(f)
  if (!cards.some(({ card }) => screen[card.id]?.keep)) g.fail('the screen keeps no card')
  return g.done()
}

// ---------------------------------------------------------------- 3. rank cards

const kept = (ctx) => json(P(ctx, 'research/longlist.json'), { cards: [] }).cards.filter((c) => c.kept)
export const rankRows = (ctx) => json(P(ctx, 'rank/cards.json'), { cards: [] }).cards
export const poolRows = (ctx) => rankRows(ctx).filter((r) => r.pool)

const rank = {
  name: 'rank',
  waves: [
    {
      tasks: (ctx) =>
        reviewerIds(ctx).map((r) =>
          task(ctx, 'rank', {
            id: `rank.${r}`,
            role: 'reviewer',
            title: `Rank the cards for interest (${r})`,
            writes: [`review/rank/${r}.json`],
            keys: [`review/rank/${r}.json`, `${r} `],
            reads: [W(ctx, 'research/longlist.json')],
            instructions: [
              `Score every kept card in research/longlist.json ("kept": true, ${kept(ctx).length} cards) for interest, 0 to 10, by the constitution's interesting test: a turn or a feeling, from this window, that can be retold. Judge interest only: repetition and people have their own gates, and reach is the tool's.`,
              `Write review/rank/${r}.json: { "reviewer": "${r}", "cards": { "<card id>": { "interest": 0-10, "reason": "<one sentence>" } } }. Judge alone.`,
            ],
            rules: ['A score for every kept card, a number from 0 to 10, with a reason.'],
          }),
        ),
      after: (ctx) => {
        const rows = rankCards({ cards: kept(ctx), reviews: filesIn(P(ctx, 'review/rank'), '.json').map(readJsonFile), weights: ctx.config.ranking.weights, pool: ctx.config.ranking.pool, interviewPool: ctx.config.ranking.interviewPool })
        writeJson(P(ctx, 'rank/cards.json'), { weights: ctx.config.ranking.weights, cards: rows })
        const L = ['# The pool', '', 'Ranked for interest (two reviewers) and reach (the tool; a stand-in for views, which Bluesky does not publish). Interview candidates are ranked among themselves, for the standing interview.', '', '| # | card | reach | interest | score |', '|---|---|---|---|---|']
        rows.filter((x) => x.pool && !x.interview).forEach((x, k) => L.push(`| ${k + 1} | ${x.card} | ${x.reach} | ${x.interest} | ${x.score} |`))
        L.push('', '**Interview candidates**', '', '| # | card | reach | interest | score |', '|---|---|---|---|---|')
        rows.filter((x) => x.pool && x.interview).forEach((x, k) => L.push(`| ${k + 1} | ${x.card} | ${x.reach} | ${x.interest} | ${x.score} |`))
        writeFileSync(P(ctx, 'rank/pool.md'), L.join('\n') + '\n')
      },
      gates: [rankScores],
    },
  ],
}

async function rankScores(ctx) {
  const g = gate('rank.cards')
  const reviews = filesIn(P(ctx, 'review/rank'), '.json').map(readJsonFile)
  for (const c of kept(ctx)) {
    const n = reviews.filter((r) => typeof r.cards?.[c.id]?.interest === 'number').length
    if (n < ctx.config.parallel.reviewers) g.fail(`card ${c.id} has interest scores from ${n} reviewers; it needs ${ctx.config.parallel.reviewers}`)
    for (const r of reviews) {
      const s = r.cards?.[c.id]
      if (s && (!(s.interest >= 0 && s.interest <= 10) || !String(s.reason ?? '').trim())) g.fail(`${r.reviewer} ${c.id}: "interest" is 0 to 10, with a "reason"`)
    }
  }
  if (!poolRows(ctx).length) g.fail('the pool is empty')
  return g.done()
}

// ---------------------------------------------------------------- 4. brainstorm

const IDEA_FORMAT = '{ "card": "<card id>", "cards": ["<every card it uses, when it spans several>"], "premise": "<a line or two>", "turn": "<the surprise, in five words>", "screen": "<what lands on screen>", "format": "<what might carry it>", "words": ["<at:// posts whose real words it uses>"], "speakers": ["<handles of real accounts whose puppets would speak>"] }'

const brainstorm = {
  name: 'brainstorm',
  waves: [
    {
      tasks: (ctx) => {
        const pool = poolRows(ctx)
        return Array.from({ length: ctx.config.parallel.brainstormWriters }, (_, k) =>
          task(ctx, 'brainstorm', {
            id: `brainstorm.writer-${k + 1}`,
            role: 'writer',
            title: `Brainstorm, writer ${k + 1} of ${ctx.config.parallel.brainstormWriters}`,
            writes: [`brainstorm/writer-${k + 1}.jsonl`],
            reads: [W(ctx, 'rank/pool.md'), ...pool.map((r) => W(ctx, `research/kept/${r.card}.json`))],
            cards: pool.map((r) => r.card),
            instructions: [
              `Write joke ideas for each card in the pool (${pool.length} cards, listed in rank/pool.md, one file each above): as many as you can, unlike each other, quantity over polish. Interview candidates get ideas too: what an interview with them could show.`,
              `One idea per line of brainstorm/writer-${k + 1}.jsonl: ${IDEA_FORMAT}.`,
              'An idea for a song, an open or a close needs no card of its own: file it under the card whose material it uses. An idea that spans cards names its main card in "card" and all of them in "cards".',
              "Work alone: do not read the other writers' files. Do not score your ideas.",
            ],
            rules: ['Every line is a JSON object with "card", "premise", "turn", "screen" and "format".', '"card" and every entry of "cards" is a pool card.', '"words" and "speakers" are lists when present.'],
          }),
        )
      },
      after: (ctx) => {
        const ideas = readIdeas(ctx.prod).filter((i) => !i.rework)
        writeFileSync(P(ctx, 'brainstorm/ideas.jsonl'), ideas.map(({ file, ...i }) => JSON.stringify(i)).join('\n') + '\n')
      },
      gates: [brainstormIdeas],
    },
  ],
}

async function brainstormIdeas(ctx) {
  const g = gate('brainstorm.ideas')
  const pool = poolRows(ctx)
  const ids = new Set(pool.map((c) => c.card))
  const ideas = readIdeas(ctx.prod).filter((i) => !i.rework)
  for (const i of ideas) {
    for (const f of ideaProblems(i, ids)) g.fail(f.replace(`${ctx.paths.dir}/`, ''))
    for (const c of i.cards ?? []) if (!ids.has(c)) g.fail(`${R(ctx, i.file)}: idea ${i.id} names card ${c}, which is not in the pool`)
  }
  const min = ctx.config.parallel.minWritersPerCard
  for (const c of pool) {
    const writers = new Set(ideas.filter((i) => i.card === c.card || i.cards?.includes(c.card)).map((i) => i.writer))
    if (writers.size < min) g.fail(`pool card ${c.card} has ideas from ${writers.size} writer${writers.size === 1 ? '' : 's'}; every pool card needs ideas from at least ${min}`)
  }
  return g.done()
}

// ---------------------------------------------------------------- 5. shortlist

const ideaFor = (i, card) => i && (i.card === card || i.cards?.includes(card))

const shortlist = {
  name: 'shortlist',
  waves: [
    {
      tasks: (ctx) => {
        const pool = poolRows(ctx)
        return reviewerIds(ctx).map((r) =>
          task(ctx, 'shortlist', {
            id: `shortlist.${r}`,
            role: 'reviewer',
            title: `Shortlist: best joke, synergy and variety (${r})`,
            writes: [`review/shortlist/${r}.json`],
            keys: [`review/shortlist/${r}.json`, `${r} `],
            reads: [W(ctx, 'rank/pool.md'), W(ctx, 'brainstorm/ideas.jsonl'), ...pool.map((x) => W(ctx, `research/kept/${x.card}.json`))],
            instructions: [
              `For each of the ${pool.length} pool cards (rank/pool.md), with its ideas in brainstorm/ideas.jsonl: score its best joke (0-10), naming that idea's id; synergy (0-2: does it make another card better); variety (0-2: different people, subjects and kinds of comedy from the rest of the pool, and from ${previousLabel(ctx)}); and choose the ideas that should go forward. Interview candidates are scored the same way and ranked among themselves.`,
              `Write review/shortlist/${r}.json: { "reviewer": "${r}", "cards": { "<card id>": { "bestJoke": { "idea": "<idea id>", "score": 0-10 }, "synergy": 0-2, "variety": 0-2, "ideas": ["<idea id>"], "with": ["<card ids it combines with>"], "reason": "<one sentence>" } } }. Judge alone.`,
            ],
            rules: ['Every pool card scored; scores in range.', '"bestJoke.idea" and every chosen idea is an idea for that card.'],
          }),
        )
      },
      after: (ctx) => {
        const reviews = filesIn(P(ctx, 'review/shortlist'), '.json').map(readJsonFile)
        const rows = shortlistCards({ pool: poolRows(ctx), reviews, weights: ctx.config.shortlist.weights, size: ctx.config.shortlist.size })
        writeJson(P(ctx, 'rank/scores.json'), { weights: ctx.config.shortlist.weights, cards: rows })
        writeJson(P(ctx, 'rank/shortlist.json'), { cards: rows.filter((x) => x.shortlisted).map(({ card, title, final, ideas }) => ({ card, title, final, ideas })), interview: rows.filter((x) => x.interview).map(({ card, title, final, ideas }) => ({ card, title, final, ideas })) })
        const L = ['# Shortlist', '', '| # | card | rank | best joke | synergy | variety | final | ideas |', '|---|---|---|---|---|---|---|---|']
        rows.filter((x) => !x.interview).forEach((x, k) => L.push(`| ${k + 1}${x.shortlisted ? ' ✓' : ''} | ${x.card} | ${x.rank} | ${x.bestJoke} | ${x.synergy} | ${x.variety} | ${x.final} | ${x.ideas.join(', ')} |`))
        L.push('', '**Interview candidates** (the first is given to the standing interview)', '', '| # | card | final | ideas |', '|---|---|---|---|')
        rows.filter((x) => x.interview).forEach((x, k) => L.push(`| ${k + 1} | ${x.card} | ${x.final} | ${x.ideas.join(', ')} |`))
        writeFileSync(P(ctx, 'rank/shortlist.md'), L.join('\n') + '\n')
      },
      gates: [shortlistScores],
    },
    {
      tasks: (ctx) => [
        task(ctx, 'shortlist', {
          id: 'shortlist.experiment',
          role: 'reviewer',
          kind: 'experiment',
          title: "Propose the episode's one experiment",
          writes: ['experiment.md'],
          reads: [W(ctx, 'rank/shortlist.md'), `${R(ctx, ctx.ledgerDir)}/README.md?`],
          instructions: [
            'With the shortlist and the ledger in front of you, propose the one deliberate experiment this episode runs: something the show has not done. You can see what it has tried; the writers cannot.',
            'Write production/experiment.md with "## What we try" (an instruction, in a sentence or two), "## Why", "## Measure" (how someone else can check, once it is built, whether it was run and whether it worked), and, if the measure needs a cold viewer, "## Cold-viewer test": one line per stretch, `- <card id or segment id, or every segment>: longest silence` (the tool finds the longest interval with no spoken line and no audience sound) or `- <segment id>: <start>-<end> s`.',
            'It goes to the writers and builders: state only what to try. Never describe or name an earlier episode, its jokes, people or devices; no "last time", "again" or "this time". It cannot relax any article of the constitution.',
          ],
          rules: ['The three sections, each a sentence or more; nothing about earlier episodes.', 'Each "## Cold-viewer test" line names a card, a segment or "every segment", then "longest silence" or a stretch in seconds.'],
        }),
      ],
      gates: [shortlistExperiment],
    },
  ],
}

async function shortlistScores(ctx) {
  const g = gate('shortlist.scores')
  const reviews = filesIn(P(ctx, 'review/shortlist'), '.json').map(readJsonFile)
  const ideas = readIdeas(ctx.prod)
  for (const c of poolRows(ctx)) {
    const n = reviews.filter((r) => typeof r.cards?.[c.card]?.bestJoke?.score === 'number').length
    if (n < ctx.config.parallel.reviewers) g.fail(`pool card ${c.card} has shortlist scores from ${n} reviewers; it needs ${ctx.config.parallel.reviewers}`)
    for (const r of reviews) {
      const s = r.cards?.[c.card]
      if (!s) continue
      if (!(s.bestJoke?.score >= 0 && s.bestJoke.score <= 10) || !(s.synergy >= 0 && s.synergy <= 2) || !(s.variety >= 0 && s.variety <= 2)) g.fail(`${r.reviewer} ${c.card}: best joke is 0 to 10, synergy and variety 0 to 2`)
      for (const id of [s.bestJoke?.idea, ...(s.ideas ?? [])].filter((x) => x !== undefined)) if (!ideaFor(ideas.find((i) => i.id === id), c.card)) g.fail(`${r.reviewer} ${c.card}: idea ${id} is not an idea for this card`)
    }
  }
  return g.done()
}

async function shortlistExperiment(ctx) {
  const g = gate('shortlist.experiment')
  const f = P(ctx, 'experiment.md')
  const md = has(f) ? readFileSync(f, 'utf8') : null
  for (const p of experimentProblems(md)) g.fail(p)
  if (md) for (const p of coldStretches(md).problems) g.fail(p)
  return g.done()
}

// ---------------------------------------------------------------- what goes to drafting

/** the shortlist's ideas with rework replacements followed and excluded ideas removed */
function follow(ctx) {
  const ideas = readIdeas(ctx.prod)
  const replaced = new Map(ideas.filter((i) => i.replaces).map((i) => [i.replaces, i.id]))
  const ex = excludedOf(ctx, 'repetition-ideas')
  return (ids) => [...new Set(ids.map((id) => {
    let x = id
    for (let k = 0; k < 20 && replaced.has(x); k++) x = replaced.get(x)
    return x
  }))].filter((i) => !ex.includes(i))
}

/**
 * Every draft the draft stage will brief: one per shortlisted card, and the three standing segments,
 * each given its card and the ideas ranked for it (trial finding 16): the interview the best-ranked
 * candidate; Top Chicken the best-ranked kept games card about it; music the pool's song ideas.
 */
export function draftPlan(ctx) {
  const sl = json(P(ctx, 'rank/shortlist.json'), { cards: [], interview: [] })
  const f = follow(ctx)
  const out = sl.cards.map((c) => ({ slug: c.card.slice(0, 40).replace(/-+$/, ''), card: c.card, cards: [c.card], ideas: f(c.ideas), standing: null })).filter((d) => d.ideas.length)
  const scores = json(P(ctx, 'rank/scores.json'), { cards: [] }).cards
  const ideas = readIdeas(ctx.prod)
  const cfg = ctx.config.standing.cards ?? {}
  for (const s of ctx.config.standing.segments) {
    let card = null
    let chosen = []
    if (s === 'interview') {
      const top = sl.interview?.[0]
      card = top?.card ?? null
      chosen = top ? f(top.ideas) : []
    } else if (cfg[s]?.lane) {
      const re = cfg[s].match ? new RegExp(cfg[s].match, 'i') : null
      const row = rankRows(ctx).find((r) => r.lane === cfg[s].lane && (!re || re.test(`${r.card} ${r.title}`)))
      card = row?.card ?? null
      chosen = card ? f(scores.find((x) => x.card === card)?.ideas ?? ideas.filter((i) => ideaFor(i, card) && !i.rework).map((i) => i.id)) : []
    } else if (cfg[s]?.formats) {
      const re = new RegExp(cfg[s].formats, 'i')
      const picked = new Set(scores.flatMap((x) => x.ideas))
      const songs = ideas.filter((i) => !i.rework && re.test(i.format ?? '')).sort((a, b) => Number(picked.has(b.id)) - Number(picked.has(a.id)) || a.id.localeCompare(b.id)).slice(0, 4)
      chosen = f(songs.map((i) => i.id))
    }
    const cards = card ? [card] : [...new Set(chosen.map((id) => ideas.find((i) => i.id === id)?.card).filter(Boolean))]
    out.push({ slug: s, card, cards, ideas: chosen, standing: s })
  }
  return out
}

// ---------------------------------------------------------------- 6. repetition gate (ideas)

const repetitionIdeas = {
  name: 'repetition-ideas',
  waves: [
    {
      tasks: (ctx) => {
        const dir = P(ctx, 'review/repetition-ideas')
        const ideas = readIdeas(ctx.prod)
        const items = [...new Set(draftPlan(ctx).flatMap((d) => d.ideas))].map((id) => ({ id }))
        const files = repetitionFiles(dir)
        const pending = pendingRepetition(files, items, reviewerIds(ctx))
        if (Object.keys(pending).length)
          return Object.entries(pending).map(([r, { round, items: its }]) =>
            task(ctx, 'repetition-ideas', {
              id: `repetition-ideas.${r}-r${round}`,
              role: 'reviewer',
              kind: 'repetition',
              title: `Repetition gate on ideas, round ${round} (${r})`,
              writes: [`review/repetition-ideas/${r}-r${round}.json`],
              keys: [`review/repetition-ideas/${r}-r${round}.json`, `${r}'s`, `${r} `],
              reads: [`${R(ctx, ctx.ledgerDir)}/README.md?`, W(ctx, 'brainstorm/ideas.jsonl')],
              instructions: [
                'With the ledger and the earlier scripts in front of you, give each of these ideas going to drafting one verdict. The gate covers jokes, runners, catchphrases, the shape of a segment, staging devices and people.',
                round > 1 ? 'These are replacements for ideas judged repeats, written from the reviewers\' avoid lines alone, or ideas you have not judged yet.' : null,
                'Ideas: ' + its.map((it) => { const i = ideas.find((x) => x.id === it.id); return `${it.id} (card ${i?.card}): ${i?.premise ?? '?'} / turn: ${i?.turn ?? '?'}` }).join(' || '),
                `Write review/repetition-ideas/${r}-r${round}.json: { "reviewer": "${r}", "round": ${round}, "items": [{ "id": "<idea id>", "verdict": "fresh|turned|repeat", "turned": { "what", "how" }, "fromPrevious": true|false, "avoid": "<for a repeat>", "reason": "…" }] }. Judge alone.`,
              ].filter(Boolean),
              rules: REPETITION_RULES(ctx),
            }),
          )
        const combined = combineRepetition(files, items)
        const replaced = new Set(ideas.filter((i) => i.replaces).map((i) => i.replaces))
        return Object.values(combined)
          .filter((c) => c.verdict === 'repeat' && !replaced.has(c.id))
          .map((c) => {
            const idea = ideas.find((i) => i.id === c.id)
            const avoid = c.verdicts.filter((v) => v.verdict === 'repeat').map((v) => v.avoid).filter(Boolean)
            return task(ctx, 'repetition-ideas', {
              id: `repetition-ideas.rework-${c.id}`,
              role: 'writer',
              kind: 'brainstorm',
              title: `Replace idea ${c.id}`,
              writes: [`brainstorm/rework/${c.id}.jsonl`],
              reads: [W(ctx, `research/kept/${idea?.card}.json`)],
              cards: [idea?.card].filter(Boolean),
              instructions: [
                `Idea ${c.id} for card ${idea?.card} ("${idea?.premise}") cannot go forward. Avoid: ${avoid.join(' / ') || '(not given)'}.`,
                `Write one or more new ideas for the same card that steer clear of it, or turn it on its head, one per line of brainstorm/rework/${c.id}.jsonl in the brainstorm format (${IDEA_FORMAT}), each with "replaces": "${c.id}". The first line replaces it.`,
              ],
              rules: ['Every line is a complete idea for the same card, with "replaces".'],
            })
          })
      },
      after: (ctx) => {
        const items = [...new Set(draftPlan(ctx).flatMap((d) => d.ideas))].map((id) => ({ id }))
        writeJson(P(ctx, 'review/repetition-ideas.json'), { plan: draftPlan(ctx), verdicts: combineRepetition(repetitionFiles(P(ctx, 'review/repetition-ideas')), items), excluded: excludedOf(ctx, 'repetition-ideas') })
      },
      gates: [repetitionIdeasGate, peopleIdeas],
    },
  ],
}

async function repetitionIdeasGate(ctx) {
  const g = gate('repetition.ideas')
  const plan = draftPlan(ctx)
  if (!plan.some((d) => !d.standing)) g.fail('nothing on the shortlist is left to draft (everything was excluded or dropped)')
  const items = [...new Set(plan.flatMap((d) => d.ideas))].map((id) => ({ id }))
  const combined = combineRepetition(repetitionFiles(P(ctx, 'review/repetition-ideas')), items)
  const r = repetitionProblems(combined, { reviewers: ctx.config.repetition.reviewers, maxTurnedFromPrevious: ctx.config.repetition.maxTurnedFromPrevious, label: 'idea' })
  r.failures.forEach((f) => g.fail(f))
  const turned = Object.values(combined).filter((c) => c.verdict === 'turned').map((c) => c.id)
  if (turned.length) g.warn(`turned: ${turned.join(', ')} (review/repetition-ideas.json)`)
  return g.done()
}

async function peopleIdeas(ctx) {
  const g = gate('repetition.people-ideas')
  const ids = new Set(draftPlan(ctx).flatMap((d) => d.ideas))
  const speakers = readIdeas(ctx.prod).filter((i) => ids.has(i.id)).flatMap((i) => i.speakers ?? [])
  const p = peopleRules(ctx.ledger, ctx.paths.number, { speakers }, ctx.config.people, ctx.digest)
  p.failures.forEach((f) => g.fail(`ideas going to drafting: ${f}`))
  p.warnings.forEach((w) => g.warn(w))
  return g.done()
}

export const EARLY = { scope, research, rank, brainstorm, shortlist, 'repetition-ideas': repetitionIdeas }
