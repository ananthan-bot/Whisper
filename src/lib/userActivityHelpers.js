/**
 * Calculates high level summary metrics for user task activity.
 * @param {Array<object>} tasks
 * @param {string} userAlias
 * @returns {object} metrics object
 */
export function calculateUserActivitySummary(tasks = [], userAlias = '') {
  if (!Array.isArray(tasks)) {
    return { posted: 0, completed: 0, totalBounty: 0, completionRate: 0 };
  }

  const postedTasks = tasks.filter((t) => t && t.alias === userAlias);
  const completedTasks = postedTasks.filter((t) => t.status === 'accepted' || t.status === 'completed');
  const totalBounty = postedTasks.reduce((acc, curr) => acc + (Number(curr.bounty) || 25), 0);

  const completionRate = postedTasks.length > 0
    ? Math.round((completedTasks.length / postedTasks.length) * 100)
    : 0;

  return {
    posted: postedTasks.length,
    completed: completedTasks.length,
    totalBounty,
    completionRate,
  };
}
