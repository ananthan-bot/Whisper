import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateUserStats, REPUTATION_TIERS } from './reputationHelpers.js';

test('calculateUserStats — returns default rookie stats when user has no tasks', () => {
  const stats = calculateUserStats('User #1000', [], {});
  assert.equal(stats.completedCount, 0);
  assert.equal(stats.totalClaimed, 0);
  assert.equal(stats.completionRate, 100);
  assert.equal(stats.averageRating, 5.0);
  assert.equal(stats.tier.name, 'Rookie Helper');
  assert.deepEqual(stats.badges, []);
});

test('calculateUserStats — handles null or missing alias', () => {
  const stats = calculateUserStats(null);
  assert.equal(stats.tier.name, 'Rookie Helper');
});

test('calculateUserStats — computes completed count and ratings correctly', () => {
  const tasks = [
    { id: 'T1', helperAlias: 'Helper #1', status: 'accepted' },
    { id: 'T2', helperAlias: 'Helper #1', status: 'accepted' },
    { id: 'T3', helperAlias: 'Helper #1', status: 'claimed' },
  ];
  const ratings = { T1: 5, T2: 4 };

  const stats = calculateUserStats('Helper #1', tasks, ratings);
  assert.equal(stats.completedCount, 2);
  assert.equal(stats.totalClaimed, 3);
  assert.equal(stats.completionRate, 67);
  assert.equal(stats.averageRating, 4.5);
  assert.equal(stats.badges.length, 1); // First task badge
});

test('calculateUserStats — upgrades tier when thresholds met', () => {
  const tasks = Array.from({ length: 4 }, (_, i) => ({
    id: `T_${i}`,
    helperAlias: 'Helper #2',
    status: 'accepted',
  }));
  const ratings = { T_0: 4, T_1: 4, T_2: 4, T_3: 4 };

  const stats = calculateUserStats('Helper #2', tasks, ratings);
  assert.equal(stats.tier.name, 'Bronze Negotiator');
});
