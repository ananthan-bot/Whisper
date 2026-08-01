/**
 * Accumulates summary metrics across a list of tasks.
 * @param {Array<Object>} tasks
 * @returns {{ totalTasks: number, totalBounty: number, avgBounty: number, completedCount: number, completionRate: number }}
 */
export function calculateTaskMetrics(tasks = []) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return {
      totalTasks: 0,
      totalBounty: 0,
      avgBounty: 0,
      completedCount: 0,
      completionRate: 0
    };
  }

  const totalTasks = tasks.length;
  let totalBounty = 0;
  let completedCount = 0;

  for (const task of tasks) {
    totalBounty += Number(task.bounty) || 0;
    if (task.status === 'completed' || task.status === 'paid') {
      completedCount++;
    }
  }

  const avgBounty = Math.round((totalBounty / totalTasks) * 100) / 100;
  const completionRate = Math.round((completedCount / totalTasks) * 100);

  return {
    totalTasks,
    totalBounty,
    avgBounty,
    completedCount,
    completionRate
  };
}
