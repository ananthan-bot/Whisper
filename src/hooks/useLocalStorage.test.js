import test from 'node:test';
import assert from 'node:assert/strict';

test('useLocalStorage - module imports cleanly', async () => {
  const mod = await import('./useLocalStorage.js');
  assert.ok(typeof mod.useLocalStorage === 'function');
});
