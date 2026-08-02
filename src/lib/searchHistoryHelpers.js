/**
 * Utilities for maintaining search query history list.
 */

/**
 * Adds a new term to the search history, de-duplicating and placing it at the front.
 * @param {Array<string>} history 
 * @param {string} term 
 * @param {number} [maxItems=5] 
 * @returns {Array<string>}
 */
export function addSearchTerm(history = [], term = '', maxItems = 5) {
  if (!term || typeof term !== 'string') return Array.isArray(history) ? [...history] : [];
  const clean = term.trim();
  if (!clean) return Array.isArray(history) ? [...history] : [];

  const current = Array.isArray(history) ? history : [];
  const filtered = current.filter(item => item.toLowerCase() !== clean.toLowerCase());
  return [clean, ...filtered].slice(0, Math.max(1, maxItems));
}

/**
 * Removes a specific search term from history.
 * @param {Array<string>} history 
 * @param {string} termToRemove 
 * @returns {Array<string>}
 */
export function removeSearchTerm(history = [], termToRemove = '') {
  if (!Array.isArray(history) || !termToRemove) return Array.isArray(history) ? [...history] : [];
  const target = termToRemove.toLowerCase().trim();
  return history.filter(item => item.toLowerCase().trim() !== target);
}

/**
 * Filters recent search history by current typing query.
 * @param {Array<string>} history 
 * @param {string} query 
 * @returns {Array<string>}
 */
export function filterRecentSearches(history = [], query = '') {
  if (!Array.isArray(history)) return [];
  if (!query || typeof query !== 'string') return [...history];
  const target = query.toLowerCase().trim();
  return history.filter(item => item.toLowerCase().includes(target));
}
