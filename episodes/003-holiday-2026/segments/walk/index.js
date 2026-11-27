// The Walk Home: the direction. This file only decides which scene is on and hands it the frame.
// Each scene lives in its own file in this folder. The plan for the scene builders is
// episodes/003-holiday-2026/production/stage/plan.md; this header is the same contract, short.
//
// ── A SCENE FILE ─────────────────────────────────────────────────────────────────────────────
//   export default {
//     name: 'busker',                        // required, unique
//     set: { … },                            // optional: studio set pieces to turn ON (all are off)
//     setup(show, seg) {},                   // once, after load: build geometry (show.rng(seed))
//     direct(t, show, seg) {},               // every frame while the scene is on
//     drawBack(ctx, t, show, seg) {},        // behind the puppets, stage units (1280 × 720)
//     drawFront(ctx, t, show, seg) {},       // in front of the puppets, under the captions
//     landmark: {                            // optional: a place on the street (see street.js)
//       stop: 'busker',                      //   the stop it stands at: restaurant | busker | crossing | door
//       layer: 'fronts', span: [x0, x1],     //   its fastest layer and its extent at the stop (culling)
//       clear: { fronts: [x0, x1], … },      //   what the street leaves out there, street x at the stop
//       direct(t, show, seg, at) {},         //   its puppets, whenever any outdoor scene is on
//       back(ctx, t, show, seg, at) {},      //   drawn by the street just after the building fronts
//       front(ctx, t, show, seg, at) {},     //   drawn by the street after the kerb, behind the puppets
//       over(ctx, t, show, seg, at) {},      //   drawn by the street in front of the puppets
//     },
//   }
//   Landmark hooks draw in street units (the street's world, already transformed by the camera).
//   at(x, layer = 'fronts') is where a thing that stands at street x `x` at the stop is now.
//
// ── WHAT A SCENE GETS: seg ───────────────────────────────────────────────────────────────────
//   seg.shot(name)       name this frame's shot. A new name is a hard cut (heads snap to their new
//                        look); the same name frame after frame is one continuous shot. Unnamed,
//                        a scene's frames are all one shot. A cut between scenes is automatic.
//   show.camera({x,y,zoom})  the camera, every frame (default: the street's VIEW, 640/360/1).
//                        No `push`: to move the camera, tween it yourself from t.
//   seg.place(id, pl)    put a puppet in the frame, every frame: { x, y, scale, look, z, floor,
//                        seat, clip, fx } with the missing fields filled in (look 'camera', z 5,
//                        no floor, seat, clip or fx). A puppet nobody places is not drawn.
//   seg.fade(a)          black over the whole picture this frame, 0..1 (captions stay on top).
//   seg.street           the street (street.js): walk, stops, layers, Larry walking, breath, snow.
//   seg.hold(cue)        a listen hold: { t0, t1, line }, from the cue to the start of the line.
//   seg.now              this frame: { row, scene, from, to } (seconds of the scene's span).
//
// ── RULES ────────────────────────────────────────────────────────────────────────────────────
//   Everything is a pure function of t: no flags, counters or Math.random(); show.rng(seed) in
//   setup. Key everything to cue names and line ids (show.at, show.since, show.progress,
//   show.line(id).words), never to seconds; seconds only as short offsets from a cue.
//   Only the scene that is on is directed, so only it places puppets (and the landmarks it
//   asks the street for). Everyone is dressed first, every frame, by costumes.js (dressWalk).
//   Import studio code as @late-cluster/show/…, this folder as @late-cluster/episode/segments/walk/….
import { dressWalk } from '@late-cluster/episode/segments/walk/costumes.js'
import { SET_PIECES } from '@late-cluster/show/stage/set.js'
import streetScene, { street, VIEW } from '@late-cluster/episode/segments/walk/street.js'
import studio from '@late-cluster/episode/segments/walk/studio.js'
import restaurant from '@late-cluster/episode/segments/walk/restaurant.js'
import busker from '@late-cluster/episode/segments/walk/busker.js'
import crossing from '@late-cluster/episode/segments/walk/crossing.js'
import door from '@late-cluster/episode/segments/walk/door.js'
import table from '@late-cluster/episode/segments/walk/table.js'

/**
 * THE CUE TABLE. Each row is on from its `from` cue until the next row's `from`. `last` is the
 * last cue inside the row, for reading. The first row starts at 0 (its first cue, dark-studio, is
 * 0.3 s in); the last runs to the end.
 */
export const SCENES = [
  { scene: studio, from: 0, first: 'dark-studio', last: 'out-the-door' },
  { scene: streetScene, from: 'street-start', last: 'answers-ahead' },
  { scene: restaurant, from: 'pass-restaurant', last: 'watch-the-cook' },
  { scene: streetScene, from: 'walk-on', last: 'walk-on' },
  { scene: busker, from: 'busker-heard', last: 'coin' },
  { scene: streetScene, from: 'walk-past', last: 'tune-again' },
  { scene: crossing, from: 'crossing-red', last: 'walk-sign' },
  { scene: streetScene, from: 'cross', last: 'glance' },
  { scene: door, from: 'apartment-door', last: 'let-in' },
  { scene: table, from: 'table-wide', last: 'goodnight' },
]

const SHOT = 'walk-home'
/** every set piece off, and no dimmer: the studio is switched off and the rest is not the studio */
const OFF = Object.fromEntries(SET_PIECES.map((k) => [k, false]))
OFF.dim = 0

const SCENE_FILES = [...new Set(SCENES.map((r) => r.scene))]

function rowAt(show, t) {
  let row = 0
  for (let i = 1; i < SCENES.length; i++) if (show.at(SCENES[i].from) <= t) row = i
  return row
}

function makeSeg(show) {
  const seg = {
    street,
    scenes: SCENES,
    now: { row: 0, scene: SCENES[0].scene.name, from: 0, to: 0, shot: null, fade: 0 },
    shot(name) {
      seg.now.shot = name
    },
    fade(a) {
      seg.now.fade = Math.max(seg.now.fade, Math.max(0, Math.min(1, a)))
    },
    place(id, pl) {
      const full = { scale: 1, look: 'camera', z: 5, floor: null, seat: null, clip: null, fx: null, instrument: null, ...pl }
      show.puppet(id).place(full)
      return full
    },
    hold(cue) {
      return street.holds[cue] ?? null
    },
  }
  return seg
}

function guard(show, what, fn) {
  try {
    fn()
  } catch (e) {
    show._warn(`${what} threw: ${e?.message ?? e}`)
    console.error(e)
  }
}

/** a scene's drawing, with the context put back as it was afterwards */
function drawing(ctx, fn) {
  ctx.save()
  try {
    fn()
  } finally {
    ctx.restore()
  }
}

export default {
  drift: false,
  defaultShot: SHOT,

  setup(show) {
    show.SHOTS[SHOT] = () => ({ cam: { ...VIEW }, place: {}, audience: 0 })
    const seg = (show.walkSeg = makeSeg(show))
    const landmarks = SCENE_FILES.filter((s) => s.landmark).map((s) => ({ ...s.landmark, scene: s }))
    street.build(show, seg, landmarks)
    for (const s of SCENE_FILES) if (s.setup) guard(show, `${s.name}.setup()`, () => s.setup(show, seg))
  },

  direct(t, show) {
    const seg = show.walkSeg
    const i = rowAt(show, t)
    const row = SCENES[i]
    const to = i + 1 < SCENES.length ? show.at(SCENES[i + 1].from) : show.duration
    seg.now = { row: i, scene: row.scene.name, from: show.at(row.from), to, shot: null, fade: 0 }
    show.set = { ...OFF, ...(row.scene.set ?? {}) }
    show.onAir = false
    show.camera(VIEW)
    guard(show, 'dressWalk', () => dressWalk(show, t))
    if (row.scene.direct) guard(show, `${row.scene.name}.direct()`, () => row.scene.direct(t, show, seg))
    show.shot(SHOT, { shot: `${i}:${seg.now.shot ?? 'main'}` })
  },

  drawBack(ctx, t, show) {
    const seg = show.walkSeg
    const s = SCENES[seg.now.row].scene
    if (s.drawBack) drawing(ctx, () => guard(show, `${s.name}.drawBack()`, () => s.drawBack(ctx, t, show, seg)))
  },

  drawFront(ctx, t, show) {
    const seg = show.walkSeg
    const s = SCENES[seg.now.row].scene
    if (s.drawFront) drawing(ctx, () => guard(show, `${s.name}.drawFront()`, () => s.drawFront(ctx, t, show, seg)))
    if (seg.now.fade > 0) {
      ctx.save()
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = seg.now.fade
      ctx.fillStyle = '#000'
      ctx.fillRect(-10, -10, 1300, 740)
      ctx.restore()
    }
  },
}
