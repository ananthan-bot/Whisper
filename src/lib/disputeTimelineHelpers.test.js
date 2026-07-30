import test from 'node:test';
import assert from 'node:assert/strict';
import { getDisputeTimelineStatus, DISPUTE_STAGES } from './disputeTimelineHelpers.js';

test('getDisputeTimelineStatus — calculates active step index and step flags', () => {
  const resFiled = getDisputeTimelineStatus('filed');
  assert.equal(resFiled.activeIndex, 0);
  assert.equal(resFiled.progressPercentage, 25);
  assert.equal(resFiled.steps[0].isCurrent, true);

  const resReview = getDisputeTimelineStatus('under_review');
  assert.equal(resReview.activeIndex, 2);
  assert.equal(resReview.progressPercentage, 75);
  assert.equal(resReview.steps[0].isCompleted, true);
  assert.equal(resReview.steps[2].isCurrent, true);

  const resResolved = getDisputeTimelineStatus('resolved');
  assert.equal(resResolved.activeIndex, 3);
  assert.equal(resResolved.progressPercentage, 100);
});
