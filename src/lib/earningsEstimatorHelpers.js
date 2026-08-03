/**
 * Estimates helper weekly earnings based on task count, average bounty, and platform fee discount.
 * @param {number} tasksPerWeek
 * @param {number} avgBounty
 * @param {number} feeDiscountPercent
 * @returns {object} { gross, net, feeAmount }
 */
export function estimateWeeklyEarnings(tasksPerWeek = 5, avgBounty = 30, feeDiscountPercent = 0) {
  const tasks = Math.max(0, Number(tasksPerWeek) || 0);
  const bounty = Math.max(0, Number(avgBounty) || 0);

  const gross = tasks * bounty;
  const baseFeePercent = 10;
  const effectiveFeePercent = Math.max(0, baseFeePercent - (Number(feeDiscountPercent) || 0));

  const feeAmount = (gross * effectiveFeePercent) / 100;
  const net = gross - feeAmount;

  return {
    gross: Math.round(gross * 100) / 100,
    feeAmount: Math.round(feeAmount * 100) / 100,
    net: Math.round(net * 100) / 100,
  };
}
