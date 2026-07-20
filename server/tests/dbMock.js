/**
 * tests/dbMock.js
 * Lightweight mock for the pg Pool used by db/queries.js.
 *
 * Usage in a test file:
 *
 *   const { mockQuery, resetMock } = require('./dbMock');
 *   // Set what pool.query should resolve with for the next call(s):
 *   mockQuery({ rows: [{ id: 1, email: 'a@b.com', alias: 'Tester' }] });
 */

let _queue = [];

/**
 * Queue a result that pool.query will return on the next call.
 * Call multiple times to enqueue multiple sequential results.
 * @param {{ rows: any[] }} result
 */
function mockQuery(result) {
  _queue.push(result);
}

/**
 * Clear the result queue and reset the call log.
 */
function resetMock() {
  _queue = [];
  calls.length = 0;
}

/** Ordered list of [sql, params] pairs that pool.query was invoked with. */
const calls = [];

/**
 * The mock pool object — replaces the real pg Pool.
 * It dequeues the next queued result on every query() call.
 * If the queue is empty it rejects with a clear error.
 */
const mockPool = {
  query(sql, params) {
    calls.push({ sql, params });
    if (_queue.length === 0) {
      return Promise.reject(new Error(`mockPool.query called unexpectedly.\nSQL: ${sql}`));
    }
    const result = _queue.shift();
    if (result instanceof Error) return Promise.reject(result);
    return Promise.resolve(result);
  },
};

module.exports = { mockPool, mockQuery, resetMock, calls };
