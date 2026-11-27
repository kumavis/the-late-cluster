// The bio pass (trial 002, findings 9 and 36). Every profile description the run read is kept
// in the run's private data (`private/profiles.json`), for the auditor only, and read for what
// it says about quoting, screenshots, keeping posts or bots. A bio is addressed to everyone, not
// to the show, so it excludes nobody (the owner's ruling, 27 November 2026; bible R2, R11): a
// match marks the account `bioReview`, a note for the reviewer's repost test (R6), with the
// phrase that matched kept here. Descriptions are never copied into a file another role reads.

/**
 * @param {object} a
 * @param {Map} a.bios did -> { did, handle, displayName, description, labels, pinnedPost }
 * @param {Consent} a.consent
 * @param {Array} a.members the digest's members
 * @param {object} a.authors the digest's authors (did -> entry)
 * @param {Set} a.memberDids
 */
export function buildPrivate({ bios = new Map(), consent, members = [], authors = {}, memberDids = new Set() }) {
  const appearing = new Set([...members.map((m) => m.did), ...Object.keys(authors)])
  const accounts = []
  const review = new Map()
  for (const did of [...appearing].sort()) {
    if (consent.excludedDid(did)) continue
    const b = bios.get(did)
    if (!b) continue
    const r = consent.bioReview(b.description)
    if (r) review.set(did, r)
    accounts.push({ did, handle: b.handle, displayName: b.displayName, member: memberDids.has(did), description: b.description, labels: b.labels, pinnedPost: b.pinnedPost, pronouns: b.pronouns ?? null, ...(b.pronounsReview ? { pronounsReview: b.pronounsReview } : {}), ...(r ? { bioReview: r } : {}) })
  }
  const read = [...bios.keys()].length
  const membersRead = members.filter((m) => bios.has(m.did)).length
  const counts = {
    profilesRead: read,
    membersRead,
    bioReview: review.size,
    bioReviewByKind: Object.fromEntries(['direct', 'indirect', 'review'].map((k) => [k, [...review.values()].filter((r) => r.kind === k).length])),
    bioReviewMembers: [...review.keys()].filter((d) => memberDids.has(d)).length,
    pronounsStated: accounts.filter((a) => a.pronouns).length,
    pronounsFromBio: accounts.filter((a) => a.pronouns?.source === 'bio').length,
    pronounsReview: accounts.filter((a) => a.pronounsReview).length,
    note: 'bioReview covers accounts that appear in the output; a bio note excludes nobody, it is evidence for the repost test (R6)',
  }
  return { file: { format: 'late-cluster-private-profiles/1', note: 'private: for the auditor only; never copy a description into a file another role reads, except the exact matched words as a repost note', counts, accounts }, review, counts }
}

/** private/bio-review.md: the accounts whose bio carries a note for the repost test, with the phrase that matched. */
export function renderBioReview({ file, review }) {
  const k = file.counts.bioReviewByKind ?? {}
  const out = ['# Bio review', '', "Private: for the auditor only. Each account below has a profile description that says something about quoting, screenshots, keeping posts, or bots and AI. A bio is a line addressed to everyone, not an ask to the show, so it is not an opt-out and the tool excluded nobody for it (the owner's ruling, 27 November 2026; bible R2 and R11). Record each one that matters as a note, with the exact words, for the reviewer's repost test (R6). An account is out only when it is on the opt-out list, carries the !no-unauthenticated label, or asked the show's account itself.", '', `Profiles read: ${file.counts.profilesRead}. Accounts with a bio note: ${file.counts.bioReview} (${file.counts.bioReviewMembers} members): ${k.direct ?? 0} said directly ("no QTs", "no AI"), ${k.indirect ?? 0} said another way (posts meant to disappear), ${k.review ?? 0} wording worth a look.`, '']
  // From the file's own copy, which the final consent scrub has been over.
  for (const a of file.accounts.filter((x) => review.has(x.did))) {
    const r = a.bioReview ?? review.get(a.did)
    out.push(`- @${a.handle} (${a.did})${a.member ? ', member' : ''}: ${r.kind ?? 'review'}, matched "${r.matched}" in "${r.phrase}"`)
  }
  const pr = file.accounts.filter((x) => x.pronounsReview)
  if (pr.length) {
    out.push('', '## Pronouns to judge', '', 'These bios state more than one set of pronouns, so none is recorded (other roles see "none stated"). Judge each; the owner decides whether a set goes into the record.', '')
    for (const a of pr) out.push(`- @${a.handle} (${a.did})${a.member ? ', member' : ''}: ${a.pronounsReview.statements.map((x) => `"${x}"`).join(', ')}`)
  }
  return out.join('\n') + '\n'
}
