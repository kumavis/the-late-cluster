// Limits from the published lexicons (verified 2026-11-19, see README "Sources").
export const POST_MAX_GRAPHEMES = 300; // app.bsky.feed.post text.maxGraphemes
export const POST_MAX_BYTES = 3000; // app.bsky.feed.post text.maxLength (UTF-8 bytes)
export const POST_MAX_LANGS = 3; // app.bsky.feed.post langs.maxLength
export const THUMB_MAX_BYTES = 1_000_000; // app.bsky.embed.external#external thumb.maxSize
export const LIST_RECORDS_MAX_LIMIT = 100; // com.atproto.repo.listRecords limit.maximum
