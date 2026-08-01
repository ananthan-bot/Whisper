/**
 * Toggles high-contrast focus outline styles on the document body.
 * @param {boolean} enable
 */
export function toggleHighContrastFocus(enable) {
  if (typeof document === 'undefined') return;
  if (enable) {
    document.body.classList.add('high-contrast-focus');
  } else {
    document.body.classList.remove('high-contrast-focus');
  }
}

/**
 * Returns accessible ARIA live region attribute props based on priority.
 * @param {'polite'|'assertive'|'off'} priority
 * @returns {Object}
 */
export function getAriaLiveProps(priority = 'polite') {
  return {
    'aria-live': priority,
    'aria-atomic': 'true'
  };
}
