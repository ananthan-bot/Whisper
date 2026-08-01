import test from 'node:test';
import assert from 'node:assert/strict';
import { generateReferralCode, validateReferralCode } from './referralHelpers.js';

test('generateReferralCode - outputs valid code format', () => {
  const code = generateReferralCode('Alex');
  assert.equal(validateReferralCode(code), true);
  assert.ok(code.startsWith('ALEX-'));
});

test('validateReferralCode - validates correctly', () => {
  assert.equal(validateReferralCode('WISP-1234'), true);
  assert.equal(validateReferralCode('INVALID'), false);
  assert.equal(validateReferralCode(null), false);
});
