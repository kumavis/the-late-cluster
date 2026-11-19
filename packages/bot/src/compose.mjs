// Builds the app.bsky.feed.post record for an episode announcement.
import { BotError } from './errors.mjs';
import { episodeUrl } from './config.mjs';
import { POST_MAX_BYTES, POST_MAX_GRAPHEMES, POST_MAX_LANGS, THUMB_MAX_BYTES } from './limits.mjs';
import { graphemeLength, HANDLE_LIKE, linkFacet, utf8Length } from './richtext.mjs';
import { CARD_TITLE_TEMPLATE, fill, POST_TEMPLATE, taglineFor } from './voice.mjs';

export function composeText(manifest, url) {
  const values = { tagline: taglineFor(manifest.number), number: manifest.number, title: manifest.title.trim(), url };
  return fill(POST_TEMPLATE, values);
}

export function checkText(text) {
  const graphemes = graphemeLength(text);
  if (graphemes > POST_MAX_GRAPHEMES) {
    throw new BotError(`post text is ${graphemes} graphemes; Bluesky allows ${POST_MAX_GRAPHEMES}. Shorten the title or the wording in src/voice.mjs.`);
  }
  const bytes = utf8Length(text);
  if (bytes > POST_MAX_BYTES) throw new BotError(`post text is ${bytes} UTF-8 bytes; Bluesky allows ${POST_MAX_BYTES}.`);
  const tag = text.match(HANDLE_LIKE);
  if (tag) {
    throw new BotError(`post text contains "@${tag[2]}", which reads as tagging an account. The bot does not mention anyone; reword the title or src/voice.mjs.`);
  }
  return { graphemes, bytes };
}

export function checkThumbnail(size, mimeType) {
  if (!mimeType) throw new BotError('thumbnail.jpg is not a JPEG or PNG image');
  if (size > THUMB_MAX_BYTES) {
    throw new BotError(`thumbnail is ${size} bytes; Bluesky link-card thumbnails are limited to ${THUMB_MAX_BYTES} bytes. Re-export it smaller.`);
  }
}

/**
 * @param {object} o
 * @param {object} o.manifest  validated episode manifest
 * @param {string} o.siteUrl   normalized site root
 * @param {string[]} o.langs
 * @param {Date} o.now
 * @param {object} o.thumb     blob ref returned by uploadBlob (or a placeholder in dry run)
 */
export function buildAnnouncement({ manifest, siteUrl, langs, now, thumb }) {
  if (!siteUrl) throw new BotError('no site URL: set SITE_URL or "siteUrl" in packages/bot/bot.config.json');
  if (langs.length > POST_MAX_LANGS) throw new BotError(`at most ${POST_MAX_LANGS} langs are allowed`);
  const url = episodeUrl(siteUrl, manifest.id);
  const text = composeText(manifest, url);
  const stats = checkText(text);
  const record = {
    $type: 'app.bsky.feed.post',
    text,
    facets: [linkFacet(text, url, text.lastIndexOf(url))],
    langs: [...langs],
    embed: {
      $type: 'app.bsky.embed.external',
      external: {
        uri: url,
        title: fill(CARD_TITLE_TEMPLATE, { number: manifest.number, title: manifest.title.trim() }),
        description: manifest.description.trim(),
        thumb,
      },
    },
    createdAt: now.toISOString(),
  };
  assertNoMentions(record);
  return { record, url, stats };
}

/** Last line of defence: an announcement never carries mention facets or tags. */
export function assertNoMentions(record) {
  for (const f of record.facets ?? []) {
    for (const feat of f.features ?? []) {
      if (feat.$type !== 'app.bsky.richtext.facet#link') throw new BotError(`refusing a ${feat.$type} facet: announcements only carry links`);
    }
  }
  if (record.tags?.length) throw new BotError('refusing post tags: announcements carry no tags');
}

/** Every URL a previous post points at: link card, link facets. */
export function urlsInPost(value) {
  const out = new Set();
  const ext = value?.embed?.external?.uri ?? value?.embed?.media?.external?.uri;
  if (ext) out.add(ext);
  for (const f of value?.facets ?? []) for (const feat of f.features ?? []) if (feat.uri) out.add(feat.uri);
  return out;
}

export function sameUrl(a, b) {
  const norm = (s) => {
    try { const u = new URL(s); u.hash = ''; return u.toString().replace(/\/+$/, '').toLowerCase(); } catch { return s; }
  };
  return norm(a) === norm(b);
}
