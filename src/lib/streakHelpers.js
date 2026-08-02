/**
 * Utilities for calculating and formatting user daily activity streaks.
 */

/**
 * Calculates current consecutive active day streak.
 * @param {Array<string|Date>} activityDates Array of ISO strings or Date objects
 * @param {Date} [referenceDate] Defaults to new Date()
 * @returns {number} Consecutive days streak count
 */
export function calculateUserStreak(activityDates = [], referenceDate = new Date()) {
  if (!Array.isArray(activityDates) || activityDates.length === 0) return 0;

  const dates = activityDates
    .map(d => new Date(d))
    .filter(d => !isNaN(d.getTime()))
    .map(d => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime());

  if (dates.length === 0) return 0;

  const uniqueSortedTimes = [...new Set(dates)].sort((a, b) => b - a);

  const ref = new Date(referenceDate);
  const today = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate()).getTime();
  const yesterday = today - 86400000;

  const latest = uniqueSortedTimes[0];
  if (latest !== today && latest !== yesterday) {
    return 0;
  }

  let streak = 0;
  let expectedTime = latest;

  for (const t of uniqueSortedTimes) {
    if (t === expectedTime) {
      streak++;
      expectedTime -= 86400000;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Checks if a user's streak is active today or was active yesterday.
 * @param {string|Date} lastActivityDate 
 * @param {Date} [referenceDate]
 * @returns {boolean}
 */
export function isStreakActive(lastActivityDate, referenceDate = new Date()) {
  if (!lastActivityDate) return false;
  const last = new Date(lastActivityDate);
  if (isNaN(last.getTime())) return false;

  const ref = new Date(referenceDate);
  const today = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate()).getTime();
  const yesterday = today - 86400000;
  const lastDay = new Date(last.getFullYear(), last.getMonth(), last.getDate()).getTime();

  return lastDay === today || lastDay === yesterday;
}

/**
 * Formats streak count with flame emoji badge text.
 * @param {number} streakCount 
 * @returns {string}
 */
export function formatStreakLabel(streakCount = 0) {
  const count = Math.max(0, Number(streakCount) || 0);
  if (count === 0) return 'No active streak';
  if (count === 1) return '🔥 1 day streak!';
  return `🔥 ${count} days streak!`;
}
