// One caption scale per line. With a caption scale above 1, the bar may only grow into free space:
// over the whole of a line (every page of it), what the frame's drawing code protects
// (kit/draw.js protect(): post cards, credits) must stay clear. This steps a fresh Show through a
// stretch of the segment, draws each sampled frame in probe mode (no heads, no captions) and keeps,
// per line, the largest scale that cleared at every sample. The result goes on show.captionPlan,
// which Stage.draw reads. At caption scale 1 none of this runs.
import { planFromSamples, scaleCandidates } from '../stage/caption-layout.js'

/**
 * makeShow(): a fresh Show for the segment, set up and cut (as the caller builds the real one).
 * Steps it from `start` (default 0) on a 1/fps clock up to `to`, sampling every `every`th frame
 * from `from`. Returns Map(key → scale).
 */
export function planCaptionScales({ stage, makeShow, from = 0, to, start = 0, fps = 30, every = 2 }) {
  const show = makeShow()
  const probe = { samples: new Map() }
  const dt = 1 / fps
  const n0 = Math.max(0, Math.round(start * fps)), n1 = Math.round(to * fps)
  for (let n = n0; n <= n1; n++) {
    const t = n / fps
    show.frame(t, dt, { light: false, paused: false })
    if (t >= from - 1e-9 && (n - n0) % every === 0) stage.draw(show, { captions: true, probe })
  }
  return planFromSamples(scaleCandidates(stage.captionScale), probe.samples)
}
