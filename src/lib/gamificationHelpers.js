/**
 * Helper Gamification & XP Math Utility
 * Calculates XP points, levels, commission fee discount tiers, and active streaks.
 */

export const LEVEL_TIERS = [
  { level: 1, name: 'Novice Helper', xpRequired: 0, feeDiscount: '0%', icon: '🌱' },
  { level: 2, name: 'Active Scout', xpRequired: 100, feeDiscount: '2%', icon: '⚡' },
  { level: 3, name: 'Reliable Runner', xpRequired: 300, feeDiscount: '5%', icon: '🛡️' },
  { level: 4, name: 'Expert Negotiator', xpRequired: 600, feeDiscount: '8%', icon: '⭐' },
  { level: 5, name: 'Master Whisperer', xpRequired: 1000, feeDiscount: '12%', icon: '👑' },
];

export const XP_REWARDS = {
  TASK_COMPLETED: 50,
  FIVE_STAR_RATING: 20,
  FAST_RESPONSE: 15,
  PROOF_ATTACHED: 10,
  DAILY_STREAK_BONUS: 25,
};

/**
 * Calculates level stats from total XP
 */
export function calculateLevelFromXP(xp = 0) {
  let currentTier = LEVEL_TIERS[0];
  let nextTier = LEVEL_TIERS[1];

  for (let i = 0; i < LEVEL_TIERS.length; i++) {
    if (xp >= LEVEL_TIERS[i].xpRequired) {
      currentTier = LEVEL_TIERS[i];
      nextTier = LEVEL_TIERS[i + 1] || null;
    }
  }

  const currentLevelMin = currentTier.xpRequired;
  const nextLevelMin = nextTier ? nextTier.xpRequired : currentLevelMin + 500;
  const progressInLevel = Math.max(0, xp - currentLevelMin);
  const xpSpan = nextLevelMin - currentLevelMin;
  const progressPercentage = Math.min(100, Math.round((progressInLevel / xpSpan) * 100));

  return {
    xp,
    level: currentTier.level,
    title: currentTier.name,
    feeDiscount: currentTier.feeDiscount,
    icon: currentTier.icon,
    progressPercentage,
    xpToNextLevel: nextTier ? nextTier.xpRequired - xp : 0,
    nextTier
  };
}

/**
 * Calculates user XP earned from task completions & ratings
 */
export function calculateUserXP(tasks = [], ratings = {}) {
  let totalXP = 0;
  let streak = 0;

  tasks.forEach((task) => {
    if (task.status === 'completed' || task.status === 'accepted') {
      totalXP += XP_REWARDS.TASK_COMPLETED;
      if (task.proofUrl || task.hasProof) totalXP += XP_REWARDS.PROOF_ATTACHED;
      
      const rating = ratings[task.id];
      if (Number(rating) === 5) totalXP += XP_REWARDS.FIVE_STAR_RATING;
      streak++;
    }
  });

  if (streak > 0) {
    totalXP += Math.min(streak, 5) * XP_REWARDS.DAILY_STREAK_BONUS;
  }

  const levelStats = calculateLevelFromXP(totalXP);
  return {
    ...levelStats,
    streakCount: streak,
  };
}
