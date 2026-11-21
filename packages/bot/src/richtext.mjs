// Text measurement and facets. Bluesky facet offsets are UTF-8 byte offsets
// (app.bsky.richtext.facet#byteSlice); JavaScript string indices are UTF-16 code
// units, so every index here is converted through TextEncoder.

const encoder = new TextEncoder();
const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });

export function utf8Length(s) {
  return encoder.encode(s).length;
}

export function graphemeLength(s) {
  let n = 0;
  for (const _ of segmenter.segment(s)) n++;
  return n;
}

/** Byte slice of `needle` in `text`, searching from UTF-16 index `from`. */
export function byteSlice(text, needle, from = 0) {
  const i = text.indexOf(needle, from);
  if (i < 0) throw new Error(`facet target not found in text: ${needle}`);
  const byteStart = utf8Length(text.slice(0, i));
  return { byteStart, byteEnd: byteStart + utf8Length(needle) };
}

export function linkFacet(text, uri, from = 0) {
  return {
    index: byteSlice(text, uri, from),
    features: [{ $type: 'app.bsky.richtext.facet#link', uri }],
  };
}

/** Any `@word` at a word start: what `dm`, `post` and `reply` treat as naming an account. Group 2 is `@name`. */
export const MENTION_RE = /(^|[^\w])(@[a-z0-9][a-z0-9.:_-]*)/i;
/** Every such `@word`, for matchAll. */
export const MENTION_RE_ALL = /(^|[^\w])(@[a-z0-9][a-z0-9.:_-]*)/gi;
/** Anything that reads as a link: a scheme, www., or a domain with a path. */
export const LINK_RE = /\b[a-z][a-z0-9+.-]*:\/\/\S+|\bwww\.\S+|\b[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}\/\S*/i;

/** Text that a reader could take for a tag of an account: "@name.tld" or "@did:...". */
export const HANDLE_LIKE = /(^|[^\w])@(did:[a-z]+:|[a-z0-9-]+\.[a-z0-9.-]*[a-z])/i;
