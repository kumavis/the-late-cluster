// video.mjs's pure parts (tools/video-lib.mjs): its arguments, the subtitle files and their shift
// behind a poster frame, where the poster frame is found, and the phone preview's settings.
// Node builtins only: no browser, no ffmpeg.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseVideoArgs, toSrt, toVtt, shiftCues, stamp, posterAt, previewName, preview360Args, preview720Args, PREVIEW_360, SOFTEN, blueskyVideoGraph } from '../tools/video-lib.mjs'

test('defaults are what the tool always did', () => {
  const o = parseVideoArgs(['002', '--all'])
  assert.deepEqual(o.errors, [])
  assert.equal(o.ep, '002')
  assert.equal(o.all, true)
  assert.equal(o.scale, 1.5)
  assert.equal(o.crf, '16')
  assert.equal(o.preset, 'slow')
  assert.equal(o.jobs, 3)
  assert.equal(o.frames, null)
  assert.equal(o.captionScale, 1)
  assert.equal(o.poster, null)
  assert.equal(o.preview360, false)
  assert.equal(o.previewFile, null)
  assert.deepEqual(o.previews, [])
  assert.equal(o.soften, null)
  assert.equal(o.bluesky, false)
  assert.equal(o.maxMB, 280)
  assert.equal(o.blueskyName, 'late-cluster-bluesky.mp4')
  assert.deepEqual(o.ids, [])
})

test('segments, options and flags in any order', () => {
  const o = parseVideoArgs(['2', 'music-alt', '--caption-scale', '1.6', 'top-chicken', '--scale', '1', '--frames', '30', '--no-captions'])
  assert.deepEqual(o.errors, [])
  assert.deepEqual(o.ids, ['music-alt', 'top-chicken'])
  assert.equal(o.captionScale, 1.6)
  assert.equal(o.scale, 1)
  assert.equal(o.frames, 30)
  assert.equal(o.noCaptions, true)
  // --max-mb alone still means the posting cut
  assert.equal(parseVideoArgs(['2', '--all', '--max-mb', '100']).bluesky, true)
})

test('the poster frame and its length', () => {
  const o = parseVideoArgs(['2', '--all', '--bluesky', '--poster', '215.5'])
  assert.deepEqual(o.errors, [])
  assert.equal(o.poster, 215.5)
  assert.equal(o.posterFrames, 2)
  assert.equal(parseVideoArgs(['2', '--full', '--poster', '0', '--poster-frames', '5']).posterFrames, 5)
  assert.match(parseVideoArgs(['2', '--full', '--poster', 'soon']).errors.join(), /--poster soon/)
  assert.match(parseVideoArgs(['2', '--full', '--poster', '-3']).errors.join(), /--poster -3/)
  assert.match(parseVideoArgs(['2', '--full', '--poster', '10', '--poster-frames', '0']).errors.join(), /--poster-frames 0/)
  assert.match(parseVideoArgs(['2', '--full', '--poster', '10', '--poster-frames', '1.5']).errors.join(), /--poster-frames 1.5/)
  assert.match(parseVideoArgs(['2', '--full', '--poster-frames', '3']).errors.join(), /needs --poster/)
})

test('a bad caption scale, a missing value or an unknown option is an error', () => {
  assert.match(parseVideoArgs(['2', 'x', '--caption-scale', '9']).errors.join(), /--caption-scale 9/)
  assert.match(parseVideoArgs(['2', 'x', '--caption-scale']).errors.join(), /needs a value/)
  assert.match(parseVideoArgs(['2', 'x', '--poster', '--all']).errors.join(), /--poster needs a value/)
  assert.match(parseVideoArgs(['2', 'x', '--captionscale', '2']).errors.join(), /unknown option: --captionscale/)
})

test('--preview-360 is a flag, or takes an existing .mp4 on its own', () => {
  const a = parseVideoArgs(['--preview-360', 'video/x/late-cluster-bluesky.mp4'])
  assert.deepEqual(a.errors, [])
  assert.equal(a.previewFile, 'video/x/late-cluster-bluesky.mp4')
  assert.equal(a.preview360, true)
  assert.equal(a.ep, '')
  const b = parseVideoArgs(['2', '--all', '--bluesky', '--preview-360'])
  assert.equal(b.preview360, true)
  assert.equal(b.previewFile, null)
  // a segment id after the flag is still a segment
  const c = parseVideoArgs(['2', '--preview-360', 'music-alt'])
  assert.equal(c.previewFile, null)
  assert.deepEqual(c.ids, ['music-alt'])
})

test('subtitles: the files, and the shift behind a poster frame', () => {
  const cues = [
    { start: 0.3, end: 4.1, text: 'LARRY NX: I finally got a Bluesky account.' },
    { start: 59.9995, end: 3600.5, text: 'two\nlines' },
  ]
  assert.equal(stamp(3661.0234, '.'), '01:01:01.023')
  assert.equal(stamp(-1, ','), '00:00:00,000')
  assert.equal(toVtt(cues), 'WEBVTT\n\n1\n00:00:00.300 --> 00:00:04.100\nLARRY NX: I finally got a Bluesky account.\n\n2\n00:01:00.000 --> 01:00:00.500\ntwo\nlines\n')
  assert.equal(toSrt(cues).split('\n')[1], '00:00:00,300 --> 00:00:04,100')
  // two poster frames at 30 fps: everything 66.7 ms later
  const v = toVtt(cues, 2 / 30)
  assert.match(v, /\n00:00:00\.367 --> 00:00:04\.167\n/)
  assert.match(v, /\n00:01:00\.066 --> 01:00:00\.567\n/)
  assert.match(toSrt(cues, 2 / 30), /\n00:00:00,367 --> 00:00:04,167\n/)
  assert.equal(shiftCues(cues, 0), cues)
  assert.equal(cues[0].start, 0.3, 'the cues themselves are not moved')
})

test('the poster is found in its segment, frame-exact', () => {
  const counts = [1427, 297, 1991] // 47.567 s, 9.9 s, 66.367 s
  assert.deepEqual(posterAt(0, counts), { frame: 0, index: 0, local: 0 })
  assert.deepEqual(posterAt(47.55, counts), { frame: 1427, index: 1, local: 0 })
  assert.deepEqual(posterAt(52, counts), { frame: 1560, index: 1, local: 133 })
  assert.deepEqual(posterAt((1427 + 297 + 1990) / 30, counts), { frame: 3714, index: 2, local: 1990 })
  assert.throws(() => posterAt(3715 / 30, counts), /the cut is 123\.83 s long/)
  assert.throws(() => posterAt(-1, counts), /--poster -1/)
})

test('the phone preview: name and encoder settings', () => {
  assert.equal(previewName('/v/002/_post/late-cluster-bluesky.mp4'), '/v/002/_post/late-cluster-bluesky-360p-preview.mp4')
  assert.equal(previewName('clip.MP4'), 'clip-360p-preview.mp4')
  const a = preview360Args('in.mp4', 'out.mp4')
  const at = (k) => a[a.indexOf(k) + 1]
  assert.equal(at('-i'), 'in.mp4')
  assert.equal(a.at(-1), 'out.mp4')
  assert.equal(at('-vf'), 'scale=640:360:flags=neighbor,format=yuv420p')
  assert.equal(at('-profile:v'), 'main')
  assert.equal(at('-level:v'), '3.0')
  assert.equal(at('-b:v'), '950k')
  assert.equal(at('-maxrate'), '1800k')
  assert.equal(at('-r'), '30')
  assert.equal(at('-c:a'), 'aac')
  assert.equal(PREVIEW_360.w * 9, PREVIEW_360.h * 16)
})

test('--preview-720 beside --preview-360, as flags or on one file', () => {
  const a = parseVideoArgs(['--preview-360', '--preview-720', 'v/cut.mp4'])
  assert.deepEqual(a.errors, [])
  assert.deepEqual(a.previews, [360, 720])
  assert.equal(a.previewFile, 'v/cut.mp4')
  const b = parseVideoArgs(['--preview-720', 'v/cut.mp4'])
  assert.deepEqual(b.previews, [720])
  assert.equal(b.preview360, false)
  assert.equal(b.previewFile, 'v/cut.mp4')
  const c = parseVideoArgs(['2', '--all', '--bluesky', '--preview-720', '--preview-360'])
  assert.deepEqual(c.previews, [360, 720])
  assert.equal(c.previewFile, null)
  assert.match(parseVideoArgs(['--preview-360', 'a.mp4', '--preview-720', 'b.mp4']).errors.join(), /one file/)
})

test('--soften: a mode of the posting cut, off by default', () => {
  const o = parseVideoArgs(['2', '--all', '--bluesky', '--soften', 'box'])
  assert.deepEqual(o.errors, [])
  assert.equal(o.soften, 'box')
  assert.equal(parseVideoArgs(['2', '--all', '--bluesky', '--soften', 'tent']).soften, 'tent')
  assert.equal(parseVideoArgs(['2', '--all', '--bluesky', '--soften', 'off']).soften, null)
  assert.equal(parseVideoArgs(['2', '--all', '--max-mb', '100', '--soften', 'box']).soften, 'box')
  assert.match(parseVideoArgs(['2', '--all', '--soften', 'box']).errors.join(), /needs --bluesky/)
  assert.match(parseVideoArgs(['2', '--all', '--bluesky', '--soften', 'blur']).errors.join(), /--soften blur: one of box, tent/)
  assert.match(parseVideoArgs(['2', '--all', '--bluesky', '--soften']).errors.join(), /--soften needs a value/)
})

test('the posting cut graph: unchanged without options, the filter in the same encode with them', () => {
  assert.deepEqual(blueskyVideoGraph(), ['-map', '0:v:0'])
  assert.deepEqual(blueskyVideoGraph({ poster: true }), ['-filter_complex', '[1:v]setsar=1[p];[0:v]setsar=1[m];[p][m]concat=n=2:v=1:a=0[v]', '-map', '[v]'])
  const b = blueskyVideoGraph({ soften: 'box' })
  assert.equal(b[1], `[0:v]null,${SOFTEN.box}[v]`)
  const pb = blueskyVideoGraph({ poster: true, soften: 'box' })
  assert.match(pb[1], /concat=n=2:v=1:a=0,boxblur=luma_radius=1:luma_power=1:chroma_radius=1:chroma_power=1\[v\]$/)
  assert.throws(() => blueskyVideoGraph({ soften: 'nope' }), /no soften mode/)
})

test('the box filter averages each 3x3 block about its centre, the pixel Bluesky keeps', () => {
  // radius 1 = a 3x3 window centred on the pixel, equal weights, luma and chroma alike
  assert.equal(SOFTEN.box, 'boxblur=luma_radius=1:luma_power=1:chroma_radius=1:chroma_power=1')
  const k = SOFTEN.tent.match(/^convolution=([^:]+):/)[1].split(' ').map(Number)
  assert.equal(k.length, 9)
  assert.equal(k.reduce((a, b) => a + b, 0), 16)
  assert.equal(k[4], 4)
  assert.ok(Object.isFrozen(SOFTEN))
})

test('the desktop preview: 1280x720, bicubic, about 3.2 Mbit/s', () => {
  assert.equal(previewName('/v/cut.mp4', 720), '/v/cut-720p-preview.mp4')
  assert.equal(previewName('/v/cut.mp4'), '/v/cut-360p-preview.mp4')
  const a = preview720Args('in.mp4', 'out.mp4')
  const at = (k) => a[a.indexOf(k) + 1]
  assert.equal(at('-vf'), 'scale=1280:720:flags=bicubic,format=yuv420p')
  assert.equal(at('-b:v'), '3200k')
  assert.equal(at('-profile:v'), 'main')
  assert.ok(!preview720Args('i', 'o', { audio: false }).includes('-c:a'))
  assert.ok(preview720Args('i', 'o', { audio: false }).includes('-an'))
})
