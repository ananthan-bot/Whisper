/**
 * Computes stats breakdown per task category.
 * @param {Array<object>} tasks
 * @returns {Record<string, { count: number, totalBounty: number, avgBounty: number }>}
 */
export function calculateCategoryStats(tasks = []) {
  if (!Array.isArray(tasks)) return {};

  const stats = {};

  tasks.forEach((t) => {
    if (!t || !t.category) return;
    const cat = t.category;
    const bounty = Number(t.bounty) || 25;

    if (!stats[cat]) {
      stats[cat] = { count: 0, totalBounty: 0, avgBounty: 0 };
    }

    stats[cat].count += 1;
    stats[cat].totalBounty += bounty;
    stats[cat].avgBounty = Math.round(stats[cat].totalBounty / stats[cat].count);
  });

  return stats;
}
