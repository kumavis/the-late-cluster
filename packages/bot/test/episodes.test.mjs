import { test } from 'node:test';
import assert from 'node:assert/strict';
import { imageMimeType, loadPublishedEpisode, resolveEpisodeId } from '../src/episodes.mjs';
import { FIXTURE_ROOT, manifest, tempRepo } from './helpers.mjs';

test('accepts 1, 001 and 001-pilot', () => {
  for (const ep of ['1', '001', '001-pilot', 1]) assert.equal(resolveEpisodeId(ep, FIXTURE_ROOT), '001-pilot');
});

test('loads a published, built episode', () => {
  const ep = loadPublishedEpisode('1', FIXTURE_ROOT);
  assert.equal(ep.id, '001-pilot');
  assert.equal(ep.manifest.title, 'Pilot');
  assert.ok(ep.thumbnailSize > 0 && ep.thumbnailSize < 10_000);
});

test('refuses a missing episode', () => {
  assert.throws(() => loadPublishedEpisode('4', FIXTURE_ROOT), /episode 4 is missing/);
  assert.throws(() => loadPublishedEpisode('009-nope', FIXTURE_ROOT), /009-nope is missing/);
});

test('refuses an unbuilt episode (source folder, no dist manifest)', () => {
  assert.throws(() => loadPublishedEpisode('3', FIXTURE_ROOT), /003-unbuilt is unbuilt.*npm run build -- 003-unbuilt/);
});

test('refuses a draft', () => {
  assert.throws(() => loadPublishedEpisode('002', FIXTURE_ROOT), /status "draft"; only published/);
});

test('refuses a manifest with no build object', () => {
  const m = manifest(); delete m.build;
  assert.throws(() => loadPublishedEpisode('1', tempRepo(m)), /unbuilt.*no build.sourceHash/);
});

test('refuses invalid manifests with a list of problems', () => {
  assert.throws(() => loadPublishedEpisode('1', tempRepo('{ nope')), /not valid JSON/);
  const bad = tempRepo(manifest({ number: 2, title: '', description: 7, status: 'live' }));
  assert.throws(() => loadPublishedEpisode('1', bad), (e) => {
    for (const s of ['number 2 does not match', 'title must be', 'description must be', 'status must be']) assert.ok(e.message.includes(s), s);
    return true;
  });
  const wrongId = tempRepo(manifest({ id: '001-other' }), { dirId: '001-pilot' });
  assert.throws(() => loadPublishedEpisode('1', wrongId), /id is "001-other", expected "001-pilot"/);
});

test('refuses a missing thumbnail', () => {
  assert.throws(() => loadPublishedEpisode('1', tempRepo(manifest(), { thumbnail: null })), /no thumbnail/);
});

test('rejects arguments that are not an episode', () => {
  assert.throws(() => resolveEpisodeId('pilot', FIXTURE_ROOT), /not an episode number or id/);
  assert.throws(() => resolveEpisodeId('', FIXTURE_ROOT), /not an episode number or id/);
});

test('sniffs image types from bytes', () => {
  assert.equal(imageMimeType(Buffer.from([0xff, 0xd8, 0xff, 0xe0])), 'image/jpeg');
  assert.equal(imageMimeType(Buffer.from([0x89, 0x50, 0x4e, 0x47])), 'image/png');
  assert.equal(imageMimeType(Buffer.from('GIF89a')), null);
});
