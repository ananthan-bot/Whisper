import test from 'node:test';
import assert from 'node:assert/strict';
import { highlightKeywords } from './textHelpers.js';

test('highlightKeywords — returns single non-match segment when query is empty', () => {
  const res = highlightKeywords('Call Comcast', '');
  assert.deepEqual(res, [{ text: 'Call Comcast', match: false }]);
});

test('highlightKeywords — correctly splits matching keyword case-insensitively', () => {
  const res = highlightKeywords('Call Comcast support today', 'comcast');
  assert.equal(res.length, 3);
  assert.equal(res[0].text, 'Call ');
  assert.equal(res[0].match, false);
  assert.equal(res[1].text, 'Comcast');
  assert.equal(res[1].match, true);
  assert.equal(res[2].text, ' support today');
  assert.equal(res[2].match, false);
});

test('highlightKeywords — handles special regex characters gracefully', () => {
  const res = highlightKeywords('Price is $50.00 total', '$50.00');
  assert.equal(res.some((r) => r.match), true);
});
