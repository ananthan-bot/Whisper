/**
 * Notification Filtering & Sorting Helpers
 */

export function filterUnreadNotifications(notifications = []) {
  if (!Array.isArray(notifications)) return [];
  return notifications.filter((n) => !n.read);
}

export function sortNotificationsByNewest(notifications = []) {
  if (!Array.isArray(notifications)) return [];
  return [...notifications].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}
