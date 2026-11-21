// A small AT Protocol XRPC client over fetch. No dependencies.
//
// The access token lives only in this closure: it is never returned, logged, or
// written anywhere. Error messages carry the XRPC error name and message from the
// server, never request bodies or headers.
//
// One request does not go through fetch: the video upload. Node's fetch has a fixed 300 s
// headers timeout that fires while a slow upload is still being written, and it cannot be
// changed without the undici package, which this package does not install. So the upload goes
// by node:https (node:http for a loopback host, in tests), with an explicit Content-Length, no
// overall time limit, and a stall limit instead.
import { createReadStream } from 'node:fs';
import { request as httpRequest } from 'node:http';
import { request as httpsRequest } from 'node:https';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

export const DEFAULT_SERVICE = 'https://bsky.social';
/** Generic on purpose: it names neither the show nor its owner. Override with BOT_USER_AGENT. */
export const DEFAULT_USER_AGENT = 'episode-announcer/0.1';
/** Direct messages are served by Bluesky's chat service, reached through the PDS with this proxy header. */
export const CHAT_PROXY = 'did:web:api.bsky.chat#bsky_chat';

export class XrpcError extends Error {
  constructor(nsid, status, error, message) {
    super(`${nsid} failed: HTTP ${status}${error ? ` ${error}` : ''}${message ? `: ${message}` : ''}`);
    this.name = 'XrpcError';
    this.nsid = nsid;
    this.status = status;
    this.error = error;
    this.data = null; // the parsed error body, when there was one
  }
}

export function createClient({ service = DEFAULT_SERVICE, fetch = globalThis.fetch, userAgent = DEFAULT_USER_AGENT } = {}) {
  if (typeof fetch !== 'function') throw new Error('createClient needs a fetch function');
  const base = new URL(service);
  if (base.protocol !== 'https:' && !['localhost', '127.0.0.1', '[::1]'].includes(base.hostname)) {
    throw new Error(`refusing non-https PDS host: ${service}`);
  }
  let accessJwt = null;
  let session = null;
  let pds = null; // the account's own PDS, from the session's DID document, if it gave one

  function url(nsid, params, host = base) {
    const u = new URL(`/xrpc/${nsid}`, host);
    for (const [k, v] of Object.entries(params ?? {})) {
      if (Array.isArray(v)) for (const item of v) u.searchParams.append(k, String(item));
      else if (v !== undefined) u.searchParams.set(k, String(v));
    }
    return u.toString();
  }

  async function call(nsid, { method = 'GET', params, body, contentType, auth = true, raw = false, host, proxy, bearer } = {}) {
    const headers = { 'user-agent': userAgent, accept: raw ? '*/*' : 'application/json' };
    if (proxy) headers['atproto-proxy'] = proxy;
    if (bearer) {
      headers.authorization = `Bearer ${bearer}`; // a service auth token, for another service
    } else if (auth) {
      if (!accessJwt) throw new Error(`${nsid} needs a session: call createSession first`);
      headers.authorization = `Bearer ${accessJwt}`;
    }
    if (body !== undefined) headers['content-type'] = contentType ?? 'application/json';
    const res = await fetch(url(nsid, params, host), {
      method,
      headers,
      body: body === undefined ? undefined : contentType ? body : JSON.stringify(body),
    });
    if (raw && res.ok) {
      return { bytes: Buffer.from(await res.arrayBuffer()), contentType: res.headers.get('content-type') };
    }
    return readReply(nsid, res);
  }

  async function readReply(nsid, res) {
    return parseReply(nsid, res.status, await res.text());
  }

  return {
    service: base.origin,

    /** Logs in with a handle and app password. Returns { did, handle } only. */
    async createSession({ identifier, password }) {
      const data = await call('com.atproto.server.createSession', {
        method: 'POST', auth: false, body: { identifier, password },
      });
      if (!data?.accessJwt || !data?.did) throw new Error('createSession returned no session');
      accessJwt = data.accessJwt;
      session = { did: data.did, handle: data.handle };
      pds = pdsFromDidDoc(data.didDoc);
      return { ...session };
    },

    get session() { return session ? { ...session } : null; },

    /** Where unauthenticated sync reads go: the account's PDS if the session named one, else the service. */
    get pds() { return (pds ?? base).origin; },

    /** Uploads raw bytes. Returns the blob ref to embed in a record. */
    async uploadBlob(bytes, mimeType) {
      const data = await call('com.atproto.repo.uploadBlob', {
        method: 'POST', body: bytes, contentType: mimeType,
      });
      if (!data?.blob) throw new Error('uploadBlob returned no blob');
      return data.blob;
    },

    /** Creates a record. Returns { uri, cid }. */
    async createRecord({ repo, collection, record, validate }) {
      return call('com.atproto.repo.createRecord', {
        method: 'POST', body: { repo, collection, record, ...(validate === undefined ? {} : { validate }) },
      });
    },

    /**
     * One record. Returns { uri, cid, value }; throws XrpcError (error 'RecordNotFound') if absent.
     * Records are public: `auth: false` reads one without a session (a dry run does that).
     */
    async getRecord({ repo, collection, rkey, auth = true }) {
      return call('com.atproto.repo.getRecord', { params: { repo, collection, rkey }, auth });
    },

    /**
     * Deletes a record. `swapRecord` is the CID it must still have; the server refuses otherwise
     * (InvalidSwap). Returns the server's reply (a commit, or nothing).
     */
    async deleteRecord({ repo, collection, rkey, swapRecord }) {
      return call('com.atproto.repo.deleteRecord', {
        method: 'POST', body: { repo, collection, rkey, ...(swapRecord === undefined ? {} : { swapRecord }) },
      });
    },

    /**
     * Post views (author, record, counts, embed view) from a public AppView, without the token:
     * `appView` is its origin, e.g. https://public.api.bsky.app. Returns { posts }.
     */
    async getPosts(uris, { appView }) {
      if (!appView) throw new Error('getPosts needs an AppView host');
      const host = new URL(appView);
      if (host.protocol !== 'https:' && !['localhost', '127.0.0.1', '[::1]'].includes(host.hostname)) {
        throw new Error(`refusing non-https AppView host: ${appView}`);
      }
      return call('app.bsky.feed.getPosts', { params: { uris }, auth: false, host });
    },

    /**
     * Writes a record at a fixed rkey. `swapRecord` is the CID the record must still have, or
     * null for "must not exist yet"; the server refuses the write (InvalidSwap) otherwise.
     * Returns { uri, cid }.
     */
    async putRecord({ repo, collection, rkey, record, swapRecord, validate }) {
      return call('com.atproto.repo.putRecord', {
        method: 'POST',
        body: {
          repo, collection, rkey, record,
          ...(swapRecord === undefined ? {} : { swapRecord }),
          ...(validate === undefined ? {} : { validate }),
        },
      });
    },

    /**
     * A blob's raw bytes. Public data, so it is fetched without the token, from the account's
     * own PDS (sync endpoints are served there). Returns { bytes, contentType }.
     */
    async getBlob({ did, cid }) {
      return call('com.atproto.sync.getBlob', { params: { did, cid }, auth: false, raw: true, host: pds ?? base });
    },

    /** A handle's DID. Public, so sent without the token. Returns { did }. */
    async resolveHandle(handle) {
      return call('com.atproto.identity.resolveHandle', { params: { handle }, auth: false });
    },

    /**
     * An authenticated call to a service behind the PDS, with the `atproto-proxy` header set to
     * `proxy` (a DID and service id). Goes to the account's own PDS, like any other request.
     * Only calls made through this function carry the header.
     */
    async proxied(proxy, nsid, { method = 'GET', params, body } = {}) {
      if (!proxy) throw new Error('proxied needs a proxy target');
      return call(nsid, { method, params, body, proxy, host: pds ?? base });
    },

    /** Chat: the 1:1 conversation with `members` (DIDs). Creates it if there is none yet. */
    async getConvoForMembers(members) {
      return this.proxied(CHAT_PROXY, 'chat.bsky.convo.getConvoForMembers', { params: { members } });
    },

    /** Chat: one page of the account's conversations. Read-only. Returns { convos, cursor }. */
    async listConvos({ limit, cursor } = {}) {
      return this.proxied(CHAT_PROXY, 'chat.bsky.convo.listConvos', { params: { limit, cursor } });
    },

    /** Chat: one page of a conversation's messages, newest first. Read-only. Returns { messages, cursor }. */
    async getMessages({ convoId, limit, cursor }) {
      return this.proxied(CHAT_PROXY, 'chat.bsky.convo.getMessages', { params: { convoId, limit, cursor } });
    },

    /** Chat: sends one plain-text message. Returns the messageView ({ id, rev, text, sender, sentAt }). */
    async sendMessage({ convoId, text }) {
      return this.proxied(CHAT_PROXY, 'chat.bsky.convo.sendMessage', { method: 'POST', body: { convoId, message: { text } } });
    },

    /**
     * A service auth token for another service: `aud` is that service's DID, `lxm` the one method
     * the token allows, `exp` its expiry in whole seconds since the epoch (optional). Asked of the
     * account's own PDS. Returns the token; it is never printed.
     */
    async getServiceAuth({ aud, lxm, exp }) {
      const data = await call('com.atproto.server.getServiceAuth', { params: { aud, lxm, exp }, host: pds ?? base });
      if (typeof data?.token !== 'string' || !data.token) throw new Error('getServiceAuth returned no token');
      return data.token;
    },

    /** Video service: today's upload allowance. `token` is a service auth token for it. */
    async getUploadLimits({ host, token }) {
      return call('app.bsky.video.getUploadLimits', { auth: false, bearer: token, host: checkedHost(host, 'video service') });
    },

    /** Video service: one processing job. Sent without any token. Returns { jobStatus }. */
    async getJobStatus({ host, jobId }) {
      return call('app.bsky.video.getJobStatus', { auth: false, params: { jobId }, host: checkedHost(host, 'video service') });
    },

    /**
     * Video service: uploads a file **as a stream** from disk, never holding it in memory, by
     * node:https (see the top of this file for why not fetch). `token` is a service auth token
     * for the PDS's uploadBlob; it is never printed or put in an error. Returns the parsed JSON
     * answer (a job status, at the top level); a refusal throws XrpcError with the body in
     * `.data` (the `already_exists` answer arrives so). There is no overall time limit: if no
     * bytes are written for `stallMs`, the request is destroyed and the error says how many
     * bytes had been sent. `onProgress(sent, size)` is called about every 10 percent.
     */
    async uploadVideo({ host, token, did, name, path, size, mimeType = 'video/mp4', stallMs = 120_000, onProgress }) {
      const nsid = 'app.bsky.video.uploadVideo';
      const u = new URL(`/xrpc/${nsid}`, checkedHost(host, 'video service'));
      u.searchParams.set('did', did);
      u.searchParams.set('name', name);
      const request = u.protocol === 'https:' ? httpsRequest : httpRequest;
      return new Promise((resolve, reject) => {
        let sent = 0;
        let nextMark = 0.1;
        let settled = false;
        let responded = false;
        let written = false;
        let timer = null;
        const done = (fn, v) => { if (!settled) { settled = true; clearTimeout(timer); fn(v); } };
        const req = request(u, {
          method: 'POST',
          headers: {
            'user-agent': userAgent, accept: 'application/json', authorization: `Bearer ${token}`,
            'content-type': mimeType, 'content-length': String(size),
          },
        });
        const arm = () => {
          clearTimeout(timer);
          if (settled || responded || written) return;
          timer = setTimeout(() => {
            const e = new Error(`the upload stalled: nothing was written for ${stallMs / 1000} s, after ${sent} of ${size} bytes had been sent`);
            done(reject, e);
            req.destroy(e);
          }, stallMs);
        };
        req.on('response', (res) => {
          responded = true;
          clearTimeout(timer);
          const chunks = [];
          res.on('data', (c) => chunks.push(c));
          res.on('error', (e) => done(reject, new Error(`the upload's answer could not be read: ${e.message}`)));
          res.on('end', () => {
            try { done(resolve, parseReply(nsid, res.statusCode, Buffer.concat(chunks).toString('utf8'))); } catch (e) { done(reject, e); }
          });
        });
        // A transport error may race an early answer (a server may refuse before reading the
        // body): give the answer a moment to arrive before failing on the error.
        const transport = (e) => {
          if (settled || responded) return;
          setTimeout(() => { if (!responded) done(reject, new Error(`the upload failed after ${sent} of ${size} bytes: ${e.message}`)); }, 1000).unref();
        };
        req.on('error', transport);
        const counter = new Transform({
          transform(chunk, _enc, cb) {
            sent += chunk.length;
            arm();
            if (onProgress && size > 0 && sent / size >= nextMark) {
              onProgress(sent, size);
              while (sent / size >= nextMark) nextMark += 0.1;
            }
            cb(null, chunk);
          },
        });
        arm();
        // Once every byte is written the stall limit no longer applies: waiting for the answer is not a stall.
        pipeline(createReadStream(path), counter, req).then(() => { written = true; clearTimeout(timer); }, transport);
      });
    },

    /** One page of a repo collection, newest first. Returns { records, cursor }. `auth: false` reads it without a session. */
    async listRecords({ repo, collection, limit = 100, cursor, auth = true }) {
      return call('com.atproto.repo.listRecords', { params: { repo, collection, limit, cursor }, auth });
    },
  };
}

/**
 * An XRPC answer: the parsed JSON body, or an XrpcError carrying the status, the error name (an
 * error body may have `error` and no `message`) and the body in `.data`.
 */
export function parseReply(nsid, status, text) {
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { /* non-JSON error page */ }
  if (status < 200 || status >= 300) {
    const retry = status === 429 ? ' (rate limited; try again later)' : '';
    const e = new XrpcError(nsid, status, data?.error, (data?.message ?? '') + retry);
    e.data = data;
    throw e;
  }
  return data;
}

/** A service origin as a URL; https only, except a loopback host (for tests). */
function checkedHost(host, what) {
  if (!host) throw new Error(`no ${what} host configured`);
  const u = new URL(host);
  if (u.protocol !== 'https:' && !['localhost', '127.0.0.1', '[::1]'].includes(u.hostname)) {
    throw new Error(`refusing non-https ${what} host: ${host}`);
  }
  return u;
}

/** The #atproto_pds endpoint of a DID document, if it is https. Anything else is ignored. */
function pdsFromDidDoc(doc) {
  const service = Array.isArray(doc?.service) ? doc.service : [];
  const entry = service.find((s) => typeof s?.id === 'string' && s.id.endsWith('#atproto_pds') && s.type === 'AtprotoPersonalDataServer');
  if (typeof entry?.serviceEndpoint !== 'string') return null;
  try {
    const u = new URL(entry.serviceEndpoint);
    return u.protocol === 'https:' ? u : null;
  } catch { return null; }
}
