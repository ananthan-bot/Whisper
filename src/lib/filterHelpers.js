/**
 * Helper functions to search, filter, and sort tasks on the dashboard.
 */

export function filterAndSortTasks(tasks = [], { searchQuery = '', category = 'all', proofType = 'all', sortBy = 'newest' }) {
  let result = [...tasks];

  // 1. Search Query (title/description/alias/id)
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    result = result.filter(
      (t) =>
        t.description?.toLowerCase().includes(query) ||
        t.alias?.toLowerCase().includes(query) ||
        t.id?.toLowerCase().includes(query) ||
        t.category?.toLowerCase().includes(query)
    );
  }

  // 2. Category Filter
  if (category !== 'all') {
    result = result.filter((t) => t.category === category);
  }

  // 3. Proof Type Filter
  if (proofType !== 'all') {
    result = result.filter((t) => t.proofType === proofType);
  }

  // 4. Sorting (newest, oldest)
  result.sort((a, b) => {
    const timeA = new Date(a.createdAt || 0).getTime();
    const timeB = new Date(b.createdAt || 0).getTime();
    if (sortBy === 'oldest') {
      return timeA - timeB;
    }
    return timeB - timeA; // newest
  });

  return result;
}
