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
 */
export function creditLines(cast, who = null) {
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
  out.push('', { head: 'Voices & faces' }, 'Every voice in this programme', 'is synthesized by CHIMERA.', '')
  out.push(['physical models', 'CHIMERA vocal synth'], ['by', 'jamesondh · MIT'], ['github.com', 'jamesondh/chimera-vocal-synth'], '')
  out.push('Guests are puppets', 'playing posting personas.', '', { head: 'Good night, Bluesky' })
  return out
}
