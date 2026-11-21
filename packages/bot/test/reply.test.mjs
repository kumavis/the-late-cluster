// Every handle, DID, CID and post here is invented.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { main } from '../src/cli.mjs';
import { findMentions, mentionFacet, replyRefs } from '../src/commands/reply.mjs';
import { capture, FIXED_NOW, fakePds, NO_CONFIG, noNetwork } from './helpers.mjs';

const SHOW = 'did:plc:showreply';
const HANDLE = 'show.example.test';
const GUEST = 'did:plc:guestinvented';
const BOTTY = 'did:plc:bottyinvented';
const OTHER = 'did:plc:someoneelse';
const PASSWORD = 'abcd-efgh-ijkl-mnop';
const TOKEN = 'secret-access-jwt';
const ENV = { BSKY_APP_PASSWORD: PASSWORD };
const PARENT = `at://${SHOW}/app.bsky.feed.post/3lvideo`;
const PARENT_URL = `https://bsky.app/profile/${HANDLE}/post/3lvideo`;
const TEXT = 'Ça va? Thanks to @guest.example.test and @Botty.Example.Test.';

function repo(t, { accounts, optout = [] } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'late-cluster-bot-reply-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(join(root, 'show.config.json'), JSON.stringify({ siteUrl: '', bluesky: { handle: HANDLE, did: SHOW } }));
  mkdirSync(join(root, 'packages/scraper/config'), { recursive: true });
  writeFileSync(join(root, 'packages/scraper/config/optout.json'), JSON.stringify({ accounts: optout }));
  mkdirSync(join(root, 'episodes/002-second-night/production'), { recursive: true });
  writeFileSync(join(root, 'episodes/002-second-night/production/sources.json'), JSON.stringify({
    format: 'late-cluster-sources/1',
    accounts: accounts ?? [
      { handle: 'guest.example.test', did: GUEST, role: 'guest' },
      { handle: 'botty.example.test', did: BOTTY, role: 'mentioned' }, // a bot's account: taggable like any other
    ],
    posts: [], lines: [],
  }));
  writeFileSync(join(root, 'reply.txt'), `${TEXT}\n`);
  return root;
}

async function run(argv, { root, env = {}, fetch = noNetwork() }) {
  const stdout = capture();
  const stderr = capture();
  const code = await main(argv, { env, fetch, stdout, stderr, root, cwd: root, now: () => FIXED_NOW, configPath: NO_CONFIG });
  return { code, out: stdout.text, err: stderr.text, fetch };
}

function parentView(overrides = {}) {
  return {
    uri: PARENT, cid: 'bafyreiparent', author: { did: SHOW, handle: HANDLE },
    record: { $type: 'app.bsky.feed.post', text: 'Episode two.', createdAt: '2026-11-21T01:00:00.000Z' },
    ...overrides,
  };
}

function routes({ resolve = { 'guest.example.test': GUEST, 'botty.example.test': BOTTY, [HANDLE]: SHOW }, parent = parentView(), did = SHOW } = {}) {
  return {
    'com.atproto.identity.resolveHandle': (req) => {
      const h = req.url.searchParams.get('handle');
      return resolve[h] ? [200, { did: resolve[h] }] : [400, { error: 'InvalidRequest', message: 'Unable to resolve handle' }];
    },
    'app.bsky.feed.getPosts': () => [200, { posts: parent ? [parent] : [] }],
    'com.atproto.server.createSession': () => [200, { accessJwt: TOKEN, refreshJwt: 'secret-refresh', handle: HANDLE, did }],
    'com.atproto.repo.createRecord': () => [200, { uri: `at://${SHOW}/app.bsky.feed.post/3lreply`, cid: 'bafyreireply' }],
  };
}
const ARGS = ['reply', PARENT_URL, '--text-file', 'reply.txt', '--episode', '2'];
const calls = (fetch) => fetch.requests.map((q) => `${q.method} ${q.nsid}`);

test('facets are UTF-8 byte offsets over "@handle", start inclusive, end exclusive, after a non-ASCII character', () => {
  const found = findMentions(TEXT);
  assert.deepEqual(found.map((m) => m.written), ['@guest.example.test', '@Botty.Example.Test']);
  assert.deepEqual(found.map((m) => m.handle), ['guest.example.test', 'botty.example.test']);
  const f = mentionFacet(TEXT, found[0].at, found[0].written, GUEST);
  // "Ça va? Thanks to " is 17 characters but 18 bytes: Ç is two bytes in UTF-8.
  assert.deepEqual(f, { index: { byteStart: 18, byteEnd: 37 }, features: [{ $type: 'app.bsky.richtext.facet#mention', did: GUEST }] });
  const bytes = Buffer.from(TEXT, 'utf8');
  assert.equal(bytes.subarray(f.index.byteStart, f.index.byteEnd).toString('utf8'), '@guest.example.test');
  const g = mentionFacet(TEXT, found[1].at, found[1].written, BOTTY);
  assert.equal(bytes.subarray(g.index.byteStart, g.index.byteEnd).toString('utf8'), '@Botty.Example.Test', 'the trailing full stop is not part of the handle');
  assert.equal(TEXT.slice(found[0].at, found[0].at + found[0].written.length), '@guest.example.test');
});

test('reply.root is the parent\'s own root when the parent is a reply, else the parent', () => {
  assert.deepEqual(replyRefs(parentView()), { root: { uri: PARENT, cid: 'bafyreiparent' }, parent: { uri: PARENT, cid: 'bafyreiparent' } });
  const root = { uri: `at://${SHOW}/app.bsky.feed.post/3lroot`, cid: 'bafyreiroot' };
  const nested = parentView({ record: { text: 'x', reply: { root, parent: { uri: 'at://x/app.bsky.feed.post/y', cid: 'bafyreiy' } } } });
  assert.deepEqual(replyRefs(nested), { root, parent: { uri: PARENT, cid: 'bafyreiparent' } });
});

test('dry run: resolves each handle now, reads the parent, prints the mentions and the record; no login, nothing written', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes());
  const r = await run(ARGS, { root, fetch });
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(calls(fetch), [
    'GET com.atproto.identity.resolveHandle', 'GET com.atproto.identity.resolveHandle', 'GET com.atproto.identity.resolveHandle', 'GET app.bsky.feed.getPosts',
  ]);
  for (const q of fetch.requests) assert.equal(q.headers.authorization, undefined);
  assert.match(r.out, /^DRY RUN: nothing was sent\. Add --live to reply\./);
  assert.match(r.out, /@guest\.example\.test -> did:plc:guestinvented \(from episodes\/002-second-night\/production\/sources\.json; resolves there now; not opted out\), bytes 18-37/);
  assert.match(r.out, /@Botty\.Example\.Test -> did:plc:bottyinvented/);
  const record = JSON.parse(r.out.slice(r.out.indexOf('\n{') + 1));
  assert.deepEqual(record, {
    $type: 'app.bsky.feed.post',
    text: TEXT,
    facets: [
      { index: { byteStart: 18, byteEnd: 37 }, features: [{ $type: 'app.bsky.richtext.facet#mention', did: GUEST }] },
      { index: { byteStart: 42, byteEnd: 61 }, features: [{ $type: 'app.bsky.richtext.facet#mention', did: BOTTY }] },
    ],
    langs: ['en'],
    reply: { root: { uri: PARENT, cid: 'bafyreiparent' }, parent: { uri: PARENT, cid: 'bafyreiparent' } },
    createdAt: FIXED_NOW.toISOString(),
  });
  assert.equal(existsSync(join(root, 'data')), false);
});

test('live: creates the reply under the parent\'s root, prints its address, and logs it', async (t) => {
  const root = repo(t);
  const threadRoot = { uri: `at://${SHOW}/app.bsky.feed.post/3lroot`, cid: 'bafyreiroot' };
  const fetch = fakePds(routes({ parent: parentView({ record: { text: 'x', reply: { root: threadRoot, parent: threadRoot } } }) }));
  const r = await run([...ARGS, '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.equal(calls(fetch)[0], 'POST com.atproto.server.createSession');
  assert.equal(calls(fetch).at(-1), 'POST com.atproto.repo.createRecord');
  const body = fetch.requests.at(-1).body;
  assert.equal(body.repo, SHOW);
  assert.deepEqual(body.record.reply, { root: threadRoot, parent: { uri: PARENT, cid: 'bafyreiparent' } });
  assert.equal(body.record.facets.length, 2);
  assert.match(r.out, /Replied at:\/\/did:plc:showreply\/app\.bsky\.feed\.post\/3lreply\n {2}https:\/\/bsky\.app\/profile\/show\.example\.test\/post\/3lreply/);
  const [line] = readFileSync(join(root, 'data/bot/replies.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  assert.deepEqual(line.mentions, [{ handle: 'guest.example.test', did: GUEST }, { handle: 'botty.example.test', did: BOTTY }]);
  assert.equal(line.root, threadRoot.uri);
  for (const s of [PASSWORD, TOKEN]) assert.ok(!r.out.includes(s) && !r.err.includes(s));
});

test('a mention not in the episode is refused before any request, in both modes', async (t) => {
  const root = repo(t);
  writeFileSync(join(root, 'stranger.txt'), 'Thanks @guest.example.test and @stranger.example.test');
  for (const live of [false, true]) {
    const fetch = fakePds(routes());
    const r = await run(['reply', PARENT_URL, '--text-file', 'stranger.txt', '--episode', '2', ...(live ? ['--live'] : [])], { root, env: ENV, fetch });
    assert.equal(r.code, 1);
    assert.match(r.err, /tags @stranger\.example\.test, who is not an account in episodes\/002-second-night\/production\/sources\.json\. The bot tags only the accounts that appear in the episode a post is about \(the owner's ruling, 21 November 2026\)\./);
    assert.equal(fetch.requests.length, 0);
  }
  writeFileSync(join(root, 'did.txt'), 'Thanks @did:plc:guestinvented');
  const r = await run(['reply', PARENT_URL, '--text-file', 'did.txt', '--episode', '2'], { root });
  assert.equal(r.code, 1);
  assert.match(r.err, /tag an account by its handle/);
});

test('a handle that now resolves to another DID is refused, before anything is sent', async (t) => {
  const root = repo(t);
  for (const live of [false, true]) {
    const fetch = fakePds(routes({ resolve: { 'guest.example.test': OTHER, 'botty.example.test': BOTTY, [HANDLE]: SHOW } }));
    const r = await run([...ARGS, ...(live ? ['--live'] : [])], { root, env: ENV, fetch });
    assert.equal(r.code, 1);
    assert.match(r.err, /@guest\.example\.test now resolves to did:plc:someoneelse, but episodes\/002-second-night\/production\/sources\.json records did:plc:guestinvented: the handle has moved/);
    assert.ok(!calls(fetch).includes('POST com.atproto.repo.createRecord'));
  }
});

test('the opt-out list, a link, and an account on record without a DID are refused before any request', async (t) => {
  let root = repo(t, { optout: [{ did: BOTTY }] });
  let r = await run(ARGS, { root });
  assert.equal(r.code, 1);
  assert.match(r.err, /@botty\.example\.test is on the opt-out list \(packages\/scraper\/config\/optout\.json\)\. The show does not tag them\./);

  root = repo(t);
  writeFileSync(join(root, 'link.txt'), 'More at https://example.test/ep2');
  r = await run(['reply', PARENT_URL, '--text-file', 'link.txt', '--episode', '2'], { root });
  assert.equal(r.code, 1);
  assert.match(r.err, /reads as a link; a reply carries no links/);

  root = repo(t, { accounts: [{ handle: 'guest.example.test' }, { handle: 'botty.example.test', did: BOTTY }] });
  r = await run(ARGS, { root });
  assert.equal(r.code, 1);
  assert.match(r.err, /@guest\.example\.test is in .* without a DID/);
  assert.equal(r.fetch.calls.length, 0);

  root = repo(t);
  writeFileSync(join(root, 'long.txt'), 'x'.repeat(301));
  r = await run(['reply', PARENT_URL, '--text-file', 'long.txt', '--episode', '2'], { root });
  assert.match(r.err, /301 graphemes; Bluesky posts are limited to 300/);
});

test('a parent post by someone else is refused: by address before any request, and by what the AppView says', async (t) => {
  const root = repo(t);
  let r = await run(['reply', `at://${OTHER}/app.bsky.feed.post/3lx`, '--text-file', 'reply.txt', '--episode', '2'], { root });
  assert.equal(r.code, 1);
  assert.match(r.err, /the bot replies only under its own posts: did:plc:someoneelse is not the show's account/);
  assert.equal(r.fetch.calls.length, 0);

  r = await run(['reply', 'https://bsky.app/profile/guest.example.test/post/3lx', '--text-file', 'reply.txt', '--episode', '2'], { root });
  assert.equal(r.code, 1);
  assert.match(r.err, /@guest\.example\.test is not the show's account/);
  assert.equal(r.fetch.calls.length, 0);

  const fetch = fakePds(routes({ parent: parentView({ author: { did: OTHER, handle: 'other.example.test' } }) }));
  r = await run([...ARGS, '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /the AppView says .* is by did:plc:someoneelse/);
  assert.ok(!calls(fetch).includes('POST com.atproto.repo.createRecord'));

  r = await run(ARGS, { root, fetch: fakePds(routes({ parent: null })) });
  assert.equal(r.code, 1);
  assert.match(r.err, /post not found/);
});

test('usage, a missing sources.json, and the wrong account', async (t) => {
  const root = repo(t);
  assert.equal((await run(['reply', PARENT_URL, '--text-file', 'reply.txt'], { root })).code, 2);
  assert.equal((await run(['reply', PARENT_URL, '--episode', '2'], { root })).code, 2);
  mkdirSync(join(root, 'episodes/003-no-sources'));
  const r = await run(['reply', PARENT_URL, '--text-file', 'reply.txt', '--episode', '3'], { root });
  assert.equal(r.code, 1);
  assert.match(r.err, /episodes\/003-no-sources\/production\/sources\.json does not exist/);

  const fetch = fakePds(routes({ did: OTHER }));
  const w = await run([...ARGS, '--live'], { root, env: ENV, fetch });
  assert.equal(w.code, 1);
  assert.match(w.err, /refusing: logged in as did:plc:someoneelse/);
  assert.deepEqual(calls(fetch), ['POST com.atproto.server.createSession']);
});
