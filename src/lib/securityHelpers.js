/**
 * Security helper utilities for input sanitization and string cleaning.
 */

/**
 * Strips HTML tags from an input string to prevent XSS injection.
 */
export function stripHtmlTags(input) {
  if (typeof input !== 'string') return '';
  return input.replace(/<[^>]*>?/gm, '');
}

/**
 * Sanitizes input string by stripping HTML tags and trimming outer whitespace.
 */
export function sanitizeInput(input) {
  if (!input) return '';
  const cleaned = stripHtmlTags(String(input));
  return cleaned.trim();
}

/**
 * Checks if a string contains potentially unsafe script patterns.
 */
export function containsScriptTag(input) {
  if (typeof input !== 'string') return false;
  return /<script[\s\S]*?>[\s\S]*?<\/script>/gi.test(input) || /javascript:/gi.test(input);
}
