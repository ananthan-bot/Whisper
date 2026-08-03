/**
 * Filters notification list by read/unread state or type.
 * @param {Array<object>} notifications
 * @param {string} filter 'all' | 'unread' | 'read'
 * @returns {Array<object>}
 */
export function filterNotifications(notifications = [], filter = 'all') {
  if (!Array.isArray(notifications)) return [];
  if (filter === 'unread') {
    return notifications.filter((n) => !n.read);
  }
  if (filter === 'read') {
    return notifications.filter((n) => Boolean(n.read));
  }
  return notifications;
}

/**
 * Counts unread notifications.
 * @param {Array<object>} notifications
 * @returns {number}
 */
export function countUnreadNotifications(notifications = []) {
  if (!Array.isArray(notifications)) return 0;
  return notifications.filter((n) => !n.read).length;
}
