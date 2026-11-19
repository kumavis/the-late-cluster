import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { main } from '../src/cli.mjs';
import { imageDimensions, sniffImageType } from '../src/image.mjs';
import { capture, FIXED_NOW, FIXTURE_THUMB, fakePds, jpegBytes, NO_CONFIG, noNetwork, pngBytes } from './helpers.mjs';

const DID = 'did:plc:showprofile';
const HANDLE = 'show.example.test';
const PASSWORD = 'abcd-efgh-ijkl-mnop';
const TOKEN = 'secret-access-jwt';
const REFRESH = 'secret-refresh-jwt';
const ENV = { BSKY_APP_PASSWORD: PASSWORD };
const RECORD_CID = 'bafyreiprofilerecord';
const OLD_AVATAR = 'bafkreioldavatar';
const NEW_AVATAR = 'bafkreinewavatar';
const OLD_BYTES = jpegBytes(500, 500);

/** A throwaway repo root: show.config.json with the account, and brand/avatar.png. */
function repo(t, { avatar = pngBytes(512, 512), did = DID } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'late-cluster-bot-profile-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(join(root, 'show.config.json'), JSON.stringify({ siteUrl: '', bluesky: { handle: HANDLE, did } }));
  mkdirSync(join(root, 'brand'));
  if (avatar) writeFileSync(join(root, 'brand/avatar.png'), avatar);
  return root;
}

async function run(argv, { root, env = {}, fetch = noNetwork() }) {
  const stdout = capture();
  const stderr = capture();
  const code = await main(argv, { env, fetch, stdout, stderr, root, cwd: root, now: () => FIXED_NOW, configPath: NO_CONFIG });
  return { code, out: stdout.text, err: stderr.text, fetch };
}

function existingProfile() {
  return {
    $type: 'app.bsky.actor.profile',
    displayName: 'The Late Cluster',
    description: 'An automated comedy show. Ünïcødé 🎙️',
    avatar: { $type: 'blob', ref: { $link: OLD_AVATAR }, mimeType: 'image/jpeg', size: OLD_BYTES.length },
    banner: { $type: 'blob', ref: { $link: 'bafkreibanner' }, mimeType: 'image/png', size: 1234 },
    labels: { $type: 'com.atproto.label.defs#selfLabels', values: [{ val: 'bot' }] },
    pinnedPost: { uri: 'at://did:plc:showprofile/app.bsky.feed.post/3kpin', cid: 'bafyreipin' },
    joinedViaStarterPack: { uri: 'at://did:plc:x/app.bsky.graph.starterpack/3ksp', cid: 'bafyreisp' },
    createdAt: '2026-11-01T00:00:00.000Z',
    'tv.simcluster.unknownField': { nested: [1, 2, 3] },
  };
}

function routes({ record = existingProfile(), did = DID, uploadCid = NEW_AVATAR, blob = () => new Response(OLD_BYTES, { status: 200, headers: { 'content-type': 'image/jpeg' } }), root } = {}) {
  return {
    'com.atproto.server.createSession': () => [200, { accessJwt: TOKEN, refreshJwt: REFRESH, handle: HANDLE, did }],
    'com.atproto.repo.getRecord': () => record
      ? [200, { uri: `at://${did}/app.bsky.actor.profile/self`, cid: RECORD_CID, value: record }]
      : [400, { error: 'RecordNotFound', message: 'Could not locate record' }],
    'com.atproto.repo.uploadBlob': (req) => [200, { blob: { $type: 'blob', ref: { $link: uploadCid }, mimeType: req.headers['content-type'], size: req.body.length } }],
    'com.atproto.sync.getBlob': blob,
    'com.atproto.repo.putRecord': (req) => {
      if (root) req.backupsAtWrite = existsSync(join(root, 'data/bot')) ? readdirSync(join(root, 'data/bot')) : [];
      return [200, { uri: `at://${did}/app.bsky.actor.profile/self`, cid: 'bafyreinewrecord' }];
    },
  };
}

const calls = (fetch) => fetch.requests.map((q) => `${q.method} ${q.nsid}`);

test('the image parser reads PNG and JPEG sizes from their bytes', () => {
  assert.equal(sniffImageType(pngBytes(1, 1)), 'image/png');
  assert.deepEqual(imageDimensions(pngBytes(800, 600)), { width: 800, height: 600 });
  assert.deepEqual(imageDimensions(jpegBytes(640, 480)), { width: 640, height: 480 });
  const real = readFileSync(FIXTURE_THUMB);
  assert.equal(sniffImageType(real), 'image/jpeg');
  const size = imageDimensions(real);
  assert.ok(size && size.width > 0 && size.height > 0, 'reads the committed fixture JPEG');
  assert.equal(sniffImageType(Buffer.from('GIF89a')), null);
});

test('dry run is the default: validates, prints the plan, and makes no request at all', async (t) => {
  const root = repo(t);
  const r = await run(['profile'], { root, env: ENV });
  assert.equal(r.code, 0, r.err);
  assert.equal(r.fetch.calls.length, 0);
  assert.match(r.out, /^DRY RUN: nothing was sent\. Add --live to change the profile\./);
  assert.match(r.out, /Avatar: {2}brand\/avatar\.png \(avatar in bot\.config\.json\)/);
  assert.match(r.out, /Type: {4}image\/png/);
  assert.match(r.out, /Size: {4}64 bytes \(limit 1000000\)/);
  assert.match(r.out, /Pixels: {2}512x512/);
  assert.match(r.out, /Account: @show\.example\.test \(did:plc:showprofile\) on https:\/\/bsky\.social/);
  assert.match(r.out, /getBlob for the current avatar and save it to data\/bot\/avatar-previous-<cid>\.<ext>/);
  assert.equal(r.err, '');
  assert.ok(!r.out.includes(PASSWORD));
});

test('dry run with --avatar and --no-backup; warnings for non-square and small pictures', async (t) => {
  const root = repo(t, { avatar: null });
  writeFileSync(join(root, 'small.jpg'), jpegBytes(300, 200));
  const r = await run(['profile', '--avatar', 'small.jpg', '--no-backup'], { root });
  assert.equal(r.code, 0, r.err);
  assert.equal(r.fetch.calls.length, 0);
  assert.match(r.out, /Avatar: {2}small\.jpg\n/);
  assert.match(r.out, /Type: {4}image\/jpeg/);
  assert.match(r.out, /Pixels: {2}300x200/);
  assert.match(r.out, /--no-backup: do not save the current avatar/);
  assert.match(r.err, /warning: the picture is 300x200, not square/);
  assert.match(r.err, /warning: the picture is under 400 px on a side/);
});

test('refuses a missing, oversize, wrong-type or fake file, in both modes, before any request', async (t) => {
  const root = repo(t, { avatar: null });
  const big = pngBytes(1000, 1000, 1_000_001);
  writeFileSync(join(root, 'big.png'), big);
  writeFileSync(join(root, 'fake.png'), 'this is not a picture at all');
  writeFileSync(join(root, 'anim.gif'), Buffer.from('GIF89a\x01\x00\x01\x00', 'latin1'));
  const broken = pngBytes(10, 10); broken.write('XXXX', 12, 'latin1');
  writeFileSync(join(root, 'broken.png'), broken);
  writeFileSync(join(root, 'exact.png'), pngBytes(1000, 1000, 1_000_000));
  for (const live of [false, true]) {
    const extra = live ? ['--live'] : [];
    for (const [file, re] of [
      [undefined, /avatar .*brand\/avatar\.png does not exist/],
      ['big.png', /is 1000001 bytes; Bluesky avatars are limited to 1000000 bytes/],
      ['fake.png', /is not a PNG or JPEG image \(checked by its bytes, not its name\)/],
      ['anim.gif', /is not a PNG or JPEG image/],
      ['broken.png', /header cannot be read/],
    ]) {
      const fetch = fakePds(routes());
      const r = await run(['profile', ...(file ? ['--avatar', file] : []), ...extra], { root, env: ENV, fetch });
      assert.equal(r.code, 1, `${file} live=${live}`);
      assert.match(r.err, re);
      assert.equal(fetch.requests.length, 0);
    }
  }
  const ok = await run(['profile', '--avatar', 'exact.png'], { root });
  assert.equal(ok.code, 0, 'exactly 1,000,000 bytes is allowed');
});

test('live: keeps every other field, including an unknown one, and sends swapRecord', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes({ root }));
  const r = await run(['profile', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(calls(fetch), [
    'POST com.atproto.server.createSession',
    'GET com.atproto.repo.getRecord',
    'POST com.atproto.repo.uploadBlob',
    'GET com.atproto.sync.getBlob',
    'POST com.atproto.repo.putRecord',
  ]);
  const [session, get, upload, getBlob, put] = fetch.requests;
  assert.deepEqual(session.body, { identifier: HANDLE, password: PASSWORD });
  assert.equal(get.url.searchParams.get('repo'), DID);
  assert.equal(get.url.searchParams.get('collection'), 'app.bsky.actor.profile');
  assert.equal(get.url.searchParams.get('rkey'), 'self');
  assert.equal(upload.headers['content-type'], 'image/png');
  assert.ok(Buffer.from(upload.body).equals(readFileSync(join(root, 'brand/avatar.png'))));
  assert.equal(getBlob.url.searchParams.get('did'), DID);
  assert.equal(getBlob.url.searchParams.get('cid'), OLD_AVATAR);
  assert.equal(getBlob.headers.authorization, undefined, 'the token is not sent to the public blob endpoint');

  assert.equal(put.headers.authorization, `Bearer ${TOKEN}`);
  assert.equal(put.body.repo, DID);
  assert.equal(put.body.collection, 'app.bsky.actor.profile');
  assert.equal(put.body.rkey, 'self');
  assert.equal(put.body.swapRecord, RECORD_CID);
  const { avatar, ...rest } = put.body.record;
  const { avatar: _old, ...restBefore } = existingProfile();
  assert.deepEqual(rest, restBefore, 'every other field is exactly as it was');
  assert.deepEqual(avatar, { $type: 'blob', ref: { $link: NEW_AVATAR }, mimeType: 'image/png', size: 64 });

  assert.match(r.out, /previous avatar: bafkreioldavatar/);
  assert.match(r.out, /new avatar: {6}bafkreinewavatar/);
  assert.match(r.out, /backup: {10}data\/bot\/avatar-previous-bafkreioldavatar\.jpg \(\d+ bytes\)/);
  for (const secret of [PASSWORD, TOKEN, REFRESH]) {
    assert.ok(!r.out.includes(secret) && !r.err.includes(secret), `output leaks ${secret}`);
  }
});

test('live: the backup is written before the write, with the replaced picture', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes({ root }));
  const r = await run(['profile', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  const put = fetch.requests.at(-1);
  assert.deepEqual(put.backupsAtWrite, ['avatar-previous-bafkreioldavatar.jpg']);
  assert.ok(readFileSync(join(root, 'data/bot/avatar-previous-bafkreioldavatar.jpg')).equals(OLD_BYTES));
});

test('live: a failed backup stops before the write and names --no-backup', async (t) => {
  for (const blob of [
    () => new Response(JSON.stringify({ error: 'BlobNotFound', message: 'Blob not found' }), { status: 400, headers: { 'content-type': 'application/json' } }),
    () => new Response(new Uint8Array(0), { status: 200 }),
  ]) {
    const root = repo(t);
    const fetch = fakePds(routes({ root, blob }));
    const r = await run(['profile', '--live'], { root, env: ENV, fetch });
    assert.equal(r.code, 1);
    assert.match(r.err, /could not back up the current avatar bafkreioldavatar: .*Nothing was written\. --no-backup skips the backup\./);
    assert.ok(!calls(fetch).includes('POST com.atproto.repo.putRecord'));
  }
});

test('live: --no-backup skips fetching and saving the old picture', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes({ root }));
  const r = await run(['profile', '--live', '--no-backup'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.ok(!calls(fetch).includes('GET com.atproto.sync.getBlob'));
  assert.equal(existsSync(join(root, 'data/bot')), false);
  assert.match(r.out, /backup: {10}skipped \(--no-backup\)/);
});

test('live: no profile record yet creates one, with swapRecord null and nothing to back up', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes({ record: null, root }));
  const r = await run(['profile', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.ok(!calls(fetch).includes('GET com.atproto.sync.getBlob'));
  const put = fetch.requests.at(-1);
  assert.equal(put.nsid, 'com.atproto.repo.putRecord');
  assert.ok('swapRecord' in put.body);
  assert.equal(put.body.swapRecord, null);
  assert.deepEqual(put.body.record, {
    $type: 'app.bsky.actor.profile',
    avatar: { $type: 'blob', ref: { $link: NEW_AVATAR }, mimeType: 'image/png', size: 64 },
    createdAt: FIXED_NOW.toISOString(),
  });
  assert.match(r.out, /No profile record yet/);
  assert.match(r.out, /previous avatar: none/);
  assert.match(r.out, /backup: {10}none \(no previous avatar\)/);
});

test('live: a profile with no avatar keeps its fields and backs up nothing', async (t) => {
  const root = repo(t);
  const { avatar: _a, ...noAvatar } = existingProfile();
  const fetch = fakePds(routes({ record: noAvatar, root }));
  const r = await run(['profile', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.ok(!calls(fetch).includes('GET com.atproto.sync.getBlob'));
  const { avatar, ...rest } = fetch.requests.at(-1).body.record;
  assert.deepEqual(rest, noAvatar);
  assert.equal(avatar.ref.$link, NEW_AVATAR);
});

test('live: the same picture is a no-op', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes({ uploadCid: OLD_AVATAR, root }));
  const r = await run(['profile', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(calls(fetch), [
    'POST com.atproto.server.createSession',
    'GET com.atproto.repo.getRecord',
    'POST com.atproto.repo.uploadBlob',
  ]);
  assert.match(r.out, /already the avatar\. Nothing was written\./);
  assert.equal(existsSync(join(root, 'data/bot')), false);
});

test('live: a DID mismatch refuses before any read, upload or write', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes({ did: 'did:plc:someoneelse' }));
  const r = await run(['profile', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /refusing to change the profile: logged in as did:plc:someoneelse, but bluesky\.did in show\.config\.json is did:plc:showprofile/);
  assert.deepEqual(calls(fetch), ['POST com.atproto.server.createSession']);
});

test('live: a concurrent change (InvalidSwap) is refused, not overwritten', async (t) => {
  const root = repo(t);
  const r0 = routes({ root });
  r0['com.atproto.repo.putRecord'] = () => [400, { error: 'InvalidSwap', message: 'Record was at bafyreisomethingelse' }];
  const fetch = fakePds(r0);
  const r = await run(['profile', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /the profile changed since it was read \(bafyreiprofilerecord\), so nothing was overwritten/);
});

test('live: other getRecord failures stop the run; a record without a CID is refused', async (t) => {
  const root = repo(t);
  let r0 = routes();
  r0['com.atproto.repo.getRecord'] = () => [500, { error: 'InternalServerError', message: 'boom' }];
  let fetch = fakePds(r0);
  let r = await run(['profile', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /getRecord failed: HTTP 500/);
  assert.equal(fetch.requests.length, 2);

  r0 = routes();
  r0['com.atproto.repo.getRecord'] = () => [200, { uri: 'at://x', value: existingProfile() }];
  fetch = fakePds(r0);
  r = await run(['profile', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /without a CID/);
  assert.equal(fetch.requests.length, 2);
});

test('live: getBlob goes to the PDS named in the session\'s DID document, without the token', async (t) => {
  const root = repo(t);
  const r0 = routes({ root });
  r0['com.atproto.server.createSession'] = () => [200, {
    accessJwt: TOKEN, refreshJwt: REFRESH, handle: HANDLE, did: DID,
    didDoc: { id: DID, service: [{ id: '#atproto_pds', type: 'AtprotoPersonalDataServer', serviceEndpoint: 'https://pds.example.test' }] },
  }];
  const fetch = fakePds(r0);
  const r = await run(['profile', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  const getBlob = fetch.requests.find((q) => q.nsid === 'com.atproto.sync.getBlob');
  assert.equal(getBlob.url.origin, 'https://pds.example.test');
  assert.equal(getBlob.headers.authorization, undefined);
  for (const q of fetch.requests.filter((x) => x !== getBlob)) assert.equal(q.url.origin, 'https://bsky.social');
});

test('--live without credentials or DID names what is missing and makes no request', async (t) => {
  const root = repo(t);
  let r = await run(['profile', '--live'], { root, env: {} });
  assert.equal(r.code, 1);
  assert.match(r.err, /--live needs BSKY_APP_PASSWORD in the environment/);
  assert.equal(r.fetch.calls.length, 0);

  const noDid = repo(t, { did: '' });
  r = await run(['profile', '--live'], { root: noDid, env: ENV });
  assert.equal(r.code, 1);
  assert.match(r.err, /--live needs the account DID: set bluesky\.did in show\.config\.json/);
  assert.ok(!r.err.includes(PASSWORD));
  assert.equal(r.fetch.calls.length, 0);
});

test('a failed login does not echo the password', async (t) => {
  const root = repo(t);
  const fetch = fakePds({ 'com.atproto.server.createSession': () => [401, { error: 'AuthenticationRequired', message: 'Invalid identifier or password' }] });
  const r = await run(['profile', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 1);
  assert.ok(!r.err.includes(PASSWORD) && !r.out.includes(PASSWORD));
  assert.equal(fetch.requests.length, 1);
});

test('usage: positionals and unknown flags exit 2; help lists the command', async (t) => {
  const root = repo(t);
  assert.equal((await run(['profile', 'extra'], { root })).code, 2);
  assert.equal((await run(['profile', '--display-name', 'x'], { root })).code, 2);
  const help = await run(['help'], { root });
  assert.match(help.out, /profile \[--avatar <file>\] \[--live\] \[--no-backup\]/);
});
