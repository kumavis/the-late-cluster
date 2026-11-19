// `announce <ep> [--live] [--force]`: post a published episode with a link card.
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';
import { createClient } from '../atproto.mjs';
import { loadSettings } from '../config.mjs';
import { buildAnnouncement, checkThumbnail, sameUrl, urlsInPost } from '../compose.mjs';
import { imageMimeType, loadPublishedEpisode } from '../episodes.mjs';
import { BotError, UsageError } from '../errors.mjs';
import { LIST_RECORDS_MAX_LIMIT, POST_MAX_GRAPHEMES } from '../limits.mjs';

const POST_COLLECTION = 'app.bsky.feed.post';
/** How far back the duplicate check reads: pages of LIST_RECORDS_MAX_LIMIT posts. */
export const HISTORY_PAGES = 5;

export default {
  name: 'announce',
  summary: 'compose the announcement post for a published episode; dry run unless --live',
  usage: 'announce <ep> [--live] [--force]',
  options: {
    live: { type: 'boolean', default: false },
    force: { type: 'boolean', default: false },
    root: { type: 'string' },
  },
  rejected: {
    mention: 'announce never mentions accounts: a mention notifies people the show parodies. See README, "No mentions".',
    tag: 'announce never tags accounts or adds hashtags. See README, "No mentions".',
  },
  run,
};

async function run(ctx) {
  const { positionals, values, env, out, root, cwd, now, fetch, configPath } = ctx;
  if (positionals.length !== 1) throw new UsageError('usage: announce <ep> [--live] [--force]');
  const settings = loadSettings({ env, configPath });

  if (values.live) {
    const missing = ['BSKY_HANDLE', 'BSKY_APP_PASSWORD'].filter((k) => !env[k]);
    if (missing.length) {
      throw new BotError(`--live needs credentials in the environment: ${missing.join(' and ')} not set. Use an app password, never the account password.`);
    }
  }

  // Everything that can fail locally fails here, before any network call.
  const episode = loadPublishedEpisode(positionals[0], root);
  const bytes = readFileSync(episode.thumbnailPath);
  const mimeType = imageMimeType(bytes);
  checkThumbnail(bytes.length, mimeType);
  const placeholder = { $type: 'blob', ref: { $link: '<cid returned by uploadBlob>' }, mimeType, size: bytes.length };
  const draft = buildAnnouncement({ manifest: episode.manifest, siteUrl: settings.siteUrl, langs: settings.langs, now: now(), thumb: placeholder });
  const shown = (p) => relative(cwd, p) || p;

  if (!values.live) {
    const target = settings.handle ? `@${settings.handle.replace(/^@/, '')}` : '(BSKY_HANDLE not set)';
    out([
      'DRY RUN: nothing was sent. Add --live to post.',
      '',
      `Episode:   ${episode.id} (${shown(episode.manifestPath)})`,
      `URL:       ${draft.url}`,
      `Account:   ${target} on ${settings.service}`,
      `Thumbnail: ${shown(episode.thumbnailPath)} (${bytes.length} bytes, ${mimeType})`,
      `Text:      ${draft.stats.graphemes}/${POST_MAX_GRAPHEMES} graphemes, ${draft.stats.bytes} bytes`,
      '',
      'With --live the bot would:',
      `  1. POST com.atproto.server.createSession as ${target}`,
      `  2. GET  com.atproto.repo.listRecords (up to ${HISTORY_PAGES * LIST_RECORDS_MAX_LIMIT} own posts) and stop if this URL was already posted${values.force ? ' (--force: post anyway)' : ''}`,
      `  3. POST com.atproto.repo.uploadBlob with the thumbnail`,
      `  4. POST com.atproto.repo.createRecord to ${POST_COLLECTION} with this record`,
      '     (thumb.ref comes from step 3, createdAt is set at posting time):',
      '',
      JSON.stringify(draft.record, null, 2),
    ].join('\n'));
    return 0;
  }

  const client = createClient({ service: settings.service, userAgent: settings.userAgent, fetch });
  const session = await client.createSession({ identifier: env.BSKY_HANDLE.replace(/^@/, ''), password: env.BSKY_APP_PASSWORD });
  out(`Logged in as @${session.handle} (${session.did}) on ${client.service}`);

  const previous = await findPreviousAnnouncement(client, session.did, draft.url);
  if (previous) {
    if (!values.force) {
      throw new BotError(`already announced: ${previous.uri} links ${draft.url}. Use --force to post it again.`);
    }
    out(`Already announced at ${previous.uri}; posting again because of --force.`);
  }

  const blob = await client.uploadBlob(bytes, mimeType);
  out(`Uploaded thumbnail (${bytes.length} bytes)`);
  const { record } = buildAnnouncement({ manifest: episode.manifest, siteUrl: settings.siteUrl, langs: settings.langs, now: now(), thumb: blob });
  const created = await client.createRecord({ repo: session.did, collection: POST_COLLECTION, record });
  const rkey = created.uri.split('/').pop();
  out(`Posted ${created.uri}\n  https://bsky.app/profile/${session.handle}/post/${rkey}`);
  return 0;
}

export async function findPreviousAnnouncement(client, repo, url, pages = HISTORY_PAGES) {
  let cursor;
  for (let page = 0; page < pages; page++) {
    const res = await client.listRecords({ repo, collection: POST_COLLECTION, limit: LIST_RECORDS_MAX_LIMIT, cursor });
    for (const rec of res?.records ?? []) {
      const urls = urlsInPost(rec.value);
      if ([...urls].some((u) => sameUrl(u, url)) || (rec.value?.text ?? '').includes(url)) return rec;
    }
    cursor = res?.cursor;
    if (!cursor || !res.records?.length) break;
  }
  return null;
}
