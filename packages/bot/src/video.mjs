// The episode's video: checks on the file, its size and length, its captions, and the embed.
// Nothing here reads a whole video into memory: the type comes from its first bytes, the checksum
// from a stream, and the upload (in atproto.mjs) streams it from disk.
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createReadStream, existsSync, openSync, readFileSync, readSync, closeSync, statSync } from 'node:fs';
import { BotError } from './errors.mjs';
import {
  ASPECT_MIN, CAPTION_MAX_BYTES, CAPTION_MIME_TYPE, CAPTIONS_MAX, VIDEO_MAX_BYTES, VIDEO_MAX_SECONDS, VIDEO_MIME_TYPE,
} from './limits.mjs';

/** The video service's job states (from its lexicon). Any other value means still in process. */
export const JOB_STATES = Object.freeze([
  'JOB_STATE_CREATED', 'JOB_STATE_ENCODING', 'JOB_STATE_ENCODED', 'JOB_STATE_SCANNING', 'JOB_STATE_SCANNED',
  'JOB_STATE_UPLOADING', 'JOB_STATE_UPLOADED', 'JOB_STATE_COMPLETED', 'JOB_STATE_FAILED',
]);
export const FAILURE_CODES = Object.freeze(['validation_failure', 'encoding_failure', 'pds_upload_failure', 'pds_upload_unsupported_blob_size', 'generic_failure']);

/** True when the file starts like an MP4 (an ISO base media `ftyp` box that is not QuickTime). */
export function isMp4(path) {
  const fd = openSync(path, 'r');
  try {
    const b = Buffer.alloc(12);
    const n = readSync(fd, b, 0, 12, 0);
    return n === 12 && b.toString('latin1', 4, 8) === 'ftyp' && b.toString('latin1', 8, 12) !== 'qt  ';
  } finally { closeSync(fd); }
}

/** The video file's checks that need no tool: exists, MP4 by its bytes, within the size limit. */
export function checkVideoFile(path) {
  if (!existsSync(path) || !statSync(path).isFile()) throw new BotError(`video ${path} does not exist`);
  const size = statSync(path).size;
  if (!isMp4(path)) throw new BotError(`video ${path} is not an MP4 (checked by its bytes, not its name)`);
  if (size > VIDEO_MAX_BYTES) throw new BotError(`video ${path} is ${size} bytes; Bluesky videos are limited to ${VIDEO_MAX_BYTES} bytes`);
  return { size };
}

/**
 * Width, height and duration from ffprobe, or null when ffprobe is not on the PATH. A rotated
 * stream (90 or 270 degrees) gives its displayed size. Throws BotError when ffprobe cannot read it.
 */
export function probeVideo(path) {
  return new Promise((resolve, reject) => {
    execFile('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries',
      'stream=width,height:stream_tags=rotate:stream_side_data=rotation:format=duration', '-of', 'json', path],
    { timeout: 60_000, maxBuffer: 1 << 20 }, (e, stdout) => {
      if (e?.code === 'ENOENT') return resolve(null);
      if (e) return reject(new BotError(`ffprobe could not read ${path}: ${String(e.message).split('\n')[0]}`));
      try {
        const j = JSON.parse(stdout);
        const s = j.streams?.[0] ?? {};
        let width = Number(s.width); let height = Number(s.height);
        const rotation = Math.abs(Number(s.side_data_list?.find((d) => 'rotation' in d)?.rotation ?? s.tags?.rotate ?? 0)) % 180;
        if (rotation === 90) [width, height] = [height, width];
        const duration = Number(j.format?.duration);
        if (!(width > 0 && height > 0)) return reject(new BotError(`ffprobe found no video stream in ${path}`));
        resolve({ width, height, duration: Number.isFinite(duration) ? duration : null });
      } catch (x) { reject(new BotError(`ffprobe gave output that is not JSON for ${path}: ${x.message}`)); }
    });
  });
}

/** `--aspect 16:9` or `1920:1080` as { width, height }: integers, at least 1. */
export function parseAspect(raw) {
  const m = String(raw ?? '').trim().match(/^(\d+)[:x](\d+)$/);
  const w = m ? Number(m[1]) : NaN; const h = m ? Number(m[2]) : NaN;
  if (!Number.isInteger(w) || !Number.isInteger(h) || w < ASPECT_MIN || h < ASPECT_MIN) {
    throw new BotError(`--aspect must be <width>:<height>, whole numbers of at least ${ASPECT_MIN}, got ${JSON.stringify(raw)}`);
  }
  return { width: w, height: h };
}

export function checkDuration(seconds) {
  if (seconds > VIDEO_MAX_SECONDS) throw new BotError(`the video is ${seconds} s long; Bluesky videos are limited to ${VIDEO_MAX_SECONDS} s (10 minutes)`);
}

/** A captions file: WebVTT by its first line, at most 20000 bytes. Returns its bytes (small). */
export function loadCaptions(path) {
  if (!existsSync(path) || !statSync(path).isFile()) throw new BotError(`captions ${path} do not exist`);
  const size = statSync(path).size;
  if (size > CAPTION_MAX_BYTES) throw new BotError(`captions ${path} are ${size} bytes; Bluesky caption files are limited to ${CAPTION_MAX_BYTES} bytes`);
  const bytes = readFileSync(path);
  const first = bytes.toString('utf8').replace(/^﻿/, '').split(/\r?\n/, 1)[0];
  if (!/^WEBVTT([ \t].*)?$/.test(first)) throw new BotError(`captions ${path} are not ${CAPTION_MIME_TYPE}: a WebVTT file's first line is "WEBVTT"`);
  return bytes;
}

/** SHA-256 of a file, read as a stream. */
export function sha256File(path) {
  return new Promise((resolve, reject) => {
    const h = createHash('sha256');
    createReadStream(path).on('data', (c) => h.update(c)).on('error', reject).on('end', () => resolve(h.digest('hex')));
  });
}

/**
 * The app.bsky.embed.video object, in the shape the server accepted for episode one:
 * { $type, aspectRatio, presentation: 'default', video }, plus captions and alt when given.
 * `video` is the blob exactly as the job returned it.
 */
export function buildVideoEmbed({ video, aspectRatio, captions = [], alt }) {
  if (captions.length > CAPTIONS_MAX) throw new BotError(`at most ${CAPTIONS_MAX} caption files are allowed, got ${captions.length}`);
  for (const k of ['width', 'height']) {
    if (!Number.isInteger(aspectRatio?.[k]) || aspectRatio[k] < ASPECT_MIN) throw new BotError(`aspectRatio.${k} must be a whole number of at least ${ASPECT_MIN}`);
  }
  return {
    $type: 'app.bsky.embed.video',
    aspectRatio: { height: aspectRatio.height, width: aspectRatio.width },
    presentation: 'default',
    video,
    ...(captions.length ? { captions } : {}),
    ...(alt !== undefined ? { alt } : {}),
  };
}

/**
 * A job status from any answer of the video service. The upload answers with the job status at
 * the top level (`{ did, jobId, state, error, blob }`, as observed and as the tutorial reads it);
 * getJobStatus wraps it as `{ jobStatus }`. Either shape is read. An empty-string `jobId` (the
 * service's "no job") becomes null. Returns null when the body holds no job status at all.
 */
export function readJobStatus(body) {
  const js = body?.jobStatus ?? body;
  if (!js || typeof js !== 'object' || Array.isArray(js)) return null;
  return { ...js, jobId: typeof js.jobId === 'string' && js.jobId ? js.jobId : null };
}

/** The blob in a job status or upload answer, if it has one. */
export function jobBlob(js) {
  const b = js?.blob;
  return b && typeof b === 'object' && (typeof b.ref?.$link === 'string' || typeof b.cid === 'string') ? b : null;
}

/** The service's "this video was processed before" answer, by its error name or message. */
export function isAlreadyExists(e) {
  const d = e?.data?.jobStatus ?? e?.data;
  return [e?.error, e?.data?.error, e?.data?.message, d?.error, d?.message].some((s) => typeof s === 'string' && s.includes('already_exists'));
}

export { VIDEO_MIME_TYPE };
