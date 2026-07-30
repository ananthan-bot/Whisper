/** @utility filterHelpers - Helper functions for filtering tasks */
/**
 * Helper functions to search, filter, and sort tasks on the dashboard.
 */

export function filterAndSortTasks(
  tasks = [],
  { searchQuery = '', category = 'all', proofType = 'all', status = 'all', maxDistanceMiles = null, minBounty = 0, sortBy = 'newest' } = {}
) {
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

  // 4. Status Filter
  if (status !== 'all') {
    result = result.filter((t) => t.status === status);
  }

  // 5. Min Bounty Filter
  if (minBounty > 0) {
    result = result.filter((t) => (t.bounty || 25) >= minBounty);
  }

  // 6. Max Distance Filter
  if (maxDistanceMiles !== null && maxDistanceMiles > 0) {
    result = result.filter((t) => {
      if (t.distanceMiles === undefined || t.distanceMiles === null) return true; // Keep remote/unspecified
      return t.distanceMiles <= maxDistanceMiles;
    });
  }

  // 7. Sorting (newest, oldest, highest_bounty)
  result.sort((a, b) => {
    const timeA = new Date(a.createdAt || 0).getTime();
    const timeB = new Date(b.createdAt || 0).getTime();
    if (sortBy === 'oldest') {
      return timeA - timeB;
    }
    if (sortBy === 'highest_bounty') {
      return (b.bounty || 25) - (a.bounty || 25);
    }
    return timeB - timeA; // newest
  });

  return result;
}

/**
 * Applies quick preset filtering options for urgent, high-bounty, or nearby tasks.
 */
export function applyQuickPresetFilter(tasks = [], preset = 'all') {
  if (!Array.isArray(tasks)) return [];
  if (preset === 'urgent') {
    return tasks.filter((t) => t.isUrgent || t.status === 'urgent');
  }
  if (preset === 'high_bounty') {
    return tasks.filter((t) => (t.bounty || 0) >= 50);
  }
  if (preset === 'nearby') {
    return tasks.filter((t) => t.distanceMiles !== null && t.distanceMiles !== undefined && t.distanceMiles <= 5);
  }
  return tasks;
}

