import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { filterItemsByDateRange, getDateRangeLabel } from './dateRangeHelpers.js';

describe('dateRangeHelpers', () => {
  it('filterItemsByDateRange returns empty array for invalid input', () => {
    assert.deepEqual(filterItemsByDateRange(null), []);
  });

  it('filterItemsByDateRange returns all items when range is all', () => {
    const items = [{ createdAt: new Date().toISOString() }];
    assert.deepEqual(filterItemsByDateRange(items, 'all'), items);
  });

  it('filterItemsByDateRange filters items within 7days', () => {
    const recent = { createdAt: new Date().toISOString() };
    const old = { createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() };
    const result = filterItemsByDateRange([recent, old], '7days');
    assert.equal(result.length, 1);
    assert.deepEqual(result[0], recent);
  });

  it('getDateRangeLabel returns correct display string', () => {
    assert.equal(getDateRangeLabel('7days'), 'Past 7 Days');
    assert.equal(getDateRangeLabel('unknown'), 'All Time');
  });
});
