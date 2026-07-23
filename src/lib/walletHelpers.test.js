import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCurrency,
  calculateWalletSummary,
  createTransaction,
} from './walletHelpers.js';

test('formatCurrency — formats numbers as USD currency string', () => {
  assert.equal(formatCurrency(25), '$25.00');
  assert.equal(formatCurrency('15.5'), '$15.50');
  assert.equal(formatCurrency(0), '$0.00');
});

test('calculateWalletSummary — calculates starting balance with no transactions', () => {
  const summary = calculateWalletSummary([]);
  assert.equal(summary.balance, 100);
  assert.equal(summary.inEscrow, 0);
  assert.equal(summary.totalEarned, 0);
});

test('calculateWalletSummary — deducts balance and adds to escrow on hold', () => {
  const txs = [createTransaction({ type: 'ESCROW_HOLD', amount: 30 })];
  const summary = calculateWalletSummary(txs);
  assert.equal(summary.balance, 70);
  assert.equal(summary.inEscrow, 30);
  assert.equal(summary.totalEarned, 0);
});

test('calculateWalletSummary — updates total earned and escrow on release', () => {
  const txs = [
    createTransaction({ type: 'ESCROW_HOLD', amount: 40 }),
    createTransaction({ type: 'ESCROW_RELEASE', amount: 40 }),
  ];
  const summary = calculateWalletSummary(txs);
  assert.equal(summary.balance, 60);
  assert.equal(summary.inEscrow, 0);
  assert.equal(summary.totalEarned, 40);
});

test('createTransaction — sets default properties correctly', () => {
  const tx = createTransaction({ amount: 50 });
  assert.ok(tx.id.startsWith('tx_'));
  assert.equal(tx.amount, 50);
  assert.equal(tx.type, 'ESCROW_HOLD');
  assert.ok(tx.createdAt);
});
