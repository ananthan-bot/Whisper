import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEstimatedDurationMinutes,
  formatDurationHuman,
  isLongTask
} from './taskTimeEstimateHelpers.js';

describe('taskTimeEstimateHelpers', () => {
  test('calculateEstimatedDurationMinutes uses explicit estimatedMinutes if provided', () => {
    assert.equal(calculateEstimatedDurationMinutes({ estimatedMinutes: 45 }), 45);
  });

  test('calculateEstimatedDurationMinutes calculates heuristic based on keywords', () => {
    assert.equal(calculateEstimatedDurationMinutes({ title: 'Quick coffee pickup' }), 15);
    assert.equal(calculateEstimatedDurationMinutes({ title: 'Full day apartment moving' }), 240);
  });

  test('formatDurationHuman formats minutes into human readable strings', () => {
    assert.equal(formatDurationHuman(15), '15m');
    assert.equal(formatDurationHuman(60), '1h');
    assert.equal(formatDurationHuman(90), '1h 30m');
    assert.equal(formatDurationHuman(0), '0m');
  });

  test('isLongTask returns true for tasks >= 120 minutes', () => {
    assert.equal(isLongTask(90), false);
    assert.equal(isLongTask(120), true);
    assert.equal(isLongTask(180), true);
  });
});
