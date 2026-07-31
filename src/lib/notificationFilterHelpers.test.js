import test from 'node:test';
import assert from 'node:assert/strict';
import { filterUnreadNotifications, sortNotificationsByNewest } from './notificationFilterHelpers.js';

test('notificationFilterHelpers - filterUnreadNotifications filters read items', () => {
  const list = [{ id: 1, read: true }, { id: 2, read: false }];
  assert.equal(filterUnreadNotifications(list).length, 1);
  assert.equal(filterUnreadNotifications(list)[0].id, 2);
});

test('notificationFilterHelpers - sortNotificationsByNewest orders correctly', () => {
  const list = [
    { id: 1, createdAt: '2026-01-01' },
    { id: 2, createdAt: '2026-06-01' },
  ];
  const sorted = sortNotificationsByNewest(list);
  assert.equal(sorted[0].id, 2);
});
