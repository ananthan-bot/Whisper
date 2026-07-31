import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateBadgeMilestoneProgress, isMilestoneReached } from './userBadgeHelpers.js';

test('userBadgeHelpers - calculateBadgeMilestoneProgress calculates percentage correctly', () => {
  assert.equal(calculateBadgeMilestoneProgress(5, 10), 50);
  assert.equal(calculateBadgeMilestoneProgress(15, 10), 100);
});

test('userBadgeHelpers - isMilestoneReached evaluates boolean threshold', () => {
  assert.equal(isMilestoneReached(10, 10), true);
  assert.equal(isMilestoneReached(9, 10), false);
});
