import test from 'node:test';
import assert from 'node:assert/strict';
import { getCategoryBadgeClass, formatCategoryLabel } from './categoryBadgeHelpers.js';

test('categoryBadgeHelpers - getCategoryBadgeClass maps category to class string', () => {
  assert.ok(getCategoryBadgeClass('negotiator').includes('amber'));
  assert.ok(getCategoryBadgeClass('secretary').includes('blue'));
  assert.ok(getCategoryBadgeClass('unknown').includes('slate'));
});

test('categoryBadgeHelpers - formatCategoryLabel capitalizes string correctly', () => {
  assert.equal(formatCategoryLabel('wordsmith'), 'Wordsmith');
  assert.equal(formatCategoryLabel(''), 'General');
});
