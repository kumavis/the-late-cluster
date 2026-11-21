// Settings come from the environment first, then packages/bot/bot.config.json, then the repo's
// show.config.json (the show-wide settings: siteUrl, and bluesky.handle / bluesky.did, the
// show's account; bluesky.repostAuthors, the DIDs `repost` may repost; bluesky.profile, the bio
// `profile` writes and the handles it may credit). The one secret, BSKY_APP_PASSWORD, comes only from the environment (locally
// the root `npm run bot` loads it from .secrets); it is never read from a file by this package.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BotError } from './errors.mjs';
import { DEFAULT_SERVICE, DEFAULT_USER_AGENT } from './atproto.mjs';

export const PACKAGE_DIR = fileURLToPath(new URL('..', import.meta.url));
export const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url));
export const CONFIG_PATH = fileURLToPath(new URL('../bot.config.json', import.meta.url));
export const SHOW_CONFIG_PATH = join(REPO_ROOT, 'show.config.json');
/** The profile picture `profile` sets, relative to the repo root, when bot.config.json names none. */
export const DEFAULT_AVATAR = 'brand/avatar.png';
/** Where `repost` reads a post's author, text and counts without logging in. */
export const DEFAULT_APPVIEW = 'https://public.api.bsky.app';

export function readConfigFile(path = CONFIG_PATH) {
  let text;
  try { text = readFileSync(path, 'utf8'); } catch (e) {
    if (e.code === 'ENOENT') return {};
    throw e;
  }
  try { return JSON.parse(text); } catch (e) {
    throw new BotError(`${path} is not valid JSON: ${e.message}`);
  }
}

export function loadSettings({ env = {}, configPath = CONFIG_PATH, showConfigPath = SHOW_CONFIG_PATH } = {}) {
  const file = readConfigFile(configPath);
  const show = readConfigFile(showConfigPath);
  const rawSite = env.SITE_URL || file.siteUrl || show.siteUrl || '';
  const envHandle = typeof env.BSKY_HANDLE === 'string' ? env.BSKY_HANDLE.trim().replace(/^@/, '') : '';
  const showHandle = typeof show.bluesky?.handle === 'string' ? show.bluesky.handle.trim().replace(/^@/, '') : '';
  return {
    siteUrl: rawSite ? normalizeSiteUrl(rawSite) : null,
    service: env.BSKY_PDS || file.service || DEFAULT_SERVICE,
    userAgent: env.BOT_USER_AGENT || file.userAgent || DEFAULT_USER_AGENT,
    langs: Array.isArray(file.langs) && file.langs.length ? file.langs : ['en'],
    avatar: typeof file.avatar === 'string' && file.avatar ? file.avatar : DEFAULT_AVATAR,
    handle: envHandle || showHandle || null,
    handleSource: envHandle ? 'BSKY_HANDLE' : showHandle ? 'show.config.json' : null,
    did: typeof show.bluesky?.did === 'string' && show.bluesky.did ? show.bluesky.did : null,
    hasPassword: Boolean(env.BSKY_APP_PASSWORD),
    appView: env.BSKY_APPVIEW || file.appView || DEFAULT_APPVIEW,
    // Left raw here; the commands that use them validate them, so a bad list fails loudly there.
    repostAuthors: show.bluesky?.repostAuthors,
    profile: show.bluesky?.profile,
    video: videoSettings(file.video),
    configPath,
  };
}

/** The video service (`video` in bot.config.json): its host and DID are configuration, not code. */
export const DEFAULT_VIDEO = Object.freeze({
  service: 'https://video.bsky.app', did: 'did:web:video.bsky.app', jobTimeoutMinutes: 20, pollSeconds: 3, stallSeconds: 120,
});

function videoSettings(raw = {}) {
  const v = { ...DEFAULT_VIDEO, ...(raw && typeof raw === 'object' ? raw : {}) };
  // https, or plain http to a loopback host only (a test's local server).
  if (typeof v.service !== 'string' || !/^(https:\/\/|http:\/\/(127\.0\.0\.1|localhost|\[::1\])(:\d+)?(\/|$))/.test(v.service)) {
    throw new BotError(`video.service in bot.config.json must be an https URL, got ${JSON.stringify(v.service)}`);
  }
  if (typeof v.did !== 'string' || !v.did.startsWith('did:')) throw new BotError(`video.did in bot.config.json must be a DID, got ${JSON.stringify(v.did)}`);
  for (const k of ['jobTimeoutMinutes', 'pollSeconds', 'stallSeconds']) {
    if (typeof v[k] !== 'number' || !(v[k] > 0)) throw new BotError(`video.${k} in bot.config.json must be a positive number`);
  }
  return v;
}

/** The site root with a trailing slash, so that episodes/<id>/ resolves under it
 *  (GitHub Pages project sites live under a path, e.g. https://user.github.io/repo/). */
export function normalizeSiteUrl(raw) {
  let u;
  try { u = new URL(raw); } catch { throw new BotError(`SITE_URL is not a URL: ${raw}`); }
  if (u.protocol !== 'https:') throw new BotError(`SITE_URL must be https: ${raw}`);
  if (u.search || u.hash) throw new BotError(`SITE_URL must not have a query or fragment: ${raw}`);
  if (!u.pathname.endsWith('/')) u.pathname += '/';
  return u.toString();
}

export function episodeUrl(siteUrl, id) {
  return new URL(`episodes/${id}/`, siteUrl).toString();
}
