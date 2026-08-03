/**
 * Checks verification status and returns badge metadata.
 * @param {string} badgeType 'id_verified' | 'top_rated' | 'speed_demon'
 * @returns {object} badge info
 */
export function getVerificationBadgeInfo(badgeType) {
  const BADGES = {
    id_verified: {
      label: 'ID Verified',
      description: 'Government ID hash verified anonymously',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    top_rated: {
      label: 'Top Rated',
      description: '4.8+ rating across at least 10 completed tasks',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    speed_demon: {
      label: 'Speed Demon',
      description: 'Average task completion time under 2 hours',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
  };

  return BADGES[badgeType] || {
    label: 'Verified',
    description: 'Anonymous verification badge',
    color: 'bg-slate-50 text-slate-700 border-slate-200',
  };
}

/**
 * Checks if user meets verification badge requirements.
 * @param {object} stats { rating, completedCount }
 * @param {string} badgeType
 * @returns {boolean}
 */
export function isUserEligibleForBadge(stats, badgeType) {
  if (!stats) return false;
  if (badgeType === 'top_rated') {
    return (stats.rating || 0) >= 4.8 && (stats.completedCount || 0) >= 10;
  }
  if (badgeType === 'speed_demon') {
    return (stats.completedCount || 0) >= 5;
  }
  return true;
}
