// `profile` and the banner. Every CID and field here is invented.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { main } from '../src/cli.mjs';
import { localBlobCid } from '../src/commands/profile.mjs';
import { capture, FIXED_NOW, fakePds, jpegBytes, NO_CONFIG, noNetwork, pngBytes } from './helpers.mjs';

const DID = 'did:plc:showbanner';
const HANDLE = 'show.example.test';
const ENV = { BSKY_APP_PASSWORD: 'abcd-efgh-ijkl-mnop' };
const RECORD_CID = 'bafyreiprofilerecord';
const DESCRIPTION = 'An automated comedy show.';
const OLD_AVATAR = 'bafkreioldavatar';
const OLD_BANNER = 'bafkreioldbanner';
const OLD_BANNER_BYTES = jpegBytes(1500, 500);
const AVATAR = pngBytes(512, 512);
const BANNER = pngBytes(1500, 500, 80);

function repo(t, { banner = BANNER, bannerName = 'banner.png' } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'late-cluster-bot-banner-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(join(root, 'show.config.json'), JSON.stringify({ siteUrl: '', bluesky: { handle: HANDLE, did: DID, profile: { description: DESCRIPTION } } }));
  mkdirSync(join(root, 'brand'));
  writeFileSync(join(root, 'brand/avatar.png'), AVATAR);
  if (banner) writeFileSync(join(root, 'brand', bannerName), banner);
  return root;
}

async function run(argv, { root, env = {}, fetch = noNetwork() }) {
  const stdout = capture();
  const stderr = capture();
  const code = await main(argv, { env, fetch, stdout, stderr, root, cwd: root, now: () => FIXED_NOW, configPath: NO_CONFIG });
  return { code, out: stdout.text, err: stderr.text, fetch };
}

function existingProfile(overrides = {}) {
  return {
    $type: 'app.bsky.actor.profile',
    displayName: 'The Late Cluster',
    description: DESCRIPTION,
    avatar: { $type: 'blob', ref: { $link: OLD_AVATAR }, mimeType: 'image/png', size: AVATAR.length },
    banner: { $type: 'blob', ref: { $link: OLD_BANNER }, mimeType: 'image/jpeg', size: OLD_BANNER_BYTES.length },
    labels: { $type: 'com.atproto.label.defs#selfLabels', values: [{ val: 'bot' }] },
    pinnedPost: { uri: `at://${DID}/app.bsky.feed.post/3kpin`, cid: 'bafyreipin' },
    createdAt: '2026-11-01T00:00:00.000Z',
    'tv.simcluster.unknownField': { nested: [1, 2, 3] },
    ...overrides,
  };
}

/** uploadBlob answers with the bytes' real CID, so "the same picture" is decided as the server would. */
function routes({ record = existingProfile(), root } = {}) {
  return {
    'com.atproto.server.createSession': () => [200, { accessJwt: 'secret-access-jwt', refreshJwt: 'secret-refresh', handle: HANDLE, did: DID }],
    'com.atproto.repo.getRecord': () => record
      ? [200, { uri: `at://${DID}/app.bsky.actor.profile/self`, cid: RECORD_CID, value: record }]
      : [400, { error: 'RecordNotFound', message: 'Could not locate record' }],
    'com.atproto.repo.uploadBlob': (req) => [200, { blob: { $type: 'blob', ref: { $link: localBlobCid(req.body) }, mimeType: req.headers['content-type'], size: req.body.length } }],
    'com.atproto.sync.getBlob': (req) => new Response(req.url.searchParams.get('cid') === OLD_BANNER ? OLD_BANNER_BYTES : AVATAR, { status: 200 }),
    'com.atproto.repo.putRecord': (req) => {
      if (root) req.backupsAtWrite = existsSync(join(root, 'data/bot')) ? readdirSync(join(root, 'data/bot')).sort() : [];
      return [200, { uri: `at://${DID}/app.bsky.actor.profile/self`, cid: 'bafyreinewrecord' }];
    },
  };
}
const calls = (fetch) => fetch.requests.map((q) => `${q.method} ${q.nsid}`);
/** The current avatar as the server would name it, so the avatar counts as unchanged. */
const sameAvatar = () => existingProfile({ avatar: { $type: 'blob', ref: { $link: localBlobCid(AVATAR) }, mimeType: 'image/png', size: AVATAR.length } });

test('the local blob CID is the PDS form: CIDv1, raw, sha2-256, base32', () => {
  assert.equal(localBlobCid(Buffer.from('hello')), 'bafkreibm6jg3ux5qumhcn2b3flc3tyu6dmlb4xa7u5bf44yegnrjhc4yeq');
});

test('default run with no banner file: says so in one line and leaves the banner alone, dry run and live', async (t) => {
  const root = repo(t, { banner: null });
  let r = await run(['profile'], { root, fetch: fakePds(routes()) });
  assert.equal(r.code, 0, r.err);
  assert.equal((r.out.match(/no banner file is configured or present/g) ?? []).length, 1);
  assert.match(r.out, /Banner: {2}no banner file is configured or present \(brand\/banner\.png\); the banner is left alone\./);
  assert.match(r.out, /changing only "avatar" and "description";/);
  assert.ok(!r.out.includes('Banner on the live profile'));

  const fetch = fakePds(routes({ record: existingProfile({ description: 'Old bio.' }), root }));
  r = await run(['profile', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /no banner file is configured or present/);
  assert.equal(fetch.requests.filter((q) => q.nsid === 'com.atproto.repo.uploadBlob').length, 1, 'only the avatar is uploaded');
  assert.deepEqual(fetch.requests.at(-1).body.record.banner, existingProfile().banner, 'the banner is carried over untouched');
});

test('dry run: shows the banner file, type, bytes and pixels, and whether the live profile already has it', async (t) => {
  const root = repo(t);
  let fetch = fakePds(routes());
  let r = await run(['profile', '--only', 'banner'], { root, fetch });
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(calls(fetch), ['GET com.atproto.repo.getRecord'], 'one public read, no login');
  assert.equal(fetch.requests[0].headers.authorization, undefined);
  assert.match(r.out, /Banner: {2}brand\/banner\.png \(banner in bot\.config\.json\)\nType: {4}image\/png\nSize: {4}80 bytes \(limit 1000000\)\nPixels: {2}1500x500/);
  assert.match(r.out, /Banner on the live profile: bafkreioldbanner\n {2}=> would change, to bafkrei[a-z2-7]+\./);
  assert.match(r.out, /uploadBlob with this banner/);
  assert.match(r.out, /getBlob for the current banner and save it to data\/bot\/banner-previous-<cid>\.<ext>/);
  assert.match(r.out, /changing only "banner";/);
  assert.match(r.out, /--only banner: the avatar and the description are not touched/);
  assert.ok(!r.out.includes('Avatar:') && !r.out.includes('Description ('));
  assert.equal(r.err, '', '1500x500 is 3:1: no warning');

  const same = existingProfile({ banner: { $type: 'blob', ref: { $link: localBlobCid(BANNER) }, mimeType: 'image/png', size: BANNER.length } });
  fetch = fakePds(routes({ record: same }));
  r = await run(['profile', '--only', 'banner'], { root, fetch });
  assert.match(r.out, /=> unchanged: the live profile already has this exact banner \(bafkrei[a-z2-7]+\)\./);

  r = await run(['profile'], { root, fetch: fakePds(routes()) });
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /Avatar: {2}brand\/avatar\.png/);
  assert.match(r.out, /Banner: {2}brand\/banner\.png/);
  assert.match(r.out, /changing only "avatar" and "banner" and "description"/);
});

test('live --only banner: backs up the old banner first, then changes only banner, every other field untouched', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes({ root }));
  const r = await run(['profile', '--only', 'banner', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(calls(fetch), [
    'POST com.atproto.server.createSession',
    'GET com.atproto.repo.getRecord',
    'POST com.atproto.repo.uploadBlob',
    'GET com.atproto.sync.getBlob',
    'POST com.atproto.repo.putRecord',
  ]);
  const upload = fetch.requests[2];
  assert.equal(upload.headers['content-type'], 'image/png');
  assert.ok(Buffer.from(upload.body).equals(BANNER));
  assert.equal(fetch.requests[3].url.searchParams.get('cid'), OLD_BANNER);
  const put = fetch.requests.at(-1);
  assert.equal(put.body.swapRecord, RECORD_CID);
  const { banner, ...rest } = put.body.record;
  const { banner: _old, ...before } = existingProfile();
  assert.deepEqual(rest, before, 'every other field exactly as it was, the avatar and the description included');
  assert.deepEqual(banner, { $type: 'blob', ref: { $link: localBlobCid(BANNER) }, mimeType: 'image/png', size: BANNER.length });
  assert.deepEqual(put.backupsAtWrite, ['banner-previous-bafkreioldbanner.jpg']);
  assert.ok(readFileSync(join(root, 'data/bot/banner-previous-bafkreioldbanner.jpg')).equals(OLD_BANNER_BYTES));
  assert.match(r.out, /previous banner: bafkreioldbanner/);
  assert.match(r.out, /banner backup: {3}data\/bot\/banner-previous-bafkreioldbanner\.jpg/);
  assert.ok(!r.out.includes('previous avatar'));
});

test('live: the same banner is a no-op; a profile with no banner gets one and backs up nothing', async (t) => {
  const root = repo(t);
  const same = existingProfile({ banner: { $type: 'blob', ref: { $link: localBlobCid(BANNER) }, mimeType: 'image/png', size: BANNER.length } });
  let fetch = fakePds(routes({ record: same, root }));
  let r = await run(['profile', '--only', 'banner', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /That picture is already the banner\.\nNothing to change\. Nothing was written\./);
  assert.ok(!calls(fetch).includes('POST com.atproto.repo.putRecord'));

  const { banner: _b, ...noBanner } = existingProfile();
  fetch = fakePds(routes({ record: noBanner, root }));
  r = await run(['profile', '--only', 'banner', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.ok(!calls(fetch).includes('GET com.atproto.sync.getBlob'));
  const { banner, ...rest } = fetch.requests.at(-1).body.record;
  assert.deepEqual(rest, noBanner);
  assert.equal(banner.ref.$link, localBlobCid(BANNER));
  assert.match(r.out, /banner backup: {3}none \(no previous banner\)/);
});

test('live default run with a banner present: avatar unchanged, banner changed, in one write', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes({ record: sameAvatar(), root }));
  const r = await run(['profile', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.equal(fetch.requests.filter((q) => q.nsid === 'com.atproto.repo.uploadBlob').length, 2);
  const puts = fetch.requests.filter((q) => q.nsid === 'com.atproto.repo.putRecord');
  assert.equal(puts.length, 1);
  const { banner, ...rest } = puts[0].body.record;
  const { banner: _b, ...before } = sameAvatar();
  assert.deepEqual(rest, before);
  assert.equal(banner.ref.$link, localBlobCid(BANNER));
  assert.deepEqual(puts[0].backupsAtWrite, ['banner-previous-bafkreioldbanner.jpg'], 'the unchanged avatar is not backed up');
});

test('--only banner with no banner file is an error, before any request', async (t) => {
  const root = repo(t, { banner: null });
  for (const live of [false, true]) {
    const fetch = fakePds(routes());
    const r = await run(['profile', '--only', 'banner', ...(live ? ['--live'] : [])], { root, env: ENV, fetch });
    assert.equal(r.code, 1);
    assert.match(r.err, /banner .*brand\/banner\.png does not exist/);
    assert.equal(fetch.requests.length, 0);
  }
  const r = await run(['profile', '--banner', 'missing.png'], { root });
  assert.equal(r.code, 1, 'a banner named on the command line must exist');
  assert.match(r.err, /banner .*missing\.png does not exist/);
});

test('refused before any request: 1,000,001 bytes, not PNG or JPEG, a damaged header; exactly 1,000,000 is allowed', async (t) => {
  const root = repo(t, { banner: null });
  writeFileSync(join(root, 'big.png'), pngBytes(3000, 1000, 1_000_001));
  writeFileSync(join(root, 'exact.png'), pngBytes(3000, 1000, 1_000_000));
  writeFileSync(join(root, 'fake.png'), 'not a picture');
  const broken = pngBytes(30, 10); broken.write('XXXX', 12, 'latin1');
  writeFileSync(join(root, 'broken.png'), broken);
  mkdirSync(join(root, 'dir.png'));
  for (const live of [false, true]) {
    for (const [file, re] of [
      ['big.png', /banner .*big\.png is 1000001 bytes; Bluesky banners are limited to 1000000 bytes/],
      ['fake.png', /banner .*fake\.png is not a PNG or JPEG image \(checked by its bytes, not its name\)/],
      ['broken.png', /header cannot be read/],
      ['dir.png', /banner .*dir\.png is not a file/],
    ]) {
      const fetch = fakePds(routes());
      const r = await run(['profile', '--only', 'banner', '--banner', file, ...(live ? ['--live'] : [])], { root, env: ENV, fetch });
      assert.equal(r.code, 1, `${file} live=${live}`);
      assert.match(r.err, re);
      assert.equal(fetch.requests.length, 0);
    }
  }
  const ok = await run(['profile', '--only', 'banner', '--banner', 'exact.png'], { root, fetch: fakePds(routes()) });
  assert.equal(ok.code, 0, ok.err);
  assert.match(ok.out, /Size: {4}1000000 bytes \(limit 1000000\)/);
});

test('a banner that is not 3:1 warns and is not refused; a JPEG banner is fine', async (t) => {
  const root = repo(t, { banner: null });
  writeFileSync(join(root, 'wide.png'), pngBytes(1000, 500));
  writeFileSync(join(root, 'banner.jpg'), jpegBytes(1500, 500));
  let r = await run(['profile', '--only', 'banner', '--banner', 'wide.png'], { root, fetch: fakePds(routes()) });
  assert.equal(r.code, 0, r.err);
  assert.match(r.err, /warning: the banner is 1000x500, not 3:1; the apps crop banners to 3:1/);
  r = await run(['profile', '--only', 'banner', '--banner', 'banner.jpg'], { root, fetch: fakePds(routes()) });
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /Type: {4}image\/jpeg/);
  assert.equal(r.err, '');
});

test('--banner with --only avatar or --only description is refused, like --avatar with --only description', async (t) => {
  const root = repo(t);
  for (const only of ['avatar', 'description']) {
    const r = await run(['profile', '--only', only, '--banner', 'brand/banner.png'], { root });
    assert.equal(r.code, 2);
    assert.match(r.err, new RegExp(`--banner and --only ${only} do not go together`));
  }
  const a = await run(['profile', '--only', 'banner', '--avatar', 'brand/avatar.png'], { root });
  assert.equal(a.code, 2);
  assert.match(a.err, /--avatar and --only banner do not go together/);
  const bad = await run(['profile', '--only', 'header'], { root });
  assert.equal(bad.code, 2);
  assert.match(bad.err, /--only takes avatar, banner or description/);
});
