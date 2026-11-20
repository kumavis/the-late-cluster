// The bio pass (trial 002, findings 9 and 36). Every profile description the run read is kept
// in the run's private data (`private/profiles.json`), for the auditor only, and read for
// opt-outs said directly and indirectly. A clear opt-out has already excluded the account in
// the consent rules, like any other exclusion: counted, never named, never written. Wording
// that might be one marks the account `bioReview`, with the phrase that matched, for an
// auditor to judge. Descriptions are never copied into a file another role reads.

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
    accounts.push({ did, handle: b.handle, displayName: b.displayName, member: memberDids.has(did), description: b.description, labels: b.labels, pinnedPost: b.pinnedPost, ...(r ? { bioReview: r } : {}) })
  }
  const read = [...bios.keys()].length
  const membersRead = members.filter((m) => bios.has(m.did)).length
  const counts = {
    profilesRead: read,
    membersRead,
    excludedDirect: (consent.stats.selfDeclaredAccounts ?? 0) - (consent.stats.selfDeclaredIndirect ?? 0),
    excludedIndirect: consent.stats.selfDeclaredIndirect ?? 0,
    bioReview: review.size,
    bioReviewMembers: [...review.keys()].filter((d) => memberDids.has(d)).length,
    note: 'excluded counts cover every profile the run read; bioReview covers accounts that appear in the output',
  }
  return { file: { format: 'late-cluster-private-profiles/1', note: 'private: for the auditor only; never copy a description into a file another role reads', counts, accounts }, review, counts }
}

/** private/bio-review.md: the accounts an auditor should judge, with the phrase that matched. */
export function renderBioReview({ file, review }) {
  const out = ['# Bio review', '', 'Private: for the auditor only. Each account below has a profile description with wording that might be an opt-out (not to be quoted, screenshotted, archived or used by bots or AI, or posts meant to disappear). The tool did not exclude them. Judge each one; a clear opt-out goes into `packages/scraper/config/optout.json` by DID, or a pattern into `config/safety.json` `selfDeclaredOptOut.indirectPatterns`.', '', `Profiles read: ${file.counts.profilesRead}. Excluded by a direct opt-out: ${file.counts.excludedDirect}. Excluded by an indirect one: ${file.counts.excludedIndirect}. Marked for review: ${file.counts.bioReview} (${file.counts.bioReviewMembers} members).`, '']
  // From the file's own copy, which the final consent scrub has been over.
  for (const a of file.accounts.filter((x) => review.has(x.did))) {
    const r = a.bioReview ?? review.get(a.did)
    out.push(`- @${a.handle} (${a.did})${a.member ? ', member' : ''}: matched "${r.matched}" in "${r.phrase}"`)
  }
  return out.join('\n') + '\n'
}
