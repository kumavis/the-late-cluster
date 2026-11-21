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
 * A fake PDS. `routes` maps an NSID to (req) => [status, body], or to a Response. Records every request
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
    const result = handler ? await handler(req) : [501, { error: 'NotImplemented', message: nsid }];
    if (result instanceof Response) return result; // e.g. raw bytes for getBlob
    const [status, data] = result;
    return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });
  };
  fn.requests = requests;
  return fn;
}

/** A minimal PNG: the signature and an IHDR chunk, padded to `size` bytes. Enough for a header parser. */
export function pngBytes(width, height, size = 64) {
  const b = Buffer.alloc(Math.max(size, 33));
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(b, 0);
  b.writeUInt32BE(13, 8);
  b.write('IHDR', 12, 'latin1');
  b.writeUInt32BE(width, 16);
  b.writeUInt32BE(height, 20);
  b.set([8, 6, 0, 0, 0], 24);
  return b;
}

/** A minimal JPEG: SOI, an APP0 segment, a SOF0 frame header, EOI. */
export function jpegBytes(width, height) {
  const app0 = Buffer.from([0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00]);
  const sof = Buffer.alloc(19);
  sof.set([0xff, 0xc0, 0x00, 0x11, 0x08]);
  sof.writeUInt16BE(height, 5);
  sof.writeUInt16BE(width, 7);
  sof[9] = 3;
  return Buffer.concat([Buffer.from([0xff, 0xd8]), app0, sof, Buffer.from([0xff, 0xd9])]);
}
