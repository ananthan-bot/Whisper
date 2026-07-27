import { test } from 'node:test';
import assert from 'node:assert';
import { ESCROW_STATUS, calculateWalletSummary, createTransaction } from './walletHelpers.js';
import { NOTIFICATION_TYPES, createNotification } from './notificationHelpers.js';

test('ESCROW_STATUS — includes DISPUTED and REVISION_REQUESTED states', () => {
  assert.strictEqual(ESCROW_STATUS.DISPUTED, 'DISPUTED');
  assert.strictEqual(ESCROW_STATUS.REVISION_REQUESTED, 'REVISION_REQUESTED');
});

test('calculateWalletSummary — correctly processes REFUND transaction', () => {
  const initialTxs = [
    createTransaction({ type: 'ESCROW_HOLD', amount: 50, taskId: 'TASK-101' }),
  ];

  const initialSummary = calculateWalletSummary(initialTxs);
  assert.strictEqual(initialSummary.balance, 50);
  assert.strictEqual(initialSummary.inEscrow, 50);

  const refundTxs = [
    ...initialTxs,
    createTransaction({ type: 'REFUND', amount: 50, taskId: 'TASK-101' }),
  ];

  const updatedSummary = calculateWalletSummary(refundTxs);
  assert.strictEqual(updatedSummary.balance, 100);
  assert.strictEqual(updatedSummary.inEscrow, 0);
});

test('createNotification — generates dispute and revision notification types', () => {
  const disputeNotif = createNotification({
    type: NOTIFICATION_TYPES.TASK_DISPUTED,
    title: 'Task Disputed',
    message: 'Bounty held under mediation',
    taskId: 'TASK-202',
  });
  assert.strictEqual(disputeNotif.type, 'TASK_DISPUTED');
  assert.strictEqual(disputeNotif.taskId, 'TASK-202');

  const revisionNotif = createNotification({
    type: NOTIFICATION_TYPES.REVISION_REQUESTED,
    title: 'Revision Requested',
    message: 'More details needed',
    taskId: 'TASK-202',
  });
  assert.strictEqual(revisionNotif.type, 'REVISION_REQUESTED');
});
