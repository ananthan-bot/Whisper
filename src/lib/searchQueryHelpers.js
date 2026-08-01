/**
 * Parses search query string into token tags and filters.
 * @param {string} rawQuery
 * @returns {{ keywords: string[], hashtags: string[], isUrgentOnly: boolean }}
 */
export function parseSearchQuery(rawQuery) {
  if (!rawQuery || typeof rawQuery !== 'string') {
    return { keywords: [], hashtags: [], isUrgentOnly: false };
  }

  const tokens = rawQuery.trim().split(/\s+/).filter(Boolean);
  const keywords = [];
  const hashtags = [];
  let isUrgentOnly = false;

  for (const token of tokens) {
    if (token.toLowerCase() === '!urgent') {
      isUrgentOnly = true;
    } else if (token.startsWith('#') && token.length > 1) {
      hashtags.push(token.slice(1).toLowerCase());
    } else {
      keywords.push(token.toLowerCase());
    }
  }

  return { keywords, hashtags, isUrgentOnly };
}
