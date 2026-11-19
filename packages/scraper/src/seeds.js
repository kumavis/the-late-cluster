// Seeds that drift with the community. The cluster is carved out from a few seed accounts,
// as the community's own "are you in the simcluster?" checker does, but the seeds are not a
// fixed list: each window's seeds are the previous run's most connected members, with
// damping so only part of the set turns over at once. The show's own history (the ledger)
// plays no part in the choice. A hand-set bootstrap list, each entry with its reason, is
// used only on a cold start (no earlier run to learn from) or in "fixed" mode.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const norm = (h) => String(h ?? '').trim().replace(/^@/, '').toLowerCase()

/**
 * The previous run: the latest digest under the data folders whose window starts before
 * this one, other than the output folder itself.
 */
export function findPreviousRun(dataRoots, window, outDir) {
  const found = []
  for (const root of dataRoots) {
    if (!existsSync(root)) continue
    for (const name of readdirSync(root)) {
      const dir = join(root, name)
      if (resolve(dir) === resolve(outDir)) continue
      const f = join(dir, 'digest.json')
      if (!existsSync(f) || !statSync(f).isFile()) continue
      try {
        const head = JSON.parse(readFileSync(f, 'utf8'))
        const start = Date.parse(head.window?.start)
        if (Number.isFinite(start) && start < window.start) found.push({ dir, start, end: Date.parse(head.window.end), label: head.window.label })
      } catch { /* not a digest */ }
    }
  }
  found.sort((a, b) => b.start - a.start || b.end - a.end || (a.dir < b.dir ? -1 : 1))
  return found[0] ?? null
}

/** Read a previous run: members (with seed flags and labels) and member posts. */
export function readRun(dir) {
  const digest = JSON.parse(readFileSync(join(dir, 'digest.json'), 'utf8'))
  const posts = existsSync(join(dir, 'posts.jsonl'))
    ? readFileSync(join(dir, 'posts.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l))
    : []
  return { digest, posts }
}

/**
 * How connected each member was inside the cluster during a run: distinct members who
 * replied to or quoted them, plus distinct members they replied to or quoted.
 * @returns Array<{ did, handle, inDegree, outDegree, partners }> best first
 */
export function connectedness(members, posts) {
  const isMember = new Map(members.map((m) => [m.did, m]))
  const ins = new Map()
  const outs = new Map()
  const add = (m, a, b) => { if (!m.has(a)) m.set(a, new Set()); m.get(a).add(b) }
  for (const p of posts) {
    if (!isMember.has(p.authorDid)) continue
    for (const uri of [p.reply?.parent, p.quote?.uri]) {
      const target = uri?.split('/')[2]
      if (!target || target === p.authorDid || !isMember.has(target)) continue
      add(ins, target, p.authorDid)
      add(outs, p.authorDid, target)
    }
  }
  return members.map((m) => {
    const i = ins.get(m.did) ?? new Set()
    const o = outs.get(m.did) ?? new Set()
    return { did: m.did, handle: m.handle, inDegree: i.size, outDegree: o.size, partners: new Set([...i, ...o]).size }
  }).sort((a, b) => b.partners - a.partners || b.inDegree - a.inDegree || (a.did < b.did ? -1 : 1))
}

/**
 * Choose this window's seeds.
 * @param {object} a
 * @param {Array} a.bootstrap config seeds [{ handle, reason }]
 * @param {object} a.cfg cluster.seedSelection { mode, count, maxTurnover, keepWithinTop }
 * @param {object|null} a.previous { label, members, posts } from the previous run
 * @param {(member) => boolean} a.excluded consent, and accounts that should not seed (bots)
 * @returns {{ mode, seeds: [{ handle, did, reason }], previousSeeds, ranking }}
 */
export function chooseSeeds({ bootstrap, cfg = {}, previous = null, excluded = () => false }) {
  const C = { mode: 'drift', count: 4, maxTurnover: 2, keepWithinTop: 12, ...cfg }
  if (C.mode !== 'drift' || !previous || !previous.members?.length) {
    return { mode: previous ? 'fixed' : 'cold start', seeds: bootstrap.map((s) => ({ handle: norm(s.handle), reason: s.reason })), previousSeeds: [], ranking: [] }
  }
  const eligible = previous.members.filter((m) => !excluded(m))
  const ranking = connectedness(eligible, previous.posts)
  const rankOf = new Map(ranking.map((r, i) => [r.did, i]))
  const prevSeeds = previous.members.filter((m) => m.seed)
  // Keep previous seeds that are still near the top; drop the weakest first.
  const kept = prevSeeds
    .filter((m) => rankOf.has(m.did))
    .sort((a, b) => rankOf.get(a.did) - rankOf.get(b.did))
  const stillStrong = kept.filter((m) => rankOf.get(m.did) < C.keepWithinTop)
  const leaving = prevSeeds.filter((m) => !stillStrong.includes(m))
  // Damping: at most maxTurnover seeds change; a weak seed beyond that quota stays one more window.
  const mustKeep = leaving
    .sort((a, b) => (rankOf.get(a.did) ?? Infinity) - (rankOf.get(b.did) ?? Infinity))
    .filter((m) => rankOf.has(m.did))
    .slice(0, Math.max(0, leaving.length - C.maxTurnover))
  const keep = [...stillStrong, ...mustKeep].slice(0, C.count)
  const seeds = keep.map((m) => {
    const r = ranking[rankOf.get(m.did)]
    return { handle: norm(m.handle), did: m.did, reason: `kept: ${ordinal(rankOf.get(m.did) + 1)} most connected member in ${previous.label} (${r.partners} members talked with them or they with them)` }
  })
  for (const r of ranking) {
    if (seeds.length >= C.count) break
    if (seeds.some((s) => s.did === r.did)) continue
    seeds.push({ handle: norm(r.handle), did: r.did, reason: `new: ${ordinal(rankOf.get(r.did) + 1)} most connected member in ${previous.label} (${r.partners} members talked with them or they with them)` })
  }
  return {
    mode: 'drift',
    seeds,
    previousSeeds: prevSeeds.map((m) => norm(m.handle)),
    ranking: ranking.slice(0, Math.max(C.keepWithinTop, 20)).map((r, i) => ({ rank: i + 1, ...r })),
  }
}

const ordinal = (n) => `${n}${[, 'st', 'nd', 'rd'][(n % 100 >> 3) ^ 1 && n % 10] || 'th'}`
