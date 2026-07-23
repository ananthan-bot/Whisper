/**
 * Wallet and Escrow Transaction Manager Helper
 * Tracks bounties held in escrow, releases, and transaction log entries.
 */

export const ESCROW_STATUS = {
  PENDING: 'PENDING',
  HELD: 'HELD_IN_ESCROW',
  RELEASED: 'RELEASED',
  REFUNDED: 'REFUNDED',
};

/**
 * Formats monetary amounts
 */
export function formatCurrency(amount = 0, currency = 'USD') {
  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(num);
}

/**
 * Computes wallet summary (Available Balance, Escrow Balance, Total Earnings)
 */
export function calculateWalletSummary(transactions = []) {
  if (!Array.isArray(transactions)) {
    return { balance: 0, inEscrow: 0, totalEarned: 0 };
  }

  let balance = 100; // Starting demo balance
  let inEscrow = 0;
  let totalEarned = 0;

  for (const tx of transactions) {
    if (tx.type === 'ESCROW_HOLD') {
      balance -= tx.amount;
      inEscrow += tx.amount;
    } else if (tx.type === 'ESCROW_RELEASE') {
      inEscrow -= tx.amount;
      totalEarned += tx.amount;
    } else if (tx.type === 'PAYOUT_RECEIVED') {
      balance += tx.amount;
      totalEarned += tx.amount;
    } else if (tx.type === 'REFUND') {
      inEscrow -= tx.amount;
      balance += tx.amount;
    }
  }

  return {
    balance: Math.max(0, balance),
    inEscrow: Math.max(0, inEscrow),
    totalEarned: Math.max(0, totalEarned),
  };
}

/**
 * Creates a transaction entry
 */
export function createTransaction({ type, amount, taskId, description }) {
  return {
    id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    type: type || 'ESCROW_HOLD',
    amount: typeof amount === 'number' ? amount : parseFloat(amount) || 0,
    taskId: taskId || null,
    description: description || 'Task Bounty Transaction',
    createdAt: new Date().toISOString(),
  };
}
