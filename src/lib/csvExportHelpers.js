/**
 * Converts array of activity log items into formatted CSV text.
 * @param {Array<Object>} logs
 * @returns {string}
 */
export function formatActivityLogsToCsv(logs = []) {
  const headers = ['ID', 'Action', 'Timestamp', 'Details'];
  if (!Array.isArray(logs) || logs.length === 0) {
    return headers.join(',');
  }

  const rows = logs.map(log => {
    const id = log.id || '';
    const action = `"${(log.action || '').replace(/"/g, '""')}"`;
    const timestamp = log.timestamp || '';
    const details = `"${(log.details || '').replace(/"/g, '""')}"`;
    return [id, action, timestamp, details].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}
