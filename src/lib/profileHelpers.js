/**
 * User Profile & Activity Hub Helper Utilities
 */

import { calculateUserStats } from './reputationHelpers.js';

export const BADGE_DEFINITIONS = [
  { id: 'first_task', name: 'First Voice', icon: '🎙️', description: 'Posted your first task' },
  { id: 'first_claim', name: 'Ready Helper', icon: '🤝', description: 'Claimed your first task' },
  { id: 'master_negotiator', name: 'Master Negotiator', icon: '💬', description: 'Completed 3+ Negotiator tasks' },
  { id: 'top_helper', name: 'Top Rated', icon: '⭐', description: 'Achieved a 4.8+ rating average' },
  { id: 'escrow_master', name: 'Escrow Master', icon: '🔒', description: 'Released $100+ in bounties' },
];

/**
 * Calculates user profile summary metrics
 */
export function calculateProfileStats(tasks = [], ratings = {}, userAlias = 'User') {
  const userStats = calculateUserStats(userAlias, tasks, ratings);
  const postedTasks = tasks.filter((t) => t.alias === userAlias);
  const claimedTasks = tasks.filter((t) => t.helperAlias === userAlias || t.helper === userAlias);

  const totalBountySpent = postedTasks.reduce((acc, t) => acc + (t.bounty || 25), 0);
  const totalBountyEarned = claimedTasks.reduce((acc, t) => (t.status === 'accepted' ? acc + (t.bounty || 25) : acc), 0);

  return {
    ...userStats,
    postedCount: postedTasks.length,
    claimedCount: claimedTasks.length,
    totalBountySpent,
    totalBountyEarned,
  };
}

/**
 * Returns unlocked badges based on user activity stats
 */
export function getEarnedBadges(stats = {}) {
  const earned = [];

  if ((stats.postedCount || 0) > 0) {
    earned.push(BADGE_DEFINITIONS[0]);
  }
  if ((stats.claimedCount || 0) > 0) {
    earned.push(BADGE_DEFINITIONS[1]);
  }
  if ((stats.completedCount || 0) >= 3) {
    earned.push(BADGE_DEFINITIONS[2]);
  }
  if ((stats.ratingAverage || 0) >= 4.8) {
    earned.push(BADGE_DEFINITIONS[3]);
  }
  if ((stats.totalBountyEarned || 0) >= 100) {
    earned.push(BADGE_DEFINITIONS[4]);
  }

  return earned;
}
