/**
 * Test Suite Execution Helper
 */

export function summarizeTestResults(passed = 0, failed = 0) {
  const total = passed + failed;
  const passPercentage = total > 0 ? Math.round((passed / total) * 100) : 100;
  return {
    total,
    passed,
    failed,
    passPercentage,
    status: failed === 0 ? 'ALL_PASSED' : 'HAS_FAILURES',
  };
}
