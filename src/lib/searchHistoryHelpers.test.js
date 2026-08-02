import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { addSearchTerm, removeSearchTerm, filterRecentSearches } from './searchHistoryHelpers.js';

describe('searchHistoryHelpers', () => {
  test('addSearchTerm prepends term and deduplicates case-insensitively', () => {
    const history = ['cleaning', 'moving'];
    const updated = addSearchTerm(history, 'Cleaning');
    assert.deepEqual(updated, ['Cleaning', 'moving']);
  });

  test('addSearchTerm respects maxItems limit', () => {
    const history = ['a', 'b', 'c', 'd', 'e'];
    const updated = addSearchTerm(history, 'new', 5);
    assert.equal(updated.length, 5);
    assert.equal(updated[0], 'new');
  });

  test('removeSearchTerm removes targeted term', () => {
    const history = ['cleaning', 'moving', 'delivery'];
    const updated = removeSearchTerm(history, 'moving');
    assert.deepEqual(updated, ['cleaning', 'delivery']);
  });

  test('filterRecentSearches matches partial search query', () => {
    const history = ['grocery delivery', 'apartment move', 'cat sitting'];
    const matches = filterRecentSearches(history, 'deliv');
    assert.deepEqual(matches, ['grocery delivery']);
  });
});
