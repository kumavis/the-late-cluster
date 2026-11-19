// The show's profile picture, drawn from the studio's own pieces: Larry Nx's CHIMERA head in his
// look (LOOKS.larry), his tux from the costume module, the show's palette and the glow pass. scripts/avatar.mjs serves this page with Vite and calls window.renderAvatar().
//
// Everything is a function of the variant: the head's pose is fixed, the face is set by hand
// (no telemetry), the renderer's own Math.random is seeded, and the set's skyline is built from
// its own seeded generator. The picture is drawn at `ss`× and downsampled, with the lines
// thickened for a picture that is shown as small as 42 px.
import { mulberry32 } from '@late-cluster/show/kit/ease.js'

// the vendored renderer's particles, blinks and glances use Math.random: seed it before it loads
Math.random = mulberry32(0x1a7e)

const { initChimera } = await import('@late-cluster/chimera/wasm/chimera.ts')
await initChimera()
const { Head, GLHeads, VIEW, REST_ARTIC } = await import('@late-cluster/show/engine/heads.js')
const { withPalette } = await import('@late-cluster/show/engine/palette.js')
const { LOOKS } = await import('@late-cluster/show/looks.js')
const { CAST } = await import('@late-cluster/show/cast.js')
const { drawCostume } = await import('@late-cluster/show/stage/costumes.js')
const { Glow, beam, occlude, P, mix } = await import('@late-cluster/show/kit/draw.js')

const U = 1000 // the picture's own units: a 1000-unit square, whatever the pixel size
const LARRY = LOOKS.larry

/**
 * Three variations of one composition: tight on Larry's head and bow tie inside a thick gold ring
 * (the show's emblem). Units are the picture's (0..1000, the circle's centre at 500,500).
 *   bg:     the inside of the ring: a flat colour, or a radial gradient { stops } with out-of-focus
 *           lights in the skyline window's colours
 *   head:   tile centre (x, y) and displayed size; the camera's azimuth from facing us (turn, rad,
 *           + = face towards screen-right) and elevation (el); `stage`: the size the head is drawn
 *           at in stage units before scaling up (smaller = heavier lines); lw: the 3D head's line
 *           weight; body: the tux's size; costumeWeight: the tux's line weight; contour: the
 *           silhouette's stroke width (picture units)
 *   face:   the mouth (jaw, lipAp, lipWidth), brows, nod and tilt (rad); the eyes look at us
 */
const VIOLET = { stops: [[0, '#26144e'], [0.6, '#140a33'], [1, '#06031a']], lights: true }
const VARIANTS = {
  // violet behind him, a small opening as if mid-word, turned about 28°
  a: {
    bg: VIOLET,
    head: { x: 500, y: 425, size: 860, stage: 210, turn: 0.49, el: 0.2, lw: 1.5, body: 1.3, costumeWeight: 2.5, contour: 10 },
    face: { brow: 0.35, jaw: 0.3, lipAp: 0.28, lipWidth: 0.7, nod: 0.03, tilt: 0.07 },
  },
  // the same on near-black
  b: {
    bg: { stops: [[0, '#0d0b10'], [1, '#030304']] },
    head: { x: 500, y: 425, size: 860, stage: 210, turn: 0.49, el: 0.2, lw: 1.5, body: 1.3, costumeWeight: 2.5, contour: 10 },
    face: { brow: 0.35, jaw: 0.3, lipAp: 0.28, lipWidth: 0.7, nod: 0.03, tilt: 0.07 },
  },
  // violet, mouth closed in a slight smile, turned less (about 18°)
  c: {
    bg: VIOLET,
    head: { x: 500, y: 425, size: 860, stage: 210, turn: 0.32, el: 0.2, lw: 1.5, body: 1.3, costumeWeight: 2.5, contour: 10 },
    face: { brow: 0.45, jaw: 0.16, lipAp: 0, lipWidth: 1, nod: 0.05, tilt: 0.06 },
  },
}
const RING = { r: 450, w: 32, color: P.gold }
const CLIP_R = 432
/** the window's lights, out of focus: x, y, radius, colour, alpha */
const LIGHTS = [
  [190, 300, 26, P.bsky, 0.55], [250, 470, 18, P.magenta, 0.45], [150, 560, 22, P.sky, 0.4],
  [800, 270, 24, P.violet, 0.5], [850, 430, 18, P.bsky, 0.5], [770, 560, 28, P.magenta, 0.35],
  [330, 170, 14, P.sky, 0.45], [690, 160, 16, P.magenta, 0.4], [880, 610, 14, P.cyan, 0.35],
]

const gl = new GLHeads()
if (!gl.ok) throw new Error('WebGL is unavailable')
VIEW.particles = false // airflow particles are noise at this size
VIEW.pressure = false

/**
 * Larry's head palette for the picture: the cage (shell, skull, brain) dimmer, the articulators
 * inside (jaw, tongue, velum) at a third, the lips' pink kept as the face's one accent.
 */
const third = (c) => mix(c, '#000000', 0.67)
const PALETTE = {
  ...LARRY.head,
  blueDim: mix(LARRY.head.blueDim, '#000000', 0.2),
  red: third(LARRY.head.red),
  green: third(LARRY.head.green),
  white: third(LARRY.head.white),
}
/**
 * The palette the head's fixed geometry is built (and its colours baked) in: the same, but with
 * the teeth (drawn in the bright structure colour) at a third, so the mouth reads as lips. The eyes
 * and the face's profile are drawn each frame, in PALETTE.
 */
const BUILD_PALETTE = { ...PALETTE, blue: third(LARRY.head.blue) }

/** a fixed face: settle the springs for a second, then set the expression by hand */
function poseHead(head, f, az, el, stage, lw) {
  const r = head.r
  r.resetMotion()
  const artic = { ...REST_ARTIC, jaw: f.jaw, lipAp: f.lipAp, lipWidth: f.lipWidth ?? REST_ARTIC.lipWidth, lipProt: 0.05 }
  // no blinks or glances: the eyes are held on the camera
  r.gaze.next = Infinity
  for (let i = 0; i < 30; i++) {
    head.aim(az, el, stage, lw)
    withPalette(head.palette, () => {
      r.face.update(null, 1 / 30)
      r.face.nextBlink = Infinity
      r.face.lid = 0
      r.face.brow = f.brow
      r.face.lookUp = 0
      r.face.nod = f.nod
      r.face.tilt = f.tilt
      r.gaze.yaw = Math.PI / 2 - az
      r.gaze.pitch = el
      head.f = head.model.frame(artic)
      r.update(head.model, head.f, artic, null, VIEW, 1 / 30)
    })
  }
}

/**
 * The head's silhouette from its rendered tile: blur, threshold, fill the holes (everything the
 * outside can't reach), smooth, then trace the 0.5 line (marching squares). Returns { fill, line }
 * as Path2Ds in tile pixels / q.
 */
function silhouette(tile, q) {
  const n = Math.round(tile.width * q)
  const c = document.createElement('canvas')
  c.width = c.height = n
  const x = c.getContext('2d', { willReadFrequently: true })
  x.filter = 'blur(5px)'
  x.drawImage(tile, 0, 0, n, n)
  const d = x.getImageData(0, 0, n, n).data
  const out = new Uint8Array(n * n) // 1 = outside the head
  const stack = []
  const open = (i) => Math.max(d[4 * i], d[4 * i + 1], d[4 * i + 2]) < 10
  for (let i = 0; i < n; i++) for (const j of [i, (n - 1) * n + i, i * n, i * n + n - 1]) if (!out[j] && open(j)) (out[j] = 1), stack.push(j)
  while (stack.length) {
    const j = stack.pop(), jx = j % n
    for (const m of [jx > 0 ? j - 1 : -1, jx < n - 1 ? j + 1 : -1, j - n, j + n]) if (m >= 0 && m < n * n && !out[m] && open(m)) (out[m] = 1), stack.push(m)
  }
  // smooth the solid with two box blurs (radius 11)
  let f = new Float32Array(n * n)
  for (let i = 0; i < n * n; i++) f[i] = out[i] ? 0 : 1
  const R = 11
  for (let pass = 0; pass < 2; pass++) {
    const g = new Float32Array(n * n)
    for (let y = 0; y < n; y++) {
      let s = 0
      for (let i = -R; i <= R; i++) s += f[y * n + Math.min(n - 1, Math.max(0, i))]
      for (let x0 = 0; x0 < n; x0++) {
        g[y * n + x0] = s / (2 * R + 1)
        s += f[y * n + Math.min(n - 1, x0 + R + 1)] - f[y * n + Math.max(0, x0 - R)]
      }
    }
    const h = new Float32Array(n * n)
    for (let x0 = 0; x0 < n; x0++) {
      let s = 0
      for (let i = -R; i <= R; i++) s += g[Math.min(n - 1, Math.max(0, i)) * n + x0]
      for (let y = 0; y < n; y++) {
        h[y * n + x0] = s / (2 * R + 1)
        s += g[Math.min(n - 1, y + R + 1) * n + x0] - g[Math.max(0, y - R) * n + x0]
      }
    }
    f = h
  }
  // marching squares at 0.5
  const line = new Path2D()
  const fill = new Path2D()
  const at = (a, b) => (0.5 - a) / (b - a)
  for (let y = 0; y < n - 1; y++)
    for (let x0 = 0; x0 < n - 1; x0++) {
      const a = f[y * n + x0], b = f[y * n + x0 + 1], cc = f[(y + 1) * n + x0 + 1], dd = f[(y + 1) * n + x0]
      const idx = (a > 0.5 ? 8 : 0) | (b > 0.5 ? 4 : 0) | (cc > 0.5 ? 2 : 0) | (dd > 0.5 ? 1 : 0)
      if (idx === 15) fill.rect(x0 / q, y / q, 1.02 / q, 1.02 / q)
      if (idx === 0 || idx === 15) continue
      const T = [x0 + at(a, b), y], Rt = [x0 + 1, y + at(b, cc)], B = [x0 + at(dd, cc), y + 1], L = [x0, y + at(a, dd)]
      const segs = { 1: [[L, B]], 2: [[B, Rt]], 3: [[L, Rt]], 4: [[T, Rt]], 5: [[L, T], [B, Rt]], 6: [[T, B]], 7: [[L, T]], 8: [[L, T]], 9: [[T, B]], 10: [[T, Rt], [L, B]], 11: [[T, Rt]], 12: [[L, Rt]], 13: [[B, Rt]], 14: [[L, B]] }[idx]
      for (const [p0, p1] of segs) {
        line.moveTo(p0[0] / q, p0[1] / q)
        line.lineTo(p1[0] / q, p1[1] / q)
      }
    }
  return { fill, line }
}

/** Larry: costume back, the head's dark silhouette, the 3D head added on, its contour, costume front */
function drawLarry(ctx, k, h, f) {
  const Z = h.size / h.stage // picture units per stage unit
  const az = Math.PI / 2 - h.turn
  const head = new Head(CAST.larry?.body ?? { female: 0, child: 0 }, BUILD_PALETTE)
  head.palette = PALETTE
  poseHead(head, f, az, h.el, h.stage, h.lw)
  const ox = h.x - h.size / 2, oy = h.y - h.size / 2
  const nk = head.neck()
  const u = nk.cm * (LARRY.bodyScale ?? 0.66) * (h.body ?? 1)
  // the costume's strokes are in stage px: drawing it m× smaller under an m× larger scale keeps
  // its shape and makes its lines m× heavier
  const m = h.costumeWeight ?? 1
  const anchor = { x: nk.x / m, y: nk.y / m, u: u / m, turn: Math.cos(az) * 0.75, sway: 0, breathe: 0.5, t: 0, bottom: 400, floor: null, speaking: 1, look: LARRY }
  const costumeT = () => ctx.setTransform(k * Z * m, 0, 0, k * Z * m, k * ox, k * oy)

  // the head's tile, copied off the shared renderer straight away
  const px = Math.round(h.size * k)
  if (px > 4096) throw new Error(`head tile ${px} px is over the renderer's 4096: lower ss`)
  const src = gl.render(head, px)
  const tile = document.createElement('canvas')
  tile.width = tile.height = px
  tile.getContext('2d').drawImage(gl.canvas, src[0], src[1], src[2], src[3], 0, 0, px, px)
  const sil = silhouette(tile, 640 / px)

  ctx.save()
  costumeT()
  drawCostume(ctx, 'back', anchor, LARRY.costume)
  ctx.setTransform(1, 0, 0, 1, ox * k, oy * k) // tile pixels
  occlude(ctx, sil.fill, '#22170a', 0.96)
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.drawImage(tile, 0, 0)
  ctx.restore()
  beam(ctx, sil.line, LARRY.color, h.contour * k, { hot: true, alpha: 0.95 })
  costumeT()
  drawCostume(ctx, 'front', anchor, LARRY.costume)
  ctx.restore()
  head.dispose()
}

function drawRing(ctx, k, r) {
  ctx.save()
  ctx.setTransform(k, 0, 0, k, 0, 0)
  const ring = new Path2D()
  ring.arc(500, 500, r.r, 0, Math.PI * 2)
  beam(ctx, ring, mix(r.color, '#000', 0.25), r.w, {})
  beam(ctx, ring, r.color, r.w * 0.55, { hot: true })
  const inner = new Path2D()
  inner.arc(500, 500, r.r - r.w * 0.95, 0, Math.PI * 2)
  beam(ctx, inner, r.color, 4, { alpha: 0.7 })
  ctx.restore()
}

function drawBackground(ctx, k, N, bg) {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, N, N)
  const g = ctx.createRadialGradient(500 * k, 420 * k, 0, 500 * k, 420 * k, CLIP_R * k)
  bg.stops.forEach(([at, c]) => g.addColorStop(at, c))
  ctx.fillStyle = g
  ctx.fillRect(0, 0, N, N)
  if (!bg.lights) return
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.filter = `blur(${(9 * k).toFixed(1)}px)`
  for (const [x, y, r, c, a] of LIGHTS) {
    ctx.globalAlpha = a
    ctx.fillStyle = c
    ctx.beginPath()
    ctx.arc(x * k, y * k, r * k, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.restore()
}

/** one variant at `size` px, drawn at size*ss and downsampled; returns the canvas */
function draw(name, size, ss) {
  const v = VARIANTS[name]
  if (!v) throw new Error(`unknown variant: ${name}`)
  const N = Math.round(size * ss)
  const k = N / U
  const cv = document.createElement('canvas')
  cv.width = cv.height = N
  const ctx = cv.getContext('2d', { alpha: false })
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, N, N)
  ctx.save()
  ctx.beginPath()
  ctx.arc(500 * k, 500 * k, CLIP_R * k, 0, Math.PI * 2)
  ctx.clip()
  drawBackground(ctx, k, N, v.bg)
  drawLarry(ctx, k, v.head, v.face)
  ctx.restore()
  drawRing(ctx, k, RING)
  // the glow: a tight halo and a wide bloom (radii in picture units)
  for (const [sigma, alpha] of [[2.4, 0.9], [10, 0.55]]) new Glow(sigma, alpha, 4).apply(cv, ctx, k)
  return downsample(cv, size)
}

/** halve while more than twice the target, then one high-quality step */
function downsample(src, size) {
  let c = src
  while (c.width > size * 2) {
    const h = document.createElement('canvas')
    h.width = h.height = Math.round(c.width / 2)
    const x = h.getContext('2d')
    x.imageSmoothingEnabled = true
    x.imageSmoothingQuality = 'high'
    x.drawImage(c, 0, 0, h.width, h.height)
    c = h
  }
  if (c.width === size) return c
  const o = document.createElement('canvas')
  o.width = o.height = size
  const x = o.getContext('2d')
  x.imageSmoothingEnabled = true
  x.imageSmoothingQuality = 'high'
  x.drawImage(c, 0, 0, size, size)
  return o
}

/** the contact sheet: each picture at 400, 96 and 42 px in a circle, on Bluesky's dark and on white */
function sheet(pictures) {
  const sizes = [400, 96, 42]
  const pad = 24, gap = 20, zoom = 4
  const row = 400 + 2 * pad
  const bandW = pad + sizes.reduce((a, s) => a + s + gap, 0) + 42 * zoom + pad
  const cv = document.createElement('canvas')
  cv.width = bandW * 2
  cv.height = row * pictures.length
  const ctx = cv.getContext('2d')
  pictures.forEach(({ name, canvas }, i) => {
    for (const [b, bg] of [[0, '#161e27'], [1, '#ffffff']]) {
      const x0 = b * bandW, y0 = i * row
      ctx.fillStyle = bg
      ctx.fillRect(x0, y0, bandW, row)
      let x = x0 + pad
      for (const s of sizes) {
        const small = downsample(canvas, s)
        const y = y0 + pad + (400 - s) / 2
        ctx.save()
        ctx.beginPath()
        ctx.arc(x + s / 2, y + s / 2, s / 2, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(small, x, y)
        ctx.restore()
        x += s + gap
      }
      // the 42 px circle again, magnified 4× with hard pixels, to judge what survives
      const s42 = document.createElement('canvas')
      s42.width = s42.height = 42
      const sx = s42.getContext('2d')
      sx.fillStyle = bg
      sx.fillRect(0, 0, 42, 42)
      sx.beginPath()
      sx.arc(21, 21, 21, 0, Math.PI * 2)
      sx.clip()
      sx.drawImage(downsample(canvas, 42), 0, 0)
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(s42, x, y0 + pad + (400 - 42 * zoom) / 2, 42 * zoom, 42 * zoom)
      ctx.imageSmoothingEnabled = true
      ctx.fillStyle = b ? '#5b6670' : '#8b98a5'
      ctx.font = '600 20px system-ui, sans-serif'
      ctx.fillText(name, x0 + 8, y0 + 26)
    }
  })
  return cv
}

/** a canvas's pixels as base64 RGB (rows top to bottom, no alpha), for the script's PNG encoder */
function rgb64(cv) {
  const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data
  const out = new Uint8Array((d.length / 4) * 3)
  for (let i = 0, j = 0; i < d.length; i += 4, j += 3) {
    out[j] = d[i]
    out[j + 1] = d[i + 1]
    out[j + 2] = d[i + 2]
  }
  let s = ''
  for (let i = 0; i < out.length; i += 0x8000) s += String.fromCharCode.apply(null, out.subarray(i, i + 0x8000))
  return btoa(s)
}

/**
 * opts: { variants: ['a', …], size: 1000, ss: 3, sheet: bool }
 * → { pictures: { a: base64 RGB, … }, sheet: PNG dataURL | null }
 */
window.renderAvatar = (opts) => {
  const size = opts.size ?? 1000, ss = opts.ss ?? 3
  const pictures = opts.variants.map((name) => ({ name, canvas: draw(name, size, ss) }))
  return {
    pictures: Object.fromEntries(pictures.map((p) => [p.name, rgb64(p.canvas)])),
    sheet: opts.sheet ? sheet(pictures).toDataURL('image/png') : null,
  }
}
window.__avatarReady = true
