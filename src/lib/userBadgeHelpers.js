/**
 * User Milestone Badge Helpers
 */

export function calculateBadgeMilestoneProgress(completedCount = 0, targetMilestone = 10) {
  if (typeof completedCount !== 'number' || completedCount < 0) return 0;
  return Math.min(100, Math.round((completedCount / targetMilestone) * 100));
}

export function isMilestoneReached(completedCount = 0, targetMilestone = 10) {
  return completedCount >= targetMilestone;
}
