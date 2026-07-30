/**
 * Utility functions for exporting task history and transactions to JSON / CSV formats.
 */

/**
 * Formats a list of tasks into CSV string format.
 */
export function exportTasksToCsv(tasks = []) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return 'ID,Category,Bounty,Status,CreatedAt\n';
  }

  const headers = ['ID', 'Category', 'Bounty', 'Status', 'CreatedAt'];
  const rows = tasks.map((t) => [
    `"${t.id || ''}"`,
    `"${t.category || ''}"`,
    t.bounty || 0,
    `"${t.status || 'open'}"`,
    `"${t.createdAt || ''}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

/**
 * Formats a list of tasks into formatted JSON string.
 */
export function exportTasksToJson(tasks = []) {
  if (!Array.isArray(tasks)) return '[]';
  return JSON.stringify(tasks, null, 2);
}
