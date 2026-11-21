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
// app.bsky.actor.profile `banner` (from the same lexicon file as the avatar): a blob with
// accept ["image/png", "image/jpeg"] and maxSize 1000000.
export const BANNER_MAX_BYTES = 1_000_000;
export const BANNER_MIME_TYPES = Object.freeze(['image/png', 'image/jpeg']);
/** Not a lexicon limit: the apps crop banners to 3:1 (width:height), so `profile` warns otherwise. */
export const BANNER_ASPECT = 3;
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
// app.bsky.embed.video (read 2026-11-21 from the lexicon): `video` a blob, accept video/mp4,
// maxSize 300000000; `captions` at most 20, each { lang, file } with `file` a blob accepting
// text/vtt, maxSize 20000; `alt` a string with no limit; `aspectRatio` { width, height },
// integers, minimum 1. `presentation` known values: default, gif.
export const VIDEO_MAX_BYTES = 300_000_000;
export const VIDEO_MIME_TYPE = 'video/mp4';
export const CAPTIONS_MAX = 20;
export const CAPTION_MAX_BYTES = 20_000;
export const CAPTION_MIME_TYPE = 'text/vtt';
export const ASPECT_MIN = 1;
/** Not in the lexicon: the app's own limit on a video's length, in seconds (10 minutes). */
export const VIDEO_MAX_SECONDS = 600;
