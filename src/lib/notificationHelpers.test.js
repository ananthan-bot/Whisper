import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createNotification,
  getUnreadNotifications,
  markAsRead,
  markAllAsRead,
  getNotificationBadgeColor,
  NOTIFICATION_TYPES,
} from './notificationHelpers.js';

test('createNotification — generates default values', () => {
  const notif = createNotification({});
  assert.ok(notif.id.startsWith('notif_'));
  assert.equal(notif.type, NOTIFICATION_TYPES.MESSAGE_RECEIVED);
  assert.equal(notif.title, 'New Notification');
  assert.equal(notif.read, false);
  assert.ok(notif.createdAt);
});

test('createNotification — respects custom parameters', () => {
  const notif = createNotification({
    type: NOTIFICATION_TYPES.TASK_CLAIMED,
    title: 'Task Claimed!',
    message: 'User #1234 claimed your task.',
    taskId: 'task_99',
  });
  assert.equal(notif.type, NOTIFICATION_TYPES.TASK_CLAIMED);
  assert.equal(notif.title, 'Task Claimed!');
  assert.equal(notif.message, 'User #1234 claimed your task.');
  assert.equal(notif.taskId, 'task_99');
});

test('getUnreadNotifications — filters out read items', () => {
  const notifs = [
    { id: '1', read: false },
    { id: '2', read: true },
    { id: '3', read: false },
  ];
  const unread = getUnreadNotifications(notifs);
  assert.equal(unread.length, 2);
  assert.deepEqual(unread.map((n) => n.id), ['1', '3']);
});

test('markAsRead — marks specific target notification as read', () => {
  const notifs = [
    { id: '1', read: false },
    { id: '2', read: false },
  ];
  const updated = markAsRead(notifs, '1');
  assert.equal(updated[0].read, true);
  assert.equal(updated[1].read, false);
});

test('markAllAsRead — marks all notifications as read', () => {
  const notifs = [
    { id: '1', read: false },
    { id: '2', read: false },
  ];
  const updated = markAllAsRead(notifs);
  assert.ok(updated.every((n) => n.read === true));
});

test('getNotificationBadgeColor — maps types to badge classes', () => {
  assert.match(getNotificationBadgeColor(NOTIFICATION_TYPES.TASK_CLAIMED), /blue/);
  assert.match(getNotificationBadgeColor(NOTIFICATION_TYPES.PROOF_SUBMITTED), /amber/);
  assert.match(getNotificationBadgeColor(NOTIFICATION_TYPES.TASK_ACCEPTED), /emerald/);
});
