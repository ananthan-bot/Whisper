import test from 'node:test';
import assert from 'node:assert/strict';
import { filterAndSortTasks, applyQuickPresetFilter } from './filterHelpers.js';

const MOCK = [
  { id: 'TASK-1', category: 'negotiator', description: 'Call Comcast rate reduction', proofType: 'screenshot', createdAt: '2026-07-20T10:00:00Z', isUrgent: true, bounty: 60, distanceMiles: 2 },
  { id: 'TASK-2', category: 'secretary', description: 'Book Gusto pizza table', proofType: 'summary', createdAt: '2026-07-20T12:00:00Z', isUrgent: false, bounty: 30, distanceMiles: 15 },
  { id: 'TASK-3', category: 'wordsmith', description: 'Draft elevator complaint email', proofType: 'transcript', createdAt: '2026-07-19T08:00:00Z', isUrgent: false, bounty: 15, distanceMiles: 1 },
];

test('applyQuickPresetFilter — filters urgent, high-bounty, and nearby tasks', () => {
  assert.equal(applyQuickPresetFilter(MOCK, 'urgent').length, 1);
  assert.equal(applyQuickPresetFilter(MOCK, 'high_bounty').length, 1);
  assert.equal(applyQuickPresetFilter(MOCK, 'nearby').length, 2);
  assert.equal(applyQuickPresetFilter(MOCK, 'all').length, 3);
  assert.equal(applyQuickPresetFilter(null).length, 0);
});


test('filterAndSortTasks — returns all tasks when default options passed', () => {
  const res = filterAndSortTasks(MOCK, {});
  assert.equal(res.length, 3);
});

test('filterAndSortTasks — filters by search query matching description', () => {
  const res = filterAndSortTasks(MOCK, { searchQuery: 'Comcast' });
  assert.equal(res.length, 1);
  assert.equal(res[0].id, 'TASK-1');
});

test('filterAndSortTasks — filters by category', () => {
  const res = filterAndSortTasks(MOCK, { category: 'secretary' });
  assert.equal(res.length, 1);
  assert.equal(res[0].id, 'TASK-2');
});

test('filterAndSortTasks — filters by proofType', () => {
  const res = filterAndSortTasks(MOCK, { proofType: 'transcript' });
  assert.equal(res.length, 1);
  assert.equal(res[0].id, 'TASK-3');
});

test('filterAndSortTasks — sorts by oldest first', () => {
  const res = filterAndSortTasks(MOCK, { sortBy: 'oldest' });
  assert.equal(res[0].id, 'TASK-3');
  assert.equal(res[2].id, 'TASK-2');
});

test('filterAndSortTasks — sorts by newest first', () => {
  const res = filterAndSortTasks(MOCK, { sortBy: 'newest' });
  assert.equal(res[0].id, 'TASK-2');
  assert.equal(res[2].id, 'TASK-3');
});
