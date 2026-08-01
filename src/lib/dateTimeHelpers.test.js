import test from 'node:test';
import assert from 'node:assert/strict';
import { formatShortDateTime, isToday } from './dateTimeHelpers.js';

test('formatShortDateTime - formats valid date correctly', () => {
  const result = formatShortDateTime('2026-08-01T10:00:00Z');
  assert.ok(result.includes('Aug') || result.includes('1'));
});

test('formatShortDateTime - returns empty string for falsy input', () => {
  assert.equal(formatShortDateTime(null), '');
  assert.equal(formatShortDateTime(''), '');
  assert.equal(formatShortDateTime('invalid-date'), '');
});

test('isToday - accurately identifies today date', () => {
  const today = new Date().toISOString();
  assert.equal(isToday(today), true);
  assert.equal(isToday('2020-01-01T00:00:00Z'), false);
  assert.equal(isToday(null), false);
});
