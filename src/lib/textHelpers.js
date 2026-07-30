/**
 * Utility functions for text manipulation and search keyword highlighting.
 */

/**
 * Splits text into segments marked with { text, match } based on search query matching.
 * Case-insensitive match.
 */
export function highlightKeywords(text = '', query = '') {
  if (!text) return [];
  if (!query || !query.trim()) {
    return [{ text, match: false }];
  }

  const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);

  return parts
    .filter(Boolean)
    .map((part) => ({
      text: part,
      match: part.toLowerCase() === query.trim().toLowerCase(),
    }));
}
