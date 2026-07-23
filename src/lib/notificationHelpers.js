/**
 * Notification Helper Module
 * Manages in-app real-time notifications for task claims, proofs, acceptances, and ratings.
 */

export const NOTIFICATION_TYPES = {
  TASK_CLAIMED: 'TASK_CLAIMED',
  PROOF_SUBMITTED: 'PROOF_SUBMITTED',
  TASK_ACCEPTED: 'TASK_ACCEPTED',
  RATING_RECEIVED: 'RATING_RECEIVED',
  MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
};

/**
 * Creates a formatted notification object
 */
export function createNotification({ type, title, message, taskId, meta = {} }) {
  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    type: type || NOTIFICATION_TYPES.MESSAGE_RECEIVED,
    title: title || 'New Notification',
    message: message || '',
    taskId: taskId || null,
    meta,
    read: false,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Filter unread notifications
 */
export function getUnreadNotifications(notifications = []) {
  if (!Array.isArray(notifications)) return [];
  return notifications.filter((item) => !item.read);
}

/**
 * Mark notification as read
 */
export function markAsRead(notifications = [], notifId) {
  if (!Array.isArray(notifications)) return [];
  return notifications.map((n) => (n.id === notifId ? { ...n, read: true } : n));
}

/**
 * Mark all notifications as read
 */
export function markAllAsRead(notifications = []) {
  if (!Array.isArray(notifications)) return [];
  return notifications.map((n) => ({ ...n, read: true }));
}

/**
 * Get notification icon styling color by type
 */
export function getNotificationBadgeColor(type) {
  switch (type) {
    case NOTIFICATION_TYPES.TASK_CLAIMED:
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case NOTIFICATION_TYPES.PROOF_SUBMITTED:
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case NOTIFICATION_TYPES.TASK_ACCEPTED:
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case NOTIFICATION_TYPES.RATING_RECEIVED:
      return 'bg-purple-100 text-purple-700 border-purple-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}
