import test from 'node:test';
import assert from 'node:assert/strict';
import { clampVolume, formatVolumePercentage, isMuted } from './audioVolumeHelpers.js';

test('audioVolumeHelpers - clampVolume restricts values to range', () => {
  assert.equal(clampVolume(0.5), 0.5);
  assert.equal(clampVolume(1.5), 1);
  assert.equal(clampVolume(-0.2), 0);
  assert.equal(clampVolume('invalid'), 0.8);
});

test('audioVolumeHelpers - formatVolumePercentage returns readable string', () => {
  assert.equal(formatVolumePercentage(0.75), '75%');
  assert.equal(formatVolumePercentage(0), '0%');
});

test('audioVolumeHelpers - isMuted checks zero volume correctly', () => {
  assert.equal(isMuted(0), true);
  assert.equal(isMuted(0.5), false);
});
