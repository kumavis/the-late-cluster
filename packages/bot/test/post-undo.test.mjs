// `post --undo`: deleting one of the show's own posts. Every handle, DID, CID and text is invented.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { closeSync, existsSync, ftruncateSync, mkdirSync, mkdtempSync, openSync, readFileSync, rmSync, writeFileSync, writeSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { main } from '../src/cli.mjs';
import { capture, FIXED_NOW, fakePds, NO_CONFIG, noNetwork } from './helpers.mjs';

const SHOW = 'did:plc:showundo';
const HANDLE = 'show.example.test';
const OTHER = 'did:plc:someoneelse';
const PASSWORD = 'abcd-efgh-ijkl-mnop';
const ENV = { BSKY_APP_PASSWORD: PASSWORD };
const RKEY = '3lvideo';
const URI = `at://${SHOW}/app.bsky.feed.post/${RKEY}`;
const URL_1 = `https://bsky.app/profile/${HANDLE}/post/${RKEY}`;
const VIDEO_BLOB = { $type: 'blob', ref: { $link: 'bafkreivideoblob' }, mimeType: 'video/mp4', size: 223761792 };
const TEXT = 'Episode two of The Late Cluster.';
const WRITES = ['com.atproto.repo.deleteRecord', 'com.atproto.repo.createRecord', 'com.atproto.repo.putRecord', 'com.atproto.server.createSession', 'com.atproto.repo.uploadBlob'];

function repo(t) {
  const root = mkdtempSync(join(tmpdir(), 'late-cluster-bot-undo-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(join(root, 'show.config.json'), JSON.stringify({ siteUrl: '', bluesky: { handle: HANDLE, did: SHOW } }));
  mkdirSync(join(root, 'episodes/002-second-night'), { recursive: true });
  return root;
}

async function run(argv, { root, env = {}, fetch = noNetwork(), configPath = NO_CONFIG }) {
  const stdout = capture();
  const stderr = capture();
  const code = await main(argv, {
    env, fetch, stdout, stderr, root, cwd: root, now: () => FIXED_NOW, configPath,
    sleep: async () => {}, probe: async () => ({ width: 1920, height: 1080, duration: 598 }),
  });
  return { code, out: stdout.text, err: stderr.text, fetch };
}

function postView(overrides = {}) {
  return {
    uri: URI, cid: 'bafyreivideopost', author: { did: SHOW, handle: HANDLE },
    record: {
      $type: 'app.bsky.feed.post', text: TEXT, createdAt: '2026-11-21T02:00:00.000Z', langs: ['en'],
      embed: { $type: 'app.bsky.embed.video', aspectRatio: { width: 1920, height: 1080 }, presentation: 'default', video: VIDEO_BLOB,
        captions: [{ lang: 'en', file: { $type: 'blob', ref: { $link: 'bafkreicap' }, mimeType: 'text/vtt', size: 40 } }], alt: 'Larry at his desk.' },
    },
    likeCount: 12, repostCount: 3, quoteCount: 1, replyCount: 4,
    ...overrides,
  };
}

function routes({ post = postView(), did = SHOW, resolved = SHOW } = {}) {
  return {
    'com.atproto.identity.resolveHandle': () => [200, { did: resolved }],
    'app.bsky.feed.getPosts': () => [200, { posts: post ? [post] : [] }],
    'com.atproto.server.createSession': () => [200, { accessJwt: 'secret-access-jwt', refreshJwt: 'secret-refresh', handle: HANDLE, did }],
    'com.atproto.repo.deleteRecord': () => [200, { commit: { cid: 'bafyreicommit', rev: 'r9' } }],
  };
}
const calls = (fetch) => fetch.requests.map((q) => `${q.method} ${q.nsid}`);

test('dry run: reads the post, prints what would be deleted and what goes with it, and sends nothing that writes', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes());
  const r = await run(['post', '--undo', URL_1], { root, fetch });
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(calls(fetch), ['GET com.atproto.identity.resolveHandle', 'GET app.bsky.feed.getPosts']);
  for (const q of fetch.requests) {
    assert.ok(!WRITES.includes(q.nsid));
    assert.equal(q.headers.authorization, undefined);
  }
  assert.match(r.out, /^DRY RUN: nothing was sent\. Add --live to delete the post\./);
  assert.match(r.out, /Post: {5}at:\/\/did:plc:showundo\/app\.bsky\.feed\.post\/3lvideo\n {10}cid bafyreivideopost/);
  assert.match(r.out, /Created: {2}2026-11-21T02:00:00\.000Z/);
  assert.match(r.out, /Embeds: {3}a video, blob bafkreivideoblob \(223761792 bytes\); 1 caption file; alt text/);
  assert.match(r.out, /Counts: {3}12 likes, 3 reposts, 1 quotes, 4 replies/);
  assert.ok(r.out.includes(`  | ${TEXT}`));
  assert.match(r.out, /A deletion cannot be undone\. The likes, reposts and quotes go with the post; replies under\nit stay, but lose their parent\./);
  assert.match(r.out, /deleteRecord app\.bsky\.feed\.post\/3lvideo/);
  assert.equal(existsSync(join(root, 'data')), false);

  const bare = await run(['post', '--undo', URI], { root, fetch: fakePds(routes({ post: postView({ record: { text: 'hi', createdAt: 'x' } }) })) });
  assert.equal(bare.code, 0, bare.err);
  assert.ok(!calls(bare.fetch).includes('GET com.atproto.identity.resolveHandle'), 'a DID needs no resolving');
  assert.match(bare.out, /Embeds: {3}nothing/);
});

test('another account\'s post is refused by its address, before any request', async (t) => {
  const root = repo(t);
  for (const addr of [`at://${OTHER}/app.bsky.feed.post/${RKEY}`, `https://bsky.app/profile/guest.example.test/post/${RKEY}`]) {
    for (const live of [false, true]) {
      const r = await run(['post', '--undo', addr, ...(live ? ['--live'] : [])], { root, env: ENV });
      assert.equal(r.code, 1, addr);
      assert.match(r.err, /post --undo deletes only the show's own posts: .* is not the show's account/);
      assert.equal(r.fetch.calls.length, 0);
    }
  }
  const like = await run(['post', '--undo', `at://${SHOW}/app.bsky.feed.like/${RKEY}`], { root });
  assert.equal(like.code, 2, 'only app.bsky.feed.post');
});

test('a handle that resolves to another account is refused, and nothing is deleted', async (t) => {
  const root = repo(t);
  for (const live of [false, true]) {
    const fetch = fakePds(routes({ resolved: OTHER }));
    const r = await run(['post', '--undo', URL_1, ...(live ? ['--live'] : [])], { root, env: ENV, fetch });
    assert.equal(r.code, 1);
    assert.match(r.err, /@show\.example\.test resolves to did:plc:someoneelse, not the show's account \(did:plc:showundo\)/);
    assert.ok(!calls(fetch).includes('POST com.atproto.repo.deleteRecord'));
    assert.ok(!calls(fetch).includes('GET app.bsky.feed.getPosts'));
  }
  const fetch = fakePds(routes({ post: postView({ author: { did: OTHER } }) }));
  const r = await run(['post', '--undo', URI], { root, fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /the AppView says .* is by did:plc:someoneelse/);
});

test('live: a wrong session DID is refused before anything else', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes({ did: OTHER }));
  const r = await run(['post', '--undo', URI, '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /refusing: logged in as did:plc:someoneelse, but bluesky\.did in show\.config\.json is did:plc:showundo/);
  assert.deepEqual(calls(fetch), ['POST com.atproto.server.createSession']);

  const none = await run(['post', '--undo', URI, '--live'], { root, env: {} });
  assert.equal(none.code, 1);
  assert.match(none.err, /--live needs BSKY_APP_PASSWORD/);
  assert.equal(none.fetch.calls.length, 0);
});

test('live: deletes exactly that rkey in app.bsky.feed.post, logs it, and leaves the stored upload alone', async (t) => {
  const root = repo(t);
  mkdirSync(join(root, 'data/bot/video-uploads'), { recursive: true });
  writeFileSync(join(root, 'data/bot/video-uploads/abc.json'), '{"blob":{}}');
  const fetch = fakePds(routes());
  const r = await run(['post', '--undo', URL_1, '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(calls(fetch), [
    'POST com.atproto.server.createSession', 'GET com.atproto.identity.resolveHandle', 'GET app.bsky.feed.getPosts', 'POST com.atproto.repo.deleteRecord',
  ]);
  assert.deepEqual(fetch.requests.at(-1).body, { repo: SHOW, collection: 'app.bsky.feed.post', rkey: RKEY });
  assert.match(r.out, /Deleted at:\/\/did:plc:showundo\/app\.bsky\.feed\.post\/3lvideo/);
  assert.match(r.out, /data\/bot\/video-uploads\/ is left alone: a stored upload is kept, but the server may drop a blob that no post uses\./);
  const [line] = readFileSync(join(root, 'data/bot/posts.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  assert.deepEqual(line, { at: FIXED_NOW.toISOString(), undone: URI, cid: 'bafyreivideopost', text: TEXT });
  assert.equal(readFileSync(join(root, 'data/bot/video-uploads/abc.json'), 'utf8'), '{"blob":{}}');
  assert.ok(!r.out.includes(PASSWORD) && !r.out.includes('secret-access-jwt'));
});

test('a post the AppView does not know stops, in both modes, with nothing deleted', async (t) => {
  const root = repo(t);
  for (const live of [false, true]) {
    const fetch = fakePds(routes({ post: null }));
    const r = await run(['post', '--undo', URI, ...(live ? ['--live'] : [])], { root, env: ENV, fetch });
    assert.equal(r.code, 1);
    assert.match(r.err, /the AppView does not know at:\/\/did:plc:showundo\/app\.bsky\.feed\.post\/3lvideo \(already deleted, or never there\)\. Nothing was deleted\./);
    assert.ok(!calls(fetch).includes('POST com.atproto.repo.deleteRecord'));
  }
});

test('the refused flag combinations: --undo takes a post and nothing about a new one', async (t) => {
  const root = repo(t);
  for (const extra of [['--video', 'ep.mp4'], ['--text-file', 't.txt'], ['--alt-file', 'a.txt'], ['--captions', 'c.vtt'], ['--upload-only'], ['--video', 'ep.mp4', '--text-file', 't.txt']]) {
    const r = await run(['post', '--undo', URI, ...extra], { root });
    assert.equal(r.code, 2, extra.join(' '));
    assert.match(r.err, /--undo deletes a post, so --[a-z-]+.* not go with it/);
    assert.equal(r.fetch.calls.length, 0);
  }
  assert.equal((await run(['post', '--undo'], { root })).code, 2);
  assert.equal((await run(['post', '--undo', URI, URI], { root })).code, 2);
  const ep = await run(['post', '--undo', '2'], { root });
  assert.equal(ep.code, 2, 'with --undo the positional is a post, not an episode');
  assert.match(ep.err, /is not a post address/);
  const help = await run(['help'], { root });
  assert.match(help.out, /post --undo <post> \[--live\]/);
});

test('a post logged as undone does not block posting the same video again', async (t) => {
  const root = repo(t);
  // The earlier post was deleted: posts.jsonl still has both its line and the undo line.
  mkdirSync(join(root, 'data/bot'), { recursive: true });
  writeFileSync(join(root, 'data/bot/posts.jsonl'), [
    JSON.stringify({ at: '2026-11-21T02:00:00.000Z', episode: '002-second-night', uri: URI, video: { blob: 'bafkreivideoblob' } }),
    JSON.stringify({ at: '2026-11-21T03:00:00.000Z', undone: URI, cid: 'bafyreivideopost', text: TEXT }),
  ].join('\n') + '\n');
  // A small MP4 header, the text, and a stored upload of it, so no upload is needed.
  const head = Buffer.alloc(24); head.writeUInt32BE(24, 0); head.write('ftyp', 4, 'latin1'); head.write('isom', 8, 'latin1');
  const fd = openSync(join(root, 'ep.mp4'), 'w'); writeSync(fd, head, 0, 24, 0); ftruncateSync(fd, 4096); closeSync(fd);
  writeFileSync(join(root, 'text.txt'), TEXT);
  const { createHash } = await import('node:crypto');
  const sha = createHash('sha256').update(readFileSync(join(root, 'ep.mp4'))).digest('hex');
  mkdirSync(join(root, 'data/bot/video-uploads'), { recursive: true });
  writeFileSync(join(root, `data/bot/video-uploads/${sha}.json`), JSON.stringify({ sha256: sha, blob: VIDEO_BLOB }));
  // The live records no longer hold the deleted post, which is what the duplicate check reads.
  const server = createServer((_req, res) => res.writeHead(500).end());
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  t.after(() => { server.closeAllConnections(); server.close(); });
  const configPath = join(root, 'bot.config.json');
  writeFileSync(configPath, JSON.stringify({ video: { service: `http://127.0.0.1:${server.address().port}` } }));
  const fetch = fakePds({
    ...routes(),
    'com.atproto.repo.listRecords': () => [200, { records: [] }],
    'com.atproto.repo.createRecord': () => [200, { uri: `at://${SHOW}/app.bsky.feed.post/3lagain`, cid: 'bafyreiagain' }],
  });
  const r = await run(['post', '2', '--video', 'ep.mp4', '--text-file', 'text.txt', '--live'], { root, env: ENV, fetch, configPath });
  assert.equal(r.code, 0, r.err);
  assert.ok(calls(fetch).includes('POST com.atproto.repo.createRecord'));
  assert.match(r.out, /Posted at:\/\/did:plc:showundo\/app\.bsky\.feed\.post\/3lagain/);
});
