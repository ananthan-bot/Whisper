import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSearchQuery } from './searchQueryHelpers.js';

test('parseSearchQuery - extracts keywords, hashtags and urgent flag', () => {
  const result = parseSearchQuery('delivery #urgentTask !urgent packages');
  assert.deepEqual(result.keywords, ['delivery', 'packages']);
  assert.deepEqual(result.hashtags, ['urgenttask']);
  assert.equal(result.isUrgentOnly, true);
});

test('parseSearchQuery - handles empty or non-string inputs', () => {
  const emptyResult = parseSearchQuery('');
  assert.deepEqual(emptyResult.keywords, []);
  assert.deepEqual(emptyResult.hashtags, []);
  assert.equal(emptyResult.isUrgentOnly, false);
});
