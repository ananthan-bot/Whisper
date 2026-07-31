import test from 'node:test';
import assert from 'node:assert/strict';
import { summarizeTestResults } from './testRunnerHelpers.js';

test('testRunnerHelpers - summarizeTestResults formats summary correctly', () => {
  const summary = summarizeTestResults(120, 0);
  assert.equal(summary.total, 120);
  assert.equal(summary.passPercentage, 100);
  assert.equal(summary.status, 'ALL_PASSED');
});
