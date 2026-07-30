import { test } from 'node:test';
import assert from 'node:assert';
import { formatAudioTime, getNextPlaybackSpeed, SPEED_OPTIONS, formatAudioPlaybackTime } from './audioPlayerHelpers.js';

test('formatAudioTime — formats seconds into MM:SS string', () => {
  assert.strictEqual(formatAudioTime(0), '0:00');
  assert.strictEqual(formatAudioTime(45), '0:45');
  assert.strictEqual(formatAudioTime(125), '2:05');
  assert.strictEqual(formatAudioTime(null), '0:00');
});

test('formatAudioPlaybackTime — formats current and total duration string', () => {
  assert.strictEqual(formatAudioPlaybackTime(15, 90), '0:15 / 1:30');
  assert.strictEqual(formatAudioPlaybackTime(45, 0), '0:45');
});


test('getNextPlaybackSpeed — cycles through available speed multipliers', () => {
  assert.strictEqual(getNextPlaybackSpeed(1), 1.25);
  assert.strictEqual(getNextPlaybackSpeed(1.25), 1.5);
  assert.strictEqual(getNextPlaybackSpeed(1.5), 2);
  assert.strictEqual(getNextPlaybackSpeed(2), 1);
});
