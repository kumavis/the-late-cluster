import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assertNoMentions, buildAnnouncement, checkThumbnail, sameUrl, urlsInPost } from '../src/compose.mjs';
import { normalizeSiteUrl, episodeUrl } from '../src/config.mjs';
import { graphemeLength } from '../src/richtext.mjs';
import { FIXED_NOW, manifest } from './helpers.mjs';

const thumb = { $type: 'blob', ref: { $link: 'bafkreithumb' }, mimeType: 'image/jpeg', size: 10 };
const build = (m, siteUrl = 'https://example.test/') => buildAnnouncement({ manifest: m, siteUrl, langs: ['en'], now: FIXED_NOW, thumb });

test('record has text, link facet, langs, createdAt and an external embed with thumb', () => {
  const { record, url } = build(manifest({ title: 'Ça, c’est le Pilote 🎙️', description: '  Desc.  ' }));
  assert.equal(url, 'https://example.test/episodes/001-pilot/');
  assert.equal(record.$type, 'app.bsky.feed.post');
  assert.ok(record.text.includes('episode 1: Ça, c’est le Pilote 🎙️'));
  assert.ok(record.text.endsWith(url));
  const { byteStart, byteEnd } = record.facets[0].index;
  assert.equal(Buffer.from(record.text).subarray(byteStart, byteEnd).toString(), url);
  assert.equal(byteEnd, Buffer.byteLength(record.text));
  assert.deepEqual(record.langs, ['en']);
  assert.equal(record.createdAt, '2026-11-20T03:00:00.000Z');
  assert.deepEqual(record.embed, {
    $type: 'app.bsky.embed.external',
    external: { uri: url, title: 'The Late Cluster with Larry Nx #1: Ça, c’est le Pilote 🎙️', description: 'Desc.', thumb },
  });
  assert.equal(record.tags, undefined);
});

test('site URLs under a path keep the path; no site URL is an error', () => {
  assert.equal(episodeUrl(normalizeSiteUrl('https://u.github.io/the-late-cluster'), '001-pilot'), 'https://u.github.io/the-late-cluster/episodes/001-pilot/');
  assert.throws(() => normalizeSiteUrl('http://example.test'), /https/);
  assert.throws(() => normalizeSiteUrl('not a url'), /not a URL/);
  assert.throws(() => build(manifest(), null), /SITE_URL/);
});

test('limit is 300 graphemes, counted as graphemes rather than UTF-16 units', () => {
  // 100 thumbs-up with skin tone: 100 graphemes but 400 UTF-16 units and 800 bytes.
  const ok = build(manifest({ title: '👍🏽'.repeat(100) }));
  assert.ok(ok.record.text.length > 300, 'UTF-16 length is over 300');
  assert.ok(graphemeLength(ok.record.text) <= 300);

  assert.throws(() => build(manifest({ title: 'a'.repeat(250) })), /graphemes; Bluesky allows 300/);
});

test('the 3000-byte text limit is enforced too', () => {
  // 130 family emoji: about 260 graphemes in all, but 25 bytes each.
  assert.throws(() => build(manifest({ title: '👨‍👩‍👧‍👦'.repeat(130) })), /UTF-8 bytes; Bluesky allows 3000/);
});

test('handle-like text in the title is refused; announcements never mention', () => {
  assert.throws(() => build(manifest({ title: 'Starring @larry.bsky.social' })), /reads as tagging/);
  assert.throws(() => assertNoMentions({ facets: [{ index: {}, features: [{ $type: 'app.bsky.richtext.facet#mention', did: 'did:plc:x' }] }] }), /mention/);
  assert.throws(() => assertNoMentions({ facets: [], tags: ['simcluster'] }), /tags/);
});

test('thumbnail limit is 1,000,000 bytes and must be an image', () => {
  checkThumbnail(1_000_000, 'image/jpeg');
  assert.throws(() => checkThumbnail(1_000_001, 'image/jpeg'), /1000001 bytes.*limited to 1000000/);
  assert.throws(() => checkThumbnail(10, null), /not a JPEG/);
});

test('urlsInPost and sameUrl find earlier announcements', () => {
  const urls = urlsInPost({ embed: { external: { uri: 'https://a.test/episodes/001-pilot/' } }, facets: [{ features: [{ uri: 'https://b.test/' }] }] });
  assert.deepEqual([...urls], ['https://a.test/episodes/001-pilot/', 'https://b.test/']);
  assert.ok(sameUrl('https://A.test/episodes/001-pilot', 'https://a.test/episodes/001-pilot/'));
  assert.ok(!sameUrl('https://a.test/episodes/001-pilot/', 'https://a.test/episodes/002-x/'));
});
