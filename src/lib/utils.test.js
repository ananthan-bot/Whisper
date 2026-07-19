import test from 'node:test';
import assert from 'node:assert';
import { formatRelativeTime, truncate, generateAlias } from './utils.js';

test('formatRelativeTime helper', () => {
  const now = new Date();
  
  // Just now
  assert.strictEqual(formatRelativeTime(now.toISOString()), 'just now');

  // Minutes ago
  const fiveMinAgo = new Date(now - 1000 * 60 * 5);
  assert.strictEqual(formatRelativeTime(fiveMinAgo.toISOString()), '5 min ago');

  // Hours ago
  const twoHoursAgo = new Date(now - 1000 * 60 * 60 * 2);
  assert.strictEqual(formatRelativeTime(twoHoursAgo.toISOString()), '2h ago');

  // Yesterday
  const yesterday = new Date(now - 1000 * 60 * 60 * 24);
  assert.strictEqual(formatRelativeTime(yesterday.toISOString()), 'yesterday');
});

test('truncate helper', () => {
  assert.strictEqual(truncate('Hello World', 5), 'Hello…');
  assert.strictEqual(truncate('Short', 10), 'Short');
  assert.strictEqual(truncate('', 5), '');
});

test('generateAlias helper', () => {
  const alias1 = generateAlias();
  const alias2 = generateAlias();
  
  assert.match(alias1, /^User #\d{4}$/);
  assert.match(alias2, /^User #\d{4}$/);
});
