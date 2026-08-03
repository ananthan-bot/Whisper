import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { filterNotifications, countUnreadNotifications } from './notificationFilterHelpers.js';

describe('notificationFilterHelpers', () => {
  it('filterNotifications filters unread and read notifications', () => {
    const list = [
      { id: 1, read: false },
      { id: 2, read: true },
    ];
    assert.equal(filterNotifications(list, 'unread').length, 1);
    assert.equal(filterNotifications(list, 'read').length, 1);
    assert.equal(filterNotifications(list, 'all').length, 2);
  });

  it('countUnreadNotifications counts unread accurately', () => {
    const list = [{ read: false }, { read: false }, { read: true }];
    assert.equal(countUnreadNotifications(list), 2);
  });
});
