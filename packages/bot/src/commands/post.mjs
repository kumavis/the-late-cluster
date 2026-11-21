// `post <ep> --video <file.mp4> --text-file <file> [--alt-file <file>] [--captions <file.vtt>]
//  [--lang en] [--aspect <w>:<h>] [--upload-only] [--live]`: the episode's video as a top-level post.
//
// Nothing is posted unless every step before the post succeeded. The video is streamed from disk,
// never read into memory. A finished upload is kept under data/bot/video-uploads/, keyed by the
// file's SHA-256, so a later run of the same file reuses it instead of uploading again.
import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, join, relative, resolve } from 'node:path';
import { createClient, XrpcError } from '../atproto.mjs';
import { loadSettings } from '../config.mjs';
import { resolveEpisodeId } from '../episodes.mjs';
import { BotError, UsageError } from '../errors.mjs';
import { CAPTION_MAX_BYTES, LIST_RECORDS_MAX_LIMIT, POST_MAX_BYTES, POST_MAX_GRAPHEMES, POST_MAX_LANGS, VIDEO_MAX_BYTES, VIDEO_MAX_SECONDS } from '../limits.mjs';
import { graphemeLength, LINK_RE, MENTION_RE, utf8Length } from '../richtext.mjs';
import {
  buildVideoEmbed, checkDuration, checkVideoFile, isAlreadyExists, jobBlob, loadCaptions, parseAspect, readJobStatus, sha256File, VIDEO_MIME_TYPE,
} from '../video.mjs';

const USAGE = 'post <ep> --video <file.mp4> --text-file <file> [--alt-file <file>] [--captions <file.vtt>] [--lang en] [--aspect <w>:<h>] [--upload-only] [--live]';
const POST_COLLECTION = 'app.bsky.feed.post';
/** Finished (and pending) uploads, by the file's SHA-256, relative to the repo root (gitignored by /data/). */
export const UPLOADS_DIR = 'data/bot/video-uploads';
export const POST_LOG = 'data/bot/posts.jsonl';
const LANG_RE = /^[a-z]{2,3}(-[a-z0-9]{2,8})*$/i;
/** The service auth token for the upload lives this long (the tutorial's 30 minutes). */
const UPLOAD_TOKEN_SECONDS = 30 * 60;

export default {
  name: 'post',
  summary: 'post an episode\'s video, with text, alt text and captions; dry run unless --live',
  usage: USAGE,
  options: {
    video: { type: 'string' },
    'text-file': { type: 'string' },
    'alt-file': { type: 'string' },
    captions: { type: 'string' },
    lang: { type: 'string', multiple: true },
    aspect: { type: 'string' },
    'upload-only': { type: 'boolean', default: false },
    live: { type: 'boolean', default: false },
    root: { type: 'string' },
  },
  rejected: {
    mention: 'post never mentions anyone. The only place a mention may go is a reply: see `reply --episode`.',
    tag: 'post never tags anyone. The only place a mention may go is a reply: see `reply --episode`.',
  },
  run,
};

/** Post text: at most 300 graphemes and 3000 bytes, with no mention and no link. */
export function checkPostText(text, what = 'the post text') {
  const graphemes = graphemeLength(text);
  const bytes = utf8Length(text);
  if (graphemes > POST_MAX_GRAPHEMES) throw new BotError(`${what} is ${graphemes} graphemes; Bluesky posts are limited to ${POST_MAX_GRAPHEMES}`);
  if (bytes > POST_MAX_BYTES) throw new BotError(`${what} is ${bytes} bytes; Bluesky posts are limited to ${POST_MAX_BYTES}`);
  return { graphemes, bytes };
}

function checkNoMentionOrLink(text, what) {
  const m = text.match(MENTION_RE);
  if (m) throw new BotError(`${what} contains "${m[2].replace(/[.:_-]+$/, '')}", which reads as a mention. A post never mentions anyone; the tagged reply (reply --episode) is the only place a mention may go.`);
  const l = text.match(LINK_RE);
  if (l) throw new BotError(`${what} contains "${l[0]}", which reads as a link; this post carries no links`);
}

export function checkLangs(langs) {
  if (langs.length > POST_MAX_LANGS) throw new BotError(`at most ${POST_MAX_LANGS} --lang values are allowed, got ${langs.length}`);
  for (const l of langs) if (!LANG_RE.test(l)) throw new BotError(`--lang ${JSON.stringify(l)} is not a language tag (like en or pt-BR)`);
  return langs;
}

/** A text file as the post will carry it: line endings normalised, surrounding blank space trimmed. */
export function readTextFile(path, what) {
  if (!existsSync(path) || !statSync(path).isFile()) throw new BotError(`${what} ${path} does not exist`);
  return readFileSync(path, 'utf8').replace(/\r\n?/g, '\n').trim();
}

const blobCid = (b) => b?.ref?.$link ?? b?.cid ?? null;

function readUpload(path) {
  if (!existsSync(path)) return null;
  try { return JSON.parse(readFileSync(path, 'utf8')); } catch (e) {
    throw new BotError(`the stored upload ${path} is not valid JSON (${e.message}); remove it to upload again`);
  }
}

function saveUpload(path, entry) {
  mkdirSync(join(path, '..'), { recursive: true });
  writeFileSync(path, `${JSON.stringify(entry, null, 2)}\n`);
}

/** Polls the job until it has a blob, fails, or the timeout passes. Prints each change. */
export async function waitForJob({ client, host, jobId, timeoutMs, pollMs, now, sleep, out, savedAt }) {
  const start = now().getTime();
  let last = null;
  for (;;) {
    let res;
    try {
      res = await client.getJobStatus({ host, jobId });
    } catch (e) {
      // A job the service does not know (400 "invalid jobId") is forgotten; anything else keeps it saved.
      const unknown = e instanceof XrpcError && e.status === 400;
      const err = new BotError(`asking for job ${jobId} failed: ${e.message}. ${unknown ? 'The job is forgotten, so the next run uploads again.' : `It stays saved in ${savedAt}: run the same command again to pick it up.`} Nothing was posted.`);
      err.jobFailed = unknown;
      throw err;
    }
    const js = readJobStatus(res) ?? {};
    const progress = Number.isFinite(js.progress) ? ` ${js.progress}%` : '';
    const seen = `${js.state}${progress}`;
    if (seen !== last) { out(`  job ${jobId}: ${js.state ?? '(no state)'}${progress}`); last = seen; }
    const blob = jobBlob(js);
    if (blob) return blob;
    if (js.state === 'JOB_STATE_FAILED' || js.failureCode) {
      const why = [js.failureCode, js.error, js.message].filter(Boolean).join(': ') || 'no reason given';
      const e = new BotError(`the video service failed job ${jobId}: ${why}. Nothing was posted.`);
      e.jobFailed = true;
      throw e;
    }
    if (now().getTime() - start >= timeoutMs) {
      throw new BotError(`stopped waiting after ${Math.round(timeoutMs / 60000)} minutes; job ${jobId} is still ${js.state ?? 'in process'}. It is saved in ${savedAt}: run the same command again to pick it up. Nothing was posted.`);
    }
    await sleep(pollMs);
  }
}

async function run(ctx) {
  const { positionals, values, env, out, err, root, cwd, now, fetch, configPath, sleep, probe } = ctx;
  if (positionals.length !== 1) throw new UsageError(`usage: ${USAGE}`);
  if (!values.video) throw new UsageError(`post needs --video <file.mp4>\nusage: ${USAGE}`);
  const uploadOnly = values['upload-only'];
  if (!values['text-file'] && !uploadOnly) throw new UsageError(`post needs --text-file <file>\nusage: ${USAGE}`);
  if (uploadOnly && !values.live) throw new UsageError('--upload-only uploads, so it goes with --live; a dry run of the post already shows the upload');
  const settings = loadSettings({ env, configPath, showConfigPath: join(root, 'show.config.json') });
  if (values.live) {
    const missing = [];
    if (!settings.handle) missing.push('a handle: set bluesky.handle in show.config.json (or BSKY_HANDLE)');
    if (!settings.did) missing.push('the account DID: set bluesky.did in show.config.json');
    if (!env.BSKY_APP_PASSWORD) missing.push('BSKY_APP_PASSWORD in the environment (locally: put it in .secrets; npm run bot loads it)');
    if (missing.length) throw new BotError(`--live needs ${missing.join(', and ')}. Use an app password, never the account password.`);
  }
  const shown = (p) => { const r = relative(cwd, p); return !r ? p : r.startsWith('..') ? p : r; };

  // Every check, before anything is sent.
  const id = resolveEpisodeId(positionals[0], root);
  const manifestPath = join(root, 'dist/episodes', id, 'episode.json');
  let status = null;
  try { status = JSON.parse(readFileSync(manifestPath, 'utf8')).status ?? null; } catch { /* unbuilt */ }
  if (status !== 'published') err(`warning: episode ${id} is ${status ? `"${status}"` : 'not built'}, not published. Post it only if the owner has approved it.`);

  const langs = checkLangs(values.lang?.length ? values.lang : settings.langs);
  const text = values['text-file'] ? readTextFile(resolve(cwd, values['text-file']), 'text file') : null;
  if (text !== null) {
    if (!text) throw new BotError(`the text file ${values['text-file']} is empty`);
    checkNoMentionOrLink(text, 'the post text');
  }
  const textStats = text !== null ? checkPostText(text) : null;
  let alt;
  if (values['alt-file'] !== undefined) {
    alt = readTextFile(resolve(cwd, values['alt-file']), 'alt text file');
    if (!alt) throw new BotError(`the alt text file ${values['alt-file']} is empty; leave --alt-file out rather than send empty alt text`);
  }
  const videoPath = resolve(cwd, values.video);
  const { size } = checkVideoFile(videoPath);
  const probed = await probe(videoPath);
  let aspectRatio; let duration = null; const notes = [];
  if (probed) {
    duration = probed.duration;
    if (duration === null) err('warning: ffprobe gave no duration, so the 10-minute limit was not checked');
    else checkDuration(duration);
    aspectRatio = { width: probed.width, height: probed.height };
    if (values.aspect) {
      const given = parseAspect(values.aspect);
      if (given.width * probed.height !== given.height * probed.width) err(`warning: --aspect ${values.aspect} disagrees with the file (${probed.width}x${probed.height}); using the file's own size`);
    }
    notes.push(`ffprobe: ${probed.width}x${probed.height}, ${duration === null ? 'duration unknown' : `${duration} s (limit ${VIDEO_MAX_SECONDS})`}`);
  } else {
    if (!values.aspect) throw new BotError('ffprobe is not on the PATH, so the video\'s size cannot be read: give --aspect <width>:<height> (its pixel size, e.g. 1920:1080)');
    aspectRatio = parseAspect(values.aspect);
    err('warning: ffprobe is not on the PATH, so the video\'s duration was not checked (Bluesky allows 10 minutes)');
    notes.push(`aspect from --aspect: ${aspectRatio.width}:${aspectRatio.height}; duration not checked (no ffprobe)`);
  }
  const captionsPath = values.captions ? resolve(cwd, values.captions) : null;
  const captionBytes = captionsPath ? loadCaptions(captionsPath) : null;
  buildVideoEmbed({ video: {}, aspectRatio, captions: captionBytes ? [{}] : [], alt }); // same checks as the real one

  const sha256 = await sha256File(videoPath);
  const uploadPath = join(root, UPLOADS_DIR, `${sha256}.json`);
  const stored = readUpload(uploadPath);
  const storedNote = stored?.blob ? `stored in ${shown(uploadPath)} (blob ${blobCid(stored.blob)}): it will be reused, not uploaded again`
    : stored?.jobId ? `a pending job ${stored.jobId} is stored in ${shown(uploadPath)}: it will be picked up, not uploaded again`
      : 'not uploaded yet';
  const placeholder = (what, mimeType, bytes) => ({ $type: 'blob', ref: { $link: `<cid returned by ${what}>` }, mimeType, size: bytes });
  const draft = (video, captionsBlob, createdAt) => ({
    $type: POST_COLLECTION,
    createdAt,
    embed: buildVideoEmbed({ video, aspectRatio, captions: captionsBlob ? [{ lang: langs[0], file: captionsBlob }] : [], alt }),
    langs: [...langs],
    text: text ?? '',
  });
  const target = settings.handle ? `@${settings.handle}` : '(no handle: set bluesky.handle in show.config.json)';
  const v = settings.video;

  if (!values.live) {
    const lines = [
      'DRY RUN: nothing was sent. Add --live to post.',
      '',
      `Episode:  ${id}${status ? ` (${status})` : ' (not built)'}`,
      `Video:    ${shown(videoPath)}: MP4, ${size} bytes (limit ${VIDEO_MAX_BYTES})`,
      `          ${notes.join('; ')}`,
      `          sha256 ${sha256}; ${storedNote}`,
      `Captions: ${captionsPath ? `${shown(captionsPath)}: WebVTT, ${captionBytes.length} bytes (limit ${CAPTION_MAX_BYTES}), lang ${langs[0]}` : 'none'}`,
      `Langs:    ${langs.join(', ')}`,
      `Account:  ${target} (${settings.did ?? 'no DID: set bluesky.did in show.config.json'}) on ${settings.service}`,
      `Text:     ${textStats.graphemes}/${POST_MAX_GRAPHEMES} graphemes, ${textStats.bytes}/${POST_MAX_BYTES} bytes; no mention, no link`,
      ...text.split('\n').map((l) => `  | ${l}`),
      `Alt:      ${alt === undefined ? 'none' : `${graphemeLength(alt)} graphemes`}`,
      ...(alt === undefined ? [] : alt.split('\n').map((l) => `  | ${l}`)),
      '',
      'With --live the bot would, stopping at the first failure and posting nothing then:',
      `  1. POST com.atproto.server.createSession as ${target}, and stop unless the session's DID is ${settings.did ?? '(bluesky.did)'}`,
      ...(stored?.blob ? ['  2. reuse the stored video blob (no limits check, no upload)'] : [
        ...(stored?.jobId ? [] : [
          `  2. GET  com.atproto.server.getServiceAuth (aud ${v.did}), then app.bsky.video.getUploadLimits on ${v.service}; stop unless canUpload`,
          '  3. GET  com.atproto.server.getServiceAuth (aud did:web:<the PDS host>, lxm com.atproto.repo.uploadBlob, 30 minutes)',
          `  4. POST ${v.service}/xrpc/app.bsky.video.uploadVideo by node:https, streaming the file (${size} bytes, Content-Length set; stops if nothing is written for ${v.stallSeconds} s)`,
        ]),
        `  5. GET  app.bsky.video.getJobStatus every ${v.pollSeconds} s until the job has a blob (gives up after ${v.jobTimeoutMinutes} minutes), saving it to ${shown(uploadPath)}`,
      ]),
      ...(captionsPath ? ['  6. POST com.atproto.repo.uploadBlob with the captions (text/vtt)'] : []),
      `  7. GET  com.atproto.repo.listRecords (its last ${LIST_RECORDS_MAX_LIMIT} posts) and stop if one already carries this video`,
      `  8. POST com.atproto.repo.createRecord to ${POST_COLLECTION} with this record (createdAt set at that moment), and log it to ${POST_LOG}:`,
      '',
      JSON.stringify(draft(stored?.blob ?? placeholder('the video job', VIDEO_MIME_TYPE, size), captionBytes ? placeholder('uploadBlob', 'text/vtt', captionBytes.length) : null, now().toISOString()), null, 2),
    ];
    out(lines.join('\n'));
    return 0;
  }

  const client = createClient({ service: settings.service, userAgent: settings.userAgent, fetch });
  const session = await client.createSession({ identifier: settings.handle, password: env.BSKY_APP_PASSWORD });
  out(`Logged in as @${session.handle} (${session.did}) on ${client.service}`);
  if (session.did !== settings.did) throw new BotError(`refusing: logged in as ${session.did}, but bluesky.did in show.config.json is ${settings.did}`);

  let blob = stored?.blob ?? null;
  const entry = { sha256, size, name: basename(videoPath), did: session.did, jobId: stored?.jobId ?? null, blob: null };
  if (blob) {
    out(`Reusing the upload stored in ${shown(uploadPath)}: blob ${blobCid(blob)}. Not uploading again.`);
  } else {
    if (!entry.jobId) {
      const limitsToken = await client.getServiceAuth({ aud: v.did, lxm: 'app.bsky.video.getUploadLimits' });
      let limits;
      try {
        limits = await client.getUploadLimits({ host: v.service, token: limitsToken });
      } catch (e) {
        throw new BotError(`asking the video service for the upload limits failed: ${e.message}. Nothing was uploaded or posted.`);
      }
      out(`Upload limits: ${limits?.remainingDailyVideos ?? '?'} videos and ${limits?.remainingDailyBytes ?? '?'} bytes left today`);
      if (limits?.canUpload !== true) {
        throw new BotError(`the video service says this account cannot upload now${limits?.message || limits?.error ? `: ${[limits.error, limits.message].filter(Boolean).join(': ')}` : ''}. (It needs a verified email, and videos have a daily limit.) Nothing was posted.`);
      }
      if (Number.isFinite(limits.remainingDailyBytes) && limits.remainingDailyBytes < size) {
        throw new BotError(`the video is ${size} bytes but only ${limits.remainingDailyBytes} bytes of video are left today. Nothing was posted.`);
      }
      const pdsHost = new URL(client.pds).hostname;
      const uploadToken = await client.getServiceAuth({
        aud: `did:web:${pdsHost}`, lxm: 'com.atproto.repo.uploadBlob', exp: Math.floor(now().getTime() / 1000) + UPLOAD_TOKEN_SECONDS,
      });
      out(`Uploading ${shown(videoPath)} (${size} bytes) to ${v.service} ...`);
      let js;
      try {
        js = readJobStatus(await client.uploadVideo({
          host: v.service, token: uploadToken, did: session.did, name: entry.name, path: videoPath, size,
          stallMs: v.stallSeconds * 1000,
          onProgress: (sent, total) => out(`  sent ${sent} of ${total} bytes (${Math.floor((sent / total) * 100)}%)`),
        }));
      } catch (e) {
        if (!isAlreadyExists(e)) throw new BotError(`the upload failed: ${e.message}. Nothing was posted.`);
        js = readJobStatus(e.data);
        out('The video service has processed this video before (already_exists); using that.');
      }
      blob = jobBlob(js);
      entry.jobId = js?.jobId ?? null;
      if (!blob && !entry.jobId) {
        throw new BotError(`the video service answered with neither a job nor a blob${js?.error ? ` (error: ${js.error}${js.message ? `: ${js.message}` : ''})` : ''}. Nothing was posted.`);
      }
      if (!blob) saveUpload(uploadPath, { ...entry, state: js?.state ?? null, savedAt: now().toISOString() });
    } else {
      out(`Picking up job ${entry.jobId}, stored in ${shown(uploadPath)}.`);
    }
    if (!blob) {
      try {
        blob = await waitForJob({
          client, host: v.service, jobId: entry.jobId, timeoutMs: v.jobTimeoutMinutes * 60_000, pollMs: v.pollSeconds * 1000,
          now, sleep, out, savedAt: shown(uploadPath),
        });
      } catch (e) {
        if (e.jobFailed) rmSync(uploadPath, { force: true }); // a failed job is not picked up again
        throw e;
      }
    }
    saveUpload(uploadPath, { ...entry, blob, savedAt: now().toISOString() });
    out(`Video processed: blob ${blobCid(blob)}; saved in ${shown(uploadPath)}`);
  }

  if (uploadOnly) {
    out(`--upload-only: no post was created. A later post --live of this file reuses ${shown(uploadPath)}.`);
    return 0;
  }

  let captionsBlob = null;
  if (captionBytes) {
    captionsBlob = await client.uploadBlob(captionBytes, 'text/vtt');
    out(`Uploaded the captions (${captionBytes.length} bytes): ${blobCid(captionsBlob)}`);
  }

  const recent = await client.listRecords({ repo: session.did, collection: POST_COLLECTION, limit: LIST_RECORDS_MAX_LIMIT });
  const dup = (recent?.records ?? []).find((r) => blobCid(r?.value?.embed?.video) === blobCid(blob));
  if (dup) throw new BotError(`already posted: ${dup.uri} carries this video. Nothing was posted.`);

  const record = draft(blob, captionsBlob, now().toISOString());
  let created;
  try {
    created = await client.createRecord({ repo: session.did, collection: POST_COLLECTION, record });
  } catch (e) {
    const hint = stored?.blob && e instanceof XrpcError ? ` The stored upload may have expired on the PDS: remove ${shown(uploadPath)} and run again.` : '';
    throw new BotError(`creating the post failed: ${e.message}.${hint}`);
  }
  const rkey = created.uri.split('/').pop();
  const url = `https://bsky.app/profile/${session.handle}/post/${rkey}`;
  mkdirSync(join(root, 'data/bot'), { recursive: true });
  appendFileSync(join(root, POST_LOG), `${JSON.stringify({ at: now().toISOString(), episode: id, uri: created.uri, cid: created.cid ?? null, url, video: { sha256, blob: blobCid(blob) } })}\n`);
  out(`Posted ${created.uri}\n  ${url}\n  logged: ${POST_LOG}`);
  return 0;
}
