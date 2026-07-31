import test from 'node:test';
import assert from 'node:assert/strict';
import { formatTimeMMSS } from './audioTimeHelpers.js';

test('audioTimeHelpers - formatTimeMMSS formats seconds to MM:SS string', () => {
  assert.equal(formatTimeMMSS(65), '01:05');
  assert.equal(formatTimeMMSS(0), '00:00');
  assert.equal(formatTimeMMSS(-10), '00:00');
});
