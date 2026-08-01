/**
 * Evaluates a task and returns an urgency tier: 'critical', 'high', 'medium', or 'low'.
 * @param {Object} task
 * @returns {string}
 */
export function getTaskUrgencyTier(task) {
  if (!task) return 'low';

  const { bounty = 0, deadline, isUrgent = false } = task;
  
  if (isUrgent) return 'critical';
  
  if (deadline) {
    const hoursLeft = (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60);
    if (hoursLeft > 0 && hoursLeft <= 6) return 'critical';
    if (hoursLeft > 0 && hoursLeft <= 24) return 'high';
  }

  if (bounty >= 100) return 'high';
  if (bounty >= 50) return 'medium';

  return 'low';
}

/**
 * Returns color badge styling classes based on urgency tier.
 * @param {string} tier
 * @returns {string}
 */
export function getUrgencyTierBadgeClass(tier) {
  switch (tier) {
    case 'critical':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    case 'high':
      return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    case 'medium':
      return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
}
