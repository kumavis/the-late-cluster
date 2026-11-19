// The show's opt-out list, owned by the scraper: packages/scraper/config/optout.json,
// { "accounts": [ "<handle or DID>" | { "did"?, "handle"? }, ... ] }. The list is absolute, so
// a list that cannot be read is an error, never an empty list.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { BotError } from './errors.mjs';

export const OPTOUT_PATH = 'packages/scraper/config/optout.json';

export const normHandle = (h) => String(h ?? '').trim().replace(/^@/, '').toLowerCase();

export function loadOptOut(root) {
  const path = join(root, OPTOUT_PATH);
  let data;
  try { data = JSON.parse(readFileSync(path, 'utf8')); } catch (e) {
    throw new BotError(`cannot read the opt-out list ${OPTOUT_PATH} (${e.code ?? e.message}); refusing to contact anyone without it`);
  }
  if (!Array.isArray(data?.accounts)) throw new BotError(`${OPTOUT_PATH}: "accounts" must be an array; refusing to contact anyone without it`);
  const dids = new Set();
  const handles = new Set();
  for (const entry of data.accounts) {
    const values = typeof entry === 'string' ? [entry] : [entry?.did, entry?.handle];
    for (const raw of values) {
      const v = typeof raw === 'string' ? raw.trim() : '';
      if (!v) continue;
      if (v.startsWith('did:')) dids.add(v);
      else handles.add(normHandle(v));
    }
  }
  return {
    path: OPTOUT_PATH,
    has: ({ did, handle } = {}) => Boolean((did && dids.has(did)) || (handle && handles.has(normHandle(handle)))),
  };
}
