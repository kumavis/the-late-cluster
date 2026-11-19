import { test } from 'node:test';
import assert from 'node:assert/strict';
import { byteSlice, graphemeLength, HANDLE_LIKE, linkFacet, utf8Length } from '../src/richtext.mjs';

const slice = (text, { byteStart, byteEnd }) => Buffer.from(text, 'utf8').subarray(byteStart, byteEnd).toString('utf8');

test('link facet offsets are UTF-8 bytes, not UTF-16 units or code points', () => {
  const url = 'https://example.test/episodes/002-café/';
  const text = `Ça va? 🎙️👨‍👩‍👧 Larry’s 深夜 show: ${url}`;
  const facet = linkFacet(text, url);
  const jsIndex = text.indexOf(url);
  const codePoints = [...text.slice(0, jsIndex)].length;
  assert.notEqual(facet.index.byteStart, jsIndex, 'differs from UTF-16 index');
  assert.notEqual(facet.index.byteStart, codePoints, 'differs from code point index');
  assert.equal(facet.index.byteStart, Buffer.byteLength(text.slice(0, jsIndex), 'utf8'));
  assert.equal(facet.index.byteEnd - facet.index.byteStart, Buffer.byteLength(url, 'utf8'));
  assert.equal(slice(text, facet.index), url);
  assert.deepEqual(facet.features, [{ $type: 'app.bsky.richtext.facet#link', uri: url }]);
});

test('byteSlice honours the search start and rejects a missing target', () => {
  const text = 'é x é x';
  const second = byteSlice(text, 'x', 3);
  assert.equal(slice(text, second), 'x');
  assert.equal(second.byteStart, utf8Length('é x é '));
  assert.throws(() => byteSlice(text, 'nope'), /not found/);
});

test('grapheme counting treats emoji sequences and combining marks as one each', () => {
  assert.equal(graphemeLength('👨‍👩‍👧‍👦'), 1);
  assert.equal(graphemeLength('👍🏽'), 1);
  assert.equal(graphemeLength('é'), 1);
  assert.equal(graphemeLength('🇯🇵🇫🇷'), 2);
  assert.equal(graphemeLength('abc'), 3);
});

test('HANDLE_LIKE spots tags but not emails or bare @', () => {
  assert.match('hi @larry.bsky.social', HANDLE_LIKE);
  assert.match('@did:plc:abc', HANDLE_LIKE);
  assert.doesNotMatch('mail larry@example.com', HANDLE_LIKE);
  assert.doesNotMatch('meet @ 9pm', HANDLE_LIKE);
  assert.doesNotMatch('the @larry bit', HANDLE_LIKE);
});
