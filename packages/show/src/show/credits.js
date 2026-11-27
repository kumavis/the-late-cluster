// The end roll's list of names, as plain data (no drawing, no imports), so it can be tested in Node.
// builtins.js's credits() calls it with the merged cast; see the comment there for what it lists.

/**
 * The id a cast entry is another voice of (`plays: '<cast id>'`), or null. A `plays` naming an id
 * that is not in the cast is ignored: that entry is credited as itself, as if it had no `plays`.
 */
function playsOf(cast, id) {
  const p = cast[id]?.plays
  return p && p !== id && cast[p] ? p : null
}

/**
 * The credit lines for `cast` (id → entry, in order) and `who` (a Set of the ids that appear, or
 * null for everyone). An entry with `plays` is never listed itself: when it appears, the character
 * it plays counts as appearing, so each character is credited once, whichever voice spoke.
 *
 * o.extra: the episode's own credits (episode.json `credits`: [{ head, lines: [string] }]), each
 * a section of its own after the cast and guests, before the voices. o.plain: the roll of an
 * episode with `plainCards` (see endModule): no GOOD NIGHT, BLUESKY heading at its foot, and the
 * line that guests are puppets only when a guest appears. With neither, the roll is as it always was.
 */
export function creditLines(cast, who = null, o = {}) {
  const seen = who ? new Set([...who].map((id) => playsOf(cast, id) ?? id)) : null
  const listed = Object.entries(cast).filter(([id]) => !playsOf(cast, id) && (!seen || seen.has(id)))
  const out = [{ head: 'The Late Cluster' }, ['with', 'Larry Nx'], '']
  out.push({ head: 'Starring' })
  for (const [, c] of listed) if (!c.guest) out.push([c.title ?? '', c.name])
  const guests = listed.filter(([, c]) => c.guest)
  if (guests.length) {
    out.push('', { head: 'Puppets played the' }, { head: 'posting personas of' })
    for (const [, c] of guests) out.push(c.handle ? [c.name, c.handle] : ['', c.name])
  }
  for (const s of episodeCredits(o.extra)) out.push('', { head: s.head }, ...s.lines)
  out.push('', { head: 'Voices & faces' }, 'Every voice in this programme', 'is synthesized by CHIMERA.', '')
  out.push(['physical models', 'CHIMERA vocal synth'], ['by', 'jamesondh · MIT'], ['github.com', 'jamesondh/chimera-vocal-synth'])
  if (!o.plain) out.push('', 'Guests are puppets', 'playing posting personas.', '', { head: 'Good night, Bluesky' })
  else if (guests.length) out.push('', 'Guests are puppets', 'playing posting personas.')
  return out
}

/**
 * An episode's own credit sections, as given in episode.json `credits` (an array of
 * { head: string, lines: [string, …] }); anything else is left out. scripts/lib/episodes.mjs
 * refuses a malformed `credits`, so here this is only a guard.
 */
export function episodeCredits(credits) {
  if (!Array.isArray(credits)) return []
  return credits
    .filter((s) => s && typeof s.head === 'string' && s.head.trim() && Array.isArray(s.lines))
    .map((s) => ({ head: s.head, lines: s.lines.filter((l) => typeof l === 'string' && l.trim()) }))
    .filter((s) => s.lines.length)
}

/**
 * What an episode.json asks of the cards: { plain, extra }. `plain` only for `plainCards: true`
 * (no title card; the credits roll once over black), so an episode that does not say so keeps the
 * stock title and end cards. `extra`: its own credit sections (`credits`), or none.
 */
export function cardOptions(ep) {
  return { plain: ep?.plainCards === true, extra: episodeCredits(ep?.credits) }
}

/**
 * Break a credit line into lines that each pass `fits(line)` (a width test), at spaces, never
 * changing a character of it: joined with single spaces the pieces are the line again. A break
 * goes after a ',' or ' · ' in the line where there is one, else at the last space that fits; a
 * ' · ' stays at the end of the piece before it, so no piece starts with one. A single word too
 * wide for the column is left whole.
 */
export function wrapCredit(text, fits) {
  const s = String(text)
  if (fits(s)) return [s]
  const words = []
  for (const w of s.split(' ')) {
    if (w === '·' && words.length) words[words.length - 1] += ' ·'
    else words.push(w)
  }
  const out = []
  let cur = []
  const join = (ws) => ws.join(' ')
  for (const w of words) {
    cur.push(w)
    while (cur.length > 1 && !fits(join(cur))) {
      // the line without its last word fits: break after the last ',' or '·' in it, else before that word
      let k = -1
      for (let j = cur.length - 2; j >= 0; j--) if (/[,·]$/.test(cur[j])) {
        k = j
        break
      }
      if (k < 0) k = cur.length - 2
      out.push(join(cur.slice(0, k + 1)))
      cur = cur.slice(k + 1)
    }
  }
  if (cur.length) out.push(join(cur))
  return out
}

/** the height a roll of `lines` takes (creditsRoll: `lh` a line, 1.5 × that for a heading) */
export function rollHeight(lines, lh = 34) {
  return lines.reduce((h, l) => h + (l?.head ? lh * 1.5 : lh), 0)
}

/**
 * The plain roll's timing: { speed (units/s), seconds }. It starts `delay` s in at the bottom of a
 * window `h` high and its last line has left the top by `seconds - tail`, the last `tail` s being
 * black, so the whole roll takes `seconds`, on the page and in the video. A roll so long that a
 * line would be up for less than `minUp` s in the window goes no faster than that and takes longer.
 */
export function plainRoll(height, { h, seconds, delay, tail, minUp = 4 }) {
  const speed = Math.min((height + h) / (seconds - delay - tail), h / minUp)
  return { speed, seconds: Math.max(seconds, delay + (height + h) / speed + tail) }
}
