import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateUserActivitySummary } from './userActivityHelpers.js';

describe('userActivityHelpers', () => {
  it('returns default zero values for invalid inputs', () => {
    const summary = calculateUserActivitySummary(null, '');
    assert.deepEqual(summary, { posted: 0, completed: 0, totalBounty: 0, completionRate: 0 });
  });

  it('calculates metrics correctly for user tasks', () => {
    const tasks = [
      { alias: 'Alex', status: 'accepted', bounty: 50 },
      { alias: 'Alex', status: 'open', bounty: 25 },
      { alias: 'Sam', status: 'accepted', bounty: 100 },
    ];
    const summary = calculateUserActivitySummary(tasks, 'Alex');
    assert.equal(summary.posted, 2);
    assert.equal(summary.completed, 1);
    assert.equal(summary.totalBounty, 75);
    assert.equal(summary.completionRate, 50);
  });
});
