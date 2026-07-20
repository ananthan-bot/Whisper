import test   from 'node:test';
import assert from 'node:assert/strict';
import { formatRelativeTime, truncate, generateAlias } from './utils.js';

// ─── formatRelativeTime ───────────────────────────────────────────────────────

test('formatRelativeTime — returns empty string for falsy input', () => {
  assert.equal(formatRelativeTime(null),      '');
  assert.equal(formatRelativeTime(undefined), '');
  assert.equal(formatRelativeTime(''),        '');
});

test('formatRelativeTime — "just now" for timestamps under 10 seconds old', () => {
  const now = new Date();
  assert.equal(formatRelativeTime(now.toISOString()), 'just now');

  const fiveSec = new Date(now - 5_000);
  assert.equal(formatRelativeTime(fiveSec.toISOString()), 'just now');
});

test('formatRelativeTime — seconds ago for 10–59 seconds', () => {
  const thirtySecAgo = new Date(Date.now() - 30_000);
  assert.match(formatRelativeTime(thirtySecAgo.toISOString()), /^\d+s ago$/);
});

test('formatRelativeTime — minutes ago for 1–59 minutes', () => {
  const oneMinAgo   = new Date(Date.now() - 60_000);
  const fiveMinAgo  = new Date(Date.now() - 5 * 60_000);
  const fiftyMinAgo = new Date(Date.now() - 50 * 60_000);

  assert.equal(formatRelativeTime(oneMinAgo.toISOString()),   '1 min ago');
  assert.equal(formatRelativeTime(fiveMinAgo.toISOString()),  '5 min ago');
  assert.equal(formatRelativeTime(fiftyMinAgo.toISOString()), '50 min ago');
});

test('formatRelativeTime — hours ago for 1–23 hours', () => {
  const oneHrAgo = new Date(Date.now() - 3_600_000);
  const twoHrAgo = new Date(Date.now() - 2 * 3_600_000);
  const tenHrAgo = new Date(Date.now() - 10 * 3_600_000);

  assert.equal(formatRelativeTime(oneHrAgo.toISOString()), '1h ago');
  assert.equal(formatRelativeTime(twoHrAgo.toISOString()), '2h ago');
  assert.equal(formatRelativeTime(tenHrAgo.toISOString()), '10h ago');
});

test('formatRelativeTime — "yesterday" for exactly 24 hours ago', () => {
  const yesterday = new Date(Date.now() - 24 * 3_600_000);
  assert.equal(formatRelativeTime(yesterday.toISOString()), 'yesterday');
});

test('formatRelativeTime — days ago for 2–6 days', () => {
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 3_600_000);
  const sixDaysAgo   = new Date(Date.now() - 6 * 24 * 3_600_000);

  assert.match(formatRelativeTime(threeDaysAgo.toISOString()), /^3d ago$/);
  assert.match(formatRelativeTime(sixDaysAgo.toISOString()),   /^6d ago$/);
});

test('formatRelativeTime — short date for timestamps older than 7 days', () => {
  const tenDaysAgo = new Date(Date.now() - 10 * 24 * 3_600_000);
  const result = formatRelativeTime(tenDaysAgo.toISOString());
  // Looks like "Jul 10" — month abbreviation + day number
  assert.match(result, /^[A-Z][a-z]{2} \d{1,2}$/);
});

// ─── truncate ─────────────────────────────────────────────────────────────────

test('truncate — appends ellipsis when string exceeds maxLen', () => {
  assert.equal(truncate('Hello World', 5), 'Hello…');
});

test('truncate — returns original string when within maxLen', () => {
  assert.equal(truncate('Short', 10), 'Short');
});

test('truncate — returns empty string for empty input', () => {
  assert.equal(truncate('', 5), '');
});

test('truncate — returns empty string for falsy input', () => {
  assert.equal(truncate(null, 5),      '');
  assert.equal(truncate(undefined, 5), '');
});

test('truncate — does not truncate when string length equals maxLen', () => {
  assert.equal(truncate('Hello', 5), 'Hello');
});

test('truncate — uses default maxLen of 120 when not provided', () => {
  const longString = 'a'.repeat(121);
  const result = truncate(longString);
  assert.equal(result.length, 121); // 120 chars + '…'
  assert.ok(result.endsWith('…'));
});

test('truncate — works with multi-byte characters', () => {
  assert.equal(truncate('café', 3), 'caf…');
});

// ─── generateAlias ────────────────────────────────────────────────────────────

test('generateAlias — returns string matching "User #NNNN" format', () => {
  for (let i = 0; i < 10; i++) {
    assert.match(generateAlias(), /^User #\d{4}$/);
  }
});

test('generateAlias — numeric part is between 1000 and 9999', () => {
  for (let i = 0; i < 20; i++) {
    const alias = generateAlias();
    const num = parseInt(alias.replace('User #', ''), 10);
    assert.ok(num >= 1000 && num <= 9999, `Expected 1000–9999, got ${num}`);
  }
});

test('generateAlias — produces multiple distinct values across calls', () => {
  const aliases = new Set(Array.from({ length: 50 }, generateAlias));
  assert.ok(aliases.size > 1, 'Expected more than one distinct alias in 50 calls');
});
