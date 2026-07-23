import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDistanceMiles,
  formatDistanceString,
  PRESET_LOCATIONS,
} from './locationHelpers.js';

test('calculateDistanceMiles — returns null for invalid input coordinates', () => {
  assert.equal(calculateDistanceMiles(null, 12, 13, 14), null);
  assert.equal(calculateDistanceMiles('37', 12, 13, 14), null);
});

test('calculateDistanceMiles — returns 0 for identical coordinates', () => {
  const dist = calculateDistanceMiles(37.7749, -122.4194, 37.7749, -122.4194);
  assert.equal(dist, 0);
});

test('calculateDistanceMiles — calculates distance between Downtown and Midtown', () => {
  const loc1 = PRESET_LOCATIONS[0]; // Downtown
  const loc2 = PRESET_LOCATIONS[1]; // Midtown
  const dist = calculateDistanceMiles(loc1.lat, loc1.lng, loc2.lat, loc2.lng);
  assert.ok(dist > 0 && dist < 5);
});

test('formatDistanceString — formats null/undefined as Remote Task', () => {
  assert.equal(formatDistanceString(null), 'Remote Task');
  assert.equal(formatDistanceString(undefined), 'Remote Task');
});

test('formatDistanceString — formats small distances appropriately', () => {
  assert.equal(formatDistanceString(0.2), 'Within 0.5 mi');
  assert.equal(formatDistanceString(2.5), '2.5 mi away');
});
