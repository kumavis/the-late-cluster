// Every handle, DID, CID and post here is invented.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { main } from '../src/cli.mjs';
import { hasVideo, parsePostRef } from '../src/commands/repost.mjs';
import { capture, FIXED_NOW, fakePds, NO_CONFIG, noNetwork } from './helpers.mjs';

const SHOW = 'did:plc:showrepost';
const SHOW_HANDLE = 'show.example.test';
const OWNER = 'did:plc:ownerinvented';
const OWNER_HANDLE = 'owner.example.test';
const STRANGER = 'did:plc:strangerinvented';
const PASSWORD = 'abcd-efgh-ijkl-mnop';
const TOKEN = 'secret-access-jwt';
const ENV = { BSKY_APP_PASSWORD: PASSWORD };
const RKEY = '3lpilotpost';
const SUBJECT = `at://${OWNER}/app.bsky.feed.post/${RKEY}`;
const POST_CID = 'bafyreipilotpost';
const URL_1 = `https://bsky.app/profile/${OWNER_HANDLE}/post/${RKEY}`;
const WRITES = ['com.atproto.repo.createRecord', 'com.atproto.repo.deleteRecord', 'com.atproto.repo.putRecord', 'com.atproto.server.createSession', 'com.atproto.repo.uploadBlob'];

function repo(t, { authors = [SHOW, OWNER], optout = [] } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'late-cluster-bot-repost-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const bluesky = { handle: SHOW_HANDLE, did: SHOW, ...(authors === null ? {} : { repostAuthors: authors }) };
  writeFileSync(join(root, 'show.config.json'), JSON.stringify({ siteUrl: '', bluesky }));
  mkdirSync(join(root, 'packages/scraper/config'), { recursive: true });
  writeFileSync(join(root, 'packages/scraper/config/optout.json'), JSON.stringify({ accounts: optout }));
  return root;
}

async function run(argv, { root, env = {}, fetch = noNetwork() }) {
  const stdout = capture();
  const stderr = capture();
  const code = await main(argv, { env, fetch, stdout, stderr, root, cwd: root, now: () => FIXED_NOW, configPath: NO_CONFIG });
  return { code, out: stdout.text, err: stderr.text, fetch };
}

function postView(overrides = {}) {
  return {
    uri: SUBJECT, cid: POST_CID,
    author: { did: OWNER, handle: OWNER_HANDLE, displayName: 'Owner' },
    record: { $type: 'app.bsky.feed.post', text: 'Episode one is up.\nWatch it.', createdAt: '2026-11-20T01:00:00.000Z', embed: { $type: 'app.bsky.embed.video', video: {} } },
    embed: { $type: 'app.bsky.embed.video#view', cid: 'bafkreivideo', playlist: 'https://video.example.test/x.m3u8' },
    replyCount: 3, repostCount: 5, likeCount: 21, quoteCount: 1, indexedAt: '2026-11-20T01:00:01.000Z',
    ...overrides,
  };
}

function routes({ reposts = [], did = SHOW, post = postView(), resolved = OWNER } = {}) {
  return {
    'com.atproto.identity.resolveHandle': () => [200, { did: resolved }],
    'app.bsky.feed.getPosts': () => [200, { posts: post ? [post] : [] }],
    'com.atproto.repo.listRecords': () => [200, { records: reposts }],
    'com.atproto.server.createSession': () => [200, { accessJwt: TOKEN, refreshJwt: 'secret-refresh', handle: SHOW_HANDLE, did }],
    'com.atproto.repo.createRecord': () => [200, { uri: `at://${SHOW}/app.bsky.feed.repost/3lrepost`, cid: 'bafyreirepost' }],
    'com.atproto.repo.deleteRecord': () => [200, { commit: { cid: 'bafyreicommit', rev: 'r2' } }],
  };
}

const existingRepost = { uri: `at://${SHOW}/app.bsky.feed.repost/3lold`, cid: 'bafyreioldrepost', value: { $type: 'app.bsky.feed.repost', subject: { uri: SUBJECT, cid: POST_CID }, createdAt: '2026-11-19T00:00:00.000Z' } };
const otherRepost = { uri: `at://${SHOW}/app.bsky.feed.repost/3lother`, cid: 'bafyreiother', value: { $type: 'app.bsky.feed.repost', subject: { uri: `at://${OWNER}/app.bsky.feed.post/3lelse`, cid: 'bafyreielse' }, createdAt: '2026-11-18T00:00:00.000Z' } };
const calls = (fetch) => fetch.requests.map((q) => `${q.method} ${q.nsid}`);

test('post addresses: bsky.app URLs and at:// URIs, by handle or DID; anything else is a usage error', () => {
  assert.deepEqual(parsePostRef(URL_1), { actor: { handle: OWNER_HANDLE }, rkey: RKEY, given: URL_1 });
  assert.deepEqual(parsePostRef(`https://bsky.app/profile/${OWNER}/post/${RKEY}/`).actor, { did: OWNER });
  assert.deepEqual(parsePostRef(SUBJECT).actor, { did: OWNER });
  assert.deepEqual(parsePostRef(`at://@Owner.Example.Test/app.bsky.feed.post/${RKEY}`).actor, { handle: OWNER_HANDLE });
  for (const bad of ['', 'https://example.test/profile/a.b/post/x', 'http://bsky.app/profile/a.b/post/x', `at://${OWNER}/app.bsky.feed.like/${RKEY}`,
    'https://bsky.app/profile/a.b/post/..', 'https://bsky.app/profile/a.b', 'https://bsky.app/profile/not_a_handle/post/x']) {
    assert.throws(() => parsePostRef(bad), (e) => e.exitCode === 2, bad);
  }
  assert.equal(hasVideo(postView()), true);
  assert.equal(hasVideo(postView({ embed: undefined, record: { text: 'x' } })), false);
  assert.equal(hasVideo({ embed: { $type: 'app.bsky.embed.recordWithMedia#view', media: { $type: 'app.bsky.embed.video#view' } } }), true);
});

test('dry run: resolves, reads the post, prints the record, and sends nothing', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes({ reposts: [otherRepost] }));
  const r = await run(['repost', URL_1], { root, fetch });
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(calls(fetch), ['GET com.atproto.identity.resolveHandle', 'GET app.bsky.feed.getPosts', 'GET com.atproto.repo.listRecords']);
  for (const q of fetch.requests) {
    assert.equal(q.headers.authorization, undefined, 'a dry run never logs in');
    assert.ok(!WRITES.includes(q.nsid));
  }
  const get = fetch.requests[1];
  assert.equal(get.url.origin, 'https://public.api.bsky.app');
  assert.equal(get.url.searchParams.get('uris'), SUBJECT);
  const list = fetch.requests[2];
  assert.equal(list.url.searchParams.get('repo'), SHOW);
  assert.equal(list.url.searchParams.get('collection'), 'app.bsky.feed.repost');

  assert.match(r.out, /^DRY RUN: nothing was sent\. Add --live to repost\./);
  assert.match(r.out, /Author: {3}@owner\.example\.test \(did:plc:ownerinvented\), "Owner"/);
  assert.match(r.out, /Posted: {3}2026-11-20T01:00:00\.000Z/);
  assert.match(r.out, /Counts: {3}3 replies, 5 reposts, 1 quotes, 21 likes/);
  assert.match(r.out, /Video: {4}yes/);
  assert.match(r.out, / {2}\| Episode one is up\.\n {2}\| Watch it\./);
  assert.match(r.out, /Already: {2}no repost of this post among the account's last 1 reposts/);
  const record = JSON.parse(r.out.slice(r.out.indexOf('\n{') + 1));
  assert.deepEqual(record, { $type: 'app.bsky.feed.repost', subject: { uri: SUBJECT, cid: POST_CID }, createdAt: FIXED_NOW.toISOString() });
  assert.equal(existsSync(join(root, 'data')), false, 'nothing written locally either');
});

test('dry run: an existing repost is reported, and the record is not offered', async (t) => {
  const root = repo(t);
  const r = await run(['repost', SUBJECT], { root, fetch: fakePds(routes({ reposts: [otherRepost, existingRepost] })) });
  assert.equal(r.code, 0, r.err);
  assert.ok(!calls(r.fetch).includes('GET com.atproto.identity.resolveHandle'), 'a DID needs no resolving');
  assert.match(r.out, /Already: {2}reposted, at at:\/\/did:plc:showrepost\/app\.bsky\.feed\.repost\/3lold\. --live would stop and write nothing\./);
  assert.ok(!r.out.includes('With --live'));
});

test('dry run: a failed duplicate check is reported, not fatal', async (t) => {
  const root = repo(t);
  const r0 = routes();
  r0['com.atproto.repo.listRecords'] = () => [400, { error: 'InvalidRequest', message: 'Could not find repo' }];
  const r = await run(['repost', URL_1], { root, fetch: fakePds(r0) });
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /Already: {2}could not check without logging in \(.*Could not find repo\); --live checks after logging in/);
  assert.match(r.out, /With --live the bot would:/);
});

test('live: creates the repost record, prints its address, and logs it', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes({ reposts: [otherRepost] }));
  const r = await run(['repost', URL_1, '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(calls(fetch), [
    'POST com.atproto.server.createSession',
    'GET com.atproto.identity.resolveHandle',
    'GET app.bsky.feed.getPosts',
    'GET com.atproto.repo.listRecords',
    'POST com.atproto.repo.createRecord',
  ]);
  const list = fetch.requests[3];
  assert.equal(list.headers.authorization, `Bearer ${TOKEN}`);
  const create = fetch.requests.at(-1);
  assert.deepEqual(create.body, {
    repo: SHOW,
    collection: 'app.bsky.feed.repost',
    record: { $type: 'app.bsky.feed.repost', subject: { uri: SUBJECT, cid: POST_CID }, createdAt: FIXED_NOW.toISOString() },
  });
  assert.equal(fetch.requests[2].headers.authorization, undefined, 'the token never goes to the AppView');
  assert.match(r.out, /Reposted at:\/\/did:plc:ownerinvented\/app\.bsky\.feed\.post\/3lpilotpost\n {2}repost: at:\/\/did:plc:showrepost\/app\.bsky\.feed\.repost\/3lrepost\n {2}logged: data\/bot\/reposts\.jsonl/);
  const lines = readFileSync(join(root, 'data/bot/reposts.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  assert.deepEqual(lines, [{ at: FIXED_NOW.toISOString(), action: 'repost', subject: { uri: SUBJECT, cid: POST_CID }, repost: `at://${SHOW}/app.bsky.feed.repost/3lrepost` }]);
  for (const secret of [PASSWORD, TOKEN]) assert.ok(!r.out.includes(secret) && !r.err.includes(secret));
});

test('live: an existing repost is detected and nothing is written', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes({ reposts: [existingRepost] }));
  const r = await run(['repost', URL_1, '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.ok(!calls(fetch).includes('POST com.atproto.repo.createRecord'));
  assert.match(r.out, /Already reposted: at:\/\/did:plc:showrepost\/app\.bsky\.feed\.repost\/3lold is the account's repost of .*\. Nothing was written\./);
  assert.equal(existsSync(join(root, 'data')), false);
});

test('live: the duplicate check pages through the account\'s reposts', async (t) => {
  const root = repo(t);
  const r0 = routes();
  r0['com.atproto.repo.listRecords'] = (req) => req.url.searchParams.get('cursor')
    ? [200, { records: [existingRepost] }]
    : [200, { records: [otherRepost], cursor: 'page2' }];
  const fetch = fakePds(r0);
  const r = await run(['repost', URL_1, '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.equal(fetch.requests.filter((q) => q.nsid === 'com.atproto.repo.listRecords').length, 2);
  assert.ok(!calls(fetch).includes('POST com.atproto.repo.createRecord'));
});

test('an author not on the list is refused, saying the list is how the owner allows one', async (t) => {
  const root = repo(t);
  // Given as a DID: refused before any request.
  let r = await run(['repost', `at://${STRANGER}/app.bsky.feed.post/${RKEY}`], { root });
  assert.equal(r.code, 1);
  assert.match(r.err, /did:plc:strangerinvented \(did:plc:strangerinvented\) is not on the repost list\. The show reposts only authors whose DID is in bluesky\.repostAuthors in show\.config\.json: adding a DID there, in a commit, is how the owner allows an account\./);
  assert.equal(r.fetch.calls.length, 0);

  // Given as a handle: refused once it resolves, before the post is read; live too, before any write.
  for (const live of [false, true]) {
    const fetch = fakePds(routes({ resolved: STRANGER }));
    r = await run(['repost', 'https://bsky.app/profile/stranger.example.test/post/3lx', ...(live ? ['--live'] : [])], { root, env: ENV, fetch });
    assert.equal(r.code, 1);
    assert.match(r.err, /@stranger\.example\.test \(did:plc:strangerinvented\) is not on the repost list/);
    assert.ok(!calls(fetch).includes('GET app.bsky.feed.getPosts'));
    assert.ok(!calls(fetch).includes('POST com.atproto.repo.createRecord'));
  }

  // The AppView says the post is someone else's: refused.
  const fetch = fakePds(routes({ post: postView({ author: { did: STRANGER, handle: 'stranger.example.test' } }) }));
  r = await run(['repost', SUBJECT], { root, fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /is by did:plc:strangerinvented, not did:plc:ownerinvented; refusing/);
});

test('a missing or bad repost list refuses everything', async (t) => {
  for (const [authors, re] of [[null, /bluesky\.repostAuthors in show\.config\.json is missing or empty/], [[], /missing or empty/], [['owner.example.test'], /"owner\.example\.test" is not a DID/]]) {
    const root = repo(t, { authors });
    const r = await run(['repost', SUBJECT], { root });
    assert.equal(r.code, 1);
    assert.match(r.err, re);
    assert.equal(r.fetch.calls.length, 0);
  }
});

test('the opt-out list is checked: by handle before any request, by DID after resolving, and on the post\'s author', async (t) => {
  let root = repo(t, { optout: [OWNER_HANDLE] });
  let r = await run(['repost', URL_1], { root });
  assert.equal(r.code, 1);
  assert.match(r.err, /@owner\.example\.test is on the opt-out list \(packages\/scraper\/config\/optout\.json\)\. The show does not repost them\./);
  assert.equal(r.fetch.calls.length, 0);

  root = repo(t, { optout: [{ did: OWNER }] });
  r = await run(['repost', URL_1], { root, fetch: fakePds(routes()) });
  assert.equal(r.code, 1);
  assert.match(r.err, /is on the opt-out list/);
  assert.ok(!calls(r.fetch).includes('GET app.bsky.feed.getPosts'));

  root = repo(t, { optout: ['renamed.example.test'] });
  r = await run(['repost', SUBJECT], { root, fetch: fakePds(routes({ post: postView({ author: { did: OWNER, handle: 'renamed.example.test' } }) })) });
  assert.equal(r.code, 1);
  assert.match(r.err, /@renamed\.example\.test is on the opt-out list/);

  root = mkdtempSync(join(tmpdir(), 'late-cluster-bot-repost-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(join(root, 'show.config.json'), JSON.stringify({ bluesky: { handle: SHOW_HANDLE, did: SHOW, repostAuthors: [OWNER] } }));
  r = await run(['repost', SUBJECT], { root });
  assert.equal(r.code, 1);
  assert.match(r.err, /cannot read the opt-out list/);
});

test('a post the AppView does not have is refused', async (t) => {
  const root = repo(t);
  const r = await run(['repost', SUBJECT], { root, fetch: fakePds(routes({ post: null })) });
  assert.equal(r.code, 1);
  assert.match(r.err, /post not found: at:\/\/did:plc:ownerinvented\/app\.bsky\.feed\.post\/3lpilotpost/);
});

test('--undo, dry run: finds the repost and says what would be deleted, sending nothing', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes({ reposts: [otherRepost, existingRepost] }));
  const r = await run(['repost', URL_1, '--undo'], { root, fetch });
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(calls(fetch), ['GET com.atproto.identity.resolveHandle', 'GET com.atproto.repo.listRecords']);
  assert.match(r.out, /^DRY RUN: nothing was sent\. Add --live to take the repost back\./);
  assert.match(r.out, /Repost: {3}at:\/\/did:plc:showrepost\/app\.bsky\.feed\.repost\/3lold \(cid bafyreioldrepost\)/);
  assert.match(r.out, /POST com\.atproto\.repo\.deleteRecord app\.bsky\.feed\.repost\/3lold with swapRecord bafyreioldrepost/);

  const none = await run(['repost', URL_1, '--undo'], { root, fetch: fakePds(routes({ reposts: [otherRepost] })) });
  assert.match(none.out, /Repost: {3}none among the account's last 1 reposts; --live would find nothing to undo/);
});

test('--undo, live: deletes the account\'s repost of that subject with swapRecord, and logs it', async (t) => {
  // Taking a repost back needs no permission: it works even after the author leaves the list.
  const root = repo(t, { authors: [SHOW] });
  const fetch = fakePds(routes({ reposts: [otherRepost, existingRepost] }));
  const r = await run(['repost', SUBJECT, '--undo', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(calls(fetch), ['POST com.atproto.server.createSession', 'GET com.atproto.repo.listRecords', 'POST com.atproto.repo.deleteRecord']);
  assert.deepEqual(fetch.requests.at(-1).body, { repo: SHOW, collection: 'app.bsky.feed.repost', rkey: '3lold', swapRecord: 'bafyreioldrepost' });
  assert.match(r.out, /Took back the repost of .*\n {2}deleted: at:\/\/did:plc:showrepost\/app\.bsky\.feed\.repost\/3lold/);
  const [line] = readFileSync(join(root, 'data/bot/reposts.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  assert.deepEqual(line, { at: FIXED_NOW.toISOString(), action: 'undo', subject: { uri: SUBJECT, cid: POST_CID }, repost: existingRepost.uri });
});

test('--undo, live: no repost means nothing to undo and no write', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes({ reposts: [otherRepost] }));
  const r = await run(['repost', SUBJECT, '--undo', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.ok(!calls(fetch).includes('POST com.atproto.repo.deleteRecord'));
  assert.match(r.out, /has no repost of .*\. Nothing to undo; nothing was written\./);
  assert.equal(existsSync(join(root, 'data')), false);
});

test('live: missing credentials, or the wrong account, stop before any write', async (t) => {
  const root = repo(t);
  let r = await run(['repost', SUBJECT, '--live'], { root, env: {} });
  assert.equal(r.code, 1);
  assert.match(r.err, /--live needs BSKY_APP_PASSWORD in the environment/);
  assert.equal(r.fetch.calls.length, 0);

  for (const extra of [[], ['--undo']]) {
    const fetch = fakePds(routes({ did: 'did:plc:someoneelse' }));
    r = await run(['repost', SUBJECT, '--live', ...extra], { root, env: ENV, fetch });
    assert.equal(r.code, 1);
    assert.match(r.err, /refusing: logged in as did:plc:someoneelse, but bluesky\.did in show\.config\.json is did:plc:showrepost/);
    assert.deepEqual(calls(fetch), ['POST com.atproto.server.createSession']);
  }
});

test('usage: one post, no text; help lists the command', async (t) => {
  const root = repo(t);
  assert.equal((await run(['repost'], { root })).code, 2);
  assert.equal((await run(['repost', SUBJECT, SUBJECT], { root })).code, 2);
  const text = await run(['repost', SUBJECT, '--text', 'hi'], { root });
  assert.equal(text.code, 2);
  assert.match(text.err, /a repost carries no text/);
  const help = await run(['help'], { root });
  assert.match(help.out, /repost <post> \[--live\] \[--undo\]/);
});
