/**
 * Utility functions for user rating analytics and breakdown calculations.
 */

/**
 * Calculates distribution breakdown (counts & percentages) for star ratings (1 to 5).
 */
export function calculateRatingBreakdown(ratings = []) {
  const breakdown = {
    5: { count: 0, percentage: 0 },
    4: { count: 0, percentage: 0 },
    3: { count: 0, percentage: 0 },
    2: { count: 0, percentage: 0 },
    1: { count: 0, percentage: 0 },
    total: 0,
    average: 0,
  };

  if (!Array.isArray(ratings) || ratings.length === 0) {
    return breakdown;
  }

  let totalScore = 0;
  ratings.forEach((r) => {
    const score = Math.min(Math.max(Math.round(Number(r.rating || r || 0)), 1), 5);
    if (!isNaN(score) && score >= 1 && score <= 5) {
      breakdown[score].count += 1;
      breakdown.total += 1;
      totalScore += score;
    }
  });

  if (breakdown.total > 0) {
    breakdown.average = Number((totalScore / breakdown.total).toFixed(1));
    for (let star = 1; star <= 5; star++) {
      breakdown[star].percentage = Math.round(
        (breakdown[star].count / breakdown.total) * 100
      );
    }
  }

  return breakdown;
}
