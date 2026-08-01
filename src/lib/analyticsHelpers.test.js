import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTaskMetrics } from './analyticsHelpers.js';

test('calculateTaskMetrics - calculates totals and averages accurately', () => {
  const sampleTasks = [
    { bounty: 50, status: 'completed' },
    { bounty: 150, status: 'completed' },
    { bounty: 100, status: 'open' }
  ];

  const metrics = calculateTaskMetrics(sampleTasks);
  assert.equal(metrics.totalTasks, 3);
  assert.equal(metrics.totalBounty, 300);
  assert.equal(metrics.avgBounty, 100);
  assert.equal(metrics.completedCount, 2);
  assert.equal(metrics.completionRate, 67);
});

test('calculateTaskMetrics - handles empty array gracefully', () => {
  const metrics = calculateTaskMetrics([]);
  assert.equal(metrics.totalTasks, 0);
  assert.equal(metrics.totalBounty, 0);
  assert.equal(metrics.completionRate, 0);
});
