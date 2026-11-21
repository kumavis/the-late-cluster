// Each account's stated pronouns (README "Pronouns"). From Bluesky's built-in profile field
// `pronouns`, exactly as written; failing that, from an explicit statement in the bio: a set of
// pronouns written with slashes ("she/her", "he/they", "xe/xem"), "any pronouns", "no
// pronouns", or "pronouns: …". Conservative: never a lone word, never a guess from a name, a
// picture or how someone writes. A bio that states two different sets is recorded as none and
// marked for an auditor. `null` means none stated.
//
// Only the pronoun phrase leaves the run's private data; the bio stays in private/.

// Each known word, and the form it names (the subject form, used by the writers' gate).
const WORDS = {
  she: 'she', her: 'she', hers: 'she', herself: 'she',
  he: 'he', him: 'he', his: 'he', himself: 'he',
  they: 'they', them: 'they', their: 'they', theirs: 'they', themself: 'they', themselves: 'they',
  it: 'it', its: 'it', itself: 'it',
  xe: 'xe', xem: 'xe', xyr: 'xe', xir: 'xe', xyrs: 'xe',
  ze: 'ze', zir: 'ze', zirs: 'ze', hir: 'ze', hirs: 'ze', zie: 'ze', zem: 'ze',
  ey: 'ey', em: 'ey', eir: 'ey', eirs: 'ey',
  fae: 'fae', faer: 'fae', faers: 'fae',
  ve: 've', ver: 've', vis: 've',
  per: 'per', pers: 'per',
  any: 'any', all: 'any',
}
const W = Object.keys(WORDS).sort((a, b) => b.length - a.length).join('|')
// Two or more known words joined by slashes: "she/her", "she/they/it", "any/all".
// A set may end in words the list does not know ("she/they/bit"): they stay in the text as written.
const SET_RE = new RegExp(`(?<![\\p{L}\\p{N}/])((?:${W})(?:\\s*/\\s*(?:${W}))+(?:/[\\p{L}]{1,12})*)(?![\\p{L}\\p{N}/])`, 'giu')
const ANY_RE = /\b(any|all) pronouns\b/giu
const NONE_RE = /\b(no pronouns|pronouns: ?none|name only|use my name)\b/giu
const LABEL_RE = new RegExp(`\\bpronouns?\\s*[:=-]\\s*((?:${W})(?:\\s*(?:/|,|\\bor\\b|\\band\\b)\\s*(?:${W}))*)`, 'giu')

/** The forms a written phrase names, in order: ["she", "they"], ["any"], ["name"]. */
export function formsOf(text) {
  const t = String(text ?? '').toLowerCase()
  if (/\bno pronouns\b|\bname only\b|\buse my name\b|^none$/.test(t)) return ['name']
  if (/\b(any|all) pronouns\b|^any(\s*\/\s*all)?$/.test(t.trim())) return ['any']
  const out = []
  for (const w of t.split(/[^\p{L}]+/u)) if (WORDS[w] && !out.includes(WORDS[w])) out.push(WORDS[w])
  return out
}

/** Explicit statements in a bio: [{ text, forms }]. */
export function bioStatements(bio) {
  const d = String(bio ?? '')
  const out = []
  const add = (m) => {
    const text = m.trim()
    const forms = formsOf(text)
    if (forms.length && !out.some((x) => x.text.toLowerCase() === text.toLowerCase())) out.push({ text, forms })
  }
  for (const m of d.matchAll(SET_RE)) {
    // "and/or" and the like are not pronouns; a set needs a pronoun word that is not any/all
    // unless it is "any/all" itself.
    const words = m[1].toLowerCase().split(/\s*\/\s*/).filter((w) => WORDS[w])
    if (words.every((w) => w === 'any' || w === 'all') || words.some((w) => !['any', 'all'].includes(w))) add(m[1])
  }
  for (const m of d.matchAll(ANY_RE)) add(m[0])
  for (const m of d.matchAll(NONE_RE)) add(m[0])
  for (const m of d.matchAll(LABEL_RE)) if (!out.some((x) => m[1].toLowerCase().includes(x.text.toLowerCase()))) add(m[1])
  return out
}

/**
 * An account's stated pronouns from its full profile: { pronouns, review }.
 * pronouns is { text, forms, source: 'profile' | 'bio' } or null; review is true when the bio
 * states conflicting sets (recorded as none, for an auditor).
 */
export function pronounsOf(profile) {
  const field = typeof profile?.pronouns === 'string' ? profile.pronouns.trim() : ''
  if (field) return { pronouns: { text: field, forms: formsOf(field), source: 'profile' }, review: false }
  const st = bioStatements(profile?.description)
  if (!st.length) return { pronouns: null, review: false }
  const key = (x) => [...x.forms].sort().join('/')
  if (new Set(st.map(key)).size > 1) return { pronouns: null, review: true, statements: st.map((x) => x.text) }
  return { pronouns: { text: st[0].text, forms: st[0].forms, source: 'bio' }, review: false }
}

/** How a person's pronouns read in a brief or card: the phrase, or "none stated". */
export const pronounLabel = (p) => (p?.text ? p.text : 'none stated')
