// A small fake repository for the tests: a studio cast, an opt-out list, minimal bible chapters
// with the shapes the pipeline reads, a digest, and fake tools that stand in for render, check,
// shoot, thumbnail, build and verify (no bun, ffmpeg or browser needed). Handles for "real"
// accounts use the reserved .test TLD, which can never belong to anyone.
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { loadContext } from '../src/context.mjs'
import { loadConfig } from '../src/pipeline.mjs'
import { formatEpisodeJson } from '../src/repo.mjs'
import { scriptLines } from '../src/scan.mjs'

export const WEEK = '2026-W47'
export const ID = '002-2026-w47'

export function put(root, rel, content) {
  const f = join(root, rel)
  mkdirSync(dirname(f), { recursive: true })
  writeFileSync(f, typeof content === 'string' || Buffer.isBuffer(content) ? content : JSON.stringify(content, null, 2) + '\n')
  return f
}

export const uri = (did, rkey) => `at://did:plc:${did}/app.bsky.feed.post/${rkey}`
export const POSTS = {
  anaClaim: { uri: uri('ana', 'a1'), url: 'https://bsky.app/profile/ana.test/post/a1', handle: 'ana.test', authorDid: 'did:plc:ana', text: 'concept: a talk show,\nbut the host is a throat', time: '2026-11-17T10:00:00Z' },
  boReply: { uri: uri('bo', 'b1'), url: 'https://bsky.app/profile/bo.test/post/b1', handle: 'bo.test', authorDid: 'did:plc:bo', text: 'claim.', time: '2026-11-17T10:05:00Z', reply: { root: uri('ana', 'a1'), parent: uri('ana', 'a1') } },
  anaAgain: { uri: uri('ana', 'a2'), url: 'https://bsky.app/profile/ana.test/post/a2', handle: 'ana.test', authorDid: 'did:plc:ana', text: 'what else is like this 🦜 https://thing.test', time: '2026-11-17T10:09:00Z', reply: { root: uri('ana', 'a1'), parent: uri('bo', 'b1') } },
  build: { uri: uri('cy', 'c1'), url: 'https://bsky.app/profile/cy.test/post/c1', handle: 'cy.test', authorDid: 'did:plc:cy', text: 'built it: https://golem.cy.test', time: '2026-11-18T09:00:00Z', links: [{ url: 'https://golem.cy.test' }] },
  oob: { uri: uri('dee', 'd1'), url: 'https://bsky.app/profile/dee.test/post/d1', handle: 'dee.test', authorDid: 'did:plc:dee', text: 'a post about something the show leaves alone', time: '2026-11-18T09:00:00Z' },
}

export function digest() {
  const p = POSTS
  return {
    format: 'late-cluster-digest/1',
    window: { label: WEEK },
    overview: { outOfBounds: [{ id: 's-oob', rank: 3, topics: ['health'] }] },
    stories: [
      { id: 's-thread', rank: 1, kind: 'thread', outOfBounds: null, posts: [p.anaClaim, p.boReply, p.anaAgain] },
      { id: 's-built', rank: 2, kind: 'built', outOfBounds: null, posts: [p.build] },
      { id: 's-oob', rank: 3, kind: 'post', outOfBounds: ['health'], posts: [p.oob] },
    ],
    sections: { threads: [{ root: p.anaClaim.uri, posts: [p.anaClaim, p.boReply, p.anaAgain] }] },
    members: [
      { did: 'did:plc:ana', handle: 'ana.test', followers: 900 },
      { did: 'did:plc:bo', handle: 'bo.test', followers: 120, small: true },
      { did: 'did:plc:cy', handle: 'cy.test', followers: 400 },
    ],
    authors: { 'did:plc:nope': { handle: 'nope.test', followers: 10 } },
  }
}

const BIBLE_10 = `# 10. Process

## Stage 2: pitch

\`\`\`markdown
# Episode NNN pitch: <title>  (week YYYY-Www)

## The week in one sentence
This week the cluster ...

## The question
<the question>

## Stories (ranked)
1. <story> — sources: <URIs>

## Rundown
| slot | format |

## Guests
<name, handle> — real-people check: R1–R15 passed / notes

## Risks and open questions
<anything>
\`\`\`

## Stage 3: write

## The scorecard

### Step 0: is everything in it interesting?

List every segment.

### Part A: gates (all must pass)

| # | gate | pass | fail |
|---|---|---|---|
| A1 | Opt-out | none | any |
| A2 | Verbatim | exact | changed |

### Part B: quality (0, 1 or 2 each; 6 possible)

| # | criterion | 2 | 1 | 0 |
|---|---|---|---|---|
| B1 | **Point** | yes | some | no |
| B2 | **Funny** | yes | some | no |
| B3 | **Fresh** | yes | some | no |

**Approve** when Step 0 is clean, every gate passes, and Part B totals **4 or more**, with no 0 in
B1 or B3.
`

const BIBLE_09 = `# 9. Real people

## What the reviewer checks

1. Every real account is in sources.json.
2. Every guest line has a source comment,
   in R3's order.
3. Nothing is a false claim.
`

export const LORE = `# Lore

## Show lore

- **SL-01** The show exists. (001)
- **SL-02** Larry is a throat. (001)

## Rotation log

| ep | formats | song genre | song theme | guests | runner | "Built it." shapes | Sibyl descriptor | sincere kind | Top Chicken |
|---|---|---|---|---|---|---|---|---|---|
| 001 | ask, monologue, panel, song, goodnight | stomp-clap anthem | belonging | Ana (panel; V) | gm/gn | plain | "a throat" | belonging | none |

## Episode log

- **E-001 Pilot** (week 2026-W46).
`

export const STUDIO_CAST = `export const CAST = {
  larry: { name: 'Larry Nx', title: 'Your host', body: { female: 0, child: 0 }, f0: 104 },
  sibyl: { name: 'Sibyl Ant', title: 'Announcer', body: { female: 1, child: 0 }, f0: 196 },
  bot: { name: 'A website bot', title: 'Builds it', body: { female: 0.5, child: 0.4 }, f0: 275 },
  ana: { name: 'Ana', handle: '@ana.test', title: 'Guest', guest: true, body: { female: 1, child: 0 }, f0: 220 },
  bo: { name: 'Bo', handle: '@bo.test', title: 'Guest', guest: true, body: { female: 0, child: 0 }, f0: 120 },
}
`

/** the scorecard with the real chapter's shape: A1–A11, B1–B11, 15 of 22, no 0 in B1, B2, B8, B11 */
const FULL_CARD = (md) => {
  const rows = (p, n) => Array.from({ length: n }, (_, k) => `| ${p}${k + 1} | x | y | z |`).join('\n')
  return md
    .replace(/(### Part A[^\n]*\n\n\|[^\n]*\n\|[^\n]*\n)(\|[^\n]*\n)+/, (_, h) => h + rows('A', 11) + '\n')
    .replace(/(### Part B[^\n]*\n\n\|[^\n]*\n\|[^\n]*\n)(\|[^\n]*\n)+/, (_, h) => h + rows('B', 11) + '\n')
    .replace(/totals \*\*4 or more\*\*, with no 0 in\nB1 or B3\./, 'totals **15 or more**, with no 0 in\nB1, B2, B8 or B11.')
}

/** a fresh fake repo with the pilot published; returns its root */
export function fakeRepo({ optOut = ['nope.test'], pilotPlan = true, fullScorecard = false } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'writers-room-test-'))
  put(root, 'packages/show/src/cast.js', STUDIO_CAST)
  put(root, 'packages/scraper/config/optout.json', { accounts: optOut })
  put(root, 'docs/bible/10-process.md', fullScorecard ? FULL_CARD(BIBLE_10) : BIBLE_10)
  put(root, 'docs/bible/09-real-people.md', BIBLE_09)
  put(root, 'docs/bible/lore.md', LORE)
  put(root, `data/weeks/${WEEK}/digest.json`, digest())
  put(root, 'episodes/001-pilot/episode.json', formatEpisodeJson({ id: '001-pilot', number: 1, slug: 'pilot', title: 'Pilot', description: 'd', airDate: '2026-11-13', week: '2026-W46', status: 'published', rundown: ['cold-open'] }))
  if (pilotPlan)
    put(root, 'episodes/001-pilot/production/plan.json', {
      format: 'late-cluster-plan/1', id: '001-pilot', week: '2026-W46', title: 'Pilot', question: 'What is it?',
      segments: [{ id: 'cold-open', format: 'ask', seconds: 30 }, { id: 'panel', format: 'panel', seconds: 60 }, { id: 'song', format: 'song', genre: 'stomp-clap anthem', theme: 'belonging', seconds: 60 }],
      guests: [{ cast: 'ana', handle: 'ana.test', source: 'panel', segment: 'panel', repeatReason: null }],
      runner: 'gm/gn', builtShapes: ['plain'], descriptor: 'a throat', sincere: { kind: 'belonging' }, callbacks: [],
    })
  return root
}

/** a draft episode for the week, with optional files: { 'segments/x/script.js': '…', … } */
export function makeEpisode(root, { rundown = ['cold-open', 'chat'], files = {}, meta = {} } = {}) {
  put(root, `episodes/${ID}/episode.json`, formatEpisodeJson({ id: ID, number: 2, slug: '2026-w47', title: 'The Throat Show', description: 'Larry learns a thing.', airDate: '2026-11-20', week: WEEK, status: 'draft', rundown, ...meta }))
  for (const [rel, content] of Object.entries(files)) put(root, `episodes/${ID}/${rel}`, content)
  return join(root, 'episodes', ID)
}

export function plan(over = {}) {
  return {
    format: 'late-cluster-plan/1', id: ID, week: WEEK, title: 'The Throat Show', description: 'Larry learns a thing.',
    question: 'Can a throat host a show?',
    segments: [
      { id: 'cold-open', format: 'ask', seconds: 20, built: [0, 1] },
      { id: 'chat', format: 'thread', seconds: 40, built: [1, 1], thread: { posts: [POSTS.anaClaim.uri, POSTS.boReply.uri] } },
    ],
    guests: [
      { cast: 'ana', handle: 'ana.test', source: 'thread', segment: 'chat', repeatReason: 'the thread is hers' },
      { cast: 'bo', handle: 'bo.test', source: 'thread', segment: 'chat', repeatReason: null },
    ],
    runner: 'the throat', builtShapes: ['plain'], descriptor: 'a man made of air', sincere: { kind: 'credit', source: POSTS.build.uri }, callbacks: ['SL-02'], cut: [{ what: 'the song', why: 'nothing this week would carry one' }],
    ...over,
  }
}

export const PITCH = `# Episode 002 pitch: The Throat Show  (week ${WEEK})

## The week in one sentence
This week the cluster asked whether a throat can host.

## The question
Can a throat host? Answer at goodnight: ${POSTS.anaAgain.uri}

## Stories (ranked)
1. The throat thread — sources: ${POSTS.anaClaim.uri} — angle: the host is anatomy
2. The golem build — sources: ${POSTS.build.url} — angle: built before asked

## Rundown
| slot | format |
| cold-open | ask |

## Guests
Ana, ana.test — the thread is hers — real-people check: R1–R15 passed
Bo, bo.test — replies in the thread — real-people check: R1–R15 passed

## Risks and open questions
Bo is a small account; he appears as the hero of the thread.
`

export const SCRIPT_CHAT = `export default {
  id: 'chat',
  title: 'The Thread',
  beats: [
    { say: 'larry', id: 'intro', text: 'This week, two people had a conversation.' },
    // verbatim: ${POSTS.anaClaim.uri}
    { say: 'ana', id: 'p1', text: 'concept: a talk show, but the host is a throat' },
    { say: 'bo', id: 'p2', text: 'claim.' }, // verbatim: ${POSTS.boReply.uri}
    { say: 'bot', id: 'built', text: 'Built it.' },
  ],
}
`
export const SCRIPT_COLD = `export default {
  id: 'cold-open',
  title: 'Cold Open',
  beats: [
    { say: 'larry', id: 'hello', text: 'Good evening.' },
    { say: 'bot', id: 'built', text: 'Built it.' },
  ],
}
`
export const SOURCES = {
  format: 'late-cluster-sources/1',
  week: WEEK,
  accounts: [
    { handle: 'ana.test', role: 'guest', cast: 'ana', catchphrases: ['what else is like this'] },
    { handle: 'bo.test', role: 'guest', cast: 'bo' },
    { handle: 'cy.test', role: 'credited' },
  ],
  posts: [
    { uri: POSTS.anaClaim.uri, author: 'ana.test', use: 'thread', segment: 'chat' },
    { uri: POSTS.boReply.uri, author: 'bo.test', use: 'thread', segment: 'chat', text: 'claim.' },
    { uri: POSTS.build.uri, author: 'cy.test', use: 'card', segment: 'cold-open' },
  ],
  links: [{ url: 'https://golem.cy.test', use: 'credit' }],
}

/** fake tools: render writes cues.json from the script's lines, shoot prints frames, etc. */
export function fakeTools(root, { whisper = false, whisperOut = {}, renderFail = false, shootWarn = null } = {}) {
  const calls = []
  const ok = (out = '') => ({ code: 0, out, stdout: out })
  return {
    calls,
    has: (p) => (p === 'whisper' ? whisper : true),
    fetch: async () => ({ ok: false, status: 400 }),
    exec: () => ok(),
    bun: (args) => {
      calls.push(['bun', ...args])
      return ok(whisperOut[args[3]] ?? '')
    },
    npm: (script, args = []) => {
      calls.push([script, ...args])
      const id = args[0]
      const ep = (rel) => join(root, 'episodes', id, rel)
      switch (script) {
        case 'episode:new': {
          const i = args.indexOf('--week')
          const slug = args[args.indexOf('--slug') + 1]
          const newId = `002-${slug}`
          put(root, `episodes/${newId}/episode.json`, formatEpisodeJson({ id: newId, number: 2, slug, title: args[args.indexOf('--title') + 1], description: '', airDate: '2026-11-20', week: args[i + 1], status: 'draft', rundown: [] }))
          mkdirSync(join(root, 'episodes', newId, 'segments'), { recursive: true })
          return ok(`created ${newId} episodes/${newId}\n`)
        }
        case 'render': {
          if (renderFail) return { code: 1, out: '✗ chat: unknown cast id "zed"' }
          for (const seg of args.slice(1)) {
            const src = readFileSync(ep(`segments/${seg}/script.js`), 'utf8')
            if (src.includes('RENDER_FAIL')) return { code: 1, out: `✗ ${seg}: bad note` }
            const lines = scriptLines(src)
            const durHint = /duration:\s*([\d.]+)/.exec(src)
            const plan = existsSync(ep('production/plan.json')) ? JSON.parse(readFileSync(ep('production/plan.json'), 'utf8')) : null
            const planned = plan?.segments?.find((s) => s.id === seg)?.seconds
            const duration = durHint ? Number(durHint[1]) : planned ?? 10
            put(root, `episodes/${id}/segments/${seg}/cues.json`, { id: seg, duration, lines: lines.map((l, i) => ({ i, id: l.id, who: l.who[0], text: l.text, t0: i, t1: i + 0.8 })), cues: { start: 0.5 }, sfx: [], music: [] })
          }
          return ok('rendered\n')
        }
        case 'check':
          return ok('check: all passed\n')
        case 'shoot': {
          const [, seg, ...times] = args
          const warn = shootWarn ?? (existsSync(ep(`segments/${seg}/index.js`)) && readFileSync(ep(`segments/${seg}/index.js`), 'utf8').includes('UNKNOWN_CUE') ? 'warning: unknown cue "UNKNOWN_CUE"' : null)
          return ok(times.map((t) => `${root}/shots/${id}/${seg}/${seg}@${t}.png  (0.1 s)\n   warning: [.WebGL-0x1]GL Driver Message (OpenGL, Performance): GPU stall due to ReadPixels${warn ? `\n   ${warn}` : ''}`).join('\n') + '\n')
        }
        case 'thumbnail':
          writeFileSync(ep('thumbnail.jpg'), Buffer.from([0xff, 0xd8, 0xff, 0xe0, 1, 2, 3]))
          return ok(`thumbnail episodes/${id}/thumbnail.jpg\n`)
        case 'build':
          put(root, `dist/episodes/${id}/episode.json`, '{}')
          return ok(`built ${id} dist/episodes/${id} segments=2 public=2 carried=0 sourceHash=abc\n`)
        case 'verify':
          return ok('ok 001-pilot\nverify: 2 published, 0 drafts, 0 problems\n')
        case 'scrape':
          put(root, `data/weeks/${args[1]}/digest.json`, digest())
          return ok('scraped\n')
        default:
          return { code: 2, out: `unknown script ${script}` }
      }
    },
  }
}

export async function ctxFor(root, { tools, network = false, limits } = {}) {
  const { config } = loadConfig()
  return loadContext({ root, id: ID, week: WEEK, config, limits: limits ?? config.limits, tools: tools ?? fakeTools(root), network })
}

export const cleanup = (root) => rmSync(root, { recursive: true, force: true })
