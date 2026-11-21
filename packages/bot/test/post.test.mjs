// Every handle, DID, CID, job and text here is invented, except the reference record's shape.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash, randomBytes } from 'node:crypto';
import { createServer } from 'node:http';
import { closeSync, existsSync, ftruncateSync, mkdirSync, mkdtempSync, openSync, readdirSync as readdir, readFileSync, rmSync, writeFileSync, writeSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { main } from '../src/cli.mjs';
import { checkLangs, checkPostText } from '../src/commands/post.mjs';
import { buildVideoEmbed, checkDuration, checkVideoFile, loadCaptions, parseAspect } from '../src/video.mjs';
import { capture, FIXED_NOW, fakePds, NO_CONFIG, noNetwork } from './helpers.mjs';

const SHOW = 'did:plc:showpost';
const HANDLE = 'show.example.test';
const PASSWORD = 'abcd-efgh-ijkl-mnop';
const TOKEN = 'secret-access-jwt';
const ENV = { BSKY_APP_PASSWORD: PASSWORD };
const VIDEO_BLOB = { $type: 'blob', ref: { $link: 'bafkreivideoblob' }, mimeType: 'video/mp4', size: 223761792 };
const CAPTION_BLOB = { $type: 'blob', ref: { $link: 'bafkreicaptions' }, mimeType: 'text/vtt', size: 40 };
const TEXT = 'Episode two of The Late Cluster. Ünïcødé, and ten minutes of it.';
const ALT = 'Larry Nx, a puppet host, at his desk.';
const VTT = 'WEBVTT\n\n00:00.000 --> 00:02.000\nGood evening.\n';
const PROBE = { width: 1920, height: 1080, duration: 598.4 };

/**
 * The reference shape: episode one's video post as the owner's own app created it and the server
 * accepted it (the scraper's copy; the member's link and the text cut).
 */
const REFERENCE = {
  $type: 'app.bsky.feed.post',
  createdAt: '2026-11-13T01:25:14.501Z',
  embed: {
    $type: 'app.bsky.embed.video',
    aspectRatio: { height: 1080, width: 1920 },
    presentation: 'default',
    video: { $type: 'blob', ref: { $link: 'bafkrei…' }, mimeType: 'video/mp4', size: 223761792 },
  },
  langs: ['en'],
  text: '…',
};

/** An MP4 header (an ftyp box) padded to `size` bytes; a large size makes a sparse file. */
function mp4(path, size = 4096, brand = 'isom') {
  const head = Buffer.alloc(24);
  head.writeUInt32BE(24, 0); head.write('ftyp', 4, 'latin1'); head.write(brand, 8, 'latin1');
  const fd = openSync(path, 'w');
  try { writeSync(fd, head, 0, head.length, 0); ftruncateSync(fd, size); } finally { closeSync(fd); }
}

function repo(t, { status = 'published' } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'late-cluster-bot-post-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(join(root, 'show.config.json'), JSON.stringify({ siteUrl: '', bluesky: { handle: HANDLE, did: SHOW } }));
  mkdirSync(join(root, 'episodes/002-second-night'), { recursive: true });
  if (status) {
    mkdirSync(join(root, 'dist/episodes/002-second-night'), { recursive: true });
    writeFileSync(join(root, 'dist/episodes/002-second-night/episode.json'), JSON.stringify({ id: '002-second-night', status }));
  }
  mp4(join(root, 'ep.mp4'));
  writeFileSync(join(root, 'text.txt'), `${TEXT}\n`);
  writeFileSync(join(root, 'alt.txt'), `${ALT}\n`);
  writeFileSync(join(root, 'ep.vtt'), VTT);
  return root;
}

/** A fake clock: `sleep` moves it on, so the job timeout can pass without waiting. */
function clock() {
  let t = FIXED_NOW.getTime();
  const sleeps = [];
  return { now: () => new Date(t), sleep: async (ms) => { sleeps.push(ms); t += ms; }, sleeps };
}

async function run(argv, { root, env = {}, fetch = noNetwork(), probe = async () => PROBE, time = clock(), configPath = NO_CONFIG }) {
  const stdout = capture();
  const stderr = capture();
  const code = await main(argv, { env, fetch, stdout, stderr, root, cwd: root, now: time.now, sleep: time.sleep, probe, configPath });
  return { code, out: stdout.text, err: stderr.text, fetch, time };
}

/**
 * A real video service stand-in on 127.0.0.1 (port 0), for the upload, which goes by node:http
 * and not through fetch, so a mocked fetch cannot see it. Every request is recorded with its
 * method, URL, headers, the SHA-256 and length of the body received. `respond(rec)` returns
 * [status, body]; 'stall' reads nothing and never answers. The job status and limits calls still
 * go through the fake fetch (it routes by method name, whatever the host).
 */
async function videoServer(t, respond = () => [200, { did: SHOW, jobId: 'job-1', state: 'JOB_STATE_CREATED' }]) {
  const requests = [];
  const server = createServer((req, res) => {
    const rec = { method: req.method, url: new URL(req.url, 'http://127.0.0.1'), headers: req.headers, bytes: 0, sha256: null };
    requests.push(rec);
    if (respond(rec) === 'stall') { req.pause(); return; }
    const h = createHash('sha256');
    req.on('data', (c) => { rec.bytes += c.length; h.update(c); });
    req.on('end', () => {
      rec.sha256 = h.digest('hex');
      const [status, body] = respond(rec);
      res.writeHead(status, { 'content-type': 'application/json' }).end(JSON.stringify(body));
    });
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  t.after(() => { server.closeAllConnections(); server.close(); });
  return { url: `http://127.0.0.1:${server.address().port}`, requests };
}

/** A bot.config.json in the temp repo pointing the video service at `url`. Returns its path. */
function botConfig(root, url, video = {}) {
  const path = join(root, 'bot.config.json');
  writeFileSync(path, JSON.stringify({ video: { service: url, did: 'did:web:video.bsky.app', jobTimeoutMinutes: 20, pollSeconds: 3, stallSeconds: 120, ...video } }));
  return path;
}

/** A live run with the upload served by a loopback video service. */
async function live(t, root, argv, { respond, video, ...rest } = {}) {
  const service = await videoServer(t, respond);
  const configPath = botConfig(root, service.url, video);
  const r = await run([...argv, '--live'], { root, env: ENV, configPath, ...rest });
  return { ...r, service };
}

const BASE = ['post', '2', '--video', 'ep.mp4', '--text-file', 'text.txt'];
const FULL = [...BASE, '--alt-file', 'alt.txt', '--captions', 'ep.vtt'];

function routes({ limits = { canUpload: true, remainingDailyVideos: 24, remainingDailyBytes: 10_000_000_000 }, jobs, posts = [], wrapped = true } = {}) {
  const states = jobs ?? [
    { state: 'JOB_STATE_CREATED', progress: 0 },
    { state: 'JOB_STATE_ENCODING', progress: 40 },
    { state: 'JOB_STATE_SOMETHING_NEW', progress: 60 }, // unknown: still in process, so wait
    { state: 'JOB_STATE_ENCODING', progress: 90 },
    { state: 'JOB_STATE_COMPLETED', progress: 100, blob: VIDEO_BLOB },
  ];
  let n = 0;
  return {
    'com.atproto.server.createSession': () => [200, {
      accessJwt: TOKEN, refreshJwt: 'secret-refresh', handle: HANDLE, did: SHOW,
      didDoc: { id: SHOW, service: [{ id: '#atproto_pds', type: 'AtprotoPersonalDataServer', serviceEndpoint: 'https://pds.example.test' }] },
    }],
    'com.atproto.server.getServiceAuth': (req) => [200, { token: req.url.searchParams.get('aud') === 'did:web:video.bsky.app' ? 'svc-limits-token' : 'svc-upload-token' }],
    'app.bsky.video.getUploadLimits': () => [200, limits],
    'app.bsky.video.getJobStatus': (req) => {
      const js = { jobId: req.url.searchParams.get('jobId'), did: SHOW, ...states[Math.min(n++, states.length - 1)] };
      return [200, wrapped ? { jobStatus: js } : js];
    },
    'com.atproto.repo.uploadBlob': () => [200, { blob: CAPTION_BLOB }],
    'com.atproto.repo.listRecords': () => [200, { records: posts }],
    'com.atproto.repo.createRecord': () => [200, { uri: `at://${SHOW}/app.bsky.feed.post/3lvideo`, cid: 'bafyreivideopost' }],
  };
}
const calls = (fetch) => fetch.requests.map((q) => `${q.method} ${q.nsid}`);

test('limits: text 300 graphemes and 3000 bytes, 3 langs, at and just past each edge', () => {
  assert.deepEqual(checkPostText('x'.repeat(300)), { graphemes: 300, bytes: 300 });
  assert.throws(() => checkPostText('x'.repeat(301)), /301 graphemes; Bluesky posts are limited to 300/);
  const family = '\u{1F468}‍\u{1F469}‍\u{1F467}‍\u{1F466}'; // 1 grapheme, 25 bytes
  assert.equal(checkPostText(family.repeat(120)).bytes, 3000);
  assert.throws(() => checkPostText(`${family.repeat(120)}x`), /3001 bytes; Bluesky posts are limited to 3000/);
  assert.deepEqual(checkLangs(['en', 'pt-BR', 'fr']), ['en', 'pt-BR', 'fr']);
  assert.throws(() => checkLangs(['en', 'de', 'fr', 'es']), /at most 3 --lang/);
  assert.throws(() => checkLangs(['english!']), /not a language tag/);
});

test('limits: video 300000000 bytes and 600 s; captions 20 files of 20000 bytes; aspect at least 1', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'late-cluster-bot-limits-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  mp4(join(dir, 'edge.mp4'), 300_000_000);
  mp4(join(dir, 'over.mp4'), 300_000_001);
  assert.deepEqual(checkVideoFile(join(dir, 'edge.mp4')), { size: 300_000_000 });
  assert.throws(() => checkVideoFile(join(dir, 'over.mp4')), /300000001 bytes; Bluesky videos are limited to 300000000 bytes/);
  mp4(join(dir, 'movie.mov'), 4096, 'qt  ');
  assert.throws(() => checkVideoFile(join(dir, 'movie.mov')), /is not an MP4 \(checked by its bytes/);
  writeFileSync(join(dir, 'fake.mp4'), 'not a video at all');
  assert.throws(() => checkVideoFile(join(dir, 'fake.mp4')), /is not an MP4/);

  checkDuration(600);
  assert.throws(() => checkDuration(600.5), /600\.5 s long; Bluesky videos are limited to 600 s/);

  const cue = (n) => `WEBVTT\n\n${'x'.repeat(n - 8)}`;
  writeFileSync(join(dir, 'edge.vtt'), cue(20_000));
  writeFileSync(join(dir, 'over.vtt'), cue(20_001));
  writeFileSync(join(dir, 'bom.vtt'), `﻿WEBVTT - a title\n\n`);
  writeFileSync(join(dir, 'srt.vtt'), '1\n00:00:00,000 --> 00:00:02,000\nHi\n');
  assert.equal(loadCaptions(join(dir, 'edge.vtt')).length, 20_000);
  assert.throws(() => loadCaptions(join(dir, 'over.vtt')), /20001 bytes; Bluesky caption files are limited to 20000 bytes/);
  assert.ok(loadCaptions(join(dir, 'bom.vtt')));
  assert.throws(() => loadCaptions(join(dir, 'srt.vtt')), /are not text\/vtt/);

  const aspectRatio = { width: 1, height: 1 };
  const twenty = Array.from({ length: 20 }, () => ({ lang: 'en', file: CAPTION_BLOB }));
  assert.equal(buildVideoEmbed({ video: VIDEO_BLOB, aspectRatio, captions: twenty }).captions.length, 20);
  assert.throws(() => buildVideoEmbed({ video: VIDEO_BLOB, aspectRatio, captions: [...twenty, twenty[0]] }), /at most 20 caption files/);
  assert.throws(() => buildVideoEmbed({ video: VIDEO_BLOB, aspectRatio: { width: 0, height: 1 } }), /aspectRatio\.width must be a whole number of at least 1/);
  assert.throws(() => buildVideoEmbed({ video: VIDEO_BLOB, aspectRatio: { width: 16, height: 9.5 } }), /aspectRatio\.height/);
  assert.deepEqual(parseAspect('1:1'), { width: 1, height: 1 });
  assert.deepEqual(parseAspect('1920x1080'), { width: 1920, height: 1080 });
  assert.throws(() => parseAspect('0:9'), /at least 1/);
  assert.throws(() => parseAspect('16/9'), /--aspect must be/);
});

test('the embed matches the reference record: presentation default, the blob untouched, the file\'s own size', () => {
  const embed = buildVideoEmbed({ video: REFERENCE.embed.video, aspectRatio: { width: 1920, height: 1080 } });
  assert.deepEqual(embed, REFERENCE.embed);
  assert.equal(embed.video, REFERENCE.embed.video, 'the job\'s blob object is passed through, not rebuilt');
  const ours = buildVideoEmbed({ video: VIDEO_BLOB, aspectRatio: { width: 1920, height: 1080 }, captions: [{ lang: 'en', file: CAPTION_BLOB }], alt: ALT });
  const { captions, alt, ...rest } = ours;
  assert.deepEqual(Object.keys(rest).sort(), Object.keys(REFERENCE.embed).sort());
  assert.deepEqual(captions, [{ lang: 'en', file: CAPTION_BLOB }]);
  assert.equal(alt, ALT);
});

test('dry run: checks everything, prints the record with placeholders, and makes no request', async (t) => {
  const root = repo(t);
  const r = await run(FULL, { root });
  assert.equal(r.code, 0, r.err);
  assert.equal(r.fetch.calls.length, 0);
  assert.equal(r.err, '');
  assert.match(r.out, /^DRY RUN: nothing was sent\. Add --live to post\./);
  assert.match(r.out, /Episode: {2}002-second-night \(published\)/);
  assert.match(r.out, /Video: {4}ep\.mp4: MP4, 4096 bytes \(limit 300000000\)/);
  assert.match(r.out, /ffprobe: 1920x1080, 598\.4 s \(limit 600\)/);
  assert.match(r.out, /sha256 [0-9a-f]{64}; not uploaded yet/);
  assert.match(r.out, /Captions: ep\.vtt: WebVTT, \d+ bytes \(limit 20000\), lang en/);
  assert.match(r.out, /Text: {5}\d+\/300 graphemes, \d+\/3000 bytes; no mention, no link/);
  assert.ok(r.out.includes(`  | ${TEXT}`));
  assert.ok(r.out.includes(`  | ${ALT}`));
  assert.match(r.out, /getUploadLimits on https:\/\/video\.bsky\.app; stop unless canUpload/);
  const record = JSON.parse(r.out.slice(r.out.indexOf('\n{') + 1));
  assert.deepEqual(record, {
    $type: 'app.bsky.feed.post',
    createdAt: FIXED_NOW.toISOString(),
    embed: {
      $type: 'app.bsky.embed.video',
      aspectRatio: { height: 1080, width: 1920 },
      presentation: 'default',
      video: { $type: 'blob', ref: { $link: '<cid returned by the video job>' }, mimeType: 'video/mp4', size: 4096 },
      captions: [{ lang: 'en', file: { $type: 'blob', ref: { $link: '<cid returned by uploadBlob>' }, mimeType: 'text/vtt', size: VTT.length } }],
      alt: ALT,
    },
    langs: ['en'],
    text: TEXT,
  });
  assert.equal(existsSync(join(root, 'data')), false);
});

test('refused before any request: a mention, a link, a bad or long video, no ffprobe without --aspect, empty alt, bad captions', async (t) => {
  const root = repo(t);
  writeFileSync(join(root, 'mention.txt'), 'With @guest.example.test tonight');
  writeFileSync(join(root, 'link.txt'), 'Watch at https://example.test/ep2');
  writeFileSync(join(root, 'empty.txt'), '\n\n');
  writeFileSync(join(root, 'long.txt'), 'x'.repeat(301));
  writeFileSync(join(root, 'bad.vtt'), 'not captions');
  writeFileSync(join(root, 'fake.mp4'), 'nope');
  for (const [argv, re, probe] of [
    [['post', '2', '--video', 'ep.mp4', '--text-file', 'mention.txt'], /contains "@guest\.example\.test", which reads as a mention\. A post never mentions anyone; the tagged reply \(reply --episode\) is the only place/],
    [['post', '2', '--video', 'ep.mp4', '--text-file', 'link.txt'], /reads as a link/],
    [['post', '2', '--video', 'ep.mp4', '--text-file', 'long.txt'], /301 graphemes/],
    [['post', '2', '--video', 'fake.mp4', '--text-file', 'text.txt'], /is not an MP4/],
    [['post', '2', '--video', 'missing.mp4', '--text-file', 'text.txt'], /does not exist/],
    [BASE, /the video is 601 s long; Bluesky videos are limited to 600 s/, async () => ({ ...PROBE, duration: 601 })],
    [BASE, /ffprobe is not on the PATH, so the video's size cannot be read: give --aspect/, async () => null],
    [[...BASE, '--alt-file', 'empty.txt'], /alt text file empty\.txt is empty/],
    [[...BASE, '--captions', 'bad.vtt'], /are not text\/vtt/],
    [[...BASE, '--lang', 'en', '--lang', 'de', '--lang', 'fr', '--lang', 'es'], /at most 3 --lang/],
  ]) {
    for (const live of [false, true]) {
      const fetch = fakePds(routes());
      const r = await run([...argv, ...(live ? ['--live'] : [])], { root, env: ENV, fetch, probe });
      assert.equal(r.code, 1, `${argv.join(' ')} live=${live}: ${r.err}`);
      assert.match(r.err, re);
      assert.equal(fetch.requests.length, 0);
    }
  }
  assert.equal((await run(['post', '2', '--video', 'ep.mp4', '--text-file', 'text.txt', '--mention', 'x'], { root })).code, 2);
  assert.equal((await run(['post', '2', '--video', 'ep.mp4'], { root })).code, 2, '--text-file is required to post');
  assert.equal((await run([...BASE, '--upload-only'], { root })).code, 2, '--upload-only goes with --live');
});

test('without ffprobe, --aspect is used and the unchecked duration is a warning; a draft episode is a warning', async (t) => {
  const root = repo(t, { status: 'draft' });
  const r = await run([...BASE, '--aspect', '1920:1080'], { root, probe: async () => null });
  assert.equal(r.code, 0, r.err);
  assert.match(r.err, /warning: ffprobe is not on the PATH, so the video's duration was not checked/);
  assert.match(r.err, /warning: episode 002-second-night is "draft", not published/);
  assert.match(r.out, /aspect from --aspect: 1920:1080; duration not checked \(no ffprobe\)/);
});

/** A few MB of random bytes behind an MP4 header, so the upload spans many chunks. */
function bigVideo(root, mb = 3) {
  const head = Buffer.alloc(24);
  head.writeUInt32BE(24, 0); head.write('ftyp', 4, 'latin1'); head.write('isom', 8, 'latin1');
  const bytes = Buffer.concat([head, randomBytes(mb * 1024 * 1024)]);
  writeFileSync(join(root, 'big.mp4'), bytes);
  return { size: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') };
}
const BIG = ['post', '2', '--video', 'big.mp4', '--text-file', 'text.txt'];

test('upload on a real loopback server: Content-Length and no chunking, the type, the Bearer token, did and name, and every byte', async (t) => {
  const root = repo(t);
  const file = bigVideo(root);
  const fetch = fakePds(routes());
  const r = await live(t, root, BIG, { fetch });
  assert.equal(r.code, 0, r.err);
  const [up] = r.service.requests;
  assert.equal(r.service.requests.length, 1);
  assert.equal(up.method, 'POST');
  assert.equal(up.url.pathname, '/xrpc/app.bsky.video.uploadVideo');
  assert.equal(up.url.searchParams.get('did'), SHOW);
  assert.equal(up.url.searchParams.get('name'), 'big.mp4');
  assert.equal(up.headers['content-length'], String(file.size));
  assert.equal(up.headers['transfer-encoding'], undefined, 'not chunked');
  assert.equal(up.headers['content-type'], 'video/mp4');
  assert.equal(up.headers.authorization, 'Bearer svc-upload-token', 'the service token, never the session token');
  assert.equal(up.headers['user-agent'], 'episode-announcer/0.1', 'the generic user agent');
  assert.equal(up.bytes, file.size);
  assert.equal(up.sha256, file.sha256, 'the server received the file exactly');
  const progress = r.out.match(/ {2}sent \d+ of \d+ bytes \(\d+%\)/g) ?? [];
  assert.ok(progress.length >= 9 && progress.length <= 11, `about every 10 percent: ${progress.length} lines`);
  assert.match(progress.at(-1), /\(100%\)/);
  for (const s of [PASSWORD, TOKEN, 'svc-upload-token', 'svc-limits-token']) assert.ok(!r.out.includes(s) && !r.err.includes(s), `leaks ${s}`);
});

test('a top-level upload answer is polled by its jobId; a wrapped one works too, and so does a top-level poll answer', async (t) => {
  for (const [answer, wrapped] of [
    [{ did: SHOW, jobId: 'abc', state: 'JOB_STATE_CREATED' }, true],
    [{ jobStatus: { did: SHOW, jobId: 'abc', state: 'JOB_STATE_CREATED' } }, true],
    [{ did: SHOW, jobId: 'abc', state: 'JOB_STATE_CREATED' }, false],
  ]) {
    const root = repo(t);
    const fetch = fakePds(routes({ wrapped }));
    const r = await live(t, root, BASE, { fetch, respond: () => [200, answer] });
    assert.equal(r.code, 0, r.err);
    const polls = fetch.requests.filter((q) => q.nsid === 'app.bsky.video.getJobStatus');
    assert.ok(polls.length > 0);
    for (const q of polls) assert.equal(q.url.searchParams.get('jobId'), 'abc');
    assert.deepEqual(fetch.requests.at(-1).body.record.embed.video, VIDEO_BLOB);
  }
});

test('409 already_exists: with a blob it is used without polling; with a jobId and no blob it is polled', async (t) => {
  let root = repo(t);
  let fetch = fakePds(routes());
  let r = await live(t, root, BASE, { fetch, respond: () => [409, { did: SHOW, error: 'already_exists', jobId: 'job-0', state: 'JOB_STATE_COMPLETED', blob: VIDEO_BLOB }] });
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /processed this video before \(already_exists\)/);
  assert.ok(!calls(fetch).includes('GET app.bsky.video.getJobStatus'));
  assert.deepEqual(fetch.requests.at(-1).body.record.embed.video, VIDEO_BLOB);

  root = repo(t);
  fetch = fakePds(routes());
  r = await live(t, root, BASE, { fetch, respond: () => [409, { did: SHOW, error: 'already_exists', jobId: 'job-0', state: 'JOB_STATE_ENCODING' }] });
  assert.equal(r.code, 0, r.err);
  const polls = fetch.requests.filter((q) => q.nsid === 'app.bsky.video.getJobStatus');
  assert.ok(polls.length > 0);
  for (const q of polls) assert.equal(q.url.searchParams.get('jobId'), 'job-0');
  assert.ok(calls(fetch).includes('POST com.atproto.repo.createRecord'));
});

test('the three error bodies observed from the real service, verbatim, each refuse by name and post nothing', async (t) => {
  // POST uploadVideo with no token, 21 November 2026:
  let root = repo(t);
  let fetch = fakePds(routes());
  let r = await live(t, root, BASE, { fetch, respond: () => [401, { did: '', error: 'missing token', jobId: '', state: '' }] });
  assert.equal(r.code, 1);
  assert.match(r.err, /the upload failed: app\.bsky\.video\.uploadVideo failed: HTTP 401 missing token\. Nothing was posted\./);
  assert.ok(!calls(fetch).includes('GET app.bsky.video.getJobStatus'), 'an empty jobId is no job');
  assert.ok(!calls(fetch).includes('POST com.atproto.repo.createRecord'));

  // GET getJobStatus for an unknown job:
  root = repo(t);
  const r0 = routes();
  r0['app.bsky.video.getJobStatus'] = () => [400, { did: '', error: 'invalid jobId', jobId: '', state: '' }];
  fetch = fakePds(r0);
  r = await live(t, root, BASE, { fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /asking for job job-1 failed: app\.bsky\.video\.getJobStatus failed: HTTP 400 invalid jobId\. The job is forgotten, so the next run uploads again\. Nothing was posted\./);
  assert.ok(!calls(fetch).includes('POST com.atproto.repo.createRecord'));
  assert.deepEqual(readdir(join(root, 'data/bot/video-uploads')), [], 'the unknown job is not kept');

  // GET getUploadLimits with no token:
  root = repo(t);
  const r1 = routes();
  r1['app.bsky.video.getUploadLimits'] = () => [401, { canUpload: false, error: 'missing_token' }];
  fetch = fakePds(r1);
  r = await live(t, root, BASE, { fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /asking the video service for the upload limits failed: app\.bsky\.video\.getUploadLimits failed: HTTP 401 missing_token\. Nothing was uploaded or posted\./);
  assert.equal(r.service.requests.length, 0, 'no upload');

  // And a 200 answer carrying only an error, with an empty jobId:
  root = repo(t);
  fetch = fakePds(routes());
  r = await live(t, root, BASE, { fetch, respond: () => [200, { did: '', error: 'missing token', jobId: '', state: '' }] });
  assert.equal(r.code, 1);
  assert.match(r.err, /answered with neither a job nor a blob \(error: missing token\)\. Nothing was posted\./);
});

test('a server that stops reading: the stall limit fires, says how many bytes were sent, and posts nothing', { timeout: 15_000 }, async (t) => {
  const root = repo(t);
  mp4(join(root, 'huge.mp4'), 64 * 1024 * 1024); // sparse: more than any socket buffer holds
  const fetch = fakePds(routes());
  const started = Date.now();
  const r = await live(t, root, ['post', '2', '--video', 'huge.mp4', '--text-file', 'text.txt'], { fetch, respond: () => 'stall', video: { stallSeconds: 0.2 } });
  assert.equal(r.code, 1);
  const m = r.err.match(/the upload failed: the upload stalled: nothing was written for 0\.2 s, after (\d+) of 67108864 bytes had been sent\. Nothing was posted\./);
  assert.ok(m, r.err);
  assert.ok(Number(m[1]) < 67108864);
  assert.ok(Date.now() - started < 5000, 'the stall limit is the injected one');
  assert.ok(!calls(fetch).includes('POST com.atproto.repo.createRecord'));
  assert.ok(!r.err.includes('svc-upload-token'));
});

test('live: limits, the upload, the job polled through every state, captions, then the post', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes());
  const r = await live(t, root, FULL, { fetch });
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(calls(fetch), [
    'POST com.atproto.server.createSession',
    'GET com.atproto.server.getServiceAuth',
    'GET app.bsky.video.getUploadLimits',
    'GET com.atproto.server.getServiceAuth',
    ...Array(5).fill('GET app.bsky.video.getJobStatus'),
    'POST com.atproto.repo.uploadBlob',
    'GET com.atproto.repo.listRecords',
    'POST com.atproto.repo.createRecord',
  ]);
  assert.equal(r.service.requests.length, 1, 'the upload went to the video service, by node:http');
  assert.equal(r.service.requests[0].bytes, 4096);
  const [, auth1, limits, auth2] = fetch.requests;
  assert.equal(auth1.url.origin, 'https://pds.example.test');
  assert.equal(auth1.url.searchParams.get('aud'), 'did:web:video.bsky.app');
  assert.equal(auth1.url.searchParams.get('lxm'), 'app.bsky.video.getUploadLimits');
  assert.equal(limits.url.origin, r.service.url);
  assert.equal(limits.headers.authorization, 'Bearer svc-limits-token');
  assert.equal(auth2.url.searchParams.get('aud'), 'did:web:pds.example.test');
  assert.equal(auth2.url.searchParams.get('lxm'), 'com.atproto.repo.uploadBlob');
  assert.equal(auth2.url.searchParams.get('exp'), String(Math.floor(FIXED_NOW.getTime() / 1000) + 1800));
  for (const q of fetch.requests.filter((x) => x.nsid === 'app.bsky.video.getJobStatus')) {
    assert.equal(q.url.searchParams.get('jobId'), 'job-1');
    assert.equal(q.headers.authorization, undefined);
  }
  assert.equal(r.time.sleeps.length, 4);
  assert.match(r.out, /job job-1: JOB_STATE_CREATED 0%\n {2}job job-1: JOB_STATE_ENCODING 40%\n {2}job job-1: JOB_STATE_SOMETHING_NEW 60%/);
  assert.match(r.out, /Upload limits: 24 videos and 10000000000 bytes left today/);

  const caption = fetch.requests.find((q) => q.nsid === 'com.atproto.repo.uploadBlob');
  assert.equal(caption.headers['content-type'], 'text/vtt');
  assert.deepEqual(fetch.requests.at(-1).body, {
    repo: SHOW,
    collection: 'app.bsky.feed.post',
    record: {
      $type: 'app.bsky.feed.post',
      createdAt: new Date(FIXED_NOW.getTime() + 4 * 3000).toISOString(),
      embed: {
        $type: 'app.bsky.embed.video', aspectRatio: { height: 1080, width: 1920 }, presentation: 'default',
        video: VIDEO_BLOB, captions: [{ lang: 'en', file: CAPTION_BLOB }], alt: ALT,
      },
      langs: ['en'],
      text: TEXT,
    },
  });
  assert.match(r.out, /Posted at:\/\/did:plc:showpost\/app\.bsky\.feed\.post\/3lvideo\n {2}https:\/\/bsky\.app\/profile\/show\.example\.test\/post\/3lvideo/);
  const [line] = readFileSync(join(root, 'data/bot/posts.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  assert.equal(line.episode, '002-second-night');
  assert.equal(line.uri, `at://${SHOW}/app.bsky.feed.post/3lvideo`);
  assert.equal(line.video.blob, 'bafkreivideoblob');
  for (const s of [PASSWORD, TOKEN, 'svc-upload-token', 'svc-limits-token']) assert.ok(!r.out.includes(s) && !r.err.includes(s), `leaks ${s}`);
});

test('live: canUpload false stops before the upload, and nothing is posted', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes({ limits: { canUpload: false, remainingDailyVideos: 0, remainingDailyBytes: 0, message: 'daily limit reached' } }));
  const r = await live(t, root, BASE, { fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /cannot upload now: daily limit reached\. \(It needs a verified email, and videos have a daily limit\.\) Nothing was posted\./);
  assert.match(r.out, /0 videos and 0 bytes left today/);
  assert.equal(r.service.requests.length, 0);
  assert.ok(!calls(fetch).includes('POST com.atproto.repo.createRecord'));
});

test('live: a failed upload ends with the reason and no post', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes());
  const r = await live(t, root, BASE, { fetch, respond: () => [500, { error: 'InternalServerError', message: 'upload broke' }] });
  assert.equal(r.code, 1);
  assert.match(r.err, /the upload failed: .*HTTP 500 InternalServerError: upload broke\. Nothing was posted\./);
  assert.ok(!calls(fetch).includes('POST com.atproto.repo.createRecord'));
});

test('live: a failed job ends with its code and no post, and is not kept for reuse', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes({ jobs: [{ state: 'JOB_STATE_ENCODING', progress: 10 }, { state: 'JOB_STATE_FAILED', failureCode: 'encoding_failure', error: 'bad stream' }] }));
  const r = await live(t, root, BASE, { fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /the video service failed job job-1: encoding_failure: bad stream\. Nothing was posted\./);
  assert.ok(!calls(fetch).includes('POST com.atproto.repo.createRecord'));
  const dir = join(root, 'data/bot/video-uploads');
  assert.deepEqual(existsSync(dir) ? readdir(dir) : [], [], 'the failed job is not stored');
});

test('live: --upload-only uploads and waits but posts nothing; a later post reuses the stored blob', async (t) => {
  const root = repo(t);
  let fetch = fakePds(routes());
  let r = await live(t, root, ['post', '2', '--video', 'ep.mp4', '--upload-only'], { fetch });
  assert.equal(r.code, 0, r.err);
  assert.equal(r.service.requests.length, 1);
  assert.ok(!calls(fetch).includes('POST com.atproto.repo.createRecord'));
  const files = readdir(join(root, 'data/bot/video-uploads'));
  assert.equal(files.length, 1);
  assert.match(files[0], /^[0-9a-f]{64}\.json$/);
  const saved = JSON.parse(readFileSync(join(root, 'data/bot/video-uploads', files[0]), 'utf8'));
  assert.deepEqual(saved.blob, VIDEO_BLOB);
  assert.equal(saved.jobId, 'job-1');
  assert.match(r.out, /--upload-only: no post was created/);

  const dry = await run(BASE, { root });
  assert.match(dry.out, /stored in data\/bot\/video-uploads\/[0-9a-f]{64}\.json \(blob bafkreivideoblob\): it will be reused/);
  assert.match(dry.out, /reuse the stored video blob \(no limits check, no upload\)/);

  fetch = fakePds(routes());
  r = await live(t, root, BASE, { fetch });
  assert.equal(r.code, 0, r.err);
  assert.equal(r.service.requests.length, 0, 'not uploaded again');
  assert.deepEqual(calls(fetch), ['POST com.atproto.server.createSession', 'GET com.atproto.repo.listRecords', 'POST com.atproto.repo.createRecord']);
  assert.deepEqual(fetch.requests.at(-1).body.record.embed.video, VIDEO_BLOB);
  assert.match(r.out, /Reusing the upload stored in .*Not uploading again\./);
});

test('live: the job timeout stops with the job id, and the next run picks the job up', async (t) => {
  const root = repo(t);
  let fetch = fakePds(routes({ jobs: [{ state: 'JOB_STATE_ENCODING', progress: 50 }] }));
  let r = await live(t, root, BASE, { fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /stopped waiting after 20 minutes; job job-1 is still JOB_STATE_ENCODING\. It is saved in data\/bot\/video-uploads\/[0-9a-f]{64}\.json: run the same command again to pick it up\. Nothing was posted\./);
  assert.ok(!calls(fetch).includes('POST com.atproto.repo.createRecord'));
  assert.equal(r.time.sleeps.reduce((a, b) => a + b, 0), 20 * 60_000);
  assert.equal((r.out.match(/job job-1:/g) ?? []).length, 1, 'an unchanged state is printed once');

  fetch = fakePds(routes({ jobs: [{ state: 'JOB_STATE_COMPLETED', progress: 100, blob: VIDEO_BLOB }] }));
  r = await live(t, root, BASE, { fetch });
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /Picking up job job-1/);
  assert.equal(r.service.requests.length, 0);
  assert.ok(!calls(fetch).includes('GET app.bsky.video.getUploadLimits'));
  assert.ok(calls(fetch).includes('POST com.atproto.repo.createRecord'));
});

test('live: a post that already carries this video is not posted again; the wrong account is refused', async (t) => {
  const root = repo(t);
  let fetch = fakePds(routes({ posts: [{ uri: `at://${SHOW}/app.bsky.feed.post/3lold`, value: { embed: { $type: 'app.bsky.embed.video', video: VIDEO_BLOB } } }] }));
  let r = await live(t, root, BASE, { fetch, respond: () => [409, { error: 'already_exists', jobId: 'job-0', blob: VIDEO_BLOB }] });
  assert.equal(r.code, 1);
  assert.match(r.err, /already posted: at:\/\/did:plc:showpost\/app\.bsky\.feed\.post\/3lold carries this video/);
  assert.ok(!calls(fetch).includes('POST com.atproto.repo.createRecord'));

  const r0 = routes();
  r0['com.atproto.server.createSession'] = () => [200, { accessJwt: TOKEN, handle: HANDLE, did: 'did:plc:someoneelse' }];
  fetch = fakePds(r0);
  r = await live(t, root, BASE, { fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /refusing: logged in as did:plc:someoneelse/);
  assert.deepEqual(calls(fetch), ['POST com.atproto.server.createSession']);
  assert.equal(r.service.requests.length, 0);
});
