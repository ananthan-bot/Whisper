import test from 'node:test';
import assert from 'node:assert/strict';
import { getAriaLiveProps } from './a11yHelpers.js';

test('getAriaLiveProps - generates aria attributes correctly', () => {
  const props = getAriaLiveProps('assertive');
  assert.equal(props['aria-live'], 'assertive');
  assert.equal(props['aria-atomic'], 'true');
});

test('getAriaLiveProps - defaults to polite priority', () => {
  const props = getAriaLiveProps();
  assert.equal(props['aria-live'], 'polite');
});
