// The eleven stages of docs/WORKFLOW.md. Each stage is a list of waves; a wave is a set of
// subagent tasks that work independently (each writes its own file), then the tool's step
// (combine what they wrote), then that wave's gates. A stage is done when its last wave's gates
// pass. Tasks become briefs (src/briefs.mjs) for the project manager to spawn; the tool never calls
// a model. Some waves are dynamic: the repetition gate adds rework tasks while a repeat stands.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { dirname, join } from 'node:path'
import { describePost, findPost, isOptedOut, normHandle } from './digest.mjs'
import { experimentProblems } from './experiment.mjs'
import { cardProblems, combineRepetition, filesIn, ideaProblems, rankFirstPass, rankSecondPass, reachOf, reachWeights, readCards, readIdeas, readJsonFile, repetitionProblems, selectDrafts } from './combine.mjs'
import { earlier, peopleRules } from './ledger.mjs'
import { gate, list } from './gates/common.mjs'
import { checkGuestLines, r3Drift, spokenWords, writeGuestLines, writeLabels, writeLength, writeNames, writeOptOut, writeRundown, writeSources } from './gates/write.mjs'
import { renderCheck, renderHeard, renderLengths, renderWhisper } from './gates/render.mjs'
import { directCards, directCredits, directDisclaimer, directFrames, directModules, directUnread } from './gates/direct.mjs'
import { buildThumbnail, reviewLedger, reviewScorecard, reviewVerdict } from './gates/build.mjs'
import { constitutionUnchanged, episodeImports, inheritConsistent, selfCheckDna } from './gates/dna.mjs'
import { importFresh } from './context.mjs'
import { inheritProblems } from './inherit.mjs'
import { formatEpisodeJson, ID_RE, SEG_RE, writeJson } from './repo.mjs'

export const STAGES = ['scope', 'research', 'brainstorm', 'rank', 'repetition-ideas', 'draft', 'select', 'assemble', 'stage', 'build', 'review']
export const TITLES = { scope: 'scope', research: 'research', brainstorm: 'brainstorm', rank: 'rank', 'repetition-ideas': 'repetition gate (ideas)', draft: 'draft', select: 'select and repetition gate (scripts)', assemble: 'assemble', stage: 'stage', build: 'build', review: 'review' }

const P = (ctx, rel) => join(ctx.paths.dir, 'production', rel)
const R = (ctx, abs) => ctx.paths.rel(abs)
const has = (f) => existsSync(f)
const sha = (f) => createHash('sha256').update(readFileSync(f)).digest('hex').slice(0, 12)
const as = (fn, name) => Object.defineProperty((ctx) => fn(ctx, name), 'name', { value: name })

// ---------------------------------------------------------------- who may read what

/** what a role may read (docs/WORKFLOW.md, "Who may read what"), as paths for a brief */
export function readsFor(ctx, role) {
  const prod = `episodes/${ctx.id}/production/`
  const bible = `${R(ctx, ctx.bibleDir)}/ (the constitution, ${ctx.config.constitution.join(' and ')}, and the craft bible)`
  const dd = R(ctx, ctx.digestDir)
  const digest = `${dd}/digest.md, and exact records looked up with \`npm run lookup -- --dir ${dd} --uri|--url|--text|--author|--story|--thread <value>\` or \`npm run produce -- --week ${ctx.week} --find "<at:// URI, bsky.app URL or text>"\` (digest.json is several megabytes: never read it whole)`
  const studio = 'packages/show/README.md, packages/show/tools/README.md, packages/show/reference/ (a working example of a segment), packages/show/templates/'
  if (role === 'researcher') return [bible, digest, `${prod}scope/`, `${prod}research/`]
  if (role === 'writer') return [bible, digest, `${prod} (this episode's research, ideas and drafts)`, 'packages/writers-room/playbooks/sources.md (how real accounts, posts and lines are recorded)', studio]
  if (role === 'builder') return [bible, `episodes/${ctx.id}/`, `${prod}inherited/ (only what the plan carries forward)`, studio, 'packages/show/src/ (the studio, to read)']
  return [bible, digest, `${prod}`, `${R(ctx, ctx.ledgerDir)}/ (the ledger: what the show has already done)`, 'episodes/<earlier ids>/ and dist/episodes/ (earlier scripts and builds)', studio]
}

/** what a role must not read: writers, researchers and builders never see the ledger or earlier episodes */
export function mustNotRead(ctx, role, others) {
  if (role === 'reviewer') return []
  return [`${R(ctx, ctx.ledgerDir)}/ (the ledger)`, ...others.map((o) => `episodes/${o}/`), 'dist/episodes/ (every build)', 'preview/ and shots/ of other episodes', 'earlier episodes through git (git show, git log -p, other branches such as draft/*)', 'reactions to earlier episodes ("About the show" in the digest): those are evidence for reviewers']
}

const checkCmd = (ctx, stage, extra = '') => `npm run produce -- --week ${ctx.week} --check ${stage}${extra}`

// ---------------------------------------------------------------- shared readers

const kept = (ctx) => {
  const f = P(ctx, 'research/longlist.json')
  return has(f) ? readJsonFile(f).cards.filter((c) => c.kept) : []
}
const shortlistFile = (ctx) => P(ctx, 'rank/shortlist.json')
const excludedOf = (ctx, stage) => ctx.state?.stages?.[stage]?.data?.excluded ?? []

/** the shortlist's ideas, with rework replacements substituted and excluded ideas removed */
export function effectiveShortlist(ctx) {
  if (!has(shortlistFile(ctx))) return []
  const short = readJsonFile(shortlistFile(ctx)).cards
  const ideas = readIdeas(ctx.prod)
  const replaced = new Map(ideas.filter((i) => i.replaces).map((i) => [i.replaces, i.id]))
  const follow = (id) => {
    let x = id
    for (let k = 0; k < 20 && replaced.has(x); k++) x = replaced.get(x)
    return x
  }
  const ex = excludedOf(ctx, 'repetition-ideas')
  return short.map((c) => ({ ...c, ideas: [...new Set(c.ideas.map(follow))].filter((i) => !ex.includes(i)) })).filter((c) => c.ideas.length)
}

export const draftsDir = (ctx) => P(ctx, 'drafts')
export function readDrafts(ctx) {
  const dir = draftsDir(ctx)
  if (!has(dir)) return []
  return readdirSync(dir)
    .filter((s) => SEG_RE.test(s) && has(join(dir, s, 'script.js')))
    .sort()
    .map((slug) => {
      const notesFile = join(dir, slug, 'notes.json')
      const notes = has(notesFile) ? readJsonFile(notesFile) : {}
      return { slug, dir: join(dir, slug), notes, version: sha(join(dir, slug, 'script.js')) }
    })
}

/** the slugs to draft: one per shortlisted card, plus the standing segments */
export function draftSlugs(ctx) {
  const cards = effectiveShortlist(ctx).map((c) => ({ slug: c.card.slice(0, 40).replace(/-+$/, ''), card: c.card, ideas: c.ideas, standing: null }))
  return [...cards, ...ctx.config.standing.segments.map((s) => ({ slug: s, card: null, ideas: [], standing: s }))]
}

function repetitionFiles(dir) {
  return filesIn(dir, '.json').map((f) => {
    const m = /([a-z0-9-]+?)-r(\d+)\.json$/.exec(f.split('/').pop())
    const j = readJsonFile(f)
    return { ...j, reviewer: j.reviewer ?? m?.[1] ?? f, round: Number(j.round ?? m?.[2] ?? 1), file: f }
  })
}

const reviewerIds = (ctx) => Array.from({ length: ctx.config.parallel.reviewers }, (_, k) => `reviewer-${k + 1}`)

/** the draft each reviewer still has to judge (a script changes version when it is redrafted) */
function pendingRepetition(files, items, reviewers) {
  const out = {}
  for (const r of reviewers) {
    const mine = files.filter((f) => f.reviewer === r)
    const missing = items.filter((it) => !mine.some((f) => (f.items ?? []).some((x) => x.id === it.id && (!it.version || x.version === it.version))))
    if (missing.length) out[r] = { round: Math.max(0, ...mine.map((f) => f.round)) + 1, items: missing }
  }
  return out
}

// ---------------------------------------------------------------- 1. scope

/** the coverage report: how concentrated the material is, who is new, what was excluded */
export function coverage(ctx) {
  const d = ctx.digest
  const posts = [...d.posts.values()]
  const byAuthor = new Map()
  for (const p of posts) if (p.handle) byAuthor.set(p.handle, (byAuthor.get(p.handle) ?? 0) + 1)
  const ranked = [...byAuthor.entries()].sort((a, b) => b[1] - a[1])
  const total = posts.length || 1
  const top10 = ranked.slice(0, 10)
  const share = (xs) => Math.round((100 * xs.reduce((s, [, n]) => s + n, 0)) / total)
  const seeds = new Set([...d.accounts.values()].filter((a) => a.seed).map((a) => a.handle))
  const past = earlier(ctx.ledger, ctx.paths.number)
  const featured = new Set(past.flatMap((e) => [...e.featured, ...e.guests]).map((p) => p.handle).filter(Boolean))
  for (const a of d.accounts.values()) if (a.featuredBefore) featured.add(a.handle)
  const stories = d.raw?.stories ?? []
  const leads = stories.map((s) => normHandle(s.posts?.[0]?.handle)).filter(Boolean)
  const topSet = new Set(top10.map(([h]) => h))
  const report = {
    window: d.window,
    posts: posts.length,
    accounts: byAuthor.size,
    top10: top10.map(([h, n]) => ({ handle: h, posts: n })),
    shareTop10: share(top10),
    shareSeeds: share(ranked.filter(([h]) => seeds.has(h))),
    shareFeaturedBefore: share(ranked.filter(([h]) => featured.has(h))),
    storyLeadsTop10: leads.length ? Math.round((100 * leads.filter((h) => topSet.has(h)).length) / leads.length) : null,
    storyLeadsFeaturedBefore: leads.length ? Math.round((100 * leads.filter((h) => featured.has(h)).length) / leads.length) : null,
    newVoices: ranked.filter(([h]) => !featured.has(h) && !seeds.has(h)).length,
    games: (d.sections?.games ?? []).map((g) => ({ id: g.id, results: (g.results ?? []).length })),
    excluded: d.raw?.stats?.excluded ?? null,
    scraper: d.raw?.coverage ?? null,
  }
  return report
}

function coverageMd(c) {
  const L = [`# Coverage of the window`, '', `Window: ${c.window?.label ?? '?'} (${c.window?.kind ?? '?'}). ${c.posts} posts from ${c.accounts} accounts.`, '']
  L.push('| measure | value |', '|---|---|')
  L.push(`| share of posts from the ten most active accounts | ${c.shareTop10} % |`, `| share of posts from the seed accounts | ${c.shareSeeds} % |`, `| share of posts from accounts the show has featured before | ${c.shareFeaturedBefore} % |`)
  if (c.storyLeadsTop10 !== null) L.push(`| candidate stories led by the ten most active | ${c.storyLeadsTop10} % |`, `| candidate stories led by accounts featured before | ${c.storyLeadsFeaturedBefore} % |`)
  L.push(`| accounts neither seeds nor featured before | ${c.newVoices} |`, '')
  L.push('The ten most active accounts: ' + c.top10.map((t) => `@${t.handle} (${t.posts})`).join(', '), '')
  if (c.games.length) L.push('Community games in the digest: ' + c.games.map((g) => `${g.id} (${g.results} results)`).join(', '), '')
  if (c.excluded) L.push('Excluded, in counts: `' + JSON.stringify(c.excluded) + '`', '')
  if (c.scraper) L.push("The scraper's own coverage report:", '', '```json', JSON.stringify(c.scraper, null, 2), '```', '')
  L.push('Reach and concentration are measured from what the scrape collected; they are signs, not a census of the community.')
  return L.join('\n') + '\n'
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
      tasks: (ctx) => [
        {
          id: 'scope.reviewer',
          role: 'reviewer',
          title: 'Is this the right community, widely enough?',
          writes: [`episodes/${ctx.id}/production/scope/review.md`],
          instructions: [
            `Read the scraper's coverage report (${R(ctx, ctx.digestDir)}/coverage.md: membership, worries against thresholds, concentration, new and gone, the reference checker), the tool's figures in episodes/${ctx.id}/production/scope/coverage.md, the digest's window and overview, and the scraper's cluster configuration (packages/scraper/config/cluster.json).`,
            'Answer three questions in scope/review.md, each under its own heading: "## Is this the community the show is about?", "## Is it wide enough that the episode will not be about the same few people?", "## Is anything obviously missing?".',
            'End with one line: "Verdict: proceed" or "Verdict: rescrape: <what to change in the configuration>". A rescrape is a valid result.',
          ],
          check: checkCmd(ctx, 'scope'),
        },
      ],
      gates: [scopeReview],
    },
  ],
}

async function scopeReview(ctx) {
  const g = gate('scope.review')
  const f = P(ctx, 'scope/review.md')
  const md = has(f) ? readFileSync(f, 'utf8') : ''
  for (const q of ['community the show is about', 'wide enough', 'missing']) if (!new RegExp(`^##.*${q}`, 'im').test(md)) g.fail(`scope/review.md has no "## …${q}…" section`)
  const v = /^\s*Verdict:\s*(proceed|rescrape)\b(.*)$/im.exec(md)
  if (!v) g.fail('scope/review.md must end with "Verdict: proceed" or "Verdict: rescrape: <what to change>"')
  else if (v[1].toLowerCase() === 'rescrape') g.sendBack('scope', `the scope reviewer asks for a rescrape${v[2] ? v[2] : ''}: change the scraper's configuration, delete the digest, and run --from scope`)
  return g.done()
}

// ---------------------------------------------------------------- 2. research

const research = {
  name: 'research',
  waves: [
    {
      tasks: (ctx) =>
        ctx.config.parallel.researchLanes.map((lane) => ({
          id: `research.${lane.id}`,
          role: 'researcher',
          lane: lane.id,
          title: `Research lane: ${lane.title}`,
          writes: [`episodes/${ctx.id}/production/research/cards/${lane.id}/`],
          instructions: [
            `Find what in the window belongs to your lane, "${lane.title}", and write one content card per thing, as research/cards/${lane.id}/<card-id>.json. Card ids are lower case words and dashes, unique, and start with "${lane.id}-".`,
            `A card says what happened in neutral words, lists the posts with their at:// addresses and exact text (copied from \`npm run lookup\`, never retyped), names who was involved with their follower counts, and notes anything sensitive. A card contains no jokes. Reach is computed by the tool from the scraper's figures; you need not add it.`,
            'Card format: { "id", "lane", "title", "summary", "posts": [{ "uri", "text", "handle" }], "people": [{ "handle", "followers" }], "sensitive": "<notes or none>" }. Image-only posts have "text": "" and an "alt".',
            lane.id === 'games' ? "Top Chicken: the digest's Community games section (sections.games, \"Top Chicken as a segment\"): the window's standings day by day (winner, likes, the winning post, its share of the record), repeat winners and streaks, whether the record moved, recent history and the all-time leaderboard. Winners only by name; never rank or name a non-winner (the digest says who came close is not known)." : null,
            lane.id === 'voices' ? "Start from the digest's New voices section (sections.newVoices: members the show has never featured, with their best posts), then look wider. An author's featuredPrevious, featuredEarlier and timesFeatured marks are facts for the people rules, not a reason to leave anyone out." : null,
            lane.id === 'interview' ? "Interview candidates: start from the digest's Interview material (sections.interview: per member, question-and-answer pairs, each answer their real post replying to someone else's question or prompt, both with exact text). One card per candidate listing the pairs worth using, each post with what it replied to. Someone who appeared in the previous aired episode is never a candidate (the digest leaves them out; the ledger check runs again later)." : null,
            'Do not propose jokes. Do not read earlier episodes or the ledger.',
          ].filter(Boolean),
          check: checkCmd(ctx, 'research'),
        })),
      after: (ctx) => {
        const cards = readCards(ctx.prod)
        const reach = Object.fromEntries(cards.map(({ card }) => [card.id, reachOf(ctx.digest, card.posts ?? [], reachWeights(ctx.root, ctx.config))]))
        const screen = has(P(ctx, 'research/screen.json')) ? readJsonFile(P(ctx, 'research/screen.json')).cards ?? {} : {}
        writeJson(P(ctx, 'research/longlist.json'), {
          reachNote: "Reach stands in for how many people saw it, which Bluesky does not publish: the sum of the scraper's reach score for each of the card's posts (weighted likes, reposts, quotes, replies and participants; packages/scraper/config/scoring.json).",
          cards: cards.map(({ card, file }) => ({ ...card, file: R(ctx, file), reach: reach[card.id], kept: screen[card.id] ? screen[card.id].keep === true : null, screen: screen[card.id] ?? null })),
        })
      },
      gates: [researchCards],
    },
    {
      tasks: (ctx) => [
        {
          id: 'research.screen',
          role: 'reviewer',
          title: 'Screen the longlist against the constitution',
          writes: [`episodes/${ctx.id}/production/research/screen.json`],
          instructions: [
            `Read every card in research/longlist.json against the constitution and chapter 9: out-of-bounds subjects, opted-out accounts, small accounts who would not come off well, anything that cannot be used in its own context.`,
            'Write research/screen.json: { "cards": { "<card id>": { "keep": true|false, "reason": "<one sentence>" } } } with every card. Removed cards stay in the longlist with the reason. Also write research/screen.md with anything the writers should know.',
          ],
          check: checkCmd(ctx, 'research'),
        },
      ],
      after: (ctx) => research.waves[0].after(ctx),
      gates: [researchScreen],
    },
  ],
}

async function researchCards(ctx) {
  const g = gate('research.cards')
  const lanes = ctx.config.parallel.researchLanes.map((l) => l.id)
  const cards = readCards(ctx.prod)
  if (!cards.length) g.fail('no cards in research/cards/<lane>/')
  const ids = new Set()
  for (const { file, card, lane } of cards) {
    for (const f of cardProblems(ctx.digest, card, { lanes, file: R(ctx, file) })) g.fail(f)
    if (card.lane && card.lane !== lane) g.fail(`${R(ctx, file)}: the card says lane ${card.lane} but sits in ${lane}/`)
    if (ids.has(card.id)) g.fail(`${R(ctx, file)}: card id ${card.id} is used twice`)
    ids.add(card.id)
  }
  for (const lane of lanes) if (!cards.some((c) => c.lane === lane)) g.warn(`lane ${lane} found nothing`)
  return g.done()
}

async function researchScreen(ctx) {
  const g = gate('research.screen')
  const f = P(ctx, 'research/screen.json')
  if (!has(f)) {
    g.fail('research/screen.json is missing')
    return g.done()
  }
  const screen = readJsonFile(f).cards ?? {}
  const cards = readCards(ctx.prod)
  for (const { card } of cards) {
    const s = screen[card.id]
    if (!s) g.fail(`research/screen.json has no decision for card ${card.id}`)
    else if (typeof s.keep !== 'boolean' || !String(s.reason ?? '').trim()) g.fail(`research/screen.json ${card.id}: give "keep": true|false and a "reason"`)
    else if (s.keep) for (const p of card.posts ?? []) {
      const post = findPost(ctx.digest, p.uri)
      if (post?.outOfBounds || isOptedOut(ctx.digest, post?.handle)) g.fail(`research/screen.json keeps ${card.id}, which carries an out-of-bounds or opted-out post (${p.uri})`)
    }
  }
  if (!cards.some(({ card }) => screen[card.id]?.keep)) g.fail('the screen keeps no card')
  return g.done()
}

// ---------------------------------------------------------------- 3. brainstorm

const brainstorm = {
  name: 'brainstorm',
  waves: [
    {
      tasks: (ctx) =>
        Array.from({ length: ctx.config.parallel.brainstormWriters }, (_, k) => ({
          id: `brainstorm.writer-${k + 1}`,
          role: 'writer',
          title: `Brainstorm, writer ${k + 1} of ${ctx.config.parallel.brainstormWriters}`,
          writes: [`episodes/${ctx.id}/production/brainstorm/writer-${k + 1}.jsonl`],
          instructions: [
            'Work over the whole screened longlist (research/longlist.json, cards with "kept": true) and write joke ideas for every card: as many as you can, quantity over polish.',
            `One idea per line of brainstorm/writer-${k + 1}.jsonl: { "card": "<card id>", "premise": "<a line or two>", "turn": "<the surprise>", "screen": "<what lands on screen>", "format": "<what might carry it>", "words": ["<at:// URIs whose real words it would use>"], "speakers": ["<handles of real accounts whose puppets would speak>"] }.`,
            "Work alone: do not read the other writers' files. Do not score or rank your ideas.",
          ],
          check: checkCmd(ctx, 'brainstorm'),
        })),
      after: (ctx) => {
        const ideas = readIdeas(ctx.prod).filter((i) => !i.rework)
        mkdirSync(P(ctx, 'brainstorm'), { recursive: true })
        writeFileSync(P(ctx, 'brainstorm/ideas.jsonl'), ideas.map(({ file, ...i }) => JSON.stringify(i)).join('\n') + '\n')
      },
      gates: [brainstormIdeas],
    },
  ],
}

async function brainstormIdeas(ctx) {
  const g = gate('brainstorm.ideas')
  const cards = kept(ctx)
  const ids = new Set(cards.map((c) => c.id))
  const ideas = readIdeas(ctx.prod).filter((i) => !i.rework)
  for (const i of ideas) for (const f of ideaProblems(i, ids)) g.fail(R(ctx, '') + f.replace(ctx.paths.dir + '/', ''))
  const min = ctx.config.parallel.minWritersPerCard
  for (const c of cards) {
    const writers = new Set(ideas.filter((i) => i.card === c.id).map((i) => i.writer))
    if (writers.size < min) g.fail(`card ${c.id} has ideas from ${writers.size} writer${writers.size === 1 ? '' : 's'}; every card needs ideas from at least ${min}`)
  }
  return g.done()
}

// ---------------------------------------------------------------- 4. rank

const rank = {
  name: 'rank',
  waves: [
    {
      tasks: (ctx) =>
        reviewerIds(ctx).map((r) => ({
          id: `rank.${r}`,
          role: 'reviewer',
          title: `Rank, first pass (${r})`,
          writes: [`episodes/${ctx.id}/production/rank/reviews/${r}.json`],
          instructions: [
            'For every kept card in research/longlist.json, score two things from 0 to 10, with the ideas in brainstorm/ideas.jsonl in front of you:',
            '- interest, by the constitution\'s interesting test (turn or feeling, this week, retell);',
            "- best joke: the strength of the strongest idea for that card, naming the idea's id.",
            `Write rank/reviews/${r}.json: { "reviewer": "${r}", "cards": { "<card id>": { "interest": 0-10, "bestJoke": { "idea": "<idea id>", "score": 0-10 }, "reason": "<one sentence>" } } }.`,
            'Reach is computed by the tool. Judge alone: do not read the other reviewers\' files.',
          ],
          check: checkCmd(ctx, 'rank'),
        })),
      after: (ctx) => {
        const cards = kept(ctx)
        const reviews = filesIn(P(ctx, 'rank/reviews'), '.json').map(readJsonFile)
        const reach = Object.fromEntries(cards.map((c) => [c.id, c.reach]))
        writeJson(P(ctx, 'rank/first.json'), { weights: ctx.config.ranking.weights, cards: rankFirstPass({ cards, reviews, reach, weights: ctx.config.ranking.weights }) })
      },
      gates: [rankFirst],
    },
    {
      tasks: (ctx) => {
        const pool = has(P(ctx, 'rank/first.json')) ? readJsonFile(P(ctx, 'rank/first.json')).cards.slice(0, ctx.config.ranking.pool).map((c) => c.card) : []
        return reviewerIds(ctx).map((r) => ({
          id: `rank.second-${r}`,
          role: 'reviewer',
          title: `Rank, second pass: synergy and variety (${r})`,
          writes: [`episodes/${ctx.id}/production/rank/second/${r}.json`],
          instructions: [
            `The top ${pool.length} cards after the first pass are: ${pool.join(', ')} (rank/first.json).`,
            'For each, score synergy (0-2: does it make another card better, is there a through-line) and variety (0-2: different people, subjects and kinds of comedy, and different from the last episode in the ledger), and choose the idea ids that should go forward for it.',
            `Write rank/second/${r}.json: { "reviewer": "${r}", "cards": { "<card id>": { "synergy": 0-2, "variety": 0-2, "ideas": ["<idea id>"], "with": ["<card ids it combines with>"], "reason": "…" } } }.`,
          ],
          check: checkCmd(ctx, 'rank'),
        }))
      },
      after: (ctx) => {
        const first = readJsonFile(P(ctx, 'rank/first.json')).cards
        const second = filesIn(P(ctx, 'rank/second'), '.json').map(readJsonFile)
        const rows = rankSecondPass({ first, second, weights: ctx.config.ranking.secondPass, pool: ctx.config.ranking.pool, shortlist: ctx.config.ranking.shortlist })
        writeJson(P(ctx, 'rank/scores.json'), { weights: { ...ctx.config.ranking.weights, ...ctx.config.ranking.secondPass }, reachNote: 'reach is a stand-in for views', first, final: rows })
        writeJson(shortlistFile(ctx), { cards: rows.filter((r) => r.shortlisted).map((r) => ({ card: r.card, title: r.title, final: r.final, ideas: r.ideas })) })
        const L = ['# Shortlist', '', 'Reach stands in for how many people saw a card (Bluesky does not publish views). Scores and reasons are in rank/scores.json.', '', '| # | card | reach | interest | best joke | synergy | variety | final | ideas |', '|---|---|---|---|---|---|---|---|---|']
        rows.forEach((r, k) => L.push(`| ${k + 1}${r.shortlisted ? ' ✓' : ''} | ${r.card} | ${r.reach} | ${r.interest} | ${r.bestJoke} | ${r.synergy} | ${r.variety} | ${r.final} | ${r.ideas.join(', ')} |`))
        writeFileSync(P(ctx, 'rank/shortlist.md'), L.join('\n') + '\n')
      },
      gates: [rankSecond],
    },
    {
      tasks: (ctx) => [
        {
          id: 'rank.experiment',
          role: 'reviewer',
          title: 'Propose the episode\'s one experiment',
          writes: [`episodes/${ctx.id}/production/experiment.md`],
          instructions: [
            'With the shortlist (rank/shortlist.md), the craft bible and the ledger in front of you, propose the one deliberate experiment this episode runs: something it tries that the show has not done (bible 03, "One experiment per episode"). You can see what the show has tried; the writers cannot.',
            'Write production/experiment.md with three sections: "## What we try" (in a sentence or two, as an instruction), "## Why" (what the bible or this window\'s material suggests it could do), "## Measure" (how someone else can check, after the episode is built, whether it was run and whether it worked).',
            'This file goes to the writers and builders, so it states only what to try. Never describe an earlier episode, its jokes, people or devices, and never name one; no "last time", "again" or "this time".',
            'Never constitutional: an experiment cannot relax any article of the constitution or chapter 9.',
          ],
          check: checkCmd(ctx, 'rank'),
        },
      ],
      gates: [rankExperiment],
    },
  ],
}

async function rankExperiment(ctx) {
  const g = gate('rank.experiment')
  const f = P(ctx, 'experiment.md')
  for (const p of experimentProblems(has(f) ? readFileSync(f, 'utf8') : null)) g.fail(p)
  return g.done()
}

const EXPERIMENT_LINE = (ctx) => `The episode's one experiment is in episodes/${ctx.id}/production/experiment.md. Where it touches your work, run it; it is judged at review against its measure.`

async function rankFirst(ctx) {
  const g = gate('rank.first')
  const reviews = filesIn(P(ctx, 'rank/reviews'), '.json').map(readJsonFile)
  const ideas = readIdeas(ctx.prod)
  for (const c of kept(ctx)) {
    const n = reviews.filter((r) => typeof r.cards?.[c.id]?.interest === 'number' && typeof r.cards?.[c.id]?.bestJoke?.score === 'number').length
    if (n < ctx.config.parallel.reviewers) g.fail(`card ${c.id} has first-pass scores from ${n} reviewers; it needs ${ctx.config.parallel.reviewers}`)
    for (const r of reviews) {
      const s = r.cards?.[c.id]
      if (!s) continue
      if (s.interest < 0 || s.interest > 10 || s.bestJoke?.score < 0 || s.bestJoke?.score > 10) g.fail(`${r.reviewer} ${c.id}: scores are 0 to 10`)
      const idea = ideas.find((i) => i.id === s.bestJoke?.idea)
      if (!idea) g.fail(`${r.reviewer} ${c.id}: best joke names idea ${s.bestJoke?.idea}, which does not exist`)
      else if (idea.card !== c.id) g.fail(`${r.reviewer} ${c.id}: best joke ${idea.id} is an idea for ${idea.card}`)
    }
  }
  return g.done()
}

async function rankSecond(ctx) {
  const g = gate('rank.second')
  const first = has(P(ctx, 'rank/first.json')) ? readJsonFile(P(ctx, 'rank/first.json')).cards.slice(0, ctx.config.ranking.pool) : []
  const second = filesIn(P(ctx, 'rank/second'), '.json').map(readJsonFile)
  const ideas = readIdeas(ctx.prod)
  for (const c of first) {
    const n = second.filter((r) => typeof r.cards?.[c.card]?.synergy === 'number').length
    if (n < ctx.config.parallel.reviewers) g.fail(`card ${c.card} has second-pass scores from ${n} reviewers; it needs ${ctx.config.parallel.reviewers}`)
    for (const r of second) for (const id of r.cards?.[c.card]?.ideas ?? []) {
      const idea = ideas.find((i) => i.id === id)
      if (!idea || idea.card !== c.card) g.fail(`${r.reviewer} ${c.card}: idea ${id} is not an idea for this card`)
    }
  }
  return g.done()
}

// ---------------------------------------------------------------- 5. repetition gate (ideas)

const repetitionIdeas = {
  name: 'repetition-ideas',
  waves: [
    {
      tasks: (ctx) => {
        const dir = P(ctx, 'review/repetition-ideas')
        const short = effectiveShortlist(ctx)
        const ideas = readIdeas(ctx.prod)
        const items = short.flatMap((c) => c.ideas.map((id) => ({ id })))
        const files = repetitionFiles(dir)
        const pending = pendingRepetition(files, items, reviewerIds(ctx))
        if (Object.keys(pending).length) {
          return Object.entries(pending).map(([r, { round, items: its }]) => ({
            id: `repetition-ideas.${r}-r${round}`,
            role: 'reviewer',
            title: `Repetition gate on ideas, round ${round} (${r})`,
            writes: [`episodes/${ctx.id}/production/review/repetition-ideas/${r}-r${round}.json`],
            instructions: [
              'With the ledger and the earlier scripts in front of you, give each of these shortlisted ideas one verdict: fresh (not done before), turned (takes something the show did and turns it on its head, by inverting the expectation it set up or making fun of the joke itself) or repeat (the same joke, runner, catchphrase, device or shape as before).',
              'The gate covers jokes, runners, catchphrases, the shape of a segment, staging devices, and people: a guest who spoke in the previous aired episode does not speak in this one.',
              `Judge against aired episodes (${R(ctx, ctx.ledgerDir)}/README.md, "Giving a verdict" and "Aired and drafted"): "the previous episode" is the previous aired one; something that only appeared in an unaired draft is fresh (say so in the reason); what a draft repeated from an aired episode stays a repeat. "fromPrevious" means the previous aired episode.`,
              'Ideas: ' + its.map((it) => { const i = ideas.find((x) => x.id === it.id); return `${it.id} (card ${i?.card}): ${i?.premise ?? '?'} / turn: ${i?.turn ?? '?'}` }).join(' || '),
              `Write review/repetition-ideas/${r}-r${round}.json: { "reviewer": "${r}", "round": ${round}, "items": [{ "id": "<idea id>", "verdict": "fresh|turned|repeat", "turned": { "what": "…", "how": "…" }, "fromPrevious": true|false, "avoid": "<for a repeat: only as much of the earlier joke as a writer needs to avoid or turn it>", "reason": "…" }] }.`,
              'Judge alone. A repeat verdict is a valid result, not a failure of yours.',
            ],
            check: checkCmd(ctx, 'repetition-ideas'),
          }))
        }
        const combined = combineRepetition(files, items)
        const replaced = new Set(ideas.filter((i) => i.replaces).map((i) => i.replaces))
        return Object.values(combined)
          .filter((c) => c.verdict === 'repeat' && !replaced.has(c.id))
          .map((c) => {
            const idea = ideas.find((i) => i.id === c.id)
            const avoid = c.verdicts.filter((v) => v.verdict === 'repeat').map((v) => v.avoid).filter(Boolean)
            return {
              id: `repetition-ideas.rework-${c.id}`,
              role: 'writer',
              title: `Replace idea ${c.id}, which repeats something the show has done`,
              writes: [`episodes/${ctx.id}/production/brainstorm/rework/${c.id}.jsonl`],
              instructions: [
                `Idea ${c.id} for card ${idea?.card} ("${idea?.premise}") was judged a repeat. What to avoid, as the reviewers put it: ${avoid.join(' / ') || '(not given)'}.`,
                'Write one or more new ideas for the same card that avoid it, or that turn it on its head (invert the expectation, or make fun of the joke itself).',
                `One idea per line of brainstorm/rework/${c.id}.jsonl, in the brainstorm format, each with "replaces": "${c.id}" and "card": "${idea?.card}". The first line replaces it on the shortlist; reviewers will judge it.`,
              ],
              check: checkCmd(ctx, 'repetition-ideas'),
            }
          })
      },
      after: (ctx) => {
        const short = effectiveShortlist(ctx)
        const items = short.flatMap((c) => c.ideas.map((id) => ({ id })))
        writeJson(P(ctx, 'review/repetition-ideas.json'), { shortlist: short, verdicts: combineRepetition(repetitionFiles(P(ctx, 'review/repetition-ideas')), items), excluded: excludedOf(ctx, 'repetition-ideas') })
      },
      gates: [repetitionIdeasGate, peopleIdeas],
    },
  ],
}

async function repetitionIdeasGate(ctx) {
  const g = gate('repetition.ideas')
  const short = effectiveShortlist(ctx)
  if (!short.length) g.fail('the shortlist is empty (everything was excluded or dropped)')
  const items = short.flatMap((c) => c.ideas.map((id) => ({ id })))
  const combined = combineRepetition(repetitionFiles(P(ctx, 'review/repetition-ideas')), items)
  const r = repetitionProblems(combined, { reviewers: ctx.config.repetition.reviewers, maxTurnedFromPrevious: ctx.config.repetition.maxTurnedFromPrevious, label: 'idea' })
  r.failures.forEach((f) => g.fail(f))
  for (const c of Object.values(combined)) if (c.verdict === 'turned') g.warn(`idea ${c.id} is turned: ${c.verdicts.filter((v) => v.turned).map((v) => `${v.turned.what} → ${v.turned.how}`).join(' / ')}`)
  return g.done()
}

async function peopleIdeas(ctx) {
  const g = gate('repetition.people-ideas')
  const ideas = readIdeas(ctx.prod)
  const ids = new Set(effectiveShortlist(ctx).flatMap((c) => c.ideas))
  const speakers = ideas.filter((i) => ids.has(i.id)).flatMap((i) => i.speakers ?? [])
  const p = peopleRules(ctx.ledger, ctx.paths.number, { speakers }, ctx.config.people, ctx.digest)
  p.failures.forEach((f) => g.fail(`shortlisted ideas: ${f}`))
  p.warnings.forEach((w) => g.warn(w))
  return g.done()
}

// ---------------------------------------------------------------- 6. draft

const STANDING = {
  interview:
    'The interview: one community member, constructed from their public posts. Start from the digest\'s Interview material (question-and-answer pairs with exact text) and the interview research card. Every answer is a real post of theirs, verbatim, tagged `// verbatim: at://<post> · context: at://<what it replied to>`; every question recreates what that post was actually replying to (the same kind of prompt, the same meaning), so nothing answers a question it was not answering. Record each answer in sources.json "lines" with the post it replied to and its exact text, and the question line as its staged "setup". Not someone who spoke in the previous aired episode (checked against the ledger).',
  'top-chicken':
    "Top Chicken: the window's results, with enough of the game around them to be a segment: the standings, the record and who is near it, streaks, and the show's own speculation about what happens next, plainly offered as speculation. Winners only by name. List the result posts you use in notes.json \"results\".",
  music: 'Music: a song in a genre the show has not just used (the tool checks the previous episode), on a theme from the window. notes.json gives "genre" and "theme".',
}

const draft = {
  name: 'draft',
  waves: [
    {
      tasks: (ctx) =>
        draftSlugs(ctx).map((d) => ({
          id: `draft.${d.slug}`,
          role: 'writer',
          segment: d.slug,
          title: d.standing ? `Draft the standing segment: ${d.slug}` : `Draft a segment from card ${d.card}`,
          writes: [`episodes/${ctx.id}/production/drafts/${d.slug}/script.js`, `episodes/${ctx.id}/production/drafts/${d.slug}/notes.json`],
          instructions: [
            d.standing ? STANDING[d.standing] : `Draft one segment from card ${d.card} using the shortlisted idea${d.ideas.length > 1 ? 's' : ''} ${d.ideas.join(', ')} (brainstorm/ideas.jsonl and brainstorm/rework/).`,
            `Write drafts/${d.slug}/script.js in the script format of packages/show/tools/README.md, with \`id: '${d.slug}'\`. A real account's puppet says only what that account published, each line tagged with its source and context (bible chapter 9, R3 and R4); the show's own characters do the joking around it.`,
            `Write drafts/${d.slug}/notes.json: { "slug": "${d.slug}", "title", "format", "seconds": <your estimate>, "standing": ${d.standing ? `"${d.standing}"` : 'null'}, "cards": [${d.card ? `"${d.card}"` : ''}], "ideas": [${d.ideas.map((i) => `"${i}"`).join(', ')}], "speakers": ["<handles of real accounts whose puppets speak>"], "featured": ["<handles of real accounts shown on screen>"]${d.slug === 'music' ? ', "genre", "theme"' : ''}${d.slug === 'top-chicken' ? ', "results": ["<at:// result posts>"]' : ''} }.`,
            `If real accounts appear, write drafts/${d.slug}/sources.json in the format of packages/writers-room/playbooks/sources.md (accounts, posts with displayName and counts, lines with each line's context and staged setup). If the segment needs a guest the studio's cast lacks, put the entry in drafts/${d.slug}/cast.js.`,
            'Television: nothing on screen for the viewer to read in silence. A post that is shown is performed or read aloud, or is short enough to take in at a glance.',
            EXPERIMENT_LINE(ctx),
            "Draft alone: do not read the other drafts. Do not score your own.",
          ],
          check: checkCmd(ctx, 'draft'),
        })),
      gates: [draftFiles, draftLines, draftStanding],
    },
  ],
}

async function draftFiles(ctx) {
  const g = gate('draft.files')
  const drafts = readDrafts(ctx)
  const wps = (ctx.limits.wordsPerSecond?.min + ctx.limits.wordsPerSecond?.max) / 2 || 1.9
  let total = 0
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
    for (const k of ['title', 'format']) if (!String(d.notes[k] ?? '').trim()) g.fail(`drafts/${d.slug}/notes.json: "${k}" is empty`)
    if (!(Number(d.notes.seconds) > 0)) g.fail(`drafts/${d.slug}/notes.json: "seconds" must be the estimated running time`)
    for (const k of ['speakers', 'featured']) if (!Array.isArray(d.notes[k])) g.fail(`drafts/${d.slug}/notes.json: "${k}" must be a list of handles (empty if none)`)
    const est = Math.round(spokenWords(script) / wps)
    d.estimate = est
    total += Math.max(est, Number(d.notes.seconds) || 0)
  }
  const target = ctx.limits.targetSeconds
  if (total <= target) g.fail(`the drafts add up to about ${total} s; draft more than the ${target} s target so selection is a real choice`)
  g.warn(`drafted about ${total} s in ${drafts.length} drafts (target ${target} s)`)
  return g.done()
}

/** the real-people rules on every draft, against the draft's own sources.json */
async function draftLines(ctx) {
  const g = gate('draft.lines')
  for (const w of r3Drift(ctx)) g.warn(w)
  for (const d of readDrafts(ctx)) {
    const sf = join(d.dir, 'sources.json')
    const sources = has(sf) ? readJsonFile(sf) : null
    const view = Object.create(ctx)
    view.sources = sources
    const r = checkGuestLines(view, { seg: d.slug, file: `drafts/${d.slug}/script.js`, text: readFileSync(join(d.dir, 'script.js'), 'utf8') })
    r.failures.forEach((f) => g.fail(f))
    r.warnings.forEach((w) => g.warn(w))
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
    if (!d) {
      g.fail(`the standing segment ${s} has no draft (drafts/${s}/): it is drafted every week and selected on merit`)
      continue
    }
    if (d.notes.standing !== s) g.fail(`drafts/${s}/notes.json: "standing" must be "${s}"`)
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
    if (past[0]?.song && norm(past[0].song.genre) === norm(music.notes.genre)) g.fail(`drafts/music: the genre "${music.notes.genre}" is the previous episode's; pick another`)
    for (const e of past.slice(1, ctx.config.music.genreWarnWindow)) if (e.song && norm(e.song.genre) === norm(music.notes.genre)) g.warn(`drafts/music: the genre "${music.notes.genre}" was used in ${e.id}`)
  }
  const tc = drafts.find((d) => d.slug === 'top-chicken')
  if (tc) {
    const results = (ctx.digest.sections?.games ?? []).find((x) => x.id === 'top-chicken')?.results ?? []
    const want = Math.min(ctx.config.standing.topChickenMinResults, results.length)
    const used = (tc.notes.results ?? []).filter((u) => findPost(ctx.digest, u))
    if (used.length < want) g.fail(`drafts/top-chicken draws on ${used.length} of the window's ${results.length} results; use at least ${want} (standings, the record, streaks), listed in notes.json "results"`)
  }
  return g.done()
}

// ---------------------------------------------------------------- 7. select (and the repetition gate on scripts)

const select = {
  name: 'select',
  waves: [
    {
      tasks: (ctx) => {
        const drafts = readDrafts(ctx)
        const scored = filesIn(P(ctx, 'select/reviews'), '.json').map((f) => f.split('/').pop().replace('.json', ''))
        const tasks = reviewerIds(ctx)
          .filter((r) => !scored.includes(r))
          .map((r) => ({
            id: `select.${r}`,
            role: 'reviewer',
            title: `Score the drafts (${r})`,
            writes: [`episodes/${ctx.id}/production/select/reviews/${r}.json`],
            instructions: [
              `Score every draft in production/drafts/ (${drafts.map((d) => d.slug).join(', ')}) from 0 to 10 on four things: funny, interesting, television (does it work on screen: nothing left for the viewer to read in silence), variety (does it add something different, from the other drafts and from the last episode).`,
              `Write select/reviews/${r}.json: { "reviewer": "${r}", "drafts": { "<slug>": { "funny", "interesting", "television", "variety", "reason": "…" } }, "inherit": [] }. Judge alone.`,
              'Usually "inherit" is empty. Only if a builder truly needs a file from an earlier episode as reference, name it: { "from": "<episode id>", "path": "segments/<seg>/index.js", "why": "…" }.',
              'People: fresh people are preferred; nobody is barred for having appeared before, but the same few should not be in too often. The ledger\'s featured tracker shows who appeared when.',
            ],
            check: checkCmd(ctx, 'select'),
          }))
        const files = repetitionFiles(P(ctx, 'review/repetition-scripts'))
        const items = drafts.map((d) => ({ id: d.slug, version: d.version }))
        const pending = pendingRepetition(files, items, reviewerIds(ctx))
        for (const [r, { round, items: its }] of Object.entries(pending))
          tasks.push({
            id: `select.repetition-${r}-r${round}`,
            role: 'reviewer',
            title: `Repetition gate on scripts, round ${round} (${r})`,
            writes: [`episodes/${ctx.id}/production/review/repetition-scripts/${r}-r${round}.json`],
            instructions: [
              'With the ledger and the earlier scripts in front of you, give each draft one verdict: fresh, turned (turns something the show did on its head; say what and how) or repeat (the same joke, runner, catchphrase, device or shape).',
              `Judge against aired episodes (${R(ctx, ctx.ledgerDir)}/README.md, "What counts as the same" and "Aired and drafted"): material only an unaired draft used is fresh; "fromPrevious" means the previous aired episode. A standing segment (interview, Top Chicken, music) recurs by the owner's decision; what must be new is how it is built.`,
              'Drafts and the version each verdict must name: ' + its.map((it) => `${it.id} (version ${it.version})`).join(', '),
              `Write review/repetition-scripts/${r}-r${round}.json: { "reviewer": "${r}", "round": ${round}, "items": [{ "id": "<slug>", "version": "<version>", "verdict": "fresh|turned|repeat", "turned": { "what", "how" }, "fromPrevious": true|false, "avoid": "…", "reason": "…" }] }. Judge alone.`,
            ],
            check: checkCmd(ctx, 'select'),
          })
        if (tasks.length) return tasks
        // all judged: a selected draft that repeats goes back to a writer
        const sel = selection(ctx)
        const combined = combineRepetition(files, items)
        return sel.rows
          .filter((r) => r.selected && combined[r.slug]?.verdict === 'repeat')
          .map((r) => ({
            id: `select.redraft-${r.slug}`,
            role: 'writer',
            segment: r.slug,
            title: `Redraft ${r.slug}, which repeats something the show has done`,
            writes: [`episodes/${ctx.id}/production/drafts/${r.slug}/script.js`],
            instructions: [
              `The draft ${r.slug} was selected but judged a repeat. What to avoid, as the reviewers put it: ${combined[r.slug].verdicts.map((v) => v.avoid).filter(Boolean).join(' / ') || '(not given)'}.`,
              `Rewrite drafts/${r.slug}/script.js (and notes.json, sources.json if they change) so it avoids that, or turns it on its head. Reviewers will judge the new version.`,
            ],
            check: checkCmd(ctx, 'select'),
            done: (c) => readDrafts(c).find((d) => d.slug === r.slug)?.version !== combined[r.slug].version,
          }))
      },
      after: (ctx) => {
        const sel = selection(ctx)
        const drafts = readDrafts(ctx)
        const combined = combineRepetition(repetitionFiles(P(ctx, 'review/repetition-scripts')), drafts.map((d) => ({ id: d.slug, version: d.version })))
        writeJson(P(ctx, 'select/scores.json'), { weights: ctx.config.selection.weights, targetSeconds: ctx.limits.targetSeconds, maxSeconds: ctx.limits.runtimeSeconds.max, total: sel.total, drafts: sel.rows })
        writeJson(P(ctx, 'review/repetition-scripts.json'), { verdicts: combined })
        const chosen = sel.rows.filter((r) => r.selected)
        const plan = {
          format: 'late-cluster-plan/2',
          id: ctx.id,
          week: ctx.week,
          segments: chosen.map((r) => {
            const d = drafts.find((x) => x.slug === r.slug)
            return { id: r.slug, title: d.notes.title, format: d.notes.format, seconds: Math.round(Number(d.notes.seconds) || 0), standing: d.notes.standing ?? null, cards: d.notes.cards ?? [], ideas: d.notes.ideas ?? [], speakers: d.notes.speakers ?? [], featured: d.notes.featured ?? [], ...(d.notes.genre ? { genre: d.notes.genre, theme: d.notes.theme } : {}), score: r.score, repetition: combined[r.slug]?.verdict ?? null }
          }),
          cut: sel.rows.filter((r) => !r.selected).map((r) => ({ what: r.slug, why: r.why })),
          // carried forward only where a reviewer asked for it, with a reason (builders read nothing else of earlier episodes)
          inherit: dedupeInherit(filesIn(P(ctx, 'select/reviews'), '.json').flatMap((f) => readJsonFile(f).inherit ?? [])),
        }
        writeJson(P(ctx, 'plan.json'), plan)
      },
      gates: [selectScores, selectRepetition, selectPeople, selectFits, selectInherit],
    },
  ],
}

const dedupeInherit = (xs) => xs.filter((x, k) => x && xs.findIndex((y) => y?.from === x.from && y?.path === x.path) === k)

async function selectInherit(ctx) {
  const g = gate('select.inherit')
  const plan = has(P(ctx, 'plan.json')) ? readJsonFile(P(ctx, 'plan.json')) : null
  for (const [k, e] of (plan?.inherit ?? []).entries()) for (const why of inheritProblems(ctx.root, ctx.id, e)) g.fail(`plan.json inherit[${k}]: ${why}`)
  if ((plan?.inherit ?? []).length) g.warn(`carried forward: ${plan.inherit.map((e) => `${e.from}/${e.path}`).join(', ')}`)
  return g.done()
}

function selection(ctx) {
  const drafts = readDrafts(ctx).map((d) => ({ slug: d.slug, title: d.notes.title, standing: d.notes.standing, seconds: Math.round(Number(d.notes.seconds) || 0) }))
  const reviews = filesIn(P(ctx, 'select/reviews'), '.json').map(readJsonFile)
  return selectDrafts({ drafts, reviews, weights: ctx.config.selection.weights, targetSeconds: ctx.limits.targetSeconds, maxSeconds: ctx.limits.runtimeSeconds.max, excluded: excludedOf(ctx, 'select') })
}

async function selectScores(ctx) {
  const g = gate('select.scores')
  const reviews = filesIn(P(ctx, 'select/reviews'), '.json').map(readJsonFile)
  for (const d of readDrafts(ctx)) {
    const n = reviews.filter((r) => ['funny', 'interesting', 'television', 'variety'].every((k) => typeof r.drafts?.[d.slug]?.[k] === 'number')).length
    if (n < ctx.config.parallel.reviewers) g.fail(`draft ${d.slug} has scores from ${n} reviewers; it needs ${ctx.config.parallel.reviewers}`)
  }
  return g.done()
}

async function selectRepetition(ctx) {
  const g = gate('repetition.scripts')
  const drafts = readDrafts(ctx)
  const chosen = selection(ctx).rows.filter((r) => r.selected).map((r) => r.slug)
  const items = drafts.filter((d) => chosen.includes(d.slug)).map((d) => ({ id: d.slug, version: d.version }))
  const combined = combineRepetition(repetitionFiles(P(ctx, 'review/repetition-scripts')), items)
  const r = repetitionProblems(combined, { reviewers: ctx.config.repetition.reviewers, maxTurnedFromPrevious: ctx.config.repetition.maxTurnedFromPrevious, label: 'script' })
  r.failures.forEach((f) => g.fail(f))
  for (const c of Object.values(combined)) if (c.verdict === 'turned') g.warn(`script ${c.id} is turned: ${c.verdicts.filter((v) => v.turned).map((v) => `${v.turned.what} → ${v.turned.how}`).join(' / ')}`)
  return g.done()
}

async function selectPeople(ctx) {
  const g = gate('repetition.people-scripts')
  const drafts = readDrafts(ctx)
  const chosen = new Set(selection(ctx).rows.filter((r) => r.selected).map((r) => r.slug))
  const sel = drafts.filter((d) => chosen.has(d.slug))
  const p = peopleRules(ctx.ledger, ctx.paths.number, { speakers: sel.flatMap((d) => d.notes.speakers ?? []), featured: sel.flatMap((d) => [...(d.notes.featured ?? []), ...(d.notes.speakers ?? [])]) }, ctx.config.people, ctx.digest)
  p.failures.forEach((f) => g.fail(f))
  p.warnings.forEach((w) => g.warn(w))
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

// ---------------------------------------------------------------- 8. assemble

const assemble = {
  name: 'assemble',
  prepare(ctx) {
    // once: the selected drafts become segments, the rundown follows the plan, the drafts' sources merge
    const plan = readJsonFile(P(ctx, 'plan.json'))
    const meta = JSON.parse(readFileSync(ctx.paths.episodeJson, 'utf8'))
    if (!meta.rundown?.length) {
      for (const s of plan.segments) {
        mkdirSync(ctx.paths.segDir(s.id), { recursive: true })
        if (!has(ctx.paths.segFile(s.id, 'script.js'))) cpSync(join(draftsDir(ctx), s.id, 'script.js'), ctx.paths.segFile(s.id, 'script.js'))
      }
      meta.rundown = plan.segments.map((s) => s.id)
      writeFileSync(ctx.paths.episodeJson, formatEpisodeJson(meta))
    }
    if (!has(ctx.paths.sources)) {
      const merged = { format: 'late-cluster-sources/1', week: ctx.week, accounts: [], posts: [], links: [], lines: [], numbers: [] }
      for (const s of plan.segments) {
        const f = join(draftsDir(ctx), s.id, 'sources.json')
        if (!has(f)) continue
        const j = readJsonFile(f)
        for (const a of j.accounts ?? []) if (!merged.accounts.some((x) => normHandle(x.handle) === normHandle(a.handle))) merged.accounts.push(a)
        for (const p of j.posts ?? []) if (!merged.posts.some((x) => x.uri === p.uri)) merged.posts.push({ ...p, segment: p.segment ?? s.id })
        for (const k of ['links', 'lines', 'numbers']) merged[k].push(...(j[k] ?? []))
      }
      writeJson(ctx.paths.sources, merged)
    }
  },
  waves: [
    {
      tasks: (ctx) => [
        {
          id: 'assemble.writer',
          role: 'writer',
          title: 'Assemble the episode',
          writes: [`episodes/${ctx.id}/production/assembly.md`],
          instructions: [
            `The tool has copied the selected drafts into episodes/${ctx.id}/segments/<id>/script.js, set the rundown in episode.json from plan.json, and merged the drafts' sources into production/sources.json.`,
            'Assemble them into an episode: the order (episode.json "rundown", and plan.json in the same order), the open and the close, the joins between segments; the episode title and description in episode.json; any guest entries the drafts needed, merged into episodes/<id>/cast.js and looks.js.',
            'Run `npm run render -- <id> <seg>` as you go and read the IPA; then the check command. Write production/assembly.md: what you changed and why.',
            'A real account\'s puppet still says only what it published, with its context and staged setup recorded in sources.json "lines".',
            EXPERIMENT_LINE(ctx),
          ],
          check: checkCmd(ctx, 'assemble'),
        },
      ],
      after: (ctx) => {
        const meta = JSON.parse(readFileSync(ctx.paths.episodeJson, 'utf8'))
        return { renderResult: ctx.tools.npm('render', [ctx.id, ...meta.rundown]) }
      },
      gates: [assembleRendered, writeRundown, writeSources, writeGuestLines, writeLabels, writeNames, writeOptOut, writeLength, peopleSources, renderCheck, renderWhisper, renderHeard, renderLengths, as(constitutionUnchanged, 'assemble.constitution')],
    },
  ],
}

async function assembleRendered(ctx) {
  const g = gate('assemble.render')
  const r = ctx.renderResult
  if (r && r.code !== 0) g.fail(`npm run render exited ${r.code}: ${r.out.split('\n').filter((l) => /✗|error/i.test(l)).slice(0, 10).join(' | ')}`)
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

// ---------------------------------------------------------------- 9. stage

const stage = {
  name: 'stage',
  waves: [
    {
      tasks: (ctx) =>
        JSON.parse(readFileSync(ctx.paths.episodeJson, 'utf8')).rundown.map((seg) => ({
          id: `stage.${seg}`,
          role: 'builder',
          segment: seg,
          title: `Stage the segment ${seg}`,
          writes: [`episodes/${ctx.id}/segments/${seg}/index.js`],
          instructions: [
            `Write episodes/${ctx.id}/segments/${seg}/index.js against the rendered cues.json (packages/show/README.md, "Authoring a segment"). Start from packages/show/templates/segment/index.js.`,
            `Helpers and props for this segment go in segments/${seg}/ and are imported as @late-cluster/episode/segments/${seg}/<file>.js; studio code as @late-cluster/show/<path>. Never import from another segment or from production/.`,
            'A real post on screen shows its exact text (production/sources.json) with display name, handle, date and counts. Nothing longer than a glance is on screen unless it is spoken in the segment.',
            `Shoot and look at your frames: \`npm run shoot -- ${ctx.id} ${seg} <t>…\`. Check only your segment: \`${checkCmd(ctx, 'stage', ` --segment ${seg}`)}\`.`,
            EXPERIMENT_LINE(ctx),
            'Do not change the script, the cues or what a real person is shown saying.',
          ],
          check: checkCmd(ctx, 'stage', ` --segment ${seg}`),
        })),
      gates: [directModules, directDisclaimer, directCards, directUnread, directFrames, directCredits, as(episodeImports, 'stage.imports'), as(inheritConsistent, 'stage.inherit'), as(constitutionUnchanged, 'stage.constitution')],
    },
    {
      tasks: (ctx) => [
        {
          id: 'stage.reviewer',
          role: 'reviewer',
          title: 'Review the frames',
          writes: [`episodes/${ctx.id}/production/stage/review.json`],
          instructions: [
            `Look at the frames in shots/${ctx.id}/<seg>/ for every segment, and at the end card frames in shots/${ctx.id}/end/.`,
            'Find anything unreadable (text under the captions, too small, gone before it can be read), anything shown but not performed, and anything that changes what a real person said.',
            'Write stage/review.json: { "verdict": "pass" | "send-back", "route": "<stage that can fix it: stage or assemble>", "segments": { "<seg>": { "unreadable": [], "unperformed": [], "notes": "…" } }, "reasons": [] }. A send-back is a valid result.',
          ],
          check: checkCmd(ctx, 'stage'),
        },
      ],
      gates: [as(reviewVerdict, 'stage.review')],
    },
  ],
}

// ---------------------------------------------------------------- 11. review

const review = {
  name: 'review',
  waves: [
    {
      tasks: (ctx) => [
        {
          id: 'review.reviewer',
          role: 'reviewer',
          title: 'Review the episode, and write it into the ledger',
          writes: [`episodes/${ctx.id}/production/scorecard.md`, `episodes/${ctx.id}/production/review.json`, `${R(ctx, ctx.ledgerDir)}/${ctx.id}.json`, `${R(ctx, ctx.ledgerDir)}/${ctx.id}.md`],
          instructions: [
            'Fill in the scorecard from the bible (docs/bible, the scorecard) as production/scorecard.md, with one sentence of evidence per row.',
            'Judge the experiment (production/experiment.md, proposed at the rank stage) in row B12: was it run on screen, and does its measure hold? Say so in dna-amendments.md\'s "## Experiment" section if you edit the DNA.',
            `Write the episode into the ledger: ${R(ctx, ctx.ledgerDir)}/${ctx.id}.md (the prose record: every joke, runner, format, guest, account on a card, song genre and staging device) and ${R(ctx, ctx.ledgerDir)}/${ctx.id}.json ({ "id", "aired": false, "guests", "featured", "formats", "song", "runners", "catchphrases", "devices" }).`,
            'Write production/review.json: { "verdict": "approve" | "send-back", "route": "<the stage that can fix it>", "reasons": [] }. A send-back is a valid result; do not soften scores to avoid one.',
            'If the episode earned a change to the craft bible, edit the chapter and list it in production/dna-amendments.md. Never edit the constitution.',
          ],
          check: checkCmd(ctx, 'review'),
        },
      ],
      gates: [reviewScorecard, reviewLedger, selfCheckDna, as(constitutionUnchanged, 'review.constitution'), as(reviewVerdict, 'review.verdict')],
    },
  ],
}

// ---------------------------------------------------------------- 10. build (tools only)

const build = { name: 'build', tool: true, waves: [] }

export const STAGE_DEFS = { scope, research, brainstorm, rank, 'repetition-ideas': repetitionIdeas, draft, select, assemble, stage, build, review }
