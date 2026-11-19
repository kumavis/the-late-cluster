// Tokens and n-grams for phrase-spike detection. Deliberately simple and deterministic.

export const STOPWORDS = new Set(`
a about above after again against all also am an and any are aren't as at be because been before
being below between both but by can can't cannot could couldn't did didn't do does doesn't doing
don't down during each few for from further get gets got had hadn't has hasn't have haven't having he
he'd he'll he's her here here's hers herself him himself his how how's i i'd i'll i'm i've if in into
is isn't it it's its itself just let's like me more most mustn't my myself no nor not now of off on
once only or other ought our ours ourselves out over own same shan't she she'd she'll she's should
shouldn't so some such than that that's the their theirs them themselves then there there's these
they they'd they'll they're they've this those through to too under until up very was wasn't we we'd
we'll we're we've were weren't what what's when when's where where's which while who who's whom why
why's will with won't would wouldn't you you'd you'll you're you've your yours yourself yourselves
im ive id youre thats dont cant wont isnt doesnt didnt really much even still yeah yes ok okay oh lol
lmao one two thing things think know make made going go want way well good new time people see say said
also maybe actually something someone anyone everyone everything nothing pretty kind sort lot lots
right now day days week today tomorrow yesterday back first last us use used using via re amp
`.split(/\s+/).filter(Boolean))

const URL_RE = /\bhttps?:\/\/\S+|\bwww\.\S+|\b(?:[\w-]+\.)+(?:com|net|org|io|dev|app|ai|xyz|social|wiki|blog|me|co|gg|fm|site|page|so|sh|lol|moe|computer|online|space|is|at|mobi|place|club|tv|uk|us)\b(?:\/\S*)?/gi
const MENTION_RE = /@[\w.-]+/g

/** Lowercased word tokens; hashtags keep their text, URLs and @-mentions are removed. */
export function tokenize(text) {
  const clean = String(text ?? '')
    .replace(URL_RE, ' ')
    .replace(MENTION_RE, ' ')
    .toLowerCase()
    .replace(/[’‘]/g, "'")
  const out = []
  for (const m of clean.matchAll(/[\p{L}\p{N}][\p{L}\p{N}'_-]*/gu)) {
    const tok = m[0].replace(/['_-]+$/, '').replace(/'s$/, '')
    if (tok.length < 2 || /^\d+$/.test(tok)) continue
    out.push(tok)
  }
  return out
}

/**
 * The distinct n-grams (n = 1..maxN) of a text. A phrase may not start or end with a stopword,
 * and a unigram must be at least four characters, so "the" and "lol" never trend.
 */
export function phrasesOf(text, { maxN = 3, extraStop = new Set() } = {}) {
  const toks = tokenize(text)
  const stop = (t) => STOPWORDS.has(t) || extraStop.has(t)
  const out = new Set()
  for (let i = 0; i < toks.length; i++) {
    for (let n = 1; n <= maxN && i + n <= toks.length; n++) {
      const gram = toks.slice(i, i + n)
      if (stop(gram[0]) || stop(gram[n - 1])) continue
      if (n === 1 && gram[0].length < 4) continue
      if (n > 1 && new Set(gram).size === 1) continue
      out.add(gram.join(' '))
    }
  }
  return out
}

export function firstLine(text, max = 110) {
  const line = String(text ?? '').replace(/\s+/g, ' ').trim()
  if (line.length <= max) return line
  const cut = line.slice(0, max)
  const sp = cut.lastIndexOf(' ')
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut) + '…'
}
