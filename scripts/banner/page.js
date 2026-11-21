// The show's profile banner, drawn from the studio's own pieces: the title (logo() from the
// studio's chrome, the title card's THE LATE / CLUSTER / with Larry Nx) over the simcluster skyline
// that stands in the set's window (buildSkyline and drawSkyline from the set), with the stage's
// glow pass. No host, no desk, no window frame: Larry is the profile picture. scripts/banner.mjs
// serves this page with Vite and calls window.renderBanner().
//
// Everything is a function of the variant: the skyline comes from the set's own seeded generator,
// its twinkles and pulses are frozen at one wall-clock time, and nothing else is random.
import { buildSkyline, drawSkyline } from '@late-cluster/show/stage/set.js'
import { logo } from '@late-cluster/show/stage/chrome.js'
import { Glow, labelWidth } from '@late-cluster/show/kit/draw.js'
import { rng } from '@late-cluster/show/kit/ease.js'

/** the banner's own units: 1500 × 500, whatever the pixel size */
const U = { w: 1500, h: 500 }
/** the set's wall clock the skyline is frozen at: the beacons lit, the pulses mid-arc */
const T = 12.3

/**
 * Three compositions. Units are the banner's (0..1500 × 0..500).
 *   sky:   the skyline's own rect (w, h) in its units, scaled to the banner's width and standing on
 *          its bottom edge: a wider rect is a lower band of smaller towers; stars: how many; weight:
 *          its line and dot weight; dim: how much darker (0..1); moon: where ({ x, y } fractions of
 *          the rect) or false
 *   title: logo() at scale s (1 ≈ 600 units wide), its middle at (cx, cy) or its right edge at
 *          right; halo: a dark ellipse behind it (rx, ry in units, alpha at its centre)
 */
const VARIANTS = {
  a: {
    sky: { w: 1500, h: 500, stars: 150, weight: 1.7, dim: 0, moon: { x: 0.9, y: 0.22 } },
    title: { cx: 750, cy: 250, s: 1.4, halo: { rx: 520, ry: 250, alpha: 0.9 } },
  },
  b: {
    sky: { w: 1500, h: 500, stars: 150, weight: 1.7, dim: 0.5, moon: { x: 0.2, y: 0.2 } },
    title: { right: 1290, cy: 255, s: 1.4, halo: { rx: 500, ry: 260, alpha: 0.85 } },
  },
  c: {
    sky: { w: 4200, h: 1400, stars: 380, weight: 4.2, dim: 0, moon: { x: 0.9, y: 0.1 } },
    title: { cx: 750, cy: 205, s: 1.6, halo: { rx: 600, ry: 240, alpha: 0.92 } },
  },
}

/** the title's geometry at scale s: CLUSTER's width, and its middle's height above the baseline */
function titleAt(ctx, t) {
  const w = labelWidth(ctx, 'CLUSTER', { size: 104 * t.s, weight: 'm', ls: 0.06 })
  const x = t.right !== undefined ? t.right - w : t.cx - w / 2
  // the title runs from the emblem's outer ring (144 s above the baseline) to under "with Larry Nx"
  // (about 76 s below it): its middle is 34 s above the baseline
  const y = t.cy + 34 * t.s
  return { x, y, w, mid: { x: x + w / 2, y: t.cy } }
}

function drawSky(ctx, k, v) {
  const sky = buildSkyline(rng('late-cluster-skyline'), { x: 0, y: 0, w: v.sky.w, h: v.sky.h }, { stars: v.sky.stars })
  const z = U.w / v.sky.w
  ctx.save()
  ctx.setTransform(k * z, 0, 0, k * z, 0, k * (U.h - v.sky.h * z))
  drawSkyline(ctx, sky, T, { weight: v.sky.weight, moon: v.sky.moon })
  ctx.restore()
  if (v.sky.dim > 0) {
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = v.sky.dim
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.restore()
  }
}

/** a soft dark ellipse behind the title, so the skyline cannot cross its letters */
function halo(ctx, k, c, h) {
  ctx.save()
  ctx.setTransform(k * h.rx, 0, 0, k * h.ry, k * c.x, k * c.y)
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1)
  g.addColorStop(0, `rgba(0,0,0,${h.alpha})`)
  g.addColorStop(0.55, `rgba(0,0,0,${h.alpha * 0.85})`)
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(-1, -1, 2, 2)
  ctx.restore()
}

function drawTitle(ctx, k, v) {
  ctx.save()
  ctx.setTransform(k, 0, 0, k, 0, 0)
  const at = titleAt(ctx, v.title)
  logo(ctx, at.x, at.y, v.title.s, { t: T })
  ctx.restore()
  return at
}

/** the lit pixels of the title drawn alone, as fractions of the banner (for the zone check) */
function titleBox(v) {
  const cv = document.createElement('canvas')
  cv.width = U.w
  cv.height = U.h
  const ctx = cv.getContext('2d', { willReadFrequently: true })
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, U.w, U.h)
  drawTitle(ctx, 1, v)
  const d = ctx.getImageData(0, 0, U.w, U.h).data
  let x0 = U.w, y0 = U.h, x1 = -1, y1 = -1
  for (let y = 0; y < U.h; y++)
    for (let x = 0; x < U.w; x++) {
      const i = 4 * (y * U.w + x)
      if (Math.max(d[i], d[i + 1], d[i + 2]) < 40) continue
      if (x < x0) x0 = x
      if (x > x1) x1 = x
      if (y < y0) y0 = y
      if (y > y1) y1 = y
    }
  return { x0: x0 / U.w, y0: y0 / U.h, x1: (x1 + 1) / U.w, y1: (y1 + 1) / U.h }
}

/** one variant at width px, drawn at width*ss and downsampled; returns { canvas, box } */
function draw(name, width, ss) {
  const v = VARIANTS[name]
  if (!v) throw new Error(`unknown variant: ${name}`)
  const W = Math.round(width * ss), H = Math.round((width * ss * U.h) / U.w)
  const k = W / U.w
  const cv = document.createElement('canvas')
  cv.width = W
  cv.height = H
  const ctx = cv.getContext('2d', { alpha: false })
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, W, H)
  drawSky(ctx, k, v)
  const c = titleAt(ctx, v.title).mid
  halo(ctx, k, c, v.title.halo)
  drawTitle(ctx, k, v)
  // the stage's glow, then a wider bloom (radii in banner units)
  for (const [sigma, alpha] of [[2.2, 0.8], [9, 0.35]]) new Glow(sigma, alpha, 4).apply(cv, ctx, k)
  return { canvas: downsample(cv, width), box: titleBox(v) }
}

/** halve while more than twice the target width, then one high-quality step */
function downsample(src, width) {
  let c = src
  const step = (w) => {
    const h = document.createElement('canvas')
    h.width = w
    h.height = Math.round((w * src.height) / src.width)
    const x = h.getContext('2d')
    x.imageSmoothingEnabled = true
    x.imageSmoothingQuality = 'high'
    x.drawImage(c, 0, 0, h.width, h.height)
    return h
  }
  while (c.width > width * 2) c = step(Math.round(c.width / 2))
  return c.width === width ? c : step(width)
}

// ---------------------------------------------------------------- the judging sheet

const BG = '#161e27' // Bluesky's dark theme behind the profile
const SCALE = 2 // the sheet's pixels per point, as a retina screen shows the profile

/**
 * A profile header w points wide: the banner at 3:1, the profile picture overlapping its bottom
 * left (94 points with a 2-point border, 10 from the left, 40 into the banner), and on a phone the
 * back and menu buttons (34-point discs 10 from the top corners). Drawn at SCALE px per point.
 */
function profile(banner, avatarImg, w, phone) {
  const h = w / 3, below = 64
  const cv = document.createElement('canvas')
  cv.width = w * SCALE
  cv.height = (h + below) * SCALE
  const ctx = cv.getContext('2d')
  ctx.scale(SCALE, SCALE)
  ctx.fillStyle = BG
  ctx.fillRect(0, 0, w, h + below)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(downsample(banner, w * SCALE), 0, 0, w, h)
  const ax = 10 + 47, ay = h - 40 + 47
  ctx.beginPath()
  ctx.arc(ax, ay, 47, 0, Math.PI * 2)
  ctx.fillStyle = BG
  ctx.fill()
  ctx.save()
  ctx.beginPath()
  ctx.arc(ax, ay, 45, 0, Math.PI * 2)
  ctx.clip()
  ctx.drawImage(avatarImg, ax - 45, ay - 45, 90, 90)
  ctx.restore()
  // the name line beside the picture, as a placeholder
  ctx.fillStyle = '#2a3542'
  ctx.fillRect(10 + 94 + 12, h + 12, 120, 12)
  ctx.fillRect(10 + 94 + 12, h + 32, 80, 9)
  if (phone) {
    for (const [cx, kind] of [[10 + 17, 'back'], [w - 10 - 17, 'menu']]) {
      const cy = 10 + 17
      ctx.beginPath()
      ctx.arc(cx, cy, 17, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0,0,0,0.55)'
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.fillStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.lineCap = ctx.lineJoin = 'round'
      if (kind === 'back') {
        ctx.beginPath()
        ctx.moveTo(cx + 3, cy - 7)
        ctx.lineTo(cx - 4, cy)
        ctx.lineTo(cx + 3, cy + 7)
        ctx.stroke()
      } else for (const dx of [-6, 0, 6]) {
        ctx.beginPath()
        ctx.arc(cx + dx, cy, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }
  return cv
}

/** each candidate as the profile shows it: desktop (600 points) and phone (390), side by side */
function sheet(pictures, avatarImg) {
  const pad = 24 * SCALE, gap = 32 * SCALE, head = 30 * SCALE
  const rows = pictures.map((p) => ({ name: p.name, desk: profile(p.canvas, avatarImg, 600, false), phone: profile(p.canvas, avatarImg, 390, true) }))
  const W = pad * 2 + rows[0].desk.width + gap + rows[0].phone.width
  const rowH = head + rows[0].desk.height + pad
  const cv = document.createElement('canvas')
  cv.width = W
  cv.height = pad + rowH * rows.length
  const ctx = cv.getContext('2d')
  ctx.fillStyle = '#0b0f14'
  ctx.fillRect(0, 0, cv.width, cv.height)
  rows.forEach((r, i) => {
    const y = pad + i * rowH
    ctx.fillStyle = '#8b98a5'
    ctx.font = `600 ${16 * SCALE}px system-ui, sans-serif`
    ctx.fillText(`${r.name}: desktop, 600 pt`, pad, y + 18 * SCALE)
    ctx.fillText('phone, 390 pt', pad + r.desk.width + gap, y + 18 * SCALE)
    ctx.drawImage(r.desk, pad, y + head)
    ctx.drawImage(r.phone, pad + r.desk.width + gap, y + head)
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

async function loadFonts() {
  const at = (f) => `url(/fonts/${f})`
  const faces = [
    new FontFace('Hershey', at('AVHersheySimplexLight.otf'), { weight: '100 400' }),
    new FontFace('Hershey', at('AVHersheySimplexMedium.otf'), { weight: '401 900' }),
    new FontFace('Archivo', at('archivo-latin.woff2'), { weight: '100 900' }),
  ]
  for (const f of faces) document.fonts.add(await f.load())
}

/**
 * opts: { variants: ['a', …], width: 3000, ss: 2, sheet: bool, avatar: PNG dataURL (for the sheet) }
 * → { pictures: { a: { sizes: [{ rgb: base64 RGB, width, height }, half], box }, … }, sheet: PNG dataURL | null }
 */
window.renderBanner = async (opts) => {
  const width = opts.width ?? 3000, ss = opts.ss ?? 2
  const pictures = opts.variants.map((name) => ({ name, ...draw(name, width, ss) }))
  let sheetUrl = null
  if (opts.sheet) {
    const img = new Image()
    img.src = opts.avatar
    await img.decode()
    sheetUrl = sheet(pictures, img).toDataURL('image/png')
  }
  // each at full width and at half, for when the full one is over Bluesky's byte limit as a PNG
  const sizes = (c) => [c, downsample(c, c.width / 2)].map((x) => ({ rgb: rgb64(x), width: x.width, height: x.height }))
  return {
    pictures: Object.fromEntries(pictures.map((p) => [p.name, { sizes: sizes(p.canvas), box: p.box }])),
    sheet: sheetUrl,
  }
}

await loadFonts()
window.__bannerReady = true
