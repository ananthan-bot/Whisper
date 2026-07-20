/**
 * src/lib/cn.test.js
 * Unit tests for the cn() class-merging helper.
 *
 * Run with:  node --test src/lib/cn.test.js
 */
import test   from 'node:test';
import assert from 'node:assert/strict';
import { cn } from './cn.js';

test('cn — returns empty string when called with no arguments', () => {
  assert.equal(cn(), '');
});

test('cn — returns a single class unchanged', () => {
  assert.equal(cn('foo'), 'foo');
});

test('cn — joins multiple classes with a space', () => {
  assert.equal(cn('foo', 'bar', 'baz'), 'foo bar baz');
});

test('cn — ignores falsy values (false, null, undefined, 0)', () => {
  assert.equal(cn('foo', false, null, undefined, 0, 'bar'), 'foo bar');
});

test('cn — handles conditional object syntax from clsx', () => {
  assert.equal(cn({ active: true, disabled: false }), 'active');
});

test('cn — handles mixed strings and conditional objects', () => {
  assert.equal(cn('base', { active: true, hidden: false }, 'extra'), 'base active extra');
});

test('cn — deduplicates conflicting Tailwind classes (tailwind-merge)', () => {
  // tailwind-merge should keep only the last of conflicting utilities
  const result = cn('p-2', 'p-4');
  assert.equal(result, 'p-4');
});

test('cn — deduplicates conflicting text-color utilities', () => {
  const result = cn('text-red-500', 'text-blue-600');
  assert.equal(result, 'text-blue-600');
});

test('cn — keeps non-conflicting classes alongside deduplicated ones', () => {
  const result = cn('flex', 'text-sm', 'text-lg', 'font-bold');
  assert.equal(result, 'flex text-lg font-bold');
});

test('cn — handles array-style clsx input', () => {
  assert.equal(cn(['foo', 'bar']), 'foo bar');
});

test('cn — handles deeply nested arrays', () => {
  assert.equal(cn(['foo', ['bar', 'baz']]), 'foo bar baz');
});

test('cn — returns empty string for all-falsy input', () => {
  assert.equal(cn(false, null, undefined), '');
});
