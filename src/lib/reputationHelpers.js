/**
 * User Reputation and Badge Calculation Helper
 * Calculates helper levels, completion metrics, and rating badges.
 */

export const REPUTATION_TIERS = [
  { name: 'Rookie Helper', minTasks: 0, minRating: 0, color: 'text-slate-600 bg-slate-100 border-slate-200' },
  { name: 'Bronze Negotiator', minTasks: 3, minRating: 3.5, color: 'text-amber-700 bg-amber-50 border-amber-200' },
  { name: 'Silver Negotiator', minTasks: 7, minRating: 4.0, color: 'text-slate-700 bg-slate-100 border-slate-300' },
  { name: 'Gold Negotiator', minTasks: 15, minRating: 4.5, color: 'text-yellow-800 bg-yellow-50 border-yellow-300' },
  { name: 'Platinum Elite', minTasks: 25, minRating: 4.8, color: 'text-emerald-800 bg-emerald-50 border-emerald-300' },
];

/**
 * Calculates user stats (tasks completed, average rating, tier)
 */
export function calculateUserStats(userAlias, tasks = [], ratings = {}) {
  if (!userAlias) {
    return {
      completedCount: 0,
      totalClaimed: 0,
      completionRate: 100,
      averageRating: 0,
      tier: REPUTATION_TIERS[0],
      badges: [],
    };
  }

  const claimed = tasks.filter((t) => t.claimedBy === userAlias || t.helperAlias === userAlias);
  const completed = claimed.filter((t) => t.status === 'completed' || t.status === 'accepted');

  const userRatings = Object.entries(ratings)
    .filter(([taskId]) => tasks.some((t) => t.id === taskId && (t.helperAlias === userAlias || t.claimedBy === userAlias)))
    .map(([, stars]) => Number(stars));

  const avgRating = userRatings.length > 0
    ? Number((userRatings.reduce((a, b) => a + b, 0) / userRatings.length).toFixed(1))
    : 5.0;

  const completionRate = claimed.length > 0
    ? Math.round((completed.length / claimed.length) * 100)
    : 100;

  // Find tier
  let matchedTier = REPUTATION_TIERS[0];
  for (const tier of REPUTATION_TIERS) {
    if (completed.length >= tier.minTasks && avgRating >= tier.minRating) {
      matchedTier = tier;
    }
  }

  // Generate badges
  const badges = [];
  if (completed.length >= 1) badges.push({ id: 'first_task', label: 'First Task', icon: '🚀' });
  if (avgRating >= 4.8 && userRatings.length >= 3) badges.push({ id: '5star', label: 'Top Rated', icon: '⭐' });
  if (completed.length >= 5) badges.push({ id: 'pro', label: 'Speedy Helper', icon: '⚡' });

  return {
    completedCount: completed.length,
    totalClaimed: claimed.length,
    completionRate,
    averageRating: avgRating,
    tier: matchedTier,
    badges,
  };
}
