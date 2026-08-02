import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculateUserStreak, isStreakActive, formatStreakLabel } from './streakHelpers.js';

describe('streakHelpers', () => {
  const refDate = new Date('2026-08-02T12:00:00Z');

  test('calculateUserStreak returns 0 for empty array', () => {
    assert.equal(calculateUserStreak([], refDate), 0);
  });

  test('calculateUserStreak calculates consecutive days accurately', () => {
    const dates = [
      '2026-08-02T10:00:00Z',
      '2026-08-01T15:00:00Z',
      '2026-07-31T09:00:00Z'
    ];
    assert.equal(calculateUserStreak(dates, refDate), 3);
  });

  test('calculateUserStreak breaks streak on missed day', () => {
    const dates = [
      '2026-08-02T10:00:00Z',
      '2026-07-30T15:00:00Z'
    ];
    assert.equal(calculateUserStreak(dates, refDate), 1);
  });

  test('isStreakActive returns true if activity today or yesterday', () => {
    assert.equal(isStreakActive('2026-08-02T08:00:00Z', refDate), true);
    assert.equal(isStreakActive('2026-08-01T20:00:00Z', refDate), true);
    assert.equal(isStreakActive('2026-07-25T10:00:00Z', refDate), false);
  });

  test('formatStreakLabel formats output strings correctly', () => {
    assert.equal(formatStreakLabel(0), 'No active streak');
    assert.equal(formatStreakLabel(1), '🔥 1 day streak!');
    assert.equal(formatStreakLabel(5), '🔥 5 days streak!');
  });
});
