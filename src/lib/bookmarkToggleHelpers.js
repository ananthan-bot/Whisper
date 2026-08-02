/**
 * Helpers for managing task bookmarks and favorites
 */

/**
 * Toggles a task ID in the array of bookmarked task IDs.
 * @param {Array<string>} bookmarks 
 * @param {string} taskId 
 * @returns {Array<string>} Updated bookmarks array
 */
export function toggleBookmark(bookmarks = [], taskId) {
  if (!taskId) return Array.isArray(bookmarks) ? [...bookmarks] : [];
  const current = Array.isArray(bookmarks) ? bookmarks : [];
  if (current.includes(taskId)) {
    return current.filter(id => id !== taskId);
  }
  return [...current, taskId];
}

/**
 * Checks if a task ID is currently bookmarked.
 * @param {Array<string>} bookmarks 
 * @param {string} taskId 
 * @returns {boolean}
 */
export function isBookmarked(bookmarks = [], taskId) {
  if (!taskId || !Array.isArray(bookmarks)) return false;
  return bookmarks.includes(taskId);
}

/**
 * Filters a list of tasks to return only bookmarked ones.
 * @param {Array<Object>} tasks 
 * @param {Array<string>} bookmarks 
 * @returns {Array<Object>}
 */
export function filterBookmarkedTasks(tasks = [], bookmarks = []) {
  if (!Array.isArray(tasks) || !Array.isArray(bookmarks)) return [];
  const set = new Set(bookmarks);
  return tasks.filter(task => task && set.has(task.id));
}
