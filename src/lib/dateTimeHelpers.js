/**
 * Formats an ISO string or timestamp into a localized short date/time string.
 * @param {string|number|Date} dateInput
 * @returns {string}
 */
export function formatShortDateTime(dateInput) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Checks if a given timestamp is today.
 * @param {string|number|Date} dateInput
 * @returns {boolean}
 */
export function isToday(dateInput) {
  if (!dateInput) return false;
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return false;
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}
