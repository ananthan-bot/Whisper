const test = require('node:test');
const assert = require('node:assert/strict');
const { createRateLimiter } = require('../middleware/rateLimiter.js');

test('createRateLimiter - allows requests under limit', () => {
  const limiter = createRateLimiter(2, 1000);
  const req = { ip: '127.0.0.1', headers: {} };
  
  let nextCalled = 0;
  const next = () => nextCalled++;

  limiter(req, null, next);
  limiter(req, null, next);
  assert.equal(nextCalled, 2);
});

test('createRateLimiter - blocks requests exceeding limit', () => {
  const limiter = createRateLimiter(1, 1000);
  const req = { ip: '192.168.1.1', headers: {} };
  
  let statusCode = 0;
  let jsonBody = null;
  const res = {
    status(code) {
      statusCode = code;
      return {
        json(data) {
          jsonBody = data;
        }
      };
    }
  };

  limiter(req, res, () => {});
  limiter(req, res, () => {});
  
  assert.equal(statusCode, 429);
  assert.ok(jsonBody.error.includes('Too many requests'));
});
