/**
 * Formats bytes into human readable MB / KB / GB text.
 * @param {number} bytes
 * @returns {string}
 */
export function formatBytes(bytes) {
  if (bytes === 0 || !bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Calculates storage percentage used relative to max bytes limit.
 * @param {number} usedBytes
 * @param {number} maxBytes
 * @returns {number}
 */
export function calculateStoragePercentage(usedBytes, maxBytes) {
  if (!maxBytes || maxBytes <= 0) return 0;
  if (!usedBytes || usedBytes <= 0) return 0;
  const percentage = (usedBytes / maxBytes) * 100;
  return Math.min(Math.round(percentage), 100);
}
