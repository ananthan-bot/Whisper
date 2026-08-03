import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { estimateWeeklyEarnings } from './earningsEstimatorHelpers.js';

describe('earningsEstimatorHelpers', () => {
  it('estimateWeeklyEarnings handles default inputs', () => {
    const res = estimateWeeklyEarnings();
    assert.equal(res.gross, 150);
    assert.equal(res.feeAmount, 15);
    assert.equal(res.net, 135);
  });

  it('estimateWeeklyEarnings applies fee discount', () => {
    const res = estimateWeeklyEarnings(10, 50, 2); // 8% fee
    assert.equal(res.gross, 500);
    assert.equal(res.feeAmount, 40);
    assert.equal(res.net, 460);
  });
});
