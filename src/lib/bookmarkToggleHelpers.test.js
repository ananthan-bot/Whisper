import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { toggleBookmark, isBookmarked, filterBookmarkedTasks } from './bookmarkToggleHelpers.js';

describe('bookmarkToggleHelpers', () => {
  test('toggleBookmark adds taskId if not present', () => {
    const initial = ['task-1'];
    const updated = toggleBookmark(initial, 'task-2');
    assert.deepEqual(updated, ['task-1', 'task-2']);
  });

  test('toggleBookmark removes taskId if already present', () => {
    const initial = ['task-1', 'task-2'];
    const updated = toggleBookmark(initial, 'task-1');
    assert.deepEqual(updated, ['task-2']);
  });

  test('isBookmarked returns true when present, false otherwise', () => {
    const bookmarks = ['task-10', 'task-20'];
    assert.equal(isBookmarked(bookmarks, 'task-10'), true);
    assert.equal(isBookmarked(bookmarks, 'task-30'), false);
    assert.equal(isBookmarked(null, 'task-10'), false);
  });

  test('filterBookmarkedTasks filters task list correctly', () => {
    const tasks = [
      { id: 't1', title: 'Task 1' },
      { id: 't2', title: 'Task 2' },
      { id: 't3', title: 'Task 3' }
    ];
    const bookmarks = ['t1', 't3'];
    const filtered = filterBookmarkedTasks(tasks, bookmarks);
    assert.equal(filtered.length, 2);
    assert.equal(filtered[0].id, 't1');
    assert.equal(filtered[1].id, 't3');
  });
});
