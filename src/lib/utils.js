/**
 * Formats an ISO date string into a human-readable relative time.
 * Examples: "just now", "2 min ago", "3h ago", "yesterday", "Jul 15"
 */
export function formatRelativeTime(isoString) {
  if (!isoString) return '';
  const now = new Date();
  const date = new Date(isoString);
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 10) return 'just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay === 1) return 'yesterday';
  if (diffDay < 7) return `${diffDay}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Truncates a string to a max length, appending '…' if needed.
 */
export function truncate(str, maxLen = 120) {
  if (!str) return '';
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str;
}

/**
 * Generates a random user alias like "User #4721"
 */
export function generateAlias() {
  return `User #${Math.floor(1000 + Math.random() * 9000)}`;
}

/**
 * Formats a number into compact currency representation e.g. $1.5k, $2M
 */
export function formatCompactCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '$0';
  const num = Number(amount);
  if (Math.abs(num) >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (Math.abs(num) >= 1_000) {
    return `$${(num / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return `$${num}`;
}

/**
 * Formats a deadline timestamp into a remaining time string (e.g. "Expired", "45m remaining", "3h remaining", "2d remaining")
 */
export function formatDeadlineRemaining(deadlineIso, nowIso = null) {
  if (!deadlineIso) return 'No deadline';
  const deadline = new Date(deadlineIso);
  const now = nowIso ? new Date(nowIso) : new Date();
  const diffMs = deadline - now;
  if (isNaN(deadline.getTime())) return 'Invalid date';
  if (diffMs <= 0) return 'Expired';

  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 60) return `${diffMin}m remaining`;
  if (diffHr < 24) return `${diffHr}h remaining`;
  return `${diffDay}d remaining`;
}

/**
 * Calculates a numerical urgency score for ranking tasks based on bounty, urgency flags, and proximity.
 */
export function calculateTaskUrgencyScore(task = {}) {
  if (!task || typeof task !== 'object') return 0;
  let score = Math.min(Math.max(Number(task.bounty || 0) / 10, 0), 50);

  if (task.isUrgent || task.status === 'urgent') {
    score += 50;
  }
  if (task.distanceMiles !== undefined && task.distanceMiles !== null && task.distanceMiles <= 5) {
    score += 20;
  }
  if (task.deadline) {
    const diffMs = new Date(task.deadline) - new Date();
    if (diffMs > 0 && diffMs <= 2 * 60 * 60 * 1000) {
      score += 30;
    }
  }

  return Math.round(score);
}



