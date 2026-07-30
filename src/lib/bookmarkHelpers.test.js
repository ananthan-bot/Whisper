import test from 'node:test';
import assert from 'node:assert/strict';
import { isTaskBookmarked, toggleTaskBookmark } from './bookmarkHelpers.js';

test('isTaskBookmarked — checks if task id exists in array', () => {
  assert.equal(isTaskBookmarked(['TASK-1', 'TASK-2'], 'TASK-1'), true);
  assert.equal(isTaskBookmarked(['TASK-1', 'TASK-2'], 'TASK-99'), false);
  assert.equal(isTaskBookmarked(null, 'TASK-1'), false);
});

test('toggleTaskBookmark — adds when missing and removes when present', () => {
  let bookmarks = ['TASK-1'];
  bookmarks = toggleTaskBookmark(bookmarks, 'TASK-2');
  assert.deepEqual(bookmarks, ['TASK-1', 'TASK-2']);

  bookmarks = toggleTaskBookmark(bookmarks, 'TASK-1');
  assert.deepEqual(bookmarks, ['TASK-2']);
});
