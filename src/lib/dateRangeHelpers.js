/**
 * Filters an array of objects by a date property matching a timeframe.
 * @param {Array<object>} items
 * @param {string} range 'all' | 'today' | '7days' | '30days'
 * @param {string} dateField
 * @returns {Array<object>}
 */
export function filterItemsByDateRange(items, range = 'all', dateField = 'createdAt') {
  if (!Array.isArray(items)) return [];
  if (range === 'all') return items;

  const now = new Date();
  const cutoff = new Date();

  if (range === 'today') {
    cutoff.setHours(0, 0, 0, 0);
  } else if (range === '7days') {
    cutoff.setDate(now.getDate() - 7);
  } else if (range === '30days') {
    cutoff.setDate(now.getDate() - 30);
  }

  return items.filter((item) => {
    if (!item || !item[dateField]) return false;
    const itemDate = new Date(item[dateField]);
    return !isNaN(itemDate.getTime()) && itemDate >= cutoff;
  });
}

/**
 * Returns human readable label for date range options.
 * @param {string} range
 * @returns {string}
 */
export function getDateRangeLabel(range) {
  const labels = {
    all: 'All Time',
    today: 'Today',
    '7days': 'Past 7 Days',
    '30days': 'Past 30 Days',
  };
  return labels[range] || 'All Time';
}
