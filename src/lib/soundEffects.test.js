import test from 'node:test';
import assert from 'node:assert/strict';
import { sounds } from './soundEffects.js';

test('sounds - toggleSound toggles enabled flag', () => {
  sounds.enabled = true;
  assert.equal(sounds.toggleSound(false), false);
  assert.equal(sounds.enabled, false);
  assert.equal(sounds.toggleSound(true), true);
  assert.equal(sounds.enabled, true);
  assert.equal(sounds.toggleSound(), false);
});

test('sounds - playClick handles disabled state cleanly without throwing', () => {
  sounds.enabled = false;
  assert.doesNotThrow(() => {
    sounds.playClick();
  });
});

test('sounds - playSuccess handles disabled state cleanly without throwing', () => {
  sounds.enabled = false;
  assert.doesNotThrow(() => {
    sounds.playSuccess();
  });
});

test('sounds - playNotification handles disabled state cleanly without throwing', () => {
  sounds.enabled = false;
  assert.doesNotThrow(() => {
    sounds.playNotification();
  });
});
