import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadSettings } from '../src/config.mjs';

function files(t, { bot, show }) {
  const dir = mkdtempSync(join(tmpdir(), 'late-cluster-bot-config-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const configPath = join(dir, 'bot.config.json');
  const showConfigPath = join(dir, 'show.config.json');
  if (bot !== undefined) writeFileSync(configPath, JSON.stringify(bot));
  if (show !== undefined) writeFileSync(showConfigPath, JSON.stringify(show));
  return { configPath, showConfigPath };
}

test('site URL: SITE_URL, then bot.config.json, then the root show.config.json', (t) => {
  const paths = files(t, { bot: { siteUrl: 'https://bot.example.test/a' }, show: { siteUrl: 'https://show.example.test/b' } });
  assert.equal(loadSettings({ env: { SITE_URL: 'https://env.example.test/' }, ...paths }).siteUrl, 'https://env.example.test/');
  assert.equal(loadSettings({ env: {}, ...paths }).siteUrl, 'https://bot.example.test/a/');
});

test('site URL falls back to show.config.json when the bot sets none', (t) => {
  const paths = files(t, { bot: { siteUrl: '' }, show: { siteUrl: 'https://show.example.test/the-late-cluster' } });
  assert.equal(loadSettings({ env: { SITE_URL: '' }, ...paths }).siteUrl, 'https://show.example.test/the-late-cluster/');
});

test('no site URL anywhere (or no show.config.json) leaves it unset', (t) => {
  assert.equal(loadSettings({ env: {}, ...files(t, { bot: {}, show: { siteUrl: '' } }) }).siteUrl, null);
  assert.equal(loadSettings({ env: {}, ...files(t, {}) }).siteUrl, null);
});

test('a bad URL in show.config.json is rejected like any other', (t) => {
  assert.throws(() => loadSettings({ env: {}, ...files(t, { show: { siteUrl: 'http://insecure.example.test/' } }) }), /https/);
});

test('handle: BSKY_HANDLE, else bluesky.handle in show.config.json; the did comes from configuration', (t) => {
  const paths = files(t, { bot: {}, show: { bluesky: { handle: 'latecluster.simcluster.tv', did: 'did:plc:zdobmviiuyfkc6xyylmpm2sf' } } });
  const fromConfig = loadSettings({ env: {}, ...paths });
  assert.equal(fromConfig.handle, 'latecluster.simcluster.tv');
  assert.equal(fromConfig.handleSource, 'show.config.json');
  assert.equal(fromConfig.did, 'did:plc:zdobmviiuyfkc6xyylmpm2sf');
  const fromEnv = loadSettings({ env: { BSKY_HANDLE: '@other.example.test' }, ...paths });
  assert.equal(fromEnv.handle, 'other.example.test');
  assert.equal(fromEnv.handleSource, 'BSKY_HANDLE');
  const none = loadSettings({ env: {}, ...files(t, {}) });
  assert.equal(none.handle, null);
  assert.equal(none.handleSource, null);
});
