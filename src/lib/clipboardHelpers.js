/**
 * Safe clipboard copy wrapper.
 * @param {string} text
 * @returns {Promise<boolean>} true if successfully copied
 */
export async function copyToClipboard(text) {
  if (!text || typeof text !== 'string') return false;
  try {
    if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback for restricted contexts
  }
  return false;
}

/**
 * Formats copy feedback status label.
 * @param {boolean} copied
 * @returns {string} status label
 */
export function getCopyStatusLabel(copied) {
  return copied ? 'Copied!' : 'Copy to Clipboard';
}
