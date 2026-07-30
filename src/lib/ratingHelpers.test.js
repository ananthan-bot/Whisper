import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRatingBreakdown } from './ratingHelpers.js';

test('calculateRatingBreakdown — calculates counts, average and percentages correctly', () => {
  const ratings = [{ rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 2 }];
  const res = calculateRatingBreakdown(ratings);

  assert.equal(res.total, 4);
  assert.equal(res.average, 4); // (5+5+4+2)/4 = 4.0
  assert.equal(res[5].count, 2);
  assert.equal(res[5].percentage, 50);
  assert.equal(res[4].count, 1);
  assert.equal(res[4].percentage, 25);
  assert.equal(res[3].count, 0);
  assert.equal(res[3].percentage, 0);
});

test('calculateRatingBreakdown — handles empty arrays gracefully', () => {
  const res = calculateRatingBreakdown([]);
  assert.equal(res.total, 0);
  assert.equal(res.average, 0);
  assert.equal(res[5].percentage, 0);
});
