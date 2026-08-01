import test from 'node:test';
import assert from 'node:assert/strict';

test('useDebounce - hook module loads correctly', async () => {
  const mod = await import('./useDebounce.js');
  assert.ok(typeof mod.useDebounce === 'function');
});
