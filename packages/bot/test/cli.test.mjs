import { test } from 'node:test';
import assert from 'node:assert/strict';
import { main } from '../src/cli.mjs';
import { capture, FIXED_NOW, FIXTURE_ROOT, FIXTURE_THUMB, fakePds, manifest, NO_CONFIG, noNetwork, tempRepo } from './helpers.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://example.test/the-late-cluster';
const URL_1 = 'https://example.test/the-late-cluster/episodes/001-pilot/';
const PASSWORD = 'abcd-efgh-ijkl-mnop';
const TOKEN = 'secret-access-jwt';
const CREDS = { SITE_URL: SITE, BSKY_HANDLE: 'latecluster.example.test', BSKY_APP_PASSWORD: PASSWORD };

async function run(argv, { env = { SITE_URL: SITE }, fetch = noNetwork(), root = FIXTURE_ROOT } = {}) {
  const stdout = capture();
  const stderr = capture();
  const code = await main(argv, { env, fetch, stdout, stderr, root, cwd: FIXTURE_ROOT, now: () => FIXED_NOW, configPath: NO_CONFIG });
  return { code, out: stdout.text, err: stderr.text, fetch };
}

function happyRoutes(existing = []) {
  return {
    'com.atproto.server.createSession': () => [200, { accessJwt: TOKEN, refreshJwt: 'secret-refresh', handle: 'latecluster.example.test', did: 'did:plc:show' }],
    'com.atproto.repo.listRecords': () => [200, { records: existing }],
    'com.atproto.repo.uploadBlob': (req) => [200, { blob: { $type: 'blob', ref: { $link: 'bafkreithumb' }, mimeType: req.headers['content-type'], size: req.body.length } }],
    'com.atproto.repo.createRecord': () => [200, { uri: 'at://did:plc:show/app.bsky.feed.post/3kabc', cid: 'bafyrecord' }],
  };
}

test('dry run is the default, prints the record, and makes no network call', async () => {
  const r = await run(['announce', '1']);
  assert.equal(r.code, 0, r.err);
  assert.equal(r.fetch.calls.length, 0);
  assert.match(r.out, /^DRY RUN: nothing was sent\. Add --live to post\./);
  assert.match(r.out, /Account: {3}\(no handle: set bluesky\.handle in show\.config\.json\) on https:\/\/bsky\.social/);
  assert.match(r.out, /Thumbnail: dist\/episodes\/001-pilot\/thumbnail\.jpg \(\d+ bytes, image\/jpeg\)/);
  const size = readFileSync(FIXTURE_THUMB).length;
  assert.ok(r.out.includes(`(${size} bytes, image/jpeg)`));
  const record = JSON.parse(r.out.slice(r.out.indexOf('\n{') + 1));
  assert.equal(record.embed.external.uri, URL_1);
  assert.equal(record.embed.external.thumb.size, size);
  assert.equal(record.createdAt, FIXED_NOW.toISOString());
  assert.equal(record.facets[0].features[0].uri, URL_1);
});

test('dry run names the target account when BSKY_HANDLE is set, and never prints the password', async () => {
  const r = await run(['announce', '001-pilot'], { env: CREDS });
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /Account: {3}@latecluster\.example\.test on https:\/\/bsky\.social \(handle from BSKY_HANDLE\)/);
  assert.ok(!r.out.includes(PASSWORD));
  assert.equal(r.fetch.calls.length, 0);
});

test('BSKY_PDS changes the host', async () => {
  const r = await run(['announce', '1'], { env: { ...CREDS, BSKY_PDS: 'https://pds.example.test' } });
  assert.match(r.out, /on https:\/\/pds\.example\.test/);
});

test('no site URL is a clear error', async () => {
  const r = await run(['announce', '1'], { env: {} });
  assert.equal(r.code, 1);
  assert.match(r.err, /no site URL: set SITE_URL/);
});

test('refusals surface as errors with exit code 1', async () => {
  for (const [ep, re] of [['2', /draft/], ['3', /unbuilt/], ['4', /missing/]]) {
    const r = await run(['announce', ep], { env: CREDS });
    assert.equal(r.code, 1, ep);
    assert.match(r.err, re);
  }
});

test('--live without credentials is a clear error and touches nothing', async () => {
  for (const [env, re] of [
    [{ SITE_URL: SITE }, /--live needs a handle: set bluesky\.handle in show\.config\.json.*, and BSKY_APP_PASSWORD in the environment/],
    [{ SITE_URL: SITE, BSKY_HANDLE: 'x.test' }, /--live needs BSKY_APP_PASSWORD in the environment \(locally: put it in \.secrets/],
    [{ SITE_URL: SITE, BSKY_APP_PASSWORD: PASSWORD }, /--live needs a handle: set bluesky\.handle in show\.config\.json \(or BSKY_HANDLE\)\./],
  ]) {
    const r = await run(['announce', '1', '--live'], { env });
    assert.equal(r.code, 1);
    assert.match(r.err, re);
    assert.ok(!r.err.includes(PASSWORD));
    assert.equal(r.fetch.calls.length, 0);
  }
});

test('mention and tag flags are refused, usage errors exit 2', async () => {
  for (const argv of [['announce', '1', '--mention', 'someone.bsky.social'], ['announce', '1', '--tag=x']]) {
    const r = await run(argv);
    assert.equal(r.code, 2);
    assert.match(r.err, /never (mentions|tags)/);
  }
  assert.equal((await run(['announce'])).code, 2);
  assert.equal((await run(['announce', '1', '--bogus'])).code, 2);
  assert.equal((await run(['nope'])).code, 2);
  const help = await run(['help']);
  assert.equal(help.code, 0);
  assert.match(help.out, /announce <ep> \[--live\] \[--force\]/);
});

test('live: session, duplicate check, blob upload, record creation, in that order', async () => {
  const fetch = fakePds(happyRoutes());
  const r = await run(['announce', '1', '--live'], { env: CREDS, fetch });
  assert.equal(r.code, 0, r.err);
  const reqs = fetch.requests;
  assert.deepEqual(reqs.map((q) => `${q.method} ${q.nsid}`), [
    'POST com.atproto.server.createSession',
    'GET com.atproto.repo.listRecords',
    'POST com.atproto.repo.uploadBlob',
    'POST com.atproto.repo.createRecord',
  ]);
  for (const q of reqs) assert.equal(q.url.origin, 'https://bsky.social');

  const [session, list, upload, create] = reqs;
  assert.deepEqual(session.body, { identifier: 'latecluster.example.test', password: PASSWORD });
  assert.equal(session.headers.authorization, undefined);

  assert.equal(list.headers.authorization, `Bearer ${TOKEN}`);
  assert.equal(list.url.searchParams.get('repo'), 'did:plc:show');
  assert.equal(list.url.searchParams.get('collection'), 'app.bsky.feed.post');
  assert.equal(list.url.searchParams.get('limit'), '100');

  assert.equal(upload.headers.authorization, `Bearer ${TOKEN}`);
  assert.equal(upload.headers['content-type'], 'image/jpeg');
  assert.ok(Buffer.from(upload.body).equals(readFileSync(FIXTURE_THUMB)));

  assert.equal(create.headers.authorization, `Bearer ${TOKEN}`);
  assert.equal(create.body.repo, 'did:plc:show');
  assert.equal(create.body.collection, 'app.bsky.feed.post');
  const rec = create.body.record;
  assert.equal(rec.$type, 'app.bsky.feed.post');
  assert.deepEqual(rec.embed.external.thumb, { $type: 'blob', ref: { $link: 'bafkreithumb' }, mimeType: 'image/jpeg', size: readFileSync(FIXTURE_THUMB).length });
  assert.equal(rec.embed.external.uri, URL_1);
  assert.equal(rec.createdAt, FIXED_NOW.toISOString());
  assert.deepEqual(rec.langs, ['en']);
  const { byteStart, byteEnd } = rec.facets[0].index;
  assert.equal(Buffer.from(rec.text).subarray(byteStart, byteEnd).toString(), URL_1);
  assert.ok(rec.facets.every((f) => f.features.every((x) => x.$type === 'app.bsky.richtext.facet#link')));

  assert.match(r.out, /Posted at:\/\/did:plc:show\/app\.bsky\.feed\.post\/3kabc/);
  assert.match(r.out, /https:\/\/bsky\.app\/profile\/latecluster\.example\.test\/post\/3kabc/);
  for (const secret of [PASSWORD, TOKEN, 'secret-refresh']) {
    assert.ok(!r.out.includes(secret) && !r.err.includes(secret), `output leaks ${secret}`);
  }
});

test('live: non-ASCII title still gets correct byte offsets in the posted record', async () => {
  const root = tempRepo(manifest({ title: 'Ünïcødé Nïght 🎙️ 深夜' }));
  const fetch = fakePds(happyRoutes());
  const r = await run(['announce', '1', '--live'], { env: CREDS, fetch, root });
  assert.equal(r.code, 0, r.err);
  const rec = fetch.requests.at(-1).body.record;
  const { byteStart, byteEnd } = rec.facets[0].index;
  assert.notEqual(byteStart, rec.text.indexOf(URL_1));
  assert.equal(Buffer.from(rec.text).subarray(byteStart, byteEnd).toString(), URL_1);
});

test('live: refuses an episode URL it already posted, unless --force', async () => {
  const earlier = { uri: 'at://did:plc:show/app.bsky.feed.post/3kold', cid: 'x', value: { text: 'old', embed: { $type: 'app.bsky.embed.external', external: { uri: URL_1 } } } };
  let fetch = fakePds(happyRoutes([earlier]));
  let r = await run(['announce', '1', '--live'], { env: CREDS, fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /already announced: at:\/\/did:plc:show\/app\.bsky\.feed\.post\/3kold/);
  assert.deepEqual(fetch.requests.map((q) => q.nsid), ['com.atproto.server.createSession', 'com.atproto.repo.listRecords']);

  fetch = fakePds(happyRoutes([earlier]));
  r = await run(['announce', '1', '--live', '--force'], { env: CREDS, fetch });
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /posting again because of --force/);
  assert.equal(fetch.requests.at(-1).nsid, 'com.atproto.repo.createRecord');
});

test('live: duplicate check follows cursors and matches link facets', async () => {
  const filler = (i) => ({ uri: `at://did:plc:show/app.bsky.feed.post/${i}`, cid: 'x', value: { text: `post ${i}` } });
  const hit = { uri: 'at://did:plc:show/app.bsky.feed.post/hit', cid: 'x', value: { text: 'see link', facets: [{ index: { byteStart: 4, byteEnd: 8 }, features: [{ $type: 'app.bsky.richtext.facet#link', uri: URL_1 }] }] } };
  const routes = happyRoutes();
  routes['com.atproto.repo.listRecords'] = (req) => req.url.searchParams.get('cursor') === 'p2'
    ? [200, { records: [hit] }]
    : [200, { records: [filler(1), filler(2)], cursor: 'p2' }];
  const fetch = fakePds(routes);
  const r = await run(['announce', '1', '--live'], { env: CREDS, fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /already announced: .*\/hit/);
  assert.equal(fetch.requests.filter((q) => q.nsid === 'com.atproto.repo.listRecords').length, 2);
});

test('live: an oversized thumbnail is refused before any network call', async () => {
  const big = Buffer.alloc(1_000_001); big.set([0xff, 0xd8, 0xff, 0xe0]);
  const r = await run(['announce', '1', '--live'], { env: CREDS, root: tempRepo(manifest(), { thumbnail: big }) });
  assert.equal(r.code, 1);
  assert.match(r.err, /limited to 1000000 bytes/);
  assert.equal(r.fetch.calls.length, 0);
});

test('live: a failed login is reported without echoing the password', async () => {
  const fetch = fakePds({ 'com.atproto.server.createSession': () => [401, { error: 'AuthenticationRequired', message: 'Invalid identifier or password' }] });
  const r = await run(['announce', '1', '--live'], { env: CREDS, fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /createSession failed: HTTP 401 AuthenticationRequired: Invalid identifier or password/);
  assert.ok(!r.err.includes(PASSWORD));
  assert.equal(fetch.requests.length, 1);
});

/** a temp repo root holding one built episode and a show.config.json with the show's identity */
function repoWithShowConfig(bluesky = { handle: 'show.example.test', did: 'did:plc:showconfig' }) {
  const root = tempRepo();
  writeFileSync(join(root, 'show.config.json'), JSON.stringify({ siteUrl: '', bluesky }));
  return root;
}

test('the handle comes from show.config.json when BSKY_HANDLE is not set', async () => {
  const root = repoWithShowConfig();
  const r = await run(['announce', '1'], { env: { SITE_URL: SITE }, root });
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /Account: {3}@show\.example\.test on https:\/\/bsky\.social \(handle from show\.config\.json\)/);
  assert.match(r.out, /createSession as @show\.example\.test/);
});

test('BSKY_HANDLE overrides the configured handle', async () => {
  const r = await run(['announce', '1'], { env: { SITE_URL: SITE, BSKY_HANDLE: '@other.example.test' }, root: repoWithShowConfig() });
  assert.match(r.out, /Account: {3}@other\.example\.test on https:\/\/bsky\.social \(handle from BSKY_HANDLE\)/);
});

test('live: only the app password comes from the environment; the login uses the configured handle', async () => {
  const fetch = fakePds(happyRoutes());
  const r = await run(['announce', '1', '--live'], { env: { SITE_URL: SITE, BSKY_APP_PASSWORD: PASSWORD }, fetch, root: repoWithShowConfig() });
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(fetch.requests[0].body, { identifier: 'show.example.test', password: PASSWORD });
  assert.ok(!r.out.includes(PASSWORD) && !r.err.includes(PASSWORD));
});
