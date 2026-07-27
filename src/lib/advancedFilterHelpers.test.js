import { test } from 'node:test';
import assert from 'node:assert';
import { filterAndSortTasks } from './filterHelpers.js';

test('filterAndSortTasks — filters tasks by minimum bounty amount', () => {
  const tasks = [
    { id: '1', bounty: 15, status: 'open' },
    { id: '2', bounty: 50, status: 'open' },
    { id: '3', bounty: 100, status: 'open' },
  ];

  const filtered = filterAndSortTasks(tasks, { minBounty: 30 });
  assert.strictEqual(filtered.length, 2);
  assert.strictEqual(filtered[0].id, '2');
  assert.strictEqual(filtered[1].id, '3');
});

test('filterAndSortTasks — filters tasks by maximum distance radius in miles', () => {
  const tasks = [
    { id: '1', distanceMiles: 3, status: 'open' },
    { id: '2', distanceMiles: 15, status: 'open' },
    { id: '3', distanceMiles: null, status: 'open' }, // Remote task
  ];

  const filtered = filterAndSortTasks(tasks, { maxDistanceMiles: 10 });
  assert.strictEqual(filtered.length, 2);
  assert.strictEqual(filtered[0].id, '1');
  assert.strictEqual(filtered[1].id, '3');
});

test('filterAndSortTasks — filters tasks by status tab', () => {
  const tasks = [
    { id: '1', status: 'open' },
    { id: '2', status: 'claimed' },
    { id: '3', status: 'completed' },
  ];

  const openOnly = filterAndSortTasks(tasks, { status: 'open' });
  assert.strictEqual(openOnly.length, 1);
  assert.strictEqual(openOnly[0].id, '1');
});
