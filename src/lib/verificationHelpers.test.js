import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getVerificationBadgeInfo, isUserEligibleForBadge } from './verificationHelpers.js';

describe('verificationHelpers', () => {
  it('getVerificationBadgeInfo returns badge details', () => {
    const info = getVerificationBadgeInfo('top_rated');
    assert.equal(info.label, 'Top Rated');
    assert.ok(info.color.includes('amber'));
  });

  it('isUserEligibleForBadge checks top_rated threshold', () => {
    assert.equal(isUserEligibleForBadge({ rating: 4.9, completedCount: 12 }, 'top_rated'), true);
    assert.equal(isUserEligibleForBadge({ rating: 4.5, completedCount: 12 }, 'top_rated'), false);
  });
});
