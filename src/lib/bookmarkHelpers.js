/**
 * Helper utilities for managing saved/bookmarked tasks in local storage/state.
 */

/**
 * Checks whether a given task ID is currently in the list of bookmarked task IDs.
 */
export function isTaskBookmarked(bookmarks = [], taskId) {
  if (!Array.isArray(bookmarks) || !taskId) return false;
  return bookmarks.includes(taskId);
}

/**
 * Toggles a task ID in the bookmarks list (adds if absent, removes if present).
 */
export function toggleTaskBookmark(bookmarks = [], taskId) {
  if (!taskId) return Array.isArray(bookmarks) ? [...bookmarks] : [];
  const list = Array.isArray(bookmarks) ? [...bookmarks] : [];
  const index = list.indexOf(taskId);
  if (index > -1) {
    list.splice(index, 1);
  } else {
    list.push(taskId);
  }
  return list;
}
