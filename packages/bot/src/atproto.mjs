// A small AT Protocol XRPC client over fetch. No dependencies.
//
// The access token lives only in this closure: it is never returned, logged, or
// written anywhere. Error messages carry the XRPC error name and message from the
// server, never request bodies or headers.

export const DEFAULT_SERVICE = 'https://bsky.social';
/** Generic on purpose: it names neither the show nor its owner. Override with BOT_USER_AGENT. */
export const DEFAULT_USER_AGENT = 'episode-announcer/0.1';

export class XrpcError extends Error {
  constructor(nsid, status, error, message) {
    super(`${nsid} failed: HTTP ${status}${error ? ` ${error}` : ''}${message ? `: ${message}` : ''}`);
    this.name = 'XrpcError';
    this.nsid = nsid;
    this.status = status;
    this.error = error;
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

  function url(nsid, params) {
    const u = new URL(`/xrpc/${nsid}`, base);
    for (const [k, v] of Object.entries(params ?? {})) if (v !== undefined) u.searchParams.set(k, String(v));
    return u.toString();
  }

  async function call(nsid, { method = 'GET', params, body, contentType, auth = true } = {}) {
    const headers = { 'user-agent': userAgent, accept: 'application/json' };
    if (auth) {
      if (!accessJwt) throw new Error(`${nsid} needs a session: call createSession first`);
      headers.authorization = `Bearer ${accessJwt}`;
    }
    if (body !== undefined) headers['content-type'] = contentType ?? 'application/json';
    const res = await fetch(url(nsid, params), {
      method,
      headers,
      body: body === undefined ? undefined : contentType ? body : JSON.stringify(body),
    });
    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch { /* non-JSON error page */ }
    if (!res.ok) {
      const retry = res.status === 429 ? ' (rate limited; try again later)' : '';
      throw new XrpcError(nsid, res.status, data?.error, (data?.message ?? '') + retry);
    }
    return data;
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
      return { ...session };
    },

    get session() { return session ? { ...session } : null; },

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

    /** One page of a repo collection, newest first. Returns { records, cursor }. */
    async listRecords({ repo, collection, limit = 100, cursor }) {
      return call('com.atproto.repo.listRecords', { params: { repo, collection, limit, cursor } });
    },
  };
}
