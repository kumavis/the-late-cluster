// What the auditor's consent rulings may say, in one place for the screen (stage 2) and the consent
// refresh (stage 9). The owner's ruling, 27 November 2026 (docs/bible/09-real-people.md, R2 and R11):
// "anything said in public is fair game unless they explicitly asked this account to not do that".
// An account is out for three stops only; everything else that was said about quoting, bots or
// screenshots is a note, with the exact words, for the reviewer's repost test (R6).

/** The only reasons an account is out. */
export const CONSENT_STOPS = ['opt-out list', '!no-unauthenticated', 'asked the show']
/** Why a cited post is out, besides its author being out. */
export const POST_STOPS = ['gone', 'changed', ...CONSENT_STOPS]

export const STOP_RULE = `An account is out only for one of three stops, named in "stop": "opt-out list" (packages/scraper/config/optout.json), "!no-unauthenticated" (the label; the show's archive is open to logged-out viewers), or "asked the show" (an explicit ask to the show: a reply or a tag to the show's account, a direct message to it, or a post about the show saying they do not want to be in it, quoted by it or tagged by it). An ask about one thing (not to be tagged, not to be messaged) is honoured for that thing; record it as a note with "to": "the show".`

export const NOTE_RULE = `Not an opt-out by itself: a line in a bio addressed to everyone (what the scraper flagged in private/bio-review.md, "bioReview"), a general remark about bots, quoting or screenshots not said to the show, or how someone reacted to another account. Record each that bears on the material as a note, { "account": "<handle or DID>", "words": "<the exact words; for a bio, only the phrase the scraper matched, never the rest of the bio>", "where": "<the post's at:// address, or \\"bio\\">", "to": "<to whom it was said: everyone, @another-account, or the show>" }, for the reviewer's repost test (R6). It excludes nobody and removes nothing.`

export const REPORT_RULE = "Do not infer an ask from how someone reacted to another account, and do not rule on whom the show's account may tag, mention or message: report what was said, to whom, and where."

export const NOTE_FORMAT = '{ "account": "<handle or DID>", "words": "<exact words>", "where": "<at:// address, or \\"bio\\">", "to": "<everyone, @account, or the show>" }'

const str = (x) => typeof x === 'string' && x.trim().length > 0

/** What is wrong with a list of notes, as messages prefixed with `at`. */
export function noteProblems(notes, at) {
  if (notes === undefined) return []
  if (!Array.isArray(notes)) return [`${at}: "notes" is a list of ${NOTE_FORMAT}`]
  const out = []
  for (const [k, n] of notes.entries()) {
    const where = `${at} notes[${k}]`
    if (!n || typeof n !== 'object') { out.push(`${where}: a note is ${NOTE_FORMAT}`); continue }
    for (const f of ['account', 'words', 'where', 'to']) if (!str(n[f])) out.push(`${where}: give "${f}" (${NOTE_FORMAT})`)
    if (str(n.where) && n.where !== 'bio' && !n.where.startsWith('at://')) out.push(`${where}: "where" is the post's at:// address, or "bio"`)
  }
  return out
}

/** What is wrong with a consent refresh's "out" list: each entry names its stop. */
export function outProblems(out, at) {
  if (!Array.isArray(out)) return [`${at}: "out" is a list`]
  const problems = []
  for (const [k, o] of out.entries()) {
    const where = `${at} out[${k}]`
    if (str(o?.account)) {
      if (!CONSENT_STOPS.includes(o.stop)) problems.push(`${where}: an account is out only for a stop: "stop" is ${CONSENT_STOPS.map((s) => `"${s}"`).join(', ')}; a bio line or a general remark is a note, not an out`)
    } else if (str(o?.post)) {
      if (!POST_STOPS.includes(o.stop)) problems.push(`${where}: a post is out when it is "gone" or "changed", or for its author's stop (${CONSENT_STOPS.map((s) => `"${s}"`).join(', ')})`)
    } else problems.push(`${where}: name an "account" or a "post"`)
  }
  return problems
}
