// Checks one commission draft: node episodes/002-commissions-w47/production/briefs/draft/check.mjs <slug>
// The commission is driven by hand, so this stands in for the pipeline's draft gates: the files and
// their shape, every real person's line against the kept cards (exact text, its setup, its record
// in sources.json), and a pronoun warning on house lines. Node builtins only.
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const prod = join(here, '..', '..')
const root = join(prod, '..', '..', '..')
const slug = process.argv[2]
const fails = [], warns = [], notes_ = []
const fail = (m) => fails.push(m), warn = (m) => warns.push(m)
const done = () => {
  for (const m of notes_) console.log(`  note  ${m}`)
  for (const m of warns) console.log(`  warn  ${m}`)
  for (const m of fails) console.log(`  FAIL  ${m}`)
  console.log(fails.length ? `not ok: ${fails.length} to fix` : 'ok')
  process.exit(fails.length ? 1 : 0)
}
if (!slug) { fail('usage: check.mjs <slug>'); done() }
const dir = join(prod, 'drafts', slug)
const readJson = (f) => JSON.parse(readFileSync(f, 'utf8'))
const house = new Set(Object.keys(readJson(join(root, 'packages/writers-room/config/pipeline.json')).pronouns.house))
const norm = (s) => String(s ?? '').replace(/\s+/g, ' ').trim()

// the kept cards: every post by address
const posts = new Map()
for (const f of readdirSync(join(prod, 'research', 'kept')).filter((f) => f.endsWith('.json')))
  for (const p of readJson(join(prod, 'research', 'kept', f)).posts ?? []) posts.set(p.uri, { ...p, card: f.slice(0, -5) })

let script
try { script = (await import(`${pathToFileURL(join(dir, 'script.js')).href}?t=${Date.now()}`)).default } catch (e) { fail(`drafts/${slug}/script.js does not load: ${String(e.message).split('\n')[0]}`); done() }
if (script?.id !== slug) fail(`script.js: "id" must be '${slug}'`)
const beats = Array.isArray(script?.beats) ? script.beats : []
if (!beats.length) fail('script.js has no beats')

let notes = {}
try { notes = readJson(join(dir, 'notes.json')) } catch (e) { fail(`notes.json is missing or does not parse: ${e.message}`) }
for (const k of ['title', 'format', 'turn']) if (!norm(notes[k])) fail(`notes.json: "${k}" is empty`)
if (!(Number(notes.seconds) > 0)) fail('notes.json: "seconds" must be your estimate of the running time')
for (const k of ['cards', 'ideas', 'speakers', 'featured']) if (!Array.isArray(notes[k])) fail(`notes.json: "${k}" must be a list (empty if none)`)
if (notes.slug !== slug) fail(`notes.json: "slug" must be '${slug}'`)

const says = beats.filter((b) => b && typeof b.say === 'string')
const ids = says.map((b) => b.id)
for (const b of says) if (!b.id) fail(`a line of ${b.say} has no id: "${norm(b.text).slice(0, 40)}"`)
for (const id of new Set(ids)) if (id && ids.filter((x) => x === id).length > 1) fail(`line id "${id}" is used twice`)

const guests = says.filter((b) => !house.has(b.say))
let sources = { accounts: [], posts: [], lines: [] }
if (existsSync(join(dir, 'sources.json'))) { try { sources = { accounts: [], posts: [], lines: [], ...readJson(join(dir, 'sources.json')) } } catch (e) { fail(`sources.json does not parse: ${e.message}`) } }
else if (guests.length) fail('a real account speaks, so sources.json is needed (packages/writers-room/playbooks/sources.md)')
let cast = {}
if (existsSync(join(dir, 'cast.js'))) { try { cast = (await import(`${pathToFileURL(join(dir, 'cast.js')).href}?t=${Date.now()}`)).CAST ?? {} } catch (e) { fail(`cast.js does not load: ${String(e.message).split('\n')[0]}`) } }
const text = readFileSync(join(dir, 'script.js'), 'utf8')

for (const b of guests) {
  const where = `line "${b.id}" (${b.say})`
  if (!cast[b.say]?.guest) fail(`${where}: ${b.say} is not a house character and has no entry with guest: true in cast.js`)
  const acct = sources.accounts.find((a) => a.cast === b.say)
  if (!acct) { fail(`${where}: no account in sources.json has "cast": "${b.say}"`); continue }
  const rec = sources.lines.find((l) => l.line === b.id)
  if (!rec) { fail(`${where}: no record in sources.json "lines"`); continue }
  const post = posts.get(rec.post)
  if (!post) { fail(`${where}: ${rec.post} is not a post on a kept card`); continue }
  if (post.author.handle !== acct.handle) fail(`${where}: the post is by @${post.author.handle}, the puppet is @${acct.handle}`)
  const want = norm(post.text), got = norm(b.text)
  if (got !== want) {
    const parts = got.split('…').map(norm).filter(Boolean)
    let at = 0, cut = got.includes('…') && parts.length > 0
    for (const part of parts) { const i = want.indexOf(part, at); if (i < 0) { cut = false; break } at = i + part.length }
    if (!cut) fail(`${where}: the text is not the post's, character for character.\n          script: ${got}\n          post:   ${want}`)
  }
  if (!new RegExp(`id:\\s*['"]${b.id}['"][^\\n]*//\\s*(verbatim|interview|catchphrase):`).test(text)) fail(`${where}: the line needs its source on the same line: // verbatim: at://… · context: at://…`)
  const setup = rec.setup?.line
  if (!setup || !ids.includes(setup)) fail(`${where}: sources.json "setup.line" must name the staged line that prompts it`)
  else if (ids.indexOf(setup) > ids.indexOf(b.id)) fail(`${where}: its setup "${setup}" comes after it`)
  if (!rec.context) fail(`${where}: sources.json needs "context" (what the post replied to, or the post itself with "situation")`)
}
for (const p of sources.posts) if (!posts.has(p.uri)) fail(`sources.json posts: ${p.uri} is not on a kept card`)
for (const h of notes.speakers ?? []) if (!sources.accounts.some((a) => a.handle === h && a.role === 'guest')) fail(`notes.json speakers: @${h} is not a guest in sources.json`)
for (const a of sources.accounts.filter((a) => a.role === 'guest')) if (!(notes.speakers ?? []).includes(a.handle)) fail(`notes.json speakers lacks @${a.handle}, whose puppet speaks`)

// pronouns: a warning, as at the pipeline's draft stage
for (const b of says.filter((b) => house.has(b.say))) {
  const m = norm(b.text).match(/\b(he|him|his|she|her|hers)\b/gi)
  if (m) warn(`line "${b.id}" (${b.say}) uses ${[...new Set(m.map((x) => x.toLowerCase()))].join(', ')}: check it against production/research/pronouns.md, or that it refers to a house character`)
}
const words = says.reduce((n, b) => n + norm(b.text).split(' ').filter(Boolean).length, 0)
notes_.push(`${says.length} spoken lines, ${words} words: about ${Math.round(words / 1.7)} s of speech before pauses, music and laughs; notes.json says ${notes.seconds} s`)
if (Number(notes.seconds) > 130) warn('over two minutes: the commission asks for two minutes or less')
done()
