import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateCategoryStats } from './categoryStatsHelpers.js';

describe('categoryStatsHelpers', () => {
  it('calculateCategoryStats returns empty object for non-array input', () => {
    assert.deepEqual(calculateCategoryStats(null), {});
  });

  it('calculateCategoryStats aggregates task categories correctly', () => {
    const tasks = [
      { category: 'negotiator', bounty: 40 },
      { category: 'negotiator', bounty: 60 },
      { category: 'secretary', bounty: 20 },
    ];
    const stats = calculateCategoryStats(tasks);
    assert.equal(stats.negotiator.count, 2);
    assert.equal(stats.negotiator.totalBounty, 100);
    assert.equal(stats.negotiator.avgBounty, 50);
    assert.equal(stats.secretary.count, 1);
  });
});
