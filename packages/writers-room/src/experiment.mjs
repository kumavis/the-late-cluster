// The episode's one experiment (docs/WORKFLOW.md, stage 4): proposed by a reviewer, who can see what
// the show has tried, in production/experiment.md; read by writers and builders; judged at review in
// scorecard row B12.

const EXPERIMENT_SECTIONS = ['What we try', 'Why', 'Measure']
const EARLIER = /\b\d{3}-[a-z0-9]|\bpilot\b|\bepisode \d|\blast (week|time|episode)\b|\bprevious (episode|week)\b|\bthis time\b|\bagain\b|\bonce more\b|\bas before\b|\bthe show has (done|tried)\b/i

/** production/experiment.md: three sections, a checkable measure, and nothing about earlier episodes (it goes to writers) */
export function experimentProblems(md, label = 'production/experiment.md') {
  const out = []
  if (md === null) return [`${label} is missing: the rank stage's reviewer proposes the episode's one experiment`]
  const section = (h) => {
    const m = new RegExp(`^##\\s*${h}\\s*$([\\s\\S]*?)(?=^##\\s|(?![\\s\\S]))`, 'im').exec(md)
    return m ? m[1].trim() : null
  }
  for (const h of EXPERIMENT_SECTIONS) {
    const t = section(h)
    if (t === null) out.push(`${label} has no "## ${h}" section`)
    else if (t.replace(/[^a-z0-9]/gi, '').length < 20) out.push(`${label}: "## ${h}" needs a sentence or two`)
  }
  const hit = EARLIER.exec(md)
  if (hit) out.push(`${label} refers to what the show has done ("${hit[0]}"); it goes to writers, so it states only what to try`)
  return out
}

/**
 * The experiment's "## Cold-viewer test" section (optional): one line per stretch,
 * `- <card id | segment id | every segment>: longest silence` or `- <segment id>: <start>-<end> s`.
 * → { stretches: [{ target, longest: true } | { target, t0, t1 }], problems }
 */
export function coldStretches(md) {
  const m = /^##\s*Cold-viewer test\s*$([\s\S]*?)(?=^##\s|(?![\s\S]))/im.exec(md ?? '')
  const stretches = []
  const problems = []
  if (!m) return { stretches, problems, absent: true }
  for (const line of m[1].split('\n').map((l) => l.trim()).filter((l) => l.startsWith('- '))) {
    const x = /^-\s*`?([a-z0-9-]+(?: segment)?|every segment)`?\s*:\s*(.+)$/i.exec(line)
    const what = x?.[2]?.trim().replace(/\.$/, '')
    const span = what && /^(\d+(?:\.\d+)?)\s*(?:-|–|to)\s*(\d+(?:\.\d+)?)\s*s?$/.exec(what)
    if (x && /^longest silence$/i.test(what)) stretches.push({ target: x[1].toLowerCase(), longest: true })
    else if (x && span && Number(span[2]) > Number(span[1])) stretches.push({ target: x[1].toLowerCase(), t0: Number(span[1]), t1: Number(span[2]) })
    else problems.push(`production/experiment.md, "## Cold-viewer test": cannot read "${line}"; write \`- <card or segment id, or every segment>: longest silence\` or \`- <segment id>: 12-24 s\``)
  }
  if (!stretches.length && !problems.length) problems.push('production/experiment.md: "## Cold-viewer test" lists no stretch')
  return { stretches, problems, absent: false }
}
