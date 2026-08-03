import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateTaskUrgencyScore, getUrgencyScoreColorClass } from './urgencyScoreHelpers.js';

describe('urgencyScoreHelpers', () => {
  it('calculateTaskUrgencyScore returns 0 for null task', () => {
    assert.equal(calculateTaskUrgencyScore(null), 0);
  });

  it('calculateTaskUrgencyScore calculates score for basic task', () => {
    const task = { bounty: 30, isUrgent: false, category: 'researcher' };
    assert.equal(calculateTaskUrgencyScore(task), 30);
  });

  it('calculateTaskUrgencyScore adds points for urgent flag and category', () => {
    const task = { bounty: 40, isUrgent: true, category: 'negotiator' };
    assert.equal(calculateTaskUrgencyScore(task), 85);
  });

  it('getUrgencyScoreColorClass returns rose for score >= 75', () => {
    assert.ok(getUrgencyScoreColorClass(80).includes('rose'));
  });

  it('getUrgencyScoreColorClass returns amber for score >= 45', () => {
    assert.ok(getUrgencyScoreColorClass(50).includes('amber'));
  });

  it('getUrgencyScoreColorClass returns emerald for low scores', () => {
    assert.ok(getUrgencyScoreColorClass(20).includes('emerald'));
  });
});
