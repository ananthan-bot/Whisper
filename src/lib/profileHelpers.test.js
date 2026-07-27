import { test } from 'node:test';
import assert from 'node:assert';
import { calculateProfileStats, getEarnedBadges, BADGE_DEFINITIONS } from './profileHelpers.js';

test('calculateProfileStats — computes posted, claimed, and total bounty metrics correctly', () => {
  const mockTasks = [
    { id: '1', alias: 'User #1042', status: 'open', bounty: 30 },
    { id: '2', alias: 'User #9999', helperAlias: 'User #1042', status: 'accepted', bounty: 40 },
    { id: '3', alias: 'User #1042', status: 'accepted', bounty: 25 },
  ];

  const stats = calculateProfileStats(mockTasks, {}, 'User #1042');
  assert.strictEqual(stats.postedCount, 2);
  assert.strictEqual(stats.claimedCount, 1);
  assert.strictEqual(stats.totalBountySpent, 55);
  assert.strictEqual(stats.totalBountyEarned, 40);
});

test('getEarnedBadges — awards badges based on activity milestones', () => {
  const statsEmpty = { postedCount: 0, claimedCount: 0, completedCount: 0, ratingAverage: 0, totalBountyEarned: 0 };
  assert.strictEqual(getEarnedBadges(statsEmpty).length, 0);

  const statsActive = {
    postedCount: 1,
    claimedCount: 1,
    completedCount: 3,
    ratingAverage: 4.9,
    totalBountyEarned: 150,
  };

  const badges = getEarnedBadges(statsActive);
  assert.strictEqual(badges.length, 5);
  assert.strictEqual(badges[0].id, BADGE_DEFINITIONS[0].id);
});
