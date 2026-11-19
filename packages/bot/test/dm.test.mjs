// Every message, handle and DID here is invented. No real conversation appears in these fixtures.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { main } from '../src/cli.mjs';
import { CHAT_PROXY } from '../src/atproto.mjs';
import { checkMessages, parseMessages } from '../src/commands/dm.mjs';
import { capture, FIXED_NOW, fakePds, NO_CONFIG, noNetwork } from './helpers.mjs';

const SHOW = 'did:plc:showdm';
const GUEST = 'did:plc:guestinvented';
const GUEST_HANDLE = 'guest.example.test';
const PASSWORD = 'abcd-efgh-ijkl-mnop';
const TOKEN = 'secret-access-jwt';
const REFRESH = 'secret-refresh-jwt';
const ENV = { BSKY_APP_PASSWORD: PASSWORD };
const QUESTIONS = 'What did you build this week?\n\n---\n\nAnd what broke first?\nTake your time.\n';
const WRITES = ['sendMessage', 'updateRead', 'updateAllRead', 'acceptConvo', 'leaveConvo', 'muteConvo', 'unmuteConvo', 'deleteMessageForSelf', 'addReaction', 'removeReaction', 'createRecord', 'putRecord', 'deleteRecord', 'uploadBlob'];

function repo(t, { optout = { $comment: 'test', accounts: [] } } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'late-cluster-bot-dm-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(join(root, 'show.config.json'), JSON.stringify({ siteUrl: '', bluesky: { handle: 'show.example.test', did: SHOW } }));
  mkdirSync(join(root, 'packages/scraper/config'), { recursive: true });
  if (optout) writeFileSync(join(root, 'packages/scraper/config/optout.json'), JSON.stringify(optout));
  writeFileSync(join(root, 'questions.txt'), QUESTIONS);
  return root;
}

async function run(argv, { root, env = {}, fetch = noNetwork() }) {
  const stdout = capture();
  const stderr = capture();
  const code = await main(argv, { env, fetch, stdout, stderr, root, cwd: root, now: () => FIXED_NOW, configPath: NO_CONFIG });
  return { code, out: stdout.text, err: stderr.text, fetch };
}

const convo = { id: 'convo-1', rev: 'r1', members: [{ did: SHOW, handle: 'show.example.test' }, { did: GUEST, handle: GUEST_HANDLE }] };

function routes({ did = SHOW, send } = {}) {
  let n = 0;
  return {
    'com.atproto.server.createSession': () => [200, { accessJwt: TOKEN, refreshJwt: REFRESH, handle: 'show.example.test', did }],
    'com.atproto.identity.resolveHandle': () => [200, { did: GUEST }],
    'chat.bsky.convo.getConvoForMembers': () => [200, { convo }],
    'chat.bsky.convo.listConvos': () => [200, { convos: [{ id: 'convo-other', members: [{ did: SHOW }, { did: 'did:plc:someoneelse' }] }, convo] }],
    'chat.bsky.convo.sendMessage': send ?? ((req) => {
      n++;
      return [200, { id: `msg-${n}`, rev: `rev-${n}`, text: req.body.message.text, sender: { did: SHOW }, sentAt: `2026-11-20T03:00:0${n}.000Z` }];
    }),
    'chat.bsky.convo.getMessages': () => [200, { messages: [
      { $type: 'chat.bsky.convo.defs#messageView', id: 'm3', rev: '3', text: 'An invented answer.\nSecond line.', sender: { did: GUEST }, sentAt: '2026-11-20T05:00:00.000Z' },
      { $type: 'chat.bsky.convo.defs#deletedMessageView', id: 'm2', rev: '2', sender: { did: GUEST }, sentAt: '2026-11-20T04:00:00.000Z' },
      { $type: 'chat.bsky.convo.defs#messageView', id: 'm1', rev: '1', text: 'An invented question?', sender: { did: SHOW }, sentAt: '2026-11-20T03:00:00.000Z' },
    ] }],
  };
}

const names = (fetch) => fetch.requests.map((q) => q.nsid);

test('parseMessages splits on --- lines and trims only blank lines at the edges', () => {
  assert.deepEqual(parseMessages(QUESTIONS), ['What did you build this week?', 'And what broke first?\nTake your time.']);
  assert.deepEqual(parseMessages('one\r\n---\r\n  two, indented  \r\n'), ['one', '  two, indented  ']);
  assert.deepEqual(parseMessages('a --- b'), ['a --- b']);
});

test('dry run: prints the recipient and each message with its grapheme count, and makes no request', async (t) => {
  const root = repo(t);
  const r = await run(['dm', 'send', '@Guest.Example.Test', '--file', 'questions.txt'], { root, env: ENV });
  assert.equal(r.code, 0, r.err);
  assert.equal(r.fetch.calls.length, 0);
  assert.match(r.out, /^DRY RUN: nothing was sent\. Add --live to send\./);
  assert.match(r.out, /To: {7}@guest\.example\.test \(not on the opt-out list\)/);
  assert.match(r.out, /--- 1\/2 \(29\/1000 graphemes, 29 bytes\)\nWhat did you build this week\?\n/);
  assert.match(r.out, /--- 2\/2 \(37\/1000 graphemes, 37 bytes\)\nAnd what broke first\?\nTake your time\.\n/);
  assert.ok(!r.out.includes(PASSWORD));
});

test('over-limit, empty, @mention and link messages are refused, naming the message, before any request', async (t) => {
  const root = repo(t);
  const cases = [
    ['x'.repeat(1001), /message 1 of 1 is 1001 graphemes; direct messages are limited to 1000/],
    ['é'.repeat(999) + '😀', null], // exactly 1000 graphemes is allowed
    ['👩‍👩‍👧‍👦'.repeat(500), /message 1 of 1 is 12500 bytes; direct messages are limited to 10000/],
    ['first\n---\n\n---\nthird', /message 2 of 3 is empty/],
    ['---\nsecond', /message 1 of 2 is empty/],
    ['', /message 1 of 1 is empty/],
    ['ok\n---\nthanks @someone.bsky.social!', /message 2 of 2 contains "@someone\.bsky\.social", which reads as a mention/],
    ['ask @larry about it', /reads as a mention/],
    ['see https://example.test/page', /contains "https:\/\/example\.test\/page", which reads as a link/],
    ['see www.example.test', /reads as a link/],
    ['see example.test/episodes/1', /reads as a link/],
  ];
  for (const [text, re] of cases) {
    writeFileSync(join(root, 'm.txt'), text);
    for (const live of [false, true]) {
      const fetch = fakePds(routes());
      const r = await run(['dm', 'send', GUEST, '--file', 'm.txt', ...(live ? ['--live'] : [])], { root, env: ENV, fetch });
      if (!re) { assert.equal(r.code, 0, r.err); continue; }
      assert.equal(r.code, 1, text.slice(0, 40));
      assert.match(r.err, re);
      assert.equal(fetch.requests.length, 0);
    }
  }
  assert.doesNotThrow(() => checkMessages(['mail me at name@example.test? no, that is an email, not a tag']));
});

test('an opted-out recipient is refused before any request, by DID or by handle, in any entry form', async (t) => {
  for (const [accounts, who] of [
    [[GUEST], GUEST],
    [['@Guest.Example.Test'], GUEST_HANDLE],
    [[{ did: GUEST }], GUEST],
    [[{ handle: GUEST_HANDLE }], `@${GUEST_HANDLE}`],
  ]) {
    const root = repo(t, { optout: { accounts } });
    for (const argv of [['dm', 'send', who, '--file', 'questions.txt'], ['dm', 'send', who, '--file', 'questions.txt', '--live'], ['dm', 'read', who]]) {
      const fetch = fakePds(routes());
      const r = await run(argv, { root, env: ENV, fetch });
      assert.equal(r.code, 1, argv.join(' '));
      assert.match(r.err, /is on the opt-out list \(packages\/scraper\/config\/optout\.json\)/);
      assert.equal(fetch.requests.length, 0);
    }
  }
});

test('live: an opted-out handle given as a DID is caught after resolving, before any message', async (t) => {
  const root = repo(t, { optout: { accounts: [GUEST_HANDLE] } });
  const fetch = fakePds(routes());
  const r = await run(['dm', 'send', GUEST, '--file', 'questions.txt', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /opt-out list/);
  assert.ok(!names(fetch).includes('chat.bsky.convo.sendMessage'));
});

test('a missing or broken opt-out list refuses rather than assuming nobody opted out', async (t) => {
  const root = repo(t, { optout: null });
  const r = await run(['dm', 'send', GUEST, '--file', 'questions.txt'], { root });
  assert.equal(r.code, 1);
  assert.match(r.err, /cannot read the opt-out list/);
});

test('live: resolves the handle, opens the conversation, sends in order, logs each, proxy header only on chat calls', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes());
  const r = await run(['dm', 'send', GUEST_HANDLE, '--file', 'questions.txt', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(names(fetch), [
    'com.atproto.server.createSession',
    'com.atproto.identity.resolveHandle',
    'chat.bsky.convo.getConvoForMembers',
    'chat.bsky.convo.sendMessage',
    'chat.bsky.convo.sendMessage',
  ]);
  for (const q of fetch.requests) {
    if (q.nsid.startsWith('chat.')) {
      assert.equal(q.headers['atproto-proxy'], CHAT_PROXY);
      assert.equal(q.headers.authorization, `Bearer ${TOKEN}`);
    } else assert.equal(q.headers['atproto-proxy'], undefined, q.nsid);
  }
  const [, resolveReq, getConvo, s1, s2] = fetch.requests;
  assert.equal(resolveReq.url.searchParams.get('handle'), GUEST_HANDLE);
  assert.equal(resolveReq.headers.authorization, undefined);
  assert.deepEqual(getConvo.url.searchParams.getAll('members'), [GUEST]);
  assert.deepEqual(s1.body, { convoId: 'convo-1', message: { text: 'What did you build this week?' } });
  assert.deepEqual(s2.body, { convoId: 'convo-1', message: { text: 'And what broke first?\nTake your time.' } });
  assert.ok(!('facets' in s1.body.message) && !('facets' in s2.body.message));
  assert.match(r.out, /Sent 1\/2: id msg-1 at 2026-11-20T03:00:01\.000Z/);
  assert.match(r.out, /Sent 2\/2: id msg-2 at 2026-11-20T03:00:02\.000Z/);

  const logPath = join(root, 'data/bot/dm', GUEST, 'sent.jsonl');
  const log = readFileSync(logPath, 'utf8');
  const lines = log.trim().split('\n').map((l) => JSON.parse(l));
  assert.deepEqual(lines.map((l) => [l.index, l.id, l.to, l.text]), [
    [1, 'msg-1', GUEST, 'What did you build this week?'],
    [2, 'msg-2', GUEST, 'And what broke first?\nTake your time.'],
  ]);
  for (const secret of [PASSWORD, TOKEN, REFRESH]) {
    assert.ok(!log.includes(secret), `log leaks ${secret}`);
    assert.ok(!r.out.includes(secret) && !r.err.includes(secret), `output leaks ${secret}`);
  }
});

test('live: chat calls go to the PDS named in the DID document', async (t) => {
  const root = repo(t);
  const r0 = routes();
  r0['com.atproto.server.createSession'] = () => [200, { accessJwt: TOKEN, handle: 'show.example.test', did: SHOW,
    didDoc: { service: [{ id: '#atproto_pds', type: 'AtprotoPersonalDataServer', serviceEndpoint: 'https://pds.example.test' }] } }];
  const fetch = fakePds(r0);
  const r = await run(['dm', 'send', GUEST, '--file', 'questions.txt', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  for (const q of fetch.requests) assert.equal(q.url.origin, q.nsid.startsWith('chat.') ? 'https://pds.example.test' : 'https://bsky.social');
});

test('live: stops at the first failed message, says how many were sent, and names both causes with the server error', async (t) => {
  const root = repo(t);
  writeFileSync(join(root, 'three.txt'), 'one\n---\ntwo\n---\nthree');
  let n = 0;
  const fetch = fakePds(routes({ send: (req) => {
    n++;
    if (n === 2) return [400, { error: 'InvalidRequest', message: 'recipient has disabled incoming messages' }];
    return [200, { id: `msg-${n}`, sentAt: '2026-11-20T03:00:00.000Z', text: req.body.message.text }];
  } }));
  const r = await run(['dm', 'send', GUEST, '--file', 'three.txt', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 1);
  assert.equal(names(fetch).filter((x) => x === 'chat.bsky.convo.sendMessage').length, 2);
  assert.match(r.err, /message 2 of 3 was not sent; 1 sent before it/);
  assert.match(r.err, /server error InvalidRequest/);
  assert.match(r.err, /Allow access to your direct messages/);
  assert.match(r.err, /does not accept messages from this account/);
  const log = readFileSync(join(root, 'data/bot/dm', GUEST, 'sent.jsonl'), 'utf8').trim().split('\n');
  assert.equal(log.length, 1);
});

test('live: an app password without DM access is reported with the server error name, before any message', async (t) => {
  const root = repo(t);
  const r0 = routes();
  r0['chat.bsky.convo.getConvoForMembers'] = () => [401, { error: 'AuthRequired', message: 'Bad token scope' }];
  const fetch = fakePds(r0);
  const r = await run(['dm', 'send', GUEST, '--file', 'questions.txt', '--live'], { root, env: ENV, fetch });
  assert.equal(r.code, 1);
  assert.match(r.err, /chat\.bsky\.convo\.getConvoForMembers was refused: HTTP 401, server error AuthRequired/);
  assert.match(r.err, /lacks direct-message access/);
  assert.match(r.err, /does not accept messages/);
  assert.ok(!names(fetch).includes('chat.bsky.convo.sendMessage'));
  assert.ok(!r.err.includes(TOKEN) && !r.err.includes(PASSWORD));
});

test('live: a DID mismatch refuses before any chat call', async (t) => {
  const root = repo(t);
  for (const argv of [['dm', 'send', GUEST_HANDLE, '--file', 'questions.txt', '--live'], ['dm', 'read', GUEST_HANDLE]]) {
    const fetch = fakePds(routes({ did: 'did:plc:notourshow' }));
    const r = await run(argv, { root, env: ENV, fetch });
    assert.equal(r.code, 1);
    assert.match(r.err, /refusing: logged in as did:plc:notourshow, but bluesky\.did in show\.config\.json is did:plc:showdm/);
    assert.deepEqual(names(fetch), ['com.atproto.server.createSession']);
  }
});

test('--live without credentials names what is missing and makes no request', async (t) => {
  const root = repo(t);
  const r = await run(['dm', 'send', GUEST, '--file', 'questions.txt', '--live'], { root, env: {} });
  assert.equal(r.code, 1);
  assert.match(r.err, /--live needs BSKY_APP_PASSWORD/);
  assert.equal(r.fetch.calls.length, 0);
  const rr = await run(['dm', 'read', GUEST], { root, env: {} });
  assert.equal(rr.code, 1);
  assert.match(rr.err, /dm read .* needs BSKY_APP_PASSWORD/);
  assert.equal(rr.fetch.calls.length, 0);
});

test('dm read: finds the conversation by listing, prints oldest first, and makes no write of any kind', async (t) => {
  const root = repo(t);
  const fetch = fakePds(routes());
  const r = await run(['dm', 'read', GUEST_HANDLE], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.deepEqual(names(fetch), [
    'com.atproto.server.createSession',
    'com.atproto.identity.resolveHandle',
    'chat.bsky.convo.listConvos',
    'chat.bsky.convo.getMessages',
  ]);
  for (const q of fetch.requests) {
    assert.ok(!WRITES.some((w) => q.nsid.endsWith(`.${w}`)), `write call ${q.nsid}`);
    if (q.nsid !== 'com.atproto.server.createSession') assert.equal(q.method, 'GET', q.nsid);
    assert.equal(q.headers['atproto-proxy'], q.nsid.startsWith('chat.') ? CHAT_PROXY : undefined);
  }
  assert.ok(!names(fetch).includes('chat.bsky.convo.getConvoForMembers'), 'reading never creates a conversation');
  assert.equal(fetch.requests.at(-1).url.searchParams.get('convoId'), 'convo-1');
  const lines = r.out.split('\n');
  const i = lines.findIndex((l) => l.startsWith('2026-11-20T03:00:00.000Z'));
  assert.match(lines[i], /show {2}An invented question\?/);
  assert.match(lines[i + 1], /^2026-11-20T04:00:00\.000Z {2}them {2}\(deleted\)/);
  assert.match(lines[i + 2], /^2026-11-20T05:00:00\.000Z {2}them {2}An invented answer\./);
  assert.match(lines[i + 3], /^ {32}Second line\./);
  assert.match(r.out, /Nothing was marked read/);
  assert.equal(existsSync(join(root, 'data')), false, 'reading writes no files');
});

test('dm read --json prints one object per line; --limit follows the cursor and stops', async (t) => {
  const root = repo(t);
  const r0 = routes();
  r0['chat.bsky.convo.getMessages'] = (req) => {
    const page = req.url.searchParams.get('cursor') ?? 'p0';
    const k = Number(page.slice(1));
    const limit = Number(req.url.searchParams.get('limit'));
    const msgs = Array.from({ length: limit }, (_, j) => ({ $type: 'chat.bsky.convo.defs#messageView', id: `m${k}-${j}`, text: `invented ${k}-${j}`, sender: { did: GUEST }, sentAt: `2026-11-2${9 - k}T00:00:${String(59 - j).padStart(2, '0')}.000Z` }));
    return [200, { messages: msgs, cursor: `p${k + 1}` }];
  };
  const fetch = fakePds(r0);
  const r = await run(['dm', 'read', GUEST, '--limit', '150', '--json'], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  const gets = fetch.requests.filter((q) => q.nsid === 'chat.bsky.convo.getMessages');
  assert.deepEqual(gets.map((q) => q.url.searchParams.get('limit')), ['100', '50']);
  const rows = r.out.trim().split('\n').filter((l) => l.startsWith('{')).map((l) => JSON.parse(l));
  assert.equal(rows.length, 150);
  assert.equal(rows[0].id, 'm1-49', 'oldest first');
  assert.equal(rows.at(-1).id, 'm0-0');
  assert.deepEqual(Object.keys(rows[0]), ['id', 'sentAt', 'from', 'sender', 'deleted', 'text']);
});

test('dm read with no existing conversation says so and creates nothing', async (t) => {
  const root = repo(t);
  const r0 = routes();
  r0['chat.bsky.convo.listConvos'] = () => [200, { convos: [] }];
  const fetch = fakePds(r0);
  const r = await run(['dm', 'read', GUEST], { root, env: ENV, fetch });
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /No conversation with did:plc:guestinvented .*Nothing was created\./);
  assert.ok(!names(fetch).some((n) => n.endsWith('getConvoForMembers') || n.endsWith('getMessages')));
});

test('usage errors exit 2; help lists dm', async (t) => {
  const root = repo(t);
  for (const argv of [['dm'], ['dm', 'send'], ['dm', 'shout', GUEST], ['dm', 'read', GUEST, '--live'], ['dm', 'send', GUEST, '--limit', '5', '--file', 'questions.txt'],
    ['dm', 'send', GUEST], ['dm', 'send', 'not a handle', '--file', 'questions.txt'], ['dm', 'read', GUEST, '--limit', '0'], ['dm', 'send', GUEST, '--mention', 'x']]) {
    const r = await run(argv, { root, env: ENV });
    assert.equal(r.code, 2, argv.join(' '));
    assert.equal(r.fetch.calls.length, 0);
  }
  assert.match((await run(['help'], { root })).out, /dm send <handle-or-did> --file <path> \[--live\]/);
});
