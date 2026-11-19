// Scaffolding: a new draft episode, a new segment. Node builtins only. Templates live in the
// studio (packages/show/templates/); `root` and `templates` are parameters so tests can scaffold
// into a temporary tree.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { EpisodeError, ID_RE, SEG_RE, layout, listEpisodeIds, resolveEpisode, REPO } from './episodes.mjs'

/** episode.json as the repo writes it: two-space JSON, the rundown on one line */
export function formatEpisodeJson(meta) {
  return JSON.stringify(meta, null, 2).replace(/"rundown": \[[^\]]*\]/, () => `"rundown": [${meta.rundown.map((s) => JSON.stringify(s)).join(', ')}]`) + '\n'
}

/** a title → a slug: lower case, words joined by dashes, at most 40 characters */
export function slugify(title) {
  const s = String(title).normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  return s.slice(0, 40).replace(/-+$/, '')
}

/** the Friday of an ISO week ('2026-W46' → '2026-11-13') */
export function fridayOfWeek(week) {
  const m = /^(\d{4})-W(\d{2})$/.exec(week)
  if (!m) throw new EpisodeError(`not an ISO week: ${JSON.stringify(week)} (want e.g. 2026-W47)`)
  const year = Number(m[1]), w = Number(m[2])
  if (w < 1 || w > 53) throw new EpisodeError(`not an ISO week: ${week}`)
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const monday1 = new Date(jan4.getTime() - ((jan4.getUTCDay() + 6) % 7) * 864e5)
  const friday = new Date(monday1.getTime() + ((w - 1) * 7 + 4) * 864e5)
  return friday.toISOString().slice(0, 10)
}

const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/**
 * Scaffold the next numbered episode as a draft: episodes/<NNN-slug>/episode.json and an empty
 * segments/. airDate: --date, else the Friday of --week, else today. Returns { id, dir }.
 */
export function newEpisode({ title, week, date, slug, root = REPO, templates = layout(REPO).templates } = {}) {
  if (!title || !String(title).trim()) throw new EpisodeError('usage: npm run episode:new -- --title "..." [--week 2026-W47] [--date 2026-11-20] [--slug name]')
  const s = slug ?? slugify(title)
  if (!s || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s)) throw new EpisodeError(`cannot make a slug from ${JSON.stringify(slug ?? title)}; pass --slug`)
  if (week) fridayOfWeek(week)
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new EpisodeError(`not a date: ${JSON.stringify(date)} (want YYYY-MM-DD)`)
  const ids = listEpisodeIds(root)
  const number = ids.reduce((n, id) => Math.max(n, Number(id.slice(0, 3))), 0) + 1
  if (number > 999) throw new EpisodeError('episode numbers run out at 999')
  const id = `${String(number).padStart(3, '0')}-${s}`
  if (!ID_RE.test(id)) throw new EpisodeError(`bad episode id ${id}`)
  const dir = join(layout(root).episodes, id)
  if (existsSync(dir)) throw new EpisodeError(`${id} already exists`, 1)
  const meta = JSON.parse(readFileSync(join(templates, 'episode.json'), 'utf8'))
  Object.assign(meta, { id, number, slug: s, title: String(title).trim(), airDate: date ?? (week ? fridayOfWeek(week) : today()), status: 'draft', rundown: [] })
  if (week) meta.week = week
  else delete meta.week
  mkdirSync(join(dir, 'segments'), { recursive: true })
  writeFileSync(join(dir, 'episode.json'), formatEpisodeJson(meta))
  return { id, dir, meta }
}

/**
 * Add a segment skeleton (script.js + index.js from the templates) to an episode and append it
 * to the rundown. A published episode needs force. Returns { ep, seg, dir }.
 */
export function newSegment({ episode, seg, force = false, root = REPO, templates = layout(REPO).templates } = {}) {
  if (!episode || !seg) throw new EpisodeError('usage: npm run segment:new -- <ep> <seg>')
  const ep = resolveEpisode(episode, { root })
  if (!SEG_RE.test(seg)) throw new EpisodeError(`not a segment id: ${JSON.stringify(seg)} (lower case letters, digits and dashes, e.g. cold-open)`)
  if (['title', 'end'].includes(seg)) throw new EpisodeError(`${seg} is reserved for the title and end cards`)
  if (ep.ref) throw new EpisodeError('the reference episode is edited by hand, not scaffolded')
  if (ep.meta.status === 'published' && !force) throw new EpisodeError(`${ep.id} is published; adding a segment changes a published episode (pass --force if you mean it)`, 1)
  const dir = ep.segDir(seg)
  if (existsSync(dir)) throw new EpisodeError(`${ep.rel(dir)} already exists`, 1)
  const title = seg.replace(/-+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const fill = (text) => text.replaceAll('__SEGMENT__', seg).replaceAll('__TITLE__', title.replace(/'/g, "\\'")).replaceAll('__EPISODE__', String(ep.meta.number ?? ep.id))
  mkdirSync(dir, { recursive: true })
  for (const f of ['script.js', 'index.js']) writeFileSync(join(dir, f), fill(readFileSync(join(templates, 'segment', f), 'utf8')))
  const meta = { ...ep.meta }
  if (!meta.rundown.includes(seg)) meta.rundown = [...meta.rundown, seg]
  writeFileSync(join(ep.dir, 'episode.json'), formatEpisodeJson(meta))
  return { ep, seg, dir }
}
