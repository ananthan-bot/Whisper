import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateLevelFromXP, calculateUserXP, LEVEL_TIERS } from './gamificationHelpers.js';

test('calculateLevelFromXP - returns level 1 for 0 XP', () => {
  const result = calculateLevelFromXP(0);
  assert.equal(result.level, 1);
  assert.equal(result.title, 'Novice Helper');
  assert.equal(result.progressPercentage, 0);
  assert.equal(result.xpToNextLevel, 100);
});

test('calculateLevelFromXP - calculates progress percentage correctly for level 2', () => {
  const result = calculateLevelFromXP(200);
  assert.equal(result.level, 2);
  assert.equal(result.title, 'Active Scout');
  // (200-100) / (300-100) = 100/200 = 50%
  assert.equal(result.progressPercentage, 50);
});

test('calculateUserXP - awards XP for completed tasks and ratings', () => {
  const tasks = [
    { id: '1', status: 'completed', hasProof: true },
    { id: '2', status: 'completed', hasProof: false }
  ];
  const ratings = { '1': 5 };

  const result = calculateUserXP(tasks, ratings);
  assert.ok(result.xp > 0);
  assert.equal(result.streakCount, 2);
  assert.equal(result.level, 2);
});
