import test from 'node:test';
import assert from 'node:assert/strict';
import { getTaskUrgencyTier, getUrgencyTierBadgeClass } from './taskUrgencyHelpers.js';

test('getTaskUrgencyTier - marks urgent flag as critical', () => {
  assert.equal(getTaskUrgencyTier({ isUrgent: true }), 'critical');
});

test('getTaskUrgencyTier - calculates high tier for bounties >= 100', () => {
  assert.equal(getTaskUrgencyTier({ bounty: 120 }), 'high');
});

test('getTaskUrgencyTier - defaults to low tier for basic tasks', () => {
  assert.equal(getTaskUrgencyTier({ bounty: 10 }), 'low');
  assert.equal(getTaskUrgencyTier(null), 'low');
});

test('getUrgencyTierBadgeClass - returns appropriate class strings', () => {
  assert.ok(getUrgencyTierBadgeClass('critical').includes('red'));
  assert.ok(getUrgencyTierBadgeClass('high').includes('orange'));
  assert.ok(getUrgencyTierBadgeClass('medium').includes('amber'));
  assert.ok(getUrgencyTierBadgeClass('low').includes('slate'));
});
