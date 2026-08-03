/**
 * Calculates a numerical urgency score for a task based on bounty, urgency flag, and age.
 * @param {object} task
 * @returns {number} urgency score from 0 to 100
 */
export function calculateTaskUrgencyScore(task) {
  if (!task) return 0;
  let score = 0;

  // Base score from bounty
  const bounty = Number(task.bounty || 25);
  score += Math.min(bounty, 50);

  // Urgent flag adds 30 points
  if (task.isUrgent) {
    score += 30;
  }

  // Categories like negotiator add extra weight
  if (task.category === 'negotiator') {
    score += 15;
  } else if (task.category === 'secretary') {
    score += 10;
  }

  return Math.min(Math.max(Math.round(score), 0), 100);
}

/**
 * Returns color badge styling based on urgency score.
 * @param {number} score
 * @returns {string} Tailwind CSS class string
 */
export function getUrgencyScoreColorClass(score) {
  if (score >= 75) return 'bg-rose-100 text-rose-700 border-rose-200';
  if (score >= 45) return 'bg-amber-100 text-amber-700 border-amber-200';
  return 'bg-emerald-100 text-emerald-700 border-emerald-200';
}
