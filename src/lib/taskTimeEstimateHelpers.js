/**
 * Utilities for calculating and formatting estimated task duration.
 */

/**
 * Calculates estimated completion duration in minutes based on task properties or explicit field.
 * @param {Object} task 
 * @returns {number} Estimated minutes
 */
export function calculateEstimatedDurationMinutes(task) {
  if (!task) return 30;
  if (typeof task.estimatedMinutes === 'number' && task.estimatedMinutes > 0) {
    return task.estimatedMinutes;
  }

  let base = 30;
  const title = (task.title || '').toLowerCase();
  const desc = (task.description || '').toLowerCase();
  const text = `${title} ${desc}`;

  if (text.includes('quick') || text.includes('simple') || text.includes('pickup') || text.includes('dropoff')) {
    base = 15;
  } else if (text.includes('full day') || text.includes('moving') || text.includes('audit')) {
    base = 240;
  } else if (text.includes('clean') || text.includes('setup') || text.includes('review')) {
    base = 60;
  }

  if (task.bounty >= 100) base += 30;

  return base;
}

/**
 * Formats duration in minutes to human-readable string (e.g. "15m", "1h 30m", "4h").
 * @param {number} minutes 
 * @returns {string}
 */
export function formatDurationHuman(minutes = 0) {
  const mins = Math.max(0, Math.round(Number(minutes) || 0));
  if (mins === 0) return '0m';
  
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;

  if (hrs === 0) return `${remMins}m`;
  if (remMins === 0) return `${hrs}h`;
  return `${hrs}h ${remMins}m`;
}

/**
 * Evaluates whether a task is considered long-duration (>= 2 hours).
 * @param {number} minutes 
 * @returns {boolean}
 */
export function isLongTask(minutes = 0) {
  return (Number(minutes) || 0) >= 120;
}
