// Limits from the published lexicons (verified 2026-11-19, see README "Sources").
export const POST_MAX_GRAPHEMES = 300; // app.bsky.feed.post text.maxGraphemes
export const POST_MAX_BYTES = 3000; // app.bsky.feed.post text.maxLength (UTF-8 bytes)
export const POST_MAX_LANGS = 3; // app.bsky.feed.post langs.maxLength
export const THUMB_MAX_BYTES = 1_000_000; // app.bsky.embed.external#external thumb.maxSize
export const LIST_RECORDS_MAX_LIMIT = 100; // com.atproto.repo.listRecords limit.maximum
// app.bsky.actor.profile `avatar` (verified 2026-11-19 against the lexicon in
// bluesky-social/atproto lexicons/app/bsky/actor/profile.json): a blob with
// accept ["image/png", "image/jpeg"] and maxSize 1000000.
export const AVATAR_MAX_BYTES = 1_000_000;
export const AVATAR_MIME_TYPES = Object.freeze(['image/png', 'image/jpeg']);
/** Not a lexicon limit: below this the avatar looks soft in the apps, so `profile` warns. */
export const AVATAR_MIN_SIDE_WARN = 400;
// chat.bsky.convo.defs#messageInput `text` (verified 2026-11-19 against bluesky-social/atproto
// lexicons/chat/bsky/convo/defs.json): maxGraphemes 1000, maxLength 10000 (UTF-8 bytes).
export const DM_MAX_GRAPHEMES = 1000;
export const DM_MAX_BYTES = 10_000;
// chat.bsky.convo.getMessages and listConvos: limit maximum 100.
export const CHAT_PAGE_MAX_LIMIT = 100;
// app.bsky.actor.profile `description` (the bio): maxGraphemes 256, maxLength 2560 (UTF-8 bytes),
// from the same lexicon file as the avatar.
export const DESCRIPTION_MAX_GRAPHEMES = 256;
export const DESCRIPTION_MAX_BYTES = 2560;
