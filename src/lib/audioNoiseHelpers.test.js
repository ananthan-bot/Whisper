import test from 'node:test';
import assert from 'node:assert/strict';
import { getAudioConstraints, getNoiseFilterLabel } from './audioNoiseHelpers.js';

test('getAudioConstraints - sets noiseSuppression flag properly', () => {
  assert.equal(getAudioConstraints(true).audio.noiseSuppression, true);
  assert.equal(getAudioConstraints(false).audio.noiseSuppression, false);
});

test('getNoiseFilterLabel - generates correct label strings', () => {
  assert.equal(getNoiseFilterLabel(true), 'Noise Suppression: Active');
  assert.equal(getNoiseFilterLabel(false), 'Noise Suppression: Disabled');
});
