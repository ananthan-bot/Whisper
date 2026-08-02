/**
 * Utilities for extracting, formatting, and colorizing task tags.
 */

/**
 * Extracts tags from a text string (words starting with # or explicit tag array).
 * @param {string|Array<string>} input 
 * @returns {Array<string>} Unique clean lowercased tags without # symbol
 */
export function extractTags(input) {
  if (!input) return [];
  if (Array.isArray(input)) {
    return [...new Set(input.map(t => String(t).trim().toLowerCase().replace(/^#/, '')))].filter(Boolean);
  }
  if (typeof input !== 'string') return [];

  const matches = input.match(/#([\w-]+)/g);
  if (!matches) return [];
  const tags = matches.map(m => m.slice(1).toLowerCase());
  return [...new Set(tags)];
}

/**
 * Maps a tag name to a consistent Tailwind badge color scheme class string.
 * @param {string} tag 
 * @returns {string} Tailwind CSS classes
 */
export function getTagColorClass(tag = '') {
  const normalized = String(tag).toLowerCase().trim();
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash << 5) - hash + normalized.charCodeAt(i);
    hash |= 0;
  }

  const palettes = [
    'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800'
  ];

  const index = Math.abs(hash) % palettes.length;
  return palettes[index];
}

/**
 * Filters tasks matching a given tag.
 * @param {Array<Object>} tasks 
 * @param {string} selectedTag 
 * @returns {Array<Object>}
 */
export function filterTasksByTag(tasks = [], selectedTag = '') {
  if (!Array.isArray(tasks)) return [];
  if (!selectedTag) return tasks;
  const target = selectedTag.toLowerCase().trim().replace(/^#/, '');

  return tasks.filter(task => {
    if (!task) return false;
    const tags = Array.isArray(task.tags) 
      ? task.tags.map(t => String(t).toLowerCase().replace(/^#/, ''))
      : extractTags(task.title + ' ' + (task.description || ''));
    return tags.includes(target);
  });
}
