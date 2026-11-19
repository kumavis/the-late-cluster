import { copyFileSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const FIXTURE_ROOT = fileURLToPath(new URL('./fixtures/repo', import.meta.url));
export const FIXTURE_THUMB = join(FIXTURE_ROOT, 'dist/episodes/001-pilot/thumbnail.jpg');
export const NO_CONFIG = join(FIXTURE_ROOT, 'no-such-bot.config.json');
export const FIXED_NOW = new Date('2026-11-20T03:00:00.000Z');

export function manifest(overrides = {}) {
  return {
    id: '001-pilot', number: 1, slug: 'pilot', title: 'Pilot',
    description: 'A fixture episode.', airDate: '2026-11-13', status: 'published',
    rundown: ['cold-open'], build: { sourceHash: 'abc', studio: 'def' },
    ...overrides,
  };
}

/** A throwaway repo root holding one built episode. */
export function tempRepo(m = manifest(), { thumbnail = FIXTURE_THUMB, dirId } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'late-cluster-bot-'));
  const dir = join(root, 'dist/episodes', dirId ?? m.id ?? '001-pilot');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'episode.json'), typeof m === 'string' ? m : JSON.stringify(m));
  if (thumbnail === null) return root;
  if (Buffer.isBuffer(thumbnail)) writeFileSync(join(dir, 'thumbnail.jpg'), thumbnail);
  else copyFileSync(thumbnail, join(dir, 'thumbnail.jpg'));
  return root;
}

export function capture() {
  let text = '';
  return { write: (s) => { text += s; }, get text() { return text; } };
}

/** A fetch that fails the test if anything touches the network. */
export function noNetwork() {
  const calls = [];
  const fn = async (url) => { calls.push(url); throw new Error(`unexpected network call: ${url}`); };
  fn.calls = calls;
  return fn;
}

/**
 * A fake PDS. `routes` maps an NSID to (req) => [status, body]. Records every request
 * as { nsid, method, url, headers, body } with JSON bodies parsed.
 */
export function fakePds(routes) {
  const requests = [];
  const fn = async (url, init = {}) => {
    const u = new URL(url);
    const nsid = u.pathname.replace('/xrpc/', '');
    const headers = init.headers ?? {};
    let body = init.body;
    if (typeof body === 'string' && headers['content-type'] === 'application/json') body = JSON.parse(body);
    const req = { nsid, method: init.method ?? 'GET', url: u, headers, body };
    requests.push(req);
    const handler = routes[nsid];
    const [status, data] = handler ? handler(req) : [501, { error: 'NotImplemented', message: nsid }];
    return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });
  };
  fn.requests = requests;
  return fn;
}
