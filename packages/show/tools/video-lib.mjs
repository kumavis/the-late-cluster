// video.mjs's pure parts: its arguments, the subtitle files, the poster frame's place and the
// phone preview's encoder settings. Node builtins only (tested in test/video-lib.test.mjs).
import { basename, dirname, join } from 'node:path'
import { parseCaptionScale } from '../src/stage/caption-layout.js'

export const FPS = 30

export const USAGE =
  'usage: node packages/show/tools/video.mjs <ep> --all | <id> [id …] | --full   [--out dir] [--jobs n] [--scale 1.5] [--crf 16] [--preset slow] [--frames n] [--caption-scale n] [--bluesky [--max-mb 280] [--max-seconds 600] [--out-name late-cluster-bluesky.mp4]] [--youtube] [--no-captions] [--subs] [--poster <seconds> [--poster-frames 2]] [--preview-360]\n' +
  '       node packages/show/tools/video.mjs --preview-360 <file.mp4>'

/**
 * The command line, apart from the episode (which needs the repo): { ep, ids, …options, errors }.
 * `--preview-360 <file.mp4>` alone is the standalone form: { previewFile } and nothing else.
 */
export function parseVideoArgs(args) {
  const argv = args.slice()
  const errors = []
  const opt = (name, def) => {
    const i = argv.indexOf(`--${name}`)
    if (i < 0) return def
    const v = argv[i + 1]
    argv.splice(i, 2)
    if (v == null || v.startsWith('--')) errors.push(`--${name} needs a value`)
    return v
  }
  const flag = (name) => {
    const i = argv.indexOf(`--${name}`)
    if (i < 0) return false
    argv.splice(i, 1)
    return true
  }
  // --preview-360 takes a file only when the next word is an .mp4
  let previewFile = null
  const pi = argv.indexOf('--preview-360')
  if (pi >= 0 && /\.mp4$/i.test(argv[pi + 1] ?? '')) {
    previewFile = argv[pi + 1]
    argv.splice(pi, 2)
  }
  const preview360 = previewFile != null || flag('preview-360')
  const o = {
    ep: argv[0] && !argv[0].startsWith('--') ? argv.shift() : '',
    out: opt('out', null),
    jobs: Math.max(1, Number(opt('jobs', 3))),
    scale: Number(opt('scale', 1.5)),
    crf: String(opt('crf', 16)),
    preset: opt('preset', 'slow'),
    frames: null,
    captionScale: 1,
    all: false,
    full: false,
    bluesky: false,
    maxMB: 280,
    maxSeconds: 600,
    blueskyName: 'late-cluster-bluesky.mp4',
    youtube: false,
    noCaptions: false,
    subs: false,
    poster: null,
    posterFrames: 2,
    preview360,
    previewFile,
    ids: [],
    errors,
  }
  const frames = opt('frames', null)
  if (frames != null) o.frames = Math.max(1, Number(frames))
  const cs = opt('caption-scale', null)
  if (cs != null) {
    o.captionScale = parseCaptionScale(cs)
    if (o.captionScale == null) errors.push(`--caption-scale ${cs}: a number from 0.5 to 3`)
  }
  o.all = flag('all')
  o.full = flag('full')
  // --bluesky: also make the posting cut (default late-cluster-bluesky.mp4, ≤ 280 MB, < 600 s)
  o.bluesky = flag('bluesky') || argv.includes('--max-mb')
  o.maxMB = Number(opt('max-mb', 280))
  o.maxSeconds = Number(opt('max-seconds', 600))
  o.blueskyName = opt('out-name', 'late-cluster-bluesky.mp4')
  o.youtube = flag('youtube')
  o.noCaptions = flag('no-captions')
  o.subs = flag('subs')
  const poster = opt('poster', null)
  if (poster != null) {
    o.poster = Number(poster)
    if (!Number.isFinite(o.poster) || o.poster < 0) errors.push(`--poster ${poster}: a time in seconds into the finished cut`)
  }
  const pf = opt('poster-frames', null)
  if (pf != null) {
    o.posterFrames = Number(pf)
    if (!Number.isInteger(o.posterFrames) || o.posterFrames < 1) errors.push(`--poster-frames ${pf}: a whole number of frames, 1 or more`)
    if (poster == null) errors.push('--poster-frames needs --poster')
  }
  const stray = argv.filter((a) => a.startsWith('--'))
  if (stray.length) errors.push(`unknown option${stray.length > 1 ? 's' : ''}: ${stray.join(' ')}`)
  o.ids = argv.filter((a) => !a.startsWith('--'))
  return o
}

// ------------------------------------------------------------------ subtitles
export const stamp = (t, sep) => {
  const ms = Math.max(0, Math.round(t * 1000))
  const p = (n, w = 2) => String(n).padStart(w, '0')
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)}${sep}${p(ms % 1000, 3)}`
}

/** cues [{ start, end, text }] moved later by `shift` seconds (a poster frame in front of the cut) */
export const shiftCues = (cues, shift = 0) => (shift ? cues.map((c) => ({ ...c, start: c.start + shift, end: c.end + shift })) : cues)

export function toSrt(cues, shift = 0) {
  return shiftCues(cues, shift).map((c, k) => `${k + 1}\n${stamp(c.start, ',')} --> ${stamp(c.end, ',')}\n${c.text}\n`).join('\n')
}

export function toVtt(cues, shift = 0) {
  return 'WEBVTT\n\n' + shiftCues(cues, shift).map((c, k) => `${k + 1}\n${stamp(c.start, '.')} --> ${stamp(c.end, '.')}\n${c.text}\n`).join('\n')
}

// ------------------------------------------------------------------ the poster frame
/**
 * Where `seconds` into the finished cut falls: { frame (in the cut), index (of the segment),
 * local (frame within it) }, given each segment's frame count. Throws past the end.
 */
export function posterAt(seconds, frameCounts, fps = FPS) {
  const total = frameCounts.reduce((a, b) => a + b, 0)
  const frame = Math.round(seconds * fps)
  if (!(frame >= 0 && frame < total)) throw new Error(`--poster ${seconds}: the cut is ${(total / fps).toFixed(2)} s long`)
  let off = 0
  for (const [index, n] of frameCounts.entries()) {
    if (frame < off + n) return { frame, index, local: frame - off }
    off += n
  }
  /* c8 ignore next */
  throw new Error('unreachable')
}

// ------------------------------------------------------------------ the phone preview
/** <dir>/<name>-360p-preview.mp4 beside the file */
export const previewName = (file) => join(dirname(file), basename(file).replace(/\.mp4$/i, '') + '-360p-preview.mp4')

/**
 * What Bluesky serves most phones: its low HLS rung, measured on the episode-two post. 640×360
 * H.264 Main 3.0 at about 0.95 Mbit/s average (peaks near 1.8), 30 fps, AAC. Its downscale is
 * point sampling (no filtering: from 1080p it keeps every third pixel), which is what breaks thin
 * strokes and small text; with `neighbor` the preview's frames match the served ones at SSIM
 * 0.988–0.995, where every filtered scaler stays at 0.94–0.976.
 */
export const PREVIEW_360 = { w: 640, h: 360, kbps: 950, maxKbps: 1800, bufKbps: 1900, profile: 'main', level: '3.0', gop: 60, audioKbps: 128, scaler: 'neighbor', preset: 'veryfast' }

/** ffmpeg arguments for the 360p preview of `input` (one pass, rate-capped like a stream) */
export function preview360Args(input, output) {
  const P = PREVIEW_360
  return [
    '-v', 'error', '-y', '-i', input,
    '-vf', `scale=${P.w}:${P.h}:flags=${P.scaler},format=yuv420p`,
    '-r', String(FPS),
    '-c:v', 'libx264', '-preset', P.preset, '-profile:v', P.profile, '-level:v', P.level,
    '-b:v', `${P.kbps}k`, '-maxrate', `${P.maxKbps}k`, '-bufsize', `${P.bufKbps}k`,
    '-g', String(P.gop), '-pix_fmt', 'yuv420p',
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
    '-c:a', 'aac', '-b:a', `${P.audioKbps}k`, '-ac', '2', '-movflags', '+faststart', output,
  ]
}
