/**
 * Generates a unique 8-character uppercase referral code.
 * @param {string} username
 * @returns {string}
 */
export function generateReferralCode(username = 'USER') {
  const prefix = username.slice(0, 4).toUpperCase().padEnd(4, 'X');
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${randomNum}`;
}

/**
 * Validates format of referral code.
 * @param {string} code
 * @returns {boolean}
 */
export function validateReferralCode(code) {
  if (!code || typeof code !== 'string') return false;
  return /^[A-Z0-9]{4}-\d{4}$/.test(code.trim().toUpperCase());
}
