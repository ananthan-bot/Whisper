import test from 'node:test';
import assert from 'node:assert/strict';
import { formatBytes, calculateStoragePercentage } from './storageHelpers.js';

test('formatBytes - formats byte values correctly', () => {
  assert.equal(formatBytes(0), '0 B');
  assert.equal(formatBytes(1024), '1 KB');
  assert.equal(formatBytes(1048576), '1 MB');
  assert.equal(formatBytes(5242880), '5 MB');
});

test('calculateStoragePercentage - computes percentage accurately', () => {
  assert.equal(calculateStoragePercentage(50, 100), 50);
  assert.equal(calculateStoragePercentage(150, 100), 100);
  assert.equal(calculateStoragePercentage(0, 100), 0);
  assert.equal(calculateStoragePercentage(10, 0), 0);
});
