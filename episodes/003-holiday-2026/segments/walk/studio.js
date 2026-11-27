// The studio switched off: `dark-studio` to `out-the-door`.
//
// Shot by shot (each keyed to its cue; seconds only as short offsets from one):
//   wide     dark-studio   the whole studio barely there, ON AIR dark, the sign unlit, one bare work
//                          lamp on a stand making a pool by the desk, the city in the window. Larry
//                          side-on in the pool, in his overcoat, looking down at the desk.
//            sees-us       his head comes up and turns to us, unhurried; the camera eases in a little
//   desk     envelope      close on the desk in the pool: the blank envelope leaning on the mug; his
//                          head tips down to it
//   medium   ask           Larry facing us, the lamp behind his shoulder, the envelope's corner at
//                          his coat pocket (the costume, from `ask`; the desk's envelope is gone).
//                          He waits on our yes, nods late, "Good."; at `scarf-on` he looks down
//   collar   scarf-on +    close on his collar: the scarf arrives the last of the way and comes to
//                          rest; then he looks up
//   door     out-the-door  the exit door swings open on the dark, the lamp goes out on the tick,
//                          then black for half a second before the street
//
// The studio's world (2000 × 1125, set.js): the dimmer holds the wall, truss, floor, curtain and
// bandstand barely there; the window, desk, ON AIR, sign, couch and chair are drawn here, blank
// (studio-props.js), because the studio's own carry words or draw over the dimmer.
//
// The scarf. dressWalk (costumes.js) draws the scarf on over two seconds from `scarf-on`; the
// brief wants it never seen drawing itself, so while this scene is on Larry is dressed again
// with the same costume call (larryLook) and the scarf's amount from SCARF below: none in the
// looking-down shot, the last of it settling in the collar shot, all of it after.
import { WORLD, buildSkyline, drawSkyline } from '@late-cluster/show/stage/set.js'
import { occlude, rectPath } from '@late-cluster/show/kit/draw.js'
import { rng, clamp, tween, ease } from '@late-cluster/show/kit/ease.js'
import { larryLook } from '@late-cluster/episode/segments/walk/costumes.js'
import { WIN, roomBeyond, onAirDark, signDark, seatsDark, windowFrame, pool, workLamp, deskDark, deskEnvelope, exitDoor } from '@late-cluster/episode/segments/walk/studio-props.js'

/** where Larry stands: in the pool, side-on to the desk (head centre, world) */
const AT_DESK = { x: 1505, y: 548, scale: 1, floor: WORLD.floor }
/** at the exit door, facing it */
const AT_DOOR = { x: 2045, y: 548, scale: 1, floor: WORLD.floor }

/** head azimuths: 0 profile facing right (toward the desk and the door), about 1.2 to us */
const AZ = { desk: 0.08, us: 1.22 }

/** the cameras (world centre, zoom) */
const CAM = {
  wide: { x: 1000, y: 585, zoom: 0.64 },
  wideIn: { x: 1240, y: 600, zoom: 0.8 },
  desk: { x: 1615, y: 672, zoom: 1.6 },
  medium: { x: 1490, y: 640, zoom: 1.55 },
  collar: { x: 1505, y: 622, zoom: 2.8 },
  door: { x: 1830, y: 640, zoom: 0.82 },
}

/** the scarf shots: the looking-down shot runs this long after `scarf-on`, then the collar */
const SCARF = { down: 0.6, from: 0.84, settle: 0.4 }
/** the door: it starts to swing this long before `out-the-door`, where the lamp goes out on the tick */
const DOOR_SWING = 0.45
/** after the tick, the last of the light goes over this long; then black until the street */
const LAST_LIGHT = [0.04, 0.34]

let SKY = null

const lerp = (a, b, u) => a + (b - a) * u
const camLerp = (a, b, u) => ({ x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u), zoom: lerp(a.zoom, b.zoom, u) })

/** which shot is on at t */
function shotAt(t, show) {
  if (t >= show.at('out-the-door') - DOOR_SWING) return 'door'
  if (t >= show.at('scarf-on') + SCARF.down) return 'collar'
  if (t >= show.at('ask')) return 'medium'
  if (t >= show.at('envelope')) return 'desk'
  return 'wide'
}

/** the work lamp: on until the tick at `out-the-door` */
function lampOn(t, show) {
  return t < show.at('out-the-door') ? 1 : 0
}

/** how much of the scarf is on (0..1), for the shots above */
function scarfAmount(t, show) {
  const s = show.at('scarf-on')
  if (t < s + SCARF.down) return 0
  return lerp(SCARF.from, 1, ease.outCubic(clamp((t - s - SCARF.down) / SCARF.settle)))
}

export default {
  name: 'studio',
  // the room barely there under the dimmer; everything with words on it, or drawn over the
  // dimmer, stays off and is drawn blank by this file
  set: { wall: true, truss: true, floor: true, curtain: true, bandstand: true, dim: 0.84 },

  setup() {
    // the studio's own city, from the studio's own seed: the same skyline as on a show night
    SKY = buildSkyline(rng('late-cluster-skyline'), WIN)
  },

  direct(t, show, seg) {
    const shot = shotAt(t, show)
    seg.shot(shot)
    const P = show.puppet('larry')
    P.dress(larryLook({ garment: 'overcoat', scarf: scarfAmount(t, show), envelope: t >= show.at('ask') }))

    if (shot === 'wide') {
      // side-on, looking down at the desk; then up and round to us, unhurried
      const s = show.at('sees-us')
      const u = ease.inOutSine(clamp((t - s + 0.2) / 1.3))
      show.camera(camLerp(CAM.wide, CAM.wideIn, ease.inOutSine(clamp((t - s - 0.6) / (show.at('envelope') - s - 0.4)))))
      seg.place('larry', { ...AT_DESK, look: lerp(AZ.desk, AZ.us, u) })
      P.nod(lerp(-0.32, 0, ease.inOutSine(clamp((t - s + 0.35) / 0.9))))
    } else if (shot === 'desk') {
      // close on the desk in the pool; his head tips down to the envelope
      show.camera(CAM.desk)
      const e = show.at('envelope')
      const u = ease.inOutSine(clamp((t - e - 0.25) / 0.8))
      seg.place('larry', { ...AT_DESK, look: lerp(AZ.us, 0.32, u) })
      P.nod(lerp(0, -0.36, u))
    } else if (shot === 'medium') {
      show.camera(CAM.medium)
      seg.place('larry', { ...AT_DESK, look: AZ.us })
      // our yes is in the gap after "Would you walk with me a bit?"; he nods, late, when he has it
      const good = show.line('scarf').t0
      const n = clamp((t - (good - 0.55)) / 0.45)
      if (n > 0 && n < 1) P.nod(-0.11 * Math.sin(Math.PI * n))
      // "…my scarf." and at `scarf-on` he looks down at his collar
      const d = ease.inOutSine(clamp((t - show.at('scarf-on') + 0.05) / 0.45))
      if (d > 0) P.nod(-0.5 * d)
    } else if (shot === 'collar') {
      // the scarf comes to rest; the coat settles with it; then he looks up to us
      show.camera(CAM.collar)
      const c = show.at('scarf-on') + SCARF.down
      const settle = 1 - ease.outCubic(clamp((t - c) / SCARF.settle))
      seg.place('larry', { ...AT_DESK, y: AT_DESK.y + 3 * settle, look: AZ.us })
      const up = ease.inOutSine(clamp((t - c - SCARF.settle - 0.05) / 0.4))
      P.nod(lerp(-0.5, 0, up))
    } else {
      // at the door, facing it; it swings open on the dark
      show.camera(CAM.door)
      seg.place('larry', { ...AT_DOOR, look: AZ.desk })
      const o = show.at('out-the-door')
      seg.fade(tween(t, o + LAST_LIGHT[0], o + LAST_LIGHT[1], 0, 1, 'inQuad'))
    }
  },

  drawBack(ctx, t, show, seg) {
    const on = lampOn(t, show)
    const shot = shotAt(t, show)
    show.world(ctx, (c) => {
      if (shot === 'door') roomBeyond(c)
      // the city: the only light but the lamp
      c.save()
      c.beginPath()
      c.rect(WIN.x, WIN.y, WIN.w, WIN.h)
      c.clip()
      drawSkyline(c, SKY, show.wall, { weight: 1 })
      c.restore()
      occlude(c, rectPath(WIN.x, WIN.y, WIN.w, WIN.h), '#000', 0.62)
      windowFrame(c)
      onAirDark(c)
      signDark(c)
      seatsDark(c)
      pool(c, on)
      workLamp(c, on)
      deskDark(c, on)
      if (t < show.at('ask')) deskEnvelope(c, on)
      if (shot === 'door') {
        const o = show.at('out-the-door')
        exitDoor(c, ease.inOutCubic(clamp((t - (o - DOOR_SWING)) / (DOOR_SWING - 0.05))), on)
      }
    })
  },
}
